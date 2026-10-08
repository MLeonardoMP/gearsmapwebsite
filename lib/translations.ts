export type Language = "ES" | "EN" | "FR"
export type Locale = "es" | "en" | "fr"

export const translations = {
  ES: {
    common: {
      learnMore: "Saber más",
      language: "Idioma",
      backToTop: "Volver arriba",
      current: "actual",
      theme: {
        label: "Cambiar tema",
        light: "Claro",
        dark: "Oscuro",
        system: "Sistema",
        toLight: "Cambiar a tema claro",
        toDark: "Cambiar a tema oscuro",
      },
    },
    nav: {
      home: "Inicio",
      about: "Sobre nosotros",
      portfolio: "Portafolio",
      climate: "MRV / M&E",
      contact: "Contacto",
      openMenu: "Abrir menú",
      closeMenu: "Cerrar menú",
      cta: "Conversemos",
      projects: "Proyectos",
    },
    seo: {
      title: "Software geoespacial y geovisores en Colombia",
      description: "Desarrollamos software geoespacial, geovisores y tableros a la medida en Colombia, además de sistemas MRV y M&E climáticos para el sector minero-energético.",
      keywords: ["GearsMap", "software geoespacial", "sistemas de información geográfica", "SIG", "geovisores", "inteligencia artificial", "visualización de datos", "dashboards", "Colombia", "MRV", "monitoreo y evaluación"],
    },
    hero: {
      title: "GearsMap",
      kicker: "Software geoespacial, geovisores e IA en Colombia",
      headline: "Del territorio al dato. Del dato a la decisión.",
      lede: "GearsMap S.A.S. es una empresa de software geoespacial con sede en Bogotá. Diseñamos geovisores, tableros e inteligencia artificial a la medida, y acompañamos la implementación de sistemas climáticos MRV y M&E para el sector minero-energético.",
      cta_primary: "Conversemos sobre tu proyecto",
      cta_secondary: "Solicitar una demo",
      product: {
        title: "Visor PPR ACGGP",
        status: "En producción",
        cta: "Ver el caso",
        alt: "Captura del Visor PPR ACGGP: mapa de Colombia con las ubicaciones del programa y un panel de indicadores",
      },
    },
    proofBar: {
      title: "GearsMap en breve",
      live: "En producción · Visor PPR ACGGP",
      climate: "Implementación operativa · MRV y M&E con MinMinas y apoyo de KfW",
      place: "Bogotá, Colombia",
      founded: "Fundada en 2025",
    },
    sections: {
      capabilities: "Capacidades",
      process: "Proceso",
      about: "Nosotros",
      contact: "Contacto",
    },
    about: {
      title: "Sobre GearsMap",
      intro: "Innovamos en nuevas formas de utilizar y visualizar datos para agregar valor a procesos y decisiones.",
      imageAlt: "Equipo de GearsMap trabajando con visualización de datos",
      facts: {
        title: "Datos de la empresa",
        legalName: "Razón social",
        taxId: "NIT",
        founded: "Fundación",
        hq: "Sede",
        languages: "Idiomas",
        languagesValue: "Español, inglés y francés",
        contact: "Contacto",
      },
      foundation: {
        title: "Fundación",
        text: "Fundada en 2025, GearsMap reúne a profesionales experimentados del sector tecnológico, impulsados por la pasión de contribuir a la Cuarta Revolución Industrial. Innovamos en nuevas formas de utilizar y visualizar datos, añadiendo valor a los procesos empresariales.",
      },
      products: {
        title: "Productos y servicios",
        text: "Nos especializamos en el desarrollo de soluciones de software basadas en Sistemas de Información Geográfica (SIG) y en la gestión y análisis de datos geoespaciales. Nuestras ofertas incluyen aplicaciones para la gestión y visualización de información, optimización y automatización de proyectos.",
      },
    },
    mission: {
      mission: {
        title: "Misión",
        text: "Nuestro principal objetivo es asistir a entidades gubernamentales, empresas y organizaciones en su transformación digital hacia un futuro más próspero. Buscamos optimizar cada recurso y proceso mediante el uso innovador de la información.",
      },
      vision: {
        title: "Visión",
        text: "Aspiramos a llevar nuestras innovaciones a todos los rincones del mundo, colaborando con entidades e individuos para generar ideas y desarrollos revolucionarios. Buscamos contribuir a la transformación del desarrollo de la humanidad.",
      },
    },
    portfolio: {
      header: "Servicios geoespaciales y de datos",
      subheader: "Geovisores, sistemas de información geográfica, tableros, inteligencia artificial y automatización para convertir datos territoriales en decisiones.",
      detailsLabel: "Detalles",
      geoviewersLink: "Ver el servicio de geovisores",
      services: {
        ai: {
          title: "Inteligencia artificial y Machine Learning",
          desc: "Implementamos soluciones de inteligencia artificial y machine learning para ayudarle a extraer información valiosa de sus datos y mejorar la toma de decisiones.",
          details: "Nuestras soluciones de IA incluyen análisis predictivo, procesamiento de lenguaje natural (NLP) y visión por computadora. Ayudamos a automatizar la clasificación de datos, detectar anomalías en tiempo real y generar insights accionables que impulsan el crecimiento de su negocio.",
        },
        geoviewers: {
          title: "Geovisores",
          desc: "Desarrollamos geovisores personalizados para visualizar y analizar información geoespacial de manera interactiva y dinámica.",
          details: "Creamos visores de mapas interactivos utilizando tecnologías como Mapbox, Leaflet y OpenLayers. Integramos capas de datos complejos, herramientas de dibujo, análisis espacial en el navegador y filtrado avanzado para que pueda explorar su información geográfica sin límites.",
        },
        visualization: {
          title: "Visualización 2D y 3D",
          desc: "Potencie el análisis y comprensión de sus datos mediante herramientas avanzadas de visualización 2D y 3D, diseñadas a la medida.",
          details: "Transformamos datos abstractos en experiencias visuales inmersivas. Desde gráficos interactivos hasta modelos 3D de ciudades y terrenos, nuestras herramientas permiten una comprensión profunda de patrones y tendencias que serían invisibles en tablas tradicionales.",
        },
        dashboards: {
          title: "Dashboards y estadísticas",
          desc: "Esta herramienta le permitirá presentar y analizar sus datos de manera clara y visual, facilitando una toma de decisiones más informada.",
          details: "Diseñamos tableros de control ejecutivos y operativos que centralizan sus KPIs más importantes. Con actualizaciones en tiempo real, filtros dinámicos y exportación de reportes, tendrá el control total de sus métricas de rendimiento en una sola pantalla.",
        },
        automation: {
          title: "Automatización de Procesos",
          desc: "A través de la automatización de procesos, le ayudamos a mejorar la eficiencia operativa y reducir el tiempo dedicado a tareas repetitivas.",
          details: "Identificamos cuellos de botella y tareas manuales propensas a errores para reemplazarlas con flujos de trabajo automatizados. Desde la ingesta de datos hasta la generación de notificaciones, optimizamos sus operaciones para que su equipo se enfoque en tareas de alto valor.",
        },
        monitoring: {
          title: "Monitoreo y Mantenimiento",
          desc: "Proveemos servicios de monitoreo continuo y mantenimiento de productos, asegurando su funcionamiento óptimo a lo largo del tiempo.",
          details: "Ofrecemos soporte técnico proactivo, actualizaciones de seguridad y monitoreo de rendimiento 24/7. Garantizamos que sus plataformas estén siempre disponibles, seguras y funcionando con la máxima eficiencia, adaptándonos a los cambios tecnológicos.",
        },
      },
    },
    contact: {
      header: "Contáctanos",
      subheader: "Completa el formulario o escríbenos directamente para ponerte en contacto con nosotros.",
      promise: "Te respondemos con contexto, preguntas concretas y una ruta posible.",
      sending: "Enviando...",
      channels: {
        linkedin: "GearsMap en LinkedIn",
      },
      next: {
        title: "Qué pasa después",
      },
      toast: {
        success: "Mensaje enviado",
        successDescription: "Te contactaremos pronto.",
        error: "Error",
        errorDescription: "Algo salió mal. Inténtalo de nuevo.",
        validationError: "Revisa los campos del formulario.",
      },
      intent: {
        label: "¿Cómo podemos ayudarte?",
        project: "Conversemos sobre un proyecto",
        projectDescription: "Cuéntanos qué quieres resolver y qué datos tienes disponibles.",
        demo: "Solicitar una demo",
        demoDescription: "Conoce una solución y revisemos si encaja con tu operación.",
      },
      form: {
        required: "Campos obligatorios",
        name: "Tu nombre *",
        namePlaceholder: "Ingresa tu nombre",
        phone: "Tu teléfono",
        phonePlaceholder: "Ingresa tu teléfono",
        email: "Tu correo electrónico *",
        emailPlaceholder: "Ingresa tu correo electrónico",
        message: "Tu mensaje *",
        messagePlaceholder: "Cuéntanos qué quieres visualizar, automatizar o mejorar",
        submit: "Enviar Mensaje",
      },
    },
    techStack: {
      title: "Stack tecnológico",
      subtitle: "Herramientas modernas para soluciones robustas",
      groups: {
        geo: "Geoespacial",
        data: "Datos e IA",
        web: "Web",
        cloud: "Nube",
      },
    },
    gallery: {
      title: "Proyectos Destacados",
      subtitle: "Soluciones construidas para convertir datos complejos en operaciones más claras.",
      liveLabel: "Ver solución",
      caseLabel: "Ver el trabajo",
      illustrativeLabel: "Visualización ilustrativa del proyecto",
      ctaTitle: "¿Tienes un territorio complejo por entender?",
      ctaDescription: "Cuéntanos dónde están los datos difíciles. Diseñamos la forma de volverlos utilizables.",
      ctaLabel: "Conversemos",
      project1: { title: "Visor PPR ACGGP", desc: "Un geovisor para explorar información regional con capas, filtros y contexto territorial." },
      project2: { title: "MRV · Monitoreo, Reporte y Verificación", desc: "Implementación operativa para organizar y visualizar indicadores y emisiones del sector minero-energético, con MinMinas y apoyo de KfW." },
      project3: { title: "M&E · Monitoreo y Evaluación", desc: "Implementación operativa para leer amenaza, vulnerabilidad y riesgo climático, con MinMinas y apoyo de KfW." },
      project4: { title: "Análisis agrícola", desc: "Monitoreo de cultivos satelital para detectar patrones y apoyar decisiones de campo." },
      project5: { title: "Gestión de flotas", desc: "Concepto de operación en tiempo real para optimizar rutas logísticas y recursos." },
    },
    projects: {
      status: {
        inDevelopment: "En Desarrollo",
        live: "En producción",
        operational: "Implementación operativa",
      },
    },
    climateTeaser: {
      eyebrow: "Trabajo complementario",
      title: "Información climática para el sector minero-energético",
      text: "Además de geovisores y plataformas de datos, acompañamos la implementación operativa de los módulos de MRV y de monitoreo y evaluación del sistema de información climática, con MinMinas y apoyo de KfW.",
      cta: "Ver el trabajo de MRV y M&E",
      mrv: "Monitoreo, reporte y verificación de emisiones",
      me: "Monitoreo y evaluación del riesgo climático",
    },
    process: {
      title: "Cómo trabajamos",
      subtitle: "Un ciclo claro para pasar de una pregunta difícil a una herramienta que el equipo puede usar.",
      steps: {
        scope: { number: "01", title: "Entender el territorio", text: "Aterrizamos la pregunta, las fuentes y las decisiones que necesitan mejor información." },
        model: { number: "02", title: "Dar forma al sistema", text: "Diseñamos el modelo de datos, la experiencia y los flujos que conectan a las personas." },
        deliver: { number: "03", title: "Ponerlo en movimiento", text: "Entregamos una plataforma útil, medible y preparada para evolucionar con la operación." },
      },
    },
    team: {
      title: "Nuestro Equipo",
      subtitle: "Fundadores expertos apasionados por la innovación y los datos",
      role1: "CEO & Fundador",
      role2: "Lead Developer",
      role3: "Data Scientist",
      roles: {
        ceo: "CEO - Estrategia y Visión",
        cpo: "CPO - Producto e Innovación",
        cdo: "CDO - Ciencia de Datos e IA",
        cco: "CCO - Negocios y Crecimiento",
      },
    },
    footer: {
      description: "Transformamos datos complejos en decisiones estratégicas mediante innovación, tecnología y soporte experto.",
      quickLinks: "Enlaces Rápidos",
      services: "Servicios",
      contact: "Contacto",
      rights: "Todos los derechos reservados.",
      privacy: "Política de Privacidad",
      terms: "Términos de Uso",
      linkedinLabel: "LinkedIn de GearsMap",
      languages: "Idiomas",
    },
  },
  EN: {
    common: {
      learnMore: "Learn more",
      language: "Language",
      backToTop: "Back to top",
      current: "current",
      theme: {
        label: "Change theme",
        light: "Light",
        dark: "Dark",
        system: "System",
        toLight: "Switch to light theme",
        toDark: "Switch to dark theme",
      },
    },
    nav: {
      home: "Home",
      about: "About Us",
      portfolio: "Portfolio",
      climate: "MRV / M&E",
      contact: "Contact",
      openMenu: "Open menu",
      closeMenu: "Close menu",
      cta: "Let's talk",
      projects: "Projects",
    },
    seo: {
      title: "Geospatial software & web GIS viewers in Colombia",
      description: "GearsMap builds custom geospatial software, web GIS viewers, dashboards and AI in Colombia, plus climate MRV and M&E systems for the mining and energy sector.",
      keywords: ["GearsMap", "geospatial software", "GIS", "geoviewers", "artificial intelligence", "data visualization", "dashboards", "Colombia", "MRV", "monitoring and evaluation"],
    },
    hero: {
      title: "GearsMap",
      kicker: "Geospatial software, web GIS and AI in Colombia",
      headline: "From territory to data. From data to decisions.",
      lede: "GearsMap S.A.S. is a geospatial software company based in Bogotá, Colombia. We design custom web GIS viewers, dashboards and AI, and we supported the implementation of climate MRV and M&E systems for the mining and energy sector.",
      cta_primary: "Talk about your project",
      cta_secondary: "Request a demo",
      product: {
        title: "PPR ACGGP Viewer",
        status: "In production",
        cta: "View the case study",
        alt: "Screenshot of the PPR ACGGP Viewer: a map of Colombia with the program's locations and an indicator panel",
      },
    },
    proofBar: {
      title: "GearsMap at a glance",
      live: "In production · PPR ACGGP Viewer",
      climate: "Operational implementation · MRV and M&E with MinMinas and KfW support",
      place: "Bogotá, Colombia",
      founded: "Founded in 2025",
    },
    sections: {
      capabilities: "Capabilities",
      process: "Process",
      about: "About",
      contact: "Contact",
    },
    about: {
      title: "About GearsMap",
      intro: "We innovate in new ways to use and visualize data to add value to processes and decisions.",
      imageAlt: "GearsMap team working with data visualization",
      facts: {
        title: "Company facts",
        legalName: "Legal name",
        taxId: "Tax ID (NIT)",
        founded: "Founded",
        hq: "Headquarters",
        languages: "Languages",
        languagesValue: "Spanish, English and French",
        contact: "Contact",
      },
      foundation: {
        title: "Foundation",
        text: "Founded in 2025, GearsMap brings together experienced professionals from the technology sector, driven by the passion to contribute to the Fourth Industrial Revolution. We innovate in new ways to use and visualize data, adding value to business processes.",
      },
      products: {
        title: "Products and Services",
        text: "We specialize in developing software solutions based on Geographic Information Systems (GIS) and geospatial data management and analysis. Our offerings include applications for information management and visualization, optimization, and project automation.",
      },
    },
    mission: {
      mission: {
        title: "Mission",
        text: "Our main goal is to assist government entities, companies, and organizations in their digital transformation towards a more prosperous future. We seek to optimize every resource and process through the innovative use of information.",
      },
      vision: {
        title: "Vision",
        text: "We aspire to bring our innovations to every corner of the world, collaborating with entities and individuals to generate revolutionary ideas and developments. We seek to contribute to the transformation of human development.",
      },
    },
    portfolio: {
      header: "Geospatial and data services",
      subheader: "Web GIS viewers, geographic information systems, dashboards, artificial intelligence and automation that turn territorial data into decisions.",
      detailsLabel: "Details",
      geoviewersLink: "See the web GIS viewer service",
      services: {
        ai: {
          title: "AI and Machine Learning",
          desc: "We implement artificial intelligence and machine learning solutions to help you extract valuable information from your data and improve decision-making.",
          details: "Our AI solutions include predictive analytics, natural language processing (NLP), and computer vision. We help automate data classification, detect anomalies in real-time, and generate actionable insights that drive your business growth.",
        },
        geoviewers: {
          title: "Web GIS viewers",
          desc: "We develop custom web GIS viewers to visualize and analyze geospatial information interactively and dynamically.",
          details: "We create interactive map viewers using technologies like Mapbox, Leaflet, and OpenLayers. We integrate complex data layers, drawing tools, in-browser spatial analysis, and advanced filtering so you can explore your geographic information without limits.",
        },
        visualization: {
          title: "2D and 3D Visualization",
          desc: "Enhance the analysis and understanding of your data through advanced 2D and 3D visualization tools, designed to measure.",
          details: "We transform abstract data into immersive visual experiences. From interactive charts to 3D models of cities and terrain, our tools enable a deep understanding of patterns and trends that would be invisible in traditional tables.",
        },
        dashboards: {
          title: "Dashboards and Statistics",
          desc: "This tool will allow you to present and analyze your data clearly and visually, facilitating more informed decision-making.",
          details: "We design executive and operational dashboards that centralize your most important KPIs. With real-time updates, dynamic filters, and report exporting, you'll have total control over your performance metrics on a single screen.",
        },
        automation: {
          title: "Process Automation",
          desc: "Through process automation, we help you improve operational efficiency and reduce time spent on repetitive tasks.",
          details: "We identify bottlenecks and error-prone manual tasks to replace them with automated workflows. From data ingestion to notification generation, we optimize your operations so your team can focus on high-value tasks.",
        },
        monitoring: {
          title: "Monitoring and Maintenance",
          desc: "We provide continuous monitoring and product maintenance services, ensuring optimal operation over time.",
          details: "We offer proactive technical support, security updates, and 24/7 performance monitoring. We ensure your platforms are always available, secure, and running at maximum efficiency, adapting to technological changes.",
        },
      },
    },
    contact: {
      header: "Contact us",
      subheader: "Fill out the form or write to us directly to get in touch.",
      promise: "We reply with context, concrete questions, and a possible path forward.",
      sending: "Sending...",
      channels: {
        linkedin: "GearsMap on LinkedIn",
      },
      next: {
        title: "What happens next",
      },
      toast: {
        success: "Message sent!",
        successDescription: "We'll get back to you soon.",
        error: "Error",
        errorDescription: "Something went wrong. Please try again.",
        validationError: "Please check the form fields.",
      },
      intent: {
        label: "How can we help?",
        project: "Talk about a project",
        projectDescription: "Tell us what you want to solve and which data you already have.",
        demo: "Request a demo",
        demoDescription: "See a solution in action and explore whether it fits your operation.",
      },
      form: {
        required: "Required fields",
        name: "Your name *",
        namePlaceholder: "Enter your name",
        phone: "Your phone",
        phonePlaceholder: "Enter your phone",
        email: "Your email *",
        emailPlaceholder: "Enter your email",
        message: "Your message *",
        messagePlaceholder: "Tell us what you want to visualize, automate, or improve",
        submit: "Send Message",
      },
    },
    techStack: {
      title: "Technology stack",
      subtitle: "Modern tools for robust solutions",
      groups: {
        geo: "Geospatial",
        data: "Data & AI",
        web: "Web",
        cloud: "Cloud",
      },
    },
    gallery: {
      title: "Featured Projects",
      subtitle: "Solutions built to turn complex data into clearer operations.",
      liveLabel: "View solution",
      caseLabel: "View the work",
      illustrativeLabel: "Illustrative visualization of the project",
      ctaTitle: "Do you have complex territory to understand?",
      ctaDescription: "Tell us where the difficult data is. We design a way to make it useful.",
      ctaLabel: "Talk to us",
      project1: { title: "PPR ACGGP Viewer", desc: "A geoviewer for exploring regional information with layers, filters, and territorial context." },
      project2: { title: "MRV · Monitoring, Reporting and Verification", desc: "Operational implementation to organize and visualize indicators and emissions for the mining and energy sector, with MinMinas and KfW support." },
      project3: { title: "M&E · Monitoring and Evaluation", desc: "Operational implementation to read climate hazard, vulnerability, and risk, with MinMinas and KfW support." },
      project4: { title: "Agricultural analysis", desc: "Satellite crop monitoring to detect patterns and support field decisions." },
      project5: { title: "Fleet management", desc: "A real-time operations concept for optimizing logistics routes and resources." },
    },
    team: {
      title: "Our Team",
      subtitle: "Founders and experts passionate about innovation and data",
      role1: "CEO & Founder",
      role2: "Lead Developer",
      role3: "Data Scientist",
      roles: {
        ceo: "CEO - Strategy & Vision",
        cpo: "CPO - Product & Innovation",
        cdo: "CDO - Data Science & AI",
        cco: "CCO - Business & Growth",
      },
    },
    projects: {
      status: {
        inDevelopment: "In Development",
        live: "In production",
        operational: "Operational implementation",
      },
    },
    climateTeaser: {
      eyebrow: "Complementary work",
      title: "Climate information for the mining and energy sector",
      text: "Alongside geoviewers and data platforms, we supported the operational implementation of the MRV and monitoring-and-evaluation modules of the climate information system, with MinMinas and KfW support.",
      cta: "View the MRV and M&E work",
      mrv: "Monitoring, reporting and verification of emissions",
      me: "Monitoring and evaluation of climate risk",
    },
    process: {
      title: "How we work",
      subtitle: "A clear cycle from a difficult question to a tool your team can use.",
      steps: {
        scope: { number: "01", title: "Understand the territory", text: "We frame the question, sources, and decisions that need better information." },
        model: { number: "02", title: "Shape the system", text: "We design the data model, experience, and flows that connect people." },
        deliver: { number: "03", title: "Put it in motion", text: "We deliver a useful, measurable platform ready to evolve with the operation." },
      },
    },
    footer: {
      description: "We transform complex data into strategic decisions through innovation, technology, and expert support.",
      quickLinks: "Quick Links",
      services: "Services",
      contact: "Contact",
      rights: "All rights reserved.",
      privacy: "Privacy Policy",
      terms: "Terms of Use",
      linkedinLabel: "GearsMap on LinkedIn",
      languages: "Languages",
    },
  },
  FR: {
    common: {
      learnMore: "En savoir plus",
      language: "Langue",
      backToTop: "Retour en haut",
      current: "actuel",
      theme: {
        label: "Changer de thème",
        light: "Clair",
        dark: "Sombre",
        system: "Système",
        toLight: "Passer au thème clair",
        toDark: "Passer au thème sombre",
      },
    },
    nav: {
      home: "Accueil",
      about: "À Propos",
      portfolio: "Portefeuille",
      climate: "MRV / S&E",
      contact: "Contact",
      openMenu: "Ouvrir le menu",
      closeMenu: "Fermer le menu",
      cta: "Parlons-en",
      projects: "Projets",
    },
    seo: {
      title: "Logiciel géospatial et SIG web en Colombie",
      description: "GearsMap conçoit des logiciels géospatiaux, des SIG web, des tableaux de bord et de l'IA en Colombie, ainsi que des systèmes climatiques MRV et S&E.",
      keywords: ["GearsMap", "logiciel géospatial", "SIG", "géovisionneuses", "intelligence artificielle", "visualisation de données", "tableaux de bord", "Colombie", "MRV", "suivi et évaluation"],
    },
    hero: {
      title: "GearsMap",
      kicker: "Logiciel géospatial, SIG web et IA en Colombie",
      headline: "Du territoire aux données. Des données aux décisions.",
      lede: "GearsMap S.A.S. est une entreprise de logiciels géospatiaux basée à Bogotá, en Colombie. Nous concevons des SIG web, des tableaux de bord et de l'IA sur mesure, et avons accompagné la mise en œuvre de systèmes climatiques MRV et S&E pour le secteur minier et énergétique.",
      cta_primary: "Parlons de votre projet",
      cta_secondary: "Demander une démo",
      product: {
        title: "Visualiseur PPR ACGGP",
        status: "En production",
        cta: "Voir l'étude de cas",
        alt: "Capture du Visualiseur PPR ACGGP : carte de la Colombie avec les sites du programme et un panneau d'indicateurs",
      },
    },
    proofBar: {
      title: "GearsMap en bref",
      live: "En production · Visualiseur PPR ACGGP",
      climate: "Mise en œuvre opérationnelle · MRV et S&E avec MinMinas et le soutien de la KfW",
      place: "Bogotá, Colombie",
      founded: "Fondée en 2025",
    },
    sections: {
      capabilities: "Compétences",
      process: "Méthode",
      about: "À propos",
      contact: "Contact",
    },
    about: {
      title: "À propos de GearsMap",
      intro: "Nous innovons dans de nouvelles façons d'utiliser et de visualiser les données pour ajouter de la valeur aux processus et aux décisions.",
      imageAlt: "L'équipe GearsMap travaille sur la visualisation de données",
      facts: {
        title: "Fiche de l'entreprise",
        legalName: "Raison sociale",
        taxId: "NIT",
        founded: "Fondation",
        hq: "Siège",
        languages: "Langues",
        languagesValue: "Espagnol, anglais et français",
        contact: "Contact",
      },
      foundation: {
        title: "Fondation",
        text: "Fondée en 2025, GearsMap rassemble des professionnels expérimentés du secteur technologique, animés par la passion de contribuer à la quatrième révolution industrielle. Nous innovons dans de nouvelles façons d'utiliser et de visualiser les données, ajoutant de la valeur aux processus commerciaux.",
      },
      products: {
        title: "Produits et services",
        text: "Nous sommes spécialisés dans le développement de solutions logicielles basées sur les systèmes d'information géographique (SIG) et dans la gestion et l'analyse de données géospatiales. Nos offres comprennent des applications pour la gestion et la visualisation de l'information, l'optimisation et l'automatisation de projets.",
      },
    },
    mission: {
      mission: {
        title: "Mission",
        text: "Notre objectif principal est d'aider les entités gouvernementales, les entreprises et les organisations dans leur transformation numérique vers un avenir plus prospère. Nous cherchons à optimiser chaque ressource et processus grâce à l'utilisation innovante de l'information.",
      },
      vision: {
        title: "Vision",
        text: "Nous aspirons à apporter nos innovations aux quatre coins du monde, en collaborant avec des entités et des individus pour générer des idées et des développements révolutionnaires. Nous cherchons à contribuer à la transformation du développement de l'humanité.",
      },
    },
    portfolio: {
      header: "Services géospatiaux et de données",
      subheader: "SIG web, systèmes d'information géographique, tableaux de bord, intelligence artificielle et automatisation pour transformer des données territoriales en décisions.",
      detailsLabel: "Détails",
      geoviewersLink: "Voir le service SIG web",
      services: {
        ai: {
          title: "IA et Machine Learning",
          desc: "Nous mettons en œuvre des solutions d'intelligence artificielle et d'apprentissage automatique pour vous aider à extraire des informations précieuses de vos données et à améliorer la prise de décision.",
          details: "Nos solutions d'IA incluent l'analyse prédictive, le traitement du langage naturel (NLP) et la vision par ordinateur. Nous aidons à automatiser la classification des données, à détecter les anomalies en temps réel et à générer des informations exploitables qui stimulent la croissance de votre entreprise.",
        },
        geoviewers: {
          title: "Visualiseurs cartographiques web",
          desc: "Nous développons des visualiseurs cartographiques web personnalisés pour visualiser et analyser les informations géospatiales de manière interactive et dynamique.",
          details: "Nous créons des visualiseurs de cartes interactifs utilisant des technologies comme Mapbox, Leaflet et OpenLayers. Nous intégrons des couches de données complexes, des outils de dessin, une analyse spatiale dans le navigateur et un filtrage avancé pour que vous puissiez explorer vos informations géographiques sans limites.",
        },
        visualization: {
          title: "Visualisation 2D et 3D",
          desc: "Améliorez l'analyse et la compréhension de vos données grâce à des outils de visualisation 2D et 3D avancés, conçus sur mesure.",
          details: "Nous transformons des données abstraites en expériences visuelles immersives. Des graphiques interactifs aux modèles 3D de villes et de terrains, nos outils permettent une compréhension approfondie des modèles et des tendances qui seraient invisibles dans les tableaux traditionnels.",
        },
        dashboards: {
          title: "Tableaux de bord et statistiques",
          desc: "Cet outil vous permettra de présenter et d'analyser vos données de manière claire et visuelle, facilitant une prise de décision plus éclairée.",
          details: "Nous concevons des tableaux de bord exécutifs et opérationnels qui centralisent vos KPI les plus importants. Avec des mises à jour en temps réel, des filtres dynamiques et l'exportation de rapports, vous aurez un contrôle total sur vos mesures de performance sur un seul écran.",
        },
        automation: {
          title: "Automatisation des processus",
          desc: "Grâce à l'automatisation des processus, nous vous aidons à améliorer l'efficacité opérationnelle et à réduire le temps consacré aux tâches répétitives.",
          details: "Nous identifions les goulots d'étranglement et les tâches manuelles sujettes aux erreurs pour les remplacer par des flux de travail automatisés. De l'ingestion de données à la génération de notifications, nous optimisons vos opérations pour que votre équipe se concentre sur des tâches à haute valeur ajoutée.",
        },
        monitoring: {
          title: "Surveillance et maintenance",
          desc: "Nous fournissons des services de surveillance continue et de maintenance des produits, assurant leur fonctionnement optimal dans le temps.",
          details: "Nous offrons un support technique proactif, des mises à jour de sécurité et une surveillance des performances 24/7. Nous garantissons que vos plateformes sont toujours disponibles, sécurisées et fonctionnent avec une efficacité maximale, en s'adaptant aux changements technologiques.",
        },
      },
    },
    contact: {
      header: "Contactez-nous",
      subheader: "Remplissez le formulaire ou écrivez-nous directement pour nous contacter.",
      promise: "Nous répondons avec du contexte, des questions concrètes et une piste possible.",
      sending: "Envoi en cours...",
      channels: {
        linkedin: "GearsMap sur LinkedIn",
      },
      next: {
        title: "Et ensuite",
      },
      toast: {
        success: "Message envoyé",
        successDescription: "Nous vous répondrons bientôt.",
        error: "Erreur",
        errorDescription: "Une erreur est survenue. Réessayez.",
        validationError: "Veuillez vérifier les champs.",
      },
      intent: {
        label: "Comment pouvons-nous vous aider ?",
        project: "Parlons d'un projet",
        projectDescription: "Dites-nous ce que vous souhaitez résoudre et quelles données vous avez déjà.",
        demo: "Demander une démo",
        demoDescription: "Découvrez une solution et voyons si elle correspond à votre activité.",
      },
      form: {
        required: "Champs obligatoires",
        name: "Votre nom *",
        namePlaceholder: "Entrez votre nom",
        phone: "Votre téléphone",
        phonePlaceholder: "Entrez votre téléphone",
        email: "Votre e-mail *",
        emailPlaceholder: "Entrez votre e-mail",
        message: "Votre message *",
        messagePlaceholder: "Dites-nous ce que vous souhaitez visualiser, automatiser ou améliorer",
        submit: "Envoyer le message",
      },
    },
    techStack: {
      title: "Stack technologique",
      subtitle: "Des outils modernes pour des solutions robustes",
      groups: {
        geo: "Géospatial",
        data: "Données et IA",
        web: "Web",
        cloud: "Cloud",
      },
    },
    gallery: {
      title: "Projets en vedette",
      subtitle: "Des solutions conçues pour transformer des données complexes en opérations plus claires.",
      liveLabel: "Voir la solution",
      caseLabel: "Voir le travail",
      illustrativeLabel: "Visualisation illustrative du projet",
      ctaTitle: "Un territoire complexe à comprendre ?",
      ctaDescription: "Dites-nous où se trouvent les données difficiles. Nous concevons une façon de les rendre utiles.",
      ctaLabel: "Parlons-en",
      project1: { title: "Visualiseur PPR ACGGP", desc: "Un géovisualiseur pour explorer des informations régionales avec des couches, des filtres et un contexte territorial." },
      project2: { title: "MRV · Suivi, notification et vérification", desc: "Mise en œuvre opérationnelle pour organiser et visualiser les indicateurs et les émissions du secteur minier et énergétique, avec MinMinas et le soutien de KfW." },
      project3: { title: "M&E · Suivi et évaluation", desc: "Mise en œuvre opérationnelle pour lire l'aléa, la vulnérabilité et le risque climatique, avec MinMinas et le soutien de KfW." },
      project4: { title: "Analyse agricole", desc: "Suivi des cultures par satellite pour détecter des tendances et appuyer les décisions de terrain." },
      project5: { title: "Gestion de flotte", desc: "Un concept opérationnel en temps réel pour optimiser les itinéraires logistiques et les ressources." },
    },
    team: {
      title: "Notre équipe",
      subtitle: "Fondateurs et experts passionnés par l'innovation et les données",
      role1: "PDG et fondateur",
      role2: "Développeur principal",
      role3: "Data Scientist",
      roles: {
        ceo: "CEO - Stratégie et Vision",
        cpo: "CPO - Produit et Innovation",
        cdo: "CDO - Science des données et IA",
        cco: "CCO - Commerce et Croissance",
      },
    },
    projects: {
      status: {
        inDevelopment: "En développement",
        live: "En production",
        operational: "Mise en œuvre opérationnelle",
      },
    },
    climateTeaser: {
      eyebrow: "Travail complémentaire",
      title: "Information climatique pour le secteur minier et énergétique",
      text: "En plus des géovisionneuses et des plateformes de données, nous avons accompagné la mise en œuvre opérationnelle des modules MRV et de suivi-évaluation du système d'information climatique, avec MinMinas et le soutien de KfW.",
      cta: "Voir le travail MRV et S&E",
      mrv: "Suivi, notification et vérification des émissions",
      me: "Suivi et évaluation du risque climatique",
    },
    process: {
      title: "Notre méthode",
      subtitle: "Un cycle clair pour passer d'une question complexe à un outil utilisable par votre équipe.",
      steps: {
        scope: { number: "01", title: "Comprendre le territoire", text: "Nous cadrons la question, les sources et les décisions qui ont besoin de meilleures informations." },
        model: { number: "02", title: "Donner forme au système", text: "Nous concevons le modèle de données, l'expérience et les flux qui relient les personnes." },
        deliver: { number: "03", title: "Le mettre en mouvement", text: "Nous livrons une plateforme utile, mesurable et prête à évoluer avec l'activité." },
      },
    },
    footer: {
      description: "Nous transformons des données complexes en décisions stratégiques grâce à l'innovation, la technologie et un support expert.",
      quickLinks: "Liens rapides",
      services: "Services",
      contact: "Contact",
      rights: "Tous droits réservés.",
      privacy: "Politique de confidentialité",
      terms: "Conditions d'utilisation",
      linkedinLabel: "GearsMap sur LinkedIn",
      languages: "Langues",
    },
  },
}

export type Dictionary = typeof translations.ES

/** Typed view of `translations`: EN and FR must provide every key the Spanish dictionary has. */
const dictionaries: Record<Language, Dictionary> = translations

const localeLanguages: Record<Locale, Language> = {
  es: "ES",
  en: "EN",
  fr: "FR",
}

export const locales = Object.keys(localeLanguages) as Locale[]

export function isLocale(value: string): value is Locale {
  return value in localeLanguages
}

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[localeLanguages[locale]]
}

export function localeToLanguage(locale: Locale): Language {
  return localeLanguages[locale]
}
