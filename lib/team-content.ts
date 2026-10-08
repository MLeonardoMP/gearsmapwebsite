import type { TeamRoleKey } from "@/lib/team"
import type { Locale } from "@/lib/translations"

export type TeamRoleCopy = {
  short: string
  title: string
  focus: string
  summary: string
}

// Day-0 subset: only the fields lib/team-schema.ts needs.
// WS3 extends this type (eyebrow, title, subtitle, labels, cta, bios...).
export type TeamCopy = {
  roles: Record<TeamRoleKey, TeamRoleCopy>
}

export const teamCopy: Record<Locale, TeamCopy> = {
  es: {
    roles: {
      ceo: {
        short: "CEO",
        title: "Director ejecutivo",
        focus: "Estrategia y visión",
        summary: "Define la estrategia y la visión de GearsMap: qué retos territoriales abordamos y cómo cada proyecto se traduce en decisiones mejor informadas.",
      },
      cpo: {
        short: "CPO",
        title: "Director de producto",
        focus: "Producto e innovación",
        summary: "Lidera el producto y la innovación: convierte preguntas complejas sobre el territorio en geovisores, tableros y flujos que los equipos pueden usar.",
      },
      cdo: {
        short: "CDO",
        title: "Director de datos",
        focus: "Ciencia de datos e IA",
        summary: "Dirige la ciencia de datos y la inteligencia artificial: modelos, análisis geoespacial y automatización para extraer valor de los datos territoriales.",
      },
      cco: {
        short: "CCO",
        title: "Director comercial",
        focus: "Negocios y crecimiento",
        summary: "Impulsa los negocios y el crecimiento: conecta las capacidades de GearsMap con organizaciones que necesitan entender mejor su territorio.",
      },
    },
  },
  en: {
    roles: {
      ceo: {
        short: "CEO",
        title: "Chief Executive Officer",
        focus: "Strategy & vision",
        summary: "Sets GearsMap's strategy and vision: which territorial challenges we take on and how each project turns into better-informed decisions.",
      },
      cpo: {
        short: "CPO",
        title: "Chief Product Officer",
        focus: "Product & innovation",
        summary: "Leads product and innovation, turning complex questions about territory into geoviewers, dashboards and workflows that teams can actually use.",
      },
      cdo: {
        short: "CDO",
        title: "Chief Data Officer",
        focus: "Data science & AI",
        summary: "Leads data science and artificial intelligence: models, geospatial analysis and automation that extract value from territorial data.",
      },
      cco: {
        short: "CCO",
        title: "Chief Commercial Officer",
        focus: "Business & growth",
        summary: "Drives business and growth, connecting GearsMap's capabilities with organizations that need to understand their territory better.",
      },
    },
  },
  fr: {
    roles: {
      ceo: {
        short: "CEO",
        title: "Directeur général",
        focus: "Stratégie et vision",
        summary: "Définit la stratégie et la vision de GearsMap : les enjeux territoriaux que nous abordons et la manière dont chaque projet se traduit en décisions mieux informées.",
      },
      cpo: {
        short: "CPO",
        title: "Directeur produit",
        focus: "Produit et innovation",
        summary: "Pilote le produit et l'innovation : il transforme des questions complexes sur le territoire en géovisualiseurs, tableaux de bord et flux de travail que les équipes peuvent utiliser.",
      },
      cdo: {
        short: "CDO",
        title: "Directeur des données",
        focus: "Science des données et IA",
        summary: "Dirige la science des données et l'intelligence artificielle : modèles, analyse géospatiale et automatisation pour tirer parti des données territoriales.",
      },
      cco: {
        short: "CCO",
        title: "Directeur commercial",
        focus: "Développement commercial et croissance",
        summary: "Porte le développement commercial et la croissance : il relie les capacités de GearsMap aux organisations qui ont besoin de mieux comprendre leur territoire.",
      },
    },
  },
}
