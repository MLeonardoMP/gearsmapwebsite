import { readFileSync } from "node:fs"
import { join } from "node:path"
import { ogContentType, ogSize, renderOgCard } from "@/lib/og-card"
import { projectCopy, projectStatusLabel } from "@/lib/project-content"
import { getProject } from "@/lib/projects"
import { isLocale, type Locale } from "@/lib/translations"

// Read once at module scope (a predictable value), so the card can be prerendered.
const screenshotData = readFileSync(join(process.cwd(), "public/images/acggp_visor.png"), "base64")
const screenshot = `data:image/png;base64,${screenshotData}`

function localeOf(value: string | undefined): Locale {
  return value && isLocale(value) ? value : "es"
}

export function generateImageMetadata({ params }: { params: { locale: string } }) {
  const copy = projectCopy[localeOf(params?.locale)].acggp
  return [
    {
      id: "card",
      alt: `${copy.title} — GearsMap`,
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
  const value = localeOf(locale)
  const project = getProject("acggp")
  const copy = projectCopy[value].acggp
  return renderOgCard(copy.title, copy.kicker, {
    image: screenshot,
    status: projectStatusLabel(value, project.status),
  })
}
