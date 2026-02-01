import HomeClient from './HomeClient'
import { getFeaturedProjects } from '@/data/projects'

export default function Home() {
    // Get featured projects from hardcoded data
    const projects = getFeaturedProjects()

    return <HomeClient initialProjects={projects} />
}
