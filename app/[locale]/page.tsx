import type { Metadata } from "next"
import { Suspense } from "react"
import { notFound } from "next/navigation"
import { HomePage } from "@/components/home/home-page"
import { InstantShell } from "@/components/instant-shell"
import { JsonLd } from "@/components/seo/json-ld"
import { pageMetadata, organizationNode, serviceNode, structuredData, webPageNode, websiteNode } from "@/lib/seo"
import { personNodes } from "@/lib/team-schema"
import { absoluteUrl, siteUrl } from "@/lib/site"
import { getDictionary, isLocale } from "@/lib/translations"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale: value } = await params
  if (!isLocale(value)) return {}

  const t = getDictionary(value)

  return pageMetadata({
    locale: value,
    title: t.seo.title,
    description: t.seo.description,
    keywords: [...t.seo.keywords],
  })
}

async function LocalizedHomeContent({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: value } = await params
  if (!isLocale(value)) notFound()

  const t = getDictionary(value)
  const services = Object.values(t.portfolio.services)
  const data = structuredData([
    organizationNode(),
    websiteNode(value),
    ...personNodes(value),
    webPageNode({
      locale: value,
      title: t.seo.title,
      description: t.seo.description,
    }),
    {
      "@type": "ItemList",
      name: t.portfolio.header,
      itemListElement: services.map((service, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: service.title,
        description: service.desc,
        url: absoluteUrl(`/${value}#portafolio`),
      })),
    },
    serviceNode({
      name: t.seo.title,
      description: t.seo.description,
      serviceType: "Geospatial software",
      url: `${siteUrl}/${value}`,
    }),
  ])

  return (
    <>
      <JsonLd data={data} />
      <HomePage t={t} locale={value} />
    </>
  )
}

export default function LocalizedHomePage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  return (
    <Suspense fallback={<InstantShell />}>
      <LocalizedHomeContent params={params} />
    </Suspense>
  )
}
