import type { Metadata } from "next"
import {
  absoluteUrl,
  contactEmail,
  contentUpdated,
  foundingYear,
  languageAlternates,
  linkedInUrl,
  localePath,
  openGraphLocale,
  organizationId,
  organizationName,
  servicePaths,
  siteName,
  siteUrl,
  taxId,
  websiteId,
} from "@/lib/site"
import { founderRefs } from "@/lib/team-schema"
import { getDictionary, locales, type Locale } from "@/lib/translations"

export { organizationId, websiteId }

const titleSuffix = ` | ${siteName}`
const maxTitleLength = 60

type PageMetadataInput = {
  locale: Locale
  path?: string
  title: string
  description: string
  /** Accepted for compatibility; meta keywords are no longer emitted. */
  keywords?: string[]
  ogType?: "website" | "article"
  /** ISO date; emitted as openGraph.modifiedTime when ogType is "article". */
  modifiedTime?: string
  /** Keeps the page out of search results (legal pages). */
  noindex?: boolean
}

/** Appends " | GearsMap" only when the result stays within 60 characters. */
export function fullPageTitle(title: string) {
  return title.length + titleSuffix.length <= maxTitleLength ? `${title}${titleSuffix}` : title
}

export function pageMetadata({
  locale,
  path = "",
  title,
  description,
  ogType = "website",
  modifiedTime,
  noindex = false,
}: PageMetadataInput): Metadata {
  const pathname = localePath(locale, path)
  const fullTitle = fullPageTitle(title)
  const openGraphType = ogType === "article"
    ? { type: "article" as const, ...(modifiedTime ? { modifiedTime } : {}) }
    : { type: "website" as const }

  return {
    title: { absolute: fullTitle },
    description,
    ...(noindex ? { robots: { index: false, follow: true } } : {}),
    alternates: {
      canonical: pathname,
      languages: languageAlternates(path),
    },
    openGraph: {
      title: fullTitle,
      description,
      url: pathname,
      siteName,
      locale: openGraphLocale(locale),
      alternateLocale: locales.filter((item) => item !== locale).map(openGraphLocale),
      ...openGraphType,
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
    },
  }
}

export function inLanguage(locale: Locale) {
  return locale === "es" ? "es-CO" : locale
}

const knowsAbout: Record<Locale, string[]> = {
  es: [
    "Desarrollo de software a la medida",
    "Ingeniería de software",
    "Diseño UI/UX",
    "Visualización de datos",
    "Bases de datos",
    "Inteligencia artificial",
    "Sistemas de información geográfica",
    "Geovisores",
    "Dashboards",
    "MRV",
    "Monitoreo, reporte y verificación",
    "Monitoreo y evaluación",
    "Inventario de gases de efecto invernadero",
    "Riesgo climático",
    "Sector minero-energético",
  ],
  en: [
    "Custom software development",
    "Software engineering",
    "UI/UX design",
    "Data visualization",
    "Databases",
    "Artificial intelligence",
    "Geographic information systems",
    "Web GIS viewers",
    "Dashboards",
    "MRV",
    "Monitoring, reporting and verification",
    "Monitoring and evaluation",
    "Greenhouse gas inventory",
    "Climate risk",
    "Mining and energy sector",
  ],
  fr: [
    "Développement de logiciels sur mesure",
    "Ingénierie logicielle",
    "Design UI/UX",
    "Visualisation de données",
    "Bases de données",
    "Intelligence artificielle",
    "Systèmes d'information géographique",
    "Visualiseurs cartographiques web",
    "Tableaux de bord",
    "MRV",
    "Suivi, notification et vérification",
    "Suivi et évaluation",
    "Inventaire de gaz à effet de serre",
    "Risque climatique",
    "Secteur minier et énergétique",
  ],
}

const logo = {
  "@type": "ImageObject",
  url: absoluteUrl("/images/gearsmap-logo.png"),
  width: 523,
  height: 477,
}

const colombia = {
  "@type": "Country",
  name: "Colombia",
}

