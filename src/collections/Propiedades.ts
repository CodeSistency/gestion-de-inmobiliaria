import type { CollectionConfig } from 'payload'

export const Propiedades: CollectionConfig = {
  slug: 'propiedades',
  fields: [
    { name: 'direccion', type: 'text', required: true },
    { name: 'ciudad', type: 'text', required: true },
    { name: 'pais', type: 'text', required: true },
    { 
      name: 'tipo', 
      type: 'select', 
      options: ['venta', 'alquiler'], 
      required: true 
    },
    { name: 'precio', type: 'number', required: true },
    { name: 'moneda', type: 'text', defaultValue: 'USD' },
    { name: 'metros_cuadrados', type: 'number' },
    { name: 'habitaciones', type: 'number' },
    { name: 'baños', type: 'number' },
    { name: 'descripcion', type: 'textarea' },
    { 
      name: 'estado', 
      type: 'select', 
      options: ['disponible', 'reservada', 'vendida', 'alquilada'], 
      required: true 
    },
    { name: 'fecha_publicacion', type: 'date', defaultValue: () => new Date() },
    { name: 'fecha_actualizacion', type: 'date', defaultValue: () => new Date() },
    { 
      name: 'propietario', 
      type: 'relationship', 
      relationTo: 'clientes', 
      hasMany: false 
    },
  ],
}
