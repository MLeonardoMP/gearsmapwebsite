import { PageCrumbs } from "@/components/projects/case-study"
import {
  ClimateGroup,
  ExplorationList,
  FeaturedProjectTile,
  ProjectsCtaBand,
} from "@/components/projects/project-tiles"
import { JsonLd } from "@/components/seo/json-ld"
import { projectsUi } from "@/lib/project-content"
import { projectCrumbs, projectsCollectionGraph } from "@/lib/project-schema"
import type { Locale } from "@/lib/translations"
import "./projects.css"

/** /[locale]/proyectos: every project grouped by tier, as a CollectionPage. */
export function ProjectsIndex({ locale }: { locale: Locale }) {
  const ui = projectsUi[locale]

  return (
    <article className="climate-page projects-page">
      <JsonLd data={projectsCollectionGraph(locale)} />
      <div className="climate-page__grid" aria-hidden="true" />
      <div className="site-container climate-page__inner">
        <PageCrumbs locale={locale} crumbs={projectCrumbs(locale)} />

        <header className="projects-page__header">
          <h1>{ui.index.h1}</h1>
          <p className="projects-page__lede">{ui.index.lede}</p>
        </header>

        <div className="work-bento">
          <FeaturedProjectTile locale={locale} standalone headingLevel={2} />
          <ClimateGroup locale={locale} standalone headingLevel={2} withAnchor={false} />
          <ExplorationList locale={locale} standalone headingLevel={2} />
        </div>

        <ProjectsCtaBand locale={locale} standalone headingLevel={2} />
      </div>
    </article>
  )
}
