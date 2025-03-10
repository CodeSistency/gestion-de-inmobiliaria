import type { CollectionConfig } from 'payload'

export const Agentes: CollectionConfig = {
  slug: 'agentes',
  fields: [
    { name: 'nombre', type: 'text', required: true },
    { name: 'apellido', type: 'text', required: true },
    { name: 'email', type: 'email', unique: true, required: true },
    { name: 'telefono', type: 'text' },
    { name: 'comision', type: 'number' },
    { name: 'referral_code', type: 'text', unique: true, required: true },
    { name: 'fecha_contratacion', type: 'date', defaultValue: () => new Date() },
  ],
}
