import type { CollectionConfig } from 'payload'

export const Clientes: CollectionConfig = {
  slug: 'clientes',
  fields: [
    { name: 'nombre', type: 'text', required: true },
    { name: 'apellido', type: 'text', required: true },
    { name: 'email', type: 'email', unique: true, required: true },
    { name: 'telefono', type: 'text' },
    { 
      name: 'tipo', 
      type: 'select', 
      options: ['propietario', 'comprador', 'arrendatario'], 
      required: true 
    },
    { name: 'preferencias', type: 'json' },
    { name: 'fecha_registro', type: 'date', defaultValue: () => new Date() },
  ],
}
