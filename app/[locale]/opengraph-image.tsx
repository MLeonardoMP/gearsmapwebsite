import { ogContentType, ogSize, renderOgCard } from "@/lib/og-card"
import { isLocale } from "@/lib/translations"

export const alt = "GearsMap"
export const size = ogSize
export const contentType = ogContentType

const kickers = {
  es: "SOFTWARE GEOESPACIAL",
  en: "GEOSPATIAL SOFTWARE",
  fr: "LOGICIEL GEOSPATIAL",
}

const titles = {
  es: "Del territorio al dato. Del dato a la decisión.",
  en: "From territory to data. From data to a decision.",
  fr: "Du territoire à la donnée. De la donnée à la décision.",
}

export default async function Image({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const value = isLocale(locale) ? locale : "es"
  return renderOgCard(titles[value], kickers[value])
}
