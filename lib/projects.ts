export type ProjectStatus = "live" | "in-development" | "operational"

export type ProjectKey = "acggp" | "mrv" | "me" | "agricultural" | "fleet"

export type ProjectDefinition = {
  key: ProjectKey
  status: ProjectStatus
  color: string
  accent: string
  tags: string[]
  image?: string
  link?: string
  internalPath?: string
  featured?: boolean
}

export const projectDefinitions: ProjectDefinition[] = [
  {
    key: "acggp",
    status: "live",
    color: "project-card--blue",
    accent: "PPR / ACGGP",
    tags: ["React", "Mapbox", "Node.js"],
    image: "/images/acggp_visor.png",
    link: "https://acggp.gearsmap.com/",
    featured: true,
  },
  {
    key: "mrv",
    status: "operational",
    color: "project-card--green",
    accent: "MRV / MINMINAS · KFW",
    tags: ["Python", "Geospatial", "Data"],
    internalPath: "/sistemas-climaticos/mrv",
    featured: true,
  },
  {
    key: "me",
    status: "operational",
    color: "project-card--violet",
    accent: "M&E / MINMINAS · KFW",
    tags: ["Indicators", "Dashboards", "GIS"],
    internalPath: "/sistemas-climaticos/monitoreo-y-evaluacion",
    featured: true,
  },
  {
    key: "agricultural",
    status: "in-development",
    color: "project-card--amber",
    accent: "SATELLITE / ANALYSIS",
    tags: ["Python", "Satellite", "AI"],
  },
  {
    key: "fleet",
    status: "in-development",
    color: "project-card--slate",
    accent: "REAL-TIME / OPERATIONS",
    tags: ["IoT", "Real-time", "Dashboard"],
  },
]
