'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

export function Hero() {
    return (
        <section id="hero" className="relative h-[120vh] flex flex-col items-center justify-center overflow-hidden">
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                className="relative z-10 text-center"
            >
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="mb-6 text-[10px] uppercase tracking-[0.5em] text-purple-500 font-bold"
                >
                    [ SYSTEM_REBOOT_SUCCESSFUL ]
                </motion.div>
                <h1 className="text-[15vw] leading-[0.75] font-black tracking-tighter text-white mb-8">
                    <span className="block">FUTURE</span>
                    <span className="block bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-400 bg-clip-text text-transparent italic">BUILT.</span>
                </h1>
                <p className="text-gray-500 text-xl font-medium tracking-[0.2em] uppercase mb-12">SaaS Architect — Est. 2019</p>

                <div className="flex flex-wrap justify-center gap-6">
                    <Link
                        href="/contact"
                        className="px-8 py-4 bg-white text-black text-[10px] font-black uppercase tracking-[0.2em] rounded-full hover:scale-105 transition-transform flex items-center gap-4 group"
                    >
                        Initiate Project
                        <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                    <Link
                        href="/projects"
                        className="px-8 py-4 glass-panel text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-full hover:bg-white/5 transition-all"
                    >
                        View Archive
                    </Link>
                </div>
            </motion.div>
        </section>
    )
}
