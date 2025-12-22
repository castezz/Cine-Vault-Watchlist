/* =========================================
   1. GLOBAL VARIABLES AND SELECTORS
   ========================================= */
const body = document.body;

// Sidebar Elements
const menuBtn = document.querySelector(".mobile-menu-btn"); // Hamburger Button (Navbar)
const closeBtn = document.querySelector(".close-sidebar-btn"); // Close Button X (Sidebar)
const overlay = document.querySelector("#sidebar-overlay"); // Dark background overlay

/* =========================================
   2. UI FUNCTIONS
   ========================================= */

/**
 * Toggles the sidebar state (Push Menu).
 * Adds or removes the 'menu-open' class from the body,
 * which triggers all CSS push and slide-in animations.
 */
function toggleSidebar() {
  // The logic happens here: we simply toggle a class on the root element
  body.classList.toggle("menu-open");
}

/* =========================================
   3. EVENT LISTENERS
   ========================================= */

// 1. Open menu when clicking the hamburger button
if (menuBtn) {
  menuBtn.addEventListener("click", (e) => {
    // Prevents default behavior if the element is an anchor tag
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
   4. HERO-CARD JS MOUSE TRACKING
   ========================================= */

const heroCard = document.querySelector(".hero-card-3d");

document.addEventListener("mousemove", (event) => {
  mouseBase(event, heroCard);
});

/**
 * Calculates mouse position relative to the center of the screen
 * and updates CSS variables for 3D rotation effects.
 */
function mouseBase(event, element) {
  const x = event.clientX;
  const y = event.clientY;

  const middleX = window.innerWidth / 2;
  const middleY = window.innerHeight / 2;

  // Calculate rotation intensity based on offset from center
  const offsetX = ((x - middleX) / middleX) * 5;
  const offsetY = ((y - middleY) / middleY) * 5;

  element.style.setProperty("--rotateX", -1 * offsetY + "deg");
  element.style.setProperty("--rotateY", offsetX + "deg");
}

// HERO CARD (CHANGING COLORS FOR SPAN RANK NUMBER)

const silverGradient = `linear-gradient(
    45deg,
    #2c2c2c 0%, 
    #d1d1d1 25%, 
    #7a7a7a 50%, 
    #e0e0e0 75%, 
    #2c2c2c 100%
)`;
