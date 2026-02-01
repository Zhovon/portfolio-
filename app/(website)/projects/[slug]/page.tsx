import { CaseStudyClient } from './CaseStudyClient'
import { notFound } from 'next/navigation'
import { getProjectBySlug, getNextProject, projects } from '@/data/projects'

// Generate static params for all projects
export function generateStaticParams() {
    return projects.map((project) => ({
        slug: project.slug,
    }))
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const project = getProjectBySlug(slug)
    const nextProject = getNextProject(slug)

    if (!project) {
        return notFound()
    }

    return <CaseStudyClient project={project} nextProject={nextProject} />
}
