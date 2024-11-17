import AboutSectionOne from "@/components/About/AboutSectionOne";
import AboutSectionTwo from "@/components/About/AboutSectionTwo";
import Blog from "@/components/Blog";
import Brands from "@/components/Brands";
import ScrollUp from "@/components/Common/ScrollUp";
import Contact from "@/components/Contact";
import Features from "@/components/Features";
import Hero from "@/components/Hero";
import Pricing from "@/components/Pricing";
import Testimonials from "@/components/Testimonials";
import Video from "@/components/Video";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "GearsMap - Diseñamos plataformas personalizadas que optimizan procesos y transforman tus datos en decisiones estratégicas",
  description:
    "Diseñamos plataformas personalizadas que optimizan procesos, visualizan datos complejos y conectan a los usuarios con información precisa y actualizada. Nuestro compromiso: innovación, soporte constante y herramientas de alta calidad para transformar tus datos en decisiones estratégicas.",
    keywords: [
      "GearsMap",
      "Software Geoespacial",
      "Análisis Geoespacial",
      "Inteligencia Artificial",
      "Software Libre",
      "Visualización Avanzada",
      "Optimización Inteligente",
      "Soporte Continuo",
      "Conectividad",
      "Calidad",
      "Fiabilidad",
      "Colombia",
      "Desarrollo de Software",
      "Desarrollo de Software Libre",
      "Desarrollo de Software Geoespacial",
    ],
    metadataBase: new URL("https://gearsmap.com"),
  openGraph: {
    title: "GearsMap - Diseñamos plataformas personalizadas que optimizan procesos y transforman tus datos en decisiones estratégicas",
    description:
      "Diseñamos plataformas personalizadas que optimizan procesos, visualizan datos complejos y conectan a los usuarios con información precisa y actualizada.",
    url: "https://gearsmap.com",
    images: [
      {
        url: "https://www.gearsmap.com/images/logo/gearmaplogo.png",
        width: 800,
        height: 600,
        alt: "Logo GearsMap",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "GearsMap - Innovación y herramientas de alta calidad para decisiones estratégicas",
    description:
      "Nuestro compromiso: innovación, soporte constante y herramientas de alta calidad para transformar tus datos en decisiones estratégicas.",
    images: "https://www.gearsmap.com/images/logo/gearmaplogo.png",
  },
  // other metadata
};

export default function Home() {
  return (
    <>
      <ScrollUp />
      <Hero />
      <Features />
      {/* <Video />
      <Brands /> */}
      <AboutSectionOne />
      <AboutSectionTwo />
      {/* <Testimonials /> */}
      {/* <Pricing />
      <Blog /> */}
      <Contact />
    </>
  );
}
