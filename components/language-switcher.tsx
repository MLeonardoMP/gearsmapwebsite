"use client"

import { Globe } from "lucide-react"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import type { Locale } from "@/lib/translations"

const languageOptions: Array<{ locale: Locale; label: string }> = [
  { locale: "en", label: "English (EN)" },
  { locale: "es", label: "Español (ES)" },
  { locale: "fr", label: "Français (FR)" },
]

type LanguageSwitcherProps = {
  locale: Locale
  label: string
}

export function LanguageSwitcher({ locale, label }: LanguageSwitcherProps) {
  const pathname = usePathname()
  const router = useRouter()

  const switchLanguage = (targetLocale: Locale) => {
    const segments = pathname.split("/").filter(Boolean)
    const rest = segments[0] === locale ? segments.slice(1) : segments
    const path = rest.length > 0 ? `/${targetLocale}/${rest.join("/")}` : `/${targetLocale}`
    const hash = window.location.hash

    router.push(`${path}${hash}`)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-2" aria-label={label}>
          <Globe className="h-4 w-4" aria-hidden="true" />
          <span aria-hidden="true">{locale.toUpperCase()}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {languageOptions.map((option) => (
          <DropdownMenuItem
            key={option.locale}
            onClick={() => switchLanguage(option.locale)}
            aria-current={option.locale === locale ? "page" : undefined}
          >
            {option.label}
            {option.locale === locale ? <span className="sr-only"> (actual)</span> : null}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
