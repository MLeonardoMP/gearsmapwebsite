export type TeamRoleKey = "ceo" | "cpo" | "cdo" | "cco"

export type TeamMember = {
  id: string
  name: string
  roleKey: TeamRoleKey
  image: string
  linkedIn?: string
}

export const teamMembers: TeamMember[] = [
  { id: "leonardo-mosquera", name: "Leonardo Mosquera", roleKey: "ceo", image: "/images/Leonardo.jpg" },
  { id: "juan-esteban-mosquera", name: "Juan Esteban Mosquera", roleKey: "cpo", image: "/images/Juan_Esteban.jpg" },
  { id: "juan-manuel-jimenez", name: "Juan Manuel Jimenez", roleKey: "cdo", image: "/images/Juan_Manuel.jpg" },
  { id: "mateo-granados", name: "Mateo Granados", roleKey: "cco", image: "/images/Mateo.jpg" },
]
