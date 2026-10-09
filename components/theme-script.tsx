"use client"

import { themeScript } from "@/lib/theme-script"

/**
 * Inline theme bootstrap for the root layout's <head>. The server HTML carries
 * `text/javascript`, so it runs before first paint. When React creates it on a
 * client navigation it is `text/plain`: nothing re-runs and React does not warn
 * about script tags. `suppressHydrationWarning` covers the type difference.
 */
export function ThemeScript() {
  return (
    <script
      type={typeof window === "undefined" ? "text/javascript" : "text/plain"}
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: themeScript }}
    />
  )
}
