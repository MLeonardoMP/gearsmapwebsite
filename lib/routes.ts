import type { MetadataRoute } from "next"
import { caseStudyProjects, getProject } from "@/lib/projects"
import { absoluteUrl, climatePaths, projectPaths, servicePaths } from "@/lib/site"
import { founders } from "@/lib/team"

type ChangeFrequency = NonNullable<MetadataRoute.Sitemap[number]["changeFrequency"]>

export type PublicRoute = {
  /** Locale-relative path; "" is the localized home. */
  path: string
  changeFrequency: ChangeFrequency
  priority: number
  /** ISO date; defaults to contentUpdated in the sitemap. */
  lastModified?: string
  /** Absolute image URLs for the image sitemap. */
  images?: string[]
}


function homeImages() {
  const acggp = getProject("acggp")
  return [
    ...(acggp.media ? [absoluteUrl(acggp.media.src.src)] : []),
    ...founders.map((member) => absoluteUrl(member.photo.src)),
  ]
}

/** Every public localized route. Each one exists under /es, /en and /fr with Spanish slugs. */
export const publicRoutes: PublicRoute[] = [
  { path: "", changeFrequency: "monthly", priority: 1, images: homeImages() },
  { path: servicePaths.geoviewers, changeFrequency: "monthly", priority: 0.9 },
  { path: projectPaths.index, changeFrequency: "monthly", priority: 0.8 },
  ...caseStudyProjects.map((project): PublicRoute => ({
    path: project.caseStudy.path,
    changeFrequency: "monthly",
    priority: 0.8,
    lastModified: project.updated,
    ...(project.media ? { images: [absoluteUrl(project.media.src.src)] } : {}),
  })),
  { path: climatePaths.hub, changeFrequency: "monthly", priority: 0.9 },
  { path: climatePaths.mrv, changeFrequency: "monthly", priority: 0.8 },
  { path: climatePaths.me, changeFrequency: "monthly", priority: 0.8 },
]
