import type { StaticImageData } from "next/image"
import acggpShot from "@/public/images/acggp_visor.png"
import { climateHref, contentUpdated, localePath, projectPaths } from "@/lib/site"
import type { Locale } from "@/lib/translations"

export type ProjectKey = "acggp" | "mrv" | "me" | "agricultural" | "fleet"
export type ProjectStatus = "live" | "operational" | "in-development"
export type ProjectTier = "featured" | "climate" | "exploration"
export type ServiceKey = "ai" | "geoviewers" | "visualization" | "dashboards" | "automation" | "monitoring"

/** null = the owner has not supplied this yet. The UI omits it; never render placeholder text. */
export type Pending<T> = T | null

export type ProjectCaseStudy =
  | { kind: "page"; path: string }
  | { kind: "climate"; page: "mrv" | "me" }

export type ProjectDefinition = {
  key: ProjectKey
  status: ProjectStatus
  tier: ProjectTier
  caseStudy: ProjectCaseStudy | null
  counterpart: Pending<string>
  supporters: string[]
  stack: string[]
  services: ServiceKey[]
  liveUrl?: string
  media?: { src: StaticImageData }
  period: Pending<string>
  roles: Pending<string[]>
  /** ISO date of the last content change. */
  updated: string
}

export type CaseStudyPageProject = ProjectDefinition & {
  caseStudy: { kind: "page"; path: string }
}

export const projectDefinitions: ProjectDefinition[] = [
  {
    key: "acggp",
    status: "live",
    tier: "featured",
    caseStudy: { kind: "page", path: projectPaths.acggp },
    counterpart: "ACGGP",
    supporters: [],
    // Leaflet per the screenshot attribution; owner to confirm.
    stack: ["React", "Leaflet", "Node.js"],
    services: ["geoviewers", "visualization", "dashboards"],
    liveUrl: "https://acggp.gearsmap.com/",
    media: { src: acggpShot },
    period: null,
    roles: null,
    updated: "2026-10-08",
  },
  {
    key: "mrv",
    status: "operational",
    tier: "climate",
    caseStudy: { kind: "climate", page: "mrv" },
    counterpart: "Ministerio de Minas y Energía",
    supporters: ["KfW"],
    stack: [],
    services: ["dashboards", "geoviewers", "automation"],
    period: null,
    roles: ["implementation"],
    updated: contentUpdated,
  },
  {
    key: "me",
    status: "operational",
    tier: "climate",
    caseStudy: { kind: "climate", page: "me" },
    counterpart: "Ministerio de Minas y Energía",
    supporters: ["KfW"],
    stack: [],
    services: ["geoviewers", "visualization", "dashboards"],
    period: null,
    roles: ["implementation"],
    updated: contentUpdated,
  },
  {
    key: "agricultural",
    status: "in-development",
    tier: "exploration",
    caseStudy: null,
    counterpart: null,
    supporters: [],
    stack: ["Python"],
    services: ["ai", "visualization"],
    period: null,
    roles: null,
    updated: contentUpdated,
  },
  {
    key: "fleet",
    status: "in-development",
    tier: "exploration",
    caseStudy: null,
    counterpart: null,
    supporters: [],
    stack: [],
    services: ["dashboards", "automation"],
    period: null,
    roles: null,
    updated: contentUpdated,
  },
]

export function getProject(key: ProjectKey): ProjectDefinition {
  const project = projectDefinitions.find((item) => item.key === key)
  if (!project) throw new Error(`Unknown project: ${key}`)
  return project
}

function isCaseStudyPage(project: ProjectDefinition): project is CaseStudyPageProject {
  return project.caseStudy?.kind === "page"
}

/** Projects with their own page under /[locale]/proyectos/... (for routes, sitemap, OG). */
export const caseStudyProjects: CaseStudyPageProject[] = projectDefinitions.filter(isCaseStudyPage)

/** Localized href of a project's case study, or null when it has none. */
export function projectHref(locale: Locale, project: ProjectDefinition): string | null {
  if (!project.caseStudy) return null
  if (project.caseStudy.kind === "page") return localePath(locale, project.caseStudy.path)
  return climateHref(locale, project.caseStudy.page)
}

export function projectsByTier(tier: ProjectTier) {
  return projectDefinitions.filter((project) => project.tier === tier)
}
