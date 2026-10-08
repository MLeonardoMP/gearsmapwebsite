import type { Metadata } from "next"
import Link from "next/link"
import { Manrope, Sora } from "next/font/google"
import "./globals.css"

const manrope = Manrope({ subsets: ["latin"], display: "swap", variable: "--font-manrope" })
const sora = Sora({ subsets: ["latin"], display: "swap", variable: "--font-sora" })

export const metadata: Metadata = {
  title: "Página no encontrada | GearsMap",
  description: "La página solicitada no existe en GearsMap.",
  robots: { index: false, follow: false },
}

export default function GlobalNotFound() {
  return (
    <html lang="es" className={`${manrope.variable} ${sora.variable} dark antialiased`}>
      <body className="min-h-screen bg-background font-sans text-foreground antialiased">
        <main className="mx-auto flex min-h-screen max-w-lg flex-col items-start justify-center px-6">
          <p className="text-sm tracking-[0.14em] text-accent">404</p>
          <h1 className="mt-4 font-display text-4xl font-semibold">Página no encontrada</h1>
          <p className="mt-4 text-muted-foreground">
            Esa ruta no está en GearsMap. El sitio público está en español, inglés y francés.
          </p>
          <nav className="mt-8 flex gap-4 text-sm" aria-label="Idiomas">
            <Link href="/es" className="text-accent underline-offset-4 hover:underline">Español</Link>
            <Link href="/en" className="text-accent underline-offset-4 hover:underline">English</Link>
            <Link href="/fr" className="text-accent underline-offset-4 hover:underline">Français</Link>
          </nav>
        </main>
      </body>
    </html>
  )
}
