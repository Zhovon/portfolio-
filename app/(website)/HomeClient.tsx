'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { Rocket, Zap, Layers, Cpu, Command, ArrowDownRight } from 'lucide-react'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Hero } from '@/components/sections/Hero'
import { Projects } from '@/components/sections/Projects'
import { Skills } from '@/components/sections/Skills'
import { Terminal } from '@/components/sections/Terminal'
import { Project } from '@/data/projects'

export default function HomeClient({ initialProjects }: { initialProjects: Project[] }) {
    const { scrollYProgress } = useScroll()

    return (
        <main className="relative w-full">
            <nav className="fixed top-0 left-0 right-0 z-[100] p-6 lg:p-10 pointer-events-none">
                <div className="max-w-screen-2xl mx-auto flex justify-between items-center">
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pointer-events-auto">
                        <Link href="/" className="mix-blend-difference text-xl font-black tracking-tighter text-white">ZHOVON</Link>
                    </motion.div>
                    <div className="flex gap-4 pointer-events-auto">
                        <Link href="/contact" className="glass-panel px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest text-white hover:bg-white/10 transition-colors flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                            Contact Protocol
                        </Link>
                    </div>
                </div>
            </nav>

            <Hero />

            <section id="warp" className="relative h-screen flex items-center justify-center overflow-hidden bg-white/5 backdrop-blur-sm">
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="absolute inset-0 z-0"
                >
                    <div className="absolute top-0 left-1/4 w-[1px] h-full bg-gradient-to-b from-transparent via-purple-500/50 to-transparent blur-[1px]" />
                    <div className="absolute top-0 left-2/4 w-[1px] h-full bg-gradient-to-b from-transparent via-blue-500/50 to-transparent blur-[1px]" />
                    <div className="absolute top-0 left-3/4 w-[1px] h-full bg-gradient-to-b from-transparent via-cyan-500/50 to-transparent blur-[1px]" />
                </motion.div>

                <div className="relative z-10 text-center max-w-4xl px-6">
                    <motion.h2
                        initial={{ y: 100, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        transition={{ duration: 1, ease: "circOut" }}
                        className="text-5xl md:text-7xl font-black text-white mb-10 tracking-tighter"
                    >
                        MOVING AT THE VELOCITY OF <span className="text-emerald-500">INNOVATION.</span>
                    </motion.h2>
                    <p className="text-gray-400 text-xl font-medium leading-relaxed">
                        I don"t just build websites. I engineer digital engines that drive growth, speed, and interstellar user experiences. WordPress was the launchpad. Next.js is the rocket.
                    </p>
                </div>
            </section>

            <div className="relative py-24 overflow-hidden z-20">
                {/* Gradient Background - Emerald Nebula */}
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 via-teal-500 to-cyan-500 opacity-95" />
                <div className="absolute inset-0 backdrop-blur-sm bg-black/20" />

                {/* Animated Glow Effects - Cosmic Green */}
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/40 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-teal-500/40 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />

                {/* Top Marquee - Faster */}
                <motion.div
                    animate={{ x: [0, -1200] }}
                    transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                    className="flex whitespace-nowrap gap-12 mb-8 relative"
                >
                    {[...Array(12)].map((_, i) => (
                        <span key={i} className="text-6xl md:text-8xl font-black text-white uppercase tracking-tight flex items-center gap-8">
                            NEXT.JS EXPERT
                            <span className="text-emerald-200 text-5xl">◆</span>
                            PAYLOAD CMS
                            <span className="text-teal-200 text-5xl">◆</span>
                            99+ LIGHTHOUSE
                            <span className="text-cyan-200 text-5xl">◆</span>
                        </span>
                    ))}
                </motion.div>

                {/* Bottom Marquee - Slower, Opposite Direction */}
                <motion.div
                    animate={{ x: [-1200, 0] }}
                    transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                    className="flex whitespace-nowrap gap-12 relative"
                >
                    {[...Array(12)].map((_, i) => (
                        <span key={i} className="text-5xl md:text-7xl font-black text-white/90 uppercase tracking-tight flex items-center gap-8">
                            SAAS ARCHITECT
                            <span className="text-emerald-300 text-4xl">✦</span>
                            TYPESCRIPT PRO
                            <span className="text-teal-300 text-4xl">✦</span>
                            REACT 19
                            <span className="text-cyan-300 text-4xl">✦</span>
                            TAILWIND 4
                            <span className="text-emerald-200 text-4xl">✦</span>
                        </span>
                    ))}
                </motion.div>

                {/* Subtle Border Glow - Emerald */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-emerald-400/60 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-teal-400/60 to-transparent" />
            </div>

            <section className="relative h-[300vh]" id="dive">
                <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
                    <div className="relative w-full h-full flex items-center justify-center">
                        <motion.div
                            style={{
                                scale: useTransform(scrollYProgress, [0, 0.5], [1, 15]),
                                opacity: useTransform(scrollYProgress, [0, 0.4], [0.2, 0])
                            }}
                            className="absolute w-[150%] h-[150%] bg-[radial-gradient(circle_at_center,rgba(124,58,237,0.2)_0%,transparent_70%)] blur-[100px]"
                        />

                        <motion.div
                            style={{
                                scale: useTransform(scrollYProgress, [0.3, 0.7], [0.5, 2]),
                                opacity: useTransform(scrollYProgress, [0.3, 0.5, 0.7], [0, 1, 0]),
                                y: useTransform(scrollYProgress, [0.3, 0.7], [100, -100])
                            }}
                            className="text-center z-10 p-6"
                        >
                            <h3 className="text-4xl md:text-6xl font-black text-white italic tracking-tighter mb-4">
                                DISCO-VERING <br /> THE VOID
                            </h3>
                            <p className="text-gray-500 text-lg uppercase tracking-[0.4em] font-bold">Scanning for intelligent patterns...</p>
                        </motion.div>

                        {[...Array(6)].map((_, i) => (
                            <motion.div
                                key={i}
                                style={{
                                    x: (i % 2 === 0 ? 1 : -1) * (200 + i * 50),
                                    y: (i < 3 ? 1 : -1) * (150 + i * 40),
                                    scale: useTransform(scrollYProgress, [0.4 + i * 0.05, 0.9], [0, 4]),
                                    opacity: useTransform(scrollYProgress, [0.4 + i * 0.05, 0.6 + i * 0.05, 0.9], [0, 1, 0])
                                }}
                                className="absolute glass-panel p-6 rounded-2xl border-white/10 hidden md:block"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center">
                                        <Command className="w-4 h-4 text-purple-400" />
                                    </div>
                                    <span className="text-[10px] font-black tracking-widest text-gray-400 uppercase">Module_0{i}</span>
                                </div>
                            </motion.div>
                        ))}

                        <motion.div
                            style={{
                                scale: useTransform(scrollYProgress, [0.8, 1], [0.8, 1]),
                                opacity: useTransform(scrollYProgress, [0.85, 1], [0, 1])
                            }}
                            className="absolute text-5xl md:text-8xl font-black text-center text-white px-4"
                        >
                            CRAFTING <br />
                            <span className="bg-gradient-to-r from-teal-500 to-cyan-400 bg-clip-text text-transparent">REALITIES.</span>
                        </motion.div>
                    </div>
                </div>
            </section>

            <Projects projects={initialProjects} />
            <Skills />

            <section id="core" className="relative py-40 px-6 lg:px-20 bg-gradient-to-b from-black via-purple-950/10 to-black">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <motion.div
                            whileHover={{ y: -10, scale: 1.02 }}
                            className="md:col-span-2 glass-panel p-12 rounded-[2.5rem] flex flex-col justify-between h-[400px] group transition-all duration-500 hover:border-purple-500/50"
                        >
                            <Cpu className="w-12 h-12 text-emerald-500 mb-6 group-hover:rotate-12 transition-transform" />
                            <div>
                                <h3 className="text-4xl font-black text-white mb-4 italic">Next-Gen Stack</h3>
                                <p className="text-gray-500 text-lg">Next.js 15, React 19, TypeScript, Payload 3, and Tailwind 4. The bleeding edge of SaaS development.</p>
                            </div>
                        </motion.div>
                        <motion.div
                            whileHover={{ y: -10, scale: 1.02 }}
                            className="glass-panel p-12 rounded-[2.5rem] bg-emerald-600/10 border-emerald-500/20 h-[400px] flex flex-col justify-between group transition-all duration-500 hover:border-teal-500/50"
                        >
                            <Zap className="w-12 h-12 text-teal-400 mb-6 group-hover:scale-125 transition-transform" />
                            <div>
                                <h3 className="text-4xl font-black text-white mb-4 italic">Speed.</h3>
                                <p className="text-gray-500 text-lg font-medium">Core Web Vitals optimized out of the box. 100/100 performance scores aren"t a goal—they"re the baseline.</p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            <Terminal />
        </main>
    )
}

