// collections/Users.ts
import type { CollectionConfig } from 'payload';

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
  },
  auth: true,
  fields: [
    {
      name: 'role',
      type: 'select',
      options: ['admin', 'agente', 'cliente'],
      required: true,
      defaultValue: 'cliente', // Por defecto, nuevos usuarios son clientes
    },
  ],
};