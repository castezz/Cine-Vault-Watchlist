/* =========================================
   1. GLOBAL VARIABLES AND SELECTORS
   ========================================= */
const body = document.body;
const menuBtn = document.querySelector(".mobile-menu-btn");
const closeBtn = document.querySelector(".close-sidebar-btn");
const overlay = document.querySelector("#sidebar-overlay");

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
  }, 800);
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
  }, 800);
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
