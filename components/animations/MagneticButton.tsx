'use client'

import { motion } from 'framer-motion'
import { useState, useRef } from 'react'

interface MagneticButtonProps {
    children: React.ReactNode
    className?: string
    onClick?: () => void
    href?: string
}

export function MagneticButton({ children, className = '', onClick, href }: MagneticButtonProps) {
    const [position, setPosition] = useState({ x: 0, y: 0 })
    const buttonRef = useRef<HTMLDivElement>(null)

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!buttonRef.current) return

        const rect = buttonRef.current.getBoundingClientRect()
        const x = e.clientX - rect.left - rect.width / 2
        const y = e.clientY - rect.top - rect.height / 2

        setPosition({ x: x * 0.3, y: y * 0.3 })
    }

    const handleMouseLeave = () => {
        setPosition({ x: 0, y: 0 })
    }

    const content = (
        <motion.div
            ref={buttonRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            animate={{ x: position.x, y: position.y }}
            transition={{ type: 'spring', stiffness: 150, damping: 15, mass: 0.1 }}
            className={`inline-block cursor-pointer ${className}`}
            onClick={onClick}
        >
            {children}
        </motion.div>
    )

    if (href) {
        return <a href={href} className="inline-block">{content}</a>
    }

    return content
}
