"use client"

import dynamic from "next/dynamic"
import Image from "next/image"

const GlobeScene = dynamic(
  () => import("@/components/home/globe-scene").then((module) => module.GlobeScene),
  {
    ssr: false,
    loading: () => (
      <div className="globe-fallback" aria-hidden="true">
        <Image src="/images/gearsmap-logo.png" alt="" width={240} height={220} priority className="globe-fallback__logo" />
      </div>
    ),
  },
)

export function GlobeVisual({ fallbackAlt }: { fallbackAlt: string }) {
  return <GlobeScene fallbackAlt={fallbackAlt} />
}
