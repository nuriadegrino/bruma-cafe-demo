/* =========================================
   BRUMA CAFÉ — DEMO INTERACTIONS
========================================= */

const menuToggle = document.getElementById("menuToggle");
const mobileMenu = document.getElementById("mobileMenu");
const header = document.querySelector(".site-header");

/* Mobile navigation */
if (menuToggle && mobileMenu) {
  menuToggle.addEventListener("click", () => {
    const isOpen = mobileMenu.classList.toggle("active");
    menuToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    menuToggle.setAttribute("aria-label", isOpen ? "Cerrar menú" : "Abrir menú");
  });

  document.querySelectorAll(".mobile-menu a").forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenu.classList.remove("active");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Abrir menú");
    });
  });
}

/* Header state on scroll */
if (header) {
  const updateHeader = () => {
    header.classList.toggle("scrolled", window.scrollY > 30);
  };

  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });
}

/* Demo reservation */
const bookingForm = document.getElementById("bookingForm");
const bookingSuccess = document.getElementById("bookingSuccess");
const newReservation = document.getElementById("newReservation");

if (bookingForm && bookingSuccess) {
  bookingForm.addEventListener("submit", (event) => {
    event.preventDefault();
    bookingForm.style.display = "none";
    bookingSuccess.hidden = false;
    bookingSuccess.scrollIntoView({ behavior: "smooth", block: "center" });
  });
}

if (newReservation && bookingForm && bookingSuccess) {
  newReservation.addEventListener("click", () => {
    bookingSuccess.hidden = true;
    bookingForm.reset();
    bookingForm.style.display = "flex";
    bookingForm.scrollIntoView({ behavior: "smooth", block: "center" });
  });
}

/* Do not allow a reservation date in the past */
const dateInput = document.getElementById("date");

if (dateInput) {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  dateInput.min = `${year}-${month}-${day}`;
}

/* Smooth anchor navigation with fixed-header offset */
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    const targetId = link.getAttribute("href");

    if (!targetId || targetId === "#") return;

    const target = document.querySelector(targetId);
    if (!target) return;

    event.preventDefault();

    const headerHeight = header ? header.offsetHeight : 0;
    const targetPosition =
      target.getBoundingClientRect().top +
      window.scrollY -
      headerHeight;

    window.scrollTo({
      top: targetPosition,
      behavior: "smooth"
    });
  });
});
