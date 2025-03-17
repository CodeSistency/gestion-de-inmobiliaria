"use client";
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Media, Propiedade } from '@/payload-types';
import { fetchClientFunc } from '@/lib/utils/fetchClient';
import VisitForm from '../../visits/visitForm/VisitFormScreen';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useModelTempStore } from '@/lib/models';
import { MapPin, Ruler, Bed, Bath, Car, Waves, Leaf, FerrisWheel, } from 'lucide-react'; // Icons for characteristics

export default function PropertyDetail() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showVisitForm, setShowVisitForm] = useState(false);

  const { data: { Propiedades } } = useModelTempStore();

  const propiedad = Propiedades?.find((propiedad) => propiedad.id === Number(id));

  useEffect(() => {
    // Simulate fetch completion since the actual fetch is commented out
    setLoading(false);
  }, [id]);

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

  const mainImage = propiedad.imagenes?.[0]?.imagen || '/placeholder-image.jpg';

  // Map characteristics to icons
  const characteristicIcons = {
    estacionamiento: <Car className="w-5 h-5 text-secondary dark:text-secondaryDark" />,
    piscina: <Waves className="w-5 h-5 text-secondary dark:text-secondaryDark" />,
    jardin: <Leaf className="w-5 h-5 text-secondary dark:text-secondaryDark" />,
    garaje: <FerrisWheel className="w-5 h-5 text-secondary dark:text-secondaryDark" />,
  };

  return (
    <div className="bg-gray dark:bg-grayDark py-12">
      <div className="container mx-auto px-6">
        <Card className="bg-tertiary dark:bg-grayDark rounded-xl shadow-2xl overflow-hidden">
          <CardContent className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {/* Image Section */}
              <div className="h-[28rem] relative">
                <img
                  src={(mainImage || '/placeholder-image.jpg').toString()}
                  alt={propiedad.direccion}
                  className="w-full h-full object-cover rounded-lg shadow-lg border-4 border-secondary dark:border-secondaryDark"
                />
              </div>
              {/* Details Section */}
              <div className="flex flex-col justify-between">
                <div>
                  <h1 className="text-4xl font-bold text-primary dark:text-tertiary mb-4 border-b-4 border-secondary dark:border-secondaryDark pb-3">
                    {propiedad.titulo}
                  </h1>
                  <p className="text-lg text-gray-600 dark:text-gray-300 mb-3 flex items-center">
                    <MapPin className="w-5 h-5 text-secondary dark:text-secondaryDark mr-2" />
                    {propiedad.direccion}, {propiedad.ciudad}, {propiedad.pais}
                  </p>
                  <p className="text-3xl font-bold text-secondary dark:text-secondaryDark mb-4">
                    ${propiedad.precio.toLocaleString()} {propiedad.moneda || 'USD'}
                  </p>
                  <div className="flex flex-wrap gap-4 text-primary dark:text-tertiary mb-6">
                    <span className="flex items-center">
                      <Ruler className="w-5 h-5 text-secondary dark:text-secondaryDark mr-2" />
                      {propiedad.metros_cuadrados ?? '-'} m²
                    </span>
                    <span className="flex items-center">
                      <Bed className="w-5 h-5 text-secondary dark:text-secondaryDark mr-2" />
                      {propiedad.habitaciones ?? '-'} hab
                    </span>
                    <span className="flex items-center">
                      <Bath className="w-5 h-5 text-secondary dark:text-secondaryDark mr-2" />
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
                  <p className="text-primary dark:text-tertiary mb-6 leading-relaxed">
                  {/* {propiedad.descripcion?.root?.children?.[0]?.text ?? 'Sin descripción'} */}
                  </p>
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