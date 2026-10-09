"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ContactCta } from "@/components/home/contact-cta"
import { ThemeToggle } from "@/components/mode-toggle"
import { LanguageSwitcher } from "@/components/language-switcher"
import { climateHref } from "@/lib/site"
import { cn } from "@/lib/utils"
import type { Dictionary, Locale } from "@/lib/translations"
import wordmark from "@/public/images/gearsmap-wordmark.png"

export type HeaderProps = {
  locale: Locale
  nav: Dictionary["nav"]
  common: Dictionary["common"]
}

const sectionIds = ["inicio", "portafolio", "nosotros", "contacto"] as const

export default function Header({ locale, nav, common }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState<string | null>(null)
  const pathname = usePathname()
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const firstMobileLinkRef = useRef<HTMLAnchorElement>(null)
  const isHome = pathname === `/${locale}` || pathname === `/${locale}/`
  const getSectionHref = (id: string) => (isHome ? `#${id}` : `/${locale}#${id}`)

  const menuItems = [
    { title: nav.home, id: "inicio", href: getSectionHref("inicio") },
    { title: nav.portfolio, id: "portafolio", href: getSectionHref("portafolio") },
    { title: nav.climate, href: climateHref(locale, "hub") },
    { title: nav.about, id: "nosotros", href: getSectionHref("nosotros") },
    { title: nav.contact, id: "contacto", href: getSectionHref("contacto") },
  ]
  const climateActive = pathname.startsWith(climateHref(locale, "hub"))

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Scroll-spy: mark the home section that crosses the upper third of the viewport.
  useEffect(() => {
    if (!isHome) return

    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => section !== null)
    if (sections.length === 0) return

    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) setActiveSection(entry.target.id)
      }
    }, { rootMargin: "-30% 0px -65% 0px" })

    sections.forEach((section) => observer.observe(section))
    return () => {
      observer.disconnect()
      setActiveSection(null)
    }
  }, [isHome])

  useEffect(() => {
    const previousOverflow = document.body.style.overflow

    if (isOpen) {
      document.body.style.overflow = "hidden"
      firstMobileLinkRef.current?.focus()
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape" || !isOpen) return
      // An open language popover closes first; the next Escape closes the menu.
      if (document.querySelector(".lang-menu:popover-open")) return
      setIsOpen(false)
      menuButtonRef.current?.focus()
    }

    document.addEventListener("keydown", handleKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [isOpen])

  const handleNavClick = (
    event: React.MouseEvent<HTMLAnchorElement>,
    id?: string,
  ) => {
    setIsOpen(false)
    if (!id || !isHome) return

    const section = document.getElementById(id)
    if (!section) return

    event.preventDefault()
    section.scrollIntoView({ behavior: "smooth", block: "start" })
    window.history.replaceState(null, "", `#${id}`)
  }

  const desktopLinkClass = "group relative whitespace-nowrap text-sm font-medium transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background"
  const desktopUnderlineClass = "absolute inset-x-0 -bottom-1 h-0.5 origin-left bg-accent transition-transform group-hover:scale-x-100 group-focus-visible:scale-x-100"
  const mobileLinkClass = "rounded-md px-4 py-3 text-base font-medium text-foreground transition-colors hover:bg-accent/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"

  return (
    <header
      className={cn(
        "site-header fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,box-shadow,backdrop-filter] duration-300",
        // backdrop-filter would make the header the containing block of the fixed
        // mobile overlay, so the open menu uses a solid background instead.
        isOpen
          ? "bg-background"
          : isScrolled
            ? "border-b border-border/50 bg-background/85 shadow-sm backdrop-blur-md"
            : "bg-transparent",
      )}
    >
      <nav className="site-header__nav site-container" aria-label={nav.home}>
        <div className="flex h-16 items-center justify-between gap-6 lg:h-20">
          <Link href={`/${locale}`} className="relative z-50 flex shrink-0 items-center">
            <Image
              src={wordmark}
              alt="GearsMap"
              sizes="180px"
              loading="eager"
              className="h-auto w-40 xl:w-[180px]"
            />
          </Link>

          <div data-nav="desktop" className="hidden items-center gap-6 lg:flex xl:gap-8">
            {menuItems.map((item) => {
              if (item.id) {
                const isActive = activeSection === item.id
                return (
                  <a
                    key={item.title}
                    href={item.href}
                    aria-current={isActive ? "location" : undefined}
                    onClick={(event) => handleNavClick(event, item.id)}
                    className={cn(desktopLinkClass, isActive ? "text-foreground" : "text-muted-foreground")}
                  >
                    {item.title}
                    <span className={cn(desktopUnderlineClass, isActive ? "scale-x-100" : "scale-x-0")} />
                  </a>
                )
              }

              return (
                <Link
                  key={item.title}
                  href={item.href}
                  aria-current={climateActive ? "page" : undefined}
                  className={cn(desktopLinkClass, climateActive ? "text-foreground" : "text-muted-foreground")}
                >
                  {item.title}
                  <span className={cn(desktopUnderlineClass, climateActive ? "scale-x-100" : "scale-x-0")} />
                </Link>
              )
            })}
            <div className="flex items-center gap-1 border-l border-border/50 pl-3">
              <LanguageSwitcher id="lang-menu-desktop" locale={locale} label={common.language} currentLabel={common.current} />
              <ThemeToggle labels={common.theme} />
              <Button asChild size="sm" variant="accent" className="ml-2 h-9 px-4">
                <ContactCta locale={locale} intent="project">{nav.cta}</ContactCta>
              </Button>
            </div>
          </div>

          <Button
            ref={menuButtonRef}
            variant="ghost"
            size="icon"
            className="relative z-50 size-11 lg:hidden"
            onClick={() => setIsOpen((open) => !open)}
            aria-label={isOpen ? nav.closeMenu : nav.openMenu}
            aria-expanded={isOpen}
            aria-controls="mobile-navigation"
          >
            {isOpen ? <X className="size-6" aria-hidden="true" /> : <Menu className="size-6" aria-hidden="true" />}
          </Button>
        </div>
      </nav>

      {isOpen && (
        <>
          <button
            type="button"
            className="fixed inset-0 z-40 cursor-default bg-background/95 backdrop-blur-md lg:hidden"
            aria-label={nav.closeMenu}
            onClick={() => setIsOpen(false)}
          />
          <div
            id="mobile-navigation"
            role="dialog"
            aria-modal="true"
            aria-label={nav.home}
            className="fixed inset-x-0 top-16 z-40 lg:hidden"
          >
            <div className="site-container max-w-xl rounded-lg border border-border bg-card/95 shadow-lg backdrop-blur-md">
              <nav className="flex flex-col gap-2 p-4" aria-label={nav.home}>
                {menuItems.map((item, index) => (
                  item.id ? (
                    <a
                      key={item.title}
                      ref={index === 0 ? firstMobileLinkRef : undefined}
                      href={item.href}
                      aria-current={activeSection === item.id ? "location" : undefined}
                      onClick={(event) => handleNavClick(event, item.id)}
                      className={mobileLinkClass}
                    >
                      {item.title}
                    </a>
                  ) : (
                    <Link
                      key={item.title}
                      href={item.href}
                      aria-current={climateActive ? "page" : undefined}
                      onClick={() => setIsOpen(false)}
                      className={mobileLinkClass}
                    >
                      {item.title}
                    </Link>
                  )
                ))}
                <div className="mt-2 flex items-center justify-between border-t border-border/50 px-1 pt-3">
                  <LanguageSwitcher id="lang-menu-mobile" locale={locale} label={common.language} currentLabel={common.current} />
                  <ThemeToggle labels={common.theme} />
                </div>
                <Button asChild variant="accent" className="mt-2 h-12 w-full text-base">
                  <ContactCta locale={locale} intent="project" onClick={() => setIsOpen(false)}>
                    {nav.cta}
                  </ContactCta>
                </Button>
              </nav>
            </div>
          </div>
        </>
      )}
    </header>
  )
}
