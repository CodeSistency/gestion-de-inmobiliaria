// features/properties/PropertiesList.tsx
import { useState } from 'react';
import PropertyCard from './PropertyCard';
import PropertyFilters from './PropertyFilters';
import { useProperties } from '../services/useProperties';

export default function PropertiesList() {
  const [filters, setFilters] = useState<Record<string, any>>({});
  const { properties, isLoading, isError, error } = useProperties({ where: filters });

  const handleFilterChange = (newFilters: Record<string, any>) => {
    setFilters(newFilters);
  };

  return (
    <div className="min-h-screen bg-gray dark:bg-grayDark">
      <div className="container mx-auto p-6">
        <h1 className="text-4xl font-bold text-primary dark:text-primaryDark mb-8 text-center">
          Propiedades Disponibles
        </h1>
        <PropertyFilters onFilterChange={handleFilterChange} />
        {isLoading ? (
          <p className="text-center text-primary dark:text-primaryDark animate-pulse">
            Cargando propiedades...
          </p>
        ) : isError ? (
          <p className="text-center text-red-500">{error || 'Error al cargar las propiedades'}</p>
        ) : properties.length === 0 ? (
          <p className="text-center text-primary dark:text-primaryDark">
            No hay propiedades disponibles
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map((prop) => (
              <PropertyCard key={prop.id} propiedad={prop} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}