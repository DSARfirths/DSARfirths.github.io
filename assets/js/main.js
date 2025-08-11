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
      loadHTML('nav-component.html', 'main-nav-placeholder'),
      loadHTML('footer-component.html', 'main-footer-placeholder')
    ]);
    
    // Una vez que el nav se ha cargado, inicializamos su JS
    initializeNav();
  };

  // Inicia la carga de componentes
  loadComponents();

  // ===== HELPERS PARA RENDERIZADO DINÁMICO =====

  /**
   * Convierte un string de etiqueta a un nombre de clase CSS válido.
   * Ej: "Análisis de Datos" -> "tag-analisis-de-datos"
   * @param {string} tag - El string de la etiqueta.
   * @returns {string} Un nombre de clase CSS.
   */
  const tagToClassName = (tag) => {
    const sanitized = tag.toLowerCase()
      .normalize("NFD").replace(/[\u0300-\u036f]/g, "") // Quita acentos
      .replace(/\s+/g, '-') // Reemplaza espacios con guiones
      .replace(/[^a-z0-9-]/g, ''); // Quita caracteres no válidos
    return `tag-${sanitized}`;
  };

  /**
   * Genera el HTML para una lista de etiquetas de proyecto.
   * @param {string[]} tags - Un array de strings de etiquetas.
   * @returns {string} El HTML de las etiquetas.
   */
  const createTagsHTML = (tags) => {
    if (!tags || tags.length === 0) return '';
    return tags.map(tag => `<span class="tag ${tagToClassName(tag)}">${tag}</span>`).join('');
  };

  // ===== LÓGICA PARA RENDERIZAR PROYECTOS DINÁMICAMENTE =====

  /**
   * Crea el HTML para una única tarjeta de proyecto a partir de un objeto de proyecto.
   * @param {object} project - El objeto del proyecto desde projects-data.js.
   * @returns {string} - El string HTML de la tarjeta del proyecto.
   */
  const createProjectCard = (project) => {
    // Determina la URL de la página de detalle.
    const detailUrl = project.category === 'laboratorio' 
      ? `laboratorio-item.html?id=${project.id}`
      : `proyecto.html?id=${project.id}`;

    return `
      <a href="${detailUrl}" class="project-card" data-tags="${project.tags.join(',')}" aria-label="Ver detalles del proyecto ${project.title}">
        <img src="${project.cardImage}" class="card-image" alt="Imagen del proyecto ${project.title}" loading="lazy">
        <div class="card-content">
          <h5 class="card-title">${project.title}</h5>
          <p class="card-description">${project.subtitle}</p>
          <div class="tags">
            ${createTagsHTML(project.tags)}
          </div>
        </div>
      </a>
    `;
  };

  /**
   * Renderiza una lista de proyectos en un contenedor específico.
   * @param {HTMLElement} container - El elemento del DOM donde se insertarán las tarjetas.
   * @param {Array<object>} projects - La lista de proyectos a renderizar.
   */
  const renderProjects = (container, projects) => {
    if (!container) return;

    if (projects.length === 0) {
      container.innerHTML = '<p>No se encontraron proyectos que coincidan con la búsqueda.</p>';
      return;
    }

    // Genera el HTML para todas las tarjetas y lo inserta de una sola vez
    container.innerHTML = projects.map(createProjectCard).join('');
  };

  /**
   * Crea el HTML para un item de la galería con diseño alternado.
   * @param {object} item - El objeto de la galería {image, caption}.
   * @param {number} index - El índice del item en el array.
   * @returns {string} - El string HTML del item de la galería.
   */
  const createGalleryItem = (item, index) => {
    const isReversed = index % 2 !== 0; // Alterna para cada item impar
    return `
      <div class="gallery-item ${isReversed ? 'is-reversed' : ''}">
        <div class="gallery-image-container">
          <img src="${item.image}" alt="Imagen de la galería del proyecto" loading="lazy">
        </div>
        <div class="gallery-caption-container">
          <p>${item.caption}</p>
        </div>
      </div>
    `;
  };

  /**
   * Renderiza el contenido de una página de detalle de proyecto.
   */
  const renderProjectDetail = () => {
    const params = new URLSearchParams(window.location.search);
    const projectId = params.get('id');
    const container = document.getElementById('project-content-container');

    if (!projectId || !container) return;

    const project = projectsData.find(p => p.id === projectId);

    if (!project) {
      container.innerHTML = '<p class="text-center">Proyecto no encontrado. Por favor, vuelve a la lista de proyectos.</p>';
      return;
    }

    // Rellenar el título de la página y la cabecera
    document.getElementById('page-title').textContent = `${project.title} – Diego Abad Ramos`;
    document.getElementById('project-title-header').textContent = project.title;
    document.getElementById('project-subtitle-header').textContent = project.subtitle;

    const processHTML = project.detailPage.process.map(item => `<li>${item}</li>`).join('');
    const galleryHTML = project.detailPage.gallery.map(createGalleryItem).join('');

    // Construir el contenido principal del proyecto
    const projectContentHTML = `
      <div class="project-detail-grid">
        <div class="project-main-content">
          <img src="${project.detailPage.mainImage}" alt="Imagen principal del proyecto ${project.title}" class="project-main-image">
          
          <h2>El Problema</h2>
          <p>${project.detailPage.problem}</p>
          
          <h2>Mi Proceso</h2>
          <ol class="process-list">${processHTML}</ol>
          
          <h2>Resultados Clave</h2>
          <p>${project.detailPage.results}</p>
        </div>
        <aside class="project-sidebar">
          <div class="sidebar-widget">
            <h4>Tecnologías Utilizadas</h4>
            <div class="tags">${createTagsHTML(project.tags)}</div>
          </div>
        </aside>
      </div>
      
      ${galleryHTML ? `
        <section class="project-gallery">
          <h2 class="text-center">Galería del Proyecto</h2>
          ${galleryHTML}
        </section>
      ` : ''}
    `;

    container.innerHTML = projectContentHTML;

    // Cargar Giscus si estamos en la página de laboratorio
    if (document.body.id === 'page-lab-detail') {
      const giscusContainer = document.getElementById('giscus-container');
      if (giscusContainer) {
        const script = document.createElement('script');
        script.src = "https://giscus.app/client.js";
        script.setAttribute("data-repo", "DSARfirths/DSARfirths.github.io");
        script.setAttribute("data-repo-id", "R_kgDOO4XWrw");
        script.setAttribute("data-category", "General");
        script.setAttribute("data-category-id", "DIC_kwDOO4XWr84CtdH6");
        script.setAttribute("data-mapping", "title");
        script.setAttribute("data-strict", "0");
        script.setAttribute("data-reactions-enabled", "1");
        script.setAttribute("data-emit-metadata", "0");
        script.setAttribute("data-input-position", "top");
        script.setAttribute("data-theme", "preferred_color_scheme");
        script.setAttribute("data-lang", "es");
        script.setAttribute("crossorigin", "anonymous");
        script.async = true;
        giscusContainer.appendChild(script);
      }
    }
  };


  // ===== Formulario sin recarga (Sin cambios) =====
  const form = document.getElementById("contact-form");
  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const budgetInput = document.getElementById('budget');
      const budgetValue = parseFloat(budgetInput.value);

      if (budgetValue < 50) {
        alert('Por favor, ingresa un presupuesto de al menos S/ 50.');
        budgetInput.focus();
        budgetInput.style.borderColor = 'red';
        return; 
      }
      budgetInput.style.borderColor = '';
      
      const data = new FormData(form);
      try {
        const response = await fetch(form.action, { 
            method: form.method, 
            body: data,
            headers: { 'Accept': 'application/json' }
        });
        if (response.ok) {
            const title = form.parentElement.querySelector('h2');
            if (title) {
                title.style.display = 'none';
            }
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

  // ===== LÓGICA PARA RENDERIZAR Y FILTRAR PROYECTOS =====
  const searchInput = document.getElementById('projectSearch');
  const projectsGrid = document.getElementById('projectsGrid');
  const announcer = document.getElementById('searchResultsAnnouncer');
  const homeProjectsContainer = document.getElementById('home-projects-container');

  // Asegurarnos de que projectsData está disponible (debe cargarse antes que main.js)
  if (typeof projectsData !== 'undefined') {
    // Renderizar proyectos en la página de Proyectos
    if (document.body.id === 'page-proyectos' && projectsGrid) {
      const allProjects = projectsData.filter(p => p.category === 'proyecto');
      renderProjects(projectsGrid, allProjects);

      // Activar el buscador solo en esta página
      if (searchInput && announcer) {
        searchInput.addEventListener('input', () => {
          const searchTerm = searchInput.value.toLowerCase().trim();
          const filteredProjects = allProjects.filter(p => 
            p.title.toLowerCase().includes(searchTerm) || 
            p.tags.some(tag => tag.toLowerCase().includes(searchTerm))
          );
          renderProjects(projectsGrid, filteredProjects);
          
          const resultText = filteredProjects.length === 1 ? 'Se encontró 1 proyecto.' : `Se encontraron ${filteredProjects.length} proyectos.`;
          announcer.textContent = resultText;
        });
      }
    }

    // Renderizar proyectos en la página de Laboratorio
    if (document.body.id === 'page-laboratorio' && projectsGrid) {
      const labProjects = projectsData.filter(p => p.category === 'laboratorio');
      renderProjects(projectsGrid, labProjects);
    }

    // Renderizar proyectos destacados en la página de Inicio
    if (homeProjectsContainer) {
      const featuredProjects = projectsData.filter(p => p.isFeatured);
      renderProjects(homeProjectsContainer, featuredProjects);
    }

    // Renderizar la página de detalle de un proyecto
    if (document.body.id === 'page-project-detail' || document.body.id === 'page-lab-detail') {
      renderProjectDetail();
    }

    // Renderizar proyectos relacionados en las páginas de experiencia
    const relatedProjectsSection = document.querySelector('.related-projects-section');
    if (relatedProjectsSection) {
      const container = relatedProjectsSection.querySelector('.projects-page-grid');
      const ids = relatedProjectsSection.dataset.relatedIds?.split(',').map(id => id.trim());
      if (container && ids && ids.length > 0) {
        const relatedProjects = projectsData.filter(p => ids.includes(p.id));
        renderProjects(container, relatedProjects);
      }
    }
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