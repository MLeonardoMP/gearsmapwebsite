import type { CSSProperties } from "react"
import { cn } from "@/lib/utils"
import type { Dictionary } from "@/lib/translations"

type TechGroupKey = keyof Dictionary["techStack"]["groups"]

type Tech = {
  name: string
  src: string
  /** Marks drawn on a filled tile (e.g. .NET) read better from luminance than from alpha. */
  luminance?: boolean
}

const techGroups: Array<{ key: TechGroupKey; items: Tech[] }> = [
  {
    key: "geo",
    items: [
      { name: "QGIS", src: "/images/qgis.svg" },
      { name: "Mapbox", src: "/images/mapbox.svg" },
    ],
  },
  {
    key: "data",
    items: [
      { name: "Python", src: "/images/python.svg" },
      { name: "PyTorch", src: "/images/pytorch.svg" },
      { name: "OpenAI", src: "/images/openai.svg" },
      { name: "PostgreSQL", src: "/images/postgresql.svg" },
    ],
  },
  {
    key: "web",
    items: [
      { name: "React", src: "/images/react.svg" },
      { name: "Next.js", src: "/images/nextjs.svg" },
      { name: "TypeScript", src: "/images/typescript.svg" },
      { name: ".NET", src: "/images/dotnet.svg", luminance: true },
      { name: "Blazor", src: "/images/blazor.svg" },
      { name: "Tailwind CSS", src: "/images/tailwind.svg" },
    ],
  },
  {
    key: "cloud",
    items: [
      { name: "Azure", src: "/images/azure.svg" },
      { name: "Vercel", src: "/images/Vercel_dark.svg" },
      { name: "Docker", src: "/images/docker.svg" },
    ],
  },
]

/** Static, grouped technology list. Marks are CSS masks painted with currentColor so they work in both themes. */
export function TechStack({ t }: { t: Dictionary }) {
  return (
    <div className="tech-stack">
      <div className="tech-stack__intro">
        <h3 id="tech-stack-title">{t.techStack.title}</h3>
        <p>{t.techStack.subtitle}</p>
      </div>
      <div className="tech-stack__groups">
        {techGroups.map((group) => (
          <div key={group.key} className="tech-stack__group">
            <h4>{t.techStack.groups[group.key]}</h4>
            <ul>
              {group.items.map((tech) => (
                <li key={tech.name}>
                  <span
                    className={cn("tech-mark", tech.luminance && "tech-mark--luminance")}
                    style={{ "--mark": `url(${tech.src})` } as CSSProperties}
                    aria-hidden="true"
                  />
                  {tech.name}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}
