import type { CollectionConfig } from 'payload'


export const Propiedades: CollectionConfig = {
  slug: 'propiedades',
  access: {
    read: () => true,
  },
  fields: [
    { name: 'titulo', type: 'text', label: 'Título para SEO', required: true },
    { name: 'direccion', type: 'text', required: true },
    { name: 'ciudad', type: 'text', required: true },
    { name: 'pais', type: 'text', required: true },
    { name: 'ubicacion', type: 'point', label: 'Ubicación (Latitud, Longitud)' },
    {
      name: 'tipo',
      type: 'select',
      options: ['venta', 'alquiler'],
      required: true,
    },
    { name: 'precio', type: 'number', required: true, min: 0 },
    { name: 'moneda', type: 'text', defaultValue: 'USD' },
    { name: 'metros_cuadrados', type: 'number', min: 1 },
    { name: 'habitaciones', type: 'number', min: 0 },
    { name: 'baños', type: 'number', min: 0 },
    {
      name: 'caracteristicas',
      type: 'select',
      hasMany: true, // Enables multiple selections
      options: [
        { label: 'Estacionamiento', value: 'estacionamiento' },
        { label: 'Piscina', value: 'piscina' },
        { label: 'Jardín', value: 'jardin' },
        { label: 'Garaje', value: 'garaje' },
      ],
    },
    { name: 'descripcion', type: 'richText', required: false },
    {
      name: 'estado',
      type: 'select',
      options: ['disponible', 'reservada', 'vendida', 'alquilada'],
      required: true,
    },
    { name: 'fecha_publicacion', type: 'date', defaultValue: () => new Date() },
    { name: 'fecha_actualizacion', type: 'date', defaultValue: () => new Date() },
    {
      name: 'propietario',
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
      name: 'imagenes',
      type: 'array',
      fields: [
        {
          name: 'imagen',
          type: 'upload',
          relationTo: 'media',
          required: false,
        },
        { name: 'descripcion_imagen', type: 'text', label: 'Descripción de la Imagen' },
      ],
    },
    { name: 'destacada', type: 'checkbox', label: 'Propiedad Destacada', defaultValue: false },
  ],
}