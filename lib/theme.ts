"use client"

import { useSyncExternalStore } from "react"

export type ThemePreference = "light" | "dark" | "system"
export type ResolvedTheme = "light" | "dark"

const storageKey = "theme"

/** Mirrors lib/theme-script.ts: "light" -> light, "system" -> media query, anything else -> dark. */
function resolve(pref: string | null): ResolvedTheme {
  if (pref === "light") return "light"
  if (pref === "system") return matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
  return "dark"
}

export function readThemePreference(): string | null {
  try {
    return localStorage.getItem(storageKey)
  } catch {
    return null
  }
}

/** Sets the html `dark` class for a stored or chosen preference. */
export function applyTheme(pref: string | null = readThemePreference()) {
  document.documentElement.classList.toggle("dark", resolve(pref) === "dark")
}

export function setTheme(pref: ThemePreference) {
  try {
    localStorage.setItem(storageKey, pref)
  } catch {}

  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches
  if (typeof document.startViewTransition === "function" && !reduceMotion) {
    document.startViewTransition(() => applyTheme(pref))
  } else {
    applyTheme(pref)
  }
}

function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange)
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] })
  return () => observer.disconnect()
}

const getSnapshot = (): ResolvedTheme =>
  document.documentElement.classList.contains("dark") ? "dark" : "light"

const getServerSnapshot = (): ResolvedTheme => "dark"

/** The theme currently applied to <html>. The server snapshot is "dark", the site default. */
export function useResolvedTheme() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}
