import Link from "next/link"
import { ArrowRight } from "lucide-react"
import {
  ClimateGroup,
  ExplorationList,
  FeaturedProjectTile,
  ProjectsCtaBand,
} from "@/components/projects/project-tiles"
import { projectsUi } from "@/lib/project-content"
import { localePath, projectPaths } from "@/lib/site"
import type { Locale } from "@/lib/translations"
import "./projects.css"

/** Home portfolio: section#portafolio with the featured project, the #clima group and the exploration list. */
export function ProjectsShowcase({ locale }: { locale: Locale }) {
  const ui = projectsUi[locale]

  return (
    <section id="portafolio" className="work-section section-pad" aria-labelledby="work-title">
      <div className="site-container">
        <div className="work-section__heading">
          <div>
            <p className="eyebrow">{ui.eyebrow}</p>
            <h2 id="work-title">{ui.title}</h2>
          </div>
          <p>{ui.subtitle}</p>
        </div>

        <div className="work-bento">
          <FeaturedProjectTile locale={locale} />
          <ClimateGroup locale={locale} />
          <ExplorationList locale={locale} />
        </div>

        <Link className="text-link work-section__more" href={localePath(locale, projectPaths.index)}>
          {ui.cta.seeAll}
          <ArrowRight className="size-4" aria-hidden="true" />
        </Link>

        <ProjectsCtaBand locale={locale} />
      </div>
    </section>
  )
}
