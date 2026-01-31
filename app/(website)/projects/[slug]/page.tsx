import { getPayload } from 'payload'
import config from '@/payload.config'
import { CaseStudyClient } from './CaseStudyClient'
import { notFound } from 'next/navigation'

// Force dynamic rendering to avoid database connection during build
export const dynamic = 'force-dynamic'

export default async function CaseStudyPage({ params }: { params: { slug: string } }) {
    const { slug } = params

    try {
        const payload = await getPayload({ config })

        // Fetch specifically the project by slug
        const projects = await payload.find({
            collection: 'projects',
            where: {
                slug: {
                    equals: slug
                }
            }
        })

        if (!projects.docs || projects.docs.length === 0) {
            return notFound()
        }

        return <CaseStudyClient project={projects.docs[0]} />
    } catch (error) {
        console.error('Failed to fetch project:', error)
        return notFound()
    }
}
