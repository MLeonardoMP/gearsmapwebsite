import type { ComponentType, CSSProperties, SVGProps } from "react"
import Image from "next/image"
import { ArrowRight, Globe } from "lucide-react"
import { ContactCta } from "@/components/home/contact-cta"
import { GitHubIcon, LinkedInIcon } from "@/components/icons/brand-icons"
import { founders, profileLinks, type PortraitFocus, type TeamLinkKind } from "@/lib/team"
import { teamCopy, withName } from "@/lib/team-content"
import type { Locale } from "@/lib/translations"
import "./team-section.css"

const linkIcons: Record<TeamLinkKind, ComponentType<SVGProps<SVGSVGElement>>> = {
  linkedIn: LinkedInIcon,
  github: GitHubIcon,
  website: Globe,
}

// Portraits are square sources cover-fitted into a 4:5 frame, so the
// rendered image is as wide as the frame is tall, times the zoom. Frame
// widths follow team-section.css: 4 columns from a 64rem container
// (viewport >= 1072px, max 80rem container), 7.5rem from 40rem, else 6rem.
const frameWidths = { wide: 279, medium: 120, narrow: 96 }

function portraitSizes({ zoom = 1 }: PortraitFocus) {
  const rendered = (frameWidth: number) => Math.ceil(frameWidth * 1.25 * zoom)

  return `(min-width: 1072px) ${rendered(frameWidths.wide)}px, (min-width: 688px) ${rendered(frameWidths.medium)}px, ${rendered(frameWidths.narrow)}px`
}

function focusStyle({ x, y, zoom = 1 }: PortraitFocus) {
  return {
    "--focus-x": `${x}%`,
    "--focus-y": `${y}%`,
    "--zoom": zoom,
  } as CSSProperties
}

/** Founders section: section#equipo with one article#<member.id> per founder. */
export function TeamSection({ locale }: { locale: Locale }) {
  const copy = teamCopy[locale]

  return (
    <section id="equipo" className="founders" aria-labelledby="team-title">
      <div className="section-heading section-heading--left">
        <p className="eyebrow">{copy.eyebrow}</p>
        <h2 id="team-title" className="founders__title">{copy.title}</h2>
        <p className="section-heading__description">{copy.subtitle}</p>
      </div>

      <ul className="founders-grid" role="list">
        {founders.map((member) => {
          const role = copy.roles[member.roleKey]
          const bio = copy.bios[member.id]
          const links = profileLinks(member)

          return (
            <li key={member.id}>
              <article id={member.id} className="founder-card reveal" aria-labelledby={`${member.id}-name`}>
                <div className="founder-card__media" style={focusStyle(member.focus)}>
                  <Image
                    src={member.photo}
                    alt={withName(copy.portraitAlt, member.name)}
                    fill
                    placeholder="blur"
                    sizes={portraitSizes(member.focus)}
                    className="founder-card__image"
                  />
                </div>
                <div className="founder-card__identity">
                  <p className="founder-card__badge">
                    <abbr title={role.title}>{role.short}</abbr> · {copy.founderLabel}
                  </p>
                  <h3 id={`${member.id}-name`} className="founder-card__name">{member.name}</h3>
                  <p className="founder-card__role">{role.focus}</p>
                </div>
                <p className="founder-card__summary">{role.summary}</p>
                {bio ? <p className="founder-card__bio">{bio}</p> : null}
                {links.length > 0 ? (
                  <ul className="founder-card__links" role="list" aria-label={withName(copy.linksLabel, member.name)}>
                    {links.map(({ kind, href }) => {
                      const Icon = linkIcons[kind]

                      return (
                        <li key={kind}>
                          <a
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={withName(copy.linkLabels[kind], member.name)}
                            className="founder-card__link"
                          >
                            <Icon aria-hidden="true" focusable="false" className="founder-card__link-icon" />
                          </a>
                        </li>
                      )
                    })}
                  </ul>
                ) : null}
              </article>
            </li>
          )
        })}
      </ul>

      <div className="founders-cta">
        <p>{copy.cta.text}</p>
        <ContactCta intent="project" className="text-link">
          {copy.cta.label} <ArrowRight aria-hidden="true" className="founders-cta__icon" />
        </ContactCta>
      </div>
    </section>
  )
}
