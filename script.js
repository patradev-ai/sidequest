// Daily Mission Website JavaScript - Web3 Minimalist Design

// Mission data and DOM elements
let missions = [];
let currentSection = "home";
let instagramPosts = [];
let audioPlayed = false;
let badges = [];
let leaderboard = [];

// DOM element references
const progressBar = document.getElementById("progress-bar");
const dailyMissionElement = document.getElementById("daily-mission");
const newMissionBtn = document.getElementById("new-mission-btn");
const navItems = document.querySelectorAll(".nav-item");
const mobileNavItems = document.querySelectorAll(".mobile-nav-item");
const instagramGrid = document.getElementById("instagram-grid");
const openingSound = document.getElementById("opening-sound");
const themeToggle = document.getElementById("theme-toggle");
const themeIcon = document.getElementById("theme-icon");
const mobileThemeToggle = document.getElementById("mobile-theme-toggle");
const uploadMissionBtn = document.getElementById("upload-mission-btn");
const uploadModal = document.getElementById("upload-modal");
const closeModal = document.getElementById("close-modal");
const cancelUpload = document.getElementById("cancel-upload");
const uploadForm = document.getElementById("upload-form");
const missionUploadForm = document.getElementById("mission-upload-form");
const leaderboardList = document.getElementById("leaderboard-list");
const badgesGrid = document.getElementById("badges-grid");
const userDetailModal = document.getElementById("user-detail-modal");
const closeUserModal = document.getElementById("close-user-modal");
const userModalContent = document.getElementById("user-modal-content");

// Initialize the application
document.addEventListener("DOMContentLoaded", function () {
  // Show loading screen initially
  showLoadingScreen();

  // Initialize Web3 parallax effects
  initWeb3ParallaxEffects();

  playOpeningSound();
  loadMissions();
  loadInstagramPosts();
  loadBadgesAndLeaderboard();
  setupScrollListener();
  setupNavigation();
  setupMobileNavigation();
  setupThemeToggle();
  setupMobileThemeToggle();
  setupUploadModal();
  setupMissionUploadForm();
  setupUserDetailModal();
  setupNewMissionButton();
  addScrollAnimations();

  // Hide loading screen after everything is loaded
  setTimeout(() => {
    hideLoadingScreen();
  }, 2000);

  console.log("🚀 Misi Harian website berhasil dimuat!");
});

// Show loading screen
function showLoadingScreen() {
  const loadingScreen = document.getElementById("loading-screen");
  if (loadingScreen) {
    loadingScreen.style.display = "flex";
  }
}

// Hide loading screen
function hideLoadingScreen() {
  const loadingScreen = document.getElementById("loading-screen");
  if (loadingScreen) {
    loadingScreen.classList.add("hidden");
    setTimeout(() => {
      loadingScreen.style.display = "none";
    }, 500);
  }
}

// Play opening sound
function playOpeningSound() {
  if (openingSound && !audioPlayed) {
    // Add user interaction listener for audio
    document.addEventListener(
      "click",
      function playAudio() {
        openingSound.play().catch((e) => console.log("Audio play failed:", e));
        audioPlayed = true;
        document.removeEventListener("click", playAudio);
      },
      { once: true }
    );
  }
}

// Load missions from JSON file
async function loadMissions() {
  try {
    const response = await fetch("data/missions.json");
    const data = await response.json();
    missions = data.missions;

    // Display initial random mission
    displayRandomMission();

    console.log("✅ Misi dimuat:", missions.length + " misi tersedia");
  } catch (error) {
    console.error("❌ Error loading missions:", error);

    // Fallback missions if JSON fails to load
    missions = [
      "Foto makanan favorit kamu dan share ke social media! 📸🍕",
      "Olahraga ringan selama 15 menit hari ini! 💪🏃‍♀️",
      "Baca minimal 10 halaman buku yang kamu suka! 📚✨",
      "Telepon teman lama yang sudah lama tidak kontak! 📞👫",
      "Coba masak resep baru hari ini! 👨‍🍳🍳",
      "Jalan ke tempat yang belum pernah kamu kunjungi! 🚶‍♀️🗺️",
      "Tulis 3 hal yang kamu syukuri hari ini! 📝🙏",
      "Bersihkan dan rapikan kamar tidur kamu! 🧹🛏️",
      "Dengarkan podcast atau musik dari genre baru! 🎧🎵",
      "Buat video TikTok atau reel yang kreatif! 📱🎬",
    ];

    displayRandomMission();
  }
}

