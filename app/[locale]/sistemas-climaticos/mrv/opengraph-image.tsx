import { climatePage } from "@/lib/climate"
import { ogCardMetadata, ogLocale, renderOgCard, type OgRouteParams } from "@/lib/og-card"

export function generateImageMetadata({ params }: { params: OgRouteParams }) {
  return ogCardMetadata(climatePage(ogLocale(params.locale), "mrv").title)
}

export default async function Image({
  params,
}: {
  params: Promise<OgRouteParams>
  id: Promise<string | number>
}) {
  const page = climatePage(ogLocale((await params).locale), "mrv")
  return renderOgCard(page.title, page.eyebrow)
}