export function organizationNode(locale: Locale = "es") {
  const t = getDictionary(locale)

  return {
    "@type": "Organization",
    "@id": organizationId,
    name: organizationName,
    legalName: organizationName,
    alternateName: siteName,
    description: t.seo.description,
    slogan: t.hero.headline,
    url: `${siteUrl}/`,
    logo,
    image: logo.url,
    email: contactEmail,
    foundingDate: foundingYear,
    taxID: taxId,
    identifier: {
      "@type": "PropertyValue",
      propertyID: "NIT",
      value: taxId,
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Bogotá",
      addressCountry: "CO",
    },
    areaServed: colombia,
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "sales",
        email: contactEmail,
        areaServed: "CO",
        availableLanguage: ["es", "en", "fr"],
      },
    ],
    sameAs: [linkedInUrl],
    founder: founderRefs(),
    knowsAbout: knowsAbout[locale],
    hasOfferCatalog: { "@id": offerCatalogId(locale) },
  }
}

/** The WebSite node is shared by every locale; the argument is accepted for call-site compatibility. */
export function websiteNode(locale?: Locale) {
  return {
    "@type": "WebSite",
    "@id": websiteId,
    name: siteName,
    url: `${siteUrl}/`,
    inLanguage: locale ? [inLanguage(locale), ...locales.filter((item) => item !== locale).map(inLanguage)] : locales.map(inLanguage),
    publisher: { "@id": organizationId },
  }
}

export function webPageNode({
  locale,
  path = "",
  title,
  description,
  dateModified = contentUpdated,
  primaryImage,
}: {
  locale: Locale
  path?: string
  title: string
  description: string
  dateModified?: string
  /** Absolute image URL, emitted as primaryImageOfPage. */
  primaryImage?: { url: string; width?: number; height?: number }
}) {
  const url = absoluteUrl(localePath(locale, path))
  return {
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    url,
    name: title,
    description,
    inLanguage: inLanguage(locale),
    isPartOf: { "@id": websiteId },
    about: { "@id": organizationId },
    publisher: { "@id": organizationId },
    dateModified,
    ...(primaryImage
      ? {
          primaryImageOfPage: {
            "@type": "ImageObject",
            url: primaryImage.url,
            ...(primaryImage.width ? { width: primaryImage.width } : {}),
            ...(primaryImage.height ? { height: primaryImage.height } : {}),
          },
        }
      : {}),
  }
}

export function breadcrumbNode(items: Array<{ name: string; path: string }>) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  }
}

export function faqNode(faqs: Array<{ question: string; answer: string }>) {
  return {
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  }
}

export function serviceNode({
  id,
  name,
  description,
  serviceType,
  audienceType,
  url,
}: {
  id?: string
  name: string
  description: string
  serviceType: string
  /** Localized audience description; the audience node is omitted when absent. */
  audienceType?: string
  url: string
}) {
  return {
    "@type": "Service",
    ...(id ? { "@id": id } : {}),
    name,
    description,
    serviceType,
    url,
    provider: { "@id": organizationId },
    areaServed: colombia,
    ...(audienceType
      ? {
          audience: {
            "@type": "Audience",
            audienceType,
          },
        }
      : {}),
  }
}

export type HomeServiceKey = keyof ReturnType<typeof getDictionary>["portfolio"]["services"]

/** `@id` of a home service. Geoviewers has its own landing page and uses that page's Service node. */
export function homeServiceId(locale: Locale, key: HomeServiceKey) {
  return key === "geoviewers"
    ? `${absoluteUrl(localePath(locale, servicePaths.geoviewers))}#service`
    : `${siteUrl}/${locale}#servicio-${key}`
}

export function offerCatalogId(locale: Locale) {
  return `${siteUrl}/${locale}#servicios`
}

export function offerCatalogNode(locale: Locale) {
  const t = getDictionary(locale)
  const services = Object.entries(t.portfolio.services) as Array<[HomeServiceKey, { title: string; desc: string }]>

  return {
    "@type": "OfferCatalog",
    "@id": offerCatalogId(locale),
    name: t.portfolio.header,
    itemListElement: services.map(([key, service]) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        "@id": homeServiceId(locale, key),
        name: service.title,
        description: service.desc,
        provider: { "@id": organizationId },
        areaServed: colombia,
      },
    })),
  }
}

export function structuredData(graph: object[]) {
  return {
    "@context": "https://schema.org",
    "@graph": graph,
  }
}