// Initialize Web3 Parallax Effects - Global background for all sections
function initWeb3ParallaxEffects() {
  const parallaxContainer = document.getElementById("web3-parallax");
  if (!parallaxContainer) return;

  // Create enhanced glowing orbs
  for (let i = 0; i < 12; i++) {
    const orb = document.createElement("div");
    orb.className = "web3-orb";

    // Varied sizes for depth effect
    const size = Math.random() * 300 + 100; // 100-400px for bigger glow effects
    orb.style.width = `${size}px`;
    orb.style.height = `${size}px`;
    orb.style.left = `${Math.random() * 120 - 10}%`; // Allow orbs to go slightly off-screen
    orb.style.top = `${Math.random() * 120 - 10}%`;
    orb.style.animationDelay = `${Math.random() * 12}s`;
    orb.style.animationDuration = `${Math.random() * 15 + 12}s`;

    parallaxContainer.appendChild(orb);
  }

  // Create floating particles with glow
  for (let i = 0; i < 30; i++) {
    const particle = document.createElement("div");
    particle.className = "web3-particle";

    particle.style.left = `${Math.random() * 100}%`;
    particle.style.top = `${Math.random() * 100}%`;
    particle.style.animationDelay = `${Math.random() * 8}s`;
    particle.style.animationDuration = `${Math.random() * 6 + 8}s`;

    parallaxContainer.appendChild(particle);
  }

  // Global parallax scroll effect for all sections - only orbs move
  let ticking = false;

  function updateParallax() {
    const scrolled = window.pageYOffset;
    const documentHeight =
      document.documentElement.scrollHeight - window.innerHeight;
    const scrollProgress = scrolled / documentHeight;

    // Background container stays fixed
    parallaxContainer.classList.add("scrolling");

    // Individual orb movements at different speeds for depth
    const orbs = parallaxContainer.querySelectorAll(".web3-orb");
    orbs.forEach((orb, index) => {
      const speed = ((index % 4) + 1) * 0.05; // Varied speeds from 0.05 to 0.2
      const rotation = scrolled * (index % 2 === 0 ? 0.1 : -0.1);
      const yOffset = scrolled * speed;
      const xOffset = Math.sin(scrollProgress * Math.PI * 2 + index) * 30;

      orb.style.transform = `
                translateY(${yOffset}px) 
                translateX(${xOffset}px) 
                rotate(${rotation}deg)
                scale(${1 + Math.sin(scrollProgress * Math.PI + index) * 0.2})
            `;
    });

    // Particle movements - subtle movement only
    const particles = parallaxContainer.querySelectorAll(".web3-particle");
    particles.forEach((particle, index) => {
      const speed = ((index % 3) + 1) * 0.03; // Reduced speed for subtlety
      const yOffset = scrolled * speed;
      const xOffset = Math.cos(scrollProgress * Math.PI * 3 + index) * 10;

      particle.style.transform = `
                translateY(${yOffset}px) 
                translateX(${xOffset}px) 
                scale(${
                  1 + Math.sin(scrollProgress * Math.PI * 2 + index) * 0.1
                })
            `;
    });

    ticking = false;
  }

  function requestParallaxUpdate() {
    if (!ticking) {
      requestAnimationFrame(updateParallax);
      ticking = true;
    }
  }

  // Add optimized scroll listener
  window.addEventListener("scroll", requestParallaxUpdate, { passive: true });

  // Initial setup
  updateParallax();

  console.log(
    "✨ Web3 parallax effects initialized with enhanced orb glow and global scroll"
  );
}

