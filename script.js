// Menu overlay
const menu = document.getElementById("menu");
const openBtn = document.getElementById("menuOpen");
const closeBtn = document.getElementById("menuClose");

function openMenu(){
  menu.classList.add("open");
  menu.setAttribute("aria-hidden", "false");
  openBtn?.setAttribute("aria-expanded", "true");
  closeBtn?.focus();
}
function closeMenu(){
  menu.classList.remove("open");
  menu.setAttribute("aria-hidden", "true");
  openBtn?.setAttribute("aria-expanded", "false");
  openBtn?.focus();
}

openBtn?.addEventListener("click", openMenu);
closeBtn?.addEventListener("click", closeMenu);

window.addEventListener("keydown", (e) => {
  if(e.key === "Escape" && menu.classList.contains("open")) closeMenu();
});

// Close menu when clicking a menu link
document.querySelectorAll("[data-link]").forEach(a => {
  a.addEventListener("click", () => closeMenu());
});

// Scroll reveal (IntersectionObserver)
const observer = new IntersectionObserver((entries) => {
  for (const entry of entries){
    if(entry.isIntersecting){
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    }
  }
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

// Footer year
const y = document.getElementById("year");
if (y) y.textContent = new Date().getFullYear();
