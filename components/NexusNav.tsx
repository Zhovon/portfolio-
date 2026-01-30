'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Rocket, Zap, Layers, Cpu, Command, Terminal } from 'lucide-react'

const NAV_ITEMS = [
    { id: 'hero', label: 'Launch', icon: Rocket },
    { id: 'warp', label: 'Velocity', icon: Zap },
    { id: 'dive', label: 'Discovery', icon: Command },
    { id: 'works', label: 'Artifacts', icon: Layers },
    { id: 'meta', label: 'Competence', icon: Cpu },
    { id: 'core', label: 'Engine', icon: Zap },
    { id: 'terminal', label: 'Terminal', icon: Terminal },
]

export function NexusNav() {
    const [activeSegment, setActiveSegment] = useState('hero')
    const [isHovered, setIsHovered] = useState<string | null>(null)

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSegment(entry.target.id)
                    }
                })
            },
            { threshold: 0.5 }
        )

        NAV_ITEMS.forEach((item) => {
            const el = document.getElementById(item.id)
            if (el) observer.observe(el)
        })

        return () => observer.disconnect()
    }, [])

    const scrollTo = (id: string) => {
        const el = document.getElementById(id)
        if (el) {
            el.scrollIntoView({ behavior: 'smooth' })
        }
    }

    return (
        <div className="fixed right-8 top-1/2 -translate-y-1/2 z-[100] hidden lg:flex flex-col gap-4">
            {NAV_ITEMS.map((item) => {
                const Icon = item.icon
                const isActive = activeSegment === item.id

                return (
                    <div
                        key={item.id}
                        className="relative flex items-center justify-end group"
                        onMouseEnter={() => setIsHovered(item.id)}
                        onMouseLeave={() => setIsHovered(null)}
                    >
                        <AnimatePresence>
                            {isHovered === item.id && (
                                <motion.div
                                    initial={{ opacity: 0, x: 20, scale: 0.8 }}
                                    animate={{ opacity: 1, x: 0, scale: 1 }}
                                    exit={{ opacity: 0, x: 20, scale: 0.8 }}
                                    className="absolute right-14 px-4 py-2 rounded-full glass-panel border-white/10 text-[10px] font-black uppercase tracking-[0.3em] text-white whitespace-nowrap pointer-events-none"
                                >
                                    {item.label}
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <button
                            onClick={() => scrollTo(item.id)}
                            className={`relative w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 border ${isActive
                                ? 'bg-white border-white scale-110 shadow-[0_0_20px_rgba(255,255,255,0.3)]'
                                : 'bg-black/20 backdrop-blur-md border-white/10 hover:border-white/40'
                                }`}
                        >
                            <Icon className={`w-4 h-4 transition-colors duration-500 ${isActive ? 'text-black' : 'text-gray-500 group-hover:text-white'
                                }`} />

                            {isActive && (
                                <motion.div
                                    layoutId="active-glow"
                                    className="absolute -inset-2 rounded-full bg-purple-500/20 blur-md -z-10"
                                />
                            )}
                        </button>
                    </div>
                )
            })}
        </div>
    )
}