// Load Instagram posts from JSON file only
async function loadInstagramPosts() {
  try {
    const response = await fetch("data/instagram_posts.json");
    const data = await response.json();
    instagramPosts = data.posts;

    displayInstagramPosts();
    console.log(
      "✅ Postingan Instagram dimuat:",
      instagramPosts.length + " postingan tersedia"
    );
  } catch (error) {
    console.error("❌ Error loading Instagram posts:", error);

    // Fallback with placeholder posts
    instagramPosts = [
      {
        id: "1",
        caption:
          "Misi Harian: Tantang diri kamu untuk mencoba hal baru hari ini! Bergabung dengan komunitas kami untuk tantangan menarik lainnya.",
        display_url:
          "https://via.placeholder.com/400x400/6366f1/ffffff?text=Misi+Harian+1",
        likes: 245,
        comments: 18,
        url: "https://www.instagram.com/sidequestidn/",
        is_video: false,
      },
      {
        id: "2",
        caption:
          "Misi selesai! Bagikan pencapaian kamu dengan kami menggunakan #MisiHarianChallenge",
        display_url:
          "https://via.placeholder.com/400x400/8b5cf6/ffffff?text=Misi+Harian+2",
        likes: 189,
        comments: 12,
        url: "https://www.instagram.com/sidequestidn/",
        is_video: false,
      },
      {
        id: "3",
        caption:
          "Di balik layar: Menciptakan misi bermakna untuk komunitas luar biasa kami 🎯",
        display_url:
          "https://via.placeholder.com/400x400/06b6d4/ffffff?text=Misi+Harian+3",
        likes: 321,
        comments: 25,
        url: "https://www.instagram.com/sidequestidn/",
        is_video: true,
      },
    ];

    displayInstagramPosts();
  }
}

// Display random mission
function displayRandomMission() {
  if (missions.length === 0) {
    dailyMissionElement.textContent = "Tidak ada misi yang tersedia saat ini";
    return;
  }

  // Get random mission
  const randomIndex = Math.floor(Math.random() * missions.length);
  const randomMission = missions[randomIndex];

  // Add loading state
  const missionDisplay = dailyMissionElement.parentElement;
  missionDisplay.classList.add("loading");

  // Update text with smooth transition
  setTimeout(() => {
    dailyMissionElement.textContent = randomMission;
    missionDisplay.classList.remove("loading");
  }, 300);

  console.log("✨ Misi baru ditampilkan:", randomMission);
}

// Display Instagram posts
function displayInstagramPosts() {
  if (!instagramGrid || instagramPosts.length === 0) return;

  instagramGrid.innerHTML = "";

  instagramPosts.forEach((post, index) => {
    const postElement = document.createElement("div");
    postElement.className = "instagram-post p-6"; // Kelas untuk setiap post
    postElement.style.animationDelay = `${index * 0.1}s`;

    const videoIcon = post.is_video
      ? '<i class="fas fa-play text-white text-sm absolute top-3 right-3"></i>'
      : "";

    postElement.innerHTML = `
        <div class="relative mb-4">
            <img src="${post.display_url}" alt="Instagram post" 
                 class="w-full aspect-square object-cover rounded-xl" 
                 loading="lazy" 
                 onerror="this.src='https://via.placeholder.com/400x400/6366f1/ffffff?text=Instagram+Post'">
            ${videoIcon}
        </div>
        <div class="space-y-3">
            <p class="font-inter text-sm text-theme-secondary leading-relaxed line-clamp-3">
                ${post.caption}
            </p>
            <div class="flex items-center justify-between text-xs text-theme-muted">
                <div class="flex items-center space-x-4">
                    <span class="flex items-center">
                        <i class="fas fa-heart mr-1"></i>
                        ${post.likes}
                    </span>
                    <span class="flex items-center">
                        <i class="fas fa-comment mr-1"></i>
                        ${post.comments}
                    </span>
                </div>
                <a href="${post.url}" target="_blank" rel="noopener noreferrer" 
                   class="text-web3-primary hover:text-web3-secondary transition-colors">
                    <i class="fas fa-external-link-alt"></i>
                </a>
            </div>
        </div>
    `;

    instagramGrid.appendChild(postElement);
  });

  console.log("📸 Instagram posts displayed:", instagramPosts.length);
}

