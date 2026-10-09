"use client"

import type { AnchorHTMLAttributes, MouseEvent, ReactNode } from "react"
import Link from "next/link"
import type { Locale } from "@/lib/translations"

export type ContactIntent = "project" | "demo"

export const contactIntentEvent = "gearsmap:contact-intent"
export const contactIntentStorageKey = "gearsmap:contact-intent"

type ContactCtaProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
  intent: ContactIntent
  /** When set, links to `/${locale}#contacto` (use it outside the home page). */
  locale?: Locale
  children: ReactNode
}

/**
 * Link to the home contact form that preselects an intent. Works inside
 * `<Button asChild>`: extra anchor props and onClick are forwarded.
 */
export function ContactCta({ intent, locale, children, onClick, ...props }: ContactCtaProps) {
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event)
    try {
      window.sessionStorage.setItem(contactIntentStorageKey, intent)
    } catch {
      // Storage can be unavailable (private mode); the event still updates a mounted form.
    }
    window.dispatchEvent(new CustomEvent<ContactIntent>(contactIntentEvent, { detail: intent }))
  }

  if (locale) {
    return (
      <Link href={`/${locale}#contacto`} onClick={handleClick} {...props}>
        {children}
      </Link>
    )
  }

  return (
    <a href="#contacto" onClick={handleClick} {...props}>
      {children}
    </a>
  )
}
