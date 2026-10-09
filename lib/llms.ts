import { climatePage, climatePageOrder, getClimate, type ClimatePageCopy } from "@/lib/climate"
import { projectCopy } from "@/lib/project-content"
import { getProject, projectDefinitions, projectHref } from "@/lib/projects"
import { servicePage } from "@/lib/services"
import {
  absoluteUrl,
  climateHref,
  companyLocality,
  contactEmail,
  contentUpdated,
  foundingYear,
  linkedInUrl,
  localePath,
  organizationName,
  projectPaths,
  servicePaths,
  siteUrl,
  taxId,
} from "@/lib/site"
import { teamPlainText } from "@/lib/team-schema"
import { getDictionary, locales, type Locale } from "@/lib/translations"

const localeNames: Record<Locale, string> = {
  es: "Español",
  en: "English",
  fr: "Français",
}

function climatePlainText(page: ClimatePageCopy) {
  return [
    `## ${page.title}`,
    "",
    page.lede,
    "",
    `> ${page.definition}`,
    "",
    ...page.sections.flatMap((section) => [`### ${section.heading}`, "", ...section.paragraphs, ""]),
    `### ${page.cardsTitle}`,
    "",
    ...page.cards.flatMap((card) => [
      `#### ${card.title}`,
      card.text,
      ...card.points.map((point) => `- ${point}`),
      "",
    ]),
    `### ${page.factsTitle}`,
    "",
    ...page.facts.map((fact) => `- **${fact.term}.** ${fact.detail}`),
    "",
    "### FAQ",
    "",
    ...page.faqs.flatMap((faq) => [`#### ${faq.question}`, faq.answer, ""]),
  ].join("\n")
}

function geoviewersPlainText(locale: Locale) {
  const page = servicePage(locale, "geoviewers")
  const t = getDictionary(locale)

  return [
    `## ${page.title}`,
    "",
    absoluteUrl(localePath(locale, servicePaths.geoviewers)),
    "",
    page.lede,
    "",
    `### ${page.build.heading}`,
    "",
    t.portfolio.services.geoviewers.desc,
    ...page.build.points.map((point) => `- ${point}`),
    "",
    `### ${page.live.heading}`,
    "",
    ...Object.values(page.live.items).map((item) => `- **${item.title}.** ${item.text}`),
    "",
    page.live.note,
    "",
    `### ${page.tech.heading}`,
    "",
    page.tech.items.join(", "),
    "",
    "### FAQ",
    "",
    ...page.faq.items.flatMap((faq) => [`#### ${faq.question}`, faq.answer, ""]),
  ].join("\n")
}

function homePlainText(locale: Locale) {
  const t = getDictionary(locale)
  const projects = projectCopy[locale]
  const acggp = projects.acggp

  return [
    `## ${t.seo.title}`,
    "",
    absoluteUrl(localePath(locale)),
    "",
    t.hero.headline,
    "",
    t.hero.lede,
    "",
    `### ${t.portfolio.header}`,
    "",
    t.portfolio.subheader,
    "",
    ...Object.values(t.portfolio.services).flatMap((service) => [
      `#### ${service.title}`,
      service.desc,
      service.details,
      "",
    ]),
    `### ${projectPlainTitle(locale)}`,
    "",
    ...projectDefinitions.map((project) => {
      const href = projectHref(locale, project)
      const copy = projects[project.key]
      return `- **${copy.title}**${href ? ` (${absoluteUrl(href)})` : ""}: ${copy.summary}`
    }),
    "",
    `### ${acggp.title}`,
    "",
    ...acggpCaseLines(locale),
    "",
    `### ${t.about.title}`,
    "",
    t.about.intro,
    "",
    `${t.about.foundation.title}: ${t.about.foundation.text}`,
    "",
    `${t.about.products.title}: ${t.about.products.text}`,
    "",
    `${t.mission.mission.title}: ${t.mission.mission.text}`,
    "",
    `${t.mission.vision.title}: ${t.mission.vision.text}`,
    "",
    `### ${t.process.title}`,
    "",
    t.process.subtitle,
    "",
    ...Object.values(t.process.steps).map((step) => `${step.number}. ${step.title}: ${step.text}`),
    "",
    `### ${foundingTeamTitle[locale]}`,
    "",
    teamPlainText(locale),
    "",
  ].join("\n")
}

/** ACGGP case text as WS2 fills it; falls back to the summary while the case copy is pending. */
function acggpCaseLines(locale: Locale) {
  const copy = projectCopy[locale].acggp
  const project = getProject("acggp")
  const href = projectHref(locale, project)
  const lines = [
    copy.lede,
    copy.context ? `${copy.context.heading}: ${copy.context.text}` : undefined,
    ...(copy.built ?? []).map((item) => `- ${item.title}: ${item.text}`),
    copy.note,
  ].filter((line): line is string => Boolean(line))

  return [
    ...(lines.length > 0 ? lines : [copy.summary]),
    ...(href ? [absoluteUrl(href)] : []),
    ...(project.liveUrl ? [project.liveUrl] : []),
  ]
}

