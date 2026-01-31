import { getPayload } from 'payload'
import config from '../payload.config'

async function migrate() {
    console.log('Starting database migration...')

    try {
        const payload = await getPayload({ config })
        console.log('✅ Payload initialized successfully')
        console.log('✅ Database tables should now be created')
        console.log('✅ Migration complete!')

        process.exit(0)
    } catch (error) {
        console.error('❌ Migration failed:', error)
        process.exit(1)
    }
}

migrate()
