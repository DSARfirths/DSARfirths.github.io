const projectsData = [
  {
    id: 'energia-solar',
    title: 'Proyecto de Energía Solar',
    subtitle: 'Investigación y diseño de un sistema fotovoltaico para autoconsumo.',
    cardImage: 'assets/img/projects/energia-solar-card.jpg', // Reemplazar con tu imagen
    tags: ['investigación', 'diseño', 'simulación', 'python'],
    category: 'proyecto', // 'proyecto' o 'laboratorio'
    isFeatured: true, // Aparecerá en la página de inicio
    
    detailPage: {
      mainImage: 'assets/img/projects/energia-solar-main.jpg', // Reemplazar con tu imagen
      problem: 'Una residencia unifamiliar enfrentaba altos costos en su factura eléctrica y buscaba una alternativa sostenible para reducir su dependencia de la red convencional y disminuir su huella de carbono.',
      process: [
        '<strong>Análisis Energético:</strong> Se realizó un estudio detallado del consumo histórico de la vivienda para determinar la demanda energética diaria y estacional.',
        '<strong>Selección de Tecnología:</strong> Se investigaron y compararon diferentes tipos de paneles fotovoltaicos, inversores y sistemas de almacenamiento (baterías) para encontrar la combinación óptima en costo-beneficio.',
        '<strong>Simulación y Diseño:</strong> Utilizando software de simulación y diseño CAD, se modeló la instalación sobre el tejado de la vivienda, optimizando la inclinación y orientación de los paneles para maximizar la captación solar anual.',
        '<strong>Análisis de Viabilidad:</strong> Se elaboró un informe final con el análisis de retorno de la inversión (ROI), el período de amortización y la proyección de ahorro a largo plazo.'
      ],
      results: 'El diseño final del sistema fotovoltaico proyecta una <strong>reducción del 80% en la factura eléctrica anual</strong> y una autonomía de hasta 16 horas durante cortes de energía, cumpliendo con los objetivos de sostenibilidad y ahorro del cliente.',
      gallery: [
        {
          image: 'assets/img/projects/solar-gallery-1.jpg', // Reemplazar con tu imagen
          caption: 'Modelo 3D en SolidWorks de la disposición de los paneles sobre el tejado para optimizar la captación solar y analizar sombras.'
        },
        {
          image: 'assets/img/projects/solar-gallery-2.jpg', // Reemplazar con tu imagen
          caption: 'Gráfico generado con Python (Matplotlib) que muestra la curva de producción solar estimada frente a la curva de demanda energética de la vivienda.'
        },
        {
          image: 'assets/img/projects/solar-gallery-3.jpg', // Reemplazar con tu imagen
          caption: 'Plano técnico final para la instalación, incluyendo el diagrama de conexión eléctrica del sistema.'
        }
      ]
    }
  },
  {
    id: 'automatizador-n8n',
    title: 'Automatizador de Tareas con n8n',
    subtitle: 'Explorando la creación de flujos de trabajo automatizados para conectar APIs y servicios sin código.',
    cardImage: 'assets/img/projects/n8n-card.jpg', // Reemplazar con tu imagen
    tags: ['n8n', 'apis', 'docker', 'mysql', 'automatización'],
    category: 'laboratorio',
    isFeatured: false,
    
    detailPage: {
      mainImage: 'assets/img/projects/n8n-main.jpg', // Reemplazar con tu imagen
      problem: 'El objetivo de este proyecto es explorar la plataforma de automatización de código bajo (low-code) n8n para crear flujos de trabajo que conecten diferentes servicios y APIs. La idea es automatizar tareas repetitivas como la sincronización de datos entre hojas de cálculo y bases de datos, el envío de notificaciones personalizadas o la generación de informes automáticos.',
      challenge: 'El principal desafío es entender las limitaciones y capacidades de n8n. Aunque es una herramienta "low-code", requiere una lógica de programación sólida para construir flujos complejos y manejar errores de manera efectiva. Otro reto es la autenticación con diferentes APIs (OAuth, API Keys) y la manipulación de los datos en formato JSON entre los distintos nodos del flujo.',
      process: [
        '<strong>Instalación y Configuración:</strong> Se ha desplegado una instancia de n8n en un servidor local usando Docker.',
        '<strong>Primer Flujo Funcional:</strong> Se creó un flujo que lee una nueva fila en una Hoja de Google, procesa los datos y los inserta en una tabla de MySQL.',
        '<strong>Integración con Telegram:</strong> Se ha configurado un bot de Telegram para enviar notificaciones de éxito o error al finalizar la ejecución del flujo.',
        '<strong>Investigación Actual:</strong> Explorando cómo manejar flujos con grandes volúmenes de datos y cómo implementar bucles y condicionales de manera eficiente.'
      ],
      results: 'Este proyecto está en curso. El objetivo final es crear una colección de flujos de trabajo reutilizables y documentar las mejores prácticas para la automatización de procesos en pequeñas y medianas empresas.',
      gallery: [] // La galería puede estar vacía
    }
  },
  {
    id: 'dashboard-analisis',
    title: 'Dashboard de Análisis de Ventas',
    subtitle: 'Creación de un panel de control interactivo para visualizar KPIs de negocio y tendencias de mercado.',
    cardImage: 'assets/img/projects/dashboard-card.jpg', // Reemplazar con tu imagen
    tags: ['análisis de datos', 'python', 'power bi'],
    category: 'proyecto',
    isFeatured: false,
    
    detailPage: {
      mainImage: 'assets/img/projects/dashboard-main.jpg', // Reemplazar con tu imagen
      problem: 'Una empresa de retail necesitaba una forma clara y rápida de visualizar sus indicadores de rendimiento (KPIs) de ventas, que se encontraban dispersos en múltiples archivos de Excel.',
      process: [
        '<strong>Limpieza y Transformación:</strong> Se desarrollaron scripts en Python con Pandas para consolidar, limpiar y transformar los datos de ventas de múltiples fuentes.',
        '<strong>Modelado de Datos:</strong> Se diseñó un modelo de datos optimizado en Power BI para permitir un análisis eficiente y relaciones claras entre las tablas.',
        '<strong>Diseño del Dashboard:</strong> Se crearon visualizaciones interactivas (gráficos de barras, mapas, tarjetas de KPI) para presentar la información de forma intuitiva.',
        '<strong>Publicación y Capacitación:</strong> El dashboard fue publicado en el servicio de Power BI y se capacitó al equipo directivo para su uso y correcta interpretación.'
      ],
      results: 'La empresa ahora cuenta con una visión 360° de su rendimiento en tiempo real, permitiendo identificar tendencias de productos y optimizar estrategias de marketing con una reducción del 50% en el tiempo dedicado a la generación de informes manuales.',
      gallery: [
        {
          image: 'assets/img/projects/dashboard-gallery-1.jpg', // Reemplazar con tu imagen
          caption: 'Vista general del dashboard principal, mostrando los KPIs más importantes como ventas totales, margen de beneficio y número de transacciones.'
        },
        {
          image: 'assets/img/projects/dashboard-gallery-2.jpg', // Reemplazar con tu imagen
          caption: 'Detalle del análisis geográfico, que permite filtrar las ventas por región y ciudad para identificar los mercados más potentes.'
        }
      ]
    }
  }
];