import { getPayload } from 'payload'
import config from '@/payload.config'
import HomeClient from './HomeClient'

// Force dynamic rendering to avoid database connection during build
export const dynamic = 'force-dynamic'

export default async function Home() {
    let projects: any[] = []

    try {
        const payload = await getPayload({ config })

        // Fetch projects from Payload
        const result = await payload.find({
            collection: 'projects',
            limit: 10,
            sort: '-createdAt',
        })
        projects = result.docs
    } catch (error) {
        console.error('Payload Connection Failed:', error)
        // projects remains an empty array, HomeClient will use fallbacks
    }

    return <HomeClient initialProjects={projects} />
}
