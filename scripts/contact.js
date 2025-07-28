// Contact Page JavaScript
document.addEventListener("DOMContentLoaded", function () {
  // Initialize all components
  initNavigation();
  initContactForm();
  initFAQ();
});

// Navigation functionality (consistent with index.html)
function initNavigation() {
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("navLinks");
  const navOverlay = document.getElementById("navOverlay");

  if (hamburger && navLinks && navOverlay) {
    hamburger.addEventListener("click", toggleMobileMenu);
    navOverlay.addEventListener("click", closeMobileMenu);

    // Close menu when clicking on nav links
    navLinks.addEventListener("click", (e) => {
      if (e.target.tagName === "A") {
        closeMobileMenu();
      }
    });
  }

  function toggleMobileMenu() {
    hamburger.classList.toggle("active");
    navLinks.classList.toggle("active");
    navOverlay.classList.toggle("active");
    document.body.style.overflow = hamburger.classList.contains("active")
      ? "hidden"
      : "";
  }

  function closeMobileMenu() {
    hamburger.classList.remove("active");
    navLinks.classList.remove("active");
    navOverlay.classList.remove("active");
    document.body.style.overflow = "";
  }
}

// Contact Form functionality
function initContactForm() {
  const form = document.getElementById("contactForm");
  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const phoneInput = document.getElementById("phone");
  const subjectSelect = document.getElementById("subject");
  const messageTextarea = document.getElementById("message");
  const charCount = document.getElementById("charCount");
  const submitBtn = document.getElementById("submitBtn");
  const successModal = document.getElementById("successModal");
  const closeModal = document.getElementById("closeModal");

  // Character counter for message
  messageTextarea.addEventListener("input", function () {
    const currentLength = this.value.length;
    const maxLength = this.getAttribute("maxlength");
    charCount.textContent = `${currentLength}/${maxLength}`;

    // Change color based on character count
    if (currentLength > maxLength * 0.9) {
      charCount.style.color = "#ef4444";
    } else if (currentLength > maxLength * 0.7) {
      charCount.style.color = "#f59e0b";
    } else {
      charCount.style.color = "#6b7280";
    }
  });

  // Real-time validation
  nameInput.addEventListener("blur", () => validateName());
  nameInput.addEventListener("input", () => clearError("nameError"));

  emailInput.addEventListener("blur", () => validateEmail());
  emailInput.addEventListener("input", () => clearError("emailError"));

  phoneInput.addEventListener("blur", () => validatePhone());
  phoneInput.addEventListener("input", () => clearError("phoneError"));

  subjectSelect.addEventListener("change", () => validateSubject());

  messageTextarea.addEventListener("blur", () => validateMessage());
  messageTextarea.addEventListener("input", () => clearError("messageError"));

  // Form submission
  form.addEventListener("submit", handleFormSubmit);

  // Modal functionality
  closeModal.addEventListener("click", hideSuccessModal);
  successModal.addEventListener("click", (e) => {
    if (e.target === successModal) {
      hideSuccessModal();
    }
  });

  // Validation functions
  function validateName() {
    const name = nameInput.value.trim();
    const nameRegex = /^[a-zA-Z\s]{2,50}$/;

    if (!name) {
      showError("nameError", "Nama lengkap harus diisi");
      setFieldState(nameInput, "error");
      return false;
    } else if (!nameRegex.test(name)) {
      showError(
        "nameError",
        "Nama hanya boleh berisi huruf dan spasi (2-50 karakter)"
      );
      setFieldState(nameInput, "error");
      return false;
    } else {
      clearError("nameError");
      setFieldState(nameInput, "valid");
      return true;
    }
  }

  function validateEmail() {
    const email = emailInput.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) {
      showError("emailError", "Email harus diisi");
      setFieldState(emailInput, "error");
      return false;
    } else if (!emailRegex.test(email)) {
      showError("emailError", "Format email tidak valid");
      setFieldState(emailInput, "error");
      return false;
    } else {
      clearError("emailError");
      setFieldState(emailInput, "valid");
      return true;
    }
  }

  function validatePhone() {
    const phone = phoneInput.value.trim();
    const phoneRegex = /^(\+62|62|0)[0-9]{9,12}$/;

    if (phone && !phoneRegex.test(phone)) {
      showError(
        "phoneError",
        "Format nomor telepon tidak valid (contoh: 081234567890)"
      );
      setFieldState(phoneInput, "error");
      return false;
    } else {
      clearError("phoneError");
      setFieldState(phoneInput, phone ? "valid" : "default");
      return true;
    }
  }

  function validateSubject() {
    const subject = subjectSelect.value;

    if (!subject) {
      showError("subjectError", "Silakan pilih subjek pesan");
      setFieldState(subjectSelect, "error");
      return false;
    } else {
      clearError("subjectError");
      setFieldState(subjectSelect, "valid");
      return true;
    }
  }

  function validateMessage() {
    const message = messageTextarea.value.trim();

    if (!message) {
      showError("messageError", "Pesan harus diisi");
      setFieldState(messageTextarea, "error");
      return false;
    } else if (message.length < 10) {
      showError("messageError", "Pesan minimal 10 karakter");
      setFieldState(messageTextarea, "error");
      return false;
    } else if (message.length > 500) {
      showError("messageError", "Pesan maksimal 500 karakter");
      setFieldState(messageTextarea, "error");
      return false;
    } else {
      clearError("messageError");
      setFieldState(messageTextarea, "valid");
      return true;
    }
  }

  function showError(errorId, message) {
    const errorElement = document.getElementById(errorId);
    if (errorElement) {
      errorElement.textContent = message;
      errorElement.style.display = "block";
    }
  }

  function clearError(errorId) {
    const errorElement = document.getElementById(errorId);
    if (errorElement) {
      errorElement.textContent = "";
      errorElement.style.display = "none";
    }
  }

  function setFieldState(field, state) {
    field.classList.remove("error", "valid");
    if (state === "error" || state === "valid") {
      field.classList.add(state);
    }
  }

  function handleFormSubmit(e) {
    e.preventDefault();

    // Validate all fields
    const isNameValid = validateName();
    const isEmailValid = validateEmail();
    const isPhoneValid = validatePhone();
    const isSubjectValid = validateSubject();
    const isMessageValid = validateMessage();

    if (
      isNameValid &&
      isEmailValid &&
      isPhoneValid &&
      isSubjectValid &&
      isMessageValid
    ) {
      // Show loading state
      submitBtn.classList.add("loading");
      submitBtn.disabled = true;

      // Simulate form submission (replace with actual API call)
      setTimeout(() => {
        // Reset form
        form.reset();
        charCount.textContent = "0/500";

        // Clear all field states
        const allFields = form.querySelectorAll("input, select, textarea");
        allFields.forEach((field) => {
          field.classList.remove("error", "valid");
        });

        // Reset button state
        submitBtn.classList.remove("loading");
        submitBtn.disabled = false;

        // Show success modal
        showSuccessModal();
      }, 2000);
    }
  }

  function showSuccessModal() {
    successModal.classList.add("show");
    document.body.style.overflow = "hidden";
  }

  function hideSuccessModal() {
    successModal.classList.remove("show");
    document.body.style.overflow = "";
  }
}

