const ARTICLE_DATA = [
  // TinyBigTalks (11 Real Articles)
  {
    id: 'tbt-1',
    title: 'Future of AI in Everyday Life',
    excerpt: 'Artificial Intelligence is no longer just a buzzword; it\'s a transformative force reshaping how we live...',
    image: 'assets/blog-default.png',
    category: 'TinyBigTalks',
    url: 'articles/future-of-ai.html'
  },
  {
    id: 'tbt-2',
    title: 'Sustainable Living in 2024',
    excerpt: 'Living sustainably doesn\'t always mean massive changes to your lifestyle. Often, it\'s the small choices...',
    image: 'assets/blog-default.png',
    category: 'TinyBigTalks',
    url: 'articles/sustainable-living.html'
  },
  // Other categories (restoring previous counts)
  ...Array.from({ length: 5 }, (_, i) => ({
    id: `fin-${i + 1}`,
    title: `Finance Strategy ${i + 1}`,
    excerpt: 'Coming soon...',
    image: 'assets/blog-default.png',
    category: 'Finance',
    url: 'articles/finance-strategy.html'
  })),
  ...Array.from({ length: 5 }, (_, i) => ({
    id: `tech-${i + 1}`,
    title: `Future Tech ${i + 1}`,
    excerpt: 'Coming soon...',
    image: 'assets/blog-default.png',
    category: 'Tech',
    url: 'articles/future-tech.html'
  })),
  ...Array.from({ length: 5 }, (_, i) => ({
    id: `life-${i + 1}`,
    title: `Balanced Life ${i + 1}`,
    excerpt: 'Coming soon...',
    image: 'assets/blog-default.png',
    category: 'EOD Lifestyle',
    url: 'articles/balanced-life.html'
  })),
  ...Array.from({ length: 5 }, (_, i) => ({
    id: `cric-${i + 1}`,
    title: `Cricket Highlights ${i + 1}`,
    excerpt: 'Coming soon...',
    image: 'assets/blog-default.png',
    category: 'Cricket',
    url: 'articles/cricket-highlights.html'
  })),
  ...Array.from({ length: 5 }, (_, i) => ({
    id: `foot-${i + 1}`,
    title: `Football World ${i + 1}`,
    excerpt: 'Coming soon...',
    image: 'assets/blog-default.png',
    category: 'Football',
    url: 'articles/football-world.html'
  })),
  ...Array.from({ length: 5 }, (_, i) => ({
    id: `race-${i + 1}`,
    title: `Racing Series ${i + 1}`,
    excerpt: 'Coming soon...',
    image: 'assets/blog-default.png',
    category: 'Race',
    url: 'articles/racing-series.html'
  })),
  ...Array.from({ length: 5 }, (_, i) => ({
    id: `golf-${i + 1}`,
    title: `Golf Greens ${i + 1}`,
    excerpt: 'Coming soon...',
    image: 'assets/blog-default.png',
    category: 'Golf',
    url: 'articles/golf-greens.html'
  }))
];



function renderArticles(articles, containerId = 'search-grid') {
  const container = document.getElementById(containerId);
  if (!container) return;

  if (articles.length === 0) {
    container.innerHTML = '<div style="grid-column: 1/-1; text-align: center; padding: 50px; color: var(--text-muted);">No articles found</div>';
    return;
  }

  container.innerHTML = articles.map(article => `
    <article class="article-card" onclick="window.location.href='${article.url}'">
      <img src="${article.image}" alt="${article.title}" class="article-image" loading="lazy" decoding="async">
      <div class="article-content">
        <h2 class="article-title">${article.title}</h2>
        <p class="article-excerpt">${article.excerpt}</p>
        <span class="read-more">[Read more]</span>
      </div>
    </article>
  `).join('');
}

function renderVerticalArticles(articles, containerId = 'articles-feed') {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = articles.map(article => `
    <article class="article-card-vertical" onclick="window.location.href='${article.url}'">
      <img src="${article.image}" alt="${article.title}" class="article-image" loading="lazy" decoding="async">
      <div class="article-content">
        <h2 class="article-title" style="font-size: 24px; margin-bottom: 15px;">${article.title}</h2>
        <p class="article-excerpt" style="-webkit-line-clamp: 4; line-clamp: 4; font-size: 15px; margin-bottom: 20px;">${article.excerpt}</p>
        <span class="read-more" style="font-size: 14px;">[Read more]</span>
      </div>
    </article>
  `).join('');
}

