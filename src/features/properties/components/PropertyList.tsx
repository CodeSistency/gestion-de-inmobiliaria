import { useState } from 'react';
import PropertyCard from './PropertyCard';
import PropertyFilters from './PropertyFilters';
import { useProperties } from '../services/useProperties';
import { Card, CardContent } from "@/components/ui/card";

export default function PropertiesList() {
  const [filters, setFilters] = useState<Record<string, any>>({});
  const { properties, isLoading, isError, error } = useProperties({ where: filters });

  const handleFilterChange = (newFilters: Record<string, any>) => {
    setFilters(newFilters);
  };

  return (
    <div className="min-h-screen bg-gray dark:bg-grayDark">
      <div className="container mx-auto p-6">
        <h1 className="text-4xl font-bold text-primary dark:text-tertiary mb-8 text-center">
          Propiedades Disponibles
        </h1>
        <PropertyFilters onFilterChange={handleFilterChange} />
        {isLoading ? (
          <Card className="bg-tertiary dark:bg-tertiaryDark shadow-md">
            <CardContent className="flex items-center justify-center py-6">
              <p className="text-center text-primary dark:text-secondaryDark animate-pulse">
                Cargando propiedades...
              </p>
            </CardContent>
          </Card>
        ) : isError ? (
          <Card className="bg-tertiary dark:bg-tertiaryDark shadow-md">
            <CardContent className="flex items-center justify-center py-6">
              <p className="text-center text-red-500">{error || 'Error al cargar las propiedades'}</p>
            </CardContent>
          </Card>
        ) : properties.length === 0 ? (
          <Card className="bg-tertiary dark:bg-tertiaryDark shadow-md">
            <CardContent className="flex items-center justify-center py-6">
              <p className="text-center text-primary dark:text-tertiary">
                No hay propiedades disponibles
              </p>
            </CardContent>
          </Card>
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