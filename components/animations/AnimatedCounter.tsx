'use client'

import { motion, useInView, useMotionValue, useSpring } from 'framer-motion'
import { useEffect, useRef } from 'react'

interface AnimatedCounterProps {
    value: number
    duration?: number
    suffix?: string
    className?: string
}

export function AnimatedCounter({ value, duration = 2, suffix = '', className = '' }: AnimatedCounterProps) {
    const ref = useRef(null)
    const motionValue = useMotionValue(0)
    const springValue = useSpring(motionValue, { duration: duration * 1000 })
    const isInView = useInView(ref, { once: true, margin: '-100px' })

    useEffect(() => {
        if (isInView) {
            motionValue.set(value)
        }
    }, [isInView, value, motionValue])

    useEffect(() => {
        const unsubscribe = springValue.on('change', (latest) => {
            if (ref.current) {
                const displayValue = Math.floor(latest)
                ref.current.textContent = displayValue + suffix
            }
        })
        return unsubscribe
    }, [springValue, suffix])

    return <span ref={ref} className={className}>0{suffix}</span>
}
