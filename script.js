const ARTICLE_DATA = [
  {
    id: 1,
    title: 'Stock Market Trends to Watch',
    excerpt: 'Stay updated with the latest movements in the stock market and key factors driving ....',
    image: 'assets/blog-default.png',
    category: 'Finance',
    url: 'articles/stock-market-trends.html'
  },
  {
    id: 2,
    title: 'Latest Gadgets of 2024',
    excerpt: 'Discover the most exciting tech gadgets of 2024 that are shaping the future of technology...',
    image: 'assets/blog-default.png',
    category: 'Tech',
    url: 'articles/latest-gadgets.html'
  },
  {
    id: 3,
    title: '5 Tips for Work-Life Balance',
    excerpt: 'Learn effective strategies to balance your work and personal life for a healthier lifestyle...',
    image: 'assets/blog-default.png',
    category: 'EOD Lifestyle',
    url: 'articles/work-life-balance.html'
  },
  {
    id: 4,
    title: 'IPL 2024: Season Highlights',
    excerpt: 'Catch up on the most thrilling moments and highlights from the IPL 2024 season...',
    image: 'assets/blog-default.png',
    category: 'Cricket',
    url: 'articles/ipl-2024.html'
  },
  {
    id: 5,
    title: 'Formula 1: Race Day Insights',
    excerpt: 'Get an inside look at the latest Formula 1 races and behind-the-scenes action...',
    image: 'assets/blog-default.png',
    category: 'Race',
    url: 'articles/f1-insights.html'
  },
  {
    id: 6,
    title: 'Top Golf Destinations to Visit',
    excerpt: 'Explore the best golf courses around the world for your next vacation...',
    image: 'assets/blog-default.png',
    category: 'Golf',
    url: 'articles/top-golf-destinations.html'
  }
];

function renderArticles(articles) {
  const container = document.getElementById('articles-grid');
  if (!container) return;

  if (articles.length === 0) {
    container.innerHTML = '<div style="grid-column: 1/-1; text-align: center; padding: 50px; color: var(--text-muted);">No articles found</div>';
    return;
  }

  container.innerHTML = articles.map(article => `
    <article class="article-card" onclick="window.open('${article.url}', '_blank')">
      <img src="${article.image}" alt="${article.title}" class="article-image">
      <div class="article-content">
        <h2 class="article-title">${article.title}</h2>
        <p class="article-excerpt">${article.excerpt}</p>
        <span class="read-more">[Read more]</span>
      </div>
    </article>
  `).join('');
}

function handleSearch(query) {
  const filtered = ARTICLE_DATA.filter(article =>
    article.title.toLowerCase().includes(query.toLowerCase()) ||
    article.excerpt.toLowerCase().includes(query.toLowerCase()) ||
    article.category.toLowerCase().includes(query.toLowerCase())
  );
  renderArticles(filtered);
}

function filterByCategory(category) {
  // Update Active State in UI
  const navLinks = document.querySelectorAll('.desktop-nav a');
  navLinks.forEach(link => {
    if (link.textContent.trim().toLowerCase() === category.toLowerCase()) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

  if (category.toLowerCase() === 'all' || category === '') {
    renderArticles(ARTICLE_DATA);
    return;
  }

  const filtered = ARTICLE_DATA.filter(article =>
    article.category.toLowerCase() === category.toLowerCase()
  );
  renderArticles(filtered);
}

document.addEventListener('DOMContentLoaded', () => {
  // Check for category in URL
  const urlParams = new URLSearchParams(window.location.search);
  const categoryParam = urlParams.get('category');

  if (categoryParam) {
    filterByCategory(categoryParam);
  } else {
    renderArticles(ARTICLE_DATA);
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

