'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

interface ParallaxImageProps {
    src: string
    alt: string
    speed?: number
    className?: string
}

export function ParallaxImage({ src, alt, speed = 0.5, className = '' }: ParallaxImageProps) {
    const ref = useRef(null)
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['start end', 'end start']
    })

    const y = useTransform(scrollYProgress, [0, 1], [-100 * speed, 100 * speed])
    const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.2, 1, 1.2])

    return (
        <div ref={ref} className={`overflow-hidden ${className}`}>
            <motion.img
                src={src}
                alt={alt}
                style={{ y, scale }}
                className="w-full h-full object-cover"
            />
        </div>
    )
}
