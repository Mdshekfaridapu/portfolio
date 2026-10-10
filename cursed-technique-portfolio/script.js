const menuToggle = document.querySelector("#menuToggle");
const nav = document.querySelector("#nav");
const domainButton = document.querySelector("#domainButton");
const domainOverlay = document.querySelector("#domainOverlay");
const closeDomain = document.querySelector("#closeDomain");

menuToggle.addEventListener("click", () => {
  const open = menuToggle.getAttribute("aria-expanded") !== "true";
  menuToggle.setAttribute("aria-expanded", String(open));
  nav.classList.toggle("open", open);
});

nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  nav.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
}));

function activateDomain(active) {
  domainOverlay.classList.toggle("active", active);
  domainOverlay.setAttribute("aria-hidden", String(!active));
  document.body.classList.toggle("domain-active", active);
  if (active) closeDomain.focus();
  else domainButton.focus();
}
domainButton.addEventListener("click", () => activateDomain(true));
closeDomain.addEventListener("click", () => activateDomain(false));
document.addEventListener("keydown", event => {
  if (event.key === "Escape" && domainOverlay.classList.contains("active")) activateDomain(false);
});

document.querySelector("#year").textContent = new Date().getFullYear();

const form = document.querySelector("#contactForm");
const formNote = document.querySelector("#formNote");
form.addEventListener("submit", event => {
  event.preventDefault();
  const data = new FormData(form);
  const name = String(data.get("name")).trim();
  const email = String(data.get("email")).trim();
  const message = String(data.get("message")).trim();
  const subject = encodeURIComponent(`Portfolio inquiry from ${name}`);
  const body = encodeURIComponent(`Hi [YOUR NAME],\n\n${message}\n\nFrom: ${name}\nReply to: ${email}`);
  formNote.textContent = "Opening your email app…";
  window.location.href = `mailto:hello@example.com?subject=${subject}&body=${body}`;
});

const revealTargets = document.querySelectorAll(".about-copy, .about-stamp, .skill-card, .project-card, .contact-grid > div, .contact-form");
revealTargets.forEach(el => el.classList.add("reveal"));
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealTargets.forEach(el => observer.observe(el));
} else {
  revealTargets.forEach(el => el.classList.add("visible"));
}

const glow = document.querySelector(".cursor-glow");
window.addEventListener("pointermove", event => {
  glow.style.left = `${event.clientX}px`;
  glow.style.top = `${event.clientY}px`;
}, { passive: true });
