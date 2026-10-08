import type { Metadata } from "next"
import { ServiceDocument } from "@/components/services/service-document"
import { getLocale } from "@/lib/i18n"
import { pageMetadata } from "@/lib/seo"
import { servicePage } from "@/lib/services"
import { servicePaths } from "@/lib/site"
import { isLocale } from "@/lib/translations"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  if (!isLocale(locale)) return {}
  const page = servicePage(locale, "geoviewers")
  return pageMetadata({
    locale,
    path: servicePaths.geoviewers,
    title: page.seoTitle,
    description: page.description,
  })
}

export default async function GeoviewersPage() {
  const locale = await getLocale()
  return <ServiceDocument locale={locale} page="geoviewers" />
}
