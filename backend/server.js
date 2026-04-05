const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const Redis = require('ioredis');
const { createObjectCsvWriter } = require('csv-writer');
const csvParser = require('csv-parser');
const fs = require('fs-extra');
const crypto = require('crypto');
const stringSimilarity = require('string-similarity');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const CSV_FILE = path.join(__dirname, 'comments.csv');

// Redis setup with graceful fallback
let redis;
let isRedisAvailable = false;

const initRedis = () => {
    redis = new Redis({
        host: '127.0.0.1',
        port: 6379,
        lazyConnect: true, // Don't connect on start
        retryStrategy: (times) => {
            if (times > 3) {
                console.warn('[REDIS] Could not connect. Falling back to in-memory storage.');
                isRedisAvailable = false;
                return null; // Stop retrying
            }
            return Math.min(times * 100, 2000);
        },
    });

    redis.on('error', (err) => {
        // Silently handle connection errors
        isRedisAvailable = false;
    });

    redis.on('connect', () => {
        console.log('[REDIS] Connected successfully.');
        isRedisAvailable = true;
    });

    redis.connect().catch(() => {
        isRedisAvailable = false;
    });
};

initRedis();

// In-memory fallback stores
const memoryCache = new Map();
const memoryRateLimit = new Map();
const memoryDuplicates = new Map();

app.use(cors());
app.use(bodyParser.json());

// Initialize CSV if it doesn't exist
const initializeCsv = async () => {
    if (!await fs.pathExists(CSV_FILE)) {
        const csvWriter = createObjectCsvWriter({
            path: CSV_FILE,
            header: [
                { id: 'id_article', title: 'id_article' },
                { id: 'comment', title: 'comment' },
                { id: 'created_at', title: 'created_at' },
                { id: 'status', title: 'status' },
                { id: 'user_ip', title: 'user_ip' },
                { id: 'user_city', title: 'user_city' },
                { id: 'session_id', title: 'session_id' },
                { id: 'cookie_id', title: 'cookie_id' }
            ]
        });
        await csvWriter.writeRecords([]);
    }
};

initializeCsv();

// Utility: Normalize and Hash
const normalizeComment = (text) => text.trim().toLowerCase().replace(/\s+/g, ' ');

const generateHash = (text) => crypto.createHash('sha256').update(text).digest('hex');

// POST: Add Comment
app.post('/api/comments', async (req, res) => {
    const { id_article, comment, user_ip, session_id, user_city, cookie_id } = req.body;
    
    if (!id_article || !comment || !user_ip) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
        // 1. Rate Limiting (4 comments / 10 mins)
        const rateLimitKey = `limit:${user_ip}`;
        let currentCount;
        
        if (isRedisAvailable) {
            currentCount = await redis.get(rateLimitKey);
        } else {
            const entry = memoryRateLimit.get(rateLimitKey);
            if (entry && entry.expires > Date.now()) currentCount = entry.value;
        }
        
        if (currentCount && parseInt(currentCount) >= 4) {
            let remainingSeconds = 600; // Default fallback
            if (isRedisAvailable) {
                remainingSeconds = await redis.ttl(rateLimitKey);
            } else {
                const entry = memoryRateLimit.get(rateLimitKey);
                if (entry) remainingSeconds = Math.max(0, Math.floor((entry.expires - Date.now()) / 1000));
            }
            return res.status(429).json({ 
                error: 'Too many comments.',
                remainingSeconds 
            });
        }

        // 2. Duplicate Detection (5-min window)
        const normalized = normalizeComment(comment);
        const hash = generateHash(normalized);
        const dupKey = `dup:${id_article}:${user_ip}:${hash}`;
        
        let isDuplicate;
        if (isRedisAvailable) {
            isDuplicate = await redis.get(dupKey);
        } else {
            const entry = memoryDuplicates.get(dupKey);
            if (entry && entry.expires > Date.now()) isDuplicate = '1';
        }

        if (isDuplicate) {
            return res.status(400).json({ error: 'Duplicate comment detected.' });
        }

        // 3. Normal Insertion Logic
        const newRecord = {
            id_article,
            comment,
            created_at: Math.floor(Date.now() / 1000),
            status: 'approved', // Set to approved for immediate visibility during testing
            user_ip,
            user_city: user_city || 'any',
            session_id,
            cookie_id
        };

        // Write to CSV
        const csvWriter = createObjectCsvWriter({
            path: CSV_FILE,
            header: Object.keys(newRecord).map(k => ({ id: k, title: k })),
            append: true
        });
        await csvWriter.writeRecords([newRecord]);

        // Set Redis/Memory keys
        const tenMins = 600 * 1000;
        const fiveMins = 300 * 1000;

        if (isRedisAvailable) {
            if (!currentCount) {
                await redis.set(rateLimitKey, 1, 'EX', 600);
            } else {
                await redis.incr(rateLimitKey);
            }
            await redis.set(dupKey, '1', 'EX', 300);
            await redis.del(`cache:${id_article}`);
        } else {
            // Memory storage with expiry
            const newCount = (parseInt(currentCount) || 0) + 1;
            memoryRateLimit.set(rateLimitKey, { value: newCount, expires: Date.now() + tenMins });
            memoryDuplicates.set(dupKey, { value: '1', expires: Date.now() + fiveMins });
            memoryCache.delete(`cache:${id_article}`);
        }

        return res.json({ message: 'Comment posted successfully', status: 'pending' });

    } catch (error) {
        console.error('Error processing comment:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

// GET: Get Comments
app.get('/api/comments/:id_article', async (req, res) => {
    const { id_article } = req.params;
    const cacheKey = `cache:${id_article}`;

    try {
        // 1. Check Cache
        let cachedData;
        if (isRedisAvailable) {
            cachedData = await redis.get(cacheKey);
        } else {
            const entry = memoryCache.get(cacheKey);
            if (entry && entry.expires > Date.now()) cachedData = entry.value;
        }

        if (cachedData) {
            return res.json({ id_article, comments: JSON.parse(cachedData) });
        }
        
        // 2. Read from CSV
        const comments = [];
        fs.createReadStream(CSV_FILE)
            .pipe(csvParser())
            .on('data', (row) => {
                if (row.id_article === id_article && row.status === 'approved') {
                    comments.unshift({ // Add to beginning for Newest-First sorting
                        comment: row.comment,
                        created_at: parseInt(row.created_at),
                        status: row.status
                    });
                }
            })
            .on('end', async () => {
                // 3. Cache results
                if (isRedisAvailable) {
                    await redis.set(cacheKey, JSON.stringify(comments), 'EX', 3600);
                } else {
                    memoryCache.set(cacheKey, { value: JSON.stringify(comments), expires: Date.now() + 3600000 });
                }
                return res.json({ id_article, comments });
            });

    } catch (error) {
        console.error('Error fetching comments:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

// Placeholder for Async Fuzzy Check
const runAsyncFuzzyCheck = async (normalizedComment, idArticle) => {
    // In a real scenario, compare with other comments in the same article
    // For now, it logs a score simulation
    console.log(`[Async] Running fuzzy check for article ${idArticle}...`);
    // Example logic:
    // const existingComments = ... fetch from local var ...
    // const similarity = stringSimilarity.findBestMatch(normalizedComment, existingComments);
};

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
