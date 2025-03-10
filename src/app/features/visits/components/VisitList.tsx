// features/visits/VisitList.tsx
import { useVisits } from '../services/useVisits';
import VisitItem from './VisitItem';

interface VisitListProps {
  agenteId?: number; // Filtrar por agente
  clienteId?: number; // Filtrar por cliente
}

export default function VisitList({ agenteId, clienteId }: VisitListProps) {
  const where: Record<string, any> = {};
  if (agenteId) where.agente = { equals: agenteId };
  if (clienteId) where.cliente = { equals: clienteId };

  const { visits, isLoading, isError, error } = useVisits({ where });

  const handleUpdate = () => {
    // Recarga manual; optimizable con queryClient
    window.location.reload();
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold text-primary dark:text-primaryDark mb-6">
        Mis Visitas
      </h2>
      {isLoading ? (
        <p className="text-center text-primary dark:text-primaryDark animate-pulse">
          Cargando visitas...
        </p>
      ) : isError ? (
        <p className="text-center text-red-500">{error || 'Error al cargar las visitas'}</p>
      ) : visits.length === 0 ? (
        <p className="text-center text-primary dark:text-primaryDark">
          No hay visitas programadas
        </p>
      ) : (
        <div className="space-y-4">
          {visits.map((visita) => (
            <VisitItem key={visita.id} visita={visita} onUpdate={handleUpdate} />
          ))}
        </div>
      )}
    </div>
  );
}