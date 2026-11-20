const menuButton = document.querySelector(".menu-button");
const nav = document.querySelector("#site-nav");

menuButton?.addEventListener("click", () => {
  const isOpen = menuButton.getAttribute("aria-expanded") === "true";
  menuButton.setAttribute("aria-expanded", String(!isOpen));
  nav?.classList.toggle("open", !isOpen);
});

nav?.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => {
  menuButton?.setAttribute("aria-expanded", "false");
  nav.classList.remove("open");
}));

const displayContent = {
  similar: {
    name: "Similar assortment",
    result: "Easy comparison. The focal item blends in.",
  },
  mixed: {
    name: "Mixed assortment",
    result: "More discovery. Stronger product evaluations.",
  },
};

const displayButtons = document.querySelectorAll(".display-toggle");
const similarImage = document.querySelector(".similar-image");
const mixedImage = document.querySelector(".mixed-image");
const displayName = document.querySelector("#display-name");
const displayResult = document.querySelector("#display-result");

displayButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const view = button.dataset.view;

    displayButtons.forEach((item) => {
      const active = item === button;
      item.classList.toggle("active", active);
      item.setAttribute("aria-pressed", String(active));
    });

    similarImage?.classList.toggle("visible", view === "similar");
    mixedImage?.classList.toggle("visible", view === "mixed");

    if (displayName) displayName.textContent = displayContent[view].name;
    if (displayResult) displayResult.textContent = displayContent[view].result;
  });
});

const projectTrack = document.querySelector("[data-project-track]");
const previousProjectButton = document.querySelector("[data-project-previous]");
const nextProjectButton = document.querySelector("[data-project-next]");

const updateProjectControls = () => {
  if (!projectTrack) return;
  const maxScroll = projectTrack.scrollWidth - projectTrack.clientWidth;
  previousProjectButton?.toggleAttribute("disabled", projectTrack.scrollLeft <= 2);
  nextProjectButton?.toggleAttribute("disabled", projectTrack.scrollLeft >= maxScroll - 2);
};

const moveProjects = (direction) => {
  if (!projectTrack) return;
  const card = projectTrack.querySelector(".project-card");
  if (!card) return;
  const gap = Number.parseFloat(getComputedStyle(projectTrack).gap) || 0;
  const visibleCards = window.innerWidth <= 760 ? 1 : window.innerWidth <= 1000 ? 2 : 3;
  projectTrack.scrollBy({
    left: direction * (card.getBoundingClientRect().width + gap) * visibleCards,
    behavior: reducedMotion ? "auto" : "smooth",
  });
};

previousProjectButton?.addEventListener("click", () => moveProjects(-1));
nextProjectButton?.addEventListener("click", () => moveProjects(1));
projectTrack?.addEventListener("scroll", updateProjectControls, { passive: true });
window.addEventListener("resize", updateProjectControls);
updateProjectControls();

const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (reducedMotion) {
  document.querySelectorAll(".reveal").forEach((item) => item.classList.add("visible"));
} else {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll(".reveal").forEach((item) => observer.observe(item));
}

const year = document.querySelector("#year");
if (year) year.textContent = new Date().getFullYear();
