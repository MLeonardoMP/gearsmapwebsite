import Image from "next/image"
import { founders } from "@/lib/team"
import { getDictionary, type Locale } from "@/lib/translations"

// DAY-0 STUB (WS3 replaces this file): renders the legacy team block with
// the pre-redesign markup and CSS classes.

/** Founders section: section#equipo with one article#<member.id> per founder. */
export function TeamSection({ locale }: { locale: Locale }) {
  const t = getDictionary(locale)

  return (
    <section id="equipo" className="team-block" aria-labelledby="team-title">
      <div className="section-heading section-heading--center">
        <h2 id="team-title">{t.team.title}</h2>
        <p className="section-heading__description">{t.team.subtitle}</p>
      </div>
      <div className="team-grid">
        {founders.map((member, index) => (
          <article key={member.id} id={member.id} className="team-card">
            <div className="team-card__image-wrap">
              <Image src={member.photo} alt={member.name} fill sizes="112px" className="team-card__image" />
              <span aria-hidden="true">0{index + 1}</span>
            </div>
            <h3>{member.name}</h3>
            <p>{t.team.roles[member.roleKey]}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
