import { useState } from 'react';
import { Propiedade } from "@/payload-types";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from 'lucide-react'; // Icons for carousel navigation
import { useModelTempStore } from '@/lib/models';
import { PropiedadesModel } from '@/lib/models/Propiedades';

interface PropertyCardProps {
  propiedad: Propiedade;
}

export default function PropertyCard({ propiedad }: PropertyCardProps) {
  const {actions: {setModelTemp}} = useModelTempStore();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Extract images from the imagenes array
  const images = propiedad.imagenes?.map(item => item.imagen).filter(url => url) || ['/placeholder-image.jpg'];

  // Handle image navigation
  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    <Card className="bg-tertiary dark:bg-grayDark overflow-hidden hover:shadow-xl hover:border-secondary dark:hover:border-secondaryDark transition-all duration-300">
      <CardContent className="p-0">
        {/* Image Carousel */}
        <div className="relative h-48">
          <img
            src={images[currentImageIndex]?.toString()}
            alt={propiedad.direccion}
            className="w-full h-full object-cover"
          />
          {images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-primary dark:bg-primaryDark text-tertiary dark:text-tertiary p-2 rounded-full opacity-75 hover:opacity-100 transition-opacity"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-primary dark:bg-primaryDark text-tertiary dark:text-tertiary p-2 rounded-full opacity-75 hover:opacity-100 transition-opacity"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
              {/* Image Indicators */}
              <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {images.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full ${
                      index === currentImageIndex ? 'bg-secondary dark:bg-secondaryDark' : 'bg-gray-400 dark:bg-gray-600'
                    }`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
        <div className="p-4">
          <h2 className="text-xl font-semibold text-primary dark:text-tertiary truncate">
            {propiedad.titulo}
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            {propiedad.ciudad}, {propiedad.pais}
          </p>
          <p className="text-lg font-bold text-secondary dark:text-secondaryDark mt-2">
            ${propiedad.precio.toLocaleString()} {propiedad.moneda || 'USD'}
          </p>
          <p className="text-sm text-primary dark:text-tertiary mt-1">
            {propiedad.metros_cuadrados ?? '-'} m² | {propiedad.habitaciones ?? '-'} hab |{' '}
            {propiedad.baños ?? '-'} baños
          </p>
          <Link onClick={() => setModelTemp(PropiedadesModel.key, [propiedad])} href={`/propiedades?id=${propiedad.id}`} passHref>
            <Button
              variant="outline"
              className="mt-4 bg-primary dark:bg-primaryDark text-tertiary dark:text-tertiary hover:bg-secondary dark:hover:bg-secondaryDark hover:text-primary dark:hover:text-primaryDark transition-colors w-full border-2 border-primary dark:border-tertiary rounded-lg"
            >
              Ver Detalles
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}