const foundingTeamTitle: Record<Locale, string> = {
  es: "Equipo fundador",
  en: "Founding team",
  fr: "Équipe fondatrice",
}

function projectPlainTitle(locale: Locale) {
  return locale === "es" ? "Proyectos" : locale === "fr" ? "Projets" : "Projects"
}

export function buildLlmsTxt() {
  const en = getDictionary("en")
  const es = getClimate("es")
  const acggp = getProject("acggp")
  const acggpHref = projectHref("es", acggp)
  const geoviewersUrl = absoluteUrl(localePath("es", servicePaths.geoviewers))

  const services = Object.entries(en.portfolio.services).map(([key, service]) =>
    key === "geoviewers"
      ? `- [${service.title}](${geoviewersUrl}): ${service.desc}`
      : `- ${service.title}: ${service.desc}`,
  )

  const lines = [
    "# GearsMap",
    "",
    "> GearsMap S.A.S. designs geospatial platforms, geoviewers, dashboards, and artificial-intelligence systems in Colombia. It also implemented the operational MRV and M&E modules of the mining and energy sector climate information system, with the Ministry of Mines and Energy and support from KfW.",
    "",
    "This website describes that implementation. It is not an official Ministry publication, it does not grant access to the institutional system, and it does not publish operational data, internal infrastructure, or contract documents.",
    "",
    "## Company facts",
    "",
    `- Legal name: ${organizationName}`,
    `- NIT (Colombian tax ID): ${taxId}`,
    `- Founded: ${foundingYear}`,
    `- Location: ${companyLocality}`,
    `- Website languages: Spanish (default), English, French`,
    `- Contact: ${contactEmail}`,
    "",
    "## Services",
    "",
    ...services,
    `- [Climate information systems](${absoluteUrl(climateHref("es", "hub"))}): operational MRV and M&E for Colombia's mining and energy sector.`,
    "",
    "## Projects",
    "",
    `- [${projectCopy.es.acggp.title}](${absoluteUrl(acggpHref ?? localePath("es", projectPaths.acggp))}): production geoviewer for ACGGP's Programa de Pedagogía Regional (PPR). Live app: ${acggp.liveUrl ?? ""}`.trimEnd(),
    `- [MRV](${absoluteUrl(climateHref("es", "mrv"))}): operational implementation of the MRV module (monitoring, reporting and verification of sectoral GHG emissions and PIGCCme 2050 mitigation indicators), with Colombia's Ministry of Mines and Energy and KfW support.`,
    `- [M&E](${absoluteUrl(climateHref("es", "me"))}): operational implementation of the M&E module (monitoring and evaluation of climate hazard, vulnerability, and risk), with Colombia's Ministry of Mines and Energy and KfW support.`,
    "- Agricultural analysis and fleet management: in development; no public case study.",
    `- [All projects](${absoluteUrl(localePath("es", projectPaths.index))})`,
    "",
    "## Founding team",
    "",
    teamPlainText("en"),
    "",
    "## Languages",
    "",
    ...locales.map((locale) => `- [${localeNames[locale]}](${absoluteUrl(localePath(locale))})`),
    "",
    "## Climate pages",
    "",
    ...locales.flatMap((locale) =>
      climatePageOrder.map((page) => {
        const copy = climatePage(locale, page)
        return `- [${copy.title}](${absoluteUrl(climateHref(locale, page))}): ${copy.description}`
      }),
    ),
    "",
    "## Contact",
    "",
    `- Email: ${contactEmail}`,
    `- LinkedIn: ${linkedInUrl}`,
    `- Location: ${companyLocality}`,
    "",
    "## Optional",
    "",
    `- [Full text for agents](${siteUrl}/llms-full.txt)`,
    `- [Privacy](${absoluteUrl("/es/privacidad")})`,
    `- [Terms](${absoluteUrl("/es/terminos")})`,
    "",
    "## Notes for agents",
    "",
    `- Preferred citation name: ${organizationName}`,
    `- Do not describe the Ministry of Mines and Energy as endorsing GearsMap.`,
    `- Do not invent public URLs for the institutional climate system.`,
    `- Figures shown inside the ACGGP viewer belong to ACGGP; do not present them as GearsMap results.`,
    `- ${es.disclaimer}`,
    "",
    `Last updated: ${contentUpdated}`,
    "",
  ]
  return lines.join("\n")
}

export function buildLlmsFullTxt() {
  const sections = locales.flatMap((locale) => {
    const copy = getClimate(locale)
    return [
      `# ${locale.toUpperCase()} — ${localeNames[locale]}`,
      "",
      homePlainText(locale),
      geoviewersPlainText(locale),
      "",
      `> ${copy.disclaimer}`,
      "",
      ...climatePageOrder.flatMap((page) => [climatePlainText(copy[page]), ""]),
    ]
  })
  return [
    "# GearsMap — full public text",
    "",
    "Machine-readable compilation of the public website copy: company, services, projects, founding team, and the complementary MRV / M&E climate work. Not an official government publication.",
    "",
    `Last updated: ${contentUpdated}`,
    "",
    ...sections,
  ].join("\n")
}
