/* =========================================
   1. GLOBAL VARIABLES AND SELECTORS
   ========================================= */
const body = document.body;
const menuBtn = document.querySelector(".mobile-menu-btn");
const closeBtn = document.querySelector(".close-sidebar-btn");
const overlay = document.querySelector("#sidebar-overlay");

function smoothScrollTo(targetSelector, offset = 0) {
  const targetElement = document.querySelector(targetSelector);
  if (!targetElement) return;

  const elementPosition = targetElement.getBoundingClientRect().top;
  const startPosition = window.scrollY;
  const finalPosition = elementPosition + startPosition - offset;

  window.scrollTo({
    top: finalPosition,
    behavior: "smooth",
  });
}

/* =========================================
   2. UI FUNCTIONS
   ========================================= */

function toggleSidebar() {
  body.classList.toggle("menu-open");
}

/* =========================================
   3. EVENT LISTENERS
   ========================================= */

// 1. Open menu when clicking the hamburger button
if (menuBtn) {
  menuBtn.addEventListener("click", (e) => {
    e.preventDefault();
    toggleSidebar();
  });
}

// 2. Close menu when clicking outside (on the dark overlay)
if (overlay) {
  overlay.addEventListener("click", toggleSidebar);
}

// 3. (Optional) Close menu with the ESC key for accessibility
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && body.classList.contains("menu-open")) {
    toggleSidebar();
  }
});

/* =========================================
   4. NAV-SEARCH
   ========================================= */

/* =========================================
   5. HERO-CARD: 3D TRACKING + CAROUSEL
   ========================================= */

// 1. GLOBAL VARIABLES
const cards = document.querySelectorAll(".hero-card-3d");
const btnNext = document.getElementById("nextMovie");
const btnPrev = document.getElementById("prevMovie");
let currentIndex = 0;

// 2. MOUSE BASE FUNCTION
function mouseBase(event, element) {
  if (!element) return;

  const x = event.clientX;
  const y = event.clientY;
  const middleX = window.innerWidth / 2;
  const middleY = window.innerHeight / 2;

  const offsetX = ((x - middleX) / middleX) * 10;
  const offsetY = ((y - middleY) / middleY) * 10;

  element.style.setProperty("--rotateX", -1 * offsetY + "deg");
  element.style.setProperty("--rotateY", offsetX + "deg");
}

// 3. MOUSE EVENT (Dynamic)
document.addEventListener("mousemove", (event) => {
  if (cards.length > 0) {
    mouseBase(event, cards[currentIndex]);
  }
});

// 4. CAROUSEL LOGIC
function updateCarousel() {
  cards.forEach((card) => {
    card.classList.remove("currentCard", "prevCard", "nextCard");

    card.style.setProperty("--rotateX", "0deg");
    card.style.setProperty("--rotateY", "0deg");
  });

  const total = cards.length;
  if (total === 0) return;

  let prevIndex = (currentIndex - 1 + total) % total;
  let nextIndex = (currentIndex + 1) % total;

  const activeCard = cards[currentIndex];
  activeCard.classList.add("currentCard");
  cards[prevIndex].classList.add("prevCard");
  cards[nextIndex].classList.add("nextCard");

  activeCard.classList.add("locked");

  setTimeout(() => {
    activeCard.classList.remove("locked");
  }, 1000);
}

let isAnimating = false;

// 5. NEXT BUTTON

document.getElementById("nextMovie").addEventListener("click", () => {
  if (isAnimating) return;

  isAnimating = true;

  currentIndex = (currentIndex + 1) % cards.length;
  updateCarousel();

  setTimeout(() => {
    isAnimating = false;
  }, 1000);
});

// 6. PREVIOUS BUTTON
document.getElementById("prevMovie").addEventListener("click", () => {
  if (isAnimating) return;

  isAnimating = true;

  currentIndex = (currentIndex - 1 + cards.length) % cards.length;
  updateCarousel();

  setTimeout(() => {
    isAnimating = false;
  }, 800);
});

if (cards.length > 0) {
  updateCarousel();
}

// HERO CARD COLORS

// const silverGradient = `linear-gradient(
//     45deg,
//     #2c2c2c 0%,
//     #d1d1d1 25%,
//     #7a7a7a 50%,
//     #e0e0e0 75%,
//     #2c2c2c 100%
// )`;

/* =========================================
   6. SIDEBAR MENU INTERCEPTOR
   ========================================= */

document.querySelectorAll(".sidebar-link").forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const targetId = this.getAttribute("href");

    smoothScrollTo(targetId, 100);
  });
});

