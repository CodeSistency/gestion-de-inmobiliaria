// features/visits/VisitItem.tsx
import { Agente, Cliente, Propiedade, Visita } from '@/payload-types';
import { useState } from 'react';
import { updateVisit } from '../services/useVisits';

interface VisitItemProps {
    visita: Visita 
    other?: {
        propiedad?: Propiedade;
        agente?: Agente;
        cliente?: Cliente;
      };
//   visita: Visita & {
//     propiedad?: Propiedade;
//     agente?: Agente;
//     cliente?: Cliente;
//   };
  onUpdate: () => void;
}

export default function VisitItem({ visita, other, onUpdate }: VisitItemProps) {
  const [isLoadingRealizada, setIsLoadingRealizada] = useState(false);
  const [isLoadingCancelada, setIsLoadingCancelada] = useState(false);

  const handleStatusChange = async (newStatus: Visita['estado'], setLoading: (value: boolean) => void) => {
    setLoading(true);
    try {
      await updateVisit(visita.id, { estado: newStatus });
      onUpdate();
    } catch (error) {
      alert('Error al actualizar el estado');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-tertiary dark:bg-tertiaryDark p-4 rounded-lg shadow-md flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <h3 className="text-lg font-semibold text-primary dark:text-primaryDark">
          {other?.propiedad?.direccion || 'Propiedad desconocida'}
        </h3>
        <p className="text-sm text-gray-600 dark:text-grayDark">
          Cliente: {other?.cliente?.nombre} {other?.cliente?.apellido || 'Sin cliente'}
        </p>
        <p className="text-sm text-gray-600 dark:text-grayDark">
          Agente: {other?.agente?.nombre} {other?.agente?.apellido || 'Sin agente'}
        </p>
        <p className="text-sm text-gray-600 dark:text-grayDark">
          Fecha: {new Date(visita.fecha_visita).toLocaleString()}
        </p>
        <p className="text-sm text-gray-600 dark:text-grayDark">
          Estado: {visita.estado}
        </p>
        {visita.comentarios && (
          <p className="text-sm text-primary dark:text-primaryDark mt-1 italic">
            &ldquo;{visita.comentarios}&rdquo;
          </p>
        )}
      </div>
      <div className="flex gap-2">
        {visita.estado !== 'realizada' && (
          <button
            onClick={() => handleStatusChange('realizada', setIsLoadingRealizada)}
            disabled={isLoadingRealizada || isLoadingCancelada}
            className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600 transition-colors disabled:bg-opacity-50 flex items-center"
          >
            {isLoadingRealizada ? (
              <svg
                className="animate-spin h-5 w-5 mr-2 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8h8a8 8 0 11-16 0z" />
              </svg>
            ) : null}
            {isLoadingRealizada ? 'Procesando...' : 'Marcar Realizada'}
          </button>
        )}
        {visita.estado !== 'cancelada' && (
          <button
            onClick={() => handleStatusChange('cancelada', setIsLoadingCancelada)}
            disabled={isLoadingRealizada || isLoadingCancelada}
            className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition-colors disabled:bg-opacity-50 flex items-center"
          >
            {isLoadingCancelada ? (
              <svg
                className="animate-spin h-5 w-5 mr-2 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8h8a8 8 0 11-16 0z" />
              </svg>
            ) : null}
            {isLoadingCancelada ? 'Procesando...' : 'Cancelar'}
          </button>
        )}
      </div>
    </div>
  );
}