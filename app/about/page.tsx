import AboutSectionOne from "@/components/About/AboutSectionOne";
import AboutSectionTwo from "@/components/About/AboutSectionTwo";
import Breadcrumb from "@/components/Common/Breadcrumb";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Page | GearsMap WebSite",
  description: "This is About Page for Startup Nextjs Template",
  // metadatos adicionales
};

const AboutPage = () => {
  return (
    <>
      <Breadcrumb
        pageName="Sobre Nosotros"
        description="Conoce más sobre nuestra empresa y nuestro equipo de trabajo."
      />
      <AboutSectionOne />
      <AboutSectionTwo />
    </>
  );
};

export default AboutPage;
