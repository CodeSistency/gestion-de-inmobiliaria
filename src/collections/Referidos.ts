import { getPayload, type CollectionConfig } from 'payload'
import config from '@/payload.config'


export const Referidos: CollectionConfig = {
  slug: 'referidos',
  fields: [
    { name: 'agente', type: 'relationship', relationTo: 'agentes', required: true },
    { name: 'cliente', type: 'relationship', relationTo: 'clientes', required: true },
    { name: 'referral_code', type: 'text', required: true },
    { name: 'fecha_referido', type: 'date', defaultValue: () => new Date() },
    { name: 'origen', type: 'text' }, // Ejemplo: "email", "whatsapp", "web"
  ],
  hooks: {
    beforeValidate: [
      async ({ data }) => {
        // Check if data is defined
        if (!data || !data.referral_code) {
          throw new Error('Datos incompletos o código de referido faltante');
        }

        const payloadConfig = await config;
        const payload = await getPayload({ config: payloadConfig });

        // Verificar que el referral_code pertenece a un agente válido
        const agente = await payload.find({
          collection: 'agentes',
          where: { referral_code: { equals: data.referral_code } },
        });

        // Check if any agent was found
        if (!agente.docs || agente.docs.length === 0) {
          throw new Error('Código de referido inválido');
        }

        // Assign the agent ID from the first matching document
        data.agente = agente.docs[0].id;

        return data;
      },
    ],
  },
}
