// collections/Visitas.ts
import type { CollectionConfig } from 'payload';

export const Visitas: CollectionConfig = {
  slug: 'visitas',
  admin: {
    useAsTitle: 'fecha_visita', // Mostrar la fecha como título en el admin
  },
  fields: [
    {
      name: 'propiedad',
      type: 'relationship',
      relationTo: 'propiedades',
      required: true,
    },
    {
      name: 'cliente',
      type: 'relationship',
      relationTo: 'clientes',
      hasMany: false,
    },
    {
      name: 'agente',
      type: 'relationship',
      relationTo: 'agentes',
      hasMany: false,
    },
    {
      name: 'fecha_visita',
      type: 'date',
      required: true,
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },
    {
      name: 'estado',
      type: 'select',
      options: ['programada', 'realizada', 'cancelada'],
      defaultValue: 'programada',
      required: true,
    },
    {
      name: 'comentarios',
      type: 'textarea',
    },
  ],
  access: {
    // Lectura: Usuarios autenticados ven sus visitas (basado en agente o cliente)
    // read: ({ req: { user } }) => {
    //   if (!user) return false; // No autenticados no ven nada
    //   return {
    //     or: [
    //       { agente: { equals: user.id } }, // Agente asignado
    //       { cliente: { equals: user.id } }, // Cliente asignado
    //     ],
    //   };
    // },
    // Creación: Cualquiera autenticado puede crear (o ajusta según necesidad)
    create: ({ req: { user } }) => !!user, // Solo autenticados
    // Actualización: Solo el agente asignado puede actualizar
    update: ({ req: { user }, data }) => {
      if (!user) return false;
      return { agente: { equals: user.id } }; // Solo el agente asignado
    },
    // Eliminación: Temporalmente permitida solo a través del backend/admin UI
    delete: () => false, // Nadie puede eliminar desde la API por ahora
  },
};