// FAQ functionality
function initFAQ() {
  let faqData = [];

  // Load FAQ data
  loadFAQData();

  async function loadFAQData() {
    try {
      const response = await fetch("data/faq.json");
      faqData = await response.json();
      renderFAQ(faqData);
      initFAQSearch();
    } catch (error) {
      console.error("Error loading FAQ data:", error);
      showFAQError();
    }
  }

  function renderFAQ(data) {
    const faqContainer = document.querySelector(".faq-container");
    const noResults = document.getElementById("noResults");

    if (data.length === 0) {
      faqContainer.innerHTML = "";
      noResults.style.display = "block";
      return;
    }

    noResults.style.display = "none";
    faqContainer.innerHTML = data
      .map(
        (faq) => `
            <div class="faq-item" data-id="${faq.id}">
                <div class="faq-question" onclick="toggleFAQ(${faq.id})">
                    <h3>${faq.question}</h3>
                    <span class="faq-toggle">▼</span>
                </div>
                <div class="faq-answer">
                    <p>${faq.answer}</p>
                </div>
            </div>
        `
      )
      .join("");
  }

  function initFAQSearch() {
    const searchInput = document.getElementById("faqSearch");
    const clearBtn = document.getElementById("clearSearch");

    searchInput.addEventListener("input", handleFAQSearch);
    clearBtn.addEventListener("click", clearFAQSearch);

    function handleFAQSearch() {
      const query = searchInput.value.toLowerCase().trim();

      if (query.length > 0) {
        clearBtn.style.display = "block";
      } else {
        clearBtn.style.display = "none";
      }

      if (query.length === 0) {
        renderFAQ(faqData);
        return;
      }

      const filteredData = faqData.filter(
        (faq) =>
          faq.question.toLowerCase().includes(query) ||
          faq.answer.toLowerCase().includes(query) ||
          faq.category.toLowerCase().includes(query)
      );

      renderFAQ(filteredData);

      // Highlight matching items
      if (filteredData.length > 0) {
        setTimeout(() => {
          const faqItems = document.querySelectorAll(".faq-item");
          faqItems.forEach((item) => {
            item.classList.add("highlight");
            setTimeout(() => {
              item.classList.remove("highlight");
            }, 2000);
          });
        }, 100);
      }
    }

    function clearFAQSearch() {
      searchInput.value = "";
      clearBtn.style.display = "none";
      renderFAQ(faqData);
    }
  }

  function showFAQError() {
    const faqContainer = document.querySelector(".faq-container");
    faqContainer.innerHTML = `
            <div class="faq-error">
                <p>⚠️ Gagal memuat data FAQ. Silakan refresh halaman atau hubungi support.</p>
            </div>
        `;
  }

  // Make toggleFAQ function global
  window.toggleFAQ = function (id) {
    const faqItem = document.querySelector(`[data-id="${id}"]`);
    if (faqItem) {
      const isActive = faqItem.classList.contains("active");

      // Close all other FAQ items
      document.querySelectorAll(".faq-item").forEach((item) => {
        item.classList.remove("active");
      });

      // Toggle current item
      if (!isActive) {
        faqItem.classList.add("active");
      }
    }
  };
}

