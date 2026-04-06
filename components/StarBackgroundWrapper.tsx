'use client'

import dynamic from 'next/dynamic'

// Dynamically import Three.js stars with SSR completely disabled 
// to drastically improve the Largest Contentful Paint metric of the site.
const StarsCanvas = dynamic(() => import('@/components/StarBackground'), { ssr: false })

export function StarBackgroundWrapper() {
    return <StarsCanvas />
}
