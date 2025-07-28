// Portfolio Data
const portfolioData = [
  {
    id: 1,
    title: "E-Commerce Platform",
    category: "web",
    image:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=500&h=300&fit=crop",
    description:
      "Platform e-commerce lengkap dengan sistem pembayaran dan manajemen inventory",
    fullDescription:
      "Platform e-commerce modern yang dibangun dengan teknologi terkini. Memiliki fitur lengkap mulai dari katalog produk, keranjang belanja, sistem pembayaran terintegrasi, manajemen inventory real-time, dashboard admin yang komprehensif, dan sistem notifikasi. Aplikasi ini dapat menangani ribuan transaksi per hari dengan performa yang optimal.",
    technologies: ["React", "Node.js", "MongoDB", "Express", "Stripe API"],
    features: [
      "Sistem autentikasi dan otorisasi yang aman",
      "Katalog produk dengan pencarian dan filter canggih",
      "Keranjang belanja dengan persistensi data",
      "Integrasi payment gateway Stripe",
      "Dashboard admin untuk manajemen produk",
      "Sistem notifikasi real-time",
      "Responsive design untuk semua device",
      "Optimasi SEO untuk meningkatkan visibilitas",
    ],
    author: {
      name: "Ahmad Rizky",
      role: "Full Stack Developer",
      avatar: "AR",
      testimonial:
        "Project ini benar-benar mengubah pemahaman saya tentang full-stack development. Dari awalnya tidak tahu apa-apa tentang backend, sekarang saya bisa membuat aplikasi web yang kompleks dan scalable!",
      background: "Mahasiswa Teknik Informatika",
    },
    demoLink: "https://demo-ecommerce.example.com",
    githubLink: "https://github.com/ahmadrizky/ecommerce-platform",
  },
  {
    id: 2,
    title: "Learning Management System",
    category: "web",
    image:
      "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=500&h=300&fit=crop",
    description:
      "Sistem manajemen pembelajaran online dengan fitur video streaming dan quiz interaktif",
    fullDescription:
      "Learning Management System (LMS) yang dirancang khusus untuk institusi pendidikan modern. Platform ini menyediakan environment belajar yang komprehensif dengan video streaming berkualitas tinggi, sistem quiz interaktif, tracking progress siswa, forum diskusi, assignment submission, dan analytics dashboard untuk guru. Dibangun dengan arsitektur microservices untuk scalability yang optimal.",
    technologies: ["Vue.js", "Laravel", "MySQL", "Redis", "AWS S3"],
    features: [
      "Video streaming dengan adaptive bitrate",
      "Quiz interaktif dengan berbagai tipe soal",
      "Progress tracking dan analytics siswa",
      "Forum diskusi dan collaboration tools",
      "Assignment submission dan grading system",
      "Live class dengan video conferencing",
      "Mobile-friendly responsive design",
      "Integration dengan sistem perpustakaan digital",
    ],
    author: {
      name: "Sari Indah",
      role: "Web Developer",
      avatar: "SI",
      testimonial:
        "Membangun LMS ini memberikan saya pengalaman luar biasa dalam menangani sistem yang kompleks. Sekarang saya lebih percaya diri untuk handle project enterprise-level!",
      background: "Career Switcher dari Marketing",
    },
    demoLink: "https://demo-lms.example.com",
    githubLink: "https://github.com/sariindah/lms-platform",
  },
  {
    id: 3,
    title: "Mobile Fitness Tracker",
    category: "mobile",
    image:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&h=300&fit=crop",
    description:
      "Aplikasi mobile untuk tracking aktivitas fitness dengan integrasi wearable devices",
    fullDescription:
      "Aplikasi mobile fitness tracker yang revolusioner dengan kemampuan sinkronisasi dengan berbagai wearable devices. Aplikasi ini menggunakan machine learning untuk memberikan rekomendasi workout yang personal, tracking nutrisi harian, monitoring sleep pattern, dan social features untuk kompetisi dengan teman. Dilengkapi dengan gamification untuk meningkatkan motivasi user.",
    technologies: [
      "React Native",
      "Firebase",
      "TensorFlow Lite",
      "HealthKit",
      "Google Fit",
    ],
    features: [
      "Real-time activity tracking dengan GPS",
      "Integration dengan Apple HealthKit dan Google Fit",
      "Machine learning untuk personal recommendations",
      "Social features dan leaderboard",
      "Nutrition tracking dengan barcode scanner",
      "Sleep monitoring dan analysis",
      "Workout plans dengan video instructions",
      "Gamification dengan badges dan achievements",
    ],
    author: {
      name: "Budi Santoso",
      role: "Mobile App Developer",
      avatar: "BS",
      testimonial:
        "Project ini membantu saya memahami kompleksitas mobile development yang sesungguhnya. Dari handle sensors, integrate dengan APIs, sampai optimize performance - semua terpelajari dengan baik!",
      background: "Fresh Graduate Teknik Informatika",
    },
    demoLink: "https://play.google.com/store/apps/fitness-tracker",
    githubLink: "https://github.com/budisantoso/fitness-tracker-app",
  },
  {
    id: 4,
    title: "AI Chat Bot Customer Service",
    category: "ai",
    image:
      "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=500&h=300&fit=crop",
    description:
      "Chatbot AI untuk customer service dengan natural language processing",
    fullDescription:
      "Intelligent chatbot yang menggunakan advanced Natural Language Processing untuk memberikan customer service yang lebih personal dan efektif. Sistem ini dapat memahami context conversation, sentiment analysis, dan memberikan respons yang appropriate. Dilengkapi dengan learning mechanism yang terus berkembang dari setiap interaksi dengan customer, serta seamless handover ke human agent jika diperlukan.",
    technologies: [
      "Python",
      "TensorFlow",
      "NLTK",
      "Flask",
      "PostgreSQL",
      "Docker",
    ],
    features: [
      "Natural Language Understanding yang canggih",
      "Sentiment analysis untuk response yang tepat",
      "Context-aware conversation flow",
      "Multi-language support",
      "Integration dengan CRM systems",
      "Analytics dashboard untuk performance monitoring",
      "Seamless handover ke human agents",
      "Continuous learning dari user interactions",
    ],
    author: {
      name: "Maya Putri",
      role: "AI/ML Engineer",
      avatar: "MP",
      testimonial:
        "Mengembangkan AI chatbot ini membuka mata saya tentang potensi besar artificial intelligence. Dari yang awalnya takut dengan AI, sekarang justru excited untuk explore lebih dalam!",
      background: "Background Psikologi, Career Switcher",
    },
    demoLink: "https://demo-aibot.example.com",
    githubLink: "https://github.com/mayaputri/ai-customer-service",
  },
  {
    id: 5,
    title: "2D Platformer Game",
    category: "game",
    image:
      "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=500&h=300&fit=crop",
    description:
      "Game platformer 2D dengan physics engine dan multiplayer online",
    fullDescription:
      "Game platformer 2D yang menghadirkan experience gaming yang seru dengan physics engine yang realistic dan sistem multiplayer online. Game ini memiliki berbagai level dengan tingkat kesulitan yang progressif, character customization, power-ups system, dan leaderboard global. Dibangun dengan optimization yang baik untuk dapat berjalan smooth di berbagai device specifications.",
    technologies: ["Unity", "C#", "Photon Network", "Firebase", "Aseprite"],
    features: [
      "Physics-based gameplay yang realistic",
      "Multiplayer online dengan real-time sync",
      "Character progression dan customization",
      "Level editor untuk user-generated content",
      "Achievement system dan leaderboards",
      "Cross-platform compatibility",
      "Intuitive controls untuk mobile dan desktop",
      "Soundtrack dan sound effects yang immersive",
    ],
    author: {
      name: "Reza Firmansyah",
      role: "Game Developer",
      avatar: "RF",
      testimonial:
        "Passion saya di game development tersalurkan dengan baik melalui project ini. Sekarang saya mengerti bagaimana membuat game yang tidak hanya fun, tapi juga technically sound!",
      background: "Self-taught Game Developer",
    },
    demoLink: "https://rezafirmansyah.itch.io/platformer-game",
    githubLink: "https://github.com/rezafirmansyah/2d-platformer",
  },
  {
    id: 6,
    title: "NFT Marketplace",
    category: "blockchain",
    image:
      "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=500&h=300&fit=crop",
    description: "Marketplace NFT dengan smart contract dan integrasi Web3",
    fullDescription:
      "NFT Marketplace yang dibangun di atas blockchain Ethereum dengan smart contract yang secure dan gas-efficient. Platform ini memungkinkan artists untuk mint, showcase, dan menjual NFT mereka dengan mudah. Dilengkapi dengan advanced search and filter, bidding system, royalty management untuk creators, dan integration dengan popular crypto wallets. UI/UX dirancang user-friendly untuk onboarding user baru ke Web3.",
    technologies: [
      "Solidity",
      "React",
      "Web3.js",
      "IPFS",
      "Hardhat",
      "MetaMask",
    ],
    features: [
      "Smart contract yang secure dan audited",
      "Gas-efficient minting process",
      "Advanced search dan filtering system",
      "Auction dan bidding functionality",
      "Royalty system untuk creators",
      "Integration dengan MetaMask dan WalletConnect",
      "IPFS storage untuk decentralized metadata",
      "User-friendly onboarding untuk Web3 newcomers",
    ],
    author: {
      name: "Kevin Tan",
      role: "Blockchain Developer",
      avatar: "KT",
      testimonial:
        "Project blockchain pertama saya yang benar-benar production-ready. Dari yang awalnya bingung dengan konsep Web3, sekarang saya bisa develop dApps yang complex!",
      background: "Background Finance, Blockchain Enthusiast",
    },
    demoLink: "https://nft-marketplace.example.com",
    githubLink: "https://github.com/kevintan/nft-marketplace",
  },
  {
    id: 7,
    title: "Task Management App",
    category: "mobile",
    image:
      "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=500&h=300&fit=crop",
    description:
      "Aplikasi manajemen tugas dengan kolaborasi tim dan sinkronisasi real-time",
    fullDescription:
      "Aplikasi task management yang powerful dengan fokus pada collaboration dan productivity. Memiliki fitur real-time synchronization, team collaboration, project timeline visualization, automated reporting, dan integration dengan various productivity tools. Dirancang dengan methodology agile untuk team management yang efektif dengan notification system yang smart dan tidak mengganggu.",
    technologies: ["Flutter", "Firebase", "Node.js", "Socket.io", "MongoDB"],
    features: [
      "Real-time collaboration dengan multiple users",
      "Kanban board dan Gantt chart visualization",
      "Time tracking dan productivity analytics",
      "Integration dengan Slack, Google Calendar, Trello",
      "Offline mode dengan smart sync",
      "Custom workflows dan automation",
      "File sharing dan comment system",
      "Advanced reporting dan team insights",
    ],
    author: {
      name: "Lisa Anggraini",
      role: "Mobile Developer",
      avatar: "LA",
      testimonial:
        "Belajar Flutter sambil develop project ini sangat challenging tapi rewarding. Sekarang saya bisa develop cross-platform apps dengan confidence!",
      background: "UI/UX Designer yang transition ke Development",
    },
    demoLink: "https://taskmanager-app.example.com",
    githubLink: "https://github.com/lisaanggraini/task-manager-flutter",
  },
  {
    id: 8,
    title: "Real Estate Portal",
    category: "web",
    image:
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=500&h=300&fit=crop",
    description:
      "Portal real estate dengan virtual tour 360° dan sistem mortgage calculator",
    fullDescription:
      "Comprehensive real estate portal yang menghadirkan experience property hunting yang modern. Dilengkapi dengan virtual tour 360°, advanced search dengan map integration, mortgage calculator dengan real-time interest rates, agent dashboard, lead management system, dan property comparison tools. Platform ini mengintegrasikan berbagai data sources untuk memberikan informasi property yang akurat dan up-to-date.",
    technologies: [
      "Next.js",
      "TypeScript",
      "PostgreSQL",
      "Google Maps API",
      "Three.js",
    ],
    features: [
      "Virtual tour 360° dengan teknologi WebGL",
      "Advanced search dengan geolocation",
      "Mortgage calculator dengan real-time rates",
      "Agent dashboard dan CRM integration",
      "Property comparison dan wishlist",
      "Market analytics dan price trends",
      "Mobile app dengan AR property viewing",
      "Integration dengan MLS (Multiple Listing Service)",
    ],
    author: {
      name: "Dedy Kurniawan",
      role: "Full Stack Developer",
      avatar: "DK",
      testimonial:
        "Project real estate ini mengajarkan saya bagaimana handle data yang complex dan integrate dengan multiple external APIs. Very challenging dan sangat educational!",
      background: "Civil Engineer yang beralih ke Programming",
    },
    demoLink: "https://realestate-portal.example.com",
    githubLink: "https://github.com/dedykurniawan/realestate-portal",
  },
  {
    id: 9,
    title: "AI Image Generator",
    category: "ai",
    image:
      "https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=500&h=300&fit=crop",
    description:
      "Generator gambar AI dengan custom style transfer dan batch processing",
    fullDescription:
      "AI-powered image generator yang menggunakan state-of-the-art deep learning models untuk menghasilkan artwork yang stunning. Platform ini memiliki kemampuan style transfer, text-to-image generation, image-to-image transformation, dan batch processing untuk high-volume needs. Dilengkapi dengan user-friendly interface dan API untuk integration dengan aplikasi lain.",
    technologies: [
      "Python",
      "PyTorch",
      "Stable Diffusion",
      "FastAPI",
      "Redis",
      "AWS",
    ],
    features: [
      "Text-to-image generation dengan prompt engineering",
      "Style transfer dengan custom model training",
      "Batch processing untuk enterprise needs",
      "API endpoints untuk third-party integration",
      "Image upscaling dan enhancement",
      "Custom model fine-tuning capability",
      "Gallery system dengan version control",
      "Commercial licensing dan watermark options",
    ],
    author: {
      name: "Andi Prasetyo",
      role: "AI Engineer",
      avatar: "AP",
      testimonial:
        "Working dengan generative AI models membuka perspective baru tentang creative technology. Sekarang saya bisa combine artistic vision dengan technical implementation!",
      background: "Computer Science dengan focus di Machine Learning",
    },
    demoLink: "https://ai-image-gen.example.com",
    githubLink: "https://github.com/andiprasetyo/ai-image-generator",
  },
  {
    id: 10,
    title: "3D Racing Game",
    category: "game",
    image:
      "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=500&h=300&fit=crop",
    description:
      "Game racing 3D dengan physics realistis dan customizable vehicles",
    fullDescription:
      "Game racing 3D yang menghadirkan experience driving yang immersive dengan physics engine yang realistis. Game ini memiliki various track environments, customizable vehicles dengan part upgrades, multiplayer racing, career mode dengan progression system, dan VR support. Dioptimasi untuk berbagai platform dengan graphics quality yang dapat disesuaikan.",
    technologies: [
      "Unreal Engine",
      "C++",
      "Blueprint",
      "Wwise Audio",
      "Steam SDK",
    ],
    features: [
      "Realistic car physics dan handling",
      "Multiple track environments dan weather systems",
      "Extensive car customization dan tuning",
      "Multiplayer racing dengan matchmaking",
      "Career mode dengan sponsorship system",
      "VR support untuk immersive experience",
      "Mod support untuk user-generated content",
      "Cross-platform multiplayer functionality",
    ],
    author: {
      name: "Febri Wijaya",
      role: "Game Developer",
      avatar: "FW",
      testimonial:
        "Develop racing game ini challenge banget, especially di physics simulation. Tapi hasilnya sangat memuaskan dan memberikan understanding yang deep tentang game engine!",
      background: "Mechanical Engineer dengan passion di Game Development",
    },
    demoLink: "https://steam.com/3d-racing-game",
    githubLink: "https://github.com/febriwijaya/3d-racing-game",
  },
];

