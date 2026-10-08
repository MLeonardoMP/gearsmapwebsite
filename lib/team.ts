import type { StaticImageData } from "next/image"
// WS3 moves these files to assets/team/<id>.jpg and updates the imports.
import leonardoPhoto from "@/public/images/Leonardo.jpg"
import juanEstebanPhoto from "@/public/images/Juan_Esteban.jpg"
import juanManuelPhoto from "@/public/images/Juan_Manuel.jpg"
import mateoPhoto from "@/public/images/Mateo.jpg"

export type TeamRoleKey = "ceo" | "cpo" | "cdo" | "cco"

export type TeamLinks = {
  linkedIn?: `https://www.linkedin.com/in/${string}`
  github?: `https://github.com/${string}`
  website?: `https://${string}`
}

export type TeamLinkKind = keyof TeamLinks

export type PortraitFocus = {
  x: number
  y: number
  zoom?: number
}

export type TeamMember = {
  id: string
  name: string
  givenName: string
  familyName: string
  roleKey: TeamRoleKey
  founder: boolean
  photo: StaticImageData
  focus: PortraitFocus
  links?: TeamLinks
}

// Ids are stable: they are page anchors and JSON-LD @ids.
export const founders: TeamMember[] = [
  {
    id: "leonardo-mosquera",
    name: "Leonardo Mosquera",
    givenName: "Leonardo",
    familyName: "Mosquera",
    roleKey: "ceo",
    founder: true,
    photo: leonardoPhoto,
    focus: { x: 48, y: 42 },
  },
  {
    id: "juan-esteban-mosquera",
    name: "Juan Esteban Mosquera",
    givenName: "Juan Esteban",
    familyName: "Mosquera",
    roleKey: "cpo",
    founder: true,
    photo: juanEstebanPhoto,
    focus: { x: 47, y: 45, zoom: 1.08 },
  },
  {
    id: "juan-manuel-jimenez",
    name: "Juan Manuel Jimenez",
    givenName: "Juan Manuel",
    familyName: "Jimenez",
    roleKey: "cdo",
    founder: true,
    photo: juanManuelPhoto,
    focus: { x: 50, y: 44 },
  },
  {
    id: "mateo-granados",
    name: "Mateo Granados",
    givenName: "Mateo",
    familyName: "Granados",
    roleKey: "cco",
    founder: true,
    photo: mateoPhoto,
    focus: { x: 48, y: 30, zoom: 1.22 },
  },
]

export function profileLinks(member: TeamMember): Array<{ kind: TeamLinkKind; href: string }> {
  const links = member.links ?? {}
  return (Object.keys(links) as TeamLinkKind[])
    .filter((kind) => Boolean(links[kind]))
    .map((kind) => ({ kind, href: links[kind] as string }))
}
