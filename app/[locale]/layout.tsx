import type React from "react"
import type { Metadata, Viewport } from "next"
import { Manrope, Sora } from "next/font/google"
import "../globals.css"
import Header from "@/components/header"
import Footer from "@/components/footer"
import ScrollToTop from "@/components/scroll-to-top"
import { SkipLink } from "@/components/skip-link"
import { ThemeScript } from "@/components/theme-script"
import { getLocale } from "@/lib/i18n"
import { openGraphLocale, siteName, siteUrl } from "@/lib/site"
import { getDictionary, isLocale, locales, type Locale } from "@/lib/translations"

const manrope = Manrope({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-manrope",
})

const sora = Sora({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sora",
})

const skipLabels: Record<Locale, string> = {
  es: "Saltar al contenido",
  en: "Skip to content",
  fr: "Aller au contenu",
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f2f8f8" },
    { media: "(prefers-color-scheme: dark)", color: "#0b1720" },
  ],
  colorScheme: "dark light",
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  if (!isLocale(locale)) return { robots: { index: false, follow: false } }

  return {
    metadataBase: new URL(siteUrl),
    applicationName: siteName,
    authors: [{ name: "GearsMap S.A.S.", url: siteUrl }],
    creator: "GearsMap S.A.S.",
    publisher: "GearsMap S.A.S.",
    category: "technology",
    title: {
      default: siteName,
      template: `%s | ${siteName}`,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    openGraph: {
      siteName,
      type: "website",
      locale: openGraphLocale(locale),
    },
    twitter: {
      card: "summary_large_image",
    },
  }
}

export default async function LocaleLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const locale = await getLocale()
  const t = getDictionary(locale)

  return (
    <html
      lang={locale}
      data-scroll-behavior="smooth"
      className={`${manrope.variable} ${sora.variable} antialiased dark`}
      suppressHydrationWarning
    >
      <head>
        <ThemeScript />
      </head>
      <body className="min-h-screen bg-background font-sans antialiased selection:bg-accent/30 selection:text-accent-foreground">
        <SkipLink label={skipLabels[locale]} />
        <Header locale={locale} nav={t.nav} common={t.common} />
        <main id="main-content">{children}</main>
        <Footer locale={locale} t={t} />
        <ScrollToTop label={t.common.backToTop} />
      </body>
    </html>
  )
}
