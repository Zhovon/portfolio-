import type { Metadata } from 'next'
import { CardClient } from './CardClient'

export const metadata: Metadata = {
    title: 'Md Rashed Khan | Business Consultant — Digital Card',
    description:
        'Connect with Md Rashed Khan — Strategic Business Consultant specializing in growth strategy, brand development, and operational excellence. Based in Saudi Arabia.',
    openGraph: {
        title: 'Md Rashed Khan | Business Consultant',
        description: 'Strategic Business Consultant — Growth Strategy • Brand Development • Operations',
        type: 'profile',
        url: 'https://zhovon.com/card/rashed',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Md Rashed Khan | Business Consultant',
        description: 'Strategic Business Consultant — Growth Strategy • Brand Development • Operations',
    },
}

export default function RashedCardPage() {
    return <CardClient />
}
