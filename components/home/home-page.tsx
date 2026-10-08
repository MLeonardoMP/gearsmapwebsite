import Image from "next/image"
import Link from "next/link"
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  BrainCircuit,
  Check,
  ChevronDown,
  Database,
  Globe2,
  Layers3,
  Map,
  Network,
  Radar,
  ScanLine,
  ShieldCheck,
  Sparkles,
  Workflow,
  Zap,
  type LucideIcon,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import AuroraText from "@/components/ui/aurora-text"
import { ContactCta, ContactForm } from "@/components/home/contact-form"
import { GlobeVisual } from "@/components/home/globe-visual"
import { projectDefinitions, type ProjectDefinition, type ProjectKey } from "@/lib/projects"
import { teamMembers } from "@/lib/team"
import { climateHref } from "@/lib/site"
import type { Dictionary, Locale } from "@/lib/translations"

type Tech = {
  src: string
  alt: string
}

type ProjectCopy = {
  title: string
  desc: string
}

const techStack: Tech[] = [
  { src: "/images/python.svg", alt: "Python" },
  { src: "/images/dotnet.svg", alt: ".NET" },
  { src: "/images/blazor.svg", alt: "Blazor" },
  { src: "/images/react.svg", alt: "React" },
  { src: "/images/nextjs.svg", alt: "Next.js" },
  { src: "/images/typescript.svg", alt: "TypeScript" },
  { src: "/images/tailwind.svg", alt: "Tailwind CSS" },
  { src: "/images/azure.svg", alt: "Azure" },
  { src: "/images/Vercel_dark.svg", alt: "Vercel" },
  { src: "/images/postgresql.svg", alt: "PostgreSQL" },
  { src: "/images/docker.svg", alt: "Docker" },
  { src: "/images/mapbox.svg", alt: "Mapbox" },
  { src: "/images/qgis.svg", alt: "QGIS" },
  { src: "/images/openai.svg", alt: "OpenAI" },
  { src: "/images/pytorch.svg", alt: "PyTorch" },
]

const serviceIcons: Record<string, LucideIcon> = {
  ai: BrainCircuit,
  geoviewers: Map,
  visualization: Layers3,
  dashboards: BarChart3,
  automation: Workflow,
  monitoring: ShieldCheck,
}

function TechPill({ tech }: { tech: Tech }) {
  return (
    <li className="tech-pill">
      <Image src={tech.src} alt="" width={24} height={24} className="tech-pill__icon" aria-hidden="true" />
      <span>{tech.alt}</span>
    </li>
  )
}

function TechMarquee() {
  return (
    <div className="tech-strip__rail">
      <div className="tech-strip__track">
        <ul>
          {techStack.map((tech) => <TechPill key={tech.alt} tech={tech} />)}
        </ul>
        <ul aria-hidden="true">
          {techStack.map((tech) => <TechPill key={`${tech.alt}-clone`} tech={tech} />)}
        </ul>
      </div>
    </div>
  )
}

function SectionHeading({
  id,
  eyebrow,
  title,
  description,
  align = "center",
}: {
  id?: string
  eyebrow?: string
  title: string
  description?: string
  align?: "center" | "left"
}) {
  return (
    <div className={`section-heading section-heading--${align}`}>
      {eyebrow ? <p className="section-heading__eyebrow">{eyebrow}</p> : null}
      <h2 id={id}>{title}</h2>
      {description ? <p className="section-heading__description">{description}</p> : null}
    </div>
  )
}

