import type { Metadata } from "next"
import {
  absoluteUrl,
  contactEmail,
  languageAlternates,
  linkedInUrl,
  openGraphLocale,
  organizationId,
  organizationName,
  siteName,
  siteUrl,
  websiteId,
} from "@/lib/site"
import { founderRefs } from "@/lib/team-schema"
import type { Locale } from "@/lib/translations"

export { organizationId, websiteId }

type PageMetadataInput = {
  locale: Locale
  path?: string
  title: string
  description: string
  keywords?: string[]
  ogType?: "website" | "article"
  /** ISO date; emitted as openGraph.modifiedTime when ogType is "article". */
  modifiedTime?: string
}

export function pageMetadata({
  locale,
  path = "",
  title,
  description,
  keywords,
  ogType = "website",
  modifiedTime,
}: PageMetadataInput): Metadata {
  const pathname = path ? `/${locale}${path}` : `/${locale}`
  const fullTitle = `${title} | ${siteName}`
  const openGraphType = ogType === "article"
    ? { type: "article" as const, ...(modifiedTime ? { modifiedTime } : {}) }
    : { type: "website" as const }

  return {
    title: { absolute: fullTitle },
    description,
    keywords,
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
      ...openGraphType,
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
    },
  }
}

export function organizationNode() {
  return {
    "@type": ["Organization", "ProfessionalService"],
    "@id": organizationId,
    name: organizationName,
    legalName: organizationName,
    url: siteUrl,
    logo: absoluteUrl("/images/gearsmap-logo.png"),
    image: absoluteUrl("/images/gearsmap-logo.png"),
    email: contactEmail,
    foundingDate: "2025",
    taxID: "901943973",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Bogotá",
      addressCountry: "CO",
    },
    areaServed: {
      "@type": "Country",
      name: "Colombia",
    },
    sameAs: [linkedInUrl],
    founder: founderRefs(),
    knowsAbout: [
      "Software geoespacial",
      "Sistemas de información geográfica",
      "Geovisores",
      "Inteligencia artificial",
      "Visualización de datos",
      "Dashboards",
      "MRV",
      "Monitoreo, reporte y verificación",
      "Monitoreo y evaluación",
      "Inventario de gases de efecto invernadero",
      "Riesgo climático",
      "Sector minero-energético",
    ],
  }
}

export function websiteNode(locale: Locale) {
  return {
    "@type": "WebSite",
    "@id": websiteId,
    name: siteName,
    url: siteUrl,
    inLanguage: ["es-CO", "en", "fr"],
    publisher: { "@id": organizationId },
    mainEntityOfPage: absoluteUrl(`/${locale}`),
  }
}

export function webPageNode({
  locale,
  path = "",
  title,
  description,
}: {
  locale: Locale
  path?: string
  title: string
  description: string
}) {
  const url = absoluteUrl(path ? `/${locale}${path}` : `/${locale}`)
  return {
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    url,
    name: title,
    description,
    inLanguage: locale === "es" ? "es-CO" : locale,
    isPartOf: { "@id": websiteId },
    about: { "@id": organizationId },
    publisher: { "@id": organizationId },
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
  url,
}: {
  id?: string
  name: string
  description: string
  serviceType: string
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
    areaServed: {
      "@type": "Country",
      name: "Colombia",
    },
    audience: {
      "@type": "Audience",
      audienceType: "Equipos técnicos del sector minero-energético y organizaciones con datos territoriales complejos",
    },
  }
}

export function structuredData(graph: object[]) {
  return {
    "@context": "https://schema.org",
    "@graph": graph,
  }
}
