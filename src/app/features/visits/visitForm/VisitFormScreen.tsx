// features/visits/VisitForm.tsx
import { useForm, SubmitHandler } from 'react-hook-form';
import { useState } from 'react';
import { createVisit } from '../services/useVisits';

interface VisitFormData {
  fecha_visita: string;
  comentarios?: string;
}

interface VisitFormProps {
  propiedadId: number;
  agenteId?: number | null;
  onSuccess?: () => void;
}

export default function VisitForm({ propiedadId, agenteId, onSuccess }: VisitFormProps) {
  const { register, handleSubmit, reset } = useForm<VisitFormData>();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit: SubmitHandler<VisitFormData> = async (data) => {
    setIsLoading(true);
    try {
      await createVisit({
        propiedad: propiedadId,
        agente: agenteId || null,
        fecha_visita: data.fecha_visita,
        estado: 'programada',
        comentarios: data.comentarios,
      });
      alert('Visita solicitada con éxito');
      reset();
      if (onSuccess) onSuccess();
    } catch (error) {
      alert('Error al solicitar la visita');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-4 p-4 bg-gray dark:bg-grayDark rounded-lg shadow-md">
      <div className="space-y-4">
        <div>
          <label className="block text-primary dark:text-primaryDark mb-2 font-medium">
            Fecha y Hora
          </label>
          <input
            {...register('fecha_visita', { required: true })}
            type="datetime-local"
            disabled={isLoading}
            className="border border-gray dark:border-grayDark p-2 rounded-md text-primary dark:text-primaryDark bg-tertiary dark:bg-tertiaryDark w-full focus:outline-none focus:ring-2 focus:ring-secondary transition-all disabled:opacity-50"
          />
        </div>
        <div>
          <label className="block text-primary dark:text-primaryDark mb-2 font-medium">
            Comentarios (Opcional)
          </label>
          <textarea
            {...register('comentarios')}
            placeholder="¿Algún detalle adicional?"
            disabled={isLoading}
            className="border border-gray dark:border-grayDark p-2 rounded-md text-primary dark:text-primaryDark bg-tertiary dark:bg-tertiaryDark w-full h-24 focus:outline-none focus:ring-2 focus:ring-secondary transition-all disabled:opacity-50"
          />
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-secondary dark:bg-secondaryDark text-primary dark:text-primaryDark px-4 py-2 rounded-md hover:bg-opacity-90 transition-colors font-semibold disabled:bg-opacity-50 flex items-center justify-center"
        >
          {isLoading ? (
            <svg
              className="animate-spin h-5 w-5 mr-2 text-primary dark:text-primaryDark"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8h8a8 8 0 11-16 0z" />
            </svg>
          ) : null}
          {isLoading ? 'Enviando...' : 'Enviar Solicitud'}
        </button>
      </div>
    </form>
  );
}