import Image from "next/image"
import Link from "next/link"
import { Linkedin, Mail, MapPin } from "lucide-react"
import { climateHref } from "@/lib/site"
import type { Dictionary, Locale } from "@/lib/translations"

const currentYear = process.env.NEXT_PUBLIC_SITE_YEAR || "2026"

type FooterProps = {
  locale: Locale
  t: Dictionary
}

export default function Footer({ locale, t }: FooterProps) {
  const homePath = `/${locale}`

  return (
    <footer className="relative border-t border-border/50 bg-card/30 pt-12 pb-8">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="mb-12 grid grid-cols-2 gap-x-8 gap-y-10 lg:grid-cols-4">
          <div className="col-span-2 space-y-6 lg:col-span-1">
            <Link href={homePath} className="relative flex h-10 w-[200px] items-center">
              <Image
                src="/images/gears-map-horizontal.svg"
                alt="GearsMap"
                fill
                sizes="200px"
                className="object-contain object-left"
              />
            </Link>
            <p className="text-sm leading-relaxed text-muted-foreground">{t.footer.description}</p>
            <div className="flex gap-4">
              <a
                href="https://www.linkedin.com/company/gearsmap"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn de GearsMap"
                className="text-muted-foreground transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <Linkedin className="h-5 w-5" aria-hidden="true" />
              </a>
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-lg font-bold font-sans text-foreground">{t.footer.quickLinks}</h2>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><Link href={`${homePath}#inicio`} className="transition-colors hover:text-accent">{t.nav.home}</Link></li>
              <li><Link href={`${homePath}#nosotros`} className="transition-colors hover:text-accent">{t.nav.about}</Link></li>
              <li><Link href={`${homePath}#portafolio`} className="transition-colors hover:text-accent">{t.nav.portfolio}</Link></li>
              <li><Link href={climateHref(locale, "hub")} className="transition-colors hover:text-accent">{t.nav.climate}</Link></li>
              <li><Link href={`${homePath}#contacto`} className="transition-colors hover:text-accent">{t.nav.contact}</Link></li>
            </ul>
          </div>

          <div className="space-y-6">
            <h2 className="text-lg font-bold font-sans text-foreground">{t.footer.services}</h2>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><Link href={`${homePath}#servicio-ai`} className="transition-colors hover:text-accent">{t.portfolio.services.ai.title}</Link></li>
              <li><Link href={`${homePath}#servicio-geoviewers`} className="transition-colors hover:text-accent">{t.portfolio.services.geoviewers.title}</Link></li>
              <li><Link href={`${homePath}#servicio-visualization`} className="transition-colors hover:text-accent">{t.portfolio.services.visualization.title}</Link></li>
              <li><Link href={`${homePath}#servicio-dashboards`} className="transition-colors hover:text-accent">{t.portfolio.services.dashboards.title}</Link></li>
              <li><Link href={climateHref(locale, "mrv")} className="transition-colors hover:text-accent">MRV</Link></li>
              <li><Link href={climateHref(locale, "me")} className="transition-colors hover:text-accent">M&E</Link></li>
            </ul>
          </div>

          <div className="col-span-2 space-y-6 lg:col-span-1">
            <h2 className="text-lg font-bold font-sans text-foreground">{t.footer.contact}</h2>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-accent" aria-hidden="true" />
                <span>Bogotá, Colombia</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 shrink-0 text-accent" aria-hidden="true" />
                <a href="mailto:gearsmap@gearsmap.com" className="transition-colors hover:text-accent">
                  gearsmap@gearsmap.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-border/50 pt-8 md:flex-row">
          <p className="text-sm text-muted-foreground">
            © {currentYear} GearsMap S.A.S. {t.footer.rights}
          </p>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <Link href={`/${locale}/privacidad`} prefetch className="transition-colors hover:text-accent">{t.footer.privacy}</Link>
            <Link href={`/${locale}/terminos`} prefetch className="transition-colors hover:text-accent">{t.footer.terms}</Link>
            <a href="/llms.txt" className="transition-colors hover:text-accent">llms.txt</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