// Setup scroll progress listener
function setupScrollListener() {
  window.addEventListener("scroll", function () {
    // Calculate scroll progress
    const scrollTop = window.pageYOffset;
    const docHeight =
      document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;

    // Update progress bar
    progressBar.style.width = scrollPercent + "%";

    // Update active section
    updateActiveSection();
  });
}

// Setup upload modal
function setupUploadModal() {
  if (!uploadMissionBtn || !uploadModal) return;

  // Open modal
  uploadMissionBtn.addEventListener("click", function () {
    uploadModal.classList.remove("hidden");
    document.body.style.overflow = "hidden";
  });

  // Close modal events
  const closeModalEvents = [closeModal, cancelUpload];
  closeModalEvents.forEach((element) => {
    if (element) {
      element.addEventListener("click", closeUploadModal);
    }
  });

  // Close on outside click
  uploadModal.addEventListener("click", function (e) {
    if (e.target === uploadModal) {
      closeUploadModal();
    }
  });

  // Close on escape key
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && !uploadModal.classList.contains("hidden")) {
      closeUploadModal();
    }
  });

  // Handle form submission
  if (uploadForm) {
    uploadForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const username = document.getElementById("username").value;
      const questData = document.getElementById("quest-data").value;

      // Here you would typically send the data to a server
      console.log("📤 Mission uploaded:", { username, questData });

      // Show success message
      alert("Misi berhasil diupload! Terima kasih telah berbagi.");

      // Reset form and close modal
      uploadForm.reset();
      closeUploadModal();
    });
  }
}

function closeUploadModal() {
  if (uploadModal) {
    uploadModal.classList.add("hidden");
    document.body.style.overflow = "";
  }
}

// Update active section based on scroll position
function updateActiveSection() {
  const sections = [
    "home",
    "gallery",
    "community",
    "merch",
    "upload",
    "leaderboard",
  ];
  const scrollPosition = window.pageYOffset + window.innerHeight / 2;

  sections.forEach((sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      const sectionTop = section.offsetTop;
      const sectionBottom = sectionTop + section.offsetHeight;

      if (scrollPosition >= sectionTop && scrollPosition <= sectionBottom) {
        if (currentSection !== sectionId) {
          currentSection = sectionId;
          updateNavigationItems(sectionId);
          console.log("📍 Active section:", sectionId);
        }
      }
    }
  });
}

// Setup navigation functionality
function setupNavigation() {
  navItems.forEach((item) => {
    const button = item.querySelector("button");
    if (!button) return;

    button.addEventListener("click", function (e) {
      e.preventDefault();
      const targetSection = item.getAttribute("data-section");
      const targetElement = document.getElementById(targetSection);

      if (targetElement) {
        // Smooth scroll to section
        targetElement.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });

        console.log("📍 Navigated to section:", targetSection);
      }
    });
  });
}

// Update navigation items active state
function updateNavigationItems(activeSection) {
  // Update desktop navigation
  if (navItems && navItems.length > 0) {
    navItems.forEach((item) => {
      const section = item.getAttribute("data-section");
      if (section === activeSection) {
        item.classList.add("active");
      } else {
        item.classList.remove("active");
      }
    });
  }

  // Update mobile navigation
  if (mobileNavItems && mobileNavItems.length > 0) {
    mobileNavItems.forEach((item) => {
      const section = item.getAttribute("data-section");
      if (section === activeSection) {
        item.classList.add("active");
      } else {
        item.classList.remove("active");
      }
    });
  }
}

// Setup mobile navigation
function setupMobileNavigation() {
  if (!mobileNavItems || mobileNavItems.length === 0) return;

  mobileNavItems.forEach((item) => {
    item.addEventListener("click", function (e) {
      e.preventDefault();
      const targetSection = this.getAttribute("data-section");
      const targetElement = document.getElementById(targetSection);

      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });

        console.log("📱 Mobile navigation to:", targetSection);
      }
    });
  });
}

// Setup theme toggle
function setupThemeToggle() {
  if (!themeToggle || !themeIcon) return;

  // Check for saved theme preference
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "light") {
    document.body.classList.add("light-mode");
    themeIcon.className = "fas fa-moon";
  }

  themeToggle.addEventListener("click", function () {
    toggleTheme();
  });
}

