import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { ClimateDocument } from "@/components/climate/climate-document"
import { climatePage } from "@/lib/climate"
import { pageMetadata } from "@/lib/seo"
import { climatePaths } from "@/lib/site"
import { isLocale } from "@/lib/translations"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  if (!isLocale(locale)) return {}
  const page = climatePage(locale, "mrv")
  return pageMetadata({
    locale,
    path: climatePaths.mrv,
    title: page.seoTitle,
    description: page.description,
    keywords: page.keywords,
  })
}

export default async function MrvPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  return <ClimateDocument locale={locale} page="mrv" />
}
