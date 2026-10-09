"use client"

import { useEffect, useRef, type MouseEvent } from "react"
import Link from "next/link"
import { Globe } from "lucide-react"
import { usePathname, useRouter } from "next/navigation"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import type { Locale } from "@/lib/translations"

const languageOptions: Array<{ locale: Locale; label: string }> = [
  { locale: "en", label: "English (EN)" },
  { locale: "es", label: "Español (ES)" },
  { locale: "fr", label: "Français (FR)" },
]

/** Same path in another locale. Slugs are Spanish in every locale, so only the prefix changes. */
export function swapLocale(pathname: string, current: Locale, target: Locale) {
  const segments = pathname.split("/").filter(Boolean)
  const rest = segments[0] === current ? segments.slice(1) : segments
  return rest.length > 0 ? `/${target}/${rest.join("/")}` : `/${target}`
}

type LanguageSwitcherProps = {
  id: "lang-menu-desktop" | "lang-menu-mobile"
  locale: Locale
  label: string
  currentLabel: string
}

export function LanguageSwitcher({ id, locale, label, currentLabel }: LanguageSwitcherProps) {
  const pathname = usePathname()
  const router = useRouter()
  const buttonRef = useRef<HTMLButtonElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const menu = menuRef.current
    const button = buttonRef.current
    if (!menu || !button) return

    // Anchor the top-layer popover under its button, opening toward the roomier side.
    const handleBeforeToggle = (event: Event) => {
      if ((event as ToggleEvent).newState !== "open") return
      const rect = button.getBoundingClientRect()
      const opensRight = rect.left + rect.width / 2 < window.innerWidth / 2
      menu.style.top = `${Math.round(rect.bottom + 8)}px`
      menu.style.left = opensRight ? `${Math.max(8, Math.round(rect.left))}px` : "auto"
      menu.style.right = opensRight ? "auto" : `${Math.max(8, Math.round(window.innerWidth - rect.right))}px`
    }

    menu.addEventListener("beforetoggle", handleBeforeToggle)
    return () => menu.removeEventListener("beforetoggle", handleBeforeToggle)
  }, [])

  const handleSelect = (event: MouseEvent<HTMLAnchorElement>, href: string) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return
    event.preventDefault()
    menuRef.current?.hidePopover()
    router.push(`${href}${window.location.hash}`)
  }

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        popoverTarget={id}
        aria-label={label}
        className={cn(buttonVariants({ variant: "ghost", size: "sm" }), "h-11 gap-2 px-3")}
      >
        <Globe className="size-4" aria-hidden="true" />
        <span aria-hidden="true">{locale.toUpperCase()}</span>
      </button>
      <div
        ref={menuRef}
        id={id}
        popover="auto"
        className="lang-menu fixed inset-auto m-0 min-w-44 rounded-md border border-border bg-popover p-1 text-popover-foreground shadow-md"
      >
        <ul className="flex flex-col">
          {languageOptions.map(({ locale: option, label: optionLabel }) => {
            const href = swapLocale(pathname, locale, option)
            const isCurrent = option === locale

            return (
              <li key={option}>
                <Link
                  href={href}
                  hrefLang={option}
                  lang={option}
                  prefetch={false}
                  aria-current={isCurrent ? "true" : undefined}
                  onClick={(event) => handleSelect(event, href)}
                  className={cn(
                    "flex min-h-11 items-center rounded-sm px-3 text-sm transition-colors hover:bg-accent/10 focus-visible:bg-accent/10 focus-visible:outline-none",
                    isCurrent ? "font-semibold text-foreground" : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {optionLabel}
                  {isCurrent && <span className="sr-only"> ({currentLabel})</span>}
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    </>
  )
}