// Setup mobile theme toggle
function setupMobileThemeToggle() {
  if (!mobileThemeToggle) return;

  // Sync with saved theme preference
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "light") {
    mobileThemeToggle.checked = true;
  }

  mobileThemeToggle.addEventListener("change", function () {
    toggleTheme();
  });
}

// Toggle theme function
function toggleTheme() {
  document.body.classList.toggle("light-mode");
  const isLightMode = document.body.classList.contains("light-mode");

  // Update desktop icon
  if (themeIcon) {
    themeIcon.className = isLightMode ? "fas fa-moon" : "fas fa-sun";
  }

  // Update mobile toggle
  if (mobileThemeToggle) {
    mobileThemeToggle.checked = isLightMode;
  }

  // Save preference
  localStorage.setItem("theme", isLightMode ? "light" : "dark");

  console.log("🎨 Theme switched to:", isLightMode ? "light" : "dark");
}

// Load badges and leaderboard data
async function loadBadgesAndLeaderboard() {
  try {
    const response = await fetch("data/badges.json");
    const data = await response.json();
    badges = data.badges;
    leaderboard = data.leaderboard;

    displayBadges();
    displayLeaderboard();

    console.log(
      "🏆 Lencana dan papan peringkat dimuat:",
      badges.length + " lencana, " + leaderboard.length + " pemain"
    );
  } catch (error) {
    console.error("❌ Error loading badges and leaderboard:", error);

    // Fallback data
    badges = [
      {
        id: 1,
        name: "First Mission",
        description: "Complete your first daily mission",
        icon: "fa-star",
        color: "from-yellow-400 to-orange-500",
        rarity: "common",
        points: 10,
      },
    ];

    leaderboard = [
      {
        rank: 1,
        username: "MissionMaster2024",
        points: 2450,
        missions_completed: 98,
        streak: 45,
        level: 12,
        badges: [1],
      },
    ];

    displayBadges();
    displayLeaderboard();
  }
}

// Display badges
function displayBadges() {
  if (!badgesGrid) return;

  const badgeElements = badges
    .slice(0, 8)
    .map((badge) => {
      const rarityColors = {
        common: "border-gray-500",
        uncommon: "border-green-500",
        rare: "border-blue-500",
        epic: "border-purple-500",
        legendary: "border-yellow-500",
      };

      return `
            <div class="group relative">
                <div class="web3-card p-3 text-center hover:scale-105 transition-all duration-300 border-2 ${
                  rarityColors[badge.rarity]
                }">
                    <div class="w-12 h-12 mx-auto mb-2 bg-gradient-to-r ${
                      badge.color
                    } rounded-lg flex items-center justify-center">
                        <i class="fas ${badge.icon} text-white text-lg"></i>
                    </div>
                    <h4 class="font-inter text-xs font-semibold text-theme-primary mb-1 truncate">${
                      badge.name
                    }</h4>
                    <span class="text-xs text-theme-secondary">${
                      badge.points
                    } pts</span>
                </div>
                
                <!-- Tooltip -->
                <div class="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block z-50">
                    <div class="bg-theme-card backdrop-blur-sm border text-theme-primary text-xs rounded-lg p-3 whitespace-nowrap max-w-48" style="border-color: var(--border-color);">
                        <div class="font-semibold mb-1">${badge.name}</div>
                        <div class="text-theme-secondary text-xs">${
                          badge.description
                        }</div>
                        <div class="text-${
                          badge.rarity === "legendary"
                            ? "yellow"
                            : badge.rarity === "epic"
                            ? "purple"
                            : badge.rarity === "rare"
                            ? "blue"
                            : badge.rarity === "uncommon"
                            ? "green"
                            : "gray"
                        }-400 text-xs mt-1 capitalize">${badge.rarity}</div>
                    </div>
                </div>
            </div>
        `;
    })
    .join("");

  badgesGrid.innerHTML = badgeElements;
  console.log("🎖️ Lencana ditampilkan:", badges.length);
}

