document.addEventListener("DOMContentLoaded", () => {
  // ===== CARGA DE COMPONENTES (NAV & FOOTER) Y SU LÓGICA =====

  /**
   * Carga contenido HTML desde una URL y lo inserta en un elemento del DOM.
   * @param {string} url - La URL del archivo HTML a cargar (ej. '_nav.html').
   * @param {string} elementId - El ID del elemento donde se insertará el HTML.
   */
  const loadHTML = async (url, elementId) => {
    const element = document.getElementById(elementId);
    if (!element) return;
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      element.innerHTML = await response.text();
    } catch (error) {
      console.error(`No se pudo cargar el HTML desde ${url}:`, error);
      element.innerHTML = `<p style="color:red; text-align:center;">Error al cargar componente.</p>`;
    }
  };

  /**
   * Inicializa la funcionalidad de la barra de navegación después de que se carga.
   * Esto incluye el menú móvil y el resaltado del enlace activo.
   */
  const initializeNav = () => {
    // Lógica para el menú móvil (hamburguesa)
    const navToggler = document.getElementById("navToggler");
    const navLinks = document.getElementById("mainNavLinks");

    if (navToggler && navLinks) {
      navToggler.addEventListener("click", () => {
        navLinks.classList.toggle("is-open");
        navToggler.classList.toggle("is-open");
        const isExpanded = navLinks.classList.contains("is-open");
        navToggler.setAttribute("aria-expanded", isExpanded);
      });
    }

    // Lógica para el enlace activo
    const navAnchors = document.querySelectorAll('#mainNavLinks ul a');
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';

    navAnchors.forEach(link => {
      const linkPath = link.getAttribute('href').split('#')[0];
      if (linkPath === currentPath && !link.getAttribute('href').includes('#')) {
        link.classList.add('active');
      }
    });
  };

  /**
   * Función principal para cargar todos los componentes y luego inicializarlos.
   */
  const loadComponents = async () => {
    // Carga el nav y el footer en paralelo para mayor eficiencia
    await Promise.all([
      loadHTML('_nav.html', 'main-nav-placeholder'),
      loadHTML('_footer.html', 'main-footer-placeholder')
    ]);
    
    // Una vez que el nav se ha cargado, inicializamos su JS
    initializeNav();
  };

  // Inicia la carga de componentes
  loadComponents();

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
    speed: 3000, // Reducido de 5000 para mayor velocidad
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