// Smooth scrolling for anchor links
document.addEventListener("click", function (e) {
  if (
    e.target.tagName === "A" &&
    e.target.getAttribute("href").startsWith("#")
  ) {
    e.preventDefault();
    const targetId = e.target.getAttribute("href").substring(1);
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      const offsetTop = targetElement.offsetTop - 100; // Account for fixed navbar
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    }
  }
});

// Add loading animation to external links
document.addEventListener("click", function (e) {
  if (
    e.target.tagName === "A" &&
    e.target.getAttribute("href") &&
    !e.target.getAttribute("href").startsWith("#") &&
    !e.target.getAttribute("href").startsWith("mailto:") &&
    !e.target.getAttribute("href").startsWith("tel:")
  ) {
    const link = e.target;
    const originalText = link.textContent;

    if (
      !link.classList.contains("logo") &&
      !link.classList.contains("cta-button")
    ) {
      link.style.opacity = "0.7";
      setTimeout(() => {
        link.style.opacity = "1";
      }, 300);
    }
  }
});

// Form input animations
document.addEventListener("focusin", function (e) {
  if (
    e.target.tagName === "INPUT" ||
    e.target.tagName === "TEXTAREA" ||
    e.target.tagName === "SELECT"
  ) {
    e.target.parentElement.classList.add("focused");
  }
});

document.addEventListener("focusout", function (e) {
  if (
    e.target.tagName === "INPUT" ||
    e.target.tagName === "TEXTAREA" ||
    e.target.tagName === "SELECT"
  ) {
    e.target.parentElement.classList.remove("focused");
  }
});

// Keyboard navigation for FAQ
document.addEventListener("keydown", function (e) {
  if (
    e.target.classList.contains("faq-question") &&
    (e.key === "Enter" || e.key === " ")
  ) {
    e.preventDefault();
    e.target.click();
  }
});

// Initialize scroll animations
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  }, observerOptions);

  // Observe elements that should animate on scroll
  document
    .querySelectorAll(".contact-form-container, .contact-info, .faq-item")
    .forEach((el) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(20px)";
      el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
      observer.observe(el);
    });
}

// Initialize scroll animations when DOM is loaded
document.addEventListener("DOMContentLoaded", initScrollAnimations);
