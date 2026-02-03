import { ProjectsClient } from './ProjectsClient'
import { FALLBACK_PROJECTS as projects } from '@/data/projects'

export default function ProjectsPage() {
    return <ProjectsClient projects={projects} />
}
