"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { ModeToggle } from "@/components/mode-toggle"
import { LanguageSwitcher } from "@/components/language-switcher"
import { climateHref } from "@/lib/site"
import type { Dictionary, Locale } from "@/lib/translations"

export type HeaderProps = {
  locale: Locale
  nav: Dictionary["nav"]
  common: Dictionary["common"]
}

export default function Header({ locale, nav, common }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
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

  useEffect(() => {
    const previousOverflow = document.body.style.overflow

    if (isOpen) {
      document.body.style.overflow = "hidden"
      firstMobileLinkRef.current?.focus()
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
        setIsOpen(false)
        menuButtonRef.current?.focus()
      }
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

  return (
    <header
      className={`site-header fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,box-shadow,backdrop-filter] duration-300 ${
        isScrolled
          ? "border-b border-border/50 bg-background/85 shadow-sm backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <nav className="site-header__nav container mx-auto px-6 lg:px-12" aria-label={nav.home}>
        <div className="flex h-16 items-center justify-between lg:h-20">
          <Link href={`/${locale}`} className="relative z-50 flex h-8 w-40 items-center lg:h-9 lg:w-[180px]">
            <Image
              src="/images/gears-map-horizontal.svg"
              alt="GearsMap"
              fill
              sizes="(max-width: 1024px) 160px, 180px"
              className="object-contain object-left"
              priority
            />
          </Link>

          <div className="hidden items-center gap-8 md:flex">
            {menuItems.map((item) => (
              item.id ? (
                <a
                  key={item.title}
                  href={item.href}
                  onClick={(event) => handleNavClick(event, item.id)}
                  className="group relative text-sm font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background"
                >
                  {item.title}
                  <span className="absolute inset-x-0 -bottom-1 h-0.5 origin-left scale-x-0 bg-accent transition-transform group-hover:scale-x-100 group-focus-visible:scale-x-100" />
                </a>
              ) : (
                <Link
                  key={item.title}
                  href={item.href}
                  aria-current={climateActive ? "page" : undefined}
                  className={`group relative text-sm font-medium transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background ${climateActive ? "text-foreground" : "text-muted-foreground"}`}
                >
                  {item.title}
                  <span className={`absolute inset-x-0 -bottom-1 h-0.5 origin-left bg-accent transition-transform group-hover:scale-x-100 group-focus-visible:scale-x-100 ${climateActive ? "scale-x-100" : "scale-x-0"}`} />
                </Link>
              )
            ))}
            <div className="flex items-center gap-2 border-l border-border/50 pl-4">
              <LanguageSwitcher locale={locale} label={common.language} />
              <ModeToggle labels={common.theme} />
            </div>
          </div>

          <Button
            ref={menuButtonRef}
            variant="ghost"
            size="icon"
            className="relative z-50 md:hidden"
            onClick={() => setIsOpen((open) => !open)}
            aria-label={isOpen ? nav.closeMenu : nav.openMenu}
            aria-expanded={isOpen}
            aria-controls="mobile-navigation"
          >
            {isOpen ? <X className="h-6 w-6" aria-hidden="true" /> : <Menu className="h-6 w-6" aria-hidden="true" />}
          </Button>
        </div>
      </nav>

      {isOpen && (
        <>
          <button
            type="button"
            className="fixed inset-0 z-40 cursor-default bg-background/95 backdrop-blur-md md:hidden"
            aria-label={nav.closeMenu}
            onClick={() => setIsOpen(false)}
          />
          <div
            id="mobile-navigation"
            role="dialog"
            aria-modal="true"
            aria-label={nav.home}
            className="fixed inset-x-0 top-16 z-40 md:hidden"
          >
            <div className="mx-4 rounded-lg border border-border bg-card/95 shadow-lg backdrop-blur-md">
              <nav className="flex flex-col gap-2 p-4" aria-label={nav.home}>
                {menuItems.map((item, index) => (
                  item.id ? (
                    <a
                      key={item.title}
                      ref={index === 0 ? firstMobileLinkRef : undefined}
                      href={item.href}
                      onClick={(event) => handleNavClick(event, item.id)}
                      className="rounded-md px-4 py-3 text-base font-medium text-foreground transition-colors hover:bg-accent/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      {item.title}
                    </a>
                  ) : (
                    <Link
                      key={item.title}
                      href={item.href}
                      aria-current={climateActive ? "page" : undefined}
                      onClick={() => setIsOpen(false)}
                      className="rounded-md px-4 py-3 text-base font-medium text-foreground transition-colors hover:bg-accent/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      {item.title}
                    </Link>
                  )
                ))}
                <div className="mt-2 flex items-center justify-between border-t border-border/50 px-4 py-3">
                  <LanguageSwitcher locale={locale} label={common.language} />
                  <ModeToggle labels={common.theme} />
                </div>
              </nav>
            </div>
          </div>
        </>
      )}
    </header>
  )
}
