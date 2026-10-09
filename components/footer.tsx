import Image from "next/image"
import Link from "next/link"
import { Mail, MapPin } from "lucide-react"
import { LinkedInIcon } from "@/components/icons/brand-icons"
import { climateHref, companyLocality, contactEmail, linkedInUrl, localePath, projectPaths, servicePaths } from "@/lib/site"
import { cn } from "@/lib/utils"
import { locales, type Dictionary, type Locale } from "@/lib/translations"
import wordmark from "@/public/images/gearsmap-wordmark.png"

const currentYear = process.env.NEXT_PUBLIC_SITE_YEAR || "2026"

const languageNames: Record<Locale, string> = {
  es: "Español",
  en: "English",
  fr: "Français",
}

type FooterProps = {
  locale: Locale
  t: Dictionary
}

const linkClass = "inline-flex min-h-11 items-center transition-colors hover:text-accent lg:min-h-0"
const headingClass = "font-sans text-lg font-bold text-foreground"

export default function Footer({ locale, t }: FooterProps) {
  const homePath = localePath(locale)

  return (
    <footer className="relative border-t border-border/50 bg-card/30 pt-12 pb-24 sm:pb-8">
      <div className="site-container">
        <div className="mb-12 grid grid-cols-2 gap-x-8 gap-y-10 lg:grid-cols-4">
          <div className="col-span-2 space-y-6 lg:col-span-1">
            <Link href={homePath} className="inline-flex items-center">
              <Image src={wordmark} alt="GearsMap" sizes="180px" className="h-auto w-[180px]" />
            </Link>
            <p className="text-sm leading-relaxed text-muted-foreground">{t.footer.description}</p>
            <a
              href={linkedInUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t.footer.linkedinLabel}
              className="-ml-3 inline-flex size-11 items-center justify-center rounded-md text-muted-foreground transition-colors hover:text-accent"
            >
              <LinkedInIcon className="size-5" />
            </a>
          </div>

          <div className="space-y-4 lg:space-y-6">
            <h2 className={headingClass}>{t.footer.quickLinks}</h2>
            <ul className="space-y-1 text-sm text-muted-foreground lg:space-y-3">
              <li><Link href={`${homePath}#inicio`} className={linkClass}>{t.nav.home}</Link></li>
              <li><Link href={`${homePath}#nosotros`} className={linkClass}>{t.nav.about}</Link></li>
              <li><Link href={localePath(locale, projectPaths.index)} className={linkClass}>{t.nav.projects}</Link></li>
              <li><Link href={climateHref(locale, "hub")} className={linkClass}>{t.nav.climate}</Link></li>
              <li><Link href={`${homePath}#contacto`} className={linkClass}>{t.nav.contact}</Link></li>
            </ul>
          </div>

          <div className="space-y-4 lg:space-y-6">
            <h2 className={headingClass}>{t.footer.services}</h2>
            <ul className="space-y-1 text-sm text-muted-foreground lg:space-y-3">
              <li><Link href={`${homePath}#servicio-ai`} className={linkClass}>{t.portfolio.services.ai.title}</Link></li>
              <li><Link href={localePath(locale, servicePaths.geoviewers)} className={linkClass}>{t.portfolio.services.geoviewers.title}</Link></li>
              <li><Link href={`${homePath}#servicio-visualization`} className={linkClass}>{t.portfolio.services.visualization.title}</Link></li>
              <li><Link href={`${homePath}#servicio-dashboards`} className={linkClass}>{t.portfolio.services.dashboards.title}</Link></li>
              <li><Link href={climateHref(locale, "mrv")} className={linkClass}>MRV</Link></li>
              <li><Link href={climateHref(locale, "me")} className={linkClass}>M&E</Link></li>
            </ul>
          </div>

          <div className="col-span-2 space-y-4 lg:col-span-1 lg:space-y-6">
            <h2 className={headingClass}>{t.footer.contact}</h2>
            <ul className="space-y-2 text-sm text-muted-foreground lg:space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 size-5 shrink-0 text-accent" aria-hidden="true" />
                <span>{companyLocality}</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="size-5 shrink-0 text-accent" aria-hidden="true" />
                <a href={`mailto:${contactEmail}`} className={linkClass}>
                  {contactEmail}
                </a>
              </li>
            </ul>
            <nav aria-label={t.footer.languages} className="space-y-2">
              <p className="text-sm font-semibold text-foreground" aria-hidden="true">{t.footer.languages}</p>
              <ul className="flex flex-wrap gap-x-4 text-sm text-muted-foreground">
                {locales.map((option) => (
                  <li key={option}>
                    <Link
                      href={localePath(option)}
                      hrefLang={option}
                      lang={option}
                      title={languageNames[option]}
                      className={cn(linkClass, option === locale && "font-semibold text-foreground")}
                    >
                      {option.toUpperCase()}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-border/50 pt-8 md:flex-row">
          <p className="text-sm text-muted-foreground">
            © {currentYear} GearsMap S.A.S. {t.footer.rights}
          </p>
          <div className="flex flex-wrap justify-center gap-x-6 text-sm text-muted-foreground">
            <Link href={`/${locale}/privacidad`} prefetch className={linkClass}>{t.footer.privacy}</Link>
            <Link href={`/${locale}/terminos`} prefetch className={linkClass}>{t.footer.terms}</Link>
            <a href="/llms.txt" className={linkClass}>llms.txt</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
