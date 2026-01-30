import { buildConfig } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { fileURLToPath } from 'url'
import sharp from 'sharp'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'

import { Users } from './collections/Users'
import { Projects } from './collections/Projects'
import { Media } from './collections/Media'
import { Messages } from './collections/Messages'
import { postgresAdapter } from '@payloadcms/db-postgres'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
    admin: {
        user: Users.slug,
    },
    cors: [process.env.NEXT_PUBLIC_SERVER_URL || ''].filter(Boolean),
    csrf: [process.env.NEXT_PUBLIC_SERVER_URL || ''].filter(Boolean),
    collections: [Users, Projects, Media, Messages],
    editor: lexicalEditor(),
    secret: process.env.PAYLOAD_SECRET || 'zhovon_secure_uplink',
    onInit: async (payload) => {
        payload.logger.info('Payload Initialized')
    },
    // typescript: {
    //     outputFile: path.resolve(dirname, 'payload-types.ts'),
    // },
    db: postgresAdapter({
        pool: {
            connectionString: process.env.DATABASE_URL || '',
            ssl: {
                rejectUnauthorized: false, // Required for Supabase/Neon/etc if not using proper CA
            },
        },
    }),
    // Vercel Blob Storage disabled - causing importMap errors
    // plugins: [
    //     vercelBlobStorage({
    //         enabled: !!process.env.BLOB_READ_WRITE_TOKEN,
    //         collections: {
    //             media: true,
    //         },
    //         token: process.env.BLOB_READ_WRITE_TOKEN || '',
    //     }),
    // ],
    sharp,
})
