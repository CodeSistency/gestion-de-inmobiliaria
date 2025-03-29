"use client";
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { Media, Propiedade } from '@/payload-types';
import { fetchClientFunc } from '@/lib/utils/fetchClient';
import VisitForm from '../../visits/visitForm/VisitFormScreen';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useModelTempStore } from '@/lib/models';
import { MapPin, Ruler, Bed, Bath, Car, Waves, Leaf, FerrisWheel, ChevronLeft, ChevronRight } from 'lucide-react'; // Added carousel icons

export default function PropertyDetail() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showVisitForm, setShowVisitForm] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0); // State for carousel

  const { data: { Propiedades } } = useModelTempStore();
  console.log('Propiedades:', Propiedades); // Log all properties
  const propiedad = Array.isArray(Propiedades) && Propiedades.length > 0 ? Propiedades[0] : null; // Safely get the first property

  useEffect(() => {
    console.log('Propiedad:', propiedad); // Debug log
    // Simulate fetch completion since the actual fetch is commented out
    setLoading(false);
  }, [id, propiedad]);

  // Updated description type to include text
  type RichTextChild = {
    type: string;
    version: number;
    text?: string; // Added text property
    [k: string]: unknown;
  };

  type RichTextRoot = {
    type: string;
    children: RichTextChild[];
    direction: ('ltr' | 'rtl') | null;
    format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | '';
    indent: number;
    version: number;
  };

  type RichTextDescription = {
    root: RichTextRoot;
    [k: string]: unknown;
  } | null;

  // Safely render description
  const renderDescription = (desc: RichTextDescription) => {
    if (!desc?.root?.children?.length) return 'Sin descripción';
    const firstChild = desc.root.children[0];
    return firstChild.text || 'Sin descripción';
  };

  if (loading) {
    return (
      <p className="text-center text-primary dark:text-secondaryDark animate-pulse min-h-screen flex items-center justify-center bg-gray dark:bg-grayDark">
        Cargando...
      </p>
    );
  }
  if (error) {
    return (
      <p className="text-center text-red-500 min-h-screen flex items-center justify-center bg-gray dark:bg-grayDark">
        {error}
      </p>
    );
  }
  if (!propiedad) return null;

  // Extract images with proper type casting
  const images = (propiedad.imagenes as { imagen: Media }[]).map((item) => item.imagen?.url).filter(url => url) || ['/placeholder-image.jpg'];
  const mainImage = images[0]; // Default to first image

  // Map characteristics to icons
  const characteristicIcons = {
    estacionamiento: <Car className="w-5 h-5 text-gray-600 dark:text-secondaryDark" />,
    piscina: <Waves className="w-5 h-5 text-gray-600 dark:text-secondaryDark" />,
    jardin: <Leaf className="w-5 h-5 text-gray-600 dark:text-secondaryDark" />,
    garaje: <FerrisWheel className="w-5 h-5 text-gray-600 dark:text-secondaryDark" />,
  };

  // Handle image navigation
  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    <div className="bg-gray dark:bg-grayDark py-12">
      <div className="container mx-auto px-6">
        <Card className="bg-tertiary dark:bg-grayDark rounded-xl shadow-2xl overflow-hidden">
          <CardContent className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {/* Image Carousel Section */}
              <div className="h-[28rem] relative">
                <Image
                  src={images[currentImageIndex] || mainImage || '/placeholder-image.jpg'} 
                  alt={propiedad.direccion}
                  fill
                  className="object-cover rounded-lg shadow-lg border-4 border-secondary dark:border-secondaryDark"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                {images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-primary dark:bg-primaryDark text-tertiary dark:text-tertiary p-2 rounded-full opacity-75 hover:opacity-100 transition-opacity"
                      aria-label="Previous image"
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-primary dark:bg-primaryDark text-tertiary dark:text-tertiary p-2 rounded-full opacity-75 hover:opacity-100 transition-opacity"
                      aria-label="Next image"
                    >
                      <ChevronRight className="w-6 h-6" />
                    </button>
                    {/* Image Indicators */}
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
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
              {/* Details Section */}
              <div className="flex flex-col justify-between">
                <div>
                  <h1 className="text-4xl font-bold text-primary dark:text-tertiary mb-4 border-b-4 border-secondary dark:border-secondaryDark pb-3">
                    {propiedad.titulo}
                  </h1>
                  <p className="text-lg text-gray-600 dark:text-gray-300 mb-3 flex items-center">
                    <MapPin className="w-5 h-5 text-gray-600 dark:text-secondaryDark mr-2" />
                    {propiedad.direccion}, {propiedad.ciudad}, {propiedad.pais}
                  </p>
                  <p className="text-3xl font-bold text-gray-600 dark:text-secondaryDark mb-4">
                    ${propiedad.precio.toLocaleString()} {propiedad.moneda || 'USD'}
                  </p>
                  <div className="flex flex-wrap gap-4 text-primary dark:text-tertiary mb-6">
                    <span className="flex items-center">
                      <Ruler className="w-5 h-5 text-gray-600 dark:text-secondaryDark mr-2" />
                      {propiedad.metros_cuadrados ?? '-'} m²
                    </span>
                    <span className="flex items-center">
                      <Bed className="w-5 h-5 text-gray-600 dark:text-secondaryDark mr-2" />
                      {propiedad.habitaciones ?? '-'} hab
                    </span>
                    <span className="flex items-center">
                      <Bath className="w-5 h-5 text-gray-600 dark:text-secondaryDark mr-2" />
                      {propiedad.baños ?? '-'} baños
                    </span>
                  </div>
                  {/* Characteristics */}
                  {propiedad.caracteristicas && propiedad.caracteristicas.length > 0 && (
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold text-primary dark:text-tertiary mb-2">Características</h3>
                      <div className="flex flex-wrap gap-4">
                        {propiedad.caracteristicas.map((char, index) => (
                          <div key={index} className="flex items-center space-x-2">
                            {characteristicIcons[char]}
                            <span className="text-primary dark:text-tertiary capitalize">{char}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                    {propiedad.descripcion && (
                             <p className="text-primary dark:text-tertiary mb-6 leading-relaxed">
                               {renderDescription(propiedad.descripcion)}                  
                            </p>
                      )}
                </div>
                <Button
                  onClick={() => setShowVisitForm(!showVisitForm)}
                  className="bg-secondary dark:bg-secondaryDark text-primary dark:text-primaryDark px-8 py-3 rounded-lg hover:bg-opacity-90 transition-colors font-semibold border-2 border-primary dark:border-tertiary hover:border-secondary dark:hover:border-secondaryDark shadow-md"
                >
                  {showVisitForm ? 'Cerrar' : 'Solicitar Visita'}
                </Button>
                {showVisitForm && (
                  <VisitForm
                    propiedadId={propiedad.id}
                    agenteId={1}
                    onSuccess={() => setShowVisitForm(false)}
                  />
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}