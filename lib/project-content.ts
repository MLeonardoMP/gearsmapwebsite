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
  built?: Array<{ title: string; text: string }>
  challenge: Pending<string[]>
  outcome: Pending<string[]>
  mediaAlt?: string
  caption?: string
  note?: string
  facts?: ProjectFactsCopy
}

// Day-0 subset of the projects UI copy. WS2 extends this type
// (groups, cta, ctaBand, newTab, diagram, facts labels, method steps...).
export type ProjectsUi = {
  eyebrow: string
  title: string
  subtitle: string
  status: { live: string; operational: string; inDevelopment: string }
  index: { seoTitle: string; description: string; h1: string }
}

// Titles and summaries match the former translations gallery.project1..5.
// WS2 fills the ACGGP case copy and the MRV / M&E facts.
export const projectCopy: Record<Locale, Record<ProjectKey, ProjectCopy>> = {
  es: {
    acggp: {
      title: "Visor PPR ACGGP",
      kicker: "ACGGP · Geovisor · Sector minero-energético",
      summary: "Un geovisor para explorar información regional con capas, filtros y contexto territorial.",
      topics: ["Geovisor", "Indicadores", "Territorio"],
      challenge: null,
      outcome: null,
    },
    mrv: {
      title: "MRV · Monitoreo, Reporte y Verificación",
      kicker: "MinMinas · apoyo de KfW · Mitigación",
      summary: "Implementación operativa para organizar y visualizar indicadores y emisiones del sector minero-energético, con MinMinas y apoyo de KfW.",
      topics: ["Inventario de GEI", "PIGCCme 2050", "Tableros"],
      challenge: null,
      outcome: null,
    },
    me: {
      title: "M&E · Monitoreo y Evaluación",
      kicker: "MinMinas · apoyo de KfW · Adaptación",
      summary: "Implementación operativa para leer amenaza, vulnerabilidad y riesgo climático, con MinMinas y apoyo de KfW.",
      topics: ["Riesgo climático", "CMIP6", "Visor territorial"],
      challenge: null,
      outcome: null,
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
      challenge: null,
      outcome: null,
    },
    mrv: {
      title: "MRV · Monitoring, Reporting and Verification",
      kicker: "MinMinas · KfW support · Mitigation",
      summary: "Operational implementation to organize and visualize indicators and emissions for the mining and energy sector, with MinMinas and KfW support.",
      topics: ["GHG inventory", "PIGCCme 2050", "Dashboards"],
      challenge: null,
      outcome: null,
    },
    me: {
      title: "M&E · Monitoring and Evaluation",
      kicker: "MinMinas · KfW support · Adaptation",
      summary: "Operational implementation to read climate hazard, vulnerability, and risk, with MinMinas and KfW support.",
      topics: ["Climate risk", "CMIP6", "Territorial viewer"],
      challenge: null,
      outcome: null,
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
      challenge: null,
      outcome: null,
    },
    mrv: {
      title: "MRV · Suivi, notification et vérification",
      kicker: "MinMinas · soutien de la KfW · Atténuation",
      summary: "Mise en œuvre opérationnelle pour organiser et visualiser les indicateurs et les émissions du secteur minier et énergétique, avec MinMinas et le soutien de KfW.",
      topics: ["Inventaire de GES", "PIGCCme 2050", "Tableaux de bord"],
      challenge: null,
      outcome: null,
    },
    me: {
      title: "S&E · Suivi et évaluation",
      kicker: "MinMinas · soutien de la KfW · Adaptation",
      summary: "Mise en œuvre opérationnelle pour lire l'aléa, la vulnérabilité et le risque climatique, avec MinMinas et le soutien de KfW.",
      topics: ["Risque climatique", "CMIP6", "Visualiseur territorial"],
      challenge: null,
      outcome: null,
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
    index: {
      seoTitle: "Proyectos de software geoespacial y clima",
      description: "Proyectos de GearsMap: el Visor PPR ACGGP en producción y los módulos MRV y M&E del sistema de información climática minero-energético.",
      h1: "Proyectos",
    },
  },
  en: {
    eyebrow: "Projects",
    title: "Featured projects",
    subtitle: "Solutions built to turn complex data into clearer operations.",
    status: { live: "In production", operational: "Operational implementation", inDevelopment: "In development" },
    index: {
      seoTitle: "Geospatial and climate software projects",
      description: "GearsMap projects: the PPR ACGGP Viewer in production and the MRV and M&E modules of the mining and energy climate information system.",
      h1: "Projects",
    },
  },
  fr: {
    eyebrow: "Projets",
    title: "Projets en vedette",
    subtitle: "Des solutions conçues pour transformer des données complexes en opérations plus claires.",
    status: { live: "En production", operational: "Mise en œuvre opérationnelle", inDevelopment: "En développement" },
    index: {
      seoTitle: "Projets de logiciels géospatiaux et climat",
      description: "Projets de GearsMap : le Visualiseur PPR ACGGP en production et les modules MRV et S&E du système d'information climatique minier et énergétique.",
      h1: "Projets",
    },
  },
}

export function projectStatusLabel(locale: Locale, status: ProjectStatus) {
  const labels = projectsUi[locale].status
  if (status === "live") return labels.live
  if (status === "operational") return labels.operational
  return labels.inDevelopment
}
