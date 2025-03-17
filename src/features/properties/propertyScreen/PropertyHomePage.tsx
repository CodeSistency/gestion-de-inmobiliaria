"use client";
import PropertiesList from "../components/PropertyList";
import { Button } from "@/components/ui/button";

export default function PropertyHomePage() {
  return (
    <div className="bg-gray dark:bg-grayDark">
      {/* Hero Section */}
      <section className="relative bg-gray dark:bg-primaryDark text-primary dark:text-tertiary py-24">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-50"
          style={{ backgroundImage: "url('/placeholder-hero.jpg')" }}
        ></div>
        <div className="relative container mx-auto text-center px-6 z-10">
          <h1 className="text-5xl font-bold mb-6 border-b-4 border-secondary dark:border-secondaryDark inline-block pb-2">
            Bienvenido a Tu Hogar Ideal
          </h1>
          <p className="text-lg mb-8 max-w-3xl mx-auto leading-relaxed">
            Encuentra las mejores propiedades para venta o alquiler con nosotros. Explora nuestro catálogo y comienza tu búsqueda hoy mismo.
          </p>
          <Button
            asChild
            className="bg-secondary dark:bg-secondaryDark text-primary dark:text-primaryDark hover:bg-opacity-90 transition-colors border-2 border-primary dark:border-tertiary"
          >
            <a href="#propiedades">Ver Propiedades</a>
          </Button>
        </div>
      </section>

      {/* Properties Section */}
      <section id="propiedades" className="py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-primary dark:text-secondaryDark mb-10 text-center">
            Nuestras Propiedades
          </h2>
          <PropertiesList />
        </div>
      </section>

      {/* About Us Section */}
      <section className="bg-tertiary dark:bg-tertiaryDark py-16">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center gap-10">
          <div className="md:w-1/2">
            <img
              src="/placeholder-about.jpg"
              alt="Sobre Nosotros"
              className="rounded-lg shadow-md w-full h-64 object-cover border-4 border-secondary dark:border-secondaryDark"
            />
          </div>
          <div className="md:w-1/2 text-center md:text-left">
            <h2 className="text-3xl font-bold text-primary dark:text-secondaryDark mb-6">Sobre Nosotros</h2>
            <p className="text-primary dark:text-tertiary max-w-2xl mb-6 leading-relaxed">
              Somos una inmobiliaria dedicada a conectar personas con sus hogares soñados. Con años de experiencia en el mercado, ofrecemos un servicio personalizado y una amplia selección de propiedades para satisfacer tus necesidades.
            </p>
            <Button
              variant="outline"
              className="bg-secondary dark:bg-secondaryDark text-primary dark:text-primaryDark hover:bg-opacity-90 transition-colors border-2 border-primary dark:border-tertiary"
            >
              Conoce Más
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}