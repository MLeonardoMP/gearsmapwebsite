"use client"

import type { ReactNode } from "react"

/**
 * Temporary no-op bridge: the Radix toast is gone (WS5). Delete this file once
 * components/home/contact-form.tsx (WS1, inline status message) stops importing it.
 */
type ToastInput = {
  title?: ReactNode
  description?: ReactNode
  variant?: "default" | "destructive"
}

function toast(input: ToastInput) {
  void input
}

export function useToast() {
  return { toast }
}
