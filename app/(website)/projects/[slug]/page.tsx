import { CaseStudyClient } from './CaseStudyClient'
import { notFound } from 'next/navigation'
import { getProjectBySlug } from '@/data/projects'

export default function CaseStudyPage({ params }: { params: { slug: string } }) {
    const { slug } = params
    const project = getProjectBySlug(slug)

    if (!project) {
        return notFound()
    }

    return <CaseStudyClient project={project} />
}
