import type { CollectionConfig } from 'payload'

export const Transacciones: CollectionConfig = {
  slug: 'transacciones',
  fields: [
    { name: 'propiedad', type: 'relationship', relationTo: 'propiedades', required: true },
    { name: 'cliente', type: 'relationship', relationTo: 'clientes' },
    { name: 'agente', type: 'relationship', relationTo: 'agentes' },
    { name: 'tipo', type: 'select', options: ['venta', 'alquiler'], required: true },
    { name: 'monto', type: 'number', required: true },
    { name: 'fecha_transaccion', type: 'date', defaultValue: () => new Date() },
    { name: 'estado', type: 'select', options: ['pendiente', 'completada', 'cancelada'], required: true },
  ],
}
