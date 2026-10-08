import type { Metadata } from "next"
import { Suspense } from "react"
import { notFound } from "next/navigation"
import { InstantShell } from "@/components/instant-shell"
import PrivacyPage from "@/components/legal/privacy-page"
import { pageMetadata } from "@/lib/seo"
import { isLocale, type Locale } from "@/lib/translations"

const titles: Record<Locale, string> = {
  es: "Política de Privacidad",
  en: "Privacy Policy",
  fr: "Politique de Confidentialité",
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: value } = await params
  if (!isLocale(value)) return {}
  return pageMetadata({
    locale: value,
    path: "/privacidad",
    title: titles[value],
    description: value === "es"
      ? "Política de privacidad de GearsMap S.A.S.: datos del formulario de contacto, derechos y contacto."
      : value === "fr"
        ? "Politique de confidentialité de GearsMap S.A.S. : données du formulaire de contact, droits et contact."
        : "GearsMap S.A.S. privacy policy: contact-form data, rights, and how to reach us.",
  })
}

async function LocalizedPrivacyContent({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: value } = await params
  if (!isLocale(value)) notFound()
  return <PrivacyPage locale={value} />
}

export default function LocalizedPrivacyPage({ params }: { params: Promise<{ locale: string }> }) {
  return (
    <Suspense fallback={<InstantShell />}>
      <LocalizedPrivacyContent params={params} />
    </Suspense>
  )
}
