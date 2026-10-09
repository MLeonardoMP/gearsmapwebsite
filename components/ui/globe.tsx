"use client"

import createGlobe, { type COBEOptions, type Marker, type Arc } from "cobe"
import { useEffect, useRef, useState, type ReactNode } from "react"

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
  fallback,
}: {
  className?: string
  config?: Partial<GlobeConfig>
  dark?: number
  children?: ReactNode
  fallback?: ReactNode
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const pointerInteracting = useRef<number | null>(null)
  const phiRef = useRef(0)
  const dragDelta = useRef(0)
  const widthRef = useRef(0)
  const isInViewportRef = useRef(true)
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    setHasError(false)

    const onResize = () => {
      widthRef.current = canvas.offsetWidth
    }
    window.addEventListener("resize", onResize)
    onResize()

    const isSmallViewport = window.matchMedia("(max-width: 639px)").matches
    const mergedConfig: COBEOptions = {
      ...DEFAULT_CONFIG,
      ...config,
      ...(dark !== undefined ? { dark } : {}),
      devicePixelRatio: Math.min(config.devicePixelRatio ?? DEFAULT_CONFIG.devicePixelRatio ?? 2, isSmallViewport ? 1.2 : 1.5),
      mapSamples: Math.min(config.mapSamples ?? DEFAULT_CONFIG.mapSamples ?? 16000, isSmallViewport ? 7000 : 12000),
      width: Math.max(widthRef.current * 1.35, 1),
      height: Math.max(widthRef.current * 1.35, 1),
    }

    let globe: ReturnType<typeof createGlobe>

    try {
      globe = createGlobe(canvas, mergedConfig)
    } catch {
      window.setTimeout(() => setHasError(true), 0)
      window.removeEventListener("resize", onResize)
      return
    }

    let animationId: number | null = null
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const isDocumentVisible = () => document.visibilityState === "visible"

    // About 30 fps: skip rAF ticks closer than 33ms, and scale rotation by elapsed time.
    let lastFrame: number | null = null
    const animate = (now = performance.now()) => {
      animationId = null
      if (!isDocumentVisible() || !isInViewportRef.current) {
        lastFrame = null
        return
      }

      if (!reducedMotion && lastFrame !== null && now - lastFrame < 33) {
        animationId = requestAnimationFrame(animate)
        return
      }

      const elapsed = lastFrame === null ? 33 : Math.min(now - lastFrame, 100)
      lastFrame = now
      if (!reducedMotion) phiRef.current += 0.00024 * elapsed
      dragDelta.current *= 0.88
      globe.update({
        phi: phiRef.current + dragDelta.current,
        width: Math.max(widthRef.current * 1.35, 1),
        height: Math.max(widthRef.current * 1.35, 1),
      })

      if (!reducedMotion) animationId = requestAnimationFrame(animate)
    }

    const startAnimation = () => {
      if (!reducedMotion && animationId === null && isDocumentVisible() && isInViewportRef.current) {
        animationId = requestAnimationFrame(animate)
      }
    }

    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden" && animationId !== null) {
        cancelAnimationFrame(animationId)
        animationId = null
      }
      startAnimation()
    }

    const observer = new IntersectionObserver(([entry]) => {
      isInViewportRef.current = entry.isIntersecting
      if (entry.isIntersecting) {
        if (reducedMotion) animate()
        else startAnimation()
      } else if (animationId !== null) {
        cancelAnimationFrame(animationId)
        animationId = null
      }
    }, { rootMargin: "120px" })

    const resizeObserver = new ResizeObserver(onResize)
    resizeObserver.observe(canvas)
    observer.observe(canvas)
    document.addEventListener("visibilitychange", handleVisibilityChange)

    if (reducedMotion) animate()
    else startAnimation()

    return () => {
      if (animationId !== null) cancelAnimationFrame(animationId)
      window.removeEventListener("resize", onResize)
      document.removeEventListener("visibilitychange", handleVisibilityChange)
      observer.disconnect()
      resizeObserver.disconnect()
      globe.destroy()
    }
  }, [dark, config])

  if (hasError) {
    return (
      <div className={cn("absolute inset-0 mx-auto aspect-[1/1] w-full max-w-[600px]", className)}>
        {fallback}
      </div>
    )
  }

  return (
    <div className={cn("absolute inset-0 mx-auto aspect-[1/1] w-full max-w-[600px]", className)}>
      {fallback ? (
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          {fallback}
        </div>
      ) : null}
      <canvas
        className={cn(
          "size-full",
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
