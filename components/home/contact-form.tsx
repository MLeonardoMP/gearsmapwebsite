"use client"

import { useEffect, useRef, useState, type ChangeEvent, type FormEvent } from "react"
import { Button } from "@/components/ui/button"
import {
  contactIntentEvent,
  contactIntentStorageKey,
  type ContactIntent,
} from "@/components/home/contact-cta"
import { cn } from "@/lib/utils"
import type { Dictionary, Locale } from "@/lib/translations"

export { ContactCta, type ContactIntent } from "@/components/home/contact-cta"

type ContactCopy = Dictionary["contact"]
type FieldName = "name" | "email" | "phone" | "message"

type FormData = Record<FieldName, string> & { intent: ContactIntent }
type FormErrors = Partial<Record<FieldName, string>>

const initialFormData: FormData = {
  name: "",
  email: "",
  phone: "",
  message: "",
  intent: "project",
}

type ContactIntentEvent = CustomEvent<ContactIntent>

export function ContactForm({ t, locale }: { t: ContactCopy; locale: Locale }) {
  const [formData, setFormData] = useState<FormData>(initialFormData)
  const [errors, setErrors] = useState<FormErrors>({})
  const [formError, setFormError] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSent, setIsSent] = useState(false)
  const [honeypot, setHoneypot] = useState("")
  const formRef = useRef<HTMLFormElement>(null)
  const startedAtRef = useRef(0)

  useEffect(() => {
    startedAtRef.current = Date.now()

    const handleIntent = (event: Event) => {
      const intentEvent = event as ContactIntentEvent
      try {
        window.sessionStorage.removeItem(contactIntentStorageKey)
      } catch {
        // Storage unavailable; the event already carries the intent.
      }
      if (intentEvent.detail === "project" || intentEvent.detail === "demo") {
        setFormData((current) => ({ ...current, intent: intentEvent.detail }))
      }
    }

    const handleHash = () => {
      if (window.location.hash === "#contacto-demo") {
        setFormData((current) => ({ ...current, intent: "demo" }))
      }
    }

    const readStoredIntent = () => {
      try {
        const stored = window.sessionStorage.getItem(contactIntentStorageKey)
        window.sessionStorage.removeItem(contactIntentStorageKey)
        if (stored === "project" || stored === "demo") {
          setFormData((current) => ({ ...current, intent: stored }))
        }
      } catch {
        // Storage unavailable; keep the default intent.
      }
    }

    window.addEventListener(contactIntentEvent, handleIntent)
    window.addEventListener("hashchange", handleHash)
    readStoredIntent()
    handleHash()

    return () => {
      window.removeEventListener(contactIntentEvent, handleIntent)
      window.removeEventListener("hashchange", handleHash)
    }
  }, [])

  const validate = () => {
    const nextErrors: FormErrors = {}

    if (!formData.name.trim()) nextErrors.name = t.toast.validationError
    if (!formData.email.trim() || !/^\S+@\S+\.\S+$/.test(formData.email)) {
      nextErrors.email = t.toast.validationError
    }
    if (!formData.message.trim()) nextErrors.message = t.toast.validationError

    setErrors(nextErrors)

    if (Object.keys(nextErrors).length > 0) {
      window.requestAnimationFrame(() => {
        formRef.current?.querySelector<HTMLElement>("[aria-invalid='true']")?.focus()
      })
      return false
    }

    return true
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target as HTMLInputElement | HTMLTextAreaElement
    setFormData((current) => ({ ...current, [name]: value } as FormData))
    setErrors((current) => ({ ...current, [name]: undefined }))
    setFormError("")
    setIsSent(false)
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!validate()) return

    setIsSubmitting(true)
    setFormError("")
    setIsSent(false)

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          company_website: honeypot,
          locale,
          startedAt: startedAtRef.current,
        }),
      })

      const payload = await response.json().catch(() => null)

      if (!response.ok) {
        setFormError(payload?.issues ? t.toast.validationError : t.toast.errorDescription)
        return
      }

      setFormData(initialFormData)
      setErrors({})
      setIsSent(true)
    } catch {
      setFormError(t.toast.errorDescription)
    } finally {
      setIsSubmitting(false)
    }
  }

  const fieldClassName = (field: FieldName) =>
    cn(
      "w-full rounded-control border bg-background px-4 py-3 text-base text-foreground placeholder:text-muted-foreground transition-[border-color,box-shadow] focus:border-accent focus:outline-none focus:ring-3 focus:ring-accent/25",
      errors[field] ? "border-destructive" : "border-border",
    )

  const errorFor = (field: FieldName) =>
    errors[field] ? <p id={`${field}-error`} className="mt-2 text-sm text-destructive">{errors[field]}</p> : null

  return (
    <form ref={formRef} onSubmit={handleSubmit} noValidate className="relative space-y-6" aria-busy={isSubmitting}>
      {isSent ? (
        <p role="status" className="contact-form__status">
          <strong>{t.toast.success}</strong>
          <span>{t.toast.successDescription}</span>
        </p>
      ) : null}

      {formError ? (
        <p role="alert" className="rounded-control border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {formError}
        </p>
      ) : null}

      <fieldset className="space-y-3">
        <legend className="mb-3 text-sm font-semibold text-foreground">{t.intent.label}</legend>
        <div className="grid gap-3 md:grid-cols-2">
          {(["project", "demo"] as const).map((intent) => {
            const isSelected = formData.intent === intent
            const title = intent === "project" ? t.intent.project : t.intent.demo
            const description = intent === "project" ? t.intent.projectDescription : t.intent.demoDescription

            return (
              <label
                key={intent}
                className={cn(
                  "group relative flex cursor-pointer gap-3 rounded-card border p-4 transition-[border-color,background-color,box-shadow] focus-within:ring-2 focus-within:ring-ring",
                  isSelected
                    ? "border-accent bg-accent/10 shadow-[0_0_0_1px_color-mix(in_oklab,var(--accent)_25%,transparent)]"
                    : "border-border/70 bg-background/40 hover:border-accent/50 hover:bg-accent/5",
                )}
              >
                <input
                  id={`contact-intent-${intent}`}
                  type="radio"
                  name="intent"
                  value={intent}
                  checked={isSelected}
                  onChange={() => setFormData((current) => ({ ...current, intent }))}
                  className="mt-1 h-4 w-4 accent-[var(--accent)]"
                />
                <span>
                  <span className="block font-semibold text-foreground">{title}</span>
                  <span className="mt-1 block text-sm leading-relaxed text-muted-foreground">{description}</span>
                </span>
              </label>
            )
          })}
        </div>
      </fieldset>

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className="mb-2 block text-sm font-medium text-foreground">
            {t.form.name}
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            required
            autoComplete="name"
            placeholder={t.form.namePlaceholder}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "name-error" : undefined}
            className={fieldClassName("name")}
          />
          {errorFor("name")}
        </div>

        <div>
          <label htmlFor="contact-phone" className="mb-2 block text-sm font-medium text-foreground">
            {t.form.phone}
          </label>
          <input
            id="contact-phone"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            autoComplete="tel"
            placeholder={t.form.phonePlaceholder}
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? "phone-error" : undefined}
            className={fieldClassName("phone")}
          />
          {errorFor("phone")}
        </div>
      </div>

      <div>
        <label htmlFor="contact-email" className="mb-2 block text-sm font-medium text-foreground">
          {t.form.email}
        </label>
        <input
          id="contact-email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
          autoComplete="email"
          inputMode="email"
          placeholder={t.form.emailPlaceholder}
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? "email-error" : undefined}
          className={fieldClassName("email")}
        />
        {errorFor("email")}
      </div>

      <div>
        <label htmlFor="contact-message" className="mb-2 block text-sm font-medium text-foreground">
          {t.form.message}
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={5}
          value={formData.message}
          onChange={handleChange}
          required
          placeholder={t.form.messagePlaceholder}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "message-error" : undefined}
          className={`${fieldClassName("message")} resize-y`}
        />
        {errorFor("message")}
      </div>

      <div className="contact-form__hp" aria-hidden="true">
        <label>
          Website{" "}
          <input
            name="company_website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={honeypot}
            onChange={(event) => setHoneypot(event.target.value)}
          />
        </label>
      </div>

      <p className="sr-only" aria-live="polite">
        {isSubmitting ? t.sending : ""}
      </p>

      <Button
        type="submit"
        variant="accent"
        size="lg"
        disabled={isSubmitting}
        className="h-12 w-full text-base font-semibold disabled:cursor-not-allowed"
      >
        {isSubmitting ? t.sending : t.form.submit}
      </Button>
    </form>
  )
}
