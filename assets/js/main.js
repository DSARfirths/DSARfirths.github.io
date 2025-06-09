// main.js: punto de extensión para tu lógica (filtros, animaciones, etc.)

document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("searchInput");
  const cards = Array.from(document.querySelectorAll(".project-card"));

  input.addEventListener("input", () => {
    const query = input.value.toLowerCase().trim();
    cards.forEach(card => {
      const tags = card.dataset.tags.toLowerCase();
      card.style.display = tags.includes(query) ? "" : "none";
    });
  });
});
