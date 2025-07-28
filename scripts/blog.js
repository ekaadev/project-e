// Blog functionality
class BlogManager {
  constructor() {
    this.articles = [];
    this.filteredArticles = [];
    this.currentPage = 1;
    this.articlesPerPage = 6;
    this.currentCategory = "";
    this.currentSearch = "";
    this.currentArticleForShare = null;

    this.init();
  }

  async init() {
    await this.loadArticles();
    this.setupEventListeners();
    this.setupNavigation();
    this.populateCategoryFilter();
    this.displayArticles();
    this.setupPagination();
  }

  async loadArticles() {
    try {
      const response = await fetch("data/blog.json");
      const data = await response.json();
      this.articles = data.articles;
      this.filteredArticles = [...this.articles];
    } catch (error) {
      console.error("Error loading articles:", error);
      this.articles = [];
      this.filteredArticles = [];
    }
  }

  setupEventListeners() {
    // Search functionality
    const searchInput = document.getElementById("searchInput");
    const searchBtn = document.getElementById("searchBtn");

    searchInput.addEventListener("input", (e) => {
      this.currentSearch = e.target.value.toLowerCase();
      this.filterArticles();
    });

    searchBtn.addEventListener("click", () => {
      this.filterArticles();
    });

    searchInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        this.filterArticles();
      }
    });

    // Category filter
    const categoryFilter = document.getElementById("categoryFilter");
    categoryFilter.addEventListener("change", (e) => {
      this.currentCategory = e.target.value;
      this.filterArticles();
    });

    // Share modal
    const shareModal = document.getElementById("shareModal");
    const closeModal = document.getElementById("closeModal");

    closeModal.addEventListener("click", () => {
      this.closeShareModal();
    });

    shareModal.addEventListener("click", (e) => {
      if (e.target === shareModal) {
        this.closeShareModal();
      }
    });

    // Share buttons
    document.getElementById("shareFacebook").addEventListener("click", () => {
      this.shareToFacebook();
    });

    document.getElementById("shareTwitter").addEventListener("click", () => {
      this.shareToTwitter();
    });

    document.getElementById("shareLinkedIn").addEventListener("click", () => {
      this.shareToLinkedIn();
    });

    document.getElementById("shareWhatsApp").addEventListener("click", () => {
      this.shareToWhatsApp();
    });

    document.getElementById("copyLink").addEventListener("click", () => {
      this.copyLink();
    });
  }

  setupNavigation() {
    // Mobile menu functionality (consistent with index.js)
    const hamburger = document.getElementById("hamburger");
    const navLinks = document.getElementById("navLinks");
    const navOverlay = document.getElementById("navOverlay");
    const body = document.body;

    function toggleMobileMenu() {
      const isActive = hamburger.classList.contains("active");

      hamburger.classList.toggle("active");
      navLinks.classList.toggle("active");
      navOverlay.classList.toggle("active");

      // Prevent body scroll when menu is open
      if (!isActive) {
        body.style.overflow = "hidden";
      } else {
        body.style.overflow = "";
      }
    }

    function closeMobileMenu() {
      hamburger.classList.remove("active");
      navLinks.classList.remove("active");
      navOverlay.classList.remove("active");
      body.style.overflow = "";
    }

    hamburger.addEventListener("click", toggleMobileMenu);

    // Keyboard support for hamburger menu
    hamburger.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        toggleMobileMenu();
      }
    });

    // ESC key to close menu
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && navLinks.classList.contains("active")) {
        closeMobileMenu();
      }
    });

    // Close mobile menu when clicking on nav links
    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", (e) => {
        closeMobileMenu();
      });
    });

    // Close mobile menu when clicking outside
    document.addEventListener("click", (e) => {
      if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
        closeMobileMenu();
      }
    });

    // Close menu when clicking overlay
    navOverlay.addEventListener("click", closeMobileMenu);

    // Close mobile menu on window resize
    window.addEventListener("resize", () => {
      if (window.innerWidth > 768) {
        closeMobileMenu();
      }
    });
  }

  async populateCategoryFilter() {
    try {
      const response = await fetch("data/blog.json");
      const data = await response.json();
      const categoryFilter = document.getElementById("categoryFilter");

      data.categories.forEach((category) => {
        const option = document.createElement("option");
        option.value = category;
        option.textContent = category;
        categoryFilter.appendChild(option);
      });
    } catch (error) {
      console.error("Error loading categories:", error);
    }
  }

  filterArticles() {
    this.filteredArticles = this.articles.filter((article) => {
      const matchesSearch =
        !this.currentSearch ||
        article.title.toLowerCase().includes(this.currentSearch) ||
        article.excerpt.toLowerCase().includes(this.currentSearch) ||
        article.content.toLowerCase().includes(this.currentSearch) ||
        article.author.toLowerCase().includes(this.currentSearch) ||
        article.tags.some((tag) =>
          tag.toLowerCase().includes(this.currentSearch)
        );

      const matchesCategory =
        !this.currentCategory || article.category === this.currentCategory;

      return matchesSearch && matchesCategory;
    });

    this.currentPage = 1;
    this.displayArticles();
    this.setupPagination();
  }

  displayArticles() {
    const articlesGrid = document.getElementById("articlesGrid");
    const noResults = document.getElementById("noResults");

    if (this.filteredArticles.length === 0) {
      articlesGrid.innerHTML = "";
      noResults.style.display = "block";
      return;
    }

    noResults.style.display = "none";

    const startIndex = (this.currentPage - 1) * this.articlesPerPage;
    const endIndex = startIndex + this.articlesPerPage;
    const articlesToShow = this.filteredArticles.slice(startIndex, endIndex);

    articlesGrid.innerHTML = articlesToShow
      .map((article) => this.createArticleCard(article))
      .join("");

    // Add event listeners to share buttons
    articlesGrid.querySelectorAll(".share-button").forEach((button) => {
      button.addEventListener("click", (e) => {
        e.stopPropagation();
        const articleId = parseInt(button.dataset.articleId);
        this.openShareModal(articleId);
      });
    });

    // Add click event to article cards for future article detail functionality
    articlesGrid.querySelectorAll(".article-card").forEach((card) => {
      card.addEventListener("click", (e) => {
        if (!e.target.closest(".share-button")) {
          const articleId = parseInt(card.dataset.articleId);
          console.log("Article clicked:", articleId);
          // Future: Navigate to article detail page
        }
      });
    });
  }

  createArticleCard(article) {
    const formattedDate = this.formatDate(article.date);

    return `
            <div class="article-card" data-article-id="${article.id}">
                <div class="article-image" style="background-image: url('${
                  article.image
                }')">
                    <div class="article-category">${article.category}</div>
                </div>
                <div class="article-content">
                    <div class="article-meta">
                        <div class="article-date">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                                <line x1="16" y1="2" x2="16" y2="6"></line>
                                <line x1="8" y1="2" x2="8" y2="6"></line>
                                <line x1="3" y1="10" x2="21" y2="10"></line>
                            </svg>
                            ${formattedDate}
                        </div>
                        <div class="article-read-time">${article.readTime}</div>
                    </div>
                    <h3 class="article-title">${article.title}</h3>
                    <p class="article-excerpt">${article.excerpt}</p>
                    <div class="article-footer">
                        <div class="article-author">By ${article.author}</div>
                        <button class="share-button" data-article-id="${
                          article.id
                        }" title="Bagikan artikel">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <circle cx="18" cy="5" r="3"></circle>
                                <circle cx="6" cy="12" r="3"></circle>
                                <circle cx="18" cy="19" r="3"></circle>
                                <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
                                <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
                            </svg>
                        </button>
                    </div>
                    <div class="article-tags">
                        ${article.tags
                          .map((tag) => `<span class="tag">${tag}</span>`)
                          .join("")}
                    </div>
                </div>
            </div>
        `;
  }

  setupPagination() {
    const totalPages = Math.ceil(
      this.filteredArticles.length / this.articlesPerPage
    );
    const paginationContainer = document.getElementById("pagination");

    if (totalPages <= 1) {
      paginationContainer.innerHTML = "";
      return;
    }

    let paginationHTML = "";

    // Previous button
    paginationHTML += `
            <button ${
              this.currentPage === 1 ? "disabled" : ""
            } onclick="blogManager.goToPage(${this.currentPage - 1})">
                ← Previous
            </button>
        `;

    // Page numbers
    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= this.currentPage - 1 && i <= this.currentPage + 1)
      ) {
        paginationHTML += `
                    <button class="${
                      i === this.currentPage ? "active" : ""
                    }" onclick="blogManager.goToPage(${i})">
                        ${i}
                    </button>
                `;
      } else if (i === this.currentPage - 2 || i === this.currentPage + 2) {
        paginationHTML += "<span>...</span>";
      }
    }

    // Next button
    paginationHTML += `
            <button ${
              this.currentPage === totalPages ? "disabled" : ""
            } onclick="blogManager.goToPage(${this.currentPage + 1})">
                Next →
            </button>
        `;

    paginationContainer.innerHTML = paginationHTML;
  }

  goToPage(page) {
    this.currentPage = page;
    this.displayArticles();
    this.setupPagination();

    // Scroll to top of articles section
    document
      .querySelector(".blog-articles")
      .scrollIntoView({ behavior: "smooth" });
  }

  formatDate(dateString) {
    const date = new Date(dateString);
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return date.toLocaleDateString("id-ID", options);
  }

  openShareModal(articleId) {
    const article = this.articles.find((a) => a.id === articleId);
    if (article) {
      this.currentArticleForShare = article;
      const shareModal = document.getElementById("shareModal");
      shareModal.classList.add("active");
      document.body.style.overflow = "hidden";
    }
  }

  closeShareModal() {
    const shareModal = document.getElementById("shareModal");
    shareModal.classList.remove("active");
    document.body.style.overflow = "auto";
    this.currentArticleForShare = null;
  }

  shareToFacebook() {
    if (!this.currentArticleForShare) return;

    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(this.currentArticleForShare.title);
    const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${text}`;

    this.openShareWindow(shareUrl);
  }

  shareToTwitter() {
    if (!this.currentArticleForShare) return;

    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(
      `${this.currentArticleForShare.title} - ${this.currentArticleForShare.excerpt}`
    );
    const shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${text}`;

    this.openShareWindow(shareUrl);
  }

  shareToLinkedIn() {
    if (!this.currentArticleForShare) return;

    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(this.currentArticleForShare.title);
    const summary = encodeURIComponent(this.currentArticleForShare.excerpt);
    const shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}&title=${title}&summary=${summary}`;

    this.openShareWindow(shareUrl);
  }

  shareToWhatsApp() {
    if (!this.currentArticleForShare) return;

    const text = encodeURIComponent(
      `${this.currentArticleForShare.title}\n\n${this.currentArticleForShare.excerpt}\n\n${window.location.href}`
    );
    const shareUrl = `https://wa.me/?text=${text}`;

    this.openShareWindow(shareUrl);
  }

  async copyLink() {
    try {
      await navigator.clipboard.writeText(window.location.href);

      // Show success feedback
      const copyButton = document.getElementById("copyLink");
      const originalText = copyButton.innerHTML;
      copyButton.innerHTML = `
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="20,6 9,17 4,12"></polyline>
                </svg>
                Link Copied!
            `;

      setTimeout(() => {
        copyButton.innerHTML = originalText;
      }, 2000);
    } catch (err) {
      console.error("Failed to copy link:", err);
      // Fallback for browsers that don't support clipboard API
      const textArea = document.createElement("textarea");
      textArea.value = window.location.href;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
    }
  }

  openShareWindow(url) {
    const width = 600;
    const height = 400;
    const left = (window.innerWidth - width) / 2;
    const top = (window.innerHeight - height) / 2;

    window.open(
      url,
      "share",
      `width=${width},height=${height},left=${left},top=${top},scrollbars=yes,resizable=yes`
    );

    this.closeShareModal();
  }
}

// Initialize blog manager when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  window.blogManager = new BlogManager();
});

// Smooth scrolling for anchor links
document.addEventListener("click", (e) => {
  if (
    e.target.tagName === "A" &&
    e.target.getAttribute("href").startsWith("#")
  ) {
    e.preventDefault();
    const targetId = e.target.getAttribute("href").substring(1);
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
  }
});

// Handle navbar scroll effect
window.addEventListener("scroll", () => {
  const navbar = document.getElementById("navbar");
  if (window.scrollY > 50) {
    navbar.style.background = "rgba(255, 255, 255, 0.98)";
    navbar.style.boxShadow = "0 2px 20px rgba(0, 0, 0, 0.1)";
  } else {
    navbar.style.background = "rgba(255, 255, 255, 0.95)";
    navbar.style.boxShadow = "none";
  }
});
