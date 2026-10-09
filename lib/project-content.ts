import type { Pending, ProjectKey, ProjectStatus } from "@/lib/projects"
import type { Locale } from "@/lib/translations"

export type ProjectFactsCopy = {
  type: string
  role?: string
  framework?: string
  coverage?: string
}

export type ProjectCopy = {
  title: string
  kicker: string
  summary: string
  topics: string[]
  seoTitle?: string
  description?: string
  lede?: string
  context?: { heading: string; text: string }
  builtTitle?: string
  built?: Array<{ title: string; text: string }>
  challenge: Pending<string[]>
  outcome: Pending<string[]>
  mediaAlt?: string
  caption?: string
  note?: string
  facts?: ProjectFactsCopy
}

type MethodPage = "mrv" | "me"

export type ProjectsUi = {
  eyebrow: string
  title: string
  subtitle: string
  status: { live: string; operational: string; inDevelopment: string }
  groups: { climateLabel: string; climateText: string; exploration: string; explorationText: string }
  cta: {
    viewCase: string
    openLive: string
    demo: string
    similar: string
    useCase: string
    seeAll: string
    climateHub: string
  }
  ctaBand: { title: string; description: string; label: string }
  newTab: string
  diagram: string
  facts: {
    title: string
    counterpart: string
    supporters: string
    type: string
    status: string
    period: string
    role: string
    framework: string
    coverage: string
    stack: string
    services: string
    link: string
  }
  /** Case-study section headings; each section renders only when its copy is non-null. */
  caseSections: { challenge: string; outcome: string }
  onThisPage: string
  updated: string
  related: { allProjects: string; geoviewers: string; other: string }
  breadcrumbHome: string
  index: { seoTitle: string; description: string; h1: string; lede: string }
  method: Record<MethodPage, string[]>
}

