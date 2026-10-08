import Link from "next/link"
import { ArrowRight, ArrowUpRight } from "lucide-react"
import { JsonLd } from "@/components/seo/json-ld"
import { Button } from "@/components/ui/button"
import { climatePage, getClimate, relatedClimatePages, type ClimatePageKey } from "@/lib/climate"
import {
  breadcrumbNode,
  faqNode,
  organizationNode,
  serviceNode,
  structuredData,
  webPageNode,
  websiteNode,
} from "@/lib/seo"
import { absoluteUrl, climateHref, siteName } from "@/lib/site"
import type { Locale } from "@/lib/translations"

const serviceTypes: Record<ClimatePageKey, string> = {
  hub: "Climate information systems",
  mrv: "Monitoring, reporting and verification",
  me: "Climate monitoring and evaluation",
}

export function ClimateDocument({ locale, page }: { locale: Locale; page: ClimatePageKey }) {
  const copy = getClimate(locale)
  const current = climatePage(locale, page)
  const related = relatedClimatePages(page)
  const pagePath = climateHref(locale, page)
  const crumbs = page === "hub"
    ? [
        { name: copy.home, path: `/${locale}` },
        { name: current.title, path: pagePath },
      ]
    : [
        { name: copy.home, path: `/${locale}` },
        { name: copy.hub.title, path: climateHref(locale, "hub") },
        { name: current.title, path: pagePath },
      ]

  const data = structuredData([
    organizationNode(),
    websiteNode(locale),
    webPageNode({
      locale,
      path: pagePath.replace(`/${locale}`, ""),
      title: current.seoTitle,
      description: current.description,
    }),
    breadcrumbNode(crumbs),
    faqNode(current.faqs),
    serviceNode({
      name: current.seoTitle,
      description: current.description,
      serviceType: serviceTypes[page],
      url: absoluteUrl(pagePath),
    }),
  ])

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
          <p className="climate-kicker">{current.eyebrow}</p>
          <p className="climate-index">{copy.status}</p>
          <h1>{current.title}</h1>
          <p className="climate-lede">{current.lede}</p>
          <aside className="climate-definition" aria-label={current.definitionLabel}>
            <span>{current.definitionLabel}</span>
            <p>{current.definition}</p>
          </aside>
        </header>

        {current.sections.map((section) => (
          <section key={section.id} id={section.id} className="climate-section" aria-labelledby={`${section.id}-title`}>
            <h2 id={`${section.id}-title`}>{section.heading}</h2>
            {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </section>
        ))}

        {page === "hub" ? (
          <section className="climate-section" aria-labelledby="comparison-title">
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

        <section className="climate-section" aria-labelledby="cards-title">
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

        <section className="climate-section" aria-labelledby="facts-title">
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

        <section className="climate-section" aria-labelledby="related-title">
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
              <Link href={`/${locale}#portafolio`}>
                <span>{copy.home} · {siteName}</span>
                <ArrowUpRight aria-hidden="true" />
              </Link>
            </li>
          </ul>
        </section>

        <section className="climate-section" aria-labelledby="faq-title">
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

        <p className="climate-note">{copy.disclaimer}</p>

        <section className="climate-cta" aria-labelledby="climate-cta-title">
          <div>
            <h2 id="climate-cta-title">{copy.ctaTitle}</h2>
            <p>{copy.ctaBody}</p>
          </div>
          <Button asChild>
            <Link href={`/${locale}#contacto`}>
              {copy.ctaLabel}
              <ArrowRight aria-hidden="true" />
            </Link>
          </Button>
        </section>
      </div>
    </article>
  )
}
