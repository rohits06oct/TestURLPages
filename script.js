const ARTICLE_DATA = [
  // TinyBigTalks (11 Real Articles)
  {
    id: 'tbt-4',
    title: 'Peter Magyar Wins Hungarian Parliamentary Election 2026 Results',
    excerpt: "Peter Magyar and the Tisza Party achieve a landslide victory in the 2026 Hungarian parliamentary election, ending Viktor Orbán's 16-year rule with a record voter turnout..",
    image: 'articles/image/peter_magyar_election_2026_win.webp',
    category: 'TinyBigTalks',
    url: 'articles/peter-magyar-hungarian-election-2026.html'
  },
  {
    id: 'tbt-6',
    title: 'Viva Energy Geelong Oil Refinery Fire and Its Impact on Petrol Prices',
    excerpt: "A massive fire at the Viva Energy oil refinery in Geelong was extinguished after 12 hours. Discover the cause and the potential impact on Australian petrol prices amid a global fuel crunch....",
    image: 'https://www.tinybigtalks.online/articles/image/viva_energy_geelong_fire.webp',
    category: 'TinyBigTalks',
    url: 'https://www.tinybigtalks.online/articles/viva-energy-geelong-oil-refinery-fire.html'
  },
  {
    id: 'tbt-5',
    title: 'Polish Tax Office Enters Smartphones: The e-Urząd Skarbowy Revolution',
    excerpt: "Discover the features of Poland's e-Urząd Skarbowy mobile app. With the tax office now on their smartphones, Poles can file taxes, receive letters, and pay securely via BLIK 24/7...",
    image: 'https://www.tinybigtalks.online/articles/image/polish_tax_office_app.webp',
    category: 'TinyBigTalks',
    url: 'https://www.tinybigtalks.online/articles/e-urzad-skarbowy-app-poland.html'
  },
  {
    id: 'tbt-2',
    title: 'Euphoria Season 3 Premiere: Date & How to Watch',
    excerpt: "Get the 'Euphoria' Season 3 premiere details, release date, and full episode schedule. Learn how to watch Zendaya return to HBO Max in April 2026....",
    image: 'articles/image/euphoria-season-3.webp',
    category: 'TinyBigTalks',
    url: 'articles/euphoria-season-3-premiere-how-to-watch.html'
  },
  {
    id: 'tbt-1',
    title: 'Rory McIlroy Wins Masters 2026 Results who win the Masters',
    excerpt: "Rory McIlroy captures his career Grand Slam winning the 2026 Masters. He beat Scheffler by one shot to claim the $4.5M prize at Augusta National...",
    image: 'articles/image/rory_mcilroy_masters_2026_win.webp',
    category: 'TinyBigTalks',
    url: 'articles/rory-mcilroy-masters-2026-winner.html'
  },
  {
    id: 'tbt-3',
    title: 'Barcelona vs Atletico Madrid Champions League 2026',
    excerpt: 'Barcelona put up a stunning first-half comeback but were ultimately eliminated by Atletico Madrid 3-2 on aggregate in the UEFA Champions League 2026 quarter-finals. Full report and player ratings inside..',
    image: 'https://www.tinybigtalks.online/articles/image/barcelona_atletico_ucl_2026.webp',
    category: 'TinyBigTalks',
    url: 'https://www.tinybigtalks.online/articles/barcelona-atletico-madrid-ucl-quarter-final-2026.html'
  },
  // Other categories (restoring previous counts)
  ...Array.from({ length: 5 }, (_, i) => ({
    id: `fin-${i + 1}`,
    title: `Finance Strategy ${i + 1}`,
    excerpt: 'Coming soon...',
    image: 'assets/blog-default.png',
    category: 'Finance',
    url: 'https://www.financereport.online/'
  })),
  ...Array.from({ length: 5 }, (_, i) => ({
    id: `tech-${i + 1}`,
    title: `Future Tech ${i + 1}`,
    excerpt: 'Coming soon...',
    image: 'assets/blog-default.png',
    category: 'Tech',
    url: 'https://www.techreport.online/'
  })),
  ...Array.from({ length: 5 }, (_, i) => ({
    id: `life-${i + 1}`,
    title: `Balanced Life ${i + 1}`,
    excerpt: 'Coming soon...',
    image: 'assets/blog-default.png',
    category: 'EOD Lifestyle',
    url: 'https://www.eodreport.online/'
  })),
  ...Array.from({ length: 5 }, (_, i) => ({
    id: `cric-${i + 1}`,
    title: `Cricket Highlights ${i + 1}`,
    excerpt: 'Coming soon...',
    image: 'assets/blog-default.png',
    category: 'Cricket',
    url: 'https://www.cricketreport.online/'
  })),
  ...Array.from({ length: 5 }, (_, i) => ({
    id: `foot-${i + 1}`,
    title: `Football World ${i + 1}`,
    excerpt: 'Coming soon...',
    image: 'assets/blog-default.png',
    category: 'Football',
    url: 'https://www.footballreport.online/'
  })),
  ...Array.from({ length: 5 }, (_, i) => ({
    id: `race-${i + 1}`,
    title: `Racing Series ${i + 1}`,
    excerpt: 'Coming soon...',
    image: 'assets/blog-default.png',
    category: 'Race',
    url: 'https://www.racenews.online/'
  })),
  ...Array.from({ length: 5 }, (_, i) => ({
    id: `golf-${i + 1}`,
    title: `Golf Greens ${i + 1}`,
    excerpt: 'Coming soon...',
    image: 'assets/blog-default.png',
    category: 'Golf',
    url: 'https://www.golfreport.online/'
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
      <img src="${article.image}" alt="${article.title}" class="article-image" loading="lazy" decoding="async" width="300" height="170">
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
      <img src="${article.image}" alt="${article.title}" class="article-image" loading="lazy" decoding="async" width="300" height="200">
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

