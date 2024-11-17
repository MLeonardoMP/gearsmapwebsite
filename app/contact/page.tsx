import Breadcrumb from "@/components/Common/Breadcrumb";
import Contact from "@/components/Contact";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Page | GearsMap WebSite",
  description: "This is Contact Page for Startup Nextjs Template",
  // other metadata
};

const ContactPage = () => {
  return (
    <>
      <Breadcrumb
        pageName="Contactenos"
        description="Complete el formulario para ponerte en contacto con nosotros."
      />

      <Contact />
    </>
  );
};

export default ContactPage;