function ServiceCard({
  icon: Icon,
  title,
  description,
  details,
  learnMore,
  id,
}: {
  icon: LucideIcon
  title: string
  description: string
  details: string
  learnMore: string
  id: string
}) {
  return (
    <details id={id} className="service-card group">
      <summary className="service-card__summary">
        <span className="service-card__icon" aria-hidden="true">
          <Icon className="h-6 w-6" />
        </span>
        <span className="service-card__title">{title}</span>
        <span className="service-card__description">{description}</span>
        <span className="service-card__action">
          {learnMore}
          <ChevronDown className="h-4 w-4 transition-transform group-open:rotate-180" aria-hidden="true" />
        </span>
      </summary>
      <div className="service-card__details">{details}</div>
    </details>
  )
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
  if (project.image) {
    return (
      <div className="project-visual">
        <Image
          src={project.image}
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
    <div className={`project-visual project-visual--abstract ${project.color}`} role="img" aria-label={`${copy.title}. ${illustrativeLabel}`}>
      <div className="project-visual__grid" aria-hidden="true" />
      <div className="project-visual__orbit project-visual__orbit--one" aria-hidden="true" />
      <div className="project-visual__orbit project-visual__orbit--two" aria-hidden="true" />
      <div className="project-visual__signal" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
      <div className="project-visual__caption">
        <span>{project.accent}</span>
        <small>{illustrativeLabel}</small>
      </div>
    </div>
  )
}

function ProjectCard({
  project,
  copy,
  t,
  locale,
}: {
  project: ProjectDefinition
  copy: ProjectCopy
  t: Dictionary
  locale: Locale
}) {
  const status = project.status === "live"
    ? t.projects.status.live
    : project.status === "operational"
      ? t.projects.status.operational
      : t.projects.status.inDevelopment

  return (
    <article className={`project-card ${project.featured ? "project-card--featured" : "project-card--secondary"}`}>
      <div className="project-card__media">
        <ProjectVisual project={project} copy={copy} illustrativeLabel={t.gallery.illustrativeLabel} />
        <span className={`project-card__status ${project.status === "live" ? "project-card__status--live" : ""}`}>
          <span className="project-card__status-dot" aria-hidden="true" />
          {status}
        </span>
      </div>
      <div className="project-card__body">
        <div className="project-card__meta">
          <span>{project.accent}</span>
          {project.link ? <ArrowUpRight className="h-4 w-4" aria-hidden="true" /> : null}
        </div>
        <h3>{copy.title}</h3>
        <p>{copy.desc}</p>
        <div className="project-card__tags">
          {project.tags.map((tag) => <span key={tag}>{tag}</span>)}
        </div>
        <div className="project-card__actions">
          {project.link ? (
            <a href={project.link} target="_blank" rel="noopener noreferrer" className="project-card__link">
              {t.gallery.liveLabel}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
          ) : null}
          {project.internalPath ? (
            <Link href={`/${locale}${project.internalPath}`} className="project-card__link">
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

function Breadcrumb({ current, home }: { current: string; home: string }) {
  return (
    <div className="breadcrumb" aria-hidden="true">
      <span>{home}</span>
      <ArrowRight className="h-3.5 w-3.5" />
      <span>{current}</span>
    </div>
  )
}

export function HomePage({ t, locale }: { t: Dictionary; locale: Locale }) {
  const services = Object.entries(t.portfolio.services).map(([key, service]) => ({
    serviceId: key,
    icon: serviceIcons[key],
    description: service.desc,
    ...service,
  }))

  const projectCopy: Record<ProjectKey, ProjectCopy> = {
    acggp: t.gallery.project1,
    mrv: t.gallery.project2,
    me: t.gallery.project3,
    agricultural: t.gallery.project4,
    fleet: t.gallery.project5,
  }

  const team = teamMembers.map((member) => ({ ...member, role: t.team.roles[member.roleKey] }))

  const processSteps = [t.process.steps.scope, t.process.steps.model, t.process.steps.deliver]

  return (
    <div className="site-shell">
      <section id="inicio" className="hero-section" aria-labelledby="hero-title">
        <div className="hero-section__grid" aria-hidden="true" />
        <div className="hero-section__glow hero-section__glow--top" aria-hidden="true" />
        <div className="hero-section__glow hero-section__glow--bottom" aria-hidden="true" />

        <div className="site-container hero-section__inner">
          <div className="hero-section__copy">
            <div className="hero-section__eyebrow">
              <span className="hero-section__eyebrow-line" aria-hidden="true" />
              <span>{t.hero.eyebrow}</span>
            </div>
            <div className="hero-section__index" aria-hidden="true">01 / 06</div>
            <h1 id="hero-title">
              <span>{t.hero.headline}</span>
              <span className="hero-section__brand"><AuroraText>{t.hero.title}</AuroraText></span>
            </h1>
            <div className="hero-section__description">
              <p>{t.hero.description1}</p>
              <p>{t.hero.description2}</p>
            </div>
            <div className="hero-section__actions">
              <Button asChild size="lg" className="hero-section__primary-action">
                <ContactCta intent="project">
                  {t.hero.cta_primary}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </ContactCta>
              </Button>
              <Button asChild variant="outline" size="lg" className="hero-section__secondary-action">
                <ContactCta intent="demo">
                  {t.hero.cta_secondary}
                  <ArrowDownRight className="h-4 w-4" aria-hidden="true" />
                </ContactCta>
              </Button>
            </div>
            <p className="hero-section__signal">
              <Sparkles className="h-4 w-4 text-accent" aria-hidden="true" />
              {t.hero.signal}
            </p>
          </div>

          <div className="hero-section__visual" aria-label={t.hero.scrollLabel}>
            <div className="hero-section__visual-ring hero-section__visual-ring--outer" aria-hidden="true" />
            <div className="hero-section__visual-ring hero-section__visual-ring--inner" aria-hidden="true" />
            <div className="hero-section__coordinates" aria-hidden="true">
              <span>04° 34′ N</span>
              <span>74° 17′ W</span>
            </div>
            <div className="hero-section__globe-wrap">
              <GlobeVisual fallbackAlt={t.hero.title} />
            </div>
            <div className="hero-note hero-note--top">
              <span className="hero-note__number">01</span>
              <span>{t.hero.floating.revenue}</span>
              <strong>{t.hero.floating.revenueValue}</strong>
            </div>
            <div className="hero-note hero-note--right">
              <span className="hero-note__number">02</span>
              <span>{t.hero.floating.insights}</span>
              <strong>{t.hero.floating.insightsValue}</strong>
            </div>
            <div className="hero-note hero-note--bottom">
              <span className="hero-note__number">03</span>
              <span>{t.hero.floating.data}</span>
              <strong>{t.hero.floating.dataValue}</strong>
            </div>
          </div>
        </div>

        <a href="#portafolio" className="hero-section__scroll-link">
          <span>{t.hero.scrollLabel}</span>
          <ArrowDownRight className="h-4 w-4" aria-hidden="true" />
        </a>
      </section>

      <section className="tech-strip" aria-labelledby="tech-stack-title">
        <div className="site-container tech-strip__inner">
          <div className="tech-strip__label">
            <span className="eyebrow-number" aria-hidden="true">02 / 06</span>
            <div>
              <h2 id="tech-stack-title">{t.techStack.title}</h2>
              <p>{t.techStack.subtitle}</p>
            </div>
          </div>
          <TechMarquee />
        </div>
      </section>

      <section id="portafolio" className="portfolio-section section-pad" aria-labelledby="portfolio-title">
        <div className="site-container">
          <Breadcrumb current={t.nav.portfolio} home={t.nav.home} />
          <SectionHeading id="portfolio-title" eyebrow="03 / CAPABILITIES" title={t.portfolio.header} description={t.portfolio.subheader} align="left" />

          <div className="services-grid">
            {services.map((service) => (
              <ServiceCard
                key={service.title}
                id={`servicio-${service.serviceId}`}
                icon={service.icon}
                title={service.title}
                description={service.description}
                details={service.details}
                learnMore={t.common.learnMore}
              />
            ))}
          </div>

          <div className="projects-block">
            <div className="projects-block__heading">
              <div>
                <p className="section-heading__eyebrow">04 / SELECTED WORK</p>
                <h2>{t.gallery.title}</h2>
              </div>
              <p>{t.gallery.subtitle}</p>
            </div>
            <div className="projects-grid">
              {projectDefinitions.map((project) => (
                <ProjectCard key={project.key} project={project} copy={projectCopy[project.key]} t={t} locale={locale} />
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

      <section id="nosotros" className="about-section section-pad" aria-labelledby="about-title">
        <div className="site-container">
          <div className="about-grid">
            <div className="about-copy">
              <Breadcrumb current={t.nav.about} home={t.nav.home} />
              <SectionHeading id="about-title" eyebrow="05 / THE TEAM" title={t.about.title} description={t.about.intro} align="left" />
              <div className="about-copy__cards">
                <article>
                  <span className="about-copy__card-index">A /</span>
                  <h3>{t.about.foundation.title}</h3>
                  <p>{t.about.foundation.text}</p>
                </article>
                <article>
                  <span className="about-copy__card-index">B /</span>
                  <h3>{t.about.products.title}</h3>
                  <p>{t.about.products.text}</p>
                </article>
              </div>
            </div>
            <div className="about-visual">
              <Image src="/images/agm2.jpg" alt="GearsMap team working with data visualization" fill sizes="(max-width: 1024px) 100vw, 48vw" className="about-visual__image" />
              <div className="about-visual__overlay" aria-hidden="true" />
              <div className="about-visual__label" aria-hidden="true">
                <Network className="h-4 w-4" />
                <span>GEARSMAP / PEOPLE + DATA</span>
              </div>
            </div>
          </div>

          <div className="team-block">
            <SectionHeading title={t.team.title} description={t.team.subtitle} />
            <div className="team-grid">
              {team.map((member, index) => (
                <article key={member.id} id={member.id} className="team-card">
                  <div className="team-card__image-wrap">
                    <Image src={member.image} alt={member.name} fill sizes="112px" className="team-card__image" />
                    <span aria-hidden="true">0{index + 1}</span>
                  </div>
                  <h3>{member.name}</h3>
                  <p>{member.role}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="proceso" className="process-section section-pad" aria-labelledby="process-title">
        <div className="site-container">
          <SectionHeading id="process-title" eyebrow="06 / PROCESS" title={t.process.title} description={t.process.subtitle} />
          <div className="process-grid">
            {processSteps.map((step, index) => (
              <article key={step.number} className="process-card">
                <div className="process-card__top">
                  <span>{step.number}</span>
                  {index < processSteps.length - 1 ? <ArrowRight className="h-4 w-4" aria-hidden="true" /> : <Check className="h-4 w-4" aria-hidden="true" />}
                </div>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mission-section section-pad" aria-labelledby="mission-title">
        <div className="site-container mission-grid">
          <div className="mission-visual">
            <Image src="/images/agm1.jpg" alt="GearsMap team collaboration" fill sizes="(max-width: 1024px) 100vw, 48vw" className="mission-visual__image" />
            <div className="mission-visual__overlay" aria-hidden="true" />
            <div className="mission-visual__stamp" aria-hidden="true">
              <Database className="h-5 w-5" />
              <span>BUILD / CONNECT / DECIDE</span>
            </div>
          </div>
          <div className="mission-copy">
            <SectionHeading id="mission-title" title={t.mission.title} align="left" />
            <div className="mission-copy__cards">
              <article>
                <span className="mission-copy__line" aria-hidden="true" />
                <div>
                  <h3>{t.mission.mission.title}</h3>
                  <p>{t.mission.mission.text}</p>
                </div>
              </article>
              <article>
                <span className="mission-copy__line mission-copy__line--blue" aria-hidden="true" />
                <div>
                  <h3>{t.mission.vision.title}</h3>
                  <p>{t.mission.vision.text}</p>
                </div>
              </article>
            </div>
          </div>
        </div>
      </section>

      <section id="contacto" className="contact-section section-pad" aria-labelledby="contact-title">
        <div className="site-container contact-grid">
          <div className="contact-copy">
            <Breadcrumb current={t.nav.contact} home={t.nav.home} />
            <SectionHeading id="contact-title" eyebrow="07 / NEXT SIGNAL" title={t.contact.header} description={t.contact.subheader} align="left" />
            <div className="contact-copy__signal">
              <ScanLine className="h-5 w-5 text-accent" aria-hidden="true" />
              <p>{t.contact.signal}</p>
            </div>
            <p className="contact-copy__promise">{t.contact.promise}</p>
            <div className="contact-copy__availability">
              <span className="contact-copy__pulse" aria-hidden="true" />
              <span>{t.hero.signal}</span>
            </div>
          </div>
          <div className="contact-panel">
            <div className="contact-panel__header">
              <span>GEARSMAP / CONTACT</span>
              <Zap className="h-4 w-4 text-accent" aria-hidden="true" />
            </div>
            <h3>{t.contact.form.title}</h3>
            <p>{t.contact.form.subtitle}</p>
            <ContactForm t={t.contact} />
          </div>
        </div>
      </section>
    </div>
  )
}
