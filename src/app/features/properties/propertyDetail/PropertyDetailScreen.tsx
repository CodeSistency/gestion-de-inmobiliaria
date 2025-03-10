import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Media, Propiedade } from '@/payload-types';
import { fetchClientFunc } from '@/lib/utils/fetchClient';
import VisitFormScreen from '../../visits/visitForm/VisitFormScreen';
import VisitForm from '../../visits/visitForm/VisitFormScreen';

export default function PropertyDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [propiedad, setPropiedad] = useState<Propiedade & { fotos?: Media[] } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showVisitForm, setShowVisitForm] = useState(false);

  useEffect(() => {
    if (id) {
      const fetchProperty = async () => {
        try {
            // const data = await fetchClientFunc<Propiedade & { fotos?: Media[] }>({
            //     method: 'GET',
            //     url: `/api/payload/propiedades/${id}?depth=1`, // Depth para traer fotos
            //     cache: 'no-cache',
                
            //   },

            // );
          setPropiedad(null);
          setLoading(false);
        } catch (err) {
          setError('Error al cargar la propiedad');
          setLoading(false);
        }
      };
      fetchProperty();
    }
  }, [id]);

  if (loading) {
    return (
      <p className="text-center text-primary dark:text-primaryDark animate-pulse min-h-screen flex items-center justify-center">
        Cargando...
      </p>
    );
  }
  if (error) {
    return <p className="text-center text-red-500 min-h-screen flex items-center justify-center">{error}</p>;
  }
  if (!propiedad) return null;

  const mainImage = propiedad.fotos?.[0]?.url || '/placeholder-image.jpg';

  return (
    <div className="bg-gray dark:bg-grayDark py-6">
      <div className="container mx-auto p-6">
        <div className="bg-tertiary dark:bg-tertiaryDark rounded-lg shadow-lg p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="h-96">
              <img src={mainImage} alt={propiedad.direccion} className="w-full h-full object-cover rounded-md" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-primary dark:text-primaryDark mb-4">
                {propiedad.direccion}
              </h1>
              <p className="text-lg text-gray-600 dark:text-grayDark mb-2">
                {propiedad.ciudad}, {propiedad.pais}
              </p>
              <p className="text-2xl font-bold text-secondary dark:text-secondaryDark mb-4">
                ${propiedad.precio.toLocaleString()} {propiedad.moneda || 'USD'}
              </p>
              <div className="flex space-x-4 text-primary dark:text-primaryDark mb-4">
                <span>{propiedad.metros_cuadrados ?? '-'} m²</span>
                <span>{propiedad.habitaciones ?? '-'} hab</span>
                <span>{propiedad.baños ?? '-'} baños</span>
              </div>
              <p className="text-primary dark:text-primaryDark mb-6">{propiedad.descripcion || 'Sin descripción'}</p>
              <button
                onClick={() => setShowVisitForm(!showVisitForm)}
                className="bg-secondary dark:bg-secondaryDark text-primary dark:text-primaryDark px-6 py-3 rounded-md hover:bg-opacity-90 transition-colors font-semibold"
              >
                {showVisitForm ? 'Cerrar' : 'Solicitar Visita'}
              </button>
              {showVisitForm && (
                <VisitForm
                  propiedadId={propiedad.id}
                  agenteId={1}
                //   agenteId={typeof propiedad.agente === 'object' ? propiedad.agente?.id : propiedad.agente || null}
                  onSuccess={() => setShowVisitForm(false)}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}