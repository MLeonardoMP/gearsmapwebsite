import { ViewTransition } from "react"
import Link from "next/link"
import { ArrowRight, ArrowUpRight } from "lucide-react"
import { ContactCta } from "@/components/home/contact-cta"
import { MethodDiagram } from "@/components/projects/method-diagram"
import { ProjectFacts } from "@/components/projects/project-facts"
import { JsonLd } from "@/components/seo/json-ld"
import { Button } from "@/components/ui/button"
import { climatePage, getClimate, relatedClimatePages, type ClimatePageKey } from "@/lib/climate"
import { climateCrumbs, climatePageGraph } from "@/lib/climate-schema"
import { projectsUi } from "@/lib/project-content"
import { climateCaseNode } from "@/lib/project-schema"
import { getProject } from "@/lib/projects"
import { structuredData } from "@/lib/seo"
import { climateHref, contentUpdated, localePath, projectPaths, servicePaths } from "@/lib/site"
import type { Locale } from "@/lib/translations"
import "./climate-layout.css"

// Anchors of the fixed sections (Spanish in every locale, like the routes).
const sectionIds = {
  comparison: "comparacion",
  cards: "componentes",
  facts: "datos-clave",
  related: "relacionados",
  faq: "preguntas-frecuentes",
} as const

function formatDate(locale: Locale, isoDate: string) {
  return new Intl.DateTimeFormat(locale, { dateStyle: "long", timeZone: "UTC" }).format(new Date(isoDate))
}

export function ClimateDocument({ locale, page }: { locale: Locale; page: ClimatePageKey }) {
  const copy = getClimate(locale)
  const ui = projectsUi[locale]
  const current = climatePage(locale, page)
  const related = relatedClimatePages(page)
  const crumbs = climateCrumbs(locale, page)
  const casePage = page === "hub" ? null : page
  const data = structuredData([
    ...climatePageGraph(locale, page),
    ...(casePage ? [climateCaseNode(locale, casePage)] : []),
  ])
  const [firstSection, ...otherSections] = current.sections
  const toc = [
    ...current.sections.map((section) => ({ id: section.id, label: section.heading })),
    ...(page === "hub" ? [{ id: sectionIds.comparison, label: copy.comparison }] : []),
    { id: sectionIds.cards, label: current.cardsTitle },
    { id: sectionIds.facts, label: current.factsTitle },
    { id: sectionIds.related, label: copy.related },
    { id: sectionIds.faq, label: copy.faq },
  ]
  const title = <h1>{current.title}</h1>

  const renderSection = (section: (typeof current.sections)[number]) => (
    <section key={section.id} id={section.id} className="climate-section" aria-labelledby={`${section.id}-title`}>
      <h2 id={`${section.id}-title`}>{section.heading}</h2>
      {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
    </section>
  )

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

        <div className="climate-layout">
          <div className="climate-layout__main">
            <header className="climate-hero">
              <p className="climate-kicker">{current.eyebrow}</p>
              <p className="climate-index">{copy.status}</p>
              {casePage ? (
                <ViewTransition name={`climate-title-${casePage}`} share="morph" default="none">
                  {title}
                </ViewTransition>
              ) : title}
              <p className="climate-lede">{current.lede}</p>
              <p className="climate-updated">
                {ui.updated} <time dateTime={contentUpdated}>{formatDate(locale, contentUpdated)}</time>
              </p>
              <aside className="climate-definition" aria-label={current.definitionLabel}>
                <span>{current.definitionLabel}</span>
                <p>{current.definition}</p>
              </aside>
            </header>

            {firstSection ? renderSection(firstSection) : null}
            {casePage ? <MethodDiagram locale={locale} page={casePage} /> : null}
            {otherSections.map(renderSection)}

            {page === "hub" ? (
              <section id={sectionIds.comparison} className="climate-section" aria-labelledby="comparison-title">
                <h2 id="comparison-title">{copy.comparison}</h2>
                <div className="climate-table-wrap">
                  <table>
                    <caption>{copy.comparisonCaption}</caption>
                    <thead>
                      <tr>
                        <th scope="col">{copy.columnTopic}</th>
                        <th scope="col">MRV</th>
                        <th scope="col">{locale === "fr" ? "S&E" : "M&E"}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {copy.rows.map((row) => (
                        <tr key={row.topic}>
                          <th scope="row">{row.topic}</th>
                          <td>{row.mrv}</td>
                          <td>{row.me}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            ) : null}

            <section id={sectionIds.cards} className="climate-section" aria-labelledby="cards-title">
              <h2 id="cards-title">{current.cardsTitle}</h2>
              <div className="climate-cards">
                {current.cards.map((card) => (
                  <section key={card.title} className="climate-card">
                    <h3>{card.title}</h3>
                    <p>{card.text}</p>
                    <ul>
                      {card.points.map((point) => <li key={point}>{point}</li>)}
                    </ul>
                  </section>
                ))}
              </div>
            </section>

            <section id={sectionIds.facts} className="climate-section" aria-labelledby="facts-title">
              <h2 id="facts-title">{current.factsTitle}</h2>
              <dl className="climate-facts">
                {current.facts.map((fact) => (
                  <div key={fact.term}>
                    <dt>{fact.term}</dt>
                    <dd>{fact.detail}</dd>
                  </div>
                ))}
              </dl>
            </section>

            <section id={sectionIds.related} className="climate-section" aria-labelledby="related-title">
              <h2 id="related-title">{copy.related}</h2>
              <ul className="climate-related">
                {related.map((item) => (
                  <li key={item}>
                    <Link href={climateHref(locale, item)}>
                      <span>{climatePage(locale, item).title}</span>
                      <ArrowUpRight aria-hidden="true" />
                    </Link>
                  </li>
                ))}
                <li>
                  <Link href={localePath(locale, projectPaths.index)}>
                    <span>{ui.related.allProjects}</span>
                    <ArrowUpRight aria-hidden="true" />
                  </Link>
                </li>
                <li>
                  <Link href={localePath(locale, servicePaths.geoviewers)}>
                    <span>{ui.related.geoviewers}</span>
                    <ArrowUpRight aria-hidden="true" />
                  </Link>
                </li>
              </ul>
            </section>

            <section id={sectionIds.faq} className="climate-section" aria-labelledby="faq-title">
              <h2 id="faq-title">{copy.faq}</h2>
              <div className="climate-faq">
                {current.faqs.map((faq) => (
                  <details key={faq.question}>
                    <summary>{faq.question}</summary>
                    <p>{faq.answer}</p>
                  </details>
                ))}
              </div>
            </section>
          </div>

          <aside className="climate-aside">
            {casePage ? <ProjectFacts locale={locale} project={getProject(casePage)} /> : null}
            <nav className="climate-toc" aria-labelledby="climate-toc-title">
              <p id="climate-toc-title" className="eyebrow">{ui.onThisPage}</p>
              <ol>
                {toc.map((item) => (
                  <li key={item.id}>
                    <a href={`#${item.id}`}>{item.label}</a>
                  </li>
                ))}
              </ol>
            </nav>
          </aside>
        </div>

        <p className="climate-note">{copy.disclaimer}</p>

        <section className="climate-cta" aria-labelledby="climate-cta-title">
          <div>
            <h2 id="climate-cta-title">{copy.ctaTitle}</h2>
            <p>{copy.ctaBody}</p>
          </div>
          <Button asChild variant="accent" size="lg">
            <ContactCta locale={locale} intent="project">
              {copy.ctaLabel}
              <ArrowRight aria-hidden="true" />
            </ContactCta>
          </Button>
        </section>
      </div>
    </article>
  )
}
