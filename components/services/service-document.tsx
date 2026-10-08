import Image from "next/image"
import Link from "next/link"
import { ArrowRight, ArrowUpRight } from "lucide-react"
import { ContactCta } from "@/components/home/contact-cta"
import { JsonLd } from "@/components/seo/json-ld"
import { Button } from "@/components/ui/button"
import { projectStatusLabel } from "@/lib/project-content"
import { projectApplicationId } from "@/lib/project-schema"
import { getProject, projectHref, type ProjectStatus } from "@/lib/projects"
import {
  breadcrumbNode,
  faqNode,
  organizationNode,
  serviceNode,
  structuredData,
  webPageNode,
  websiteNode,
} from "@/lib/seo"
import { servicePage, type ServicePageKey, type ServiceViewerKey } from "@/lib/services"
import { absoluteUrl, climateHref, localePath, servicePaths } from "@/lib/site"
import { getDictionary, type Locale } from "@/lib/translations"

type ViewerLink = { href: string; label: string; external?: boolean }

/** Visible and JSON-LD breadcrumb trail for a service page. */
export function serviceCrumbs(locale: Locale, page: ServicePageKey) {
  const copy = servicePage(locale, page)
  return [
    { name: copy.home, path: localePath(locale) },
    { name: copy.crumb, path: localePath(locale, servicePaths[page]) },
  ]
}

export function serviceGraph(locale: Locale, page: ServicePageKey): object[] {
  const copy = servicePage(locale, page)
  const path = servicePaths[page]
  const url = absoluteUrl(localePath(locale, path))
  const acggp = getProject("acggp")
  const applicationId = projectApplicationId(locale, acggp)

  return [
    organizationNode(locale),
    websiteNode(locale),
    webPageNode({
      locale,
      path,
      title: copy.seoTitle,
      description: copy.description,
      ...(acggp.media
        ? {
            primaryImage: {
              url: absoluteUrl(acggp.media.src.src),
              width: acggp.media.src.width,
              height: acggp.media.src.height,
            },
          }
        : {}),
    }),
    breadcrumbNode(serviceCrumbs(locale, page)),
    {
      ...serviceNode({
        id: `${url}#service`,
        name: copy.seoTitle,
        description: copy.description,
        serviceType: copy.serviceType,
        audienceType: copy.audienceType,
        url,
      }),
      ...(applicationId ? { isRelatedTo: { "@id": applicationId } } : {}),
    },
    faqNode(copy.faq.items),
  ]
}

