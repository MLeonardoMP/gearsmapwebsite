import type { Metadata } from "next"
import { ProjectsIndex } from "@/components/projects/projects-index"
import { getLocale } from "@/lib/i18n"
import { projectsUi } from "@/lib/project-content"
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
  const ui = projectsUi[locale]
  return pageMetadata({
    locale,
    path: projectPaths.index,
    title: ui.index.seoTitle,
    description: ui.index.description,
  })
}

export default async function ProjectsPage() {
  const locale = await getLocale()
  return <ProjectsIndex locale={locale} />
}
