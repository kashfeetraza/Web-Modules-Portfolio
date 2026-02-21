// Mobile menu
const burger = document.getElementById("burger");
const nav = document.getElementById("nav");

burger?.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  burger.setAttribute("aria-expanded", String(isOpen));
});

// Close nav on click (mobile)
document.querySelectorAll(".nav__link").forEach(a => {
  a.addEventListener("click", () => {
    nav.classList.remove("open");
    burger?.setAttribute("aria-expanded", "false");
  });
});

// Count-up animation for stats
const counters = document.querySelectorAll("[data-count]");
const prefersReduced = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;

function animateCount(el) {
  const raw = el.getAttribute("data-count") || "0";
  const target = Number(raw);
  const isFloat = raw.includes(".");
  const duration = 1100;
  const start = performance.now();

  function tick(now) {
    const t = Math.min(1, (now - start) / duration);
    const value = target * (0.15 + 0.85 * t); // softer start
    el.textContent = isFloat ? value.toFixed(1) : Math.floor(value).toString();

    if (t < 1) requestAnimationFrame(tick);
    else el.textContent = isFloat ? target.toFixed(1) : String(target);
  }

  requestAnimationFrame(tick);
}

if (!prefersReduced) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        animateCount(e.target);
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.35 });

  counters.forEach(c => io.observe(c));
} else {
  counters.forEach(c => {
    c.textContent = c.getAttribute("data-count") || "0";
  });
}
