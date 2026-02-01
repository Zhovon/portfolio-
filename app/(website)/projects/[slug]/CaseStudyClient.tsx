'use client'

import { motion, useScroll, useTransform, useSpring, MotionValue, AnimatePresence } from 'framer-motion'
import { ArrowLeft, Github, Globe, Zap, Target, CheckCircle2, TrendingUp, Layers, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { useRef, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Project } from '@/data/projects'
import { MagneticButton } from '@/components/animations/MagneticButton'

function Section({ children, index, progress, range, stayVisible = false }: { children: React.ReactNode, index: number, progress: MotionValue<number>, range: [number, number], stayVisible?: boolean }) {
    const opacity = useTransform(progress, [range[0], range[0] + 0.1, range[1] - 0.1, range[1]], [0, 1, stayVisible ? 1 : 1, stayVisible ? 1 : 0])
    const scale = useTransform(progress, [range[0], range[0] + 0.1, range[1] - 0.1, range[1]], [0.5, 1, 1, 1.5])
    const zIndex = useTransform(progress, (v) => (v >= range[0] && v <= range[1] ? 10 : 0))
    const filter = useTransform(progress, [range[0], range[0] + 0.1, range[1] - 0.1, range[1]], ["blur(10px)", "blur(0px)", "blur(0px)", "blur(10px)"])

    return (
        <motion.div
            style={{ opacity, scale, zIndex, filter }}
            className="fixed inset-0 flex items-center justify-center p-6 pointer-events-none"
        >
            <div className="w-full max-w-7xl pointer-events-auto">
                {children}
            </div>
        </motion.div>
    )
}

export function CaseStudyClient({ project, nextProject }: { project: Project, nextProject?: Project }) {
    const containerRef = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    })



    const router = useRouter()
    const [warpTimer, setWarpTimer] = useState(0)
    const [isNavigating, setIsNavigating] = useState(false)
    const [canWarp, setCanWarp] = useState(false)

    // Scroll to top on mount && Cooldown
    useEffect(() => {
        // Force scroll to top immediately
        window.scrollTo(0, 0)

        // Safety lock: Disable warp for 2 seconds after page load
        const timer = setTimeout(() => {
            setCanWarp(true)
        }, 2000)

        return () => clearTimeout(timer)
    }, [])

    useEffect(() => {
        let interval: NodeJS.Timeout

        const unsubscribe = scrollYProgress.on("change", (latest) => {
            // Only trigger if:
            // 1. At bottom (>0.99)
            // 2. Not already navigating
            // 3. Next project exists
            // 4. Safety lock (canWarp) is released
            if (latest > 0.99 && !isNavigating && nextProject && canWarp) {
                // User is at bottom
                if (interval) return // Already counting

                let progress = 0
                interval = setInterval(() => {
                    progress += 10
                    setWarpTimer(progress)

                    if (progress >= 100) {
                        clearInterval(interval)
                        setIsNavigating(true)
                        router.push(`/projects/${nextProject.slug}`)
                    }
                }, 150) // 1.5s total duration
            } else {
                // User scrolled up or not at bottom
                if (interval) {
                    clearInterval(interval)
                    setWarpTimer(0)
                }
                setWarpTimer(0)
            }
        })

        return () => {
            unsubscribe()
            if (interval) clearInterval(interval)
        }
    }, [scrollYProgress, nextProject, router, isNavigating, canWarp])

    const smoothProgress = useSpring(scrollYProgress, { damping: 20, stiffness: 100 })

    if (!project) return <div>Project not found.</div>

    // Calculate total height based on number of sections
    // Hero + Metrics + Overview + Tech + Journey + Results + Footer = 7 sections (approx)
    const totalSections = 7
    const sectionHeight = 100 / totalSections

    return (
        <div ref={containerRef} className="relative bg-[#020202]" style={{ height: `${totalSections * 100}vh` }}>
            {/* Ambient Background - Constant Z-movement */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    style={{
                        scale: useTransform(smoothProgress, [0, 1], [1, 3]),
                        opacity: useTransform(smoothProgress, [0, 0.8, 1], [0.3, 0.5, 0])
                    }}
                    className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,255,150,0.05)_1px,transparent_1px)] bg-[length:40px_40px]"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/10 via-black to-cyan-900/10" />
            </div>

            {/* Navigation HUD */}
            <nav className="fixed top-0 left-0 right-0 p-6 flex justify-between items-center z-50 mix-blend-difference">
                <Link href="/projects" className="group flex items-center gap-2">
                    <ArrowLeft className="w-5 h-5 text-white group-hover:-translate-x-1 transition-transform" />
                    <span className="text-xs font-black uppercase tracking-widest text-white">Back to Base</span>
                </Link>
                <div className="flex gap-2">
                    {[...Array(totalSections)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="w-2 h-2 rounded-full bg-white/20"
                            style={{
                                backgroundColor: useTransform(
                                    smoothProgress,
                                    [i * sectionHeight / 100, (i * sectionHeight / 100) + 0.05],
                                    ["rgba(255,255,255,0.2)", "#10B981"]
                                )
                            }}
                        />
                    ))}
                </div>
            </nav>

            {/* Section 1: Hero */}
            <Section index={0} progress={smoothProgress} range={[0, 0.15]}>
                <div className="text-center">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2 }}
                        className="inline-block mb-6 px-4 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/10"
                    >
                        <span className="text-emerald-400 text-[10px] font-black uppercase tracking-[0.3em]">{project.category}</span>
                    </motion.div>
                    <h1 className="text-6xl md:text-9xl font-black text-white mb-8 tracking-tighter leading-none">
                        {project.title}
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto font-light leading-relaxed">
                        {project.description}
                    </p>
                </div>
            </Section>

            {/* Section 2: Image Window */}
            <Section index={1} progress={smoothProgress} range={[0.10, 0.3]}>
                <div className="relative aspect-video w-full rounded-3xl overflow-hidden border border-white/10 shadow-2xl shadow-emerald-900/20">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10" />
                    <img src={project.image} alt={project.title} className="w-full h-full object-cover" />

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
            </Section>

            {/* Section 3: Metrics Grid */}
            <Section index={2} progress={smoothProgress} range={[0.25, 0.45]}>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {project.metrics?.map((metric, i) => (
                        <div key={i} className="glass-panel p-12 rounded-[2rem] border border-white/10 text-center flex flex-col items-center justify-center aspect-square">
                            <span className="text-7xl font-black text-white mb-4 bg-gradient-to-b from-white to-gray-500 bg-clip-text text-transparent">{metric.value}</span>
                            <span className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-500">{metric.label}</span>
                        </div>
                    ))}
                </div>
            </Section>

            {/* Section 4: The Challenge (Split) */}
            <Section index={3} progress={smoothProgress} range={[0.40, 0.6]}>
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-xs font-black uppercase tracking-[0.5em] text-red-500 mb-8">Identify Vector</h2>
                        <h3 className="text-5xl font-black text-white mb-6">The Challenge</h3>
                        <p className="text-xl text-gray-400 leading-relaxed">{project.longDescription}</p>
                    </div>
                    <div className="space-y-4">
                        {project.challenges?.map((c, i) => (
                            <div key={i} className="p-6 rounded-xl border border-white/5 bg-white/5 hover:bg-white/10 transition-colors">
                                <div className="flex gap-4">
                                    <span className="text-red-500 font-mono">0{i + 1}</span>
                                    <p className="text-gray-300">{c}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </Section>

            {/* Section 5: Tech Stack (Holographic) */}
            <Section index={4} progress={smoothProgress} range={[0.55, 0.75]}>
                <div className="text-center">
                    <h2 className="text-xs font-black uppercase tracking-[0.5em] text-cyan-500 mb-16">System Architecture</h2>
                    <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
                        {project.technologies.map((tech, i) => (
                            <div key={i} className="px-8 py-4 rounded-full border border-cyan-500/20 bg-cyan-900/5 text-cyan-200 text-sm font-bold uppercase tracking-wider backdrop-blur-sm">
                                {tech}
                            </div>
                        ))}
                    </div>
                    <div className="mt-20 p-8 glass-panel rounded-3xl border border-white/10 inline-block">
                        <Target className="w-12 h-12 text-white mx-auto mb-4" />
                        <p className="text-gray-400 max-w-lg mx-auto">{project.results?.[0]}</p>
                    </div>
                </div>
            </Section>

            {/* Section 6: Closing Success & Warp */}
            <Section index={6} progress={smoothProgress} range={[0.70, 1.0]}>
                <div className="text-center relative">
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 rounded-full blur-[100px] -z-10"
                    />
                    <h2 className="text-[12vw] font-black text-white leading-none tracking-tighter mix-blend-overlay opacity-50">
                        MISSION<br />COMPLETE
                    </h2>

                    {nextProject && (
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            className="mt-20"
                        >
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
                                            transition={{ ease: "linear", duration: 0.15 }}
                                        />
                                    </div>
                                </div>
                            )}

                            <Link
                                href={`/projects/${nextProject.slug}`}
                                className="glass-panel inline-flex items-center gap-6 p-8 rounded-full border border-white/20 hover:border-emerald-500/50 hover:bg-emerald-500/10 transition-all cursor-alias group"
                            >
                                <span className="text-gray-400 uppercase text-xs font-bold tracking-widest group-hover:text-emerald-400 transition-colors">NEXT MISSION:</span>
                                <span className="text-2xl font-black text-white">{nextProject.title}</span>
                                <ArrowRight className="w-6 h-6 text-emerald-500 group-hover:translate-x-2 transition-transform" />
                            </Link>
                        </motion.div>
                    )}
                </div>
            </Section>
        </div>
    )
}
