import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, MapPinOff } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background px-4 text-center">
      <div className="space-y-6 max-w-md">
        <div className="flex justify-center">
          <div className="w-24 h-24 bg-accent/10 rounded-full flex items-center justify-center animate-pulse">
            <MapPinOff className="w-12 h-12 text-accent" />
          </div>
        </div>
        
        <h1 className="text-4xl font-bold font-sans text-foreground">
          404 - Página no encontrada
        </h1>
        
        <p className="text-muted-foreground text-lg">
          Parece que te has perdido en el mapa. La página que buscas no existe o ha sido movida.
        </p>

        <div className="pt-4">
          <Link href="/">
            <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground font-medium">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver al inicio
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
