import type { Metadata } from 'next'
import { RashedClient } from './RashedClient'

export const metadata: Metadata = {
    title: 'Md Rashed Khan | Business Consultant — ZHOVON',
    description:
        'Meet Md Rashed Khan — Strategic Business Consultant specializing in growth strategy, brand development, and operational excellence across the MENA region.',
    openGraph: {
        title: 'Md Rashed Khan | Business Consultant',
        description: 'Strategic Growth & Brand Excellence — ZHOVON Consulting',
        type: 'profile',
        url: 'https://zhovon.com/team/rashed',
    },
}

export default function RashedPage() {
    return <RashedClient />
}
