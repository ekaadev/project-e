// Typing Animation
class TypingAnimation {
  constructor(element, words, delay = 100) {
    this.element = element;
    this.words = words;
    this.delay = delay;
    this.currentWordIndex = 0;
    this.currentCharIndex = 0;
    this.isDeleting = false;
    this.start();
  }

  start() {
    this.type();
  }

  type() {
    const currentWord = this.words[this.currentWordIndex];

    if (this.isDeleting) {
      this.element.textContent = currentWord.substring(
        0,
        this.currentCharIndex - 1
      );
      this.currentCharIndex--;
    } else {
      this.element.textContent = currentWord.substring(
        0,
        this.currentCharIndex + 1
      );
      this.currentCharIndex++;
    }

    let typeSpeed = this.delay;
    if (this.isDeleting) typeSpeed /= 2;

    if (!this.isDeleting && this.currentCharIndex === currentWord.length) {
      typeSpeed = 2000;
      this.isDeleting = true;
    } else if (this.isDeleting && this.currentCharIndex === 0) {
      this.isDeleting = false;
      this.currentWordIndex = (this.currentWordIndex + 1) % this.words.length;
      typeSpeed = 500;
    }

    setTimeout(() => this.type(), typeSpeed);
  }
}

// Counter Animation
class CounterAnimation {
  constructor(element, target, duration = 2000) {
    this.element = element;
    this.target = parseInt(target);
    this.duration = duration;
    this.start = 0;
    this.startTime = null;
    this.animate();
  }

  animate() {
    if (!this.startTime) this.startTime = performance.now();

    const progress = Math.min(
      (performance.now() - this.startTime) / this.duration,
      1
    );
    const current = Math.floor(
      this.start + (this.target - this.start) * this.easeOutQuart(progress)
    );

    this.element.textContent = current.toLocaleString();

    if (progress < 1) {
      requestAnimationFrame(() => this.animate());
    }
  }

  easeOutQuart(t) {
    return 1 - Math.pow(1 - t, 4);
  }
}

// Testimonial Slider
class TestimonialSlider {
  constructor(sliderElement, dotsElement, autoPlayInterval = 5000) {
    this.slider = sliderElement;
    this.dots = dotsElement.querySelectorAll(".dot");
    this.currentSlide = 0;
    this.autoPlayInterval = autoPlayInterval;
    this.autoPlayTimer = null;
    this.isTransitioning = false;
    this.init();
  }

  init() {
    this.setupDots();
    this.startAutoPlay();
    this.setupVisibilityChange();
  }

  setupDots() {
    this.dots.forEach((dot, index) => {
      dot.addEventListener("click", () => {
        if (!this.isTransitioning) {
          this.goToSlide(index);
        }
      });
    });
  }

  goToSlide(index) {
    if (index === this.currentSlide) return;

    this.isTransitioning = true;
    this.currentSlide = index;

    const translateX = -index * 20;
    this.slider.style.transform = `translateX(${translateX}%)`;

    this.updateDots();
    this.restartAutoPlay();

    setTimeout(() => {
      this.isTransitioning = false;
    }, 500);
  }

  nextSlide() {
    const nextIndex = (this.currentSlide + 1) % this.dots.length;
    this.goToSlide(nextIndex);
  }

  updateDots() {
    this.dots.forEach((dot, index) => {
      dot.classList.toggle("active", index === this.currentSlide);
    });
  }

  startAutoPlay() {
    this.autoPlayTimer = setInterval(() => {
      if (!this.isTransitioning) {
        this.nextSlide();
      }
    }, this.autoPlayInterval);
  }

  stopAutoPlay() {
    if (this.autoPlayTimer) {
      clearInterval(this.autoPlayTimer);
      this.autoPlayTimer = null;
    }
  }

  restartAutoPlay() {
    this.stopAutoPlay();
    this.startAutoPlay();
  }

  setupVisibilityChange() {
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) {
        this.stopAutoPlay();
      } else {
        this.startAutoPlay();
      }
    });
  }
}

// Progressive Loading - REMOVED for features section
class ProgressiveLoader {
  constructor() {
    this.observeElements();
  }

  observeElements() {
    const options = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("loading");
          observer.unobserve(entry.target);
        }
      });
    }, options);

    // Only observe testimonial cards, not feature cards
    document.querySelectorAll(".testimonial-card").forEach((el) => {
      observer.observe(el);
    });
  }
}

// Navbar Scroll Effect
class NavbarController {
  constructor() {
    this.navbar = document.getElementById("navbar");
    this.lastScrollY = window.scrollY;
    this.init();
  }

  init() {
    window.addEventListener("scroll", () => {
      this.handleScroll();
    });
  }

  handleScroll() {
    const currentScrollY = window.scrollY;

    if (currentScrollY > 100) {
      this.navbar.style.background = "rgba(255, 255, 255, 0.98)";
      this.navbar.style.boxShadow = "0 2px 20px rgba(0, 0, 0, 0.1)";
    } else {
      this.navbar.style.background = "rgba(255, 255, 255, 0.95)";
      this.navbar.style.boxShadow = "none";
    }

    this.lastScrollY = currentScrollY;
  }
}

// Initialize everything when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  // Initialize typing animation
  const typingElement = document.getElementById("typingText");
  const words = [
    "JavaScript",
    "Python",
    "React",
    "Node.js",
    "Vue.js",
    "PHP",
    "Java",
    "C++",
  ];
  new TypingAnimation(typingElement, words);

  // Initialize counter animations
  const counters = document.querySelectorAll(".stat-number");
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const target = entry.target.getAttribute("data-target");
        new CounterAnimation(entry.target, target);
        counterObserver.unobserve(entry.target);
      }
    });
  });

  counters.forEach((counter) => {
    counterObserver.observe(counter);
  });

  // Initialize testimonial slider
  const slider = document.getElementById("testimonialsSlider");
  const dots = document.getElementById("sliderDots");
  new TestimonialSlider(slider, dots);

  // Initialize other effects
  new ProgressiveLoader();
  new NavbarController();

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
      // Smooth scroll for anchor links
      const href = link.getAttribute("href");
      if (href.startsWith("#")) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          closeMobileMenu();
          setTimeout(() => {
            target.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
          }, 300);
        }
      } else {
        closeMobileMenu();
      }
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

  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });

  // Feature card interaction enhancement - REMOVED
  // Dynamic content loading simulation - REMOVED
});

// Performance optimization
let ticking = false;
function requestTick() {
  if (!ticking) {
    requestAnimationFrame(updateAnimations);
    ticking = true;
  }
}

function updateAnimations() {
  // Update any scroll-based animations here
  ticking = false;
}

window.addEventListener("scroll", requestTick);
