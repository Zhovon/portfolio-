'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useLenis } from 'lenis/react'
import { ArrowLeft, ArrowRight, CheckCircle2, Layers, Target, TrendingUp } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { MagneticButton } from '@/components/animations/MagneticButton'
import { Project } from '@/data/projects'

const reveal = {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.3 },
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
}

export function CaseStudyClient({ project, nextProject }: { project: Project, nextProject?: Project }) {
    const containerRef = useRef<HTMLDivElement>(null)
    const heroRef = useRef<HTMLDivElement>(null)
    const lenis = useLenis()
    const router = useRouter()

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end end'],
    })
    const { scrollYProgress: heroProgress } = useScroll({
        target: heroRef,
        offset: ['start start', 'end start'],
    })
    const heroOpacity = useTransform(heroProgress, [0, 0.8], [1, 0])
    const heroScale = useTransform(heroProgress, [0, 1], [1, 0.92])
    const heroY = useTransform(heroProgress, [0, 1], [0, -80])

    const [warpTimer, setWarpTimer] = useState(0)
    const [isNavigating, setIsNavigating] = useState(false)
    const [canWarp, setCanWarp] = useState(false)

    // Scroll to top on mount, then release the warp lock after 2s so a
    // fast-scrolled arrival can't instantly chain to the next project
    useEffect(() => {
        if (lenis) {
            lenis.scrollTo(0, { immediate: true })
        }
        window.scrollTo(0, 0)

        const timer = setTimeout(() => setCanWarp(true), 2000)
        return () => clearTimeout(timer)
    }, [lenis])

    useEffect(() => {
        let interval: NodeJS.Timeout | undefined

        const unsubscribe = scrollYProgress.on('change', (latest) => {
            if (latest > 0.99 && !isNavigating && nextProject && canWarp) {
                if (interval) return

                let progress = 0
                interval = setInterval(() => {
                    progress += 10
                    setWarpTimer(progress)

                    if (progress >= 100) {
                        clearInterval(interval)
                        setIsNavigating(true)
                        router.push(`/projects/${nextProject.slug}`)
                    }
                }, 150)
            } else {
                if (interval) {
                    clearInterval(interval)
                    interval = undefined
                }
                setWarpTimer(0)
            }
        })

        return () => {
            unsubscribe()
            if (interval) clearInterval(interval)
        }
    }, [scrollYProgress, nextProject, router, isNavigating, canWarp])

    if (!project) return <div>Project not found.</div>

    return (
        <div ref={containerRef} className="relative bg-[#020202]">
            {/* Ambient background */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,255,150,0.04)_1px,transparent_1px)] bg-[length:40px_40px]" />
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/10 via-black to-cyan-900/10" />
            </div>

            {/* Navigation HUD */}
            <nav className="fixed top-0 left-0 right-0 z-50">
                <motion.div style={{ scaleX: scrollYProgress }} className="h-[2px] bg-emerald-500 origin-left" />
                <div className="p-6 flex justify-between items-center mix-blend-difference">
                    <Link href="/projects" className="group flex items-center gap-2">
                        <ArrowLeft className="w-5 h-5 text-white group-hover:-translate-x-1 transition-transform" />
                        <span className="text-xs font-black uppercase tracking-widest text-white">Back to Base</span>
                    </Link>
                    <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-white/60 hidden md:block">
                        {project.category}
                    </span>
                </div>
            </nav>

            {/* Hero */}
            <div ref={heroRef} className="relative h-screen flex items-center justify-center px-6">
                <motion.div style={{ opacity: heroOpacity, scale: heroScale, y: heroY }} className="text-center max-w-6xl">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2 }}
                        className="inline-block mb-6 px-4 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/10"
                    >
                        <span className="text-emerald-400 text-[10px] font-black uppercase tracking-[0.3em]">{project.category}</span>
                    </motion.div>
                    <h1 className="text-5xl md:text-8xl font-black text-white mb-8 tracking-tighter leading-none">
                        {project.title}
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto font-light leading-relaxed">
                        {project.description}
                    </p>
                </motion.div>

                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
                    <span className="text-[9px] font-black uppercase tracking-[0.4em] text-white/40">Scroll</span>
                    <motion.div
                        animate={{ y: [0, 8, 0] }}
                        transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
                        className="w-[1px] h-10 bg-gradient-to-b from-emerald-500 to-transparent"
                    />
                </div>
            </div>

            {/* Body */}
            <div className="relative z-10 max-w-6xl mx-auto px-6 pb-40 space-y-32 md:space-y-40">

                {/* Visual */}
                <motion.section {...reveal}>
                    <p className="text-[10px] font-black uppercase tracking-[0.5em] text-emerald-500 mb-6">01 — Visual</p>
                    <div className="relative aspect-video w-full rounded-3xl overflow-hidden border border-white/10 shadow-2xl shadow-emerald-900/20">
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10" />
                        {project.image ? (
                            <Image src={project.image} alt={project.title} fill sizes="(max-width: 1152px) 100vw, 1152px" className="object-cover" />
                        ) : (
                            <div className="w-full h-full bg-gradient-to-br from-gray-900 to-black flex items-center justify-center">
                                <Layers className="w-20 h-20 text-white/10" />
                            </div>
                        )}

                        <div className="absolute bottom-8 left-8 z-20 flex gap-4">
                            {project.liveUrl && (
                                <MagneticButton href={project.liveUrl}>
                                    <div className="px-6 py-3 bg-white text-black text-xs font-black uppercase tracking-widest rounded-full hover:scale-105 transition-transform">
                                        Launch Site
                                    </div>
                                </MagneticButton>
                            )}
                            {project.githubUrl && (
                                <MagneticButton href={project.githubUrl}>
                                    <div className="px-6 py-3 bg-black/50 backdrop-blur-md border border-white/20 text-white text-xs font-black uppercase tracking-widest rounded-full hover:bg-white/10 transition-colors">
                                        Source Code
                                    </div>
                                </MagneticButton>
                            )}
                        </div>
                    </div>
                </motion.section>

                {/* Metrics */}
                {project.metrics && project.metrics.length > 0 && (
                    <motion.section {...reveal}>
                        <p className="text-[10px] font-black uppercase tracking-[0.5em] text-emerald-500 mb-6">02 — Impact</p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {project.metrics.map((metric) => (
                                <div key={metric.label} className="glass-panel p-10 rounded-[2rem] border border-white/10 text-center flex flex-col items-center justify-center">
                                    <span className="text-5xl md:text-6xl font-black mb-4 bg-gradient-to-b from-white to-gray-500 bg-clip-text text-transparent">{metric.value}</span>
                                    <span className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-500">{metric.label}</span>
                                </div>
                            ))}
                        </div>
                    </motion.section>
                )}

                {/* Challenge */}
                <motion.section {...reveal}>
                    <div className="grid md:grid-cols-2 gap-12 items-start">
                        <div>
                            <p className="text-[10px] font-black uppercase tracking-[0.5em] text-red-500 mb-6">03 — Identify Vector</p>
                            <h3 className="text-4xl md:text-5xl font-black text-white mb-6">The Challenge</h3>
                            <p className="text-lg md:text-xl text-gray-400 leading-relaxed">{project.longDescription}</p>
                        </div>
                        <div className="space-y-4 md:pt-16">
                            {project.challenges?.map((c, i) => (
                                <div key={c} className="p-6 rounded-xl border border-white/5 bg-white/5 hover:bg-white/10 transition-colors">
                                    <div className="flex gap-4">
                                        <span className="text-red-500 font-mono">0{i + 1}</span>
                                        <p className="text-gray-300">{c}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.section>

                {/* Tech stack */}
                <motion.section {...reveal} className="text-center">
                    <p className="text-[10px] font-black uppercase tracking-[0.5em] text-cyan-500 mb-10">04 — System Architecture</p>
                    <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
                        {project.technologies.map((tech) => (
                            <div key={tech} className="px-8 py-4 rounded-full border border-cyan-500/20 bg-cyan-900/5 text-cyan-200 text-sm font-bold uppercase tracking-wider backdrop-blur-sm">
                                {tech}
                            </div>
                        ))}
                    </div>
                </motion.section>

                {/* Results */}
                {project.results && project.results.length > 0 && (
                    <motion.section {...reveal}>
                        <p className="text-[10px] font-black uppercase tracking-[0.5em] text-emerald-500 mb-6 flex items-center gap-3">
                            <TrendingUp className="w-4 h-4" /> 05 — Outcomes
                        </p>
                        <div className="grid md:grid-cols-2 gap-4">
                            {project.results.map((result) => (
                                <div key={result} className="flex items-start gap-4 p-6 rounded-xl border border-emerald-500/10 bg-emerald-500/5">
                                    <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                                    <p className="text-gray-300">{result}</p>
                                </div>
                            ))}
                        </div>
                        <div className="mt-12 p-8 glass-panel rounded-3xl border border-white/10 text-center">
                            <Target className="w-10 h-10 text-white mx-auto mb-4" />
                            <p className="text-gray-400 max-w-lg mx-auto">{project.results[0]}</p>
                        </div>
                    </motion.section>
                )}
            </div>

            {/* Footer: Mission complete + warp */}
            <div className="relative z-10 min-h-screen flex items-center justify-center px-6 overflow-hidden">
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 rounded-full blur-[100px]"
                />
                <div className="text-center relative">
                    <motion.h2 {...reveal} className="text-[14vw] md:text-[12vw] font-black text-white/10 leading-none tracking-tighter">
                        MISSION<br />COMPLETE
                    </motion.h2>

                    {nextProject && (
                        <motion.div {...reveal} className="mt-16">
                            {warpTimer > 0 && (
                                <div className="mb-6 flex flex-col items-center">
                                    <p className="text-emerald-500 font-mono text-sm uppercase tracking-[0.3em] mb-2 animate-pulse">
                                        INITIATING WARP...
                                    </p>
                                    <div className="w-40 h-1 bg-white/10 rounded-full overflow-hidden">
                                        <motion.div
                                            className="h-full bg-emerald-500"
                                            initial={{ width: 0 }}
                                            animate={{ width: `${warpTimer}%` }}
                                            transition={{ ease: 'linear', duration: 0.15 }}
                                        />
                                    </div>
                                </div>
                            )}

                            <Link
                                href={`/projects/${nextProject.slug}`}
                                className="glass-panel inline-flex flex-wrap items-center justify-center gap-4 md:gap-6 p-6 md:p-8 rounded-full border border-white/20 hover:border-emerald-500/50 hover:bg-emerald-500/10 transition-all cursor-alias group"
                            >
                                <span className="text-gray-400 uppercase text-xs font-bold tracking-widest group-hover:text-emerald-400 transition-colors">NEXT MISSION:</span>
                                <span className="text-xl md:text-2xl font-black text-white">{nextProject.title}</span>
                                <ArrowRight className="w-6 h-6 text-emerald-500 group-hover:translate-x-2 transition-transform" />
                            </Link>
                        </motion.div>
                    )}
                </div>
            </div>
        </div>
    )
}
