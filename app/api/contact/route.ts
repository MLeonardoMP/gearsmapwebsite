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
    const hasDb = Boolean(process.env.POSTGRES_URL || process.env.POSTGRES_URL_NON_POOLING)
    let dbSaved = false

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

    // Create a transporter
    // Note: In a real application, you should use environment variables for these values.
    // For now, we will check if they exist, otherwise we might log a warning or fail.
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: process.env.SMTP_SECURE === "true", // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Email content
    const mailOptions = {
      from: process.env.SMTP_FROM || '"GearsMap Website" <no-reply@gearsmap.com>',
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
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions)

    return NextResponse.json({ success: true, dbSaved })
  } catch (error) {
    console.error("Error sending email:", error)
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    )
  }
}
