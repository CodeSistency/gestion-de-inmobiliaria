// features/visits/useVisits.ts
import { useQueryWithFetchHook } from '@/lib/utils/hooks/useQueryWithFetch';
import { Visita } from '@/payload-types';
import axios from 'axios';

interface VisitData {
  propiedad: number;
  cliente?: number | null;
  agente?: number | null;
  fecha_visita: string;
  estado: 'programada' | 'realizada' | 'cancelada';
  comentarios?: string;
}

type VisitWhereClause = {
  agente?: { equals: number };
  cliente?: { equals: number };
};

// Crear una visita
export async function createVisit(visitData: VisitData): Promise<Visita> {
  try {
    const response = await axios.post('/api/payload/visitas', visitData);
    return response.data;
  } catch (error) {
    throw new Error('Error al crear la visita');
  }
}

// Actualizar una visita
export async function updateVisit(id: number, updates: Partial<VisitData>): Promise<Visita> {
  try {
    const response = await axios.patch(`/api/payload/visitas/${id}`, updates);
    return response.data;
  } catch (error) {
    throw new Error('Error al actualizar la visita');
  }
}

// Obtener visitas con filtros opcionales
export function useVisits({ where = {} }: { where?: VisitWhereClause } = {}) {
  const queryParams = { where };

  const { data, isLoading, isError, error } = useQueryWithFetchHook<{
    docs: Visita[];
    totalDocs: number;
  }>({
    key: 'visitas',
    url: '/api/payload/visitas',
    queryParams,
    effect: [JSON.stringify(queryParams)],
  });

  return {
    visits: data?.docs ?? [],
    isLoading,
    isError,
    error: error?.message || null,
  };
}