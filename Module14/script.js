const burger = document.getElementById("burger");
const nav = document.getElementById("nav");
const year = document.getElementById("year");
const contactForm = document.getElementById("contactForm");
const formMsg = document.getElementById("formMsg");

year.textContent = new Date().getFullYear();

// Mobile menu
burger?.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  burger.setAttribute("aria-expanded", String(isOpen));
});

// Close menu when clicking a link (mobile)
document.querySelectorAll(".nav__link").forEach(link => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    burger.setAttribute("aria-expanded", "false");
  });
});

// Demo contact submit (frontend only)
contactForm?.addEventListener("submit", (e) => {
  e.preventDefault();
  formMsg.textContent = "Thanks! Your message has been captured (demo).";
  contactForm.reset();
  setTimeout(() => (formMsg.textContent = ""), 3500);
});
