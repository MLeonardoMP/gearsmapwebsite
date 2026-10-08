import { founders } from "@/lib/team"
import { teamCopy } from "@/lib/team-content"
import { absoluteUrl, organizationId, siteUrl } from "@/lib/site"
import type { Locale } from "@/lib/translations"

export function personId(id: string) {
  return `${siteUrl}/#${id}`
}

export function founderRefs() {
  return founders.map((member) => ({ "@id": personId(member.id) }))
}

export function personNodes(locale: Locale) {
  const { roles } = teamCopy[locale]

  return founders.map((member) => {
    const role = roles[member.roleKey]
    const sameAs = Object.values(member.links ?? {}).filter(Boolean)

    return {
      "@type": "Person",
      "@id": personId(member.id),
      name: member.name,
      givenName: member.givenName,
      familyName: member.familyName,
      jobTitle: `${role.title} (${role.short})`,
      description: role.summary,
      image: {
        "@type": "ImageObject",
        url: absoluteUrl(member.photo.src),
        width: member.photo.width,
        height: member.photo.height,
      },
      url: absoluteUrl(`/${locale}#${member.id}`),
      worksFor: { "@id": organizationId },
      ...(sameAs.length > 0 ? { sameAs } : {}),
    }
  })
}

/** One line per founder, for llms.txt: `- Name — Title (SHORT), focus. URL` */
export function teamPlainText(locale: Locale) {
  const { roles } = teamCopy[locale]

  return founders
    .map((member) => {
      const role = roles[member.roleKey]
      return `- ${member.name} — ${role.title} (${role.short}), ${role.focus}. ${absoluteUrl(`/${locale}#${member.id}`)}`
    })
    .join("\n")
}
