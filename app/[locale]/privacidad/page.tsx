import type { Metadata } from "next"
import PrivacyPage from "@/components/legal/privacy-page"
import { getLocale } from "@/lib/i18n"
import { pageMetadata } from "@/lib/seo"
import { isLocale, type Locale } from "@/lib/translations"

const titles: Record<Locale, string> = {
  es: "Política de Privacidad",
  en: "Privacy Policy",
  fr: "Politique de Confidentialité",
}

const descriptions: Record<Locale, string> = {
  es: "Política de privacidad de GearsMap S.A.S.: datos del formulario de contacto, derechos y contacto.",
  en: "GearsMap S.A.S. privacy policy: contact-form data, rights, and how to reach us.",
  fr: "Politique de confidentialité de GearsMap S.A.S. : données du formulaire de contact, droits et contact.",
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  if (!isLocale(locale)) return {}
  return pageMetadata({
    locale,
    path: "/privacidad",
    title: titles[locale],
    description: descriptions[locale],
    noindex: true,
  })
}

export default async function LocalizedPrivacyPage() {
  const locale = await getLocale()
  return <PrivacyPage locale={locale} />
}
