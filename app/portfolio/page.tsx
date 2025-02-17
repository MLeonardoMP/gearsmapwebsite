import Breadcrumb from "@/components/Common/Breadcrumb";
import Image from "next/image";
import Link from "next/link";
const portfolio = () => {
  return (
    <>
      <Breadcrumb
        pageName="Portafolio y Servicios"
        description="Conozca más sobre nuestros servicios y soluciones de visualización y análisis de datos."
      />
      <section className="pt-16 md:pt-20 lg:pt-28">
        <div className="container">
          {/* ...componentes de diseño existente... */}
          <h1 className="mb-8 text-3xl font-bold">Portafolio y Servicios</h1>

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
            <section className="mb-8">
            <h2 className="mb-4 text-2xl font-semibold">
              Inteligencia artificial y Machine Learning
            </h2>
            <p className="text-lg text-body-color">
              Implementamos soluciones de inteligencia artificial y machine
              learning para ayudarle a extraer información valiosa de sus datos y
              mejorar la toma de decisiones. Nuestros modelos predictivos y de
              análisis avanzado le permitirán identificar patrones, tendencias y
              oportunidades ocultas en sus datos, proporcionando insights
              estratégicos para su organización.
            </p>
          </section>
          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-semibold">
              Geovisores
            </h2>
            <p className="text-lg text-body-color">
              Desarrollamos geovisores personalizados para visualizar y analizar
              información geoespacial de manera interactiva y dinámica. Estas
              herramientas le permitirán explorar mapas, datos y estadísticas de
              manera intuitiva, facilitando la toma de decisiones basadas en
              información geográfica precisa y actualizada.
            </p>
          </section>
            <h2 className="mb-4 text-2xl font-semibold">
              Visualización 2D y 3D
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
            <div className="relative flex justify-center" style={{ width: '100%', height: '700px' }}>
              <Image
                src="/images/portfolio/gif_modelo_3d.gif"
                alt="Example GIF"
                fill
              />
            </div>
          </section>

          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-semibold">
              Dashboards y estadísticas
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
              Herramientas embebidas en página web
            </h2>
            <p className="text-lg text-body-color">
              La integración de herramientas embebidas en su página web le
              permite visualizar y explorar datos geoespaciales de manera
              interactiva directamente en el navegador. Esta herramienta es
              ideal para presentar información geográfica o conjuntos de datos
              específicos de manera accesible y dinámica, sin necesidad de
              software especializado.
            </p>
            <br />
            <div className="relative flex justify-center" style={{ width: '100%', height: '700px' }}>
              <Image
                src="/images/portfolio/trazasismica.gif"
                alt="Example GIF"
                fill
              />
            </div>
            {/* <iframe
              src="https://oaas_visor_conflictos.minenergia.gov.co/"
              width="100%"
              height="700"
            ></iframe> */}
            {/* crea un boton con Link que abra una nueva pestaña a https://oaas_visor_conflictos.minenergia.gov.co/ usando nextjs 15 server component*/}
            {/* <Link
              href="https://oaas_visor_conflictos.minenergia.gov.co/"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 text-primary hover:text-primary-dark"
            >
              Visitar página web
            </Link> */}
            
          </section>

          {/* Insertar GIF o imagen para "Gif modelo 3d" si está disponible */}
          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-semibold">
              Análisis de Datos
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
              Automatización de Procesos
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
              Monitoreo y Mantenimiento de los Productos
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
