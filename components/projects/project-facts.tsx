import type { ReactNode } from "react"
import Link from "next/link"
import { projectCopy, projectStatusLabel, projectsUi } from "@/lib/project-content"
import type { ProjectDefinition } from "@/lib/projects"
import { localePath } from "@/lib/site"
import { getDictionary, type Locale } from "@/lib/translations"
import { cn } from "@/lib/utils"
import "./projects.css"

type FactRow = { key: string; label: string; value: ReactNode }

function hasText(value: string | null | undefined): value is string {
  return typeof value === "string" && value.trim().length > 0
}

/**
 * Project facts aside. A row renders only when its value exists: owner-only
 * fields (period, roles...) stay null until supplied and never show placeholders.
 */
export function ProjectFacts({
  locale,
  project,
  className,
}: {
  locale: Locale
  project: ProjectDefinition
  className?: string
}) {
  const ui = projectsUi[locale]
  const copy = projectCopy[locale][project.key]
  const services = getDictionary(locale).portfolio.services
  const titleId = `project-facts-${project.key}-title`
  const rows: FactRow[] = []

  if (hasText(project.counterpart)) {
    rows.push({ key: "counterpart", label: ui.facts.counterpart, value: project.counterpart })
  }
  if (project.supporters.length > 0) {
    rows.push({ key: "supporters", label: ui.facts.supporters, value: project.supporters.join(", ") })
  }
  if (hasText(copy.facts?.type)) {
    rows.push({ key: "type", label: ui.facts.type, value: copy.facts.type })
  }
  rows.push({
    key: "status",
    label: ui.facts.status,
    value: (
      <span className="status-chip" data-status={project.status}>
        {projectStatusLabel(locale, project.status)}
      </span>
    ),
  })
  // The localized role text exists only when the data model records a role.
  if (project.roles && project.roles.length > 0 && hasText(copy.facts?.role)) {
    rows.push({ key: "role", label: ui.facts.role, value: copy.facts.role })
  }
  if (hasText(copy.facts?.framework)) {
    rows.push({ key: "framework", label: ui.facts.framework, value: copy.facts.framework })
  }
  if (hasText(copy.facts?.coverage)) {
    rows.push({ key: "coverage", label: ui.facts.coverage, value: copy.facts.coverage })
  }
  if (hasText(project.period)) {
    rows.push({ key: "period", label: ui.facts.period, value: project.period })
  }
  if (project.stack.length > 0) {
    rows.push({ key: "stack", label: ui.facts.stack, value: project.stack.join(" · ") })
  }
  if (project.services.length > 0) {
    rows.push({
      key: "services",
      label: ui.facts.services,
      value: (
        <ul className="project-facts__chips">
          {project.services.map((service) => (
            <li key={service}>
              <Link className="chip" href={`${localePath(locale)}#servicio-${service}`}>
                {services[service].title}
              </Link>
            </li>
          ))}
        </ul>
      ),
    })
  }
  if (project.liveUrl) {
    rows.push({
      key: "link",
      label: ui.facts.link,
      value: (
        <a className="project-facts__link" href={project.liveUrl} target="_blank" rel="noopener noreferrer">
          {new URL(project.liveUrl).host}
          <span className="sr-only"> {ui.newTab}</span>
        </a>
      ),
    })
  }

  return (
    <aside className={cn("project-facts", className)} aria-labelledby={titleId}>
      <h2 id={titleId} className="eyebrow">{ui.facts.title}</h2>
      <dl>
        {rows.map((row) => (
          <div key={row.key} className="project-facts__row">
            <dt>{row.label}</dt>
            <dd>{row.value}</dd>
          </div>
        ))}
      </dl>
    </aside>
  )
}
