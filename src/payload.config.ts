// storage-adapter-import-placeholder
import { postgresAdapter } from '@payloadcms/db-postgres'
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Agentes } from './collections/Agentes'
import { Clientes } from './collections/Clientes'
import { ListadoAgentesPropiedades } from './collections/ListadoAgentesPropiedades'
import { Propiedades } from './collections/Propiedades'
import { Transacciones } from './collections/Transacciones'
import { Referidos } from './collections/Referidos'
import { Visitas } from './collections/Visitas'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media, Agentes, Clientes, ListadoAgentesPropiedades,Propiedades, Transacciones, Referidos, Visitas],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || 'postgres://admin:admin@127.0.0.1:5433/test2',
    },
  }),
  sharp,
  plugins: [
    payloadCloudPlugin(),
    // storage-adapter-placeholder
  ],
})
