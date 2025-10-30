// Reveal elements on scroll
document.addEventListener("scroll", () => {
  const elements = document.querySelectorAll(".about-card, .department-card, .project-card");
  elements.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) {
      el.style.opacity = "1";
      el.style.transform = "translateY(0)";
      el.style.transition = "all 0.6s ease";
    }
  });
});
