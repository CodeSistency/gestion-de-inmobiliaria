import { useQueryWithFetchHook } from "@/lib/utils/hooks/useQueryWithFetch";
import { Propiedade } from "@/payload-types";

type FilterValue = {
  equals?: string;
  less_than_equal?: number;
};

type PropertyFilters = {
  ciudad?: FilterValue;
  tipo?: FilterValue;
  precio?: FilterValue;
};

interface UsePropertiesParams {
  where?: PropertyFilters;
}

export function useProperties({ where = {} }: UsePropertiesParams = {}) {
  const queryParams = {
    where: { estado: { equals: 'disponible' }, ...where },
  };

  const { data, isLoading, isError, error } = useQueryWithFetchHook<{
    docs: Propiedade[];
    totalDocs: number;
  }>({
    key: 'propiedades',
    url: '/api/propiedades',
    queryParams,
    effect: [JSON.stringify(queryParams)],
  });

  return {
    properties: data?.docs ?? [],
    isLoading,
    isError,
    error: error?.message || null,
  };
}