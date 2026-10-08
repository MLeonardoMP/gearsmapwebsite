import Link from "next/link"
import { locale as rootLocale } from "next/root-params"
import { ArrowLeft, MapPinOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { isLocale, type Locale } from "@/lib/translations"

const copy: Record<Locale, { title: string; body: string; home: string }> = {
  es: {
    title: "Página no encontrada",
    body: "La página que buscas no existe o cambió de dirección.",
    home: "Volver al inicio",
  },
  en: {
    title: "Page not found",
    body: "The page you are looking for does not exist or has moved.",
    home: "Back to home",
  },
  fr: {
    title: "Page introuvable",
    body: "La page que vous cherchez n'existe pas ou a changé d'adresse.",
    home: "Retour à l'accueil",
  },
}

/** Like getLocale(), but tolerates an invalid locale (falls back to "es") instead of calling notFound() again. */
async function notFoundLocale(): Promise<Locale> {
  const value = await rootLocale()
  return isLocale(value) ? value : "es"
}

export default async function NotFound() {
  const locale = await notFoundLocale()
  const text = copy[locale]

  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-6 py-24 text-center">
      <div className="max-w-md space-y-6">
        <div className="flex justify-center">
          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-accent/10">
            <MapPinOff className="h-12 w-12 text-accent" aria-hidden="true" />
          </div>
        </div>
        <h1 className="font-display text-4xl font-semibold text-foreground">{text.title}</h1>
        <p className="text-lg text-muted-foreground">{text.body}</p>
        <div className="flex justify-center pt-2">
          <Button asChild>
            <Link href={`/${locale}`}>
              <ArrowLeft className="h-4 w-4" aria-hidden="true" /> {text.home}
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
