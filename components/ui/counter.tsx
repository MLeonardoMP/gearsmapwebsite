"use client"

import { motion, useMotionValue, useTransform, useInView, animate } from "framer-motion"
import { useEffect, useRef } from "react"
import { cn } from "@/lib/utils"

interface CounterProps {
  value: number
  direction?: "up" | "down"
  className?: string
}

export function Counter({ value, direction = "up", className }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: "0px" })
  const count = useMotionValue(0)
  const display = useTransform(count, (latest) => Math.round(latest).toLocaleString())

  useEffect(() => {
    if (isInView) {
      animate(count, value, { 
        duration: 2, 
        ease: "easeOut",
      })
    }
  }, [isInView, value, count])

  return <motion.span ref={ref} className={cn("inline-block", className)}>{display}</motion.span>
}
