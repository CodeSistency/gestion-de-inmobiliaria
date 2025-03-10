import { Propiedade } from "@/payload-types";
import Link from "next/link";

interface PropertyCardProps {
    propiedad: Propiedade;
  }
  
  export default function PropertyCard({ propiedad }: PropertyCardProps) {
    return (
      <div className="bg-tertiary dark:bg-tertiaryDark rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300">
        <div className="h-48 bg-gray dark:bg-grayDark flex items-center justify-center">
          <span className="text-primary dark:text-primaryDark opacity-50">Foto</span>
        </div>
        <div className="p-4">
          <h2 className="text-xl font-semibold text-primary dark:text-primaryDark truncate">
            {propiedad.direccion}
          </h2>
          <p className="text-sm text-gray-600 dark:text-grayDark">
            {propiedad.ciudad}, {propiedad.pais}
          </p>
          <p className="text-lg font-bold text-secondary dark:text-secondaryDark mt-2">
            ${propiedad.precio.toLocaleString()} {propiedad.moneda || 'USD'}
          </p>
          <p className="text-sm text-primary dark:text-primaryDark mt-1">
            {propiedad.metros_cuadrados ?? '-'} m² | {propiedad.habitaciones ?? '-'} hab |{' '}
            {propiedad.baños ?? '-'} baños
          </p>
          <Link href={`/propiedad/${propiedad.id}`}>
            <a className="mt-4 inline-block bg-primary dark:bg-primaryDark text-tertiary dark:text-tertiaryDark px-4 py-2 rounded-md hover:bg-opacity-90 transition-colors font-medium">
              Ver Detalles
            </a>
          </Link>
        </div>
      </div>
    );
  }