// Setup mission upload form
function setupMissionUploadForm() {
  if (!missionUploadForm) return;

  missionUploadForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const username = document.getElementById("instagram-username").value;
    const questDescription = document.getElementById("quest-description").value;

    // Show loading state
    const submitButton = this.querySelector('button[type="submit"]');
    const originalText = submitButton.innerHTML;
    submitButton.innerHTML =
      '<i class="fas fa-spinner fa-spin mr-2"></i>Mengirim...';
    submitButton.disabled = true;

    // Simulate upload process
    setTimeout(() => {
      // Show success message
      alert(
        "🎉 Misi berhasil diupload! Terima kasih telah berbagi pencapaian kamu."
      );

      // Reset form
      this.reset();

      // Reset button
      submitButton.innerHTML = originalText;
      submitButton.disabled = false;

      console.log("📤 Mission uploaded:", { username, questDescription });
    }, 2000);
  });
}

// Setup user detail modal
function setupUserDetailModal() {
  if (!userDetailModal || !closeUserModal) return;

  // Close modal events
  closeUserModal.addEventListener("click", closeUserDetailModal);

  // Close on outside click
  userDetailModal.addEventListener("click", function (e) {
    if (e.target === userDetailModal) {
      closeUserDetailModal();
    }
  });

  // Close on escape key
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && !userDetailModal.classList.contains("hidden")) {
      closeUserDetailModal();
    }
  });
}

function closeUserDetailModal() {
  if (userDetailModal) {
    userDetailModal.classList.add("hidden");
    document.body.style.overflow = "";
  }
}

function showUserDetail(userData) {
  if (!userDetailModal || !userModalContent) return;

  const userBadges = badges.filter((badge) =>
    userData.badges.includes(badge.id)
  );

  userModalContent.innerHTML = `
        <div class="text-center mb-6">
            <div class="w-20 h-20 mx-auto mb-4 bg-gradient-to-r from-web3-primary to-web3-secondary rounded-full flex items-center justify-center">
                <i class="fas fa-user text-2xl text-white"></i>
            </div>
            <h3 class="font-inter text-xl font-bold text-theme-primary mb-1">${
              userData.username
            }</h3>
            <span class="inline-block px-3 py-1 text-sm rounded-full bg-gradient-to-r from-purple-500 to-blue-500 text-white">
                Level ${userData.level}
            </span>
        </div>
        
        <div class="grid grid-cols-2 gap-4 mb-6">
            <div class="text-center p-4 rounded-xl bg-theme-card" style="border: 1px solid var(--border-color);">
                <div class="text-2xl font-bold text-web3-primary">${
                  userData.points
                }</div>
                <div class="text-xs text-theme-secondary">Total Poin</div>
            </div>
            <div class="text-center p-4 rounded-xl bg-theme-card" style="border: 1px solid var(--border-color);">
                <div class="text-2xl font-bold text-web3-secondary">${
                  userData.missions_completed
                }</div>
                <div class="text-xs text-theme-secondary">Misi Selesai</div>
            </div>
            <div class="text-center p-4 rounded-xl bg-theme-card" style="border: 1px solid var(--border-color);">
                <div class="text-2xl font-bold text-web3-accent">${
                  userData.streak
                }</div>
                <div class="text-xs text-theme-secondary">Streak Hari</div>
            </div>
            <div class="text-center p-4 rounded-xl bg-theme-card" style="border: 1px solid var(--border-color);">
                <div class="text-2xl font-bold text-yellow-400">#${
                  userData.rank
                }</div>
                <div class="text-xs text-theme-secondary">Peringkat</div>
            </div>
        </div>
        
        <div class="mb-6">
            <h4 class="font-inter text-lg font-semibold text-theme-primary mb-3 flex items-center">
                <i class="fas fa-award text-purple-400 mr-2"></i>
                Lencana (${userBadges.length})
            </h4>
            <div class="grid grid-cols-3 gap-3">
                ${userBadges
                  .map(
                    (badge) => `
                    <div class="group relative">
                        <div class="p-3 rounded-xl bg-gradient-to-r ${badge.color} text-center">
                            <i class="fas ${badge.icon} text-white text-lg"></i>
                        </div>
                        <div class="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center text-xs font-bold text-black">
                            ${badge.points}
                        </div>
                    </div>
                `
                  )
                  .join("")}
                ${
                  userBadges.length === 0
                    ? '<div class="col-span-3 text-center text-theme-secondary text-sm">Belum ada lencana</div>'
                    : ""
                }
            </div>
        </div>
        
        <div class="text-center">
            <button class="web3-button-small" onclick="closeUserDetailModal()">
                <i class="fas fa-times mr-2"></i>
                Tutup
            </button>
        </div>
    `;

  userDetailModal.classList.remove("hidden");
  document.body.style.overflow = "hidden";
}

