import Breadcrumb from "@/components/Common/Breadcrumb";
import Image from "next/image";
import Link from "next/link";
const portfolio = () => {
  return (
    <>
      <Breadcrumb
        pageName="portafolio"
        description="Conozca más sobre nuestros servicios y soluciones de visualización y análisis de datos."
      />
      <section className="pt-16 md:pt-20 lg:pt-28">
        <div className="container">
          {/* ...componentes de diseño existente... */}
          <h1 className="mb-8 text-3xl font-bold">Portafolio</h1>

          <section className="mb-8">
            <div className="mx-auto mb-10 flex h-[100px] w-[100px] items-center justify-center rounded-md bg-primary bg-opacity-10 text-primary">
              <Image
                src="/images/portfolio/gmlogo.svg"
                alt="logo"
                width={100}
                height={100}
                priority={true}
                unoptimized={true}
              />
            </div>
            <h2 className="mb-4 text-2xl font-semibold">
              1. Visualización 2D y 3D
            </h2>
            <p className="text-lg text-body-color">
              Potencie el análisis y comprensión de sus datos mediante
              herramientas avanzadas de visualización 2D y 3D, diseñadas a la
              medida de sus necesidades específicas. Estas soluciones ofrecen
              interactividad en tiempo real, lo que permite explorar modelos en
              profundidad. Los requerimientos y funcionalidades pueden ajustarse
              a sus especificaciones particulares, proporcionando una
              experiencia de visualización altamente personalizada.
            </p>
            <br />
            <div className="flex justify-center">
              <Image
                src="/images/portfolio/gif_modelo_3d.gif"
                alt="Example GIF"
                width={700}
                height={700}
              />
            </div>
          </section>

          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-semibold">
              2. Dashboards y estadísticas
            </h2>
            <p className="text-lg text-body-color">
              Esta herramienta le permitirá presentar y analizar sus datos de
              manera clara y visual, facilitando una toma de decisiones más
              informada. Podrá obtener una visión general de la información de
              manera rápida y sencilla, con la opción de profundizar en detalles
              específicos según sus necesidades.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-semibold">
              3. Herramientas embebidas en página web
            </h2>
            <p className="text-lg text-body-color">
              La integración de herramientas embebidas en su página web le
              permite visualizar y explorar datos geoespaciales de manera
              interactiva directamente en el navegador. Esta herramienta es
              ideal para presentar información geográfica o conjuntos de datos
              específicos de manera accesible y dinámica, sin necesidad de
              software especializado.
            </p>
            
            <iframe
              src="https://oaas_visor_conflictos.minenergia.gov.co/"
              width="100%"
              height="500"
            ></iframe>
            {/* crea un boton con Link que abra una nueva pestaña a https://oaas_visor_conflictos.minenergia.gov.co/ usando nextjs 15 server component*/}
            <Link
              href="https://oaas_visor_conflictos.minenergia.gov.co/"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 text-primary hover:text-primary-dark"
            >
              Visitar página web
            </Link>
            
          </section>

          {/* Insertar GIF o imagen para "Gif modelo 3d" si está disponible */}

          <h1 className="mb-8 text-3xl font-bold">Servicios</h1>

          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-semibold">
              1. Análisis de Datos
            </h2>
            <p className="text-lg text-body-color">
              Ofrecemos soluciones avanzadas de análisis de datos para ayudarle
              a comprender mejor su información y tomar decisiones basadas en
              datos precisos. Mediante técnicas de análisis y visualización,
              transformamos grandes volúmenes de datos en insights claros y
              valiosos, lo que le permitirá optimizar operaciones, identificar
              oportunidades de crecimiento y reducir riesgos.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-semibold">
              2. Automatización de Procesos
            </h2>
            <p className="text-lg text-body-color">
              A través de la automatización de procesos, le ayudamos a mejorar
              la eficiencia operativa y reducir el tiempo dedicado a tareas
              repetitivas. Implementamos soluciones personalizadas que agilizan
              sus flujos de trabajo, optimizan recursos y minimizan errores,
              permitiendo que su equipo se enfoque en tareas de mayor valor
              estratégico.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-semibold">
              3. Monitoreo y Mantenimiento de los Productos
            </h2>
            <p className="text-lg text-body-color">
              Proveemos servicios de monitoreo continuo y mantenimiento de
              productos, asegurando su funcionamiento óptimo a lo largo del
              tiempo. Con tecnologías avanzadas de seguimiento y alertas en
              tiempo real, garantizamos la detección temprana de posibles fallas
              o anomalías, permitiendo una intervención rápida y proactiva para
              maximizar la vida útil y el rendimiento de sus productos.
            </p>
          </section>

          {/* ...componentes de diseño existente... */}
        </div>
      </section>
    </>
  );
};

export default portfolio;
