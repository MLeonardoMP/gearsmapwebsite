import { climatePage, getClimate, type ClimatePageKey } from "@/lib/climate"
import {
  breadcrumbNode,
  faqNode,
  inLanguage,
  organizationNode,
  serviceNode,
  webPageNode,
  websiteNode,
} from "@/lib/seo"
import { absoluteUrl, climateHref, climatePaths, contentUpdated } from "@/lib/site"
import type { Locale } from "@/lib/translations"

type ServiceCopy = {
  audienceType: string
  serviceType: Record<ClimatePageKey, string>
}

const serviceCopy: Record<Locale, ServiceCopy> = {
  es: {
    audienceType: "Equipos técnicos del sector minero-energético y organizaciones con datos territoriales complejos",
    serviceType: {
      hub: "Sistemas de información climática",
      mrv: "Monitoreo, reporte y verificación (MRV) de emisiones",
      me: "Monitoreo y evaluación (M&E) del riesgo climático",
    },
  },
  en: {
    audienceType: "Technical teams in the mining and energy sector and organizations with complex territorial data",
    serviceType: {
      hub: "Climate information systems",
      mrv: "Monitoring, reporting and verification (MRV) of emissions",
      me: "Climate-risk monitoring and evaluation (M&E)",
    },
  },
  fr: {
    audienceType: "Équipes techniques du secteur minier et énergétique et organisations disposant de données territoriales complexes",
    serviceType: {
      hub: "Systèmes d'information climatique",
      mrv: "Suivi, notification et vérification (MRV) des émissions",
      me: "Suivi et évaluation (S&E) du risque climatique",
    },
  },
}

/** Visible and JSON-LD breadcrumb trail for a climate page. */
export function climateCrumbs(locale: Locale, page: ClimatePageKey) {
  const copy = getClimate(locale)
  const current = climatePage(locale, page)
  const pagePath = climateHref(locale, page)

  return page === "hub"
    ? [
        { name: copy.home, path: `/${locale}` },
        { name: current.title, path: pagePath },
      ]
    : [
        { name: copy.home, path: `/${locale}` },
        { name: copy.hub.title, path: climateHref(locale, "hub") },
        { name: current.title, path: pagePath },
      ]
}

/** Absolute URL of a climate page. */
export function climatePageUrl(locale: Locale, page: ClimatePageKey) {
  return absoluteUrl(climateHref(locale, page))
}

/** `@id` of the Service node a climate page emits; WS2's climateCaseNode references it. */
export function climateServiceId(locale: Locale, page: ClimatePageKey) {
  return `${climatePageUrl(locale, page)}#service`
}

function definedTermSetNode(locale: Locale, page: ClimatePageKey) {
  const current = climatePage(locale, page)
  const id = `${climatePageUrl(locale, page)}#terms`

  return {
    "@type": "DefinedTermSet",
    "@id": id,
    name: current.factsTitle,
    inLanguage: inLanguage(locale),
    hasDefinedTerm: current.facts.map((fact) => ({
      "@type": "DefinedTerm",
      name: fact.term,
      description: fact.detail,
      inDefinedTermSet: { "@id": id },
    })),
  }
}

/** JSON-LD node array for a climate page. Wrap with structuredData() before rendering. */
export function climatePageGraph(locale: Locale, page: ClimatePageKey): object[] {
  const current = climatePage(locale, page)
  const copy = serviceCopy[locale]

  return [
    organizationNode(locale),
    websiteNode(locale),
    webPageNode({
      locale,
      path: climatePaths[page],
      title: current.seoTitle,
      description: current.description,
      dateModified: contentUpdated,
    }),
    breadcrumbNode(climateCrumbs(locale, page)),
    faqNode(current.faqs),
    serviceNode({
      id: climateServiceId(locale, page),
      name: current.seoTitle,
      description: current.description,
      serviceType: copy.serviceType[page],
      audienceType: copy.audienceType,
      url: climatePageUrl(locale, page),
    }),
    definedTermSetNode(locale, page),
  ]
}
