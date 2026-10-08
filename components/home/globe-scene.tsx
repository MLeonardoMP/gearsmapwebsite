"use client"

import Image from "next/image"
import { useMemo } from "react"
import { useTheme } from "next-themes"
import Globe, { type GlobeConfig } from "@/components/ui/globe"

const markers = [
  { location: [4.5709, -74.2973] as [number, number], size: 0.12 },
  { location: [40.7128, -74.006] as [number, number], size: 0.08 },
  { location: [51.5074, -0.1278] as [number, number], size: 0.08 },
  { location: [35.6762, 139.6503] as [number, number], size: 0.08 },
  { location: [-33.8688, 151.2093] as [number, number], size: 0.06 },
  { location: [19.4326, -99.1332] as [number, number], size: 0.07 },
  { location: [-23.5505, -46.6333] as [number, number], size: 0.07 },
  { location: [55.7558, 37.6176] as [number, number], size: 0.06 },
  { location: [28.6139, 77.209] as [number, number], size: 0.07 },
]

const arcs = [
  { from: [4.5709, -74.2973] as [number, number], to: [40.7128, -74.006] as [number, number] },
  { from: [4.5709, -74.2973] as [number, number], to: [51.5074, -0.1278] as [number, number] },
  { from: [4.5709, -74.2973] as [number, number], to: [19.4326, -99.1332] as [number, number] },
  { from: [4.5709, -74.2973] as [number, number], to: [-23.5505, -46.6333] as [number, number] },
  { from: [4.5709, -74.2973] as [number, number], to: [28.6139, 77.209] as [number, number] },
]

export function GlobeScene({ fallbackAlt }: { fallbackAlt: string }) {
  const { resolvedTheme } = useTheme()
  const config = useMemo<Partial<GlobeConfig>>(() => {
    const isDark = resolvedTheme !== "light"

    return {
      phi: 0,
      theta: 0.3,
      devicePixelRatio: 1.5,
      mapSamples: 10000,
      diffuse: isDark ? 0.6 : 0.4,
      mapBrightness: isDark ? 1.5 : 1.2,
      mapBaseBrightness: isDark ? 0.05 : 0.08,
      baseColor: isDark ? [0.12, 0.5, 0.56] : [0.18, 0.69, 0.76],
      glowColor: isDark ? [0.08, 0.35, 0.4] : [0.18, 0.69, 0.76],
      markerColor: isDark ? [0.3, 0.85, 0.95] : [0.1, 0.55, 0.65],
      markerElevation: 0.02,
      markers,
      arcs,
      arcColor: isDark ? [0.25, 0.75, 0.85] : [0.14, 0.6, 0.68],
      arcWidth: 0.4,
      arcHeight: 0.3,
    }
  }, [resolvedTheme])

  return (
    <Globe
      dark={resolvedTheme === "light" ? 0 : 1}
      config={config}
      fallback={
        <div className="flex h-full w-full items-center justify-center">
          <div className="flex aspect-square w-[min(72vw,22rem)] items-center justify-center rounded-full border-2 border-accent/30 bg-accent/5 p-10 shadow-[0_0_80px_color-mix(in_oklch,var(--accent)_25%,transparent)] animate-glow-breathe">
            <Image
              src="/images/gearsmap-logo.png"
              alt={fallbackAlt}
              width={240}
              height={220}
              priority
              className="h-auto w-full object-contain opacity-80"
            />
          </div>
        </div>
      }
    />
  )
}
