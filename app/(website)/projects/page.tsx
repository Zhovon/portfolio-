import { getPayload } from 'payload'
import config from '@/payload.config'
import { ProjectsClient } from './ProjectsClient'

export default async function ProjectsPage() {
    const payload = await getPayload({ config })

    // Fetch all projects from Payload
    const projects = await payload.find({
        collection: 'projects',
        limit: 100,
        sort: '-createdAt',
    })

    return <ProjectsClient projects={projects.docs} />
}
