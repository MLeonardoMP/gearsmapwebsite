import * as React from "react"
import {
  Body,
  Button,
  Column,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Text,
} from "@react-email/components"
import { contactEmail, siteUrl } from "@/lib/site"
import { defaultEmailLogoUrl } from "./contact-submission"

export type ContactConfirmationLocale = "es" | "en" | "fr"

type ConfirmationCopy = {
  subject: string
  preview: string
  badge: string
  heading: string
  greeting: (name: string) => string
  received: string
  addTitle: string
  addCopy: string
  visit: string
  or: string
  emailUs: string
  footer: string
}

export const confirmationCopy: Record<ContactConfirmationLocale, ConfirmationCopy> = {
  es: {
    subject: "Confirmación: recibimos tu mensaje - GearsMap",
    preview: "Confirmación: recibimos tu mensaje",
    badge: "Confirmación",
    heading: "Gracias por contactarnos",
    greeting: (name) => `Hola ${name},`,
    received:
      "Hemos recibido tu mensaje correctamente. En breve te contactaremos para coordinar los próximos pasos y comenzar a trabajar.",
    addTitle: "¿Necesitas agregar algo?",
    addCopy: "Puedes responder a este correo o escribirnos directamente a",
    visit: "Visitar sitio web",
    or: "o",
    emailUs: "escribirnos por correo",
    footer:
      "Este es un correo automático de confirmación. Si no realizaste esta solicitud, puedes ignorarlo.",
  },
  en: {
    subject: "Confirmation: we received your message - GearsMap",
    preview: "Confirmation: we received your message",
    badge: "Confirmation",
    heading: "Thank you for contacting us",
    greeting: (name) => `Hi ${name},`,
    received:
      "We have received your message. We will contact you shortly to coordinate the next steps and get to work.",
    addTitle: "Need to add something?",
    addCopy: "You can reply to this email or write to us directly at",
    visit: "Visit website",
    or: "or",
    emailUs: "email us",
    footer:
      "This is an automatic confirmation email. If you did not make this request, you can ignore it.",
  },
  fr: {
    subject: "Confirmation : nous avons bien reçu votre message - GearsMap",
    preview: "Confirmation : nous avons bien reçu votre message",
    badge: "Confirmation",
    heading: "Merci de nous avoir contactés",
    greeting: (name) => `Bonjour ${name},`,
    received:
      "Nous avons bien reçu votre message. Nous vous contacterons très prochainement pour convenir des prochaines étapes et commencer à travailler.",
    addTitle: "Vous souhaitez ajouter quelque chose ?",
    addCopy: "Vous pouvez répondre à cet e-mail ou nous écrire directement à",
    visit: "Visiter le site web",
    or: "ou",
    emailUs: "nous écrire par e-mail",
    footer:
      "Ceci est un e-mail de confirmation automatique. Si vous n’êtes pas à l’origine de cette demande, vous pouvez l’ignorer.",
  },
}

export type ContactConfirmationEmailProps = {
  name: string
  locale?: ContactConfirmationLocale
  logoUrl?: string
}

