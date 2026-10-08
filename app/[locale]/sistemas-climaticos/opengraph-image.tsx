import { climatePage } from "@/lib/climate"
import { ogContentType, ogSize, renderOgCard } from "@/lib/og-card"
import { isLocale } from "@/lib/translations"

export const alt = "Sistemas climáticos MRV y M&E"
export const size = ogSize
export const contentType = ogContentType

export default async function Image({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const value = isLocale(locale) ? locale : "es"
  const page = climatePage(value, "hub")
  return renderOgCard(page.title, page.eyebrow)
}