// Titles and summaries match the former translations gallery.project1..5
// (FR M&E title is "S&E"). Owner-only fields stay null and render nothing.
export const projectCopy: Record<Locale, Record<ProjectKey, ProjectCopy>> = {
  es: {
    acggp: {
      title: "Visor PPR ACGGP",
      kicker: "ACGGP · Geovisor · Sector minero-energético",
      summary: "Un geovisor para explorar información regional con capas, filtros y contexto territorial.",
      topics: ["Geovisor", "Indicadores", "Territorio"],
      seoTitle: "Visor PPR ACGGP: geovisor del Programa de Pedagogía Regional",
      description: "Geovisor en producción para el Programa de Pedagogía Regional (PPR) de ACGGP: mapa de Colombia, selector territorial e indicadores del programa.",
      lede: "Un geovisor público para el Programa de Pedagogía Regional (PPR) de ACGGP. Reúne sobre el mapa de Colombia la presencia territorial del programa y sus indicadores, con capas, filtros y contexto territorial.",
      context: {
        heading: "El programa",
        text: "El PPR se presenta como un programa que comparte saberes a través del diálogo y construye relaciones de confianza alrededor de proyectos minero-energéticos sostenibles en los territorios. El visor muestra ese trabajo sobre el mapa.",
      },
      builtTitle: "Qué construimos",
      built: [
        { title: "Mapa nacional", text: "Las ubicaciones del programa sobre el mapa de Colombia, con leyenda plegable y regreso a la vista inicial." },
        { title: "Selector territorial", text: "La lectura parte del total nacional y se acota por territorio." },
        { title: "Dos lecturas", text: "Pestañas para el impacto del programa y para la producción de petróleo y gas." },
        { title: "Indicadores en tarjetas", text: "Personas impactadas, municipios, actividades pedagógicas y aliados, legibles de un vistazo." },
        { title: "Capas y ubicaciones", text: "Herramientas para activar capas y recorrer los puntos del programa." },
        { title: "Cartografía abierta", text: "Mapa base construido con datos de OpenStreetMap y CARTO." },
      ],
      challenge: null,
      outcome: null,
      mediaAlt: "Captura del Visor PPR ACGGP: mapa de Colombia con las ubicaciones del programa y un panel lateral con indicadores de impacto.",
      caption: "Visor PPR ACGGP en producción (versión 1.2 en la captura). Las cifras pertenecen al programa y cambian en la fuente.",
      note: "Esta página describe el trabajo de GearsMap. Las cifras y contenidos del visor pertenecen a ACGGP y se consultan directamente en el visor.",
    },
    mrv: {
      title: "MRV · Monitoreo, Reporte y Verificación",
      kicker: "MinMinas · apoyo de KfW · Mitigación",
      summary: "Implementación operativa para organizar y visualizar indicadores y emisiones del sector minero-energético, con MinMinas y apoyo de KfW.",
      topics: ["Inventario de GEI", "PIGCCme 2050", "Tableros"],
      challenge: null,
      outcome: null,
      facts: {
        type: "Módulo MRV del sistema de información climática",
        role: "Implementación operativa del módulo",
        framework: "IPCC 2006 · PIGCCme 2050",
        coverage: "Lectura departamental y por línea del sector",
      },
    },
    me: {
      title: "M&E · Monitoreo y Evaluación",
      kicker: "MinMinas · apoyo de KfW · Adaptación",
      summary: "Implementación operativa para leer amenaza, vulnerabilidad y riesgo climático, con MinMinas y apoyo de KfW.",
      topics: ["Riesgo climático", "CMIP6", "Visor territorial"],
      challenge: null,
      outcome: null,
      facts: {
        type: "Módulo M&E del sistema de información climática",
        role: "Implementación operativa del módulo",
        framework: "IPCC AR6 · CMIP6 (SSP2-4.5, SSP3-7.0)",
        coverage: "1.121 municipios, cuencas e infraestructura del sector",
      },
    },
    agricultural: {
      title: "Análisis agrícola",
      kicker: "Agricultura · Satelital",
      summary: "Monitoreo de cultivos satelital para detectar patrones y apoyar decisiones de campo.",
      topics: ["Satelital", "IA"],
      challenge: null,
      outcome: null,
    },
    fleet: {
      title: "Gestión de flotas",
      kicker: "Logística · Tiempo real",
      summary: "Concepto de operación en tiempo real para optimizar rutas logísticas y recursos.",
      topics: ["IoT", "Tiempo real"],
      challenge: null,
      outcome: null,
    },
  },
  en: {
    acggp: {
      title: "PPR ACGGP Viewer",
      kicker: "ACGGP · Geoviewer · Mining and energy sector",
      summary: "A geoviewer for exploring regional information with layers, filters, and territorial context.",
      topics: ["Geoviewer", "Indicators", "Territory"],
      seoTitle: "PPR ACGGP Viewer: Regional Pedagogy Program geoviewer",
      description: "Production geoviewer for ACGGP's Regional Pedagogy Program (PPR): a map of Colombia, a territorial selector, and program indicators.",
      lede: "A public geoviewer for ACGGP's Regional Pedagogy Program (Programa de Pedagogía Regional, PPR). It brings the program's territorial presence and indicators onto the map of Colombia, with layers, filters, and territorial context.",
      context: {
        heading: "The program",
        text: "The PPR describes itself as sharing knowledge through dialogue and building trust around sustainable mining and energy projects in the territories. The viewer shows that work on the map.",
      },
      builtTitle: "What we built",
      built: [
        { title: "National map", text: "The program's locations on the map of Colombia, with a collapsible legend and a reset to the initial view." },
        { title: "Territorial selector", text: "The reading starts from the national total and narrows by territory." },
        { title: "Two readings", text: "Tabs for the program's impact and for oil and gas production." },
        { title: "Indicator cards", text: "People reached, municipalities, pedagogical activities, and allies, readable at a glance." },
        { title: "Layers and locations", text: "Tools to switch layers and explore the program's sites." },
        { title: "Open cartography", text: "A basemap built on OpenStreetMap and CARTO data." },
      ],
      challenge: null,
      outcome: null,
      mediaAlt: "Screenshot of the PPR ACGGP Viewer: a map of Colombia with the program's locations and a side panel with impact indicators.",
      caption: "PPR ACGGP Viewer in production (version 1.2 in the capture). Figures belong to the program and change at the source.",
      note: "This page describes GearsMap's work. The viewer's figures and content belong to ACGGP and can be consulted directly in the viewer.",
    },
    mrv: {
      title: "MRV · Monitoring, Reporting and Verification",
      kicker: "MinMinas · KfW support · Mitigation",
      summary: "Operational implementation to organize and visualize indicators and emissions for the mining and energy sector, with MinMinas and KfW support.",
      topics: ["GHG inventory", "PIGCCme 2050", "Dashboards"],
      challenge: null,
      outcome: null,
      facts: {
        type: "MRV module of the climate information system",
        role: "Operational implementation of the module",
        framework: "IPCC 2006 · PIGCCme 2050",
        coverage: "Departmental reading and sector lines",
      },
    },
    me: {
      title: "M&E · Monitoring and Evaluation",
      kicker: "MinMinas · KfW support · Adaptation",
      summary: "Operational implementation to read climate hazard, vulnerability, and risk, with MinMinas and KfW support.",
      topics: ["Climate risk", "CMIP6", "Territorial viewer"],
      challenge: null,
      outcome: null,
      facts: {
        type: "M&E module of the climate information system",
        role: "Operational implementation of the module",
        framework: "IPCC AR6 · CMIP6 (SSP2-4.5, SSP3-7.0)",
        coverage: "1,121 municipalities, basins, and sector infrastructure",
      },
    },
    agricultural: {
      title: "Agricultural analysis",
      kicker: "Agriculture · Satellite",
      summary: "Satellite crop monitoring to detect patterns and support field decisions.",
      topics: ["Satellite", "AI"],
      challenge: null,
      outcome: null,
    },
    fleet: {
      title: "Fleet management",
      kicker: "Logistics · Real time",
      summary: "A real-time operations concept for optimizing logistics routes and resources.",
      topics: ["IoT", "Real time"],
      challenge: null,
      outcome: null,
    },
  },
  fr: {
    acggp: {
      title: "Visualiseur PPR ACGGP",
      kicker: "ACGGP · Géovisualiseur · Secteur minier et énergétique",
      summary: "Un géovisualiseur pour explorer des informations régionales avec des couches, des filtres et un contexte territorial.",
      topics: ["Géovisualiseur", "Indicateurs", "Territoire"],
      seoTitle: "Visualiseur PPR ACGGP du Programme de pédagogie régionale",
      description: "Géovisualiseur en production pour le Programme de pédagogie régionale (PPR) de l'ACGGP : carte de la Colombie, sélecteur territorial et indicateurs.",
      lede: "Un géovisualiseur public pour le Programme de pédagogie régionale (Programa de Pedagogía Regional, PPR) de l'ACGGP. Il réunit sur la carte de la Colombie la présence territoriale du programme et ses indicateurs, avec des couches, des filtres et un contexte territorial.",
      context: {
        heading: "Le programme",
        text: "Le PPR se présente comme un programme qui partage des savoirs par le dialogue et construit des relations de confiance autour de projets miniers et énergétiques durables dans les territoires. Le visualiseur montre ce travail sur la carte.",
      },
      builtTitle: "Ce que nous avons construit",
      built: [
        { title: "Carte nationale", text: "Les sites du programme sur la carte de la Colombie, avec une légende repliable et un retour à la vue initiale." },
        { title: "Sélecteur territorial", text: "La lecture part du total national et se resserre par territoire." },
        { title: "Deux lectures", text: "Des onglets pour l'impact du programme et pour la production de pétrole et de gaz." },
        { title: "Indicateurs en cartes", text: "Personnes touchées, municipalités, activités pédagogiques et alliés, lisibles d'un coup d'œil." },
        { title: "Couches et sites", text: "Des outils pour activer des couches et parcourir les sites du programme." },
        { title: "Cartographie ouverte", text: "Un fond de carte construit avec les données OpenStreetMap et CARTO." },
      ],
      challenge: null,
      outcome: null,
      mediaAlt: "Capture du Visualiseur PPR ACGGP : carte de la Colombie avec les sites du programme et un panneau latéral d'indicateurs d'impact.",
      caption: "Visualiseur PPR ACGGP en production (version 1.2 sur la capture). Les chiffres appartiennent au programme et évoluent à la source.",
      note: "Cette page décrit le travail de GearsMap. Les chiffres et contenus du visualiseur appartiennent à l'ACGGP et se consultent directement dans le visualiseur.",
    },
    mrv: {
      title: "MRV · Suivi, notification et vérification",
      kicker: "MinMinas · soutien de la KfW · Atténuation",
      summary: "Mise en œuvre opérationnelle pour organiser et visualiser les indicateurs et les émissions du secteur minier et énergétique, avec MinMinas et le soutien de KfW.",
      topics: ["Inventaire de GES", "PIGCCme 2050", "Tableaux de bord"],
      challenge: null,
      outcome: null,
      facts: {
        type: "Module MRV du système d'information climatique",
        role: "Mise en œuvre opérationnelle du module",
        framework: "GIEC 2006 · PIGCCme 2050",
        coverage: "Lecture départementale et par ligne du secteur",
      },
    },
    me: {
      title: "S&E · Suivi et évaluation",
      kicker: "MinMinas · soutien de la KfW · Adaptation",
      summary: "Mise en œuvre opérationnelle pour lire l'aléa, la vulnérabilité et le risque climatique, avec MinMinas et le soutien de KfW.",
      topics: ["Risque climatique", "CMIP6", "Visualiseur territorial"],
      challenge: null,
      outcome: null,
      facts: {
        type: "Module S&E du système d'information climatique",
        role: "Mise en œuvre opérationnelle du module",
        framework: "GIEC AR6 · CMIP6 (SSP2-4.5, SSP3-7.0)",
        coverage: "1 121 municipalités, bassins et infrastructures du secteur",
      },
    },
    agricultural: {
      title: "Analyse agricole",
      kicker: "Agriculture · Satellite",
      summary: "Suivi des cultures par satellite pour détecter des tendances et appuyer les décisions de terrain.",
      topics: ["Satellite", "IA"],
      challenge: null,
      outcome: null,
    },
    fleet: {
      title: "Gestion de flotte",
      kicker: "Logistique · Temps réel",
      summary: "Un concept opérationnel en temps réel pour optimiser les itinéraires logistiques et les ressources.",
      topics: ["IoT", "Temps réel"],
      challenge: null,
      outcome: null,
    },
  },
}

