"use client"

import { motion, useSpring, useTransform, useInView } from "framer-motion"
import { useEffect, useRef } from "react"

interface CounterProps {
  value: number
  direction?: "up" | "down"
  className?: string
}

export function Counter({ value, direction = "up", className }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })
  
  const spring = useSpring(0, {
    mass: 1,
    stiffness: 75,
    damping: 15,
  })

  const display = useTransform(spring, (current) => Math.round(current).toLocaleString())

  useEffect(() => {
    if (isInView) {
      spring.set(value)
    }
  }, [isInView, value, spring])

  return <motion.span ref={ref} className={className}>{display}</motion.span>
}
