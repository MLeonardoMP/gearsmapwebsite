import { ViewTransition } from "react"
import Link from "next/link"
import {
  ArrowRight,
  ArrowUpRight,
  Globe2,
  Layers,
  LayoutGrid,
  ListFilter,
  Map as MapIcon,
  PanelsTopLeft,
  type LucideIcon,
} from "lucide-react"
import { ContactCta } from "@/components/home/contact-cta"
import { ProjectFacts } from "@/components/projects/project-facts"
import { BrowserFrame } from "@/components/projects/project-tiles"
import { JsonLd } from "@/components/seo/json-ld"
import { Button } from "@/components/ui/button"
import { getClimate } from "@/lib/climate"
import { projectCopy, projectStatusLabel, projectsUi } from "@/lib/project-content"
import { caseStudyGraph, projectCrumbs } from "@/lib/project-schema"
import { getProject, projectHref, projectsByTier } from "@/lib/projects"
import { localePath, projectPaths } from "@/lib/site"
import { getDictionary, type Locale } from "@/lib/translations"
import "./projects.css"

// One icon per "built" item, in order.
const builtIcons: LucideIcon[] = [MapIcon, ListFilter, PanelsTopLeft, LayoutGrid, Layers, Globe2]

/** Visible breadcrumb; the same trail feeds the JSON-LD BreadcrumbList. */
export function PageCrumbs({ locale, crumbs }: { locale: Locale; crumbs: Array<{ name: string; path: string }> }) {
  return (
    <nav className="climate-crumbs" aria-label={getClimate(locale).breadcrumbLabel}>
      <ol>
        {crumbs.map((crumb, index) => (
          <li key={crumb.path}>
            {index === crumbs.length - 1 ? (
              <span aria-current="page">{crumb.name}</span>
            ) : (
              <Link href={crumb.path}>{crumb.name}</Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}

function TextSection({ id, heading, paragraphs }: { id: string; heading: string; paragraphs: string[] }) {
  return (
    <section id={id} className="climate-section" aria-labelledby={`${id}-title`}>
      <h2 id={`${id}-title`}>{heading}</h2>
      {paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
    </section>
  )
}

/** ACGGP case study: hero with facts, the full screenshot, what was built and related work. */
export function CaseStudy({ locale }: { locale: Locale }) {
  const project = getProject("acggp")
  const copy = projectCopy[locale][project.key]
  const ui = projectsUi[locale]
  const services = getDictionary(locale).portfolio.services
  const others = projectsByTier("climate")

  return (
    <article className="climate-page case-page">
      <JsonLd data={caseStudyGraph(locale, project.key)} />
      <div className="climate-page__grid" aria-hidden="true" />
      <div className="site-container climate-page__inner">
        <PageCrumbs locale={locale} crumbs={projectCrumbs(locale, project)} />

        <div className="case-hero">
          <header className="case-hero__copy">
            <p className="eyebrow">{copy.kicker}</p>
            <span className="status-chip" data-status={project.status}>
              {projectStatusLabel(locale, project.status)}
            </span>
            <h1>{copy.title}</h1>
            {copy.lede ? <p className="case-hero__lede">{copy.lede}</p> : null}
            <div className="case-hero__actions">
              {project.liveUrl ? (
                <Button asChild variant="accent" size="lg">
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                    {ui.cta.openLive}
                    <ArrowUpRight aria-hidden="true" />
                    <span className="sr-only"> {ui.newTab}</span>
                  </a>
                </Button>
              ) : null}
              <Button asChild variant="outline" size="lg">
                <ContactCta locale={locale} intent="project">
                  {ui.cta.similar}
                  <ArrowRight aria-hidden="true" />
                </ContactCta>
              </Button>
            </div>
          </header>
          <ProjectFacts locale={locale} project={project} className="case-hero__facts" />
        </div>

        {project.media ? (
          <figure className="case-media">
            <ViewTransition name={`project-${project.key}`} share="morph" default="none">
              <BrowserFrame
                project={project}
                alt={copy.mediaAlt ?? copy.title}
                sizes="(max-width: 1280px) 100vw, 1200px"
                preload
              />
            </ViewTransition>
            {copy.caption ? <figcaption>{copy.caption}</figcaption> : null}
          </figure>
        ) : null}

        {copy.context ? (
          <TextSection id="contexto" heading={copy.context.heading} paragraphs={[copy.context.text]} />
        ) : null}

        {copy.challenge ? (
          <TextSection id="encargo" heading={ui.caseSections.challenge} paragraphs={copy.challenge} />
        ) : null}

        {copy.built && copy.built.length > 0 ? (
          <section id="construido" className="climate-section" aria-labelledby="construido-title">
            <h2 id="construido-title">{copy.builtTitle}</h2>
            <ul className="case-built">
              {copy.built.map((item, index) => {
                const Icon = builtIcons[index % builtIcons.length]
                return (
                  <li key={item.title}>
                    <Icon aria-hidden="true" />
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                  </li>
                )
              })}
            </ul>
          </section>
        ) : null}

        {copy.outcome ? (
          <TextSection id="resultado" heading={ui.caseSections.outcome} paragraphs={copy.outcome} />
        ) : null}

        {project.services.length > 0 ? (
          <section id="servicios-relacionados" className="climate-section" aria-labelledby="servicios-relacionados-title">
            <h2 id="servicios-relacionados-title">{ui.facts.services}</h2>
            <ul className="work-chips case-services">
              {project.services.map((service) => (
                <li key={service}>
                  <Link className="chip" href={`${localePath(locale)}#servicio-${service}`}>
                    {services[service].title}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        <section id="otros-proyectos" className="climate-section" aria-labelledby="otros-proyectos-title">
          <h2 id="otros-proyectos-title">{ui.related.other}</h2>
          <ul className="climate-related">
            {others.map((other) => {
              const href = projectHref(locale, other)
              if (!href) return null
              return (
                <li key={other.key}>
                  <Link href={href}>
                    <span>{projectCopy[locale][other.key].title}</span>
                    <ArrowUpRight aria-hidden="true" />
                  </Link>
                </li>
              )
            })}
            <li>
              <Link href={localePath(locale, projectPaths.index)}>
                <span>{ui.related.allProjects}</span>
                <ArrowUpRight aria-hidden="true" />
              </Link>
            </li>
          </ul>
        </section>

        <section className="climate-cta" aria-labelledby="case-cta-title">
          <div>
            <h2 id="case-cta-title">{ui.ctaBand.title}</h2>
            <p>{ui.ctaBand.description}</p>
          </div>
          <Button asChild variant="accent" size="lg">
            <ContactCta locale={locale} intent="project">
              {ui.ctaBand.label}
              <ArrowRight aria-hidden="true" />
            </ContactCta>
          </Button>
        </section>

        {copy.note ? <p className="climate-note">{copy.note}</p> : null}
      </div>
    </article>
  )
}
