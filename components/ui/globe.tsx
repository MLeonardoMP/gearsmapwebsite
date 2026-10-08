"use client"

import createGlobe, { type COBEOptions, type Marker, type Arc } from "cobe"
import { useEffect, useRef } from "react"

import { cn } from "@/lib/utils"

export type { Marker as GlobeMarker, Arc as GlobeArc }
export type GlobeConfig = Omit<COBEOptions, "width" | "height">

const DEFAULT_CONFIG: GlobeConfig = {
  devicePixelRatio: 2,
  phi: 0,
  theta: 0.3,
  dark: 0,
  diffuse: 0.4,
  mapSamples: 16000,
  mapBrightness: 1.2,
  baseColor: [1, 1, 1],
  markerColor: [251 / 255, 100 / 255, 21 / 255],
  glowColor: [1, 1, 1],
  markers: [],
  arcs: [],
  arcColor: [0.3, 0.8, 0.9],
  arcWidth: 0.4,
  arcHeight: 0.3,
  markerElevation: 0.02,
}

export default function Globe({
  className,
  config = DEFAULT_CONFIG,
  dark,
  children,
}: {
  className?: string
  config?: Partial<GlobeConfig>
  dark?: number
  children?: React.ReactNode
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const pointerInteracting = useRef<number | null>(null)
  const phiRef = useRef(0)
  const dragDelta = useRef(0)
  const widthRef = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const onResize = () => {
      widthRef.current = canvas.offsetWidth
    }
    window.addEventListener("resize", onResize)
    onResize()

    const mergedConfig: COBEOptions = {
      ...DEFAULT_CONFIG,
      ...config,
      ...(dark !== undefined ? { dark } : {}),
      width: widthRef.current * 2,
      height: widthRef.current * 2,
    }

    const globe = createGlobe(canvas, mergedConfig)

    let animationId: number

    const animate = () => {
      // Always rotate — drag offset is additive, decays smoothly
      phiRef.current += 0.004
      dragDelta.current *= 0.94
      globe.update({
        phi: phiRef.current + dragDelta.current,
        width: widthRef.current * 2,
        height: widthRef.current * 2,
      })
      animationId = requestAnimationFrame(animate)
    }
    animationId = requestAnimationFrame(animate)

    // Clean fade-in
    setTimeout(() => {
      canvas.style.opacity = "1"
    }, 50)

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener("resize", onResize)
      globe.destroy()
    }
  }, [dark, config])

  return (
    <div className={cn("absolute inset-0 mx-auto aspect-[1/1] w-full max-w-[600px]", className)}>
      <canvas
        className={cn(
          "size-full opacity-0 transition-opacity duration-700 ease-in",
          "[contain:layout_style_size]"
        )}
        ref={canvasRef}
        aria-hidden="true"
        onPointerDown={(e) => {
          pointerInteracting.current = e.clientX
          if (canvasRef.current) canvasRef.current.style.cursor = "grabbing"
        }}
        onPointerUp={() => {
          pointerInteracting.current = null
          if (canvasRef.current) canvasRef.current.style.cursor = "grab"
        }}
        onPointerOut={() => {
          pointerInteracting.current = null
          if (canvasRef.current) canvasRef.current.style.cursor = "grab"
        }}
        onMouseMove={(e) => {
          if (pointerInteracting.current !== null) {
            const delta = e.clientX - pointerInteracting.current
            pointerInteracting.current = e.clientX
            dragDelta.current += delta / 120
          }
        }}
        onTouchMove={(e) => {
          if (pointerInteracting.current !== null && e.touches[0]) {
            const delta = e.touches[0].clientX - pointerInteracting.current
            pointerInteracting.current = e.touches[0].clientX
            dragDelta.current += delta / 120
          }
        }}
      />
      {children}
    </div>
  )
}
