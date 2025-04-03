// storage-adapter-import-placeholder
import { postgresAdapter } from '@payloadcms/db-postgres'
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
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
      connectionString: process.env.DATABASE_URI || 'postgresql://class_room_db_owner:QyL3IcNuDhr4@ep-orange-poetry-a5z1ifzg-pooler.us-east-2.aws.neon.tech/inmobiliaria?sslmode=require',
    },
  }),
  sharp,
  plugins: [
    // payloadCloudPlugin(),
    vercelBlobStorage({
      enabled: true, // Optional, defaults to true
      // Specify which collections should use Vercel Blob
      collections: {
        media: true,
      },
      // Token provided by Vercel once Blob storage is added to your Vercel project
      token: process.env.BLOB_READ_WRITE_TOKEN || "vercel_blob_rw_HsLr9els0YznaGlu_ycFb5BLtm9J8AFgmcdtFyFLWi4UdaN",
    }),
    // storage-adapter-placeholder
  ],
})
