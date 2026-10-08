import { ogContentType, ogSize, renderOgCard } from "@/lib/og-card"
import { projectsUi } from "@/lib/project-content"
import { isLocale, type Locale } from "@/lib/translations"

function localeOf(value: string | undefined): Locale {
  return value && isLocale(value) ? value : "es"
}

export function generateImageMetadata({ params }: { params: { locale: string } }) {
  const ui = projectsUi[localeOf(params?.locale)]
  return [
    {
      id: "card",
      alt: `${ui.index.seoTitle} — GearsMap`,
      size: ogSize,
      contentType: ogContentType,
    },
  ]
}

export default async function Image({
  params,
}: {
  params: Promise<{ locale: string }>
  id: Promise<string | number>
}) {
  const { locale } = await params
  const ui = projectsUi[localeOf(locale)]
  return renderOgCard(ui.index.seoTitle, ui.eyebrow.toUpperCase())
}
