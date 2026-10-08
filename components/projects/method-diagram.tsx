import { projectsUi } from "@/lib/project-content"
import type { Locale } from "@/lib/translations"
import { cn } from "@/lib/utils"
import "./projects.css"

/** Method of a climate module as an ordered list of steps. HTML (not SVG) so it themes, wraps and translates. */
export function MethodDiagram({
  locale,
  page,
  className,
}: {
  locale: Locale
  page: "mrv" | "me"
  className?: string
}) {
  const ui = projectsUi[locale]

  return (
    <figure className={cn("method-diagram", className)}>
      <ol>
        {ui.method[page].map((step) => <li key={step}>{step}</li>)}
      </ol>
      <figcaption className="eyebrow">{ui.diagram}</figcaption>
    </figure>
  )
}
