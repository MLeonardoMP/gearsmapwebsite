import * as React from "react"

import { cn } from "@/lib/utils"

type AuroraTextProps = {
  children: React.ReactNode
  className?: string
}

export function AuroraText({ children, className }: AuroraTextProps) {
  return <span className={cn("aurora-text", className)}>{children}</span>
}

export default AuroraText
