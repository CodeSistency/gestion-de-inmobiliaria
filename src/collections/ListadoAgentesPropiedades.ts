import { getPayload, type CollectionConfig } from 'payload'
import config from '@/payload.config'

export const ListadoAgentesPropiedades: CollectionConfig = {
  slug: 'listado-agentes-propiedades',
  fields: [
    { name: 'agente', type: 'relationship', relationTo: 'agentes', required: true },
    { name: 'propiedad', type: 'relationship', relationTo: 'propiedades', required: true },
    { name: 'fecha_envio', type: 'date', defaultValue: () => new Date() },
    { name: 'enlace_generado', type: 'text', unique: true, required: true },
  ],
  hooks: {
    beforeChange: [
      async ({ data }) => {
          const payloadConfig = await config
          const payload = await getPayload({ config: payloadConfig })
        // Generar enlace único: www.inmobiliaria.com/propiedad/[id]?ref=[referral_code]
        const agente = await payload.findByID({ collection: 'agentes', id: data.agente });
        data.enlace_generado = `www.inmobiliaria.com/propiedad/${data.propiedad}?ref=${agente.referral_code}`;
        return data;
      },
    ],
  },
}