class PortfolioManager {
  constructor() {
    this.portfolioData = portfolioData;
    this.currentFilter = "all";
    this.init();
  }

  init() {
    this.renderPortfolioGrid();
    this.setupFilterButtons();
    this.setupModal();
    this.setupMobileNavigation();
    this.setupScrollEffects();
  }

  renderPortfolioGrid() {
    const portfolioGrid = document.getElementById("portfolioGrid");
    portfolioGrid.innerHTML = "";

    this.portfolioData.forEach((project) => {
      const portfolioItem = this.createPortfolioItem(project);
      portfolioGrid.appendChild(portfolioItem);
    });

    // Add loading animation
    setTimeout(() => {
      const items = portfolioGrid.querySelectorAll(".portfolio-item");
      items.forEach((item, index) => {
        setTimeout(() => {
          item.classList.add("loading");
        }, index * 100);
      });
    }, 100);
  }

  createPortfolioItem(project) {
    const item = document.createElement("div");
    item.className = "portfolio-item";
    item.dataset.category = project.category;
    item.dataset.id = project.id;

    item.innerHTML = `
            <img src="${project.image}" alt="${
      project.title
    }" class="portfolio-image">
            <div class="portfolio-content">
                <h3 class="portfolio-title">${project.title}</h3>
                <span class="portfolio-category">${this.getCategoryLabel(
                  project.category
                )}</span>
                <p class="portfolio-description">${project.description}</p>
                <div class="portfolio-tech">
                    ${project.technologies
                      .map((tech) => `<span class="tech-tag">${tech}</span>`)
                      .join("")}
                </div>
                <div class="portfolio-author">
                    <div class="author-avatar">${project.author.avatar}</div>
                    <span>by ${project.author.name}</span>
                </div>
            </div>
        `;

    item.addEventListener("click", () => this.openModal(project));
    return item;
  }

