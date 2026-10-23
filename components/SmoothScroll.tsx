'use client'

import { ReactLenis } from 'lenis/react'
import { ReactNode, useEffect, useState } from 'react'

export function SmoothScroll({ children }: { children: ReactNode }) {
    const [isTouchDevice, setIsTouchDevice] = useState(false)

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0
            setIsTouchDevice(hasTouch)
        }
    }, [])

    // On touch/mobile devices, use native 120Hz smooth scrolling for optimal responsiveness
    if (isTouchDevice) {
        return <>{children}</>
    }

    return (
        <ReactLenis
            root
            options={{
                lerp: 0.1,
                duration: 0.8,
                smoothWheel: true,
                wheelMultiplier: 1,
            }}
        >
            {children}
        </ReactLenis>
    )
}
