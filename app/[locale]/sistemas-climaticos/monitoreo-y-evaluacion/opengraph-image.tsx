import { climatePage } from "@/lib/climate"
import { ogCardMetadata, ogLocale, renderOgCard, type OgRouteParams } from "@/lib/og-card"

export function generateImageMetadata({ params }: { params: OgRouteParams }) {
  return ogCardMetadata(climatePage(ogLocale(params.locale), "me").title)
}

export default async function Image({
  params,
}: {
  params: Promise<OgRouteParams>
  id: Promise<string | number>
}) {
  const page = climatePage(ogLocale((await params).locale), "me")
  return renderOgCard(page.title, page.eyebrow)
}
