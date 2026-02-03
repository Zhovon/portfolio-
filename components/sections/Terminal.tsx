'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowDownRight, ChevronRight } from 'lucide-react'
import { useState, useEffect } from 'react'

export function Terminal() {
    const [mounted, setMounted] = useState(false)
    const [stats, setStats] = useState({ core: 0, missions: 0, latency: 0 })

    useEffect(() => {
        setMounted(true)
        setStats({
            core: Math.floor(Math.random() * 20) + 80,
            missions: Math.floor(Math.random() * 5) + 3,
            latency: Math.floor(Math.random() * 9) + 10
        })
    }, [])

    return (
        <footer id="terminal" className="relative py-60 px-6 overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center opacity-[0.02] pointer-events-none select-none">
                <h2 className="text-[40vw] font-black leading-none">TERMINAL</h2>
            </div>

            <div className="relative z-10 text-center">
                <div className="flex flex-wrap justify-center gap-12 mb-32 opacity-40 hover:opacity-100 transition-opacity duration-700">
                    <div className="flex flex-col items-center">
                        <div className="text-[10px] font-black tracking-[0.4em] text-emerald-500 mb-2 uppercase">ZHOVON_Flux</div>
                        <div className="text-3xl font-mono text-white flex items-center gap-2">
                            <motion.span
                                animate={{ opacity: [0.5, 1, 0.5] }}
                                transition={{ repeat: Infinity, duration: 2 }}
                                className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]"
                            />
                            {mounted ? `${stats.core}%` : '--%'}
                        </div>
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="text-[10px] font-black tracking-[0.4em] text-teal-500 mb-2 uppercase">Active_Missions</div>
                        <div className="text-3xl font-mono text-white">{mounted ? `0${stats.missions}` : '00'}</div>
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="text-[10px] font-black tracking-[0.4em] text-cyan-400 mb-2 uppercase">Latency</div>
                        <div className="text-3xl font-mono text-white">{mounted ? `${stats.latency}ms` : '--ms'}</div>
                    </div>
                </div>

                <motion.h2
                    whileInView={{ scale: [0.9, 1.05, 1], opacity: [0, 1] }}
                    className="text-7xl md:text-[10vw] font-black tracking-tighter text-white mb-12"
                >
                    ACCESS <span className="bg-gradient-to-r from-teal-500 to-emerald-500 bg-clip-text text-transparent italic">TERMINAL.</span>
                </motion.h2>

                <div className="mb-20">
                    <Link
                        href="/contact"
                        className="inline-flex items-center gap-4 px-12 py-6 bg-white text-black text-sm font-black uppercase tracking-[0.2em] rounded-full hover:scale-105 hover:bg-emerald-400 transition-all duration-300"
                    >
                        <span>Initialize Connection</span>
                        <ArrowDownRight className="w-5 h-5 -rotate-90" />
                    </Link>
                </div>

                <div className="flex flex-wrap justify-center gap-10">
                    <Link href="https://github.com/Zhovon" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-2">
                        <span className="text-xs font-black tracking-[0.5em] text-gray-500 group-hover:text-white transition-colors">GITHUB</span>
                        <ChevronRight className="w-4 h-4 text-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                    <Link href="https://www.linkedin.com/in/shahadat-hossain-b314601b2/" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-2">
                        <span className="text-xs font-black tracking-[0.5em] text-gray-500 group-hover:text-white transition-colors">LINKEDIN</span>
                        <ChevronRight className="w-4 h-4 text-purple-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                    <Link href="https://www.facebook.com/shahadathossai.shovon" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-2">
                        <span className="text-xs font-black tracking-[0.5em] text-gray-500 group-hover:text-white transition-colors">FACEBOOK</span>
                        <ChevronRight className="w-4 h-4 text-purple-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                    <Link href="mailto:admin@zhovon.com" className="group flex items-center gap-2">
                        <span className="text-xs font-black tracking-[0.5em] text-gray-500 group-hover:text-white transition-colors">EMAIL</span>
                        <ChevronRight className="w-4 h-4 text-purple-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                </div>
            </div>
        </footer>
    )
}
