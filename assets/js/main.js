document.addEventListener("DOMContentLoaded", () => {
  // ===== LÓGICA PARA EL MENÚ MÓVIL (HAMBURGUESA) =====
  const navToggler = document.getElementById("navToggler");
  const navLinks = document.getElementById("mainNavLinks");

  navToggler.addEventListener("click", () => {
    navLinks.classList.toggle("is-open");
    navToggler.classList.toggle("is-open");
    const isExpanded = navLinks.classList.contains("is-open");
    navToggler.setAttribute("aria-expanded", isExpanded);
  });

  // ===== Formulario sin recarga (Sin cambios) =====
  const form = document.getElementById("contact-form");
  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const data = new FormData(form);
      try {
        const response = await fetch(form.action, { 
            method: form.method, 
            body: data,
            headers: { 'Accept': 'application/json' }
        });
        if (response.ok) {
            form.innerHTML = `<div class="form-success-message">
                                <h3>¡Gracias por tu interés!</h3>
                                <p>He recibido tu solicitud y me pondré en contacto contigo pronto.</p>
                                <p>Si quieres, puedes agendar una reunión directamente en mi calendario:</p>
                                <a href="https://calendly.com/dsarfirths/agendar-cita" class="custom-button" target="_blank" rel="noopener noreferrer">Agendar una cita</a>
                              </div>`;
        } else {
            throw new Error('Network response was not ok.');
        }
      } catch (error) {
        form.innerHTML = `<div class="alert" style="background-color: var(--accent-color);">
                          Error al enviar. Recarga la página e intenta de nuevo.
                        </div>`;
      }
    });
  }

  // ===== Intersection Observer para animaciones (Sin cambios) =====
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("fade-in");
        entry.target.classList.remove("opacity-0");
      }
    });
  }, {
    threshold: 0.1
  });

  document.querySelectorAll(".animate-on-scroll").forEach(el => {
    el.classList.add("opacity-0", "transition");
    observer.observe(el);
  });

  // ===== LÓGICA PARA "VER MÁS / VER MENOS" EN SECCIÓN "MI HISTORIA" =====
  const toggleTextButton = document.getElementById('toggleText');
  const longTextContainer = document.querySelector('.long-text');

  if (toggleTextButton && longTextContainer) {
    toggleTextButton.addEventListener('click', () => {
      longTextContainer.classList.toggle('show-more');
      
      if (longTextContainer.classList.contains('show-more')) {
        toggleTextButton.textContent = 'Ver menos';
      } else {
        toggleTextButton.textContent = 'Ver más';
      }
    });
  }

  // ===== LÓGICA PARA FILTRAR PROYECTOS =====
  const searchInput = document.getElementById('projectSearch');
  const projectsGrid = document.getElementById('projectsGrid');

  if (searchInput && projectsGrid) {
    const projectCards = Array.from(projectsGrid.getElementsByClassName('project-card'));

    searchInput.addEventListener('input', () => {
      const searchTerm = searchInput.value.toLowerCase().trim();

      projectCards.forEach(card => {
        const title = card.querySelector('.card-title').textContent.toLowerCase();
        const tags = card.dataset.tags.toLowerCase();

        if (title.includes(searchTerm) || tags.includes(searchTerm)) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  }

  // ===== INICIALIZACIÓN DEL CARRUSEL DE TESTIMONIOS (SWIPER) =====
  const testimonialSlider = document.querySelector('.testimonial-slider');
  if (testimonialSlider) {
    const swiper = new Swiper(testimonialSlider, {
      // Opciones
      loop: true,
      autoplay: {
        delay: 5000, // 5 segundos por slide
        disableOnInteraction: true, // Detener autoplay si el usuario interactúa
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      slidesPerView: 1,
      spaceBetween: 30,
    });
  }

  // ===== INICIALIZACIÓN DE CARRUSELES DE HABILIDADES (SWIPER) =====
  const skillsCarouselConfig = {
    loop: true,
    slidesPerView: 'auto',
    spaceBetween: 16,
    speed: 5000, // Duración de la transición para un movimiento suave
    autoplay: {
        delay: 0, // Sin pausa entre transiciones
        disableOnInteraction: false,
        pauseOnMouseEnter: true, // Pausa cuando el ratón está encima
    },
    freeMode: true,
    allowTouchMove: false, // Desactiva el arrastre manual para un efecto de cinta continua
  };

  const techSkillsCarousel = document.getElementById('technical-skills-carousel');
  if (techSkillsCarousel) {
      new Swiper(techSkillsCarousel, skillsCarouselConfig);
  }

  const softSkillsCarousel = document.getElementById('soft-skills-carousel');
  if (softSkillsCarousel) {
      new Swiper(softSkillsCarousel, {
          ...skillsCarouselConfig,
          autoplay: {
              ...skillsCarouselConfig.autoplay,
              reverseDirection: true, // El segundo carrusel se mueve en dirección opuesta
          },
      });
  }

});