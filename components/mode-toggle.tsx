"use client"

import { useLayoutEffect } from "react"
import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { applyTheme, setTheme, useResolvedTheme } from "@/lib/theme"

type ThemeToggleProps = {
  labels: {
    toLight: string
    toDark: string
  }
}

export function ThemeToggle({ labels }: ThemeToggleProps) {
  const isDark = useResolvedTheme() === "dark"

  // The inline theme script sets the class before paint. In development, Strict
  // Mode's remount resets <html> attributes, so re-apply the stored theme.
  useLayoutEffect(() => {
    applyTheme()
  }, [])

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      className="size-11"
      aria-pressed={isDark}
      aria-label={isDark ? labels.toLight : labels.toDark}
      onClick={() => setTheme(isDark ? "light" : "dark")}
    >
      {isDark ? (
        <Sun className="size-5" aria-hidden="true" />
      ) : (
        <Moon className="size-5" aria-hidden="true" />
      )}
    </Button>
  )
}
