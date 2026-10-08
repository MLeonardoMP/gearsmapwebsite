import type React from "react"
import type { Metadata } from "next"
import { Suspense } from "react"
import { Manrope, Sora } from "next/font/google"
import "../globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { InstantShell } from "@/components/instant-shell"
import ScrollToTop from "@/components/scroll-to-top"
import { SkipLink } from "@/components/skip-link"
import { getDictionary, isLocale, locales, type Locale } from "@/lib/translations"
import { siteName, siteUrl } from "@/lib/site"

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

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const value: Locale = isLocale(locale) ? locale : "es"

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
      locale: value === "es" ? "es_CO" : value === "fr" ? "fr_FR" : "en_US",
    },
    twitter: {
      card: "summary_large_image",
    },
  }
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode
  params: Promise<{ locale: string }>
}>) {
  const { locale } = await params
  const value: Locale = isLocale(locale) ? locale : "es"
  const t = getDictionary(value)
  const skipLabel = value === "es" ? "Saltar al contenido" : value === "fr" ? "Aller au contenu" : "Skip to content"

  return (
    <html lang={value} data-scroll-behavior="smooth" className={`${manrope.variable} ${sora.variable} antialiased`} suppressHydrationWarning>
      <body className="min-h-screen bg-background font-sans antialiased selection:bg-accent/30 selection:text-accent-foreground">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <SkipLink label={skipLabel} />
          <Header locale={value} nav={t.nav} common={t.common} />
          <main id="main-content">
            <Suspense fallback={<InstantShell />}>{children}</Suspense>
          </main>
          <Footer locale={value} t={t} />
          <ScrollToTop label={t.common.backToTop} />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
