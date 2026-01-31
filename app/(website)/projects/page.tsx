import { getPayload } from 'payload'
import config from '@/payload.config'
import { ProjectsClient } from './ProjectsClient'

// Force dynamic rendering to avoid database connection during build
export const dynamic = 'force-dynamic'

export default async function ProjectsPage() {
    let projects: any[] = []

    try {
        const payload = await getPayload({ config })

        // Fetch all projects from Payload
        const result = await payload.find({
            collection: 'projects',
            limit: 100,
            sort: '-createdAt',
        })
        projects = result.docs
    } catch (error) {
        console.error('Failed to fetch projects:', error)
        // projects remains empty array, ProjectsClient will handle it
    }

    return <ProjectsClient projects={projects} />
}
