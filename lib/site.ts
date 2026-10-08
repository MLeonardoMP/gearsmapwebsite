import type { Locale } from "@/lib/translations"

export const siteUrl = "https://gearsmap.com"
export const siteName = "GearsMap"
export const organizationName = "GearsMap S.A.S."
export const contactEmail = "gearsmap@gearsmap.com"
export const linkedInUrl = "https://www.linkedin.com/company/gearsmap"
export const contentUpdated = "2026-10-04"

export const climatePaths = {
  hub: "/sistemas-climaticos",
  mrv: "/sistemas-climaticos/mrv",
  me: "/sistemas-climaticos/monitoreo-y-evaluacion",
} as const

export type ClimatePageKey = keyof typeof climatePaths

export function localePath(locale: Locale, path = "") {
  return path ? `/${locale}${path}` : `/${locale}`
}

export function absoluteUrl(path: string) {
  return new URL(path, siteUrl).toString()
}

export function climateHref(locale: Locale, page: ClimatePageKey) {
  return localePath(locale, climatePaths[page])
}

export function languageAlternates(path = "") {
  return {
    es: localePath("es", path),
    en: localePath("en", path),
    fr: localePath("fr", path),
    "x-default": localePath("es", path),
  }
}

export function openGraphLocale(locale: Locale) {
  if (locale === "es") return "es_CO"
  if (locale === "fr") return "fr_FR"
  return "en_US"
}