// Display leaderboard
function displayLeaderboard() {
  if (!leaderboardList) return;

  const leaderboardElements = leaderboard
    .slice(0, 10)
    .map((player) => {
      const rankIcons = {
        1: "fas fa-crown text-yellow-400",
        2: "fas fa-medal text-gray-300",
        3: "fas fa-award text-orange-400",
      };

      const userBadges = badges.filter((badge) =>
        player.badges.includes(badge.id)
      );
      const topBadges = userBadges.slice(0, 3);

      return `
            <div class="leaderboard-item flex items-center p-3 md:p-4 rounded-xl bg-theme-card border transition-all duration-300 hover:scale-[1.02] cursor-pointer" 
                 style="border-color: var(--border-color);" 
                 onclick="showUserDetail(${JSON.stringify(player).replace(
                   /"/g,
                   "&quot;"
                 )})">
                <!-- Rank -->
                <div class="rank flex items-center w-8 md:w-12 flex-shrink-0">
                    ${
                      player.rank <= 3
                        ? `<i class="${
                            rankIcons[player.rank]
                          } text-sm md:text-base"></i>`
                        : `<span class="text-theme-primary font-bold text-sm md:text-base">${player.rank}</span>`
                    }
                </div>
                
                <!-- Player Info -->
                <div class="flex-1 ml-2 md:ml-4 min-w-0">
                    <div class="flex items-center mb-1 flex-wrap gap-1 md:gap-2">
                        <h4 class="font-inter font-semibold text-theme-primary text-sm md:text-base truncate">${
                          player.username
                        }</h4>
                        <span class="text-xs px-2 py-1 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 text-white whitespace-nowrap">
                            Lv.${player.level}
                        </span>
                    </div>
                    <div class="flex items-center gap-2 md:gap-4 text-xs text-theme-secondary flex-wrap">
                        <span class="flex items-center whitespace-nowrap"><i class="fas fa-trophy mr-1"></i>${
                          player.points
                        }</span>
                        <span class="flex items-center whitespace-nowrap hidden sm:block"><i class="fas fa-target mr-1"></i>${
                          player.missions_completed
                        }</span>
                        <span class="flex items-center whitespace-nowrap"><i class="fas fa-fire mr-1"></i>${
                          player.streak
                        }</span>
                    </div>
                </div>
                
                <!-- Badges -->
                <div class="badge flex space-x-1 flex-shrink-0">
                    ${topBadges
                      .slice(0, 2)
                      .map(
                        (badge) => `
                        <div class="w-5 h-5 md:w-6 md:h-6 bg-gradient-to-r ${badge.color} rounded flex items-center justify-center">
                            <i class="fas ${badge.icon} text-white text-xs"></i>
                        </div>
                    `
                      )
                      .join("")}
                    ${
                      player.badges.length > 2
                        ? `<div class="w-5 h-5 md:w-6 md:h-6 bg-gray-600 rounded flex items-center justify-center text-xs text-white">+${
                            player.badges.length - 2
                          }</div>`
                        : ""
                    }
                </div>
                
                <!-- Click indicator -->
                <div class="ml-2 text-theme-muted">
                    <i class="fas fa-chevron-right text-xs"></i>
                </div>
            </div>
        `;
    })
    .join("");

  leaderboardList.innerHTML = leaderboardElements;
  console.log(
    "📊 Papan peringkat ditampilkan:",
    leaderboard.length + " pemain"
  );
}

// Update navigation items active state
function updateNavigationItems(activeSection) {
  navItems.forEach((item) => {
    const section = item.getAttribute("data-section");

    if (section === activeSection) {
      item.classList.add("active");
    } else {
      item.classList.remove("active");
    }
  });
}

// Setup new mission button
function setupNewMissionButton() {
  newMissionBtn.addEventListener("click", function (e) {
    e.preventDefault();

    // Add click animation
    this.style.transform = "scale(0.95)";
    setTimeout(() => {
      this.style.transform = "scale(1)";
    }, 150);

    // Display new mission
    displayRandomMission();

    // Add button pulse effect
    this.classList.add("animate-pulse");
    setTimeout(() => {
      this.classList.remove("animate-pulse");
    }, 1000);

    console.log("🎯 New mission button clicked");
  });

  // Add keyboard support
  newMissionBtn.addEventListener("keydown", function (e) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      this.click();
    }
  });
}

// Add scroll animations to elements
function setupScrollAnimations() {
  const animatedElements = document.querySelectorAll(
    ".glass-card, .btn-primary, .btn-secondary, .btn-accent"
  );

  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("fade-in");
      }
    });
  }, observerOptions);

  animatedElements.forEach((element) => {
    observer.observe(element);
  });
}

// Add scroll animations alias for compatibility
function addScrollAnimations() {
  setupScrollAnimations();
}

// Keyboard navigation support
document.addEventListener("keydown", function (e) {
  // Space bar for new mission
  if (e.code === "Space" && e.target === document.body) {
    e.preventDefault();
    newMissionBtn.click();
  }

  // Arrow keys for section navigation
  if (e.code === "ArrowDown" || e.code === "ArrowUp") {
    e.preventDefault();

    const sections = ["home", "gallery", "merch"];
    const currentIndex = sections.indexOf(currentSection);

    let nextIndex;
    if (e.code === "ArrowDown") {
      nextIndex = Math.min(currentIndex + 1, sections.length - 1);
    } else {
      nextIndex = Math.max(currentIndex - 1, 0);
    }

    const targetSection = sections[nextIndex];
    const targetElement = document.getElementById(targetSection);

    if (targetElement && nextIndex !== currentIndex) {
      targetElement.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }
});

// Handle window resize
window.addEventListener("resize", function () {
  // Recalculate scroll progress on resize
  const scrollTop = window.pageYOffset;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrollPercent = (scrollTop / docHeight) * 100;
  progressBar.style.width = scrollPercent + "%";
});

// Performance optimization: Throttle scroll events
function throttle(func, limit) {
  let inThrottle;
  return function () {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

// Apply throttling to scroll listener
window.addEventListener(
  "scroll",
  throttle(function () {
    // This is already handled in setupScrollListener
  }, 16)
); // ~60fps

// Add easter egg: Konami code
let konamiCode = [];
const konamiSequence = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "KeyB",
  "KeyA",
];

document.addEventListener("keydown", function (e) {
  konamiCode.push(e.code);

  if (konamiCode.length > konamiSequence.length) {
    konamiCode.shift();
  }

  if (konamiCode.join("") === konamiSequence.join("")) {
    // Easter egg activated!
    console.log("🎉 Konami code activated! Extra missions unlocked!");

    // Add special missions
    const specialMissions = [
      "🎮 Main game favoritmu selama 1 jam tanpa merasa bersalah!",
      "🍕 Pesan makanan favorit dan nikmati tanpa mikir kalori!",
      "😴 Tidur siang selama 30 menit di siang hari!",
      "🛀 Mandi air hangat sambil dengerin musik favorit!",
      "🎬 Nonton film atau series yang udah lama pengen ditonton!",
    ];

    missions.push(...specialMissions);

    // Show special notification
    const notification = document.createElement("div");
    notification.className = "fixed top-4 right-4 glass-card p-4 z-50 fade-in";
    notification.innerHTML = `
            <div class="text-center">
                <div class="text-2xl mb-2">🎉</div>
                <div class="font-fredoka font-semibold">Easter Egg!</div>
                <div class="font-poppins text-sm">Extra missions unlocked!</div>
            </div>
        `;

    document.body.appendChild(notification);

    setTimeout(() => {
      notification.remove();
    }, 3000);

    konamiCode = []; // Reset
  }
});

// Export functions for potential testing
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    loadMissions,
    displayRandomMission,
    updateActiveSection,
    updateNavigationDots,
  };
}
