import Image from "next/image";

const AboutSectionTwo = () => {
  return (
    <section className="py-10">
      <div className="container">
        <div className="-mx-4 flex flex-wrap items-center">
          <div className="w-full px-4 lg:w-1/2">
            <div
              className="wow fadeInUp relative mx-auto mb-12 aspect-[25/24] max-w-[500px] text-center lg:m-0"
              data-wow-delay=".15s"
            >
              <Image
                src="/images/about/about-image-2.svg"
                alt="about image"
                fill
                className="drop-shadow-three dark:hidden dark:drop-shadow-none"
              />
              <Image
                src="/images/about/about-image-2-dark.svg"
                alt="about image"
                fill
                className="drop-shadow-three hidden dark:block dark:drop-shadow-none"
              />
            </div>
          </div>
          <div className="w-full px-4 lg:w-1/2">
            <div className="wow fadeInUp max-w-[470px]" data-wow-delay=".2s">
              <div className="mb-9">
                <h3 className="mb-4 text-xl font-bold text-black dark:text-white sm:text-2xl lg:text-xl xl:text-2xl">
                Misión: 
                </h3>
                <p className="text-base font-medium leading-relaxed text-body-color sm:text-lg sm:leading-relaxed">
                Nuestro principal objetivo como empresa es asistir a entidades gubernamentales, empresas y otras organizaciones en su transformación digital hacia un futuro más próspero. Buscamos optimizar cada recurso y proceso mediante el uso innovador de la información, manteniendo nuestros valores fundamentales de excelencia, eficiencia e innovación.
                </p>
              </div>
              <div className="mb-9">
                <h3 className="mb-4 text-xl font-bold text-black dark:text-white sm:text-2xl lg:text-xl xl:text-2xl">
                Visión:
                </h3>
                <p className="text-base font-medium leading-relaxed text-body-color sm:text-lg sm:leading-relaxed">
                Aspiramos a llevar nuestras innovaciones a todos los rincones del mundo, colaborando con entidades e individuos para generar ideas y desarrollos revolucionarios. Nuestro objetivo es contribuir a la transformación del desarrollo de la humanidad, optimizando y salvaguardando todo tipo de recursos.
                </p>
              </div>
              <div className="mb-1">
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSectionTwo;
