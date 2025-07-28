// About page specific JavaScript functionality

document.addEventListener("DOMContentLoaded", function () {
  // Initialize about page features
  initSidebarNavigation();
  initNavbarNavigation();
  initAboutAnimations();
});

// Navbar navigation functionality
function initNavbarNavigation() {
  const navbarLinks = document.querySelectorAll('#navLinks a[href^="#"]');

  navbarLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        const offset = 100;
        const elementPosition = targetSection.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    });
  });
}

// Sidebar navigation functionality
function initSidebarNavigation() {
  const sidebarLinks = document.querySelectorAll(".sidebar-link");

  // Handle smooth scrolling and active states
  sidebarLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      // Remove active class from all links
      sidebarLinks.forEach((l) => l.classList.remove("active"));

      // Add active class to clicked link
      this.classList.add("active");

      // Get target section
      const targetId = this.getAttribute("href");
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        // Calculate offset for fixed header and sidebar
        const offset = 100;
        const elementPosition = targetSection.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    });
  });

  // Update active state on scroll
  const sections = document.querySelectorAll("#about, #team, #values");
  const observerOptions = {
    threshold: 0.3,
    rootMargin: "-100px 0px -200px 0px",
  };

  const navigationObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute("id");
        const correspondingLink = document.querySelector(
          `.sidebar-link[href="#${id}"]`
        );

        // Remove active from all links
        sidebarLinks.forEach((link) => link.classList.remove("active"));

        // Add active to current section link
        if (correspondingLink) {
          correspondingLink.classList.add("active");
        }
      }
    });
  }, observerOptions);

  sections.forEach((section) => {
    navigationObserver.observe(section);
  });
}

// Animation for about sections (simplified)
function initAboutAnimations() {
  // Simple fade in animation for sections when they come into view
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

  // Observe main sections
  const aboutSections = document.querySelectorAll(
    ".about-section, .team-section, .values-section"
  );

  aboutSections.forEach((section) => {
    section.style.opacity = "0";
    section.style.transform = "translateY(30px)";
    section.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(section);
  });
}

// Mobile Navigation Functionality
document.addEventListener("DOMContentLoaded", function () {
  // Hamburger menu functionality
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

  if (hamburger) {
    hamburger.addEventListener("click", toggleMobileMenu);

    // Keyboard support for hamburger menu
    hamburger.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        toggleMobileMenu();
      }
    });
  }

  // ESC key to close menu
  document.addEventListener("keydown", (e) => {
    if (
      e.key === "Escape" &&
      navLinks &&
      navLinks.classList.contains("active")
    ) {
      closeMobileMenu();
    }
  });

  // Close mobile menu when clicking on nav links
  if (navLinks) {
    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", (e) => {
        // Close mobile menu for any link click
        closeMobileMenu();

        // Handle anchor links for smooth scrolling
        const href = link.getAttribute("href");
        if (href.startsWith("#")) {
          e.preventDefault();
          const target = document.querySelector(href);
          if (target) {
            const offset = 100;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition =
              elementPosition + window.pageYOffset - offset;

            window.scrollTo({
              top: offsetPosition,
              behavior: "smooth",
            });
          }
        }
      });
    });
  }

  // Close mobile menu when clicking overlay
  if (navOverlay) {
    navOverlay.addEventListener("click", closeMobileMenu);
  }
});
