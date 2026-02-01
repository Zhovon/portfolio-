'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { ReactNode } from 'react'

interface ScrollRevealProps {
    children: ReactNode
    delay?: number
    direction?: 'up' | 'down' | 'left' | 'right'
    className?: string
}

export function ScrollReveal({
    children,
    delay = 0,
    direction = 'up',
    className = ''
}: ScrollRevealProps) {
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
    })

    const directions = {
        up: { y: 50, x: 0 },
        down: { y: -50, x: 0 },
        left: { x: 50, y: 0 },
        right: { x: -50, y: 0 },
    }

    return (
        <motion.div
            ref={ref}
            initial={{
                opacity: 0,
                ...directions[direction]
            }}
            animate={inView ? {
                opacity: 1,
                x: 0,
                y: 0
            } : {}}
            transition={{
                duration: 0.8,
                delay,
                ease: [0.4, 0, 0.2, 1]
            }}
            className={className}
        >
            {children}
        </motion.div>
    )
}
