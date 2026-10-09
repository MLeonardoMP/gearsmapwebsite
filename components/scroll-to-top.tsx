"use client"

import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import { ArrowUp } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function ScrollToTop({ label = "Back to top" }: { label?: string }) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [contactVisible, setContactVisible] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const toggleVisibility = () => {
      setIsScrolled(window.scrollY > 300)
    }

    window.addEventListener("scroll", toggleVisibility, { passive: true })
    toggleVisibility()
    return () => window.removeEventListener("scroll", toggleVisibility)
  }, [])

  // Stay out of the way of the contact form's submit button.
  useEffect(() => {
    const contact = document.getElementById("contacto")
    if (!contact) return

    const observer = new IntersectionObserver(([entry]) => {
      setContactVisible(entry.isIntersecting)
    })
    observer.observe(contact)
    return () => {
      observer.disconnect()
      setContactVisible(false)
    }
  }, [pathname])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  if (!isScrolled || contactVisible) return null

  return (
    <Button
      onClick={scrollToTop}
      size="icon"
      className="fixed right-4 z-40 size-11 rounded-full bg-accent shadow-lg transition-[background-color,transform] duration-300 hover:scale-105 hover:bg-accent/90 sm:right-8"
      style={{ bottom: "max(1rem, env(safe-area-inset-bottom))" }}
      aria-label={label}
    >
      <ArrowUp className="size-5" aria-hidden="true" />
    </Button>
  )
}
