import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import type { Language, Locale } from "@/lib/translations"

export default function PrivacyPage({ locale }: { locale?: Locale }) {
  const content = {
    ES: {
      title: "Política de Privacidad",
      lastUpdated: "Última actualización: 19 de diciembre de 2025",
      sections: [
        {
          title: "1. Información que Recopilamos",
          content: "En GearsMap S.A.S., recopilamos información que usted nos proporciona directamente cuando utiliza nuestros servicios, incluyendo nombre, correo electrónico, teléfono y cualquier información adicional que decida compartir con nosotros a través de nuestros formularios de contacto."
        },
        {
          title: "2. Uso de la Información",
          content: "Utilizamos la información recopilada para: responder a sus consultas y solicitudes, mejorar nuestros servicios, enviar comunicaciones relacionadas con nuestros productos y servicios, y cumplir con obligaciones legales."
        },
        {
          title: "3. Protección de Datos",
          content: "Implementamos medidas de seguridad técnicas y organizativas apropiadas para proteger su información personal contra acceso no autorizado, alteración, divulgación o destrucción. Sus datos son almacenados de forma segura y solo son accesibles por personal autorizado."
        },
        {
          title: "4. Compartir Información",
          content: "No vendemos, intercambiamos ni transferimos su información personal a terceros sin su consentimiento, excepto cuando sea necesario para proporcionar nuestros servicios o cuando lo requiera la ley."
        },
        {
          title: "5. Sus Derechos",
          content: "Usted tiene derecho a acceder, rectificar, cancelar u oponerse al tratamiento de sus datos personales. Para ejercer estos derechos, puede contactarnos a través de gearsmap@gearsmap.com."
        },
        {
          title: "6. Cookies",
          content: "Utilizamos cookies y tecnologías similares para mejorar la experiencia del usuario en nuestro sitio web. Puede configurar su navegador para rechazar las cookies, aunque esto puede afectar la funcionalidad del sitio."
        },
        {
          title: "7. Cambios a esta Política",
          content: "Nos reservamos el derecho de actualizar esta política de privacidad en cualquier momento. Le notificaremos sobre cambios significativos publicando la nueva política en esta página."
        },
        {
          title: "8. Contacto",
          content: "Si tiene preguntas sobre esta política de privacidad, puede contactarnos en: gearsmap@gearsmap.com"
        }
      ]
    },
    EN: {
      title: "Privacy Policy",
      lastUpdated: "Last updated: December 19, 2025",
      sections: [
        {
          title: "1. Information We Collect",
          content: "At GearsMap S.A.S., we collect information that you provide to us directly when using our services, including name, email, phone number, and any additional information you choose to share with us through our contact forms."
        },
        {
          title: "2. Use of Information",
          content: "We use the collected information to: respond to your inquiries and requests, improve our services, send communications related to our products and services, and comply with legal obligations."
        },
        {
          title: "3. Data Protection",
          content: "We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. Your data is stored securely and is only accessible by authorized personnel."
        },
        {
          title: "4. Sharing Information",
          content: "We do not sell, trade, or transfer your personal information to third parties without your consent, except when necessary to provide our services or when required by law."
        },
        {
          title: "5. Your Rights",
          content: "You have the right to access, rectify, cancel, or object to the processing of your personal data. To exercise these rights, you can contact us at gearsmap@gearsmap.com."
        },
        {
          title: "6. Cookies",
          content: "We use cookies and similar technologies to improve the user experience on our website. You can configure your browser to reject cookies, although this may affect site functionality."
        },
        {
          title: "7. Changes to this Policy",
          content: "We reserve the right to update this privacy policy at any time. We will notify you of significant changes by posting the new policy on this page."
        },
        {
          title: "8. Contact",
          content: "If you have questions about this privacy policy, you can contact us at: gearsmap@gearsmap.com"
        }
      ]
    },
    FR: {
      title: "Politique de Confidentialité",
      lastUpdated: "Dernière mise à jour: 19 décembre 2025",
      sections: [
        {
          title: "1. Informations que Nous Collectons",
          content: "Chez GearsMap S.A.S., nous collectons les informations que vous nous fournissez directement lors de l'utilisation de nos services, notamment nom, email, téléphone et toute information supplémentaire que vous choisissez de partager avec nous via nos formulaires de contact."
        },
        {
          title: "2. Utilisation des Informations",
          content: "Nous utilisons les informations collectées pour: répondre à vos demandes, améliorer nos services, envoyer des communications liées à nos produits et services, et respecter nos obligations légales."
        },
        {
          title: "3. Protection des Données",
          content: "Nous mettons en œuvre des mesures de sécurité techniques et organisationnelles appropriées pour protéger vos informations personnelles contre l'accès non autorisé, l'altération, la divulgation ou la destruction. Vos données sont stockées en toute sécurité et ne sont accessibles que par le personnel autorisé."
        },
        {
          title: "4. Partage d'Informations",
          content: "Nous ne vendons, n'échangeons ni ne transférons vos informations personnelles à des tiers sans votre consentement, sauf si nécessaire pour fournir nos services ou si requis par la loi."
        },
        {
          title: "5. Vos Droits",
          content: "Vous avez le droit d'accéder, de rectifier, d'annuler ou de vous opposer au traitement de vos données personnelles. Pour exercer ces droits, vous pouvez nous contacter à gearsmap@gearsmap.com."
        },
        {
          title: "6. Cookies",
          content: "Nous utilisons des cookies et des technologies similaires pour améliorer l'expérience utilisateur sur notre site web. Vous pouvez configurer votre navigateur pour refuser les cookies, bien que cela puisse affecter la fonctionnalité du site."
        },
        {
          title: "7. Modifications de cette Politique",
          content: "Nous nous réservons le droit de mettre à jour cette politique de confidentialité à tout moment. Nous vous informerons des changements importants en publiant la nouvelle politique sur cette page."
        },
        {
          title: "8. Contact",
          content: "Si vous avez des questions concernant cette politique de confidentialité, vous pouvez nous contacter à: gearsmap@gearsmap.com"
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
              Para cualquier consulta sobre esta política de privacidad o para ejercer sus derechos, 
              contáctenos en: <a href="mailto:gearsmap@gearsmap.com" className="text-accent hover:underline">gearsmap@gearsmap.com</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
