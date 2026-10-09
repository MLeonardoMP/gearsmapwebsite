import Link from "next/link"
import { BadgeCheck, CalendarDays, Landmark, MapPin } from "lucide-react"
import { climateHref, localePath, projectPaths } from "@/lib/site"
import type { Dictionary, Locale } from "@/lib/translations"

/** Facts strip under the hero. Every item comes from facts already published on the site. */
export function ProofBar({ t, locale }: { t: Dictionary; locale: Locale }) {
  return (
    <section className="proof-bar" aria-labelledby="proof-title">
      <h2 id="proof-title" className="sr-only">{t.proofBar.title}</h2>
      <div className="site-container">
        <ul>
          <li>
            <BadgeCheck aria-hidden="true" />
            <Link href={localePath(locale, projectPaths.acggp)}>{t.proofBar.live}</Link>
          </li>
          <li>
            <Landmark aria-hidden="true" />
            <Link href={climateHref(locale, "hub")}>{t.proofBar.climate}</Link>
          </li>
          <li>
            <MapPin aria-hidden="true" />
            <span>{t.proofBar.place}</span>
          </li>
          <li>
            <CalendarDays aria-hidden="true" />
            <span>{t.proofBar.founded}</span>
          </li>
        </ul>
      </div>
    </section>
  )
}
