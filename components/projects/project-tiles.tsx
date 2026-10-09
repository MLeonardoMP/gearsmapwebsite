import { ViewTransition, type HTMLAttributes } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, ArrowUpRight } from "lucide-react"
import { ContactCta } from "@/components/home/contact-cta"
import { Button } from "@/components/ui/button"
import { MethodDiagram } from "@/components/projects/method-diagram"
import { projectCopy, projectStatusLabel, projectsUi } from "@/lib/project-content"
import { getProject, projectHref, projectsByTier, type ProjectDefinition } from "@/lib/projects"
import { climateHref } from "@/lib/site"
import type { Locale } from "@/lib/translations"
import { cn } from "@/lib/utils"
import "./projects.css"

/** Heading level of the tile titles: 3 under the home h2, 2 directly under a page h1. */
export type TileHeadingLevel = 2 | 3

type TileProps = {
  locale: Locale
  /** Outside the home page, contact links point to `/{locale}#contacto` instead of `#contacto`. */
  standalone?: boolean
  headingLevel?: TileHeadingLevel
}

function Heading({ level, ...props }: HTMLAttributes<HTMLHeadingElement> & { level: 2 | 3 | 4 }) {
  if (level === 2) return <h2 {...props} />
  if (level === 3) return <h3 {...props} />
  return <h4 {...props} />
}

function StatusChip({ locale, project }: { locale: Locale; project: ProjectDefinition }) {
  return (
    <span className="status-chip" data-status={project.status}>
      {projectStatusLabel(locale, project.status)}
    </span>
  )
}

function TopicChips({ topics }: { topics: string[] }) {
  if (topics.length === 0) return null
  return (
    <ul className="work-chips">
      {topics.map((topic) => <li key={topic} className="chip">{topic}</li>)}
    </ul>
  )
}

/** Screenshot inside a minimal browser frame, at the image's native aspect ratio (no crop, no scrim). */
export function BrowserFrame({
  project,
  alt,
  sizes,
  preload = false,
  className,
}: {
  project: ProjectDefinition
  alt: string
  sizes: string
  preload?: boolean
  className?: string
}) {
  if (!project.media) return null
  return (
    <div className={cn("browser-frame", className)}>
      <div className="browser-frame__bar" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
      <Image src={project.media.src} alt={alt} placeholder="blur" sizes={sizes} preload={preload} />
    </div>
  )
}

/** The featured, in-production project (ACGGP) with its real screenshot. */
export function FeaturedProjectTile({ locale, standalone = false, headingLevel = 3 }: TileProps) {
  const project = getProject("acggp")
  const copy = projectCopy[locale][project.key]
  const ui = projectsUi[locale]
  const href = projectHref(locale, project)

  return (
    <article className="work-tile work-tile--featured project-card reveal">
      <div className="work-tile__layout">
        {project.media ? (
          <ViewTransition name={`project-${project.key}`} share="morph" default="none">
            <BrowserFrame
              project={project}
              alt={copy.mediaAlt ?? copy.title}
              sizes="(max-width: 1023px) 100vw, 720px"
            />
          </ViewTransition>
        ) : null}
        <div className="work-tile__body">
          <StatusChip locale={locale} project={project} />
          <p className="eyebrow">{copy.kicker}</p>
          <Heading level={headingLevel} className="work-tile__title">{copy.title}</Heading>
          <p className="work-tile__summary">{copy.summary}</p>
          <TopicChips topics={copy.topics} />
          <div className="work-tile__actions">
            {href ? (
              <Link prefetch className="text-link" href={href}>
                {ui.cta.viewCase}
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            ) : null}
            {project.liveUrl ? (
              <a className="text-link" href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                {ui.cta.openLive}
                <ArrowUpRight className="size-4" aria-hidden="true" />
                <span className="sr-only"> {ui.newTab}</span>
              </a>
            ) : null}
            <ContactCta intent="demo" locale={standalone ? locale : undefined} className="text-link">
              {ui.cta.demo}
            </ContactCta>
          </div>
        </div>
      </div>
    </article>
  )
}

/** MRV and M&E as one engagement: a shared header plus one tile per module with its method diagram. */
export function ClimateGroup({
  locale,
  headingLevel = 3,
  withAnchor = true,
}: TileProps & { withAnchor?: boolean }) {
  const ui = projectsUi[locale]

  return (
    <div id={withAnchor ? "clima" : undefined} className="work-climate">
      <div className="work-climate__header">
        <p className="eyebrow">{ui.groups.climateLabel}</p>
        <p>{ui.groups.climateText}</p>
      </div>
      <div className="work-climate__grid">
        {projectsByTier("climate").map((project) => {
          const copy = projectCopy[locale][project.key]
          const href = projectHref(locale, project)
          const page = project.caseStudy?.kind === "climate" ? project.caseStudy.page : null

          return (
            <article key={project.key} className="work-tile work-tile--climate reveal">
              <StatusChip locale={locale} project={project} />
              <ViewTransition name={`climate-title-${project.key}`} share="morph" default="none">
                <Heading level={headingLevel} className="work-tile__title">{copy.title}</Heading>
              </ViewTransition>
              <p className="work-tile__summary">{copy.summary}</p>
              {page ? <MethodDiagram locale={locale} page={page} /> : null}
              <TopicChips topics={copy.topics} />
              {href ? (
                <Link className="text-link" href={href}>
                  {ui.cta.viewCase}
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              ) : null}
            </article>
          )
        })}
      </div>
      <Link className="text-link work-climate__hub" href={climateHref(locale, "hub")}>
        {ui.cta.climateHub}
        <ArrowRight className="size-4" aria-hidden="true" />
      </Link>
    </div>
  )
}

/** Lines still in exploration: no media and no demo link, only an honest status. */
export function ExplorationList({ locale, standalone = false, headingLevel = 3 }: TileProps) {
  const ui = projectsUi[locale]

  return (
    <div className="work-explore">
      <div className="work-explore__header">
        <Heading level={headingLevel} className="work-explore__title">{ui.groups.exploration}</Heading>
        <p>{ui.groups.explorationText}</p>
      </div>
      <ul className="work-explore__list">
        {projectsByTier("exploration").map((project) => {
          const copy = projectCopy[locale][project.key]
          return (
            <li key={project.key} className="work-explore__row reveal">
              <StatusChip locale={locale} project={project} />
              <Heading level={headingLevel === 2 ? 3 : 4} className="work-explore__item-title">{copy.title}</Heading>
              <p>{copy.summary}</p>
              <TopicChips topics={copy.topics} />
            </li>
          )
        })}
      </ul>
      <ContactCta intent="project" locale={standalone ? locale : undefined} className="text-link">
        {ui.cta.useCase}
        <ArrowRight className="size-4" aria-hidden="true" />
      </ContactCta>
    </div>
  )
}

/** Closing call to action of the projects section and the projects index. */
export function ProjectsCtaBand({ locale, standalone = false, headingLevel = 3 }: TileProps) {
  const ui = projectsUi[locale]

  return (
    <div className="projects-cta-band">
      <div>
        <Heading level={headingLevel}>{ui.ctaBand.title}</Heading>
        <p>{ui.ctaBand.description}</p>
      </div>
      <Button asChild variant="accent" size="lg">
        <ContactCta intent="project" locale={standalone ? locale : undefined}>
          {ui.ctaBand.label}
          <ArrowUpRight aria-hidden="true" />
        </ContactCta>
      </Button>
    </div>
  )
}
