document.addEventListener("DOMContentLoaded", () => {
    
    /**
     * Carga componentes HTML reutilizables (nav, footer, modal).
     */
    const loadComponents = async () => {
        const components = [
            { id: 'main-nav-placeholder', url: 'nav-component.html' },
            { id: 'main-footer-placeholder', url: 'footer-component.html' },
            { id: 'modal-placeholder', url: 'modal-contacto.html' }
        ];
        await Promise.all(components.map(async ({ id, url }) => {
            const element = document.getElementById(id);
            if (element) {
                try {
                    const response = await fetch(url);
                    if (!response.ok) throw new Error(`Error al cargar ${url}`);
                    element.innerHTML = await response.text();
                } catch (error) { console.error(error.message); }
            }
        }));
    };

    /**
     * Inicializa la funcionalidad del menú móvil (hamburguesa).
     */
    const initMobileMenu = () => {
        const menuButton = document.getElementById('mobile-menu-button');
        const mobileMenu = document.getElementById('mobile-menu');
        if (menuButton && mobileMenu) {
            menuButton.addEventListener('click', () => {
                mobileMenu.classList.toggle('hidden');
            });
        }
    };

    /**
     * Inicializa la lógica global para el modal de contacto.
     */
    const initGlobalContactModal = () => {
        const contactTriggers = document.querySelectorAll('.js-contact-trigger');
        const modal = document.getElementById('contact-modal');
        const showFormButton = document.getElementById('show-form-button');
        const closeButton = document.getElementById('close-modal-button');

        if (!modal || contactTriggers.length === 0) return;

        const openModal = () => {
            modal.classList.remove('opacity-0', 'pointer-events-none');
            document.body.classList.add('overflow-hidden'); // Evita el scroll del fondo
        };

        const closeModal = () => {
            modal.classList.add('opacity-0', 'pointer-events-none');
            document.body.classList.remove('overflow-hidden');
        };

        // Asignar evento a todos los botones que abren el modal
        contactTriggers.forEach(trigger => trigger.addEventListener('click', openModal));

        // Eventos para cerrar el modal
        if (closeButton) {
            closeButton.addEventListener('click', closeModal);
        }
        modal.addEventListener('click', (event) => {
            if (event.target === modal) closeModal();
        });
        window.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && !modal.classList.contains('opacity-0')) {
                closeModal();
            }
        });
        
        // El botón que lleva al formulario ahora es un enlace normal
        if (showFormButton) {
            showFormButton.addEventListener('click', () => {
                window.location.href = 'contacto.html';
            });
        }
    };

    /**
     * Inicializa el carrusel de testimonios con Swiper.js.
     */
    const initTestimonialSlider = () => {
        if (typeof Swiper === 'undefined') {
            console.error('Swiper.js no está cargado.');
            return;
        }

        const testimonialSlider = document.querySelector('.testimonial-slider');
        if (testimonialSlider) {
            new Swiper(testimonialSlider, {
                // Muestra un testimonio a la vez en móviles
                slidesPerView: 1,
                spaceBetween: 30,
                // Permite que el carrusel se repita en bucle
                loop: true,
                // Autoplay de 5 segundos
                autoplay: {
                    delay: 5000,
                    disableOnInteraction: false, // El autoplay no se detiene después de una interacción
                    pauseOnMouseEnter: true,      // Se pausa al poner el mouse encima (y al tocar en móvil)
                },
                // Paginación con puntos clickables
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true,
                },
                // Responsivo: Muestra 2 testimonios en pantallas más grandes
                breakpoints: {
                    768: { // a partir de 768px de ancho
                        slidesPerView: 2,
                        spaceBetween: 40
                    }
                }
            });
        }
    };
    
    // ----- (Aquí van el resto de tus funciones como createProjectCard, etc.) -----
    const createProjectCard = (project) => {
        const tagsHTML = project.tags.map(tag => `<span class="inline-block bg-gray-700 text-xs font-medium px-3 py-1 rounded-full mr-2 mb-2">${tag}</span>`).join('');
        return `<a href="proyecto.html?id=${project.id}" class="block bg-light-bg rounded-xl overflow-hidden group border border-gray-700/50 hover:border-primary transition-all duration-300"><div class="overflow-hidden"><img src="${project.cardImage}" alt="Imagen de ${project.title}" class="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300"></div><div class="p-6"><h3 class="text-xl font-bold text-white mb-2">${project.title}</h3><p class="text-light-text mb-4 h-16">${project.subtitle}</p><div class="tags-container">${tagsHTML}</div></div></a>`;
    };
    const renderProjects = (container, projects) => {
        if (!container) return;
        const noResultsMessage = document.getElementById('no-results-message');
        if (projects.length === 0) {
            container.innerHTML = '';
            if (noResultsMessage) noResultsMessage.classList.remove('hidden');
        } else {
            container.innerHTML = projects.map(createProjectCard).join('');
            if (noResultsMessage) noResultsMessage.classList.add('hidden');
        }
    };
    const renderFeaturedProjects = () => {
        const container = document.getElementById('home-projects-container');
        if (container && typeof projectsData !== 'undefined') {
            const featured = projectsData.filter(p => p.isFeatured && p.category !== 'laboratorio');
            renderProjects(container, featured);
        }
    };
    const initProjectsPage = () => {
        const container = document.getElementById('projects-grid-container');
        const searchInput = document.getElementById('project-search-input');
        if (!container || !searchInput || typeof projectsData === 'undefined') return;
        const allProjects = projectsData.filter(p => p.category === 'proyecto');
        renderProjects(container, allProjects);
        searchInput.addEventListener('input', () => {
            const searchTerm = searchInput.value.toLowerCase().trim();
            const filteredProjects = allProjects.filter(p => p.title.toLowerCase().includes(searchTerm) || p.tags.some(tag => tag.toLowerCase().includes(searchTerm)));
            renderProjects(container, filteredProjects);
        });
    };
    const initProjectDetailPage = () => {
        const hero = document.getElementById('project-hero');
        const container = document.getElementById('project-detail-container');
        if (!hero || !container || typeof projectsData === 'undefined') return;
        const params = new URLSearchParams(window.location.search);
        const projectId = params.get('id');
        const project = projectsData.find(p => p.id === projectId);
        if (!project) {
            container.innerHTML = `<p class="text-center text-xl">Proyecto no encontrado. <a href="proyectos.html" class="text-primary hover:underline">Volver a proyectos</a>.</p>`;
            return;
        }
        document.title = `${project.title} – Diego Abad Ramos`;
        hero.innerHTML = `<h1 class="text-4xl md:text-6xl font-black text-white">${project.title}</h1><p class="mt-4 text-lg md:text-xl text-light-text max-w-3xl mx-auto">${project.subtitle}</p>`;
        const tagsHTML = project.tags.map(tag => `<span class="inline-block bg-gray-700 text-xs font-medium px-3 py-1 rounded-full">${tag}</span>`).join(' ');
        const galleryHTML = project.detailPage.gallery.map(item => `<div class="mt-8"><img src="${item.image}" alt="Imagen de galería para ${project.title}" class="rounded-lg shadow-lg w-full"><p class="text-center text-sm text-gray-400 mt-2 italic">${item.caption}</p></div>`).join('');
        container.innerHTML = `<div class="grid md:grid-cols-3 gap-8 md:gap-12"><div class="md:col-span-2 space-y-8 project-content"><div><h2 class="text-2xl font-bold text-white mb-4">El Problema</h2><p>${project.detailPage.problem}</p></div><div><h2 class="text-2xl font-bold text-white mb-4">Mi Proceso</h2><ul class="list-decimal list-inside space-y-4">${project.detailPage.process.map(step => `<li>${step}</li>`).join('')}</ul></div><div><h2 class="text-2xl font-bold text-white mb-4">Resultados Clave</h2><p>${project.detailPage.results}</p></div></div><aside class="md:col-span-1"><div class="bg-light-bg p-6 rounded-xl border border-gray-700/50 sticky top-28"><h3 class="text-xl font-bold text-white mb-4">Tecnologías</h3><div class="flex flex-wrap gap-2">${tagsHTML}</div></div></aside></div>${galleryHTML ? `<div class="mt-16 pt-12 border-t border-gray-700/50"><h2 class="text-3xl font-bold text-white text-center mb-8">Galería del Proyecto</h2><div class="space-y-12">${galleryHTML}</div></div>` : ''}<div class="text-center mt-16"><a href="proyectos.html" class="text-primary font-bold hover:underline">← Volver a todos los proyectos</a></div>`;
    };

    /**
     * Función principal que organiza y ejecuta todo el script.
     */
    const init = async () => {
        // 1. Carga todos los componentes primero
        await loadComponents();
        
        // 2. Una vez que todo el HTML está en la página, activa las funcionalidades
        initMobileMenu();
        initGlobalContactModal();
        initTestimonialSlider();

        // 3. Activa las funciones específicas de cada página
        renderFeaturedProjects();
        initProjectsPage();
        initProjectDetailPage();
    };

    init();
});