import { readFile } from "node:fs/promises"
import { join } from "node:path"
import { ogCardMetadata, ogLocale, renderOgCard, type OgRouteParams } from "@/lib/og-card"
import { servicePage } from "@/lib/services"

/** ACGGP screenshot as a data: URL; cached so the card can be prerendered. */
async function screenshotDataUrl() {
  "use cache"
  const screenshot = await readFile(join(process.cwd(), "public/images/acggp_visor.png"))
  return `data:image/png;base64,${screenshot.toString("base64")}`
}

export function generateImageMetadata({ params }: { params: OgRouteParams }) {
  return ogCardMetadata(servicePage(ogLocale(params.locale), "geoviewers").title)
}

export default async function Image({
  params,
}: {
  params: Promise<OgRouteParams>
  id: Promise<string | number>
}) {
  const page = servicePage(ogLocale((await params).locale), "geoviewers")
  return renderOgCard(page.title, page.eyebrow, { image: await screenshotDataUrl() })
}
