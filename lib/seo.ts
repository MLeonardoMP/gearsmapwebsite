import type { Metadata } from "next"
import {
  absoluteUrl,
  contactEmail,
  languageAlternates,
  linkedInUrl,
  openGraphLocale,
  organizationName,
  siteName,
  siteUrl,
} from "@/lib/site"
import type { Locale } from "@/lib/translations"

type PageMetadataInput = {
  locale: Locale
  path?: string
  title: string
  description: string
  keywords?: string[]
}

export function pageMetadata({
  locale,
  path = "",
  title,
  description,
  keywords,
}: PageMetadataInput): Metadata {
  const pathname = path ? `/${locale}${path}` : `/${locale}`
  const fullTitle = `${title} | ${siteName}`

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
      type: "website",
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
    "@id": `${siteUrl}/#organization`,
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
    "@id": `${siteUrl}/#website`,
    name: siteName,
    url: siteUrl,
    inLanguage: ["es-CO", "en", "fr"],
    publisher: { "@id": `${siteUrl}/#organization` },
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
    isPartOf: { "@id": `${siteUrl}/#website` },
    about: { "@id": `${siteUrl}/#organization` },
    publisher: { "@id": `${siteUrl}/#organization` },
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
  name,
  description,
  serviceType,
  url,
}: {
  name: string
  description: string
  serviceType: string
  url: string
}) {
  return {
    "@type": "Service",
    name,
    description,
    serviceType,
    url,
    provider: { "@id": `${siteUrl}/#organization` },
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
