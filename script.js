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

// Scroll reveal (avec fallback iOS / anciens navigateurs)
const revealEls = Array.from(document.querySelectorAll(".reveal"));

function showAllReveals(){
  revealEls.forEach(el => el.classList.add("is-visible"));
}

// Si IntersectionObserver n'existe pas → on affiche tout
if (!("IntersectionObserver" in window)) {
  showAllReveals();
} else {
  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries){
      if(entry.isIntersecting){
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    }
  }, {
    threshold: 0.12,
    rootMargin: "0px 0px -10% 0px" // aide sur mobile
  });

  revealEls.forEach(el => observer.observe(el));

  // Fallback iOS : si après 1s rien n'est visible, on affiche tout
  setTimeout(() => {
    const anyVisible = revealEls.some(el => el.classList.contains("is-visible"));
    if (!anyVisible) showAllReveals();
  }, 1000);
}