// 6.1. MORE MOVIES
document.querySelectorAll(".more-movies").forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const targetId = this.getAttribute("href");

    smoothScrollTo(targetId, 100);
  });
});

/* =========================================
   7. PROFILE DROPDOWN LOGIC
   ========================================= */
const profileBtn = document.getElementById("acc-btn");
const profileMenu = document.getElementById("profile-menu");

if (profileBtn) {
  profileBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    profileMenu.classList.toggle("active");
  });
}

document.addEventListener("click", (e) => {
  if (
    profileMenu.classList.contains("active") &&
    !profileMenu.contains(e.target) &&
    !profileBtn.contains(e.target)
  ) {
    profileMenu.classList.remove("active");
  }
});

/* =========================================
   8. FORM OVERLAYS
   ========================================= */

const authModal = document.getElementById("auth-modal");
const btnClose = document.getElementById("modal-close");
const btnLoginTrigger = document.getElementById("btn-login-trigger");
const btnSignupTrigger = document.getElementById("btn-signup-trigger");

const modalTitle = document.getElementById("modal-title");
const modalSubtitle = document.getElementById("modal-subtitle");
const modalBtn = document.getElementById("modal-action-btn");
const modalFooterText = document.getElementById("modal-footer-text");
const termsGroup = document.getElementById("terms-group");
const switchModeBtn = document.getElementById("switch-auth-mode");

let isLoginMode = true;

function openAuthModal(mode) {
  authModal.classList.add("active");
  document.body.style.overflow = "hidden";

  const profileMenu = document.getElementById("profile-menu");
  if (profileMenu) profileMenu.classList.remove("active");

  if (mode === "login") {
    setLoginMode();
  } else {
    setSignupMode();
  }
}

function closeAuthModal() {
  authModal.classList.remove("active");
  document.body.style.overflow = "";
}

function setLoginMode() {
  isLoginMode = true;
  modalTitle.textContent = "Sign In";
  modalSubtitle.textContent = "Welcome back!";
  modalBtn.textContent = "Sign In";
  termsGroup.style.display = "none";
  modalFooterText.innerHTML =
    'New here? <a href="#" id="switch-auth-mode">Sign up now</a>';
  reattachSwitchListener();
}

function setSignupMode() {
  isLoginMode = false;
  modalTitle.textContent = "Sign Up";
  modalSubtitle.textContent = "Create an account!";
  modalBtn.textContent = "Sign Up";
  termsGroup.style.display = "block";
  modalFooterText.innerHTML =
    'Already have an account? <a href="#" id="switch-auth-mode">Sign In</a>';
  reattachSwitchListener();
}

function reattachSwitchListener() {
  const newSwitchBtn = document.getElementById("switch-auth-mode");
  newSwitchBtn.addEventListener("click", (e) => {
    e.preventDefault();
    isLoginMode ? setSignupMode() : setLoginMode();
  });
}

if (btnLoginTrigger) {
  btnLoginTrigger.addEventListener("click", (e) => {
    e.stopPropagation();
    openAuthModal("login");
  });
}

if (btnSignupTrigger) {
  btnSignupTrigger.addEventListener("click", (e) => {
    e.stopPropagation();
    openAuthModal("signup");
  });
}

if (btnClose) {
  btnClose.addEventListener("click", closeAuthModal);
}
authModal.addEventListener("click", (e) => {
  if (e.target === authModal) {
    closeAuthModal();
  }
});

reattachSwitchListener();

/* =========================================
   9. MOCK AUTH SERVICE
   ========================================= */
const AuthService = {
  login: (email, password) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email && password.length >= 6) {
          const fakeUser = {
            name: "Socio Developer",
            email: email,
            avatar: "https://i.pravatar.cc/150?img=11",
            token: "token_falso_12345",
          };

          localStorage.setItem("app_user", JSON.stringify(fakeUser));

          resolve(fakeUser);
        } else {
          reject("Credenciales incorrectas (Password debe ser > 6 caracteres)");
        }
      }, 1500);
    });
  },

  register: (email, password) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const newUser = {
          name: "Nuevo Usuario",
          email: email,
          avatar: "https://i.pravatar.cc/150?img=5",
          token: "token_nuevo_abcde",
        };

        localStorage.setItem("app_user", JSON.stringify(newUser));
        resolve(newUser);
      }, 1500);
    });
  },

  logout: () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        localStorage.removeItem("app_user");
        resolve();
      }, 500);
    });
  },

  getCurrentUser: () => {
    const userStr = localStorage.getItem("app_user");
    return userStr ? JSON.parse(userStr) : null;
  },
};
