// Simple animation on scroll for smooth reveal
document.addEventListener("scroll", () => {
  const cards = document.querySelectorAll(".department-card, .project-card");
  cards.forEach(card => {
    const rect = card.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) {
      card.classList.add("visible");
    }
  });
});

// Add fade-in animation through CSS
const style = document.createElement("style");
style.innerHTML = `
.visible {
  opacity: 1 !important;
  transform: translateY(0) !important;
  transition: all 0.6s ease-out;
}
.department-card, .project-card {
  opacity: 0;
  transform: translateY(50px);
}
`;
document.head.appendChild(style);
