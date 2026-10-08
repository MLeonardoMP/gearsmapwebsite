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

export type ContactConfirmationEmailProps = {
  name: string
}

export default function ContactConfirmationEmail({
  name,
}: ContactConfirmationEmailProps) {
  const logoUrl = "https://www.gearsmap.com/images/logo/gears_map_hor.svg"
  const contactHref = "mailto:gearsmap@gearsmap.com"
  const websiteHref = "https://www.gearsmap.com"

  return (
    <Html>
      <Head />
      <Preview>Confirmación: recibimos tu mensaje</Preview>
      <Body style={body}>
        <Container style={container}>
          <Section style={header}>
            <Row>
              <Column style={headerLeft}>
                <Img
                  src={logoUrl}
                  width={200}
                  height={40}
                  alt="GearsMap"
                  style={logo}
                />
              </Column>
              <Column style={headerRight}>
                <Text style={headerBadge}>Confirmación</Text>
              </Column>
            </Row>
          </Section>

          <Section style={hero}>
            <Heading style={h1}>Gracias por contactarnos</Heading>
            <Text style={subhead}>Hola {name},</Text>
            <Text style={copy}>
              Hemos recibido tu mensaje correctamente. En breve te contactaremos para
              coordinar los próximos pasos y comenzar a trabajar.
            </Text>
          </Section>

          <Section style={card}>
            <Section style={cardTopAccent} />
            <Text style={sectionTitle}>¿Necesitas agregar algo?</Text>
            <Text style={copy}>
              Puedes responder a este correo o escribirnos directamente a{" "}
              <Link href={contactHref} style={link}>
                gearsm​ap@gearsmap.com
              </Link>.
            </Text>

            <Section style={actions}>
              <Button href={websiteHref} style={button}>
                Visitar sitio web
              </Button>
              <Text style={actionsHint}>
                o <Link href={contactHref} style={link}>escribirnos por correo</Link>
              </Text>
            </Section>
          </Section>

          <Hr style={hr} />

          <Text style={footer}>
            Este es un correo automático de confirmación. Si no realizaste esta solicitud,
            puedes ignorarlo.
          </Text>
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

const copy: React.CSSProperties = {
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
