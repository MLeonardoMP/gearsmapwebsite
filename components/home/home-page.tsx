import Image from "next/image"
import Link from "next/link"
import {
  ArrowRight,
  BarChart3,
  BrainCircuit,
  Check,
  Layers3,
  Mail,
  Map,
  MapPin,
  Plus,
  ShieldCheck,
  Workflow,
  type LucideIcon,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { ContactCta, ContactForm } from "@/components/home/contact-form"
import { GlobeVisual } from "@/components/home/globe-visual"
import { ProofBar } from "@/components/home/proof-bar"
import { TeamSection } from "@/components/home/team-section"
import { TechStack } from "@/components/home/tech-stack"
import { LinkedInIcon } from "@/components/icons/brand-icons"
import { ProjectsShowcase } from "@/components/projects/projects-showcase"
import {
  contactEmail,
  foundingYear,
  linkedInUrl,
  localePath,
  organizationName,
  projectPaths,
  servicePaths,
  taxId,
} from "@/lib/site"
import { cn } from "@/lib/utils"
import type { Dictionary, Locale } from "@/lib/translations"
import acggpVisor from "@/public/images/acggp_visor.png"
import aboutPhoto from "@/public/images/agm2.jpg"

type ServiceKey = keyof Dictionary["portfolio"]["services"]

/** Proof-first order: the positioning in seo.title leads with geoviewers and AI. */
const serviceOrder: ServiceKey[] = ["geoviewers", "ai", "dashboards", "visualization", "automation", "monitoring"]

const serviceIcons: Record<ServiceKey, LucideIcon> = {
  ai: BrainCircuit,
  geoviewers: Map,
  visualization: Layers3,
  dashboards: BarChart3,
  automation: Workflow,
  monitoring: ShieldCheck,
}

function SectionHeading({
  id,
  eyebrow,
  title,
  description,
  align = "left",
}: {
  id: string
  eyebrow: string
  title: string
  description?: string
  align?: "center" | "left" | "split"
}) {
  return (
    <div className={cn("section-heading", `section-heading--${align}`)}>
      <p className="eyebrow section-heading__eyebrow">{eyebrow}</p>
      <h2 id={id}>{title}</h2>
      {description ? <p className="section-heading__description">{description}</p> : null}
    </div>
  )
}

export function HomePage({ t, locale }: { t: Dictionary; locale: Locale }) {
  const processSteps = [t.process.steps.scope, t.process.steps.model, t.process.steps.deliver]
  const acggpHref = localePath(locale, projectPaths.acggp)

  return (
    <div className="site-shell">
      <section id="inicio" className="hero-section" aria-labelledby="hero-title">
        <div className="hero-section__grid" aria-hidden="true" />
        <div className="hero-section__glow hero-section__glow--top" aria-hidden="true" />
        <div className="hero-section__glow hero-section__glow--bottom" aria-hidden="true" />

        <div className="site-container hero-section__inner">
          <div className="hero-section__copy">
            <h1 id="hero-title">
              <span className="hero-section__kicker">{t.hero.kicker}</span>{" "}
              <span className="hero-section__headline">{t.hero.headline}</span>
            </h1>
            <p className="hero-section__lede">{t.hero.lede}</p>
            <div className="hero-section__actions">
              <Button asChild variant="accent" size="lg" className="hero-section__primary-action h-12 px-6 text-base font-semibold">
                <ContactCta intent="project">
                  {t.hero.cta_primary}
                  <ArrowRight aria-hidden="true" />
                </ContactCta>
              </Button>
              <Button asChild variant="outline" size="lg" className="hero-section__secondary-action h-12 px-6 text-base font-semibold">
                <ContactCta intent="demo">{t.hero.cta_secondary}</ContactCta>
              </Button>
            </div>
          </div>

          <div className="hero-section__visual">
            <div className="hero-section__coordinates" aria-hidden="true">
              <span>04° 34′ N</span>
              <span>74° 17′ W</span>
            </div>
            <div className="hero-section__globe-wrap">
              <GlobeVisual fallbackAlt={t.hero.title} />
            </div>
            <Link href={acggpHref} className="hero-product">
              <Image
                src={acggpVisor}
                alt={t.hero.product.alt}
                placeholder="blur"
                sizes="(max-width: 1023px) 80vw, 360px"
                className="hero-product__image"
              />
              <span className="hero-product__caption">
                <span className="status-chip status-chip--on-media" data-status="live">{t.hero.product.status}</span>{" "}
                <strong>{t.hero.product.title}</strong>{" "}
                <span className="hero-product__cta">
                  {t.hero.product.cta} <span aria-hidden="true">→</span>
                </span>
              </span>
            </Link>
          </div>
        </div>
      </section>

      <ProofBar t={t} locale={locale} />

      <ProjectsShowcase locale={locale} />

      <section id="servicios" className="services-section section-pad" aria-labelledby="services-title">
        <div className="site-container">
          <SectionHeading
            id="services-title"
            eyebrow={t.sections.capabilities}
            title={t.portfolio.header}
            description={t.portfolio.subheader}
            align="split"
          />

          <div className="services-grid">
            {serviceOrder.map((key, index) => {
              const service = t.portfolio.services[key]
              const Icon = serviceIcons[key]

              return (
                <details
                  key={key}
                  id={`servicio-${key}`}
                  className={cn("service-card reveal", index < 2 && "service-card--featured")}
                >
                  <summary className="service-card__summary">
                    <span className="service-card__icon" aria-hidden="true">
                      <Icon />
                    </span>
                    <span className="service-card__title">{service.title}</span>
                    <span className="service-card__description">{service.desc}</span>
                    <span className="service-card__toggle">
                      <Plus aria-hidden="true" />
                      <span className="service-card__toggle-label">{t.portfolio.detailsLabel}</span>
                    </span>
                  </summary>
                  <div className="service-card__details">
                    <p>{service.details}</p>
                    {key === "geoviewers" ? (
                      <Link className="text-link" href={localePath(locale, servicePaths.geoviewers)}>
                        {t.portfolio.geoviewersLink} <span aria-hidden="true">→</span>
                      </Link>
                    ) : null}
                  </div>
                </details>
              )
            })}
          </div>
        </div>
      </section>

      <section id="proceso" className="process-section section-pad" aria-labelledby="process-title">
        <div className="site-container">
          <SectionHeading
            id="process-title"
            eyebrow={t.sections.process}
            title={t.process.title}
            description={t.process.subtitle}
            align="split"
          />
          <div className="process-grid">
            {processSteps.map((step, index) => (
              <article key={step.number} className="process-card reveal">
                <div className="process-card__top">
                  <span>{step.number}</span>
                  {index < processSteps.length - 1 ? <ArrowRight className="h-4 w-4" aria-hidden="true" /> : <Check className="h-4 w-4" aria-hidden="true" />}
                </div>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </article>
            ))}
          </div>

          <TechStack t={t} />
        </div>
      </section>

      <section id="nosotros" className="about-section section-pad" aria-labelledby="about-title">
        <div className="site-container">
          <div className="about-grid">
            <div className="about-copy">
              <SectionHeading id="about-title" eyebrow={t.sections.about} title={t.about.title} description={t.about.intro} />
              <div className="about-copy__cards">
                <article>
                  <h3>{t.about.foundation.title}</h3>
                  <p>{t.about.foundation.text}</p>
                </article>
                <article>
                  <h3>{t.about.products.title}</h3>
                  <p>{t.about.products.text}</p>
                </article>
              </div>
            </div>
            <div className="about-visual">
              <Image
                src={aboutPhoto}
                alt={t.about.imageAlt}
                placeholder="blur"
                fill
                sizes="(max-width: 1023px) 100vw, 48vw"
                className="about-visual__image"
              />
              <div className="about-visual__overlay" aria-hidden="true" />
            </div>
          </div>

          <div className="about-details">
            <article className="about-statement">
              <h3>{t.mission.mission.title}</h3>
              <p>{t.mission.mission.text}</p>
            </article>
            <article className="about-statement">
              <h3>{t.mission.vision.title}</h3>
              <p>{t.mission.vision.text}</p>
            </article>
            <div className="company-facts-card">
              <h3 className="company-facts__title">{t.about.facts.title}</h3>
              <dl className="company-facts">
                <div>
                  <dt>{t.about.facts.legalName}</dt>
                  <dd>{organizationName}</dd>
                </div>
                <div>
                  <dt>{t.about.facts.taxId}</dt>
                  <dd>{taxId}</dd>
                </div>
                <div>
                  <dt>{t.about.facts.founded}</dt>
                  <dd>{foundingYear}</dd>
                </div>
                <div>
                  <dt>{t.about.facts.hq}</dt>
                  <dd>{t.proofBar.place}</dd>
                </div>
                <div>
                  <dt>{t.about.facts.languages}</dt>
                  <dd>{t.about.facts.languagesValue}</dd>
                </div>
                <div>
                  <dt>{t.about.facts.contact}</dt>
                  <dd>
                    <a href={`mailto:${contactEmail}`}>{contactEmail}</a>
                  </dd>
                </div>
              </dl>
            </div>
          </div>

          <TeamSection locale={locale} />
        </div>
      </section>

      <section id="contacto" className="contact-section section-pad" aria-labelledby="contact-title">
        <div className="site-container contact-grid">
          <div className="contact-copy">
            <SectionHeading id="contact-title" eyebrow={t.sections.contact} title={t.contact.header} description={t.contact.subheader} />
            <p className="contact-copy__promise">{t.contact.promise}</p>
            <ul className="contact-channels">
              <li>
                <Mail aria-hidden="true" />
                <a href={`mailto:${contactEmail}`} className="contact-channels__email">{contactEmail}</a>
              </li>
              <li>
                <MapPin aria-hidden="true" />
                <span>{t.proofBar.place}</span>
              </li>
              <li>
                <LinkedInIcon />
                <a href={linkedInUrl}>{t.contact.channels.linkedin}</a>
              </li>
            </ul>
            <div className="contact-next">
              <h3>{t.contact.next.title}</h3>
              <ol>
                {processSteps.map((step) => <li key={step.number}>{step.title}</li>)}
              </ol>
            </div>
          </div>
          <div className="contact-panel">
            <p className="text-sm text-muted-foreground">* {t.contact.form.required}</p>
            <ContactForm t={t.contact} locale={locale} />
          </div>
        </div>
      </section>
    </div>
  )
}
