// features/properties/PropertyHomePage.tsx

import PropertiesList from "../components/PropertyList";

export default function PropertyHomePage() {
  return (
    <div className="bg-gray dark:bg-grayDark">
      {/* Hero Section */}
      <section className="bg-primary dark:bg-primaryDark text-tertiary dark:text-tertiaryDark py-20">
        <div className="container mx-auto text-center px-6">
          <h1 className="text-5xl font-bold mb-4">Bienvenido a Tu Hogar Ideal</h1>
          <p className="text-lg mb-6 max-w-2xl mx-auto">
            Encuentra las mejores propiedades para venta o alquiler con nosotros. Explora nuestro catálogo y comienza tu búsqueda hoy mismo.
          </p>
          <a
            href="#propiedades"
            className="inline-block bg-secondary dark:bg-secondaryDark text-primary dark:text-primaryDark px-6 py-3 rounded-md hover:bg-opacity-90 transition-colors font-semibold"
          >
            Ver Propiedades
          </a>
        </div>
      </section>

      {/* Properties Section */}
      <section id="propiedades" className="py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-primary dark:text-primaryDark mb-8 text-center">
            Nuestras Propiedades
          </h2>
          <PropertiesList />
        </div>
      </section>

      {/* About Us Section */}
      <section className="bg-tertiary dark:bg-tertiaryDark py-16">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-primary dark:text-primaryDark mb-6">Sobre Nosotros</h2>
          <p className="text-primary dark:text-primaryDark max-w-3xl mx-auto mb-6">
            Somos una inmobiliaria dedicada a conectar personas con sus hogares soñados. Con años de experiencia en el mercado, ofrecemos un servicio personalizado y una amplia selección de propiedades para satisfacer tus necesidades.
          </p>
          <a
            href="#"
            className="inline-block bg-primary dark:bg-primaryDark text-tertiary dark:text-tertiaryDark px-6 py-3 rounded-md hover:bg-opacity-90 transition-colors font-semibold"
          >
            Conoce Más
          </a>
        </div>
      </section>
    </div>
  );
}