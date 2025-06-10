document.addEventListener("DOMContentLoaded", () => {
  // Toggle modo oscuro
  const toggle = document.getElementById("themeToggle");
  toggle.addEventListener("change", () => {
    document.documentElement.setAttribute(
      "data-theme",
      toggle.checked ? "dark" : "light"
    );
    localStorage.setItem("theme", toggle.checked);
  });
  if (localStorage.getItem("theme") === "true") {
    toggle.checked = true;
    toggle.dispatchEvent(new Event("change"));
  }
  // Formulario sin recarga
  const form = document.getElementById("contact-form");
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const data = new FormData(form);
    try {
      await fetch(form.action, { method: form.method, body: data });
      form.innerHTML = `<div class="alert alert-success" role="alert">
                          ¡Gracias! Agendaste tu cita gratuita, te hablamos pronto.
                        </div>`;
    } catch {
      form.innerHTML = `<div class="alert alert-danger" role="alert">
                          Error al enviar. Recarga la página e intenta de nuevo.
                        </div>`;
    }
  });
  // Intersection Observer para animaciones
  // Intersection Observer con threshold sin rootMargin
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("fade-in");
        entry.target.classList.remove("opacity-0");
      } else {
        entry.target.classList.remove("fade-in");
        entry.target.classList.add("opacity-0");
      }
    });
  }, {
    threshold: 0.1
  });

  document.querySelectorAll(".animate-on-scroll").forEach(el => {
    // Estado inicial
    el.classList.add("opacity-0", "transition");
    observer.observe(el);
  });
// 1) Función de filtrado
  function filterProjects() {
    const q = document.getElementById("projectSearch")
                   .value.trim()
                   .toLowerCase();
    // Selecciona TODAS las columnas hijas directas del grid
    document.querySelectorAll("#projectsGrid > div").forEach(col => {
      const card = col.querySelector(".card");
      const title = card.querySelector(".card-title")
                        .textContent
                        .toLowerCase();
      const tags = Array.from(card.querySelectorAll(".tags .badge"))
                        .map(b => b.textContent.toLowerCase());
      const match = title.includes(q) || tags.some(t => t.includes(q));
      col.style.display = match ? "" : "none";
    });
  }

  // 2) Asigna eventos
  const input = document.getElementById("projectSearch");
  input.addEventListener("input", filterProjects);
  input.addEventListener("keydown", e => {
    if (e.key === "Enter") {
      e.preventDefault();
      filterProjects();
    }
  });
});