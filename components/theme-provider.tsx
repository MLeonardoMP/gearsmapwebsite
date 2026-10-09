import type { ReactNode } from "react"
import { ThemeScript } from "@/components/theme-script"

/**
 * Temporary bridge: next-themes is gone (WS5), so this only renders the inline
 * theme script. Delete this file once app/[locale]/layout.tsx (WS4) renders
 * <ThemeScript /> in <head> and stops rendering <ThemeProvider>.
 */
export function ThemeProvider({ children }: { children: ReactNode } & Record<string, unknown>) {
  return (
    <>
      <ThemeScript />
      {children}
    </>
  )
}