function renderHomeSections() {
  // Clear any search states
  const searchSection = document.getElementById('search-results-section');
  const feedSection = document.getElementById('articles-feed-section');
  const sections = document.querySelectorAll('.category-section');
  if (searchSection) searchSection.style.display = 'none';
  if (feedSection) feedSection.style.display = 'block';
  sections.forEach(s => s.style.display = 'block');

  // Populate sections by ID
  const map = {
    'tbt-grid': { cat: 'TinyBigTalks', limit: 8 },
    'finance-grid': { cat: 'Finance', limit: 5 },
    'tech-grid': { cat: 'Tech', limit: 5 },
    'lifestyle-grid': { cat: 'EOD Lifestyle', limit: 5 },
    'cricket-grid': { cat: 'Cricket', limit: 5 },
    'football-grid': { cat: 'Football', limit: 5 },
    'race-grid': { cat: 'Race', limit: 5 },
    'golf-grid': { cat: 'Golf', limit: 5 }
  };

  for (const [id, config] of Object.entries(map)) {
    const articles = ARTICLE_DATA.filter(a => a.category === config.cat).slice(0, config.limit);
    renderArticles(articles, id);
  }
}

function handleSearch(query) {
  const sections = document.querySelectorAll('.category-section');
  const searchSection = document.getElementById('search-results-section');
  const feedSection = document.getElementById('articles-feed-section');

  if (!query || query.trim() === '') {
    if (searchSection) searchSection.style.display = 'none';
    if (feedSection) feedSection.style.display = 'block';
    sections.forEach(s => s.style.display = 'block');
    return;
  }

  sections.forEach(s => s.style.display = 'none');
  if (feedSection) feedSection.style.display = 'none';
  if (searchSection) searchSection.style.display = 'block';

  const filtered = ARTICLE_DATA.filter(article =>
    article.title.toLowerCase().includes(query.toLowerCase()) ||
    article.excerpt.toLowerCase().includes(query.toLowerCase()) ||
    article.category.toLowerCase().includes(query.toLowerCase())
  );
  renderArticles(filtered, 'search-grid');
}

function filterByCategory(category) {
  const searchSection = document.getElementById('search-results-section');
  const feedSection = document.getElementById('articles-feed-section');
  const sections = document.querySelectorAll('.category-section');

  if (category.toLowerCase() === 'all' || category === '') {
    renderHomeSections();
    return;
  }

  sections.forEach(s => s.style.display = 'none');
  if (feedSection) feedSection.style.display = 'none';
  if (searchSection) searchSection.style.display = 'block';

  const filtered = ARTICLE_DATA.filter(article =>
    article.category.toLowerCase() === category.toLowerCase()
  );
  renderArticles(filtered, 'search-grid');
}

document.addEventListener('DOMContentLoaded', () => {
  const path = window.location.pathname;
  const isArticlesPage = path.includes('articles.html');

  if (isArticlesPage) {
    const tbtArticles = ARTICLE_DATA.filter(a => a.category === 'TinyBigTalks');
    renderVerticalArticles(tbtArticles, 'articles-feed');
  } else {
    // Check for category in URL
    const urlParams = new URLSearchParams(window.location.search);
    const categoryParam = urlParams.get('category');

    if (categoryParam) {
      filterByCategory(categoryParam);
    } else {
      renderHomeSections();
    }
  }


  // Web Search
  const webSearchInput = document.getElementById('web-search');
  if (webSearchInput) {
    webSearchInput.addEventListener('input', (e) => {
      handleSearch(e.target.value);
    });
  }

  // Mobile Mobile Icons / Search
  const searchBtnMobile = document.getElementById('search-btn-mobile');
  const searchOverlay = document.getElementById('mobile-search-overlay');
  const closeSearchBtn = document.getElementById('close-search-btn');
  const mobileSearchInput = document.getElementById('mobile-search-input');

  if (searchBtnMobile) {
    searchBtnMobile.addEventListener('click', () => {
      searchOverlay.classList.add('active');
      mobileSearchInput.focus();
    });
  }

  if (closeSearchBtn) {
    closeSearchBtn.addEventListener('click', () => {
      searchOverlay.classList.remove('active');
    });
  }

  if (mobileSearchInput) {
    mobileSearchInput.addEventListener('input', (e) => {
      handleSearch(e.target.value);
    });
  }

  // Mobile Menu
  const menuBtnMobile = document.getElementById('menu-btn-mobile');
  if (menuBtnMobile) {
    menuBtnMobile.addEventListener('click', () => {
      alert('Sidebar menu coming soon! For now, use the category list below the header.');
    });
  }
});

