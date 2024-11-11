import Breadcrumb from "@/components/Common/Breadcrumb";

const portfolio = () => {
  return (
    <>
      <Breadcrumb
        pageName="Portafolio"
        description="Descubre algunos de nuestros proyectos más destacados."
      />
    <section id="portfolio" className="py-10">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="shadow-three dark:bg-gray-dark rounded-sm bg-white px-8 py-11 sm:p-14">
            <h2 className="mb-6 text-3xl font-bold text-center text-black dark:text-white">
              Nuestro Portafolio
            </h2>
            <p className="mb-12 text-base font-medium text-center text-body-color">
              Aquí encontrarás algunos de nuestros proyectos más destacados.
            </p>
            {/* Add portfolio items here */}
          </div>
        </div>
      </div>
    </section>
    </>
  );
};

export default portfolio;
