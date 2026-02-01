import { CaseStudyClient } from './CaseStudyClient'
import { notFound } from 'next/navigation'
import { getProjectBySlug, projects } from '@/data/projects'

// Generate static params for all projects
export function generateStaticParams() {
    return projects.map((project) => ({
        slug: project.slug,
    }))
}

export default function CaseStudyPage({ params }: { params: { slug: string } }) {
    const { slug } = params
    const project = getProjectBySlug(slug)

    if (!project) {
        return notFound()
    }

    return <CaseStudyClient project={project} />
}
