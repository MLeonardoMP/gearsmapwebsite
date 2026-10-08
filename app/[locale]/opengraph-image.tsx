import { ogCardMetadata, ogLocale, renderOgCard, type OgRouteParams } from "@/lib/og-card"
import { getDictionary, type Locale } from "@/lib/translations"

const kickers: Record<Locale, string> = {
  es: "SOFTWARE GEOESPACIAL",
  en: "GEOSPATIAL SOFTWARE",
  fr: "LOGICIEL GÉOSPATIAL",
}

export function generateImageMetadata({ params }: { params: OgRouteParams }) {
  return ogCardMetadata(getDictionary(ogLocale(params.locale)).hero.headline)
}

export default async function Image({
  params,
}: {
  params: Promise<OgRouteParams>
  id: Promise<string | number>
}) {
  const locale = ogLocale((await params).locale)
  return renderOgCard(getDictionary(locale).hero.headline, kickers[locale])
}
