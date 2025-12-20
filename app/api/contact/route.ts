import { NextResponse } from "next/server"
import nodemailer from "nodemailer"
import { sql } from "@vercel/postgres"
import { z } from "zod"

const contactSchema = z.object({
  name: z.string().trim().min(1),
  email: z.string().trim().email(),
  phone: z.string().trim().optional().nullable(),
  message: z.string().trim().min(1),
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

    const { name, email, phone, message } = parsed.data

    const requireDb = process.env.CONTACT_REQUIRE_DB === "true"
    const requireEmail = process.env.CONTACT_REQUIRE_EMAIL === "true"
    const hasDb = Boolean(process.env.POSTGRES_URL || process.env.POSTGRES_URL_NON_POOLING)
    let dbSaved = false
    let emailSent = false

    if (hasDb) {
      try {
        await sql`
          INSERT INTO public.conect (name, email, phone, message)
          VALUES (${name}, ${email}, ${phone ?? null}, ${message})
        `
        dbSaved = true
      } catch (dbError) {
        console.error("Error saving contact message to DB:", dbError)
        if (requireDb) {
          return NextResponse.json(
            { error: "Failed to save message" },
            { status: 500 }
          )
        }
      }
    } else if (requireDb) {
      return NextResponse.json(
        { error: "Database not configured" },
        { status: 500 }
      )
    }

    // Email is best-effort by default (so local dev doesn't fail if SMTP isn't configured).
    // Set CONTACT_REQUIRE_EMAIL=true to fail if email can't be sent.
    const emailEnabled = process.env.CONTACT_EMAIL_ENABLED !== "false"
    const smtpHost = process.env.SMTP_HOST
    const hasSmtp = Boolean(smtpHost)

    if (emailEnabled && hasSmtp) {
      try {
        const transporter = nodemailer.createTransport({
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

        const mailOptions = {
          from:
            process.env.SMTP_FROM || '"GearsMap Website" <no-reply@gearsmap.com>',
          to: "gearsmap@gearsmap.com, juan.mosquera@gearsmap.com",
          subject: `New Contact Form Submission from ${name}`,
          text: `
Name: ${name}
Email: ${email}
Phone: ${phone || "Not provided"}

Message:
${message}
          `,
          html: `
<h3>New Contact Form Submission</h3>
<p><strong>Name:</strong> ${name}</p>
<p><strong>Email:</strong> ${email}</p>
<p><strong>Phone:</strong> ${phone || "Not provided"}</p>
<br/>
<p><strong>Message:</strong></p>
<p>${message.replace(/\n/g, "<br>")}</p>
          `,
        }

        await transporter.sendMail(mailOptions)
        emailSent = true
      } catch (emailError) {
        console.error("Error sending email:", emailError)
        if (requireEmail) {
          return NextResponse.json(
            { error: "Failed to send email" },
            { status: 500 }
          )
        }
      }
    } else if (requireEmail) {
      return NextResponse.json(
        { error: "Email not configured" },
        { status: 500 }
      )
    }

    if (!dbSaved && !emailSent) {
      return NextResponse.json(
        { error: "No delivery method configured" },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true, dbSaved, emailSent })
  } catch (error) {
    console.error("Error sending email:", error)
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    )
  }
}
