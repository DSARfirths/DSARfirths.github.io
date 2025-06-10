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
        // 1) Remover estado oculto
        entry.target.classList.remove("opacity-0"); 
        // 2) Aplicar animación de entrada
        entry.target.classList.add("fade-in");
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1 // dispara cuando 10 % sea visible 
  });

  // Inicializar todos los elementos animables
  document.querySelectorAll(".animate-on-scroll").forEach(el => {
    el.classList.add("opacity-0", "transition");
    observer.observe(el);
  });
});