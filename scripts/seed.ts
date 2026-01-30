import { getPayload } from 'payload'
import config from '../payload.config'

async function seed() {
    const payload = await getPayload({ config })

    try {
        // Check if admin user already exists
        const existingUsers = await payload.find({
            collection: 'users',
            where: {
                email: {
                    equals: 'admin@zhovon.com',
                },
            },
        })

        if (existingUsers.docs.length > 0) {
            console.log('✅ Admin user already exists')
            process.exit(0)
        }

        // Create admin user
        const user = await payload.create({
            collection: 'users',
            data: {
                email: 'admin@zhovon.com',
                password: 'aspirine28',
            },
        })

        console.log('✅ Admin user created successfully!')
        console.log('Email:', user.email)
        console.log('You can now login at http://localhost:3000/admin/login')
    } catch (error) {
        console.error('❌ Error creating admin user:', error)
    }

    process.exit(0)
}

seed()
