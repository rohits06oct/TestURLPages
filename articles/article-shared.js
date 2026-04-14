/**
 * Shared Article Logic and Components
 * Handles Comments, Footer, and Search Overlay for all articles.
 */

(function () {
    // 1. Initialize HTML Components
    const sharedComponents = `
    <section id="comments-section" class="container">
        <div class="category-header">
            <div class="category-label">Discussion</div>
            <div class="category-line"></div>
        </div>

        <div class="ads-wrapper">
                <div>
                    <!-- Start Banner Addsterra TAG -->
                    <script>
                        atOptions = {
                        'key' : '6690eff882cbaf9cd9954f2407e29807',
                        'format' : 'iframe',
                        'height' : 250,
                        'width' : 300,
                        'params' : {}
                        };
                    </script>
                    <script src="https://www.highperformanceformat.com/6690eff882cbaf9cd9954f2407e29807/invoke.js"></script>
                    <!-- End Banner Addsterra TAG -->
                </div>
                <div>
                    <!-- Start Banner Addsterra TAG -->
                    <script>
                    atOptions = {
                        'key' : '6690eff882cbaf9cd9954f2407e29807',
                        'format' : 'iframe',
                        'height' : 250,
                        'width' : 300,
                        'params' : {}
                    };
                    </script>
                    <script src="https://www.highperformanceformat.com/6690eff882cbaf9cd9954f2407e29807/invoke.js"></script>
                    <!-- End Banner Addsterra TAG -->
                </div>
                <div>
                    <!-- Start Banner Addsterra TAG -->
                    <script>
                    atOptions = {
                        'key' : '6690eff882cbaf9cd9954f2407e29807',
                        'format' : 'iframe',
                        'height' : 250,
                        'width' : 300,
                        'params' : {}
                    };
                    </script>
                    <script src="https://www.highperformanceformat.com/6690eff882cbaf9cd9954f2407e29807/invoke.js"></script>
                    <!-- End Banner Addsterra TAG -->
                </div>
                <div>
                    <!-- Start Banner Addsterra TAG -->
                    <script>
                    atOptions = {
                        'key' : '6690eff882cbaf9cd9954f2407e29807',
                        'format' : 'iframe',
                        'height' : 250,
                        'width' : 300,
                        'params' : {}
                    };
                    </script>
                    <script src="https://www.highperformanceformat.com/6690eff882cbaf9cd9954f2407e29807/invoke.js"></script>
                    <!-- End Banner Addsterra TAG -->
                </div>
            </div>

        <div class="comments-section">
            <h3>Leave your thoughts</h3>
            <form id="comment-form" class="comment-form">
                <textarea id="comment-content" rows="4" placeholder="Share your thoughts..." required maxlength="700"></textarea>
                <div id="comment-error" style="color: #ff4d4d; font-size: 14px; margin-top: -5px; margin-bottom: 5px; display: none; font-weight: 600;"></div>
                <button type="submit" class="submit-comment-btn" id="submit-btn">Post Comment</button>
            </form>
            <div id="comments-display" class="comments-list">
                <div class="no-comments">Loading comments...</div>
            </div>
        </div>
    </section>

    <footer>
        <div class="container">
            <nav class="footer-nav">
                <a href="https://www.financereport.online/">Finance</a>
                <a href="https://www.techreport.online/">Tech</a>
                <a href="https://www.eodreport.online/">EOD Lifestyle</a>
                <a href="https://www.cricketreport.online/">Cricket</a>
                <a href="https://www.footballreport.online/">Football</a>
                <a href="https://www.racenews.online/">Race</a>
                <a href="https://www.golfreport.online/">Golf</a>
            </nav>
            <div class="footer-links">
                <a href="../privacy-policy.html">Privacy Policy</a>
                <span>|</span>
                <a href="../terms.html">Terms & Conditions</a>
                <span>|</span>
                <a href="../disclaimer.html">Disclaimer</a>
            </div>
            <div class="footer-links">
                <a href="../about-us.html">About Us</a>
                <span>|</span>
                <a href="../contact-us.html">Contact Us</a>
                <span>|</span>
                <a href="../comment-policy.html">Comment Policy</a>
                <span>|</span>
                <a href="../cookie-policy.html">Cookie Policy</a>
            </div>
            <div class="footer-bottom">
                <p>© 2026 tinybigtalks.online. All Rights Reserved.</p>
            </div>
        </div>
    </footer>

    <div id="mobile-search-overlay" class="mobile-search-overlay">
        <div class="mobile-search-header">
            <button id="close-search-btn" class="search-icon-btn">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
            </button>
        </div>
        <input type="text" id="mobile-search-input" class="mobile-search-input" placeholder="Search the blog...">
        <div id="mobile-search-results" style="margin-top: 20px;"></div>
    </div>
    `;

    // Inject Shared Components
    const container = document.getElementById('shared-components-container');
    if (container) {
        container.innerHTML = sharedComponents;

        // Browsers don't execute scripts in innerHTML by default.
        // We need to manually re-create and append them.
        const scripts = container.querySelectorAll('script');
        executeScriptsSequentially(Array.from(scripts));
    }

    function executeScriptsSequentially(scripts, index = 0) {
        if (index >= scripts.length) return;

        const oldScript = scripts[index];
        const newScript = document.createElement('script');

        Array.from(oldScript.attributes).forEach(attr => {
            newScript.setAttribute(attr.name, attr.value);
        });

        const next = () => executeScriptsSequentially(scripts, index + 1);

        if (oldScript.src) {
            newScript.src = oldScript.src;
            newScript.onload = next;
            newScript.onerror = () => {
                console.warn(`Failed to load ad script: ${oldScript.src}`);
                next();
            };
        } else {
            newScript.textContent = oldScript.textContent;
            oldScript.parentNode.replaceChild(newScript, oldScript);
            next();
            return;
        }

        oldScript.parentNode.replaceChild(newScript, oldScript);
    }

    // 2. Logic & Functionality
    const API_BASE_URL = typeof CONFIG !== 'undefined' ? CONFIG.API_BASE_URL : '';

    // Cookie Helpers
    function setCookie(name, value, days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        const expires = "; expires=" + date.toUTCString();
        document.cookie = name + "=" + (value || "") + expires + "; path=/; SameSite=Lax";
    }

    function getCookie(name) {
        const nameEQ = name + "=";
        const ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }

    // Identifiers
    function getPersistentId() {
        let id = getCookie('tbt_user_id');
        if (!id) {
            id = 'cookie_' + Math.random().toString(36).substr(2, 9) + Date.now().toString(36);
            setCookie('tbt_user_id', id, 365);
        }
        return id;
    }

    function getSessionId() {
        let id = sessionStorage.getItem('tbt_session_id');
        if (!id) {
            id = 'session_' + Math.random().toString(36).substr(2, 9) + Date.now().toString(36);
            sessionStorage.setItem('tbt_session_id', id);
        }
        return id;
    }

    function getMetadata() {
        const ua = navigator.userAgent;
        return {
            user_agent: ua,
            browser_lang: navigator.language || 'unknown',
            device_type: /Mobile|Android|iPhone/i.test(ua) ? 'Mobile' : 'Desktop',
            referrer: document.referrer || 'none',
            page_url: window.location.href,
            screen_res: `${window.screen.width}x${window.screen.height}`
        };
    }

    // Comment Actions
    function validateComment(text) {
        const errorDiv = document.getElementById('comment-error');
        const submitBtn = document.getElementById('submit-btn');
        if (!errorDiv || !submitBtn) return true;

        errorDiv.style.display = 'none';
        submitBtn.disabled = false;

        if (!text) return true;

        const bannedWords = ['sex', 'xxx', 'adult', 'fuck', 'Witch', 'you dog', 'motherfucker'];
        const lowerText = text.toLowerCase();
        if (bannedWords.some(word => lowerText.includes(word))) {
            errorDiv.textContent = "You are using adult comments and not allowed to add";
            errorDiv.style.display = 'block';
            submitBtn.disabled = true;
            return false;
        }

        if (!/^[a-zA-Z0-9\s,\.\|]*$/.test(text)) {
            errorDiv.textContent = "Only letters, numbers, and symbols (, . |) are allowed.";
            errorDiv.style.display = 'block';
            submitBtn.disabled = true;
            return false;
        }
        return true;
    }

    async function fetchComments() {
        try {
            const response = await fetch(`${API_BASE_URL}/${CURRENT_ARTICLE_ID}`);
            if (!response.ok) throw new Error('Error fetching comments');
            const data = await response.json();
            return data.comments || [];
        } catch (error) {
            console.error(error);
            return [];
        }
    }

    async function postComment(content) {
        const response = await fetch(API_BASE_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                id_article: CURRENT_ARTICLE_ID,
                comment: content,
                user_ip: '127.0.0.1',
                user_city: 'any',
                session_id: getSessionId(),
                cookie_id: getPersistentId(),
                ...getMetadata()
            })
        });

        if (!response.ok) {
            const err = await response.json();
            throw new Error(JSON.stringify({ error: err.error, remainingSeconds: err.remainingSeconds }));
        }
        return await response.json();
    }

    function renderComments(comments) {
        const display = document.getElementById('comments-display');
        if (!display) return;

        if (!comments || comments.length === 0) {
            display.innerHTML = '<div class="no-comments">No comments yet. Be the first to share your thoughts!</div>';
            return;
        }

        display.innerHTML = comments.map(c => `
            <div class="comment-card">
                <div class="comment-header">
                    <span class="comment-author">User</span>
                    <span class="comment-date">${new Date(c.created_at * 1000).toLocaleString()}</span>
                </div>
                <div class="comment-text">${escapeHtml(c.comment)}</div>
            </div>
        `).join('');
    }

    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    function formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return (mins > 0 ? `${mins} minute${mins > 1 ? 's' : ''} and ` : '') + `${secs} second${secs !== 1 ? 's' : ''}`;
    }

    // Init & Listeners
    async function init() {
        if (typeof CURRENT_ARTICLE_ID === 'undefined') return;

        const comments = await fetchComments();
        renderComments(comments);

        if (window.location.hash === '#comments-section') {
            document.getElementById('comments-section')?.scrollIntoView({ behavior: 'smooth' });
        }

        const form = document.getElementById('comment-form');
        const contentInput = document.getElementById('comment-content');
        const submitBtn = document.getElementById('submit-btn');

        if (form && contentInput && submitBtn) {
            contentInput.addEventListener('input', (e) => validateComment(e.target.value));

            form.addEventListener('submit', async (e) => {
                e.preventDefault();
                if (!validateComment(contentInput.value)) return;

                submitBtn.disabled = true;
                submitBtn.textContent = 'Posting...';

                try {
                    const res = await postComment(contentInput.value);
                    if (res) {
                        const baseUrl = window.location.href.split('#')[0];
                        window.location.href = baseUrl + '#comments-section';
                        window.location.reload();
                    }
                } catch (error) {
                    let msg = "Something went wrong.";
                    try {
                        const data = JSON.parse(error.message);
                        if (data.remainingSeconds) msg = `Too many comments. Try again after ${formatTime(data.remainingSeconds)}.`;
                        else if (data.error) msg = data.error;
                    } catch (e) { }
                    alert(msg);
                    submitBtn.disabled = false;
                    submitBtn.textContent = 'Post Comment';
                }
            });
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
