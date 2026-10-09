import type { Metadata } from "next"
import { HomePage } from "@/components/home/home-page"
import { JsonLd } from "@/components/seo/json-ld"
import { getLocale } from "@/lib/i18n"
import { projectListNode } from "@/lib/project-schema"
import {
  offerCatalogNode,
  organizationNode,
  pageMetadata,
  structuredData,
  webPageNode,
  websiteNode,
} from "@/lib/seo"
import { personNodes } from "@/lib/team-schema"
import { getDictionary, isLocale } from "@/lib/translations"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  if (!isLocale(locale)) return {}

  const t = getDictionary(locale)

  return pageMetadata({
    locale,
    title: t.seo.title,
    description: t.seo.description,
  })
}

export default async function LocalizedHomePage() {
  const locale = await getLocale()
  const t = getDictionary(locale)
  const data = structuredData([
    organizationNode(locale),
    websiteNode(locale),
    webPageNode({
      locale,
      title: t.seo.title,
      description: t.seo.description,
    }),
    offerCatalogNode(locale),
    projectListNode(locale),
    ...personNodes(locale),
  ])

  return (
    <>
      <JsonLd data={data} />
      <HomePage t={t} locale={locale} />
    </>
  )
}
