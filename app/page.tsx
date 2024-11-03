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
  title: "GearsMap",
  description: "Esta es la página web de GearsMap",
  metadataBase: new URL("https://gearsmap.com"),
  openGraph: {
    title: "GearsMap",
    description: "Esta es la página web de GearsMap",
    url: "https://gearsmap.com",
    images: [
      {
        url: "/images/logo/gearmaplogo.png",
        width: 800,
        height: 600,
        alt: "Logo GearsMap",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "GearsMap",
    description: "Esta es la página web de GearsMap",
    images: "/images/logo/gearmaplogo.png",
  },
  // other metadata
};

export default function Home() {
  return (
    <>
      <ScrollUp />
      <Hero />
      <Features />
      <Video />
      <Brands />
      <AboutSectionOne />
      <AboutSectionTwo />
      <Testimonials />
      {/* <Pricing />
      <Blog /> */}
      <Contact />
    </>
  );
}