export default function ContactConfirmationEmail({
  name,
  locale = "es",
  logoUrl = defaultEmailLogoUrl,
}: ContactConfirmationEmailProps) {
  const copy = confirmationCopy[locale]
  const contactHref = `mailto:${contactEmail}`
  const websiteHref = `${siteUrl}/${locale}`
  // The zero-width space keeps mail clients from auto-linking the address a second time.
  const displayEmail = contactEmail.replace("gearsmap@", "gearsm​ap@")

  return (
    <Html lang={locale}>
      <Head />
      <Preview>{copy.preview}</Preview>
      <Body style={body}>
        <Container style={container}>
          <Section style={header}>
            <Row>
              <Column style={headerLeft}>
                <Img
                  src={logoUrl}
                  width={200}
                  height={37}
                  alt="GearsMap"
                  style={logo}
                />
              </Column>
              <Column style={headerRight}>
                <Text style={headerBadge}>{copy.badge}</Text>
              </Column>
            </Row>
          </Section>

          <Section style={hero}>
            <Heading style={h1}>{copy.heading}</Heading>
            <Text style={subhead}>{copy.greeting(name)}</Text>
            <Text style={copyText}>{copy.received}</Text>
          </Section>

          <Section style={card}>
            <Section style={cardTopAccent} />
            <Text style={sectionTitle}>{copy.addTitle}</Text>
            <Text style={copyText}>
              {copy.addCopy}{" "}
              <Link href={contactHref} style={link}>
                {displayEmail}
              </Link>.
            </Text>

            <Section style={actions}>
              <Button href={websiteHref} style={button}>
                {copy.visit}
              </Button>
              <Text style={actionsHint}>
                {copy.or} <Link href={contactHref} style={link}>{copy.emailUs}</Link>
              </Text>
            </Section>
          </Section>

          <Hr style={hr} />

          <Text style={footer}>{copy.footer}</Text>
        </Container>
      </Body>
    </Html>
  )
}

const body: React.CSSProperties = {
  backgroundColor: "#0b1220",
  margin: 0,
  padding: 0,
}

const container: React.CSSProperties = {
  maxWidth: 600,
  margin: "0 auto",
  padding: "24px 16px",
}

const header: React.CSSProperties = {
  padding: "16px 16px 12px",
}

const logo: React.CSSProperties = {
  display: "block",
  maxWidth: "100%",
  height: "auto",
}

const headerLeft: React.CSSProperties = {
  verticalAlign: "middle",
}

const headerRight: React.CSSProperties = {
  textAlign: "right",
  verticalAlign: "middle",
}

const headerBadge: React.CSSProperties = {
  color: "#9ca3af",
  fontSize: 12,
  margin: 0,
  padding: "6px 10px",
  border: "1px solid #1f2937",
  borderRadius: 999,
  display: "inline-block",
}

const hero: React.CSSProperties = {
  padding: "0 16px 10px",
}

const h1: React.CSSProperties = {
  color: "#e5e7eb",
  fontSize: 22,
  fontWeight: 700,
  margin: "6px 0 6px",
}

const subhead: React.CSSProperties = {
  color: "#e5e7eb",
  fontSize: 14,
  margin: "0 0 8px",
  lineHeight: "20px",
}

const copyText: React.CSSProperties = {
  color: "#9ca3af",
  fontSize: 13,
  margin: "0 0 10px",
  lineHeight: "20px",
}

const card: React.CSSProperties = {
  backgroundColor: "#111827",
  borderRadius: 14,
  padding: 16,
  border: "1px solid #1f2937",
}

const cardTopAccent: React.CSSProperties = {
  height: 3,
  backgroundColor: "#2EB1C3",
  borderRadius: 999,
  margin: "2px 0 14px",
}

const sectionTitle: React.CSSProperties = {
  color: "#e5e7eb",
  fontSize: 14,
  fontWeight: 700,
  margin: "0 0 10px",
}

const link: React.CSSProperties = {
  color: "#2EB1C3",
  textDecoration: "none",
}

const actions: React.CSSProperties = {
  marginTop: 10,
}

const button: React.CSSProperties = {
  backgroundColor: "#2EB1C3",
  borderRadius: 10,
  color: "#0b1220",
  display: "inline-block",
  fontSize: 13,
  fontWeight: 700,
  padding: "10px 14px",
  textDecoration: "none",
}

const actionsHint: React.CSSProperties = {
  color: "#9ca3af",
  fontSize: 12,
  margin: "10px 0 0",
}

const hr: React.CSSProperties = {
  borderColor: "#1f2937",
  margin: "18px 16px 10px",
}

const footer: React.CSSProperties = {
  color: "#9ca3af",
  fontSize: 12,
  margin: "8px 16px 0",
  lineHeight: "18px",
}
