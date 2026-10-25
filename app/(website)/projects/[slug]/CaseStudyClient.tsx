'use client'

import { motion, useScroll, useTransform, useSpring, type MotionValue } from 'framer-motion'
import { useLenis } from 'lenis/react'
import { ArrowLeft, Github, Globe, Zap, Target, Layers, ArrowRight, ExternalLink } from 'lucide-react'
import Link from 'next/link'
import { useRef, useEffect } from 'react'
import type { Project } from '@/data/projects'
import { MagneticButton } from '@/components/animations/MagneticButton'

interface SectionProps {
    children: React.ReactNode
    index: number
    progress: MotionValue<number>
    range: [number, number]
    stayVisible?: boolean
}

function Section({ children, progress, range, stayVisible = false }: SectionProps) {
    const opacity = useTransform(
        progress,
        [range[0], range[0] + 0.08, range[1] - 0.08, range[1]],
        [0, 1, 1, stayVisible ? 1 : 0]
    )
    const scale = useTransform(
        progress,
        [range[0], range[0] + 0.08, range[1] - 0.08, range[1]],
        [0.85, 1, 1, 1.15]
    )
    const zIndex = useTransform(progress, (v) => (v >= range[0] && v <= range[1] ? 20 : 0))
    const filter = useTransform(
        progress,
        [range[0], range[0] + 0.08, range[1] - 0.08, range[1]],
        ['blur(8px)', 'blur(0px)', 'blur(0px)', 'blur(8px)']
    )
    const pointerEvents = useTransform(progress, (v) => (v >= range[0] && v <= range[1] ? 'auto' : 'none'))

    return (
        <motion.div
            style={{ opacity, scale, zIndex, filter, pointerEvents }}
            className="fixed inset-0 flex items-center justify-center p-4 sm:p-6 lg:p-10 pointer-events-none"
        >
            <div className="w-full max-w-6xl max-h-[88vh] overflow-y-auto scrollbar-hide pointer-events-auto py-6">
                {children}
            </div>
        </motion.div>
    )
}

function NavDot({ i, sectionHeight, smoothProgress }: { i: number; sectionHeight: number; smoothProgress: MotionValue<number> }) {
    const backgroundColor = useTransform(
        smoothProgress,
        [i * sectionHeight / 100, (i * sectionHeight / 100) + 0.05],
        ['rgba(255,255,255,0.2)', '#10B981']
    )

    return (
        <motion.div
            className="w-2 h-2 rounded-full bg-white/20 transition-colors"
            style={{ backgroundColor }}
        />
    )
}

