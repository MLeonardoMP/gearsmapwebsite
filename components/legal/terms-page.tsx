import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import type { Language, Locale } from "@/lib/translations"

export default function TermsPage({ locale }: { locale?: Locale }) {
  const content = {
    ES: {
      title: "Términos y Condiciones de Uso",
      lastUpdated: "Última actualización: 19 de diciembre de 2025",
      sections: [
        {
          title: "1. Aceptación de los Términos",
          content: "Al acceder y utilizar el sitio web de GearsMap S.A.S., usted acepta estar sujeto a estos términos y condiciones de uso. Si no está de acuerdo con alguna parte de estos términos, no debe utilizar nuestro sitio web o servicios."
        },
        {
          title: "2. Descripción de Servicios",
          content: "GearsMap proporciona servicios de desarrollo de software, soluciones de inteligencia artificial, sistemas de información geográfica (GIS), visualización de datos y automatización de procesos. La descripción específica de nuestros servicios puede variar y se detallará en acuerdos específicos con cada cliente."
        },
        {
          title: "3. Uso Permitido",
          content: "Usted se compromete a utilizar nuestro sitio web y servicios solo para fines legítimos y de acuerdo con estos términos. No debe utilizar nuestros servicios de manera que viole leyes locales, nacionales o internacionales, o de forma que pueda dañar, deshabilitar o sobrecargar nuestros sistemas."
        },
        {
          title: "4. Propiedad Intelectual",
          content: "Todo el contenido presente en este sitio web, incluyendo texto, gráficos, logos, imágenes, código fuente y software, es propiedad de GearsMap S.A.S. o sus licenciantes y está protegido por leyes de propiedad intelectual. El uso no autorizado de nuestro contenido está prohibido."
        },
        {
          title: "5. Limitación de Responsabilidad",
          content: "GearsMap no será responsable por daños directos, indirectos, incidentales, especiales o consecuentes que resulten del uso o la imposibilidad de uso de nuestro sitio web o servicios. Proporcionamos nuestros servicios 'tal cual' sin garantías de ningún tipo."
        },
        {
          title: "6. Modificaciones",
          content: "Nos reservamos el derecho de modificar estos términos en cualquier momento. Los cambios serán efectivos inmediatamente después de su publicación en esta página. Es su responsabilidad revisar periódicamente estos términos."
        },
        {
          title: "7. Ley Aplicable",
          content: "Estos términos se rigen por las leyes de Colombia. Cualquier disputa relacionada con estos términos estará sujeta a la jurisdicción exclusiva de los tribunales de Bogotá, Colombia."
        },
        {
          title: "8. Contacto",
          content: "Para preguntas sobre estos términos y condiciones, contáctenos en: gearsmap@gearsmap.com"
        }
      ]
    },
    EN: {
      title: "Terms and Conditions of Use",
      lastUpdated: "Last updated: December 19, 2025",
      sections: [
        {
          title: "1. Acceptance of Terms",
          content: "By accessing and using the GearsMap S.A.S. website, you agree to be bound by these terms and conditions of use. If you do not agree with any part of these terms, you should not use our website or services."
        },
        {
          title: "2. Service Description",
          content: "GearsMap provides software development services, artificial intelligence solutions, geographic information systems (GIS), data visualization, and process automation. The specific description of our services may vary and will be detailed in specific agreements with each client."
        },
        {
          title: "3. Permitted Use",
          content: "You agree to use our website and services only for legitimate purposes and in accordance with these terms. You must not use our services in a way that violates local, national, or international laws, or in a manner that could damage, disable, or overload our systems."
        },
        {
          title: "4. Intellectual Property",
          content: "All content on this website, including text, graphics, logos, images, source code, and software, is the property of GearsMap S.A.S. or its licensors and is protected by intellectual property laws. Unauthorized use of our content is prohibited."
        },
        {
          title: "5. Limitation of Liability",
          content: "GearsMap shall not be liable for direct, indirect, incidental, special, or consequential damages resulting from the use or inability to use our website or services. We provide our services 'as is' without warranties of any kind."
        },
        {
          title: "6. Modifications",
          content: "We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting on this page. It is your responsibility to review these terms periodically."
        },
        {
          title: "7. Governing Law",
          content: "These terms are governed by the laws of Colombia. Any disputes related to these terms shall be subject to the exclusive jurisdiction of the courts of Bogotá, Colombia."
        },
        {
          title: "8. Contact",
          content: "For questions about these terms and conditions, contact us at: gearsmap@gearsmap.com"
        }
      ]
    },
    FR: {
      title: "Conditions Générales d'Utilisation",
      lastUpdated: "Dernière mise à jour: 19 décembre 2025",
      sections: [
        {
          title: "1. Acceptation des Conditions",
          content: "En accédant et en utilisant le site web de GearsMap S.A.S., vous acceptez d'être lié par ces conditions générales d'utilisation. Si vous n'êtes pas d'accord avec une partie de ces conditions, vous ne devez pas utiliser notre site web ou nos services."
        },
        {
          title: "2. Description des Services",
          content: "GearsMap fournit des services de développement logiciel, des solutions d'intelligence artificielle, des systèmes d'information géographique (SIG), de la visualisation de données et de l'automatisation des processus. La description spécifique de nos services peut varier et sera détaillée dans des accords spécifiques avec chaque client."
        },
        {
          title: "3. Utilisation Autorisée",
          content: "Vous vous engagez à utiliser notre site web et nos services uniquement à des fins légitimes et conformément à ces conditions. Vous ne devez pas utiliser nos services d'une manière qui viole les lois locales, nationales ou internationales, ou d'une manière qui pourrait endommager, désactiver ou surcharger nos systèmes."
        },
        {
          title: "4. Propriété Intellectuelle",
          content: "Tout le contenu présent sur ce site web, y compris le texte, les graphiques, les logos, les images, le code source et les logiciels, est la propriété de GearsMap S.A.S. ou de ses concédants de licence et est protégé par les lois sur la propriété intellectuelle. L'utilisation non autorisée de notre contenu est interdite."
        },
        {
          title: "5. Limitation de Responsabilité",
          content: "GearsMap ne sera pas responsable des dommages directs, indirects, accessoires, spéciaux ou consécutifs résultant de l'utilisation ou de l'impossibilité d'utiliser notre site web ou nos services. Nous fournissons nos services 'tels quels' sans garanties d'aucune sorte."
        },
        {
          title: "6. Modifications",
          content: "Nous nous réservons le droit de modifier ces conditions à tout moment. Les changements seront effectifs immédiatement après leur publication sur cette page. Il est de votre responsabilité de consulter périodiquement ces conditions."
        },
        {
          title: "7. Loi Applicable",
          content: "Ces conditions sont régies par les lois de la Colombie. Tout litige lié à ces conditions sera soumis à la juridiction exclusive des tribunaux de Bogotá, Colombie."
        },
        {
          title: "8. Contact",
          content: "Pour des questions sur ces conditions générales, contactez-nous à: gearsmap@gearsmap.com"
        }
      ]
    }
  }

  const currentLanguage = locale ? locale.toUpperCase() as Language : "ES"
  const currentContent = content[currentLanguage]
  const homeHref = locale ? `/${locale}` : "/"

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-6 lg:px-12 py-20">
        <Link href={homeHref} className="inline-flex items-center gap-2 text-accent hover:text-accent/80 transition-colors mb-8">
          <ArrowLeft className="w-4 h-4" />
          <span>{locale === "en" ? "Back to home" : locale === "fr" ? "Retour à l'accueil" : "Volver al inicio"}</span>
        </Link>

        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl lg:text-5xl font-bold font-sans text-foreground mb-4">
            {currentContent.title}
          </h1>
          <p className="text-muted-foreground mb-12">{currentContent.lastUpdated}</p>

          <div className="space-y-8">
            {currentContent.sections.map((section, index) => (
              <div key={index} className="glass-card p-6 rounded-xl">
                <h2 className="text-xl font-bold text-foreground mb-4">{section.title}</h2>
                <p className="text-muted-foreground leading-relaxed">{section.content}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 p-6 bg-accent/5 border border-accent/20 rounded-xl">
            <p className="text-sm text-muted-foreground">
              GearsMap S.A.S. - NIT: 901943973 - Bogotá, Colombia
              <br />
              Contacto: <a href="mailto:gearsmap@gearsmap.com" className="text-accent hover:underline">gearsmap@gearsmap.com</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
