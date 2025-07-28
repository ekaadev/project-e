// Product Page JavaScript
class ProductCatalog {
  constructor() {
    this.products = [];
    this.categories = [];
    this.filteredProducts = [];
    this.selectedCourses = [];
    this.currentFilters = {
      search: "",
      category: "",
      level: "",
      price: "",
      sort: "default",
    };

    this.init();
  }

  // Format currency to Rupiah
  formatCurrency(amount) {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  }

  // Format number for display
  formatNumber(num) {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + "M";
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + "K";
    }
    return num.toString();
  }

  async init() {
    try {
      await this.loadData();
      this.setupEventListeners();
      this.populateFilters();
      this.applyFilters();
      this.initializePriceCalculator();
      this.initializeModal();
    } catch (error) {
      console.error("Error initializing product catalog:", error);
      this.showError("Failed to initialize product catalog");
    }
  }

  async loadData() {
    try {
      console.log("Loading products data...");
      const response = await fetch("data/products.json");
      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);

      const data = await response.json();
      console.log("Data loaded successfully:", data);

      this.products = data.products || [];
      this.categories = data.categories || [];

      console.log(
        `Loaded ${this.products.length} products and ${this.categories.length} categories`
      );

      const loadingSpinner = document.getElementById("loadingSpinner");
      if (loadingSpinner) {
        loadingSpinner.style.display = "none";
      }
    } catch (error) {
      console.error("Error loading data:", error);
      this.showError("Error loading courses. Please try again later.");
    }
  }

  showError(message) {
    const spinner = document.getElementById("loadingSpinner");
    spinner.innerHTML = `
      <i class="fas fa-exclamation-triangle"></i>
      <p>${message}</p>
    `;
  }

  setupEventListeners() {
    // Search input
    const searchInput = document.getElementById("searchInput");
    searchInput.addEventListener("input", (e) => {
      this.currentFilters.search = e.target.value.toLowerCase();
      this.applyFilters();
    });

    // Filter dropdowns
    ["categoryFilter", "levelFilter", "priceFilter", "sortBy"].forEach(
      (filterId) => {
        const element = document.getElementById(filterId);
        if (element) {
          element.addEventListener("change", (e) => {
            if (filterId === "sortBy") {
              this.currentFilters.sort = e.target.value;
            } else {
              const filterKey = filterId.replace("Filter", "");
              this.currentFilters[filterKey] = e.target.value;
            }
            this.applyFilters();
          });
        }
      }
    );

    // Clear filters button
    const clearBtn = document.getElementById("clearFilters");
    if (clearBtn) {
      clearBtn.addEventListener("click", () => {
        this.clearAllFilters();
      });
    }

    // Enter key for search
    if (searchInput) {
      searchInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          this.applyFilters();
        }
      });
    }
  }

  clearAllFilters() {
    // Reset filter values
    this.currentFilters = {
      search: "",
      category: "",
      level: "",
      price: "",
      sort: "default",
    };

    // Reset form elements
    const searchInput = document.getElementById("searchInput");
    const categoryFilter = document.getElementById("categoryFilter");
    const levelFilter = document.getElementById("levelFilter");
    const priceFilter = document.getElementById("priceFilter");
    const sortBy = document.getElementById("sortBy");

    if (searchInput) searchInput.value = "";
    if (categoryFilter) categoryFilter.value = "";
    if (levelFilter) levelFilter.value = "";
    if (priceFilter) priceFilter.value = "";
    if (sortBy) sortBy.value = "default";

    // Apply filters
    this.applyFilters();
  }

  populateFilters() {
    // Populate category filter
    const categoryFilter = document.getElementById("categoryFilter");
    if (categoryFilter && this.categories.length > 0) {
      this.categories.forEach((category) => {
        const option = document.createElement("option");
        option.value = category.id;
        option.textContent = `${category.icon} ${category.name}`;
        categoryFilter.appendChild(option);
      });
    }
  }

  applyFilters() {
    let filtered = [...this.products];

    // Apply search filter
    if (this.currentFilters.search) {
      filtered = filtered.filter(
        (product) =>
          product.title.toLowerCase().includes(this.currentFilters.search) ||
          product.description
            .toLowerCase()
            .includes(this.currentFilters.search) ||
          product.instructor
            .toLowerCase()
            .includes(this.currentFilters.search) ||
          product.technologies.some((tech) =>
            tech.toLowerCase().includes(this.currentFilters.search)
          )
      );
    }

    // Apply category filter
    if (this.currentFilters.category) {
      filtered = filtered.filter(
        (product) => product.category === this.currentFilters.category
      );
    }

    // Apply level filter
    if (this.currentFilters.level) {
      filtered = filtered.filter(
        (product) => product.level === this.currentFilters.level
      );
    }

    // Apply price filter
    if (this.currentFilters.price) {
      filtered = filtered.filter((product) => {
        const price = product.price;

        switch (this.currentFilters.price) {
          case "0-2000000":
            return price <= 2000000;
          case "2000000-3000000":
            return price >= 2000000 && price <= 3000000;
          case "3000000-4000000":
            return price >= 3000000 && price <= 4000000;
          case "4000000+":
            return price >= 4000000;
          default:
            return true;
        }
      });
    }

    // Apply sorting
    filtered = this.sortProducts(filtered, this.currentFilters.sort);

    this.filteredProducts = filtered;
    this.updateResultsCount();
    this.renderProducts();
  }

  sortProducts(products, sortBy) {
    const sorted = [...products];

    switch (sortBy) {
      case "price-low":
        return sorted.sort((a, b) => a.price - b.price);
      case "price-high":
        return sorted.sort((a, b) => b.price - a.price);
      case "rating":
        return sorted.sort((a, b) => b.rating - a.rating);
      case "students":
        return sorted.sort((a, b) => b.students - a.students);
      case "title":
        return sorted.sort((a, b) => a.title.localeCompare(b.title));
      default:
        return sorted;
    }
  }

  updateResultsCount() {
    const count = this.filteredProducts.length;
    const total = this.products.length;
    const resultsText =
      count === total
        ? `Menampilkan semua ${total} kursus`
        : `Menampilkan ${count} dari ${total} kursus`;

    const resultsElement = document.getElementById("resultsCount");
    if (resultsElement) {
      resultsElement.textContent = resultsText;
    }
  }

  renderProducts() {
    const grid = document.getElementById("productsGrid");
    const noResults = document.getElementById("noResults");

    if (!grid) return;

    if (this.filteredProducts.length === 0) {
      grid.innerHTML = "";
      if (noResults) noResults.style.display = "block";
      return;
    }

    if (noResults) noResults.style.display = "none";

    // Add fade-out effect
    grid.style.opacity = "0";

    setTimeout(() => {
      grid.innerHTML = "";

      this.filteredProducts.forEach((product, index) => {
        const card = this.createProductCard(product);
        grid.appendChild(card);

        // Staggered fade-in animation
        setTimeout(() => {
          card.classList.add("fade-in");
        }, index * 50);
      });

      grid.style.opacity = "1";
    }, 100);
  }

  createProductCard(product) {
    const card = document.createElement("div");
    card.className = "product-card";
    card.setAttribute("data-course-id", product.id);

    const categoryInfo = this.categories.find(
      (cat) => cat.id === product.category
    );
    const categoryDisplay = categoryInfo
      ? `${categoryInfo.icon} ${categoryInfo.name}`
      : product.category;

    const stars = this.generateStars(product.rating);
    const technologies = product.technologies.slice(0, 4);
    const hasMore = product.technologies.length > 4;

    // Calculate discount percentage
    const discountPercent = product.originalPrice
      ? Math.round(
          ((product.originalPrice - product.price) / product.originalPrice) *
            100
        )
      : 0;

    card.innerHTML = `
      <div class="product-image">
        <img src="${product.image}" alt="${
      product.title
    }" onerror="this.style.display='none'; this.parentNode.innerHTML='<i class=\\"fas fa-code\\"></i>
        <button class="add-to-calculator" onclick="productCatalog.addToCalculator('${
          product.id
        }')" title="Tambah ke Kalkulator">
          <i class="fas fa-plus"></i>
        </button>
        ${
          discountPercent > 0
            ? `<div class="discount-badge">${discountPercent}% OFF</div>`
            : ""
        }
      </div>
      <div class="product-content">
        <div class="product-category">${categoryDisplay}</div>
        <h3 class="product-title">${product.title}</h3>
        <p class="product-description">${product.description}</p>
        
        <div class="product-meta">
          <div class="meta-item">
            <i class="fas fa-clock"></i>
            <span>${product.duration}</span>
          </div>
          <div class="meta-item">
            <i class="fas fa-signal"></i>
            <span>${product.level}</span>
          </div>
          <div class="meta-item">
            <i class="fas fa-user"></i>
            <span>${product.instructor}</span>
          </div>
          <div class="meta-item">
            <i class="fas fa-users"></i>
            <span>${this.formatNumber(product.students)} students</span>
          </div>
        </div>

        <div class="product-technologies">
          ${technologies
            .map((tech) => `<span class="tech-tag">${tech}</span>`)
            .join("")}
          ${
            hasMore
              ? `<span class="tech-tag">+${
                  product.technologies.length - 4
                } more</span>`
              : ""
          }
        </div>

        <div class="product-rating">
          <div class="stars">${stars}</div>
          <span class="rating-text">${product.rating} (${this.formatNumber(
      product.students
    )} reviews)</span>
        </div>

        <div class="product-footer">
          <div class="product-price">
            <span class="current-price">${this.formatCurrency(
              product.price
            )}</span>
            ${
              product.originalPrice && product.originalPrice > product.price
                ? `<span class="original-price">${this.formatCurrency(
                    product.originalPrice
                  )}</span>`
                : ""
            }
          </div>
          <div class="product-actions">
            <button class="view-details-btn" onclick="productCatalog.openModal('${
              product.id
            }')">
              <i class="fas fa-eye"></i>
              Lihat Detail
            </button>
            <button class="enroll-btn" onclick="productCatalog.enrollCourse('${
              product.id
            }')">
              <i class="fas fa-play-circle"></i>
              Daftar Sekarang
            </button>
          </div>
        </div>
      </div>
    `;

    return card;
  }

  generateStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    let stars = "";

    // Full stars
    for (let i = 0; i < fullStars; i++) {
      stars += '<i class="fas fa-star"></i>';
    }

    // Half star
    if (hasHalfStar) {
      stars += '<i class="fas fa-star-half-alt"></i>';
    }

    // Empty stars
    for (let i = 0; i < emptyStars; i++) {
      stars += '<i class="far fa-star"></i>';
    }

    return stars;
  }

  formatNumber(num) {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + "M";
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + "K";
    }
    return num.toString();
  }

  enrollCourse(courseId) {
    console.log("Enrolling in course:", courseId);
    const numericId = parseInt(courseId);
    const course = this.products.find((p) => p.id === numericId);
    if (course) {
      // In a real application, this would handle enrollment logic
      alert(
        `Mendaftar untuk: ${course.title}\n\nHarga: ${this.formatCurrency(
          course.price
        )}\n\nAnda akan diarahkan ke halaman pendaftaran.`
      );
    } else {
      console.error("Course not found:", courseId);
    }
  }

  // Price Calculator Methods
  initializePriceCalculator() {
    this.updateCalculatorDisplay();

    // Setup checkout button
    const checkoutBtn = document.getElementById("proceedCheckout");
    if (checkoutBtn) {
      checkoutBtn.addEventListener("click", () => {
        this.proceedToCheckout();
      });
    }
  }

  addToCalculator(courseId) {
    console.log("Adding to calculator:", courseId);
    // Ensure courseId is converted to number for comparison
    const numericId = parseInt(courseId);
    const course = this.products.find((p) => p.id === numericId);

    if (!course) {
      console.error("Course not found:", courseId);
      return;
    }

    if (this.selectedCourses.find((c) => c.id === numericId)) {
      console.log("Course already in calculator");
      return;
    }

    this.selectedCourses.push(course);
    console.log("Course added to calculator:", course.title);
    this.updateCalculatorDisplay();
    this.updateAddButton(courseId, true);
  }

  removeFromCalculator(courseId) {
    const numericId = parseInt(courseId);
    this.selectedCourses = this.selectedCourses.filter(
      (c) => c.id !== numericId
    );
    this.updateCalculatorDisplay();
    this.updateAddButton(courseId, false);
  }

  updateCalculatorDisplay() {
    const countEl = document.getElementById("selectedCount");
    const listEl = document.getElementById("selectedCoursesList");
    const subtotalEl = document.getElementById("subtotal");
    const discountRowEl = document.getElementById("discountRow");
    const discountPercentEl = document.getElementById("discountPercent");
    const discountAmountEl = document.getElementById("discountAmount");
    const totalEl = document.getElementById("totalAmount");
    const checkoutBtn = document.getElementById("proceedCheckout");

    if (!countEl || !listEl) return;

    countEl.textContent = this.selectedCourses.length;

    if (this.selectedCourses.length === 0) {
      listEl.innerHTML =
        '<p class="empty-message">Belum ada kursus yang dipilih</p>';
      subtotalEl.textContent = this.formatCurrency(0);
      discountRowEl.style.display = "none";
      totalEl.textContent = this.formatCurrency(0);
      checkoutBtn.disabled = true;
      return;
    }

    // Display selected courses
    listEl.innerHTML = this.selectedCourses
      .map(
        (course) => `
      <div class="selected-course-item">
        <div class="course-info">
          <h5>${course.title}</h5>
          <div class="course-price">${this.formatCurrency(course.price)}</div>
        </div>
        <button class="remove-course" onclick="productCatalog.removeFromCalculator('${
          course.id
        }')">
          ×
        </button>
      </div>
    `
      )
      .join("");

    // Calculate pricing
    const subtotal = this.selectedCourses.reduce(
      (sum, course) => sum + course.price,
      0
    );
    const discount = this.calculateDiscount(
      this.selectedCourses.length,
      subtotal
    );
    const total = subtotal - discount.amount;

    subtotalEl.textContent = this.formatCurrency(subtotal);

    if (discount.amount > 0) {
      discountRowEl.style.display = "flex";
      discountPercentEl.textContent = discount.percent;
      discountAmountEl.textContent = this.formatCurrency(discount.amount);
    } else {
      discountRowEl.style.display = "none";
    }

    totalEl.textContent = this.formatCurrency(total);
    checkoutBtn.disabled = false;
  }

  calculateDiscount(courseCount, subtotal) {
    let percent = 0;

    if (courseCount >= 5) {
      percent = 25;
    } else if (courseCount >= 3) {
      percent = 15;
    } else if (courseCount >= 2) {
      percent = 10;
    }

    const amount = Math.round(((subtotal * percent) / 100) * 100) / 100;
    return { percent, amount };
  }

  updateAddButton(courseId, added) {
    const button = document.querySelector(
      `[data-course-id="${courseId}"] .add-to-calculator`
    );
    if (button) {
      if (added) {
        button.classList.add("added");
        button.innerHTML = '<i class="fas fa-check"></i>';
      } else {
        button.classList.remove("added");
        button.innerHTML = '<i class="fas fa-plus"></i>';
      }
    }
  }

  proceedToCheckout() {
    if (this.selectedCourses.length === 0) return;

    const courseNames = this.selectedCourses.map((c) => c.title).join("\n- ");
    const subtotal = this.selectedCourses.reduce(
      (sum, course) => sum + course.price,
      0
    );
    const discount = this.calculateDiscount(
      this.selectedCourses.length,
      subtotal
    );
    const total = subtotal - discount.amount;

    alert(
      `Melanjutkan ke checkout dengan:\n\n- ${courseNames}\n\nSubtotal: ${this.formatCurrency(
        subtotal
      )}\nDiskon: ${this.formatCurrency(
        discount.amount
      )}\nTotal: ${this.formatCurrency(
        total
      )}\n\nAnda akan diarahkan ke halaman pembayaran.`
    );
  }

  // Modal Methods
  initializeModal() {
    const modal = document.getElementById("productModal");
    const closeBtn = document.getElementById("closeModal");

    if (closeBtn) {
      closeBtn.addEventListener("click", () => {
        this.closeModal();
      });
    }

    if (modal) {
      modal.addEventListener("click", (e) => {
        if (e.target === modal) {
          this.closeModal();
        }
      });
    }

    // Setup modal buttons
    const addToCalculatorBtn = document.getElementById("addToCalculator");
    const enrollBtn = document.getElementById("modalEnrollBtn");

    if (addToCalculatorBtn) {
      addToCalculatorBtn.addEventListener("click", () => {
        const courseId = addToCalculatorBtn.dataset.courseId;
        if (courseId) {
          this.addToCalculator(courseId);
          this.updateModalButtons(courseId);
        }
      });
    }

    if (enrollBtn) {
      enrollBtn.addEventListener("click", () => {
        const courseId = enrollBtn.dataset.courseId;
        if (courseId) {
          this.enrollCourse(courseId);
        }
      });
    }
  }

  openModal(courseId) {
    console.log("Opening modal for course:", courseId);
    const numericId = parseInt(courseId);
    const course = this.products.find((p) => p.id === numericId);
    if (!course) {
      console.error("Course not found for modal:", courseId);
      return;
    }

    const modal = document.getElementById("productModal");

    // Populate modal content
    document.getElementById("modalTitle").textContent = course.title;
    document.getElementById("modalImage").src = course.image;
    document.getElementById("modalImage").alt = course.title;

    const categoryInfo = this.categories.find(
      (cat) => cat.id === course.category
    );
    document.getElementById("modalCategory").textContent = categoryInfo
      ? `${categoryInfo.icon} ${categoryInfo.name}`
      : course.category;

    document.getElementById("modalRating").innerHTML = this.generateStars(
      course.rating
    );
    document.getElementById("modalRatingText").textContent = `${
      course.rating
    } (${this.formatNumber(course.students)} students)`;
    document.getElementById("modalDescription").textContent =
      course.description;
    document.getElementById("modalDuration").textContent = course.duration;
    document.getElementById("modalLevel").textContent = course.level;
    document.getElementById("modalInstructor").textContent = course.instructor;
    document.getElementById("modalStudents").textContent = this.formatNumber(
      course.students
    );

    // Technologies
    const techContainer = document.getElementById("modalTechnologies");
    techContainer.innerHTML = course.technologies
      .map((tech) => `<span class="tech-tag">${tech}</span>`)
      .join("");

    // Price
    document.getElementById("modalCurrentPrice").textContent =
      this.formatCurrency(course.price);
    const originalPriceEl = document.getElementById("modalOriginalPrice");
    const discountEl = document.getElementById("modalDiscount");

    if (course.originalPrice && course.originalPrice > course.price) {
      originalPriceEl.textContent = this.formatCurrency(course.originalPrice);
      originalPriceEl.style.display = "inline";

      const discountPercent = Math.round(
        ((course.originalPrice - course.price) / course.originalPrice) * 100
      );
      discountEl.textContent = `${discountPercent}% OFF`;
      discountEl.style.display = "inline";
    } else {
      originalPriceEl.style.display = "none";
      discountEl.style.display = "none";
    }

    // Set course ID for buttons
    document.getElementById("addToCalculator").dataset.courseId = courseId;
    document.getElementById("modalEnrollBtn").dataset.courseId = courseId;

    this.updateModalButtons(courseId);

    modal.style.display = "block";
    document.body.style.overflow = "hidden";
  }

  closeModal() {
    const modal = document.getElementById("productModal");
    modal.style.display = "none";
    document.body.style.overflow = "auto";
  }

  updateModalButtons(courseId) {
    const addBtn = document.getElementById("addToCalculator");
    const numericId = parseInt(courseId);
    const isAdded = this.selectedCourses.find((c) => c.id === numericId);

    if (addBtn) {
      if (isAdded) {
        addBtn.innerHTML =
          '<i class="fas fa-check"></i> Ditambahkan ke Kalkulator';
      } else {
        addBtn.innerHTML =
          '<i class="fas fa-calculator"></i> Tambah ke Kalkulator';
      }
    }
  }
}

// Initialize the product catalog when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  window.productCatalog = new ProductCatalog();
});
