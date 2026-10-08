import Image from "next/image"
import Link from "next/link"
import { ArrowDownRight, ArrowRight, ArrowUpRight, Radar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ContactCta } from "@/components/home/contact-cta"
import { projectCopy, projectStatusLabel, projectsUi, type ProjectCopy } from "@/lib/project-content"
import { projectDefinitions, type ProjectDefinition, type ProjectKey } from "@/lib/projects"
import { climateHref } from "@/lib/site"
import { getDictionary, type Dictionary, type Locale } from "@/lib/translations"

// DAY-0 STUB (WS2 replaces this file): renders the legacy project cards and
// the #clima band with the pre-redesign markup and CSS classes.

const legacyVisuals: Record<ProjectKey, { color: string; accent: string; tags: string[] }> = {
  acggp: { color: "project-card--blue", accent: "PPR / ACGGP", tags: ["React", "Leaflet", "Node.js"] },
  mrv: { color: "project-card--green", accent: "MRV / MINMINAS · KFW", tags: ["Python", "Geospatial", "Data"] },
  me: { color: "project-card--violet", accent: "M&E / MINMINAS · KFW", tags: ["Indicators", "Dashboards", "GIS"] },
  agricultural: { color: "project-card--amber", accent: "SATELLITE / ANALYSIS", tags: ["Python", "Satellite", "AI"] },
  fleet: { color: "project-card--slate", accent: "REAL-TIME / OPERATIONS", tags: ["IoT", "Real-time", "Dashboard"] },
}

function ProjectVisual({
  project,
  copy,
  illustrativeLabel,
}: {
  project: ProjectDefinition
  copy: ProjectCopy
  illustrativeLabel: string
}) {
  const visual = legacyVisuals[project.key]

  if (project.media) {
    return (
      <div className="project-visual">
        <Image
          src={project.media.src}
          alt={copy.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="project-visual__image"
        />
        <div className="project-visual__scrim" aria-hidden="true" />
      </div>
    )
  }

  return (
    <div className={`project-visual project-visual--abstract ${visual.color}`} role="img" aria-label={`${copy.title}. ${illustrativeLabel}`}>
      <div className="project-visual__grid" aria-hidden="true" />
      <div className="project-visual__orbit project-visual__orbit--one" aria-hidden="true" />
      <div className="project-visual__orbit project-visual__orbit--two" aria-hidden="true" />
      <div className="project-visual__signal" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
      <div className="project-visual__caption">
        <span>{visual.accent}</span>
        <small>{illustrativeLabel}</small>
      </div>
    </div>
  )
}

function ProjectCard({ project, t, locale }: { project: ProjectDefinition; t: Dictionary; locale: Locale }) {
  const copy = projectCopy[locale][project.key]
  const visual = legacyVisuals[project.key]
  const featured = project.tier !== "exploration"
  const climatePage = project.caseStudy?.kind === "climate" ? project.caseStudy.page : null

  return (
    <article className={`project-card ${featured ? "project-card--featured" : "project-card--secondary"}`}>
      <div className="project-card__media">
        <ProjectVisual project={project} copy={copy} illustrativeLabel={t.gallery.illustrativeLabel} />
        <span className={`project-card__status ${project.status === "live" ? "project-card__status--live" : ""}`}>
          <span className="project-card__status-dot" aria-hidden="true" />
          {projectStatusLabel(locale, project.status)}
        </span>
      </div>
      <div className="project-card__body">
        <div className="project-card__meta">
          <span>{visual.accent}</span>
          {project.liveUrl ? <ArrowUpRight className="h-4 w-4" aria-hidden="true" /> : null}
        </div>
        <h3>{copy.title}</h3>
        <p>{copy.summary}</p>
        <div className="project-card__tags">
          {visual.tags.map((tag) => <span key={tag}>{tag}</span>)}
        </div>
        <div className="project-card__actions">
          {project.liveUrl ? (
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="project-card__link">
              {t.gallery.liveLabel}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
          ) : null}
          {climatePage ? (
            <Link href={climateHref(locale, climatePage)} className="project-card__link">
              {t.gallery.caseLabel}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          ) : null}
          <ContactCta intent="demo" className="project-card__demo-link">
            {t.contact.intent.demo}
            <ArrowDownRight className="h-4 w-4" aria-hidden="true" />
          </ContactCta>
        </div>
      </div>
    </article>
  )
}

/** Home portfolio: renders section#portafolio and the #clima band. */
export function ProjectsShowcase({ locale }: { locale: Locale }) {
  const t = getDictionary(locale)

  return (
    <>
      <section id="portafolio" className="portfolio-section section-pad" aria-labelledby="work-title">
        <div className="site-container">
          <div className="projects-block">
            <div className="projects-block__heading">
              <div>
                <p className="section-heading__eyebrow">{projectsUi[locale].eyebrow}</p>
                <h2 id="work-title">{t.gallery.title}</h2>
              </div>
              <p>{t.gallery.subtitle}</p>
            </div>
            <div className="projects-grid">
              {projectDefinitions.map((project) => (
                <ProjectCard key={project.key} project={project} t={t} locale={locale} />
              ))}
            </div>
            <div className="projects-cta">
              <div>
                <span className="projects-cta__marker" aria-hidden="true"><Radar className="h-5 w-5" /></span>
                <h3>{t.gallery.ctaTitle}</h3>
                <p>{t.gallery.ctaDescription}</p>
              </div>
              <Button asChild variant="outline" className="projects-cta__button">
                <ContactCta intent="project">
                  {t.gallery.ctaLabel}
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </ContactCta>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section id="clima" className="climate-band section-pad" aria-labelledby="climate-band-title">
        <div className="site-container climate-band__inner">
          <div>
            <p className="section-heading__eyebrow">{t.climateTeaser.eyebrow}</p>
            <h2 id="climate-band-title">{t.climateTeaser.title}</h2>
            <p>{t.climateTeaser.text}</p>
          </div>
          <div className="climate-band__links">
            <Link href={climateHref(locale, "hub")}>
              {t.climateTeaser.cta}
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link href={climateHref(locale, "mrv")}>{t.climateTeaser.mrv}</Link>
            <Link href={climateHref(locale, "me")}>{t.climateTeaser.me}</Link>
          </div>
        </div>
      </section>
    </>
  )
}

