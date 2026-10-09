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
import { siteUrl } from "@/lib/site"

export const defaultEmailLogoUrl = `${siteUrl}/images/gearsmap-wordmark.png`

const localeNames = { es: "Español", en: "English", fr: "Français" } as const

export type ContactSubmissionEmailProps = {
  logoUrl?: string
  name: string
  email: string
  phone?: string | null
  message: string
  intent: "project" | "demo"
  locale?: keyof typeof localeNames
}

export default function ContactSubmissionEmail({
  logoUrl = defaultEmailLogoUrl,
  name,
  email,
  phone,
  message,
  intent,
  locale = "es",
}: ContactSubmissionEmailProps) {
  const safePhone = phone?.trim() ? phone.trim() : "No proporcionado"
  const intentLabel = intent === "demo" ? "Solicitud de demo" : "Conversación sobre proyecto"
  const replyToHref = `mailto:${email}`

  return (
    <Html>
      <Head />
      <Preview>Nuevo mensaje de contacto de {name}</Preview>
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
                <Text style={headerBadge}>Contacto</Text>
              </Column>
            </Row>
          </Section>

          <Section style={hero}>
            <Heading style={h1}>Nuevo mensaje de contacto</Heading>
            <Text style={subhead}>
              Recibiste un nuevo mensaje desde el formulario de GearsMap.
            </Text>
          </Section>

          <Section style={card}>
            <Section style={cardTopAccent} />

            <Text style={sectionTitle}>Detalles del contacto</Text>

            <Row style={row}>
              <Column style={colLabel}>
                <Text style={label}>Nombre</Text>
              </Column>
              <Column style={colValue}>
                <Text style={value}>{name}</Text>
              </Column>
            </Row>
            <Row style={row}>
              <Column style={colLabel}>
                <Text style={label}>Email</Text>
              </Column>
              <Column style={colValue}>
                <Text style={value}>
                  <Link href={replyToHref} style={link}>
                    {email}
                  </Link>
                </Text>
              </Column>
            </Row>
            <Row style={row}>
              <Column style={colLabel}>
                <Text style={label}>Teléfono</Text>
              </Column>
              <Column style={colValue}>
                <Text style={value}>{safePhone}</Text>
              </Column>
            </Row>
            <Row style={row}>
              <Column style={colLabel}>
                <Text style={label}>Interés</Text>
              </Column>
              <Column style={colValue}>
                <Text style={value}>{intentLabel}</Text>
              </Column>
            </Row>
            <Row style={row}>
              <Column style={colLabel}>
                <Text style={label}>Idioma</Text>
              </Column>
              <Column style={colValue}>
                <Text style={value}>{localeNames[locale]}</Text>
              </Column>
            </Row>

            <Hr style={hr} />

            <Text style={label}>Mensaje</Text>
            <Text style={messageBox}>{message}</Text>

            <Section style={actions}>
              <Button href={replyToHref} style={button}>
                Responder
              </Button>
              <Text style={actionsHint}>
                o escribe a <Link href={replyToHref} style={link}>{email}</Link>
              </Text>
            </Section>
          </Section>

          <Text style={footer}>Enviado desde el formulario de contacto de GearsMap.</Text>
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

const row: React.CSSProperties = {
  margin: "0 0 8px",
}

const colLabel: React.CSSProperties = {
  width: "32%",
  verticalAlign: "top",
  paddingRight: 12,
}

const colValue: React.CSSProperties = {
  width: "68%",
  verticalAlign: "top",
}

const label: React.CSSProperties = {
  color: "#9ca3af",
  fontSize: 12,
  margin: 0,
}

const value: React.CSSProperties = {
  color: "#e5e7eb",
  fontSize: 14,
  margin: 0,
  lineHeight: "20px",
}

const link: React.CSSProperties = {
  color: "#2EB1C3",
  textDecoration: "none",
}

const hr: React.CSSProperties = {
  borderColor: "#1f2937",
  margin: "14px 0",
}

const messageBox: React.CSSProperties = {
  ...value,
  backgroundColor: "#0b1220",
  border: "1px solid #1f2937",
  borderRadius: 10,
  padding: "12px 12px",
  whiteSpace: "pre-wrap",
  margin: "8px 0 0",
}

const actions: React.CSSProperties = {
  marginTop: 14,
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

const footer: React.CSSProperties = {
  color: "#9ca3af",
  fontSize: 12,
  margin: "16px 16px 0",
}