  getCategoryLabel(category) {
    const labels = {
      web: "Web Development",
      mobile: "Mobile App",
      ai: "AI/Machine Learning",
      game: "Game Development",
      blockchain: "Blockchain",
    };
    return labels[category] || category;
  }

  setupFilterButtons() {
    const filterButtons = document.querySelectorAll(".filter-btn");

    filterButtons.forEach((button) => {
      button.addEventListener("click", () => {
        // Remove active class from all buttons
        filterButtons.forEach((btn) => btn.classList.remove("active"));
        // Add active class to clicked button
        button.classList.add("active");

        // Filter portfolio items
        const filter = button.dataset.filter;
        this.filterPortfolio(filter);
      });
    });
  }

  filterPortfolio(filter) {
    this.currentFilter = filter;
    const portfolioItems = document.querySelectorAll(".portfolio-item");

    portfolioItems.forEach((item, index) => {
      const itemCategory = item.dataset.category;
      const shouldShow = filter === "all" || itemCategory === filter;

      if (shouldShow) {
        item.style.display = "block";
        // Add staggered animation
        setTimeout(() => {
          item.style.opacity = "1";
          item.style.transform = "translateY(0)";
        }, index * 50);
      } else {
        item.style.opacity = "0";
        item.style.transform = "translateY(20px)";
        setTimeout(() => {
          item.style.display = "none";
        }, 300);
      }
    });
  }

