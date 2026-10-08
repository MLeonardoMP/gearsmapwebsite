import type { Metadata } from "next"
import { Suspense } from "react"
import { notFound } from "next/navigation"
import { InstantShell } from "@/components/instant-shell"
import TermsPage from "@/components/legal/terms-page"
import { pageMetadata } from "@/lib/seo"
import { isLocale, type Locale } from "@/lib/translations"

const titles: Record<Locale, string> = {
  es: "Términos y Condiciones de Uso",
  en: "Terms and Conditions of Use",
  fr: "Conditions Générales d'Utilisation",
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: value } = await params
  if (!isLocale(value)) return {}
  return pageMetadata({
    locale: value,
    path: "/terminos",
    title: titles[value],
    description: value === "es"
      ? "Términos de uso del sitio de GearsMap S.A.S., software geoespacial, geovisores e inteligencia artificial."
      : value === "fr"
        ? "Conditions d'utilisation du site de GearsMap S.A.S., logiciel géospatial, géovisionneuses et intelligence artificielle."
        : "Terms of use for the GearsMap S.A.S. website, covering geospatial software, geoviewers, and artificial intelligence.",
  })
}

async function LocalizedTermsContent({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: value } = await params
  if (!isLocale(value)) notFound()
  return <TermsPage locale={value} />
}

export default function LocalizedTermsPage({ params }: { params: Promise<{ locale: string }> }) {
  return (
    <Suspense fallback={<InstantShell />}>
      <LocalizedTermsContent params={params} />
    </Suspense>
  )
}
