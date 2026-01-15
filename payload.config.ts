import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

// Collections
import { Users } from './collections/Users'
import { Projects } from './collections/Projects'
import { Skills } from './collections/Skills'
import { Experience } from './collections/Experience'
import { Media } from './collections/Media'
import { Pages } from './collections/Pages'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
    admin: {
        user: Users.slug,
    },
    collections: [Users, Projects, Skills, Experience, Media, Pages],
    editor: lexicalEditor(),
    secret: process.env.PAYLOAD_SECRET || 'your-secret-key-change-this',
    typescript: {
        outputFile: path.resolve(dirname, 'payload-types.ts'),
    },
    db: postgresAdapter({
        pool: {
            connectionString: process.env.DATABASE_URL || '',
        },
    }),
    sharp,
    plugins: [],
})
