import { PortfolioClient } from './PortfolioClient'
import { getAllProjects } from '@/data/projects'
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Portfolio | ZHOVON',
    description: 'Explore my latest projects, experiments, and open-source contributions.',
}

export default function PortfolioPage() {
    const projects = getAllProjects()
    
    return <PortfolioClient projects={projects} />
}
