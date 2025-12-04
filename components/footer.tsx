"use client"

import Image from "next/image"
import Link from "next/link"
import { Facebook, Twitter, Linkedin, Instagram, Mail, Phone, MapPin } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

export default function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="relative bg-card/30 border-t border-border/50 pt-16 pb-8">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid gap-12 lg:grid-cols-4 mb-12">
          {/* Brand Column */}
          <div className="space-y-6 lg:col-span-1">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/images/gearsmap-logo.png"
                alt="GearsMap"
                width={40}
                height={40}
                className="w-10 h-10"
              />
              <span className="text-2xl font-bold text-accent">GearsMap</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {t.footer.description}
            </p>
            <div className="flex gap-4">
              <a href="https://www.linkedin.com/company/gearsmap" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-accent transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h3 className="text-lg font-bold font-sans text-foreground">{t.footer.quickLinks}</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <Link href="#inicio" className="hover:text-accent transition-colors">{t.nav.home}</Link>
              </li>
              <li>
                <Link href="#nosotros" className="hover:text-accent transition-colors">{t.nav.about}</Link>
              </li>
              <li>
                <Link href="#portafolio" className="hover:text-accent transition-colors">{t.nav.portfolio}</Link>
              </li>
              <li>
                <Link href="#contacto" className="hover:text-accent transition-colors">{t.nav.contact}</Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-6">
            <h3 className="text-lg font-bold font-sans text-foreground">{t.footer.services}</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <span className="hover:text-accent transition-colors cursor-default">{t.portfolio.services.ai.title}</span>
              </li>
              <li>
                <span className="hover:text-accent transition-colors cursor-default">{t.portfolio.services.geoviewers.title}</span>
              </li>
              <li>
                <span className="hover:text-accent transition-colors cursor-default">{t.portfolio.services.visualization.title}</span>
              </li>
              <li>
                <span className="hover:text-accent transition-colors cursor-default">{t.portfolio.services.dashboards.title}</span>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h3 className="text-lg font-bold font-sans text-foreground">{t.footer.contact}</h3>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-accent shrink-0" />
                <span>Bogotá, Colombia</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-accent shrink-0" />
                <a href="mailto:gearsmap@gearsmap.com" className="hover:text-accent transition-colors">
                  gearsmap@gearsmap.com
                </a>
              </li>
              {/* Phone not available for now
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-accent shrink-0" />
                <a href="tel:+573000000000" className="hover:text-accent transition-colors">
                  +57 300 000 0000
                </a>
              </li>
              */}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border/50 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} GearsMap S.A.S. {t.footer.rights}
          </p>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <Link href="/privacidad" className="hover:text-accent transition-colors">
              {t.footer.privacy}
            </Link>
            <Link href="/terminos" className="hover:text-accent transition-colors">
              {t.footer.terms}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
