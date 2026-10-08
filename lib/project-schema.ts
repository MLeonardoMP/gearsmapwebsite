import { climateServiceId } from "@/lib/climate-schema"
import { projectCopy, projectStatusLabel, projectsUi } from "@/lib/project-content"
import {
  getProject,
  projectDefinitions,
  projectHref,
  type ProjectDefinition,
  type ProjectKey,
} from "@/lib/projects"
import {
  breadcrumbNode,
  organizationId,
  organizationNode,
  structuredData,
  webPageNode,
  websiteNode,
} from "@/lib/seo"
import { absoluteUrl, localePath, projectPaths } from "@/lib/site"
import type { Locale } from "@/lib/translations"

function inLanguage(locale: Locale) {
  return locale === "es" ? "es-CO" : locale
}

/** `@id` of the WebApplication node for a project with its own case-study page. */
export function projectApplicationId(locale: Locale, project: ProjectDefinition) {
  if (project.caseStudy?.kind !== "page") return null
  return `${absoluteUrl(localePath(locale, project.caseStudy.path))}#application`
}

function projectNode(locale: Locale, project: ProjectDefinition) {
  const copy = projectCopy[locale][project.key]
  const applicationId = projectApplicationId(locale, project)

  if (applicationId && project.liveUrl) {
    return {
      "@type": "WebApplication",
      "@id": applicationId,
      name: copy.title,
      description: copy.summary,
      url: project.liveUrl,
      applicationCategory: "Geographic information system",
      operatingSystem: "Web browser",
      creator: { "@id": organizationId },
      ...(project.media ? { screenshot: absoluteUrl(project.media.src.src) } : {}),
      ...(project.stack.length > 0 ? { keywords: project.stack.join(", ") } : {}),
    }
  }

  const href = projectHref(locale, project)
  const mentions = [project.counterpart, ...project.supporters]
    .filter((name): name is string => Boolean(name))
    .map((name) => ({ "@type": "Organization", name }))

  return {
    "@type": "CreativeWork",
    name: copy.title,
    description: copy.summary,
    inLanguage: inLanguage(locale),
    creativeWorkStatus: projectStatusLabel(locale, project.status),
    creator: { "@id": organizationId },
    ...(href ? { url: absoluteUrl(href) } : {}),
    ...(mentions.length > 0 ? { mentions } : {}),
  }
}

/** ItemList of every project for the home page graph. No offers, ratings or reviews. */
export function projectListNode(locale: Locale) {
  return {
    "@type": "ItemList",
    "@id": `${absoluteUrl(localePath(locale))}#proyectos`,
    name: projectsUi[locale].title,
    itemListElement: projectDefinitions.map((project, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: projectNode(locale, project),
    })),
  }
}

/** Case-study CreativeWork for a climate page; `about` points at that page's Service node. */
export function climateCaseNode(locale: Locale, page: "mrv" | "me") {
  const project = getProject(page)
  const copy = projectCopy[locale][page]
  const url = absoluteUrl(projectHref(locale, project) ?? localePath(locale))

  return {
    "@type": "CreativeWork",
    "@id": `${url}#case-study`,
    genre: "case study",
    name: copy.title,
    description: copy.summary,
    url,
    inLanguage: inLanguage(locale),
    creativeWorkStatus: projectStatusLabel(locale, project.status),
    creator: { "@id": organizationId },
    dateModified: project.updated,
    about: { "@id": climateServiceId(locale, page) },
  }
}

/** Visible and JSON-LD breadcrumb trail: Home / Projects (/ project). */
export function projectCrumbs(locale: Locale, project?: ProjectDefinition) {
  const ui = projectsUi[locale]
  const crumbs = [
    { name: ui.breadcrumbHome, path: localePath(locale) },
    { name: ui.index.h1, path: localePath(locale, projectPaths.index) },
  ]
  const href = project ? projectHref(locale, project) : null
  if (project && href) crumbs.push({ name: projectCopy[locale][project.key].title, path: href })
  return crumbs
}

function screenshotNode(project: ProjectDefinition, caption?: string) {
  if (!project.media) return null
  const { src, width, height } = project.media.src
  return {
    "@type": "ImageObject",
    url: absoluteUrl(src),
    contentUrl: absoluteUrl(src),
    width,
    height,
    ...(caption ? { caption } : {}),
  }
}

/** JSON-LD for a project case-study page: WebPage, breadcrumb, CreativeWork and WebApplication. */
export function caseStudyGraph(locale: Locale, key: ProjectKey = "acggp") {
  const project = getProject(key)
  if (project.caseStudy?.kind !== "page") throw new Error(`Project ${key} has no case-study page`)

  const copy = projectCopy[locale][key]
  const path = project.caseStudy.path
  const url = absoluteUrl(localePath(locale, path))
  const title = copy.seoTitle ?? copy.title
  const description = copy.description ?? copy.summary
  const image = screenshotNode(project, copy.caption)

  return structuredData([
    organizationNode(),
    websiteNode(locale),
    {
      ...webPageNode({ locale, path, title, description }),
      dateModified: project.updated,
      ...(image ? { primaryImageOfPage: image } : {}),
    },
    breadcrumbNode(projectCrumbs(locale, project)),
    {
      "@type": "CreativeWork",
      "@id": `${url}#case-study`,
      genre: "case study",
      headline: title,
      name: copy.title,
      description,
      url,
      inLanguage: inLanguage(locale),
      mainEntityOfPage: { "@id": `${url}#webpage` },
      creator: { "@id": organizationId },
      publisher: { "@id": organizationId },
      dateModified: project.updated,
      ...(image ? { image } : {}),
      about: { "@id": `${url}#application` },
      ...(project.counterpart ? { mentions: { "@type": "Organization", name: project.counterpart } } : {}),
    },
    projectNode(locale, project),
  ])
}

/** JSON-LD for /[locale]/proyectos: a CollectionPage listing every project with a case target. */
export function projectsCollectionGraph(locale: Locale) {
  const ui = projectsUi[locale]
  const path = projectPaths.index
  const url = absoluteUrl(localePath(locale, path))
  const items = projectDefinitions.flatMap((project) => {
    const href = projectHref(locale, project)
    return href ? [{ project, href }] : []
  })

  return structuredData([
    organizationNode(),
    websiteNode(locale),
    {
      ...webPageNode({ locale, path, title: ui.index.seoTitle, description: ui.index.description }),
      "@type": "CollectionPage",
      mainEntity: {
        "@type": "ItemList",
        "@id": `${url}#list`,
        name: ui.index.h1,
        itemListElement: items.map(({ project, href }, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: projectCopy[locale][project.key].title,
          url: absoluteUrl(href),
        })),
      },
    },
    breadcrumbNode(projectCrumbs(locale)),
  ])
}
