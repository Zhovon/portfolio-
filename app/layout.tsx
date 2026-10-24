import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import './globals.css'
import { StarBackgroundWrapper } from '@/components/StarBackgroundWrapper'
import { SmoothScroll } from '@/components/SmoothScroll'
import { NexusNav } from '@/components/NexusNav'
import { CalComFloatingButton } from '@/components/CalComFloatingButton'

const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin'],
})

const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin'],
})

export const metadata: Metadata = {
    metadataBase: new URL('https://zhovon.com'),
    title: 'ZHOVON | Lead SaaS Architect & Full-Stack Engineer',
    description:
        'Shahadat Hossain (Zhovon) - Senior SaaS architect specializing in Next.js, React, TypeScript, and Payload CMS. Building high-performance digital experiences with 99+ Lighthouse scores.',
    icons: {
        icon: [
            { url: '/icon.svg', type: 'image/svg+xml' },
            { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
            { url: '/icon-512.png', sizes: '512x512', type: 'image/png' },
        ],
        apple: [{ url: '/apple-touch-icon.png', sizes: '180x180' }],
        shortcut: '/icon.svg',
    },
    openGraph: {
        type: 'website',
        url: 'https://zhovon.com',
        title: 'ZHOVON | Lead SaaS Architect & Full-Stack Engineer',
        description:
            'Shahadat Hossain (Zhovon) - Senior SaaS architect specializing in Next.js, React, TypeScript, and Payload CMS.',
        siteName: 'Zhovon',
        images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Zhovon — Lead SaaS Architect' }],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'ZHOVON | Lead SaaS Architect & Full-Stack Engineer',
        description: 'Senior SaaS architect — Next.js, React, TypeScript, Payload CMS.',
        images: ['/og-image.jpg'],
    },
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: 'Shahadat Hossain',
        alternateName: 'Zhovon',
        url: 'https://zhovon.com',
        email: 'admin@zhovon.com',
        jobTitle: 'Lead SaaS Architect',
        address: {
            '@type': 'PostalAddress',
            streetAddress: '71, Sayed Nagar, Dakshin Khan',
            addressLocality: 'Dhaka',
            postalCode: '1230',
            addressCountry: 'BD',
        },
        sameAs: [
            'https://github.com/Zhovon',
            'https://www.linkedin.com/in/shahadat-hossain-b314601b2/',
            'https://www.facebook.com/shahadathossai.shovon',
        ],
        knowsAbout: ['React', 'Next.js', 'TypeScript', 'SaaS Architecture', 'Full-Stack Development', 'Payload CMS', 'Node.js', 'Three.js'],
    }

    return (
        <html lang="en" className="dark" suppressHydrationWarning>
            <head>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                />
            </head>
            <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black`}>
                <SmoothScroll>
                    <StarBackgroundWrapper />
                    <NexusNav />
                    <div className="relative z-10 w-full min-h-screen">{children}</div>
                </SmoothScroll>
                <Analytics />
                <SpeedInsights />
                <CalComFloatingButton />
            </body>
        </html>
    )
}
