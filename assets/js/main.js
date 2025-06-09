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

  // Intersection Observer
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("fade-in");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll(".card").forEach((card) => {
    card.classList.add("opacity-0", "transition");
    observer.observe(card);
  });

  // Formulario sin recarga
  const form = document.getElementById("contact-form");
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const data = new FormData(form);
    try {
      await fetch(form.action, { method: form.method, body: data });
      form.innerHTML = `<div class="alert alert-success" role="alert">
                          ¡Gracias! Agenda tu cita gratuita y hablamos pronto.
                        </div>`;
    } catch {
      form.innerHTML = `<div class="alert alert-danger" role="alert">
                          Error al enviar. Intenta de nuevo más tarde.
                        </div>`;
    }
  });
});
