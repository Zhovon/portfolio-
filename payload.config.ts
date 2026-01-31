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
        payload.logger.info('Payload CMS Initializing...')

        // Log which database URL is being used (without exposing the full connection string)
        const dbUrl = process.env.blob_PRISMA_DATABASE_URL || process.env.POSTGRES_PRISMA_URL || process.env.blob_DATABASE_URL || process.env.POSTGRES_URL || process.env.DATABASE_URL
        if (dbUrl) {
            const urlParts = dbUrl.match(/postgresql:\/\/.*@([^\/]+)/)
            const host = urlParts ? urlParts[1] : 'unknown'
            payload.logger.info(`Database host: ${host}`)
        } else {
            payload.logger.error('No database URL found! Check environment variables.')
        }

        payload.logger.info('Payload CMS Initialized Successfully')
    },
    // typescript: {
    //     outputFile: path.resolve(dirname, 'payload-types.ts'),
    // },
    db: postgresAdapter({
        pool: {
            // Vercel Postgres with blob_ prefix (from Vercel Blob Storage integration)
            // Falls back to standard POSTGRES_ variables or DATABASE_URL for local development
            connectionString:
                process.env.blob_PRISMA_DATABASE_URL ||
                process.env.POSTGRES_PRISMA_URL ||
                process.env.blob_DATABASE_URL ||
                process.env.POSTGRES_URL ||
                process.env.DATABASE_URL || '',
        },
    }),
    plugins: [
        vercelBlobStorage({
            enabled: !!process.env.BLOB_READ_WRITE_TOKEN,
            collections: {
                media: true,
            },
            token: process.env.BLOB_READ_WRITE_TOKEN || '',
        }),
    ],
    sharp,
})
