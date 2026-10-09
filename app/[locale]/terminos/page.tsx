import type { Metadata } from "next"
import TermsPage from "@/components/legal/terms-page"
import { getLocale } from "@/lib/i18n"
import { pageMetadata } from "@/lib/seo"
import { isLocale, type Locale } from "@/lib/translations"

const titles: Record<Locale, string> = {
  es: "Términos y Condiciones de Uso",
  en: "Terms and Conditions of Use",
  fr: "Conditions Générales d'Utilisation",
}

const descriptions: Record<Locale, string> = {
  es: "Términos de uso del sitio de GearsMap S.A.S., software geoespacial, geovisores e inteligencia artificial.",
  en: "Terms of use for the GearsMap S.A.S. website, covering geospatial software, geoviewers, and artificial intelligence.",
  fr: "Conditions d'utilisation du site de GearsMap S.A.S., logiciel géospatial, géovisionneuses et intelligence artificielle.",
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  if (!isLocale(locale)) return {}
  return pageMetadata({
    locale,
    path: "/terminos",
    title: titles[locale],
    description: descriptions[locale],
  })
}

export default async function LocalizedTermsPage() {
  const locale = await getLocale()
  return <TermsPage locale={locale} />
}
