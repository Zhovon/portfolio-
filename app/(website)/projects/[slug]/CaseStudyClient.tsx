'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowLeft, Zap, Cpu, Globe, Target, Box, Github } from 'lucide-react'
import Link from 'next/link'
import { useRef } from 'react'

export function CaseStudyClient({ project }: { project: any }) {
    const containerRef = useRef(null)

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    })

    const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 1.1])
    const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.3])

    if (!project) return <div>Project not found.</div>

    return (
        <main ref={containerRef} className="min-h-screen bg-[#020202]">
            {/* Back Button HUD */}
            <nav className="fixed top-10 left-10 z-[100]">
                <Link href="/projects" className="glass-panel p-4 rounded-full flex items-center gap-3 group text-white">
                    <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                    <span className="hidden md:block text-[10px] font-black uppercase tracking-widest pr-2">Return to Archive</span>
                </Link>
            </nav>

            {/* Hero Section: Cinematic Launch */}
            <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden">
                <motion.div style={{ scale: heroScale, opacity: heroOpacity }} className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black z-10" />
                    {project.thumbnail?.url ? (
                        <img
                            src={project.thumbnail.url}
                            alt={project.title}
                            className="w-full h-full object-cover grayscale opacity-30"
                        />
                    ) : (
                        <div className="w-full h-full bg-gradient-to-br from-purple-900/20 to-blue-900/20 opacity-30" />
                    )}
                </motion.div>

                <div className="relative z-10 text-center px-4">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="mb-6 inline-block glass-panel px-6 py-2 rounded-full border-purple-500/20 text-purple-400 text-[10px] font-black uppercase tracking-[0.4em]"
                    >
                        MISSION: {project.title.toUpperCase()}
                    </motion.div>
                    <h1 className="text-[12vw] font-black leading-none text-white tracking-tighter italic mb-10">
                        {project.title.split(' ')[0]}_<span className="text-gray-800">{project.title.split(' ')[1] || 'STUDY'}</span>
                    </h1>

                    <div className="flex justify-center gap-6">
                        {project.liveUrl && (
                            <Link href={project.liveUrl} target="_blank" className="glass-panel px-8 py-4 rounded-full flex items-center gap-3 text-white hover:bg-white/5 transition-all">
                                <Globe className="w-4 h-4 text-blue-400" />
                                <span className="text-xs font-bold uppercase tracking-widest">Live System</span>
                            </Link>
                        )}
                        <button className="glass-panel px-8 py-4 rounded-full flex items-center gap-3 text-white hover:bg-white/5 transition-all">
                            <Github className="w-4 h-4 text-purple-400" />
                            <span className="text-xs font-bold uppercase tracking-widest">Repository</span>
                        </button>
                    </div>
                </div>
            </section>

            {/* The Intelligence Section: Problem/Solution */}
            <section className="relative py-40 px-6 lg:px-20 grid md:grid-cols-2 gap-20 max-w-7xl mx-auto border-b border-white/5">
                <div>
                    <h2 className="text-xs font-black uppercase tracking-[0.5em] text-purple-500 mb-10">01 — The Objective</h2>
                    <p className="text-4xl md:text-5xl font-black text-white italic tracking-tighter leading-tight mb-8 uppercase">
                        {project.description.split(' ').slice(0, 3).join(' ')} <br />
                        <span className="text-gray-700">{project.description.split(' ').slice(3, 6).join(' ')}</span>
                    </p>
                    <p className="text-gray-500 text-xl font-medium leading-relaxed">
                        {project.description}
                    </p>
                </div>
                <div className="flex flex-col justify-end">
                    <div className="glass-panel p-10 rounded-[2.5rem] border-white/5">
                        <Target className="w-10 h-10 text-blue-500 mb-6" />
                        <h3 className="text-2xl font-black text-white mb-4 italic">Core Milestone</h3>
                        <p className="text-gray-500 font-medium">Archived optimal performance metrics and seamless integration within the {project.techStack?.[0]?.name || 'target'} ecosystem.</p>
                    </div>
                </div>
            </section>

            {/* The Tech Matrix: Bento Grid */}
            <section className="relative py-40 px-6 lg:px-20 max-w-7xl mx-auto">
                <h2 className="text-xs font-black uppercase tracking-[0.5em] text-purple-500 mb-20 text-center">02 — The Matrix</h2>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    {project.techStack?.map((tech: any, i: number) => (
                        <div key={i} className={`glass-panel p-10 rounded-[2rem] border-white/5 ${i === 0 ? 'md:col-span-2 bg-purple-500/5' : ''}`}>
                            {i % 3 === 0 ? <Zap className="w-8 h-8 text-purple-500 mb-6" /> :
                                i % 3 === 1 ? <Cpu className="w-8 h-8 text-blue-400 mb-6" /> :
                                    <Box className="w-8 h-8 text-cyan-400 mb-6" />}
                            <h4 className="text-xl font-black text-white italic mb-2 uppercase">{tech.name}</h4>
                            <p className="text-gray-500 text-sm font-medium">Industrial-grade protocol for high-scale digital operations.</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Results / Next Project */}
            <footer className="py-60 px-6 text-center border-t border-white/5">
                <h2 className="text-xs font-black uppercase tracking-[0.5em] text-gray-700 mb-10">Mission Summary</h2>
                <div className="text-6xl md:text-8xl font-black text-white italic tracking-tighter mb-20 uppercase underline decoration-purple-500 decoration-8 underline-offset-[20px]">
                    MISSION_COMPLETE.
                </div>
                <Link href="/projects" className="text-purple-400 font-bold hover:text-white transition-colors tracking-widest uppercase text-xs">
                    View another archive →
                </Link>
            </footer>
        </main>
    )
}
