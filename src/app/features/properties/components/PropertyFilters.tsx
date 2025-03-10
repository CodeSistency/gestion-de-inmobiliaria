import { useForm, SubmitHandler } from 'react-hook-form';

interface FilterForm {
  ciudad?: string;
  tipo?: 'venta' | 'alquiler' | '';
  precioMax?: number;
}

interface PropertyFiltersProps {
  onFilterChange: (filters: Record<string, any>) => void;
}

export default function PropertyFilters({ onFilterChange }: PropertyFiltersProps) {
  const { register, handleSubmit } = useForm<FilterForm>();

  const onSubmit: SubmitHandler<FilterForm> = (data) => {
    const filters: Record<string, any> = {};
    if (data.ciudad) filters.ciudad = { equals: data.ciudad };
    if (data.tipo) filters.tipo = { equals: data.tipo };
    if (data.precioMax) filters.precio = { less_than_equal: data.precioMax };
    onFilterChange(filters);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-tertiary dark:bg-tertiaryDark p-4 rounded-lg shadow-md mb-6"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <input
          {...register('ciudad')}
          placeholder="Ciudad"
          className="border border-gray dark:border-grayDark p-2 rounded-md text-primary dark:text-primaryDark bg-gray dark:bg-grayDark focus:outline-none focus:ring-2 focus:ring-secondary transition-all"
        />
        <select
          {...register('tipo')}
          className="border border-gray dark:border-grayDark p-2 rounded-md text-primary dark:text-primaryDark bg-gray dark:bg-grayDark focus:outline-none focus:ring-2 focus:ring-secondary transition-all"
        >
          <option value="">Tipo</option>
          <option value="venta">Venta</option>
          <option value="alquiler">Alquiler</option>
        </select>
        <input
          {...register('precioMax')}
          type="number"
          placeholder="Precio Máximo"
          className="border border-gray dark:border-grayDark p-2 rounded-md text-primary dark:text-primaryDark bg-gray dark:bg-grayDark focus:outline-none focus:ring-2 focus:ring-secondary transition-all"
        />
      </div>
      <button
        type="submit"
        className="mt-4 w-full bg-secondary dark:bg-secondaryDark text-primary dark:text-primaryDark py-2 rounded-md hover:bg-opacity-90 transition-colors font-semibold"
      >
        Filtrar
      </button>
    </form>
  );
}