export function ServiceDocument({ locale, page }: { locale: Locale; page: ServicePageKey }) {
  const copy = servicePage(locale, page)
  const t = getDictionary(locale)
  const crumbs = serviceCrumbs(locale, page)
  const acggp = getProject("acggp")
  const acggpCase = projectHref(locale, acggp)
  const data = structuredData(serviceGraph(locale, page))

  const viewers: Array<{ key: ServiceViewerKey; status: ProjectStatus; links: ViewerLink[] }> = [
    {
      key: "acggp",
      status: acggp.status,
      links: [
        ...(acggpCase ? [{ href: acggpCase, label: copy.live.caseStudy }] : []),
        ...(acggp.liveUrl ? [{ href: acggp.liveUrl, label: copy.live.openApp, external: true }] : []),
      ],
    },
    {
      key: "mrv",
      status: getProject("mrv").status,
      links: [{ href: climateHref(locale, "mrv"), label: copy.live.module }],
    },
    {
      key: "me",
      status: getProject("me").status,
      links: [{ href: climateHref(locale, "me"), label: copy.live.module }],
    },
  ]

  return (
    <article className="climate-page">
      <JsonLd data={data} />
      <div className="climate-page__grid" aria-hidden="true" />
      <div className="site-container climate-page__inner">
        <nav className="climate-crumbs" aria-label={copy.breadcrumbLabel}>
          <ol>
            {crumbs.map((crumb, index) => {
              const isLast = index === crumbs.length - 1
              return (
                <li key={crumb.path}>
                  {isLast ? (
                    <span aria-current="page">{crumb.name}</span>
                  ) : (
                    <Link href={crumb.path}>{crumb.name}</Link>
                  )}
                </li>
              )
            })}
          </ol>
        </nav>

        <header className="climate-hero">
          <p className="climate-kicker">{copy.eyebrow}</p>
          <h1>{copy.title}</h1>
          <p className="climate-lede">{copy.lede}</p>
        </header>

        <section id={copy.build.id} className="climate-section" aria-labelledby={`${copy.build.id}-title`}>
          <h2 id={`${copy.build.id}-title`}>{copy.build.heading}</h2>
          <p>{t.portfolio.services.geoviewers.desc}</p>
          <div className="climate-card">
            <ul className="mt-0">
              {copy.build.points.map((point) => <li key={point}>{point}</li>)}
            </ul>
          </div>
        </section>

        <section id={copy.live.id} className="climate-section" aria-labelledby={`${copy.live.id}-title`}>
          <h2 id={`${copy.live.id}-title`}>{copy.live.heading}</h2>
          {acggp.media ? (
            <figure className="m-0">
              <Image
                src={acggp.media.src}
                alt={copy.live.screenshotAlt}
                sizes="(max-width: 900px) calc(100vw - 2.5rem), 52rem"
                className="h-auto w-full rounded-[var(--radius-media,0.75rem)] border border-border"
              />
            </figure>
          ) : null}
          <div className="grid gap-[0.9rem]">
            {viewers.map((viewer) => {
              const item = copy.live.items[viewer.key]
              return (
                <section key={viewer.key} className="climate-card" aria-labelledby={`viewer-${viewer.key}`}>
                  <span className="status-chip" data-status={viewer.status}>
                    {projectStatusLabel(locale, viewer.status)}
                  </span>
                  <h3 id={`viewer-${viewer.key}`} className="mt-3">{item.title}</h3>
                  <p className="mt-2">{item.text}</p>
                  <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2">
                    {viewer.links.map((link) => link.external ? (
                      <a
                        key={link.href}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-link inline-flex items-center gap-1"
                      >
                        {link.label}
                        <span className="sr-only"> {copy.live.newTab}</span>
                        <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
                      </a>
                    ) : (
                      <Link key={link.href} href={link.href} className="text-link inline-flex items-center gap-1">
                        {link.label}
                        <ArrowRight aria-hidden="true" className="h-4 w-4" />
                      </Link>
                    ))}
                  </div>
                </section>
              )
            })}
          </div>
          <p className="climate-note">{copy.live.note}</p>
        </section>

        <section id={copy.process.id} className="climate-section" aria-labelledby={`${copy.process.id}-title`}>
          <h2 id={`${copy.process.id}-title`}>{t.process.title}</h2>
          <p>{t.process.subtitle}</p>
          <ol className="climate-cards m-0 list-none p-0">
            {Object.values(t.process.steps).map((step) => (
              <li key={step.number} className="climate-card">
                <p className="climate-kicker">{step.number}</p>
                <h3 className="mt-2">{step.title}</h3>
                <p className="mt-2">{step.text}</p>
              </li>
            ))}
          </ol>
        </section>

        <section id={copy.tech.id} className="climate-section" aria-labelledby={`${copy.tech.id}-title`}>
          <h2 id={`${copy.tech.id}-title`}>{copy.tech.heading}</h2>
          <ul className="m-0 flex list-none flex-wrap gap-2 p-0">
            {copy.tech.items.map((item) => (
              <li key={item} className="chip">{item}</li>
            ))}
          </ul>
        </section>

        <section id={copy.faq.id} className="climate-section" aria-labelledby={`${copy.faq.id}-title`}>
          <h2 id={`${copy.faq.id}-title`}>{copy.faq.heading}</h2>
          <div className="climate-faq">
            {copy.faq.items.map((faq) => (
              <details key={faq.question}>
                <summary>{faq.question}</summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="climate-cta" aria-labelledby="service-cta-title">
          <div>
            <h2 id="service-cta-title">{copy.cta.title}</h2>
            <p>{copy.cta.body}</p>
          </div>
          <Button asChild variant="accent">
            <ContactCta locale={locale} intent="project">
              {copy.cta.label}
              <ArrowRight aria-hidden="true" />
            </ContactCta>
          </Button>
        </section>
      </div>
    </article>
  )
}