export function CaseStudyClient({ project, nextProject }: { project: Project; nextProject?: Project }) {
    const containerRef = useRef<HTMLDivElement>(null)
    const lenis = useLenis()

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end end'],
    })

    // Scroll to top on mount
    useEffect(() => {
        if (lenis) {
            lenis.scrollTo(0, { immediate: true })
        }
        window.scrollTo(0, 0)
    }, [lenis])

    const smoothProgress = useSpring(scrollYProgress, { damping: 25, stiffness: 120 })
    const ambientScale = useTransform(smoothProgress, [0, 1], [1, 2.5])
    const ambientOpacity = useTransform(smoothProgress, [0, 0.8, 1], [0.25, 0.45, 0.1])

    if (!project) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center text-white">
                <div className="text-center">
                    <h2 className="text-2xl font-bold mb-4">Project artifact not found</h2>
                    <Link href="/projects" className="text-emerald-400 underline">Back to Archive</Link>
                </div>
            </div>
        )
    }

    const totalSections = 6
    const sectionHeight = 100 / totalSections

    return (
        <div ref={containerRef} className="relative bg-[#020202]" style={{ height: `${totalSections * 110}vh` }}>
            {/* Ambient Background */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    style={{
                        scale: ambientScale,
                        opacity: ambientOpacity,
                    }}
                    className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,255,150,0.06)_1px,transparent_1px)] bg-[length:36px_36px]"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-950/20 via-black to-cyan-950/20" />
            </div>

            {/* Navigation HUD */}
            <nav className="fixed top-0 left-0 right-0 p-4 sm:p-6 flex justify-between items-center z-50 mix-blend-difference pointer-events-auto">
                <Link href="/projects" className="group flex items-center gap-2">
                    <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 text-white group-hover:-translate-x-1 transition-transform" />
                    <span className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-white">Back to Archive</span>
                </Link>
                <div className="flex gap-2">
                    {[...Array(totalSections)].map((_, i) => (
                        <NavDot
                            key={i}
                            i={i}
                            sectionHeight={sectionHeight}
                            smoothProgress={smoothProgress}
                        />
                    ))}
                </div>
            </nav>

            {/* Section 1: Hero */}
            <Section index={0} progress={smoothProgress} range={[0, 0.18]}>
                <div className="text-center px-4">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.1 }}
                        className="inline-block mb-4 sm:mb-6 px-4 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 backdrop-blur-sm"
                    >
                        <span className="text-emerald-400 text-[10px] sm:text-xs font-black uppercase tracking-[0.3em]">{project.category || 'Architecture'}</span>
                    </motion.div>
                    <h1 className="text-3xl xs:text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white mb-6 sm:mb-8 tracking-tighter leading-none uppercase break-words">
                        {project.title}
                    </h1>
                    <p className="text-sm sm:text-lg md:text-xl text-gray-300 max-w-3xl mx-auto font-light leading-relaxed mb-8">
                        {project.description}
                    </p>
                    <div className="inline-flex items-center gap-2 text-[10px] sm:text-xs font-mono text-gray-500 uppercase tracking-widest animate-bounce">
                        <span>Scroll To Explore Case Study</span>
                        <span>↓</span>
                    </div>
                </div>
            </Section>

            {/* Section 2: Image Window */}
            <Section index={1} progress={smoothProgress} range={[0.16, 0.36]}>
                <div className="relative aspect-video max-h-[62vh] w-full rounded-2xl sm:rounded-3xl overflow-hidden border border-white/10 shadow-2xl shadow-emerald-950/30">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10" />
                    {project.image ? (
                        <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                    ) : (
                        <div className="w-full h-full bg-gradient-to-br from-gray-900 to-black flex items-center justify-center">
                            <Layers className="w-16 h-16 text-white/10" />
                        </div>
                    )}

                    <div className="absolute bottom-4 sm:bottom-8 left-4 sm:left-8 z-20 flex flex-wrap gap-3 sm:gap-4">
                        {project.liveUrl && (
                            <MagneticButton href={project.liveUrl}>
                                <div className="px-5 sm:px-6 py-2.5 sm:py-3 bg-white text-black text-[10px] sm:text-xs font-black uppercase tracking-widest rounded-full hover:scale-105 transition-transform flex items-center gap-2 shadow-lg">
                                    <Globe className="w-3.5 h-3.5" />
                                    Launch Production
                                </div>
                            </MagneticButton>
                        )}
                        {project.githubUrl && (
                            <MagneticButton href={project.githubUrl}>
                                <div className="px-5 sm:px-6 py-2.5 sm:py-3 bg-black/60 backdrop-blur-md border border-white/20 text-white text-[10px] sm:text-xs font-black uppercase tracking-widest rounded-full hover:bg-white/10 transition-colors flex items-center gap-2">
                                    <Github className="w-3.5 h-3.5" />
                                    Inspect Codebase
                                </div>
                            </MagneticButton>
                        )}
                    </div>
                </div>
            </Section>

            {/* Section 3: Metrics Grid */}
            <Section index={2} progress={smoothProgress} range={[0.34, 0.54]}>
                <div className="text-center mb-8">
                    <h2 className="text-xs font-black uppercase tracking-[0.4em] text-emerald-400 mb-2">Quantified Benchmarks</h2>
                    <p className="text-xs text-gray-400 uppercase tracking-widest font-mono">Production Telemetry & Impact</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
                    {project.metrics && project.metrics.length > 0 ? (
                        project.metrics.map((metric, i) => (
                            <div key={i} className="glass-panel p-6 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl border border-white/10 text-center flex flex-col items-center justify-center min-h-[160px] sm:min-h-[200px] hover:border-emerald-500/30 transition-colors">
                                <span className="text-4xl sm:text-6xl md:text-7xl font-black text-white mb-2 bg-gradient-to-b from-white to-gray-400 bg-clip-text text-transparent">{metric.value}</span>
                                <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-emerald-400">{metric.label}</span>
                            </div>
                        ))
                    ) : (
                        <div className="col-span-full glass-panel p-8 rounded-2xl text-center text-gray-400">
                            High-performance engineering benchmarks validated in production.
                        </div>
                    )}
                </div>
            </Section>

            {/* Section 4: Problem Statement & Engineering Challenges */}
            <Section index={3} progress={smoothProgress} range={[0.52, 0.72]}>
                <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-start">
                    <div>
                        <h2 className="text-xs font-black uppercase tracking-[0.5em] text-emerald-400 mb-3">Architecture Brief</h2>
                        <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-4 leading-tight">Problem & Scope</h3>
                        <p className="text-sm sm:text-base text-gray-300 leading-relaxed font-light">
                            {project.longDescription || project.description}
                        </p>
                    </div>
                    <div className="space-y-3 sm:space-y-4">
                        <h4 className="text-xs font-black uppercase tracking-[0.4em] text-cyan-400 mb-2">Technical Vectors Overcome</h4>
                        {project.challenges && project.challenges.length > 0 ? (
                            project.challenges.map((c, i) => (
                                <div key={i} className="p-4 sm:p-5 rounded-xl border border-white/5 bg-white/5 hover:border-cyan-500/30 hover:bg-white/10 transition-colors">
                                    <div className="flex gap-3 sm:gap-4 items-start">
                                        <span className="text-cyan-400 font-mono text-xs sm:text-sm font-bold flex-shrink-0">VECTOR 0{i + 1}</span>
                                        <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">{c}</p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="p-6 rounded-xl border border-white/5 bg-white/5 text-gray-400 text-sm">
                                Architected to resolve distributed state latency, strict SEO requirements, and responsive layout constraints.
                            </div>
                        )}
                    </div>
                </div>
            </Section>

            {/* Section 5: Tech Stack & Outcomes */}
            <Section index={4} progress={smoothProgress} range={[0.70, 0.88]}>
                <div className="text-center max-w-4xl mx-auto">
                    <h2 className="text-xs font-black uppercase tracking-[0.5em] text-cyan-400 mb-4 sm:mb-6">System Architecture Stack</h2>
                    <div className="flex flex-wrap justify-center gap-2.5 sm:gap-3.5 mb-8 sm:mb-10">
                        {project.technologies.map((tech, i) => (
                            <div key={i} className="px-4 py-2 sm:px-5 sm:py-2.5 rounded-full border border-cyan-500/20 bg-cyan-950/20 text-cyan-300 text-xs font-bold uppercase tracking-wider backdrop-blur-sm">
                                {tech}
                            </div>
                        ))}
                    </div>
                    {project.results && project.results.length > 0 && (
                        <div className="grid sm:grid-cols-2 gap-4 text-left">
                            {project.results.map((res, i) => (
                                <div key={i} className="p-5 sm:p-6 glass-panel rounded-2xl border border-emerald-500/20 bg-emerald-950/10">
                                    <div className="flex items-center gap-2.5 mb-2 text-emerald-400">
                                        <Target className="w-4 h-4 flex-shrink-0" />
                                        <span className="text-[10px] sm:text-xs uppercase tracking-widest font-bold">Production Outcome 0{i + 1}</span>
                                    </div>
                                    <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">{res}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </Section>

            {/* Section 6: Mission Complete & Next */}
            <Section index={5} progress={smoothProgress} range={[0.86, 1.0]} stayVisible>
                <div className="text-center relative">
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 rounded-full blur-[90px] -z-10"
                    />
                    <h2 className="text-4xl xs:text-5xl sm:text-7xl md:text-9xl font-black text-white leading-none tracking-tighter opacity-80 uppercase mb-8">
                        MISSION<br />COMPLETE
                    </h2>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-6">
                        {nextProject ? (
                            <Link
                                href={`/projects/${nextProject.slug}`}
                                className="glass-panel inline-flex items-center gap-4 px-6 sm:px-8 py-4 rounded-full border border-emerald-500/40 bg-emerald-500/10 hover:bg-emerald-500/20 transition-all group"
                            >
                                <span className="text-gray-400 uppercase text-[10px] sm:text-xs font-bold tracking-widest group-hover:text-emerald-300 transition-colors">Next Project:</span>
                                <span className="text-base sm:text-lg font-black text-white">{nextProject.title}</span>
                                <ArrowRight className="w-4 h-4 text-emerald-400 group-hover:translate-x-1.5 transition-transform" />
                            </Link>
                        ) : (
                            <Link
                                href="/projects"
                                className="glass-panel inline-flex items-center gap-3 px-6 py-3.5 rounded-full border border-white/20 text-white font-bold text-xs uppercase tracking-widest hover:bg-white/10 transition-colors"
                            >
                                Return to Archive
                            </Link>
                        )}
                        <Link
                            href="/contact"
                            className="glass-panel inline-flex items-center gap-3 px-6 py-3.5 rounded-full border border-white/20 text-white font-bold text-[10px] sm:text-xs uppercase tracking-widest hover:bg-white/10 transition-colors"
                        >
                            Initiate Project
                        </Link>
                    </div>
                </div>
            </Section>
        </div>
    )
}
