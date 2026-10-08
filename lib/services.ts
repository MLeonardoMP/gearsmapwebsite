import type { Locale } from "@/lib/translations"

export type ServicePageKey = "geoviewers"

export type ServiceViewerKey = "acggp" | "mrv" | "me"

type ServiceFaq = { question: string; answer: string }

export type ServicePageCopy = {
  seoTitle: string
  description: string
  breadcrumbLabel: string
  home: string
  crumb: string
  eyebrow: string
  /** Visible h1. */
  title: string
  lede: string
  serviceType: string
  audienceType: string
  build: { id: string; heading: string; points: string[] }
  live: {
    id: string
    heading: string
    items: Record<ServiceViewerKey, { title: string; text: string }>
    note: string
    screenshotAlt: string
    openApp: string
    caseStudy: string
    module: string
    newTab: string
  }
  process: { id: string }
  tech: { id: string; heading: string; items: string[] }
  faq: { id: string; heading: string; items: ServiceFaq[] }
  cta: { title: string; body: string; label: string }
}

const technologies = ["Mapbox", "Leaflet", "OpenLayers", "QGIS", "PostgreSQL", "React", "Next.js", "Python"]

const geoviewers: Record<Locale, ServicePageCopy> = {
  es: {
    seoTitle: "Desarrollo de geovisores y visores GIS a la medida",
    description: "Geovisores web a la medida con Mapbox, Leaflet u OpenLayers: capas, filtros, dibujo y análisis espacial en el navegador. Equipo en Bogotá, Colombia.",
    breadcrumbLabel: "Ruta de navegación",
    home: "Inicio",
    crumb: "Geovisores",
    eyebrow: "Servicio · Geovisores",
    title: "Desarrollo de geovisores y visores GIS a la medida",
    lede: "Un geovisor convierte datos geográficos dispersos en un mapa que el equipo puede consultar: capas, filtros, contexto territorial y descarga. En GearsMap los diseñamos y construimos a la medida de cada operación.",
    serviceType: "Desarrollo de geovisores web",
    audienceType: "Equipos y organizaciones con datos territoriales complejos",
    build: {
      id: "que-construimos",
      heading: "Qué construimos",
      points: [
        "Visores de mapas interactivos con Mapbox, Leaflet u OpenLayers",
        "Integración de capas de datos complejos",
        "Herramientas de dibujo",
        "Análisis espacial en el navegador",
        "Filtrado avanzado",
      ],
    },
    live: {
      id: "geovisores-en-funcionamiento",
      heading: "Geovisores que ya funcionan",
      items: {
        acggp: {
          title: "Visor PPR ACGGP",
          text: "Geovisor del Programa de Pedagogía Regional (PPR) de la ACGGP para explorar información regional con capas, filtros y contexto territorial.",
        },
        mrv: {
          title: "Visor departamental de emisiones · módulo MRV",
          text: "El módulo MRV del sistema de información climática del sector minero-energético incluye un visor geográfico de lectura departamental, junto a los tableros de emisiones e intensidad.",
        },
        me: {
          title: "Visores territorial y de infraestructura energética · módulo M&E",
          text: "El módulo M&E incluye un visor territorial de amenaza, vulnerabilidad y riesgo sobre los municipios del país y un visor sobre la infraestructura minero-energética.",
        },
      },
      note: "Los visores de MRV y M&E forman parte de sistemas institucionales sin acceso público. Esta página describe el trabajo de implementación de GearsMap; no es una publicación oficial del Ministerio de Minas y Energía ni implica un aval institucional.",
      screenshotAlt: "Visor PPR ACGGP: mapa de Colombia con los puntos del Programa de Pedagogía Regional y un panel lateral de indicadores.",
      openApp: "Abrir el visor",
      caseStudy: "Ver el caso",
      module: "Leer el módulo",
      newTab: "(se abre en una pestaña nueva)",
    },
    process: { id: "como-trabajamos" },
    tech: { id: "tecnologias", heading: "Tecnologías", items: technologies },
    faq: {
      id: "preguntas-frecuentes",
      heading: "Preguntas frecuentes",
      items: [
        {
          question: "¿Qué es un geovisor?",
          answer: "Es una aplicación web de mapas que reúne capas de información geográfica para consultarlas, filtrarlas y analizarlas en el navegador. Convierte datos dispersos en un mapa que el equipo puede usar, con contexto territorial y descarga.",
        },
        {
          question: "¿Con qué tecnologías construyen geovisores?",
          answer: "Construimos los visores con Mapbox, Leaflet u OpenLayers, y trabajamos con QGIS, PostgreSQL, React, Next.js y Python para preparar los datos, servirlos y construir la interfaz.",
        },
        {
          question: "¿Tienen geovisores en producción?",
          answer: "Sí. El Visor PPR ACGGP está en producción en acggp.gearsmap.com. Es un geovisor del Programa de Pedagogía Regional (PPR) de la ACGGP para explorar información regional con capas, filtros y contexto territorial.",
        },
        {
          question: "¿Hacen visores para información climática o del sector minero-energético?",
          answer: "Sí. La implementación operativa de los módulos MRV y M&E del sistema de información climática del sector minero-energético, con el Ministerio de Minas y Energía y apoyo de KfW, incluye un visor departamental de emisiones, un visor territorial de amenaza, vulnerabilidad y riesgo y un visor de infraestructura energética. Son sistemas institucionales sin acceso público.",
        },
        {
          question: "¿Qué pasa después de la entrega?",
          answer: "Podemos continuar con el monitoreo y el mantenimiento del geovisor para asegurar su buen funcionamiento a lo largo del tiempo.",
        },
      ],
    },
    cta: {
      title: "¿Tiene datos geográficos que su equipo aún no puede consultar?",
      body: "Cuéntenos qué datos tiene y qué decisiones debe apoyar el mapa. Revisamos con usted la forma de construir el geovisor.",
      label: "Conversemos sobre un geovisor",
    },
  },
  en: {
    seoTitle: "Custom web GIS viewer development",
    description: "Custom web GIS viewers built with Mapbox, Leaflet or OpenLayers: layers, filters, drawing and in-browser spatial analysis. Team based in Bogotá, Colombia.",
    breadcrumbLabel: "Breadcrumb",
    home: "Home",
    crumb: "Web GIS viewers",
    eyebrow: "Service · Web GIS viewers",
    title: "Custom web GIS viewer development",
    lede: "A web GIS viewer turns scattered geographic data into a map the team can query: layers, filters, territorial context and download. At GearsMap we design and build them to fit each operation.",
    serviceType: "Web GIS viewer development",
    audienceType: "Teams and organizations with complex territorial data",
    build: {
      id: "what-we-build",
      heading: "What we build",
      points: [
        "Interactive map viewers built with Mapbox, Leaflet or OpenLayers",
        "Integration of complex data layers",
        "Drawing tools",
        "In-browser spatial analysis",
        "Advanced filtering",
      ],
    },
    live: {
      id: "viewers-in-use",
      heading: "Viewers already in use",
      items: {
        acggp: {
          title: "Visor PPR ACGGP",
          text: "Web GIS viewer for ACGGP's Programa de Pedagogía Regional (PPR), used to explore regional information with layers, filters and territorial context.",
        },
        mrv: {
          title: "Departmental emissions viewer · MRV module",
          text: "The MRV module of the mining and energy sector's climate information system includes a geographic viewer with a departmental reading, alongside the emissions and intensity dashboards.",
        },
        me: {
          title: "Territorial and energy-infrastructure viewers · M&E module",
          text: "The M&E module includes a territorial viewer of hazard, vulnerability and risk across the country's municipalities and a viewer over mining and energy infrastructure.",
        },
      },
      note: "The MRV and M&E viewers are part of institutional systems with no public access. This page describes GearsMap's implementation work; it is not an official publication of the Ministry of Mines and Energy and does not imply institutional endorsement.",
      screenshotAlt: "Visor PPR ACGGP: a map of Colombia with the Programa de Pedagogía Regional points and a side panel of indicators.",
      openApp: "Open the viewer",
      caseStudy: "Read the case study",
      module: "Read the module",
      newTab: "(opens in a new tab)",
    },
    process: { id: "how-we-work" },
    tech: { id: "technologies", heading: "Technologies", items: technologies },
    faq: {
      id: "faq",
      heading: "Frequently asked questions",
      items: [
        {
          question: "What is a web GIS viewer?",
          answer: "It is a web map application that brings together layers of geographic information so they can be queried, filtered and analyzed in the browser. It turns scattered data into a map the team can use, with territorial context and download.",
        },
        {
          question: "Which technologies do you use to build web GIS viewers?",
          answer: "We build the viewers with Mapbox, Leaflet or OpenLayers, and work with QGIS, PostgreSQL, React, Next.js and Python to prepare the data, serve it and build the interface.",
        },
        {
          question: "Do you have web GIS viewers in production?",
          answer: "Yes. The Visor PPR ACGGP is in production at acggp.gearsmap.com. It is a web GIS viewer for ACGGP's Programa de Pedagogía Regional (PPR), used to explore regional information with layers, filters and territorial context.",
        },
        {
          question: "Do you build viewers for climate or mining and energy information?",
          answer: "Yes. The operational implementation of the MRV and M&E modules of the mining and energy sector's climate information system, with Colombia's Ministry of Mines and Energy and KfW support, includes a departmental emissions viewer, a territorial hazard, vulnerability and risk viewer, and an energy-infrastructure viewer. They are institutional systems with no public access.",
        },
        {
          question: "What happens after delivery?",
          answer: "We can continue with monitoring and maintenance of the viewer to keep it working well over time.",
        },
      ],
    },
    cta: {
      title: "Does your team have geographic data it still cannot query?",
      body: "Tell us what data you have and which decisions the map should support. We will work out with you how to build the viewer.",
      label: "Talk about a web GIS viewer",
    },
  },
  fr: {
    seoTitle: "Développement de visualiseurs SIG web sur mesure",
    description: "Visualiseurs SIG web sur mesure avec Mapbox, Leaflet ou OpenLayers : couches, filtres, dessin et analyse spatiale dans le navigateur. Équipe à Bogotá.",
    breadcrumbLabel: "Fil d'Ariane",
    home: "Accueil",
    crumb: "Visualiseurs SIG web",
    eyebrow: "Service · Visualiseurs SIG web",
    title: "Développement de visualiseurs SIG web sur mesure",
    lede: "Un visualiseur SIG web transforme des données géographiques dispersées en une carte que l'équipe peut consulter : couches, filtres, contexte territorial et téléchargement. Chez GearsMap, nous les concevons et les construisons sur mesure pour chaque activité.",
    serviceType: "Développement de visualiseurs SIG web",
    audienceType: "Équipes et organisations disposant de données territoriales complexes",
    build: {
      id: "ce-que-nous-construisons",
      heading: "Ce que nous construisons",
      points: [
        "Visualiseurs de cartes interactifs avec Mapbox, Leaflet ou OpenLayers",
        "Intégration de couches de données complexes",
        "Outils de dessin",
        "Analyse spatiale dans le navigateur",
        "Filtrage avancé",
      ],
    },
    live: {
      id: "visualiseurs-en-service",
      heading: "Visualiseurs déjà en service",
      items: {
        acggp: {
          title: "Visor PPR ACGGP",
          text: "Visualiseur SIG web du Programa de Pedagogía Regional (PPR) de l'ACGGP, pour explorer l'information régionale avec des couches, des filtres et le contexte territorial.",
        },
        mrv: {
          title: "Visualiseur départemental des émissions · module MRV",
          text: "Le module MRV du système d'information climatique du secteur minier et énergétique comprend un visualiseur géographique de lecture départementale, à côté des tableaux d'émissions et d'intensité.",
        },
        me: {
          title: "Visualiseurs territorial et d'infrastructure énergétique · module S&E",
          text: "Le module S&E comprend un visualiseur territorial de l'aléa, de la vulnérabilité et du risque sur les municipalités du pays et un visualiseur sur l'infrastructure minière et énergétique.",
        },
      },
      note: "Les visualiseurs MRV et S&E font partie de systèmes institutionnels sans accès public. Cette page décrit le travail de mise en œuvre de GearsMap ; ce n'est pas une publication officielle du Ministère des Mines et de l'Énergie et elle n'implique pas d'aval institutionnel.",
      screenshotAlt: "Visor PPR ACGGP : carte de la Colombie avec les points du Programa de Pedagogía Regional et un panneau latéral d'indicateurs.",
      openApp: "Ouvrir le visualiseur",
      caseStudy: "Voir l'étude de cas",
      module: "Lire le module",
      newTab: "(s'ouvre dans un nouvel onglet)",
    },
    process: { id: "notre-methode" },
    tech: { id: "technologies", heading: "Technologies", items: technologies },
    faq: {
      id: "questions-frequentes",
      heading: "Questions fréquentes",
      items: [
        {
          question: "Qu'est-ce qu'un visualiseur SIG web ?",
          answer: "C'est une application cartographique web qui réunit des couches d'information géographique pour les consulter, les filtrer et les analyser dans le navigateur. Elle transforme des données dispersées en une carte que l'équipe peut utiliser, avec le contexte territorial et le téléchargement.",
        },
        {
          question: "Avec quelles technologies construisez-vous des visualiseurs SIG web ?",
          answer: "Nous construisons les visualiseurs avec Mapbox, Leaflet ou OpenLayers, et nous travaillons avec QGIS, PostgreSQL, React, Next.js et Python pour préparer les données, les servir et construire l'interface.",
        },
        {
          question: "Avez-vous des visualiseurs SIG web en production ?",
          answer: "Oui. Le Visor PPR ACGGP est en production sur acggp.gearsmap.com. C'est un visualiseur SIG web du Programa de Pedagogía Regional (PPR) de l'ACGGP, pour explorer l'information régionale avec des couches, des filtres et le contexte territorial.",
        },
        {
          question: "Faites-vous des visualiseurs pour l'information climatique ou du secteur minier et énergétique ?",
          answer: "Oui. La mise en œuvre opérationnelle des modules MRV et S&E du système d'information climatique du secteur minier et énergétique, avec le Ministère des Mines et de l'Énergie de Colombie et le soutien de la KfW, comprend un visualiseur départemental des émissions, un visualiseur territorial de l'aléa, de la vulnérabilité et du risque et un visualiseur de l'infrastructure énergétique. Ce sont des systèmes institutionnels sans accès public.",
        },
        {
          question: "Que se passe-t-il après la livraison ?",
          answer: "Nous pouvons poursuivre le suivi et la maintenance du visualiseur pour assurer son bon fonctionnement dans le temps.",
        },
      ],
    },
    cta: {
      title: "Votre équipe a-t-elle des données géographiques qu'elle ne peut pas encore consulter ?",
      body: "Dites-nous quelles données vous avez et quelles décisions la carte doit appuyer. Nous verrons avec vous comment construire le visualiseur.",
      label: "Parler d'un visualiseur SIG web",
    },
  },
}

const servicePages: Record<ServicePageKey, Record<Locale, ServicePageCopy>> = {
  geoviewers,
}

export function servicePage(locale: Locale, page: ServicePageKey) {
  return servicePages[page][locale]
}
