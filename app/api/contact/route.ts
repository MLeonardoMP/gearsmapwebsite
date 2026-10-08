import { NextResponse } from "next/server"
import nodemailer, { type Transporter } from "nodemailer"
import { createClient, sql } from "@vercel/postgres"
import { ConfidentialClientApplication } from "@azure/msal-node"
import React from "react"
import { render } from "@react-email/render"
import ContactSubmissionEmail from "@/emails/contact-submission"
import ContactConfirmationEmail from "@/emails/contact-confirmation"
import { z } from "zod"

const contactSchema = z.object({
  name: z.string().trim().min(1),
  email: z.string().trim().email(),
  phone: z.string().trim().optional().nullable(),
  message: z.string().trim().min(1),
  intent: z.enum(["project", "demo"]).default("project"),
})

export async function POST(req: Request) {
  try {
    const parsed = contactSchema.safeParse(await req.json())
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid payload", issues: parsed.error.issues },
        { status: 400 }
      )
    }

    const { name, email, phone, message, intent } = parsed.data
    const normalizedPhone = phone?.trim() ? phone.trim() : null
    const intentLabel = intent === "demo" ? "Demo request" : "Project inquiry"
    const storedMessage = `${message}\n\n[Contact intent: ${intentLabel}]`

    const requireDb = process.env.CONTACT_REQUIRE_DB === "true"
    const requireEmail = process.env.CONTACT_REQUIRE_EMAIL === "true"

    const looksPooled = (value?: string) => Boolean(value && /pooler|pooling/i.test(value))

    // Support Neon/standard Postgres env var naming.
    // IMPORTANT: `sql` from @vercel/postgres requires a pooled connection string.
    // Neon direct strings must use `createClient()`.
    const pooledFromEnv = process.env.POSTGRES_URL
    const pooledFromDatabaseUrl = looksPooled(process.env.DATABASE_URL)
      ? process.env.DATABASE_URL
      : undefined
    const pooledConnectionString = pooledFromEnv ?? pooledFromDatabaseUrl

    const directFromEnv = process.env.POSTGRES_URL_NON_POOLING
    const directFromDatabaseUrl =
      process.env.DATABASE_URL && !looksPooled(process.env.DATABASE_URL)
        ? process.env.DATABASE_URL
        : undefined

    // If POSTGRES_URL is set but it's actually a direct connection string, treat it as direct.
    const directFromMisconfiguredPooledVar =
      process.env.POSTGRES_URL && !looksPooled(process.env.POSTGRES_URL)
        ? process.env.POSTGRES_URL
        : undefined

    const directConnectionString =
      directFromEnv ?? directFromDatabaseUrl ?? directFromMisconfiguredPooledVar

    // @vercel/postgres reads POSTGRES_URL / POSTGRES_URL_NON_POOLING.
    // If user provided only DATABASE_URL, map it at runtime for the chosen strategy.
    if (pooledConnectionString && !process.env.POSTGRES_URL) {
      process.env.POSTGRES_URL = pooledConnectionString
    }
    if (directConnectionString && !process.env.POSTGRES_URL_NON_POOLING) {
      process.env.POSTGRES_URL_NON_POOLING = directConnectionString
    }

    const hasDb = Boolean(pooledConnectionString || directConnectionString)
    let dbSaved = false
    let emailSent = false
    let emailAttempted = false
    let lastDbError: unknown = null
    let lastEmailError: unknown = null

    if (hasDb) {
      try {
        // Prefer non-pooled client for direct connection strings (e.g., Neon).
        if (directConnectionString) {
          const client = createClient({ connectionString: directConnectionString })
          await client.connect()
          try {
            await client.sql`
              INSERT INTO public.contact (name, email, phone, message, date)
              VALUES (${name}, ${email}, ${normalizedPhone}, ${storedMessage}, NOW())
            `
          } finally {
            await client.end()
          }
        } else {
          await sql`
            INSERT INTO public.contact (name, email, phone, message, date)
              VALUES (${name}, ${email}, ${normalizedPhone}, ${storedMessage}, NOW())
          `
        }

        dbSaved = true
      } catch (dbError) {
        lastDbError = dbError
        console.error("Error saving contact message to DB:", dbError)
        if (requireDb) {
          const isProd = process.env.NODE_ENV === "production"
          return NextResponse.json(
            {
              error: "Failed to save message",
              hint: "Check your Neon credentials/connection string (POSTGRES_URL for pooled or POSTGRES_URL_NON_POOLING for direct).",
              ...(isProd
                ? {}
                : {
                    debug: {
                      dbError:
                        dbError instanceof Error ? dbError.message : String(dbError),
                    },
                  }),
            },
            { status: 500 }
          )
        }
      }
    } else if (requireDb) {
      return NextResponse.json(
        {
          error: "Database not configured",
          hint: "Set POSTGRES_URL (pooled) or POSTGRES_URL_NON_POOLING/DATABASE_URL (direct) to your Neon connection string.",
        },
        { status: 500 }
      )
    }

    // Email is best-effort by default (so local dev doesn't fail if email isn't configured).
    // Set CONTACT_REQUIRE_EMAIL=true to fail if email can't be sent.
    const emailEnabled = process.env.CONTACT_EMAIL_ENABLED !== "false"
    const emailProvider = (process.env.CONTACT_EMAIL_PROVIDER || "smtp").toLowerCase()
    const isProd = process.env.NODE_ENV === "production"

    const emailTo = (process.env.CONTACT_EMAIL_TO || "gearsmap@gearsmap.com")
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean)
    const emailCc = (process.env.CONTACT_EMAIL_CC || "")
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean)

    const subjectAdmin = `${intentLabel}: ${name}`
    const subjectConfirmation = `Confirmación: recibimos tu mensaje - GearsMap`

    const logoUrl =
      process.env.CONTACT_EMAIL_LOGO_URL ||
      process.env.EMAIL_LOGO_URL ||
      "https://www.gearsmap.com/images/logo/gears_map_hor.svg"

    const adminEmailTemplate = React.createElement(ContactSubmissionEmail, {
      logoUrl,
      name,
      email,
      phone: normalizedPhone,
      message,
      intent,
    })

    const confirmationEmailTemplate = React.createElement(ContactConfirmationEmail, {
      name,
    })

    const adminHtmlBody = await render(adminEmailTemplate)
    const adminTextBody = await render(adminEmailTemplate, { plainText: true })

    const confirmationHtmlBody = await render(confirmationEmailTemplate)
    const confirmationTextBody = await render(confirmationEmailTemplate, {
      plainText: true,
    })

    const sendViaMicrosoftGraph = async (args: {
      to: string[]
      cc?: string[]
      subject: string
      html: string
      replyTo?: { address: string; name?: string }[]
    }) => {
      const decodeJwtPayload = (jwt: string) => {
        try {
          const parts = jwt.split(".")
          if (parts.length < 2) return null
          const base64 = parts[1].replace(/-/g, "+").replace(/_/g, "/")
          const padded = base64 + "=".repeat((4 - (base64.length % 4)) % 4)
          const json = Buffer.from(padded, "base64").toString("utf8")
          return JSON.parse(json)
        } catch {
          return null
        }
      }

      const tenant =
        process.env.M365_TENANT_ID ||
        process.env.M365_TENANT ||
        process.env.M365_TENANT_DOMAIN
      const clientId = process.env.M365_CLIENT_ID
      const clientSecret = process.env.M365_CLIENT_SECRET
      const senderUpn = process.env.M365_SENDER || "gearsmap@gearsmap.com"

      if (!tenant || !clientId || !clientSecret) {
        throw new Error("Microsoft Graph not configured")
      }

      const authority =
        process.env.M365_AUTHORITY || `https://login.microsoftonline.com/${tenant}`

      const cca = new ConfidentialClientApplication({
        auth: {
          clientId,
          authority,
          clientSecret,
        },
      })

      const authResult = await cca.acquireTokenByClientCredential({
        scopes: ["https://graph.microsoft.com/.default"],
      })

      const accessToken = authResult?.accessToken
      if (!accessToken) {
        throw new Error("Failed to acquire Microsoft Graph access token")
      }

      const tokenClaims = !isProd ? decodeJwtPayload(accessToken) : null
      if (!isProd) {
        console.info("[contact] Graph token claims (safe subset)", {
          aud: tokenClaims?.aud,
          tid: tokenClaims?.tid,
          appid: tokenClaims?.appid,
          roles: tokenClaims?.roles,
          scp: tokenClaims?.scp,
        })
      }

      const payload = {
        message: {
          subject: args.subject,
          body: {
            contentType: "HTML",
            content: args.html,
          },
          toRecipients: args.to.map((address) => ({
            emailAddress: { address },
          })),
          ccRecipients: (args.cc || []).map((address) => ({
            emailAddress: { address },
          })),
          ...(args.replyTo?.length
            ? {
                replyTo: args.replyTo.map((r) => ({
                  emailAddress: {
                    address: r.address,
                    name: r.name,
                  },
                })),
              }
            : {}),
        },
        saveToSentItems: true,
      }

      const res = await fetch(
        `https://graph.microsoft.com/v1.0/users/${encodeURIComponent(senderUpn)}/sendMail`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      )

      if (!res.ok) {
        const text = await res.text().catch(() => "")
        let parsed: any = null
        try {
          parsed = text ? JSON.parse(text) : null
        } catch {
          parsed = null
        }

        const graphErrorCode = parsed?.error?.code
        const graphErrorMessage = parsed?.error?.message

        const requestId =
          res.headers.get("request-id") ||
          res.headers.get("x-ms-request-id") ||
          parsed?.error?.innerError?.["request-id"] ||
          parsed?.error?.innerError?.requestId

        const err = Object.assign(
          new Error(
            `Microsoft Graph sendMail failed (${res.status}): ${
              graphErrorCode ? `${graphErrorCode}: ` : ""
            }${graphErrorMessage || text || res.statusText}`
          ),
          {
            details: {
              status: res.status,
              requestId,
              graphErrorCode,
              graphErrorMessage,
              token: !isProd
                ? {
                    aud: tokenClaims?.aud,
                    tid: tokenClaims?.tid,
                    appid: tokenClaims?.appid,
                    roles: tokenClaims?.roles,
                    scp: tokenClaims?.scp,
                  }
                : undefined,
            },
          }
        )

        throw err
      }

      if (!isProd) {
        console.info("[contact] Email sent via Microsoft Graph", {
          sender: senderUpn,
          to: args.to,
          cc: args.cc,
        })
      }
    }

    const createSmtpTransporter = () => {
      const smtpHost = process.env.SMTP_HOST
      if (!smtpHost) throw new Error("SMTP not configured")

      return nodemailer.createTransport({
        host: smtpHost,
        port: Number(process.env.SMTP_PORT) || 587,
        secure: process.env.SMTP_SECURE === "true", // true for 465, false for other ports
        auth: process.env.SMTP_USER
          ? {
              user: process.env.SMTP_USER,
              pass: process.env.SMTP_PASS,
            }
          : undefined,
      })
    }

    const sendViaSmtp = async (
      transporter: Transporter,
      args: {
        to: string[]
        cc?: string[]
        subject: string
        text: string
        html: string
        replyTo?: string
      }
    ) => {
      const smtpHost = process.env.SMTP_HOST
      if (!smtpHost) throw new Error("SMTP not configured")

      await transporter.sendMail({
        from:
          process.env.SMTP_FROM || '"GearsMap Website" <no-reply@gearsmap.com>',
        to: args.to.join(", "),
        cc: args.cc?.length ? args.cc.join(", ") : undefined,
        replyTo: args.replyTo,
        subject: args.subject,
        text: args.text,
        html: args.html,
      })

      if (!isProd) {
        console.info("[contact] Email sent via SMTP", {
          host: smtpHost,
          to: args.to,
          cc: args.cc,
        })
      }
    }

    const smtpConfigured = Boolean(process.env.SMTP_HOST)

    if (!emailEnabled) {
      lastEmailError = new Error("Email disabled via CONTACT_EMAIL_ENABLED=false")
      if (!isProd) {
        console.info("[contact] Email disabled; skipping send", {
          provider: emailProvider,
          requireEmail,
        })
      }
    }

    if (emailEnabled && emailProvider !== "none") {
      emailAttempted = true
      try {
        const confirmationEnabled =
          process.env.CONTACT_EMAIL_CONFIRMATION_ENABLED !== "false"

        if (emailProvider === "graph") {
          await sendViaMicrosoftGraph({
            to: emailTo,
            cc: emailCc,
            subject: subjectAdmin,
            html: adminHtmlBody,
            replyTo: [{ address: email, name }],
          })
          emailSent = true

          if (confirmationEnabled) {
            try {
              await sendViaMicrosoftGraph({
                to: [email],
                subject: subjectConfirmation,
                html: confirmationHtmlBody,
              })
            } catch (confirmationError) {
              console.error("Error sending confirmation email:", confirmationError)
              if (!isProd) {
                console.info("[contact] Confirmation email failed (ignored)", {
                  to: email,
                  error:
                    confirmationError instanceof Error
                      ? confirmationError.message
                      : String(confirmationError),
                })
              }
            }
          }
        } else {
          const transporter = createSmtpTransporter()

          await sendViaSmtp(transporter, {
            to: emailTo,
            cc: emailCc,
            subject: subjectAdmin,
            text: adminTextBody,
            html: adminHtmlBody,
            replyTo: email,
          })
          emailSent = true

          if (confirmationEnabled) {
            try {
              await sendViaSmtp(transporter, {
                to: [email],
                subject: subjectConfirmation,
                text: confirmationTextBody,
                html: confirmationHtmlBody,
              })
            } catch (confirmationError) {
              console.error("Error sending confirmation email:", confirmationError)
              if (!isProd) {
                console.info("[contact] Confirmation email failed (ignored)", {
                  to: email,
                  error:
                    confirmationError instanceof Error
                      ? confirmationError.message
                      : String(confirmationError),
                })
              }
            }
          }
        }
      } catch (emailError) {
        lastEmailError = emailError
        console.error("Error sending email:", emailError)
        if (requireEmail) {
          const isProd = process.env.NODE_ENV === "production"
          return NextResponse.json(
            {
              error: "Failed to send email",
              hint:
                emailProvider === "graph"
                  ? "For Microsoft Graph app-only (client credentials), user:sendMail requires Microsoft Graph 'Mail.Send' (Application) with admin consent. Ensure your access token contains the app role in the 'roles' claim (not delegated 'scp')."
                  : "Verify SMTP_HOST/SMTP_PORT/SMTP_USER/SMTP_PASS (and SMTP_SECURE for port 465).",
              ...(isProd
                ? {}
                : {
                    debug: {
                      provider: emailProvider,
                      to: emailTo,
                      cc: emailCc,
                      emailError:
                        emailError instanceof Error
                          ? emailError.message
                          : String(emailError),
                      emailErrorDetails: (emailError as any)?.details,
                    },
                  }),
            },
            { status: 500 }
          )
        }
      }
    } else if (requireEmail) {
      return NextResponse.json(
        {
          error: "Email not configured",
          hint:
            "Set CONTACT_EMAIL_PROVIDER (graph|smtp), plus provider vars. For graph: M365_TENANT_ID (or M365_TENANT=gearsmap.com), M365_CLIENT_ID, M365_CLIENT_SECRET, M365_SENDER.",
        },
        { status: 500 }
      )
    }

    if (!dbSaved && !emailSent) {
      return NextResponse.json(
        {
          error: "No delivery method succeeded",
          hint: "Configure Neon via POSTGRES_URL (or DATABASE_URL), or configure SMTP via SMTP_HOST/SMTP_PORT.",
          ...(isProd
            ? {}
            : {
                debug: {
                  dbConfigured: hasDb,
                  emailEnabled,
                  smtpConfigured,
                  dbSaved,
                  emailSent,
                  dbError: lastDbError instanceof Error ? lastDbError.message : String(lastDbError),
                  emailError:
                    lastEmailError instanceof Error ? lastEmailError.message : String(lastEmailError),
                },
              }),
        },
        { status: 500 }
      )
    }
    return NextResponse.json({
      success: true,
      dbSaved,
      emailSent,
      ...(isProd || emailSent
        ? {}
        : {
            debug: {
              emailEnabled,
              emailProvider,
              emailAttempted,
              to: emailTo,
              cc: emailCc,
              emailError:
                lastEmailError instanceof Error
                  ? lastEmailError.message
                  : String(lastEmailError),
            },
          }),
    })
  } catch (error) {
    console.error("Error sending email:", error)
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    )
  }
}