export const projectsUi: Record<Locale, ProjectsUi> = {
  es: {
    eyebrow: "Proyectos",
    title: "Proyectos destacados",
    subtitle: "Soluciones construidas para convertir datos complejos en operaciones más claras.",
    status: { live: "En producción", operational: "Implementación operativa", inDevelopment: "En desarrollo" },
    groups: {
      climateLabel: "Sistema de información climática · MinMinas · apoyo de KfW",
      climateText: "Acompañamos la implementación operativa de los módulos MRV y de monitoreo y evaluación del sistema de información climática del sector minero-energético.",
      exploration: "En exploración",
      explorationText: "Líneas que estamos desarrollando. Todavía no son productos en producción.",
    },
    cta: {
      viewCase: "Ver el caso",
      openLive: "Abrir el visor",
      demo: "Solicitar una demo",
      similar: "Conversemos sobre un proyecto similar",
      useCase: "Conversemos sobre este caso de uso",
      seeAll: "Ver todos los proyectos",
      climateHub: "Ver el sistema de información climática",
    },
    ctaBand: {
      title: "¿Tienes un territorio complejo por entender?",
      description: "Cuéntanos dónde están los datos difíciles. Diseñamos la forma de volverlos utilizables.",
      label: "Conversemos",
    },
    newTab: "(se abre en una pestaña nueva)",
    diagram: "Diagrama del método",
    facts: {
      title: "Ficha del proyecto",
      counterpart: "Contraparte",
      supporters: "Con apoyo de",
      type: "Tipo",
      status: "Estado",
      period: "Periodo",
      role: "Rol de GearsMap",
      framework: "Marco",
      coverage: "Cobertura",
      stack: "Tecnologías",
      services: "Servicios relacionados",
      link: "Enlace",
    },
    caseSections: { challenge: "El encargo", outcome: "Resultado" },
    onThisPage: "En esta página",
    updated: "Actualizado",
    related: {
      allProjects: "Todos los proyectos",
      geoviewers: "Geovisores y software geoespacial de GearsMap",
      other: "Otros proyectos",
    },
    breadcrumbHome: "Inicio",
    index: {
      seoTitle: "Proyectos de software geoespacial y clima",
      description: "Proyectos de GearsMap: el Visor PPR ACGGP en producción y los módulos MRV y M&E del sistema de información climática minero-energético.",
      h1: "Proyectos",
      lede: "Soluciones construidas para convertir datos complejos en operaciones más claras: un geovisor en producción, sistemas de información climática y líneas que aún exploramos.",
    },
    method: {
      mrv: [
        "Dato de actividad × Factor de emisión × PCG",
        "Inventario sectorial (gas · combustible · categoría · departamento · año)",
        "Indicadores PIGCCme 2050",
        "Tableros · visor departamental",
      ],
      me: [
        "Amenaza × Vulnerabilidad (sensibilidad · capacidad adaptativa) = Riesgo",
        "Referencia 1990–2021 → SSP2-4.5 / SSP3-7.0 → Δ absoluto y %",
        "Municipios · cuencas · infraestructura",
      ],
    },
  },
  en: {
    eyebrow: "Projects",
    title: "Featured projects",
    subtitle: "Solutions built to turn complex data into clearer operations.",
    status: { live: "In production", operational: "Operational implementation", inDevelopment: "In development" },
    groups: {
      climateLabel: "Climate information system · MinMinas · KfW support",
      climateText: "We supported the operational implementation of the MRV and monitoring-and-evaluation modules of the mining and energy sector's climate information system.",
      exploration: "In exploration",
      explorationText: "Lines we are developing. They are not production products yet.",
    },
    cta: {
      viewCase: "View the case study",
      openLive: "Open the viewer",
      demo: "Request a demo",
      similar: "Talk to us about a similar project",
      useCase: "Talk to us about this use case",
      seeAll: "See all projects",
      climateHub: "See the climate information system",
    },
    ctaBand: {
      title: "Do you have complex territory to understand?",
      description: "Tell us where the difficult data is. We design a way to make it useful.",
      label: "Talk to us",
    },
    newTab: "(opens in a new tab)",
    diagram: "Method diagram",
    facts: {
      title: "Project facts",
      counterpart: "Counterpart",
      supporters: "Supported by",
      type: "Type",
      status: "Status",
      period: "Period",
      role: "GearsMap's role",
      framework: "Framework",
      coverage: "Coverage",
      stack: "Technologies",
      services: "Related services",
      link: "Link",
    },
    caseSections: { challenge: "The brief", outcome: "Outcome" },
    onThisPage: "On this page",
    updated: "Updated",
    related: {
      allProjects: "All projects",
      geoviewers: "GearsMap web GIS viewers and geospatial software",
      other: "Other projects",
    },
    breadcrumbHome: "Home",
    index: {
      seoTitle: "Geospatial and climate software projects",
      description: "GearsMap projects: the PPR ACGGP Viewer in production and the MRV and M&E modules of the mining and energy climate information system.",
      h1: "Projects",
      lede: "Solutions built to turn complex data into clearer operations: a geoviewer in production, climate information systems, and lines we are still exploring.",
    },
    method: {
      mrv: [
        "Activity data × Emission factor × GWP",
        "Sectoral inventory (gas · fuel · category · department · year)",
        "PIGCCme 2050 indicators",
        "Dashboards · departmental viewer",
      ],
      me: [
        "Hazard × Vulnerability (sensitivity · adaptive capacity) = Risk",
        "Baseline 1990–2021 → SSP2-4.5 / SSP3-7.0 → absolute and % Δ",
        "Municipalities · basins · infrastructure",
      ],
    },
  },
  fr: {
    eyebrow: "Projets",
    title: "Projets en vedette",
    subtitle: "Des solutions conçues pour transformer des données complexes en opérations plus claires.",
    status: { live: "En production", operational: "Mise en œuvre opérationnelle", inDevelopment: "En développement" },
    groups: {
      climateLabel: "Système d'information climatique · MinMinas · soutien de la KfW",
      climateText: "Nous avons accompagné la mise en œuvre opérationnelle des modules MRV et de suivi et évaluation du système d'information climatique du secteur minier et énergétique.",
      exploration: "En exploration",
      explorationText: "Des pistes que nous développons. Ce ne sont pas encore des produits en production.",
    },
    cta: {
      viewCase: "Voir l'étude de cas",
      openLive: "Ouvrir le visualiseur",
      demo: "Demander une démo",
      similar: "Parlons d'un projet similaire",
      useCase: "Parlons de ce cas d'usage",
      seeAll: "Voir tous les projets",
      climateHub: "Voir le système d'information climatique",
    },
    ctaBand: {
      title: "Un territoire complexe à comprendre ?",
      description: "Dites-nous où se trouvent les données difficiles. Nous concevons une façon de les rendre utiles.",
      label: "Parlons-en",
    },
    newTab: "(s'ouvre dans un nouvel onglet)",
    diagram: "Schéma de la méthode",
    facts: {
      title: "Fiche du projet",
      counterpart: "Contrepartie",
      supporters: "Avec le soutien de",
      type: "Type",
      status: "Statut",
      period: "Période",
      role: "Rôle de GearsMap",
      framework: "Cadre",
      coverage: "Couverture",
      stack: "Technologies",
      services: "Services associés",
      link: "Lien",
    },
    caseSections: { challenge: "La commande", outcome: "Résultat" },
    onThisPage: "Sur cette page",
    updated: "Mis à jour",
    related: {
      allProjects: "Tous les projets",
      geoviewers: "SIG web et logiciels géospatiaux de GearsMap",
      other: "Autres projets",
    },
    breadcrumbHome: "Accueil",
    index: {
      seoTitle: "Projets de logiciels géospatiaux et climat",
      description: "Projets de GearsMap : le Visualiseur PPR ACGGP en production et les modules MRV et S&E du système d'information climatique minier et énergétique.",
      h1: "Projets",
      lede: "Des solutions conçues pour transformer des données complexes en opérations plus claires : un géovisualiseur en production, des systèmes d'information climatique et des pistes encore en exploration.",
    },
    method: {
      mrv: [
        "Donnée d'activité × Facteur d'émission × PRG",
        "Inventaire sectoriel (gaz · combustible · catégorie · département · année)",
        "Indicateurs PIGCCme 2050",
        "Tableaux de bord · visualiseur départemental",
      ],
      me: [
        "Aléa × Vulnérabilité (sensibilité · capacité d'adaptation) = Risque",
        "Référence 1990–2021 → SSP2-4.5 / SSP3-7.0 → Δ absolu et %",
        "Municipalités · bassins · infrastructures",
      ],
    },
  },
}

export function projectStatusLabel(locale: Locale, status: ProjectStatus) {
  const labels = projectsUi[locale].status
  if (status === "live") return labels.live
  if (status === "operational") return labels.operational
  return labels.inDevelopment
}
