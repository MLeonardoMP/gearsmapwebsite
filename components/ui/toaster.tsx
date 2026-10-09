/**
 * Temporary no-op bridge: the Radix toast is gone (WS5). Delete this file once
 * app/[locale]/layout.tsx (WS4) stops rendering <Toaster />.
 */
export function Toaster() {
  return null
}
