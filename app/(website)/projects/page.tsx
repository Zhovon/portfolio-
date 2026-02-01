import { ProjectsClient } from './ProjectsClient'
import { projects } from '@/data/projects'

export default function ProjectsPage() {
    return <ProjectsClient projects={projects} />
}