  openModal(project) {
    const modal = document.getElementById("projectModal");
    const modalBody = document.getElementById("modalBody");

    modalBody.innerHTML = this.createModalContent(project);
    modal.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  createModalContent(project) {
    return `
            <div class="modal-header">
                <img src="${project.image}" alt="${
      project.title
    }" class="modal-image">
                <h2 class="modal-title">${project.title}</h2>
                <span class="modal-category">${this.getCategoryLabel(
                  project.category
                )}</span>
            </div>
            
            <div class="modal-description">
                <p>${project.fullDescription}</p>
            </div>

            <div class="modal-tech">
                <h3>Teknologi yang Digunakan</h3>
                <div class="modal-tech-list">
                    ${project.technologies
                      .map(
                        (tech) => `<span class="modal-tech-tag">${tech}</span>`
                      )
                      .join("")}
                </div>
            </div>

            <div class="modal-features">
                <h3>Fitur Utama</h3>
                <ul class="features-list">
                    ${project.features
                      .map((feature) => `<li>${feature}</li>`)
                      .join("")}
                </ul>
            </div>

            <div class="testimonial-section">
                <h3>Testimoni Developer</h3>
                <p class="testimonial-text">"${project.author.testimonial}"</p>
                <div class="testimonial-author-info">
                    <div class="testimonial-avatar">${
                      project.author.avatar
                    }</div>
                    <div class="author-details">
                        <h4>${project.author.name}</h4>
                        <p>${project.author.role} • ${
      project.author.background
    }</p>
                    </div>
                </div>
            </div>

            <div class="modal-links">
                <a href="${project.demoLink}" target="_blank" class="demo-link">
                    🚀 Live Demo
                </a>
                <a href="${
                  project.githubLink
                }" target="_blank" class="github-link">
                    📱 Source Code
                </a>
            </div>
        `;
  }

  setupModal() {
    const modal = document.getElementById("projectModal");
    const closeBtn = document.getElementById("closeModal");

    closeBtn.addEventListener("click", () => this.closeModal());

    window.addEventListener("click", (e) => {
      if (e.target === modal) {
        this.closeModal();
      }
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        this.closeModal();
      }
    });
  }

