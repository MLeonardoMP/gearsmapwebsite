import { notFound } from "next/navigation"
import { locale } from "next/root-params"
import { isLocale, type Locale } from "@/lib/translations"

/**
 * Reads the `[locale]` root param without awaiting the page `params` prop,
 * so localized pages stay inside the prerendered static shell.
 * Server Components only (not Route Handlers or Client Components).
 */
export async function getLocale(): Promise<Locale> {
  const value = await locale()
  if (!isLocale(value)) notFound()
  return value
}
