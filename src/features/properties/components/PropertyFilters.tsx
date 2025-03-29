import { useForm, SubmitHandler } from 'react-hook-form';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface FilterForm {
  ciudad?: string;
  tipo?: 'venta' | 'alquiler' | '';
  precioMax?: number;
}

type FilterValue = {
  equals?: string;
  less_than_equal?: number;
};

type PropertyFilters = {
  ciudad?: FilterValue;
  tipo?: FilterValue;
  precio?: FilterValue;
};

interface PropertyFiltersProps {
  onFilterChange: (filters: PropertyFilters) => void;
}

export default function PropertyFilters({ onFilterChange }: PropertyFiltersProps) {
  const { register, handleSubmit } = useForm<FilterForm>();

  const onSubmit: SubmitHandler<FilterForm> = (data) => {
    const filters: PropertyFilters = {};
    if (data.ciudad) filters.ciudad = { equals: data.ciudad };
    if (data.tipo) filters.tipo = { equals: data.tipo };
    if (data.precioMax) filters.precio = { less_than_equal: data.precioMax };
    onFilterChange(filters);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-tertiary dark:bg-tertiaryDark p-6 rounded-lg shadow-md mb-8"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Input
          {...register('ciudad')}
          placeholder="Ciudad"
          className="text-primary dark:text-tertiary bg-gray dark:bg-grayDark focus:ring-secondary dark:focus:ring-secondaryDark border-secondary dark:border-secondaryDark"
        />
        <select
          {...register('tipo')}
          className="border border-secondary dark:border-secondaryDark p-2 rounded-md text-primary dark:text-tertiary bg-gray dark:bg-grayDark focus:outline-none focus:ring-2 focus:ring-secondary dark:focus:ring-secondaryDark transition-all"
        >
          <option value="">Tipo</option>
          <option value="venta">Venta</option>
          <option value="alquiler">Alquiler</option>
        </select>
        <Input
          {...register('precioMax')}
          type="number"
          placeholder="Precio Máximo"
          className="text-primary dark:text-tertiary bg-gray dark:bg-grayDark focus:ring-secondary dark:focus:ring-secondaryDark border-secondary dark:border-secondaryDark"
        />
      </div>
      <Button
        type="submit"
        className="mt-6 w-full bg-secondary dark:bg-secondaryDark text-primary dark:text-primaryDark hover:bg-opacity-90 transition-colors border-2 border-primary dark:border-tertiary"
      >
        Filtrar
      </Button>
    </form>
  );
}