  closeModal() {
    const modal = document.getElementById("projectModal");
    modal.classList.remove("active");
    document.body.style.overflow = "auto";
  }

  setupMobileNavigation() {
    const hamburger = document.getElementById("hamburger");
    const navLinks = document.getElementById("navLinks");
    const navOverlay = document.getElementById("navOverlay");

    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("active");
      navLinks.classList.toggle("active");
      navOverlay.classList.toggle("active");
    });

    navOverlay.addEventListener("click", () => {
      hamburger.classList.remove("active");
      navLinks.classList.remove("active");
      navOverlay.classList.remove("active");
    });

    // Close mobile menu when clicking nav links
    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        hamburger.classList.remove("active");
        navLinks.classList.remove("active");
        navOverlay.classList.remove("active");
      });
    });
  }

  setupScrollEffects() {
    // Navbar scroll effect
    const navbar = document.getElementById("navbar");
    let lastScrollY = window.scrollY;

    window.addEventListener("scroll", () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > 100) {
        navbar.style.background = "rgba(255, 255, 255, 0.98)";
        navbar.style.boxShadow = "0 2px 20px rgba(0, 0, 0, 0.1)";
      } else {
        navbar.style.background = "rgba(255, 255, 255, 0.95)";
        navbar.style.boxShadow = "none";
      }

      lastScrollY = currentScrollY;
    });

    // Portfolio items scroll animation
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

    // Observe portfolio items after they're rendered
    setTimeout(() => {
      document.querySelectorAll(".portfolio-item").forEach((item) => {
        item.style.opacity = "0";
        item.style.transform = "translateY(30px)";
        item.style.transition = "all 0.6s cubic-bezier(0.4, 0, 0.2, 1)";
        observer.observe(item);
      });
    }, 500);
  }
}

// Initialize Portfolio Manager when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  new PortfolioManager();

  // Add smooth scrolling for anchor links
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
});

// Performance optimization: Lazy load images
document.addEventListener("DOMContentLoaded", () => {
  if ("IntersectionObserver" in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src || img.src;
          img.classList.remove("lazy");
          observer.unobserve(img);
        }
      });
    });

    document.querySelectorAll("img[data-src]").forEach((img) => {
      imageObserver.observe(img);
    });
  }
});

// Export for potential use in other modules
if (typeof module !== "undefined" && module.exports) {
  module.exports = PortfolioManager;
}
