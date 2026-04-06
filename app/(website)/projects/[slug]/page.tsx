import { CaseStudyClient } from './CaseStudyClient'
import { notFound } from 'next/navigation'
import { getProjectBySlug, getNextProject, FALLBACK_PROJECTS } from '@/data/projects'

import { Metadata } from 'next'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params
    const project = getProjectBySlug(slug)

    if (!project) return { title: 'Project Not Found' }

    const ogUrl = new URL(`${process.env.NEXT_PUBLIC_SERVER_URL || 'https://zhovon.com'}/api/og`)
    ogUrl.searchParams.set('title', project.title)
    ogUrl.searchParams.set('category', project.category || 'Portfolio')

    return {
        title: `${project.title} — Zhovon`,
        description: project.description,
        openGraph: {
            title: `${project.title} — Zhovon`,
            description: project.description,
            images: [{ url: ogUrl.toString(), width: 1200, height: 630 }]
        },
        twitter: {
            card: 'summary_large_image',
            title: `${project.title} — Zhovon`,
            description: project.description,
            images: [ogUrl.toString()]
        }
    }
}

// Generate static params for all projects
export function generateStaticParams() {
    return FALLBACK_PROJECTS.map((project) => ({
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

    return <CaseStudyClient project={project} nextProject={nextProject || undefined} />
}
