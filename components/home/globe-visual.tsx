"use client"

import { useEffect, useState } from "react"
import dynamic from "next/dynamic"
import Image from "next/image"

function GlobeFallback({ preload = false }: { preload?: boolean }) {
  return (
    <div className="globe-fallback" aria-hidden="true">
      <Image src="/images/gearsmap-logo.png" alt="" width={240} height={220} preload={preload} className="globe-fallback__logo" />
    </div>
  )
}

const GlobeScene = dynamic(
  () => import("@/components/home/globe-scene").then((module) => module.GlobeScene),
  {
    ssr: false,
    loading: () => <GlobeFallback />,
  },
)

type NavigatorHints = Navigator & {
  connection?: { saveData?: boolean }
  deviceMemory?: number
}

/** WebGL is decorative here: skip it on data-saver, low-memory, low-core or phone-sized devices. */
function canRenderGlobe() {
  const nav = navigator as NavigatorHints
  if (nav.connection?.saveData) return false
  if ((nav.deviceMemory ?? 8) < 4) return false
  if (nav.hardwareConcurrency <= 4) return false
  return !window.matchMedia("(max-width: 639px)").matches
}

export function GlobeVisual({ fallbackAlt }: { fallbackAlt: string }) {
  const [shouldMount, setShouldMount] = useState(false)

  useEffect(() => {
    if (!canRenderGlobe()) return

    let idleId: number | null = null
    let timeoutId: number | null = null
    const mount = () => setShouldMount(true)
    const schedule = () => {
      if (typeof window.requestIdleCallback === "function") {
        idleId = window.requestIdleCallback(mount, { timeout: 4000 })
      } else {
        timeoutId = window.setTimeout(mount, 1500)
      }
    }

    if (document.readyState === "complete") schedule()
    else window.addEventListener("load", schedule, { once: true })

    return () => {
      window.removeEventListener("load", schedule)
      if (idleId !== null) window.cancelIdleCallback(idleId)
      if (timeoutId !== null) window.clearTimeout(timeoutId)
    }
  }, [])

  return shouldMount ? <GlobeScene fallbackAlt={fallbackAlt} /> : <GlobeFallback preload />
}
