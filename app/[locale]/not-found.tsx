import Link from "next/link"
import { ArrowLeft, MapPinOff } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-6 py-24 text-center">
      <div className="max-w-md space-y-6">
        <div className="flex justify-center">
          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-accent/10">
            <MapPinOff className="h-12 w-12 text-accent" aria-hidden="true" />
          </div>
        </div>
        <h1 className="font-display text-4xl font-semibold text-foreground">Página no encontrada</h1>
        <p className="text-lg text-muted-foreground">
          La ruta no existe o se movió. Vuelva al inicio en español, inglés o francés.
        </p>
        <div className="flex flex-wrap justify-center gap-3 pt-2">
          <Button asChild>
            <Link href="/es"><ArrowLeft className="h-4 w-4" aria-hidden="true" /> Español</Link>
          </Button>
          <Button asChild variant="outline"><Link href="/en">English</Link></Button>
          <Button asChild variant="outline"><Link href="/fr">Français</Link></Button>
        </div>
      </div>
    </div>
  )
}
