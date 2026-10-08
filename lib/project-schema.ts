import { climateServiceId } from "@/lib/climate-schema"
import { projectCopy, projectStatusLabel, projectsUi } from "@/lib/project-content"
import { getProject, projectDefinitions, projectHref, type ProjectDefinition } from "@/lib/projects"
import { organizationId } from "@/lib/seo"
import { absoluteUrl, localePath } from "@/lib/site"
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
