import { climatePage } from "@/lib/climate"
import { ogContentType, ogSize, renderOgCard } from "@/lib/og-card"
import { isLocale } from "@/lib/translations"

export const alt = "Monitoreo y evaluación del riesgo climático"
export const size = ogSize
export const contentType = ogContentType

export default async function Image({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const value = isLocale(locale) ? locale : "es"
  const page = climatePage(value, "me")
  return renderOgCard(page.title, page.eyebrow)
}
