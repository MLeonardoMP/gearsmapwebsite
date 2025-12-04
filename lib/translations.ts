export type Language = "ES" | "EN" | "FR"

export const translations = {
  ES: {
    common: {
      learnMore: "Saber más",
    },
    nav: {
      home: "Inicio",
      about: "Sobre Nosotros",
      portfolio: "Portafolio",
      contact: "Contacto",
    },
    hero: {
      badge: "Plataformas de datos a tu medida",
      title: "GearsMap",
      subtitle: "¿Qué es ",
      description1: "Diseñamos plataformas personalizadas que optimizan procesos y visualizan datos complejos.",
      description2: "Innovación, soporte constante y herramientas de alta calidad para transformar tus datos en decisiones estratégicas.",
      cta_primary: "Solicitar demo",
      cta_secondary: "Saber más",
      stats: {
        projects: "Proyectos completados",
        satisfaction: "Satisfacción del cliente",
        support: "Soporte técnico",
      },
      floating: {
        revenue: "Crecimiento",
        data: "Puntos de Datos",
      }
    },
    about: {
      title: "Sobre GearsMap",
      intro: "Innovamos en nuevas formas de utilizar y visualizar datos para agregar valor a procesos y decisiones.",
      foundation: {
        title: "Fundación",
        text: "Fundada en 2024, GearsMap reúne a profesionales experimentados del sector tecnológico, impulsados por la pasión de contribuir a la Cuarta Revolución Industrial. Innovamos en nuevas formas de utilizar y visualizar datos, añadiendo valor a los procesos empresariales.",
      },
      products: {
        title: "Productos y servicios",
        text: "Nos especializamos en el desarrollo de soluciones de software basadas en Sistemas de Información Geográfica (SIG) y en la gestión y análisis de datos geoespaciales. Nuestras ofertas incluyen aplicaciones para la gestión y visualización de información, optimización y automatización de proyectos.",
      },
    },
    mission: {
      title: "Misión y visión",
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
      header: "Portafolio y Servicios",
      subheader: "Conozca más sobre nuestros servicios y soluciones de visualización y análisis de datos.",
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
      header: "Contactenos",
      subheader: "Complete el formulario para ponerte en contacto con nosotros.",
      form: {
        title: "¿Necesitas ayuda? Contáctanos",
        subtitle: "Nuestro equipo se pondrá en contacto contigo lo antes posible.",
        name: "Tu Nombre *",
        namePlaceholder: "Ingresa tu nombre",
        phone: "Tu Teléfono",
        phonePlaceholder: "Ingresa tu teléfono",
        email: "Tu Correo Electrónico *",
        emailPlaceholder: "Ingresa tu correo electrónico",
        message: "Tu Mensaje *",
        messagePlaceholder: "Ingresa tu mensaje",
        submit: "Enviar Mensaje",
      },
    },
    techStack: {
      title: "Stack Tecnológico",
      subtitle: "Herramientas modernas para soluciones robustas"
    },
    gallery: {
      title: "Proyectos Destacados",
      subtitle: "Explora nuestras soluciones en acción",
      project1: { title: "Visor PPR ACGGP", desc: "Programa de Pedagogía Regional" },
      project2: { title: "Análisis Agrícola", desc: "Monitoreo de cultivos satelital" },
      project3: { title: "Gestión de Flotas", desc: "Optimización de rutas logísticas" }
    },
    team: {
      title: "Nuestro Equipo",
      subtitle: "Expertos apasionados por los datos",
      role1: "CEO & Fundador",
      role2: "Lead Developer",
      role3: "Data Scientist"
    },
    footer: {
      description: "Transformamos datos complejos en decisiones estratégicas mediante innovación, tecnología y soporte experto.",
      quickLinks: "Enlaces Rápidos",
      services: "Servicios",
      contact: "Contacto",
      rights: "Todos los derechos reservados.",
      privacy: "Política de Privacidad",
      terms: "Términos de Uso",
    },
  },
  EN: {
    common: {
      learnMore: "Learn more",
    },
    nav: {
      home: "Home",
      about: "About Us",
      portfolio: "Portfolio",
      contact: "Contact",
    },
    hero: {
      badge: "Custom Data Platforms",
      title: "GearsMap",
      subtitle: "What is ",
      description1: "We design custom platforms that optimize processes and visualize complex data.",
      description2: "Innovation, constant support, and high-quality tools to transform your data into strategic decisions.",
      cta_primary: "Request Demo",
      cta_secondary: "Learn More",
      stats: {
        projects: "Projects Completed",
        satisfaction: "Customer Satisfaction",
        support: "Technical Support",
      },
      floating: {
        revenue: "Growth",
        data: "Data Points",
      }
    },
    about: {
      title: "About GearsMap",
      intro: "We innovate in new ways to use and visualize data to add value to processes and decisions.",
      foundation: {
        title: "Foundation",
        text: "Founded in 2024, GearsMap brings together experienced professionals from the technology sector, driven by the passion to contribute to the Fourth Industrial Revolution. We innovate in new ways to use and visualize data, adding value to business processes.",
      },
      products: {
        title: "Products and Services",
        text: "We specialize in developing software solutions based on Geographic Information Systems (GIS) and geospatial data management and analysis. Our offerings include applications for information management and visualization, optimization, and project automation.",
      },
    },
    mission: {
      title: "Mission and Vision",
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
      header: "Portfolio and Services",
      subheader: "Learn more about our data visualization and analysis services and solutions.",
      services: {
        ai: {
          title: "AI and Machine Learning",
          desc: "We implement artificial intelligence and machine learning solutions to help you extract valuable information from your data and improve decision-making.",
          details: "Our AI solutions include predictive analytics, natural language processing (NLP), and computer vision. We help automate data classification, detect anomalies in real-time, and generate actionable insights that drive your business growth.",
        },
        geoviewers: {
          title: "Geoviewers",
          desc: "We develop custom geoviewers to visualize and analyze geospatial information interactively and dynamically.",
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
      header: "Contact Us",
      subheader: "Fill out the form to get in touch with us.",
      form: {
        title: "Need Help? Contact Us",
        subtitle: "Our team will get in touch with you as soon as possible.",
        name: "Your Name *",
        namePlaceholder: "Enter your name",
        phone: "Your Phone",
        phonePlaceholder: "Enter your phone",
        email: "Your Email *",
        emailPlaceholder: "Enter your email",
        message: "Your Message *",
        messagePlaceholder: "Enter your message",
        submit: "Send Message",
      },
    },
    techStack: {
      title: "Technology Stack",
      subtitle: "Modern tools for robust solutions"
    },
    gallery: {
      title: "Featured Projects",
      subtitle: "Explore our solutions in action",
      project1: { title: "PPR ACGGP Viewer", desc: "Regional Pedagogy Program" },
      project2: { title: "Agricultural Analysis", desc: "Satellite crop monitoring" },
      project3: { title: "Fleet Management", desc: "Logistics route optimization" }
    },
    team: {
      title: "Our Team",
      subtitle: "Experts passionate about data",
      role1: "CEO & Founder",
      role2: "Lead Developer",
      role3: "Data Scientist"
    },
    footer: {
      description: "We transform complex data into strategic decisions through innovation, technology, and expert support.",
      quickLinks: "Quick Links",
      services: "Services",
      contact: "Contact",
      rights: "All rights reserved.",
      privacy: "Privacy Policy",
      terms: "Terms of Use",
    },
  },
  FR: {
    common: {
      learnMore: "En savoir plus",
    },
    nav: {
      home: "Accueil",
      about: "À Propos",
      portfolio: "Portefeuille",
      contact: "Contact",
    },
    hero: {
      badge: "Plateformes de données sur mesure",
      title: "GearsMap",
      subtitle: "Qu'est-ce que ",
      description1: "Nous concevons des plateformes personnalisées qui optimisent les processus et visualisent des données complexes.",
      description2: "Innovation, support constant et outils de haute qualité pour transformer vos données en décisions stratégiques.",
      cta_primary: "Demander une démo",
      cta_secondary: "En savoir plus",
      stats: {
        projects: "Projets terminés",
        satisfaction: "Satisfaction client",
        support: "Support technique",
      },
      floating: {
        revenue: "Croissance",
        data: "Points de données",
      }
    },
    about: {
      title: "À propos de GearsMap",
      intro: "Nous innovons dans de nouvelles façons d'utiliser et de visualiser les données pour ajouter de la valeur aux processus et aux décisions.",
      foundation: {
        title: "Fondation",
        text: "Fondée en 2024, GearsMap rassemble des professionnels expérimentés du secteur technologique, animés par la passion de contribuer à la quatrième révolution industrielle. Nous innovons dans de nouvelles façons d'utiliser et de visualiser les données, ajoutant de la valeur aux processus commerciaux.",
      },
      products: {
        title: "Produits et services",
        text: "Nous sommes spécialisés dans le développement de solutions logicielles basées sur les systèmes d'information géographique (SIG) et dans la gestion et l'analyse de données géospatiales. Nos offres comprennent des applications pour la gestion et la visualisation de l'information, l'optimisation et l'automatisation de projets.",
      },
    },
    mission: {
      title: "Mission et vision",
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
      header: "Portefeuille et Services",
      subheader: "En savoir plus sur nos services et solutions de visualisation et d'analyse de données.",
      services: {
        ai: {
          title: "IA et Machine Learning",
          desc: "Nous mettons en œuvre des solutions d'intelligence artificielle et d'apprentissage automatique pour vous aider à extraire des informations précieuses de vos données et à améliorer la prise de décision.",
          details: "Nos solutions d'IA incluent l'analyse prédictive, le traitement du langage naturel (NLP) et la vision par ordinateur. Nous aidons à automatiser la classification des données, à détecter les anomalies en temps réel et à générer des informations exploitables qui stimulent la croissance de votre entreprise.",
        },
        geoviewers: {
          title: "Géovisionneuses",
          desc: "Nous développons des géovisionneuses personnalisées pour visualiser et analyser les informations géospatiales de manière interactive et dynamique.",
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
      subheader: "Remplissez le formulaire pour nous contacter.",
      form: {
        title: "Besoin d'aide ? Contactez-nous",
        subtitle: "Notre équipe vous contactera dès que possible.",
        name: "Votre Nom *",
        namePlaceholder: "Entrez votre nom",
        phone: "Votre Téléphone",
        phonePlaceholder: "Entrez votre téléphone",
        email: "Votre Email *",
        emailPlaceholder: "Entrez votre email",
        message: "Votre Message *",
        messagePlaceholder: "Entrez votre message",
        submit: "Envoyer le message",
      },
    },
    techStack: {
      title: "Stack Technologique",
      subtitle: "Des outils modernes pour des solutions robustes"
    },
    gallery: {
      title: "Projets en vedette",
      subtitle: "Découvrez nos solutions en action",
      project1: { title: "Visualiseur PPR ACGGP", desc: "Programme de Pédagogie Régionale" },
      project2: { title: "Analyse agricole", desc: "Surveillance des cultures par satellite" },
      project3: { title: "Gestion de flotte", desc: "Optimisation des itinéraires logistiques" }
    },
    team: {
      title: "Notre équipe",
      subtitle: "Des experts passionnés par les données",
      role1: "PDG et fondateur",
      role2: "Développeur principal",
      role3: "Data Scientist"
    },
    footer: {
      description: "Nous transformons des données complexes en décisions stratégiques grâce à l'innovation, la technologie et un support expert.",
      quickLinks: "Liens rapides",
      services: "Services",
      contact: "Contact",
      rights: "Tous droits réservés.",
      privacy: "Politique de confidentialité",
      terms: "Conditions d'utilisation",
    },
  },
}
