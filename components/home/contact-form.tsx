"use client"

import { useEffect, useRef, useState, type ChangeEvent, type FormEvent } from "react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import type { Dictionary } from "@/lib/translations"

type ContactCopy = Dictionary["contact"]
type FieldName = "name" | "email" | "phone" | "message"
export type ContactIntent = "project" | "demo"

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

export function ContactCta({
  intent,
  children,
  className,
}: {
  intent: ContactIntent
  children: React.ReactNode
  className?: string
}) {
  const handleClick = () => {
    window.dispatchEvent(new CustomEvent<ContactIntent>("gearsmap:contact-intent", { detail: intent }))
  }

  return (
    <a href="#contacto" onClick={handleClick} className={className}>
      {children}
    </a>
  )
}

export function ContactForm({ t }: { t: ContactCopy }) {
  const [formData, setFormData] = useState<FormData>(initialFormData)
  const [errors, setErrors] = useState<FormErrors>({})
  const [formError, setFormError] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)
  const { toast } = useToast()

  useEffect(() => {
    const handleIntent = (event: Event) => {
      const intentEvent = event as ContactIntentEvent
      if (intentEvent.detail === "project" || intentEvent.detail === "demo") {
        setFormData((current) => ({ ...current, intent: intentEvent.detail }))
      }
    }

    const handleHash = () => {
      if (window.location.hash === "#contacto-demo") {
        setFormData((current) => ({ ...current, intent: "demo" }))
      }
    }

    window.addEventListener("gearsmap:contact-intent", handleIntent)
    window.addEventListener("hashchange", handleHash)
    handleHash()

    return () => {
      window.removeEventListener("gearsmap:contact-intent", handleIntent)
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
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!validate()) return

    setIsSubmitting(true)
    setFormError("")

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      const payload = await response.json().catch(() => null)

      if (!response.ok) {
        const message = payload?.issues ? t.toast.validationError : t.toast.errorDescription
        setFormError(message)
        toast({
          title: t.toast.error,
          description: message,
          variant: "destructive",
        })
        return
      }

      toast({
        title: t.toast.success,
        description: t.toast.successDescription,
      })
      setFormData(initialFormData)
      setErrors({})
    } catch {
      setFormError(t.toast.errorDescription)
      toast({
        title: t.toast.error,
        description: t.toast.errorDescription,
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const fieldClassName = (field: FieldName) =>
    `w-full rounded-lg border bg-background/50 px-4 py-3 text-foreground placeholder:text-muted-foreground transition-[border-color,box-shadow] focus:border-transparent focus:outline-none focus:ring-2 focus:ring-accent ${
      errors[field] ? "border-destructive" : "border-border"
    }`

  const errorFor = (field: FieldName) =>
    errors[field] ? <p id={`${field}-error`} className="mt-2 text-sm text-destructive">{errors[field]}</p> : null

  return (
    <form ref={formRef} onSubmit={handleSubmit} noValidate className="space-y-6" aria-busy={isSubmitting}>
      {formError ? (
        <p role="alert" className="rounded-lg border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive">
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
                className={`group relative flex cursor-pointer gap-3 rounded-xl border p-4 transition-[border-color,background-color,box-shadow] focus-within:ring-2 focus-within:ring-ring ${
                  isSelected
                    ? "border-accent bg-accent/10 shadow-[0_0_0_1px_color-mix(in_oklch,var(--accent)_25%,transparent)]"
                    : "border-border/70 bg-background/40 hover:border-accent/50 hover:bg-accent/5"
                }`}
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

      <p className="sr-only" aria-live="polite">
        {isSubmitting ? t.sending : ""}
      </p>

      <Button
        type="submit"
        size="lg"
        disabled={isSubmitting}
        className="h-12 w-full bg-accent text-lg font-medium text-accent-foreground shadow-lg shadow-accent/20 transition-[background-color,box-shadow,transform] hover:-translate-y-0.5 hover:bg-accent/90 hover:shadow-accent/40 disabled:cursor-not-allowed"
      >
        {isSubmitting ? t.sending : t.form.submit}
      </Button>
    </form>
  )
}
