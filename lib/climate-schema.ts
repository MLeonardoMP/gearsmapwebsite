import { climatePage, getClimate, type ClimatePageKey } from "@/lib/climate"
import {
  breadcrumbNode,
  faqNode,
  organizationNode,
  serviceNode,
  webPageNode,
  websiteNode,
} from "@/lib/seo"
import { absoluteUrl, climateHref, climatePaths } from "@/lib/site"
import type { Locale } from "@/lib/translations"

// WS4 replaces this with locale-keyed serviceType/audienceType copy.
const serviceTypes: Record<ClimatePageKey, string> = {
  hub: "Climate information systems",
  mrv: "Monitoring, reporting and verification",
  me: "Climate monitoring and evaluation",
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

/** JSON-LD node array for a climate page. Wrap with structuredData() before rendering. */
export function climatePageGraph(locale: Locale, page: ClimatePageKey): object[] {
  const current = climatePage(locale, page)

  return [
    organizationNode(),
    websiteNode(locale),
    webPageNode({
      locale,
      path: climatePaths[page],
      title: current.seoTitle,
      description: current.description,
    }),
    breadcrumbNode(climateCrumbs(locale, page)),
    faqNode(current.faqs),
    serviceNode({
      id: climateServiceId(locale, page),
      name: current.seoTitle,
      description: current.description,
      serviceType: serviceTypes[page],
      url: climatePageUrl(locale, page),
    }),
  ]
}
