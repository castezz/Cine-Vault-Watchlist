/* =========================================
   1. VARIABLES GLOBALES Y SELECTORES
   ========================================= */
const body = document.body;

// Elementos del Menú Lateral
const menuBtn = document.querySelector(".mobile-menu-btn"); // Botón Hamburguesa (Navbar)
const closeBtn = document.querySelector(".close-sidebar-btn"); // Botón X (Sidebar)
const overlay = document.querySelector("#sidebar-overlay"); // Fondo oscuro

/* =========================================
   2. FUNCIONES DE INTERFAZ (UI)
   ========================================= */

/**
 * Alterna el estado del menú lateral (Push Menu).
 * Añade o quita la clase 'menu-open' al body, lo que dispara
 * todas las animaciones CSS de empuje y entrada.
 */
function toggleSidebar() {
  // La magia ocurre aquí: solo cambiamos una clase en el padre de todo
  body.classList.toggle("menu-open");
}

/* =========================================
   3. EVENT LISTENERS (Escuchadores de Eventos)
   ========================================= */

// 1. Abrir menú al hacer clic en el botón hamburguesa
if (menuBtn) {
  menuBtn.addEventListener("click", (e) => {
    // Evita comportamientos raros si fuera un link
    e.preventDefault();
    toggleSidebar();
  });
}

// 3. Cerrar menú al hacer clic fuera (en el overlay oscuro)
if (overlay) {
  overlay.addEventListener("click", toggleSidebar);
}

// 4. (Opcional) Cerrar menú con la tecla ESC para accesibilidad
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && body.classList.contains("menu-open")) {
    toggleSidebar();
  }
});
