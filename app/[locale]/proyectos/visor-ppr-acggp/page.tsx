import type { Metadata } from "next"
import { CaseStudy } from "@/components/projects/case-study"
import { getLocale } from "@/lib/i18n"
import { projectCopy } from "@/lib/project-content"
import { getProject } from "@/lib/projects"
import { pageMetadata } from "@/lib/seo"
import { projectPaths } from "@/lib/site"
import { isLocale } from "@/lib/translations"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  if (!isLocale(locale)) return {}
  const project = getProject("acggp")
  const copy = projectCopy[locale].acggp
  return pageMetadata({
    locale,
    path: projectPaths.acggp,
    title: copy.seoTitle ?? copy.title,
    description: copy.description ?? copy.summary,
    ogType: "article",
    modifiedTime: project.updated,
  })
}

export default async function AcggpCaseStudyPage() {
  const locale = await getLocale()
  return <CaseStudy locale={locale} />
}
