'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowLeft, Github, Globe, Zap, Target, CheckCircle2, TrendingUp } from 'lucide-react'
import Link from 'next/link'
import { useRef } from 'react'
import { Project } from '@/data/projects'
import { ScrollReveal } from '@/components/animations/ScrollReveal'
import { ParallaxImage } from '@/components/animations/ParallaxImage'
import { MagneticButton } from '@/components/animations/MagneticButton'
import { SmoothScrollProvider } from '@/components/animations/SmoothScrollProvider'

export function CaseStudyClient({ project }: { project: Project }) {
    const containerRef = useRef(null)
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    })

    const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0])
    const heroScale = useTransform(scrollYProgress, [0, 0.3], [1, 1.1])

    if (!project) return <div>Project not found.</div>

    return (
        <SmoothScrollProvider>
            <main ref={containerRef} className="min-h-screen bg-[#020202] overflow-x-hidden">
                {/* Animated Background Gradient */}
                <div className="fixed inset-0 opacity-30 pointer-events-none">
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 via-teal-500/20 to-cyan-500/20 animate-gradient-shift" />
                </div>

                {/* Floating Navigation */}
                <motion.nav
                    initial={{ y: -100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="fixed top-6 left-6 z-[100]"
                >
                    <MagneticButton>
                        <Link
                            href="/projects"
                            className="glass-panel px-6 py-3 rounded-full flex items-center gap-3 group text-white backdrop-blur-xl border border-white/10 hover:border-emerald-500/50 transition-all duration-300"
                        >
                            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                            <span className="text-xs font-bold uppercase tracking-wider">Back</span>
                        </Link>
                    </MagneticButton>
                </motion.nav>

                {/* Progress Indicator */}
                <motion.div
                    className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 origin-left z-[101]"
                    style={{ scaleX: scrollYProgress }}
                />

                {/* Hero Section with Parallax */}
                <section className="relative h-screen flex items-center justify-center overflow-hidden">
                    {/* Parallax Background */}
                    <motion.div
                        style={{ opacity: heroOpacity, scale: heroScale }}
                        className="absolute inset-0"
                    >
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/70 to-black z-10" />
                        {project.image ? (
                            <ParallaxImage
                                src={project.image}
                                alt={project.title}
                                speed={0.5}
                                className="w-full h-full grayscale opacity-40"
                            />
                        ) : (
                            <div className="w-full h-full bg-gradient-to-br from-emerald-900/30 to-cyan-900/30" />
                        )}
                    </motion.div>

                    {/* Hero Content */}
                    <div className="relative z-20 text-center px-6 max-w-5xl">
                        {/* Category Badge */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="mb-8 inline-block"
                        >
                            <div className="glass-panel px-8 py-3 rounded-full border border-emerald-500/30 backdrop-blur-xl">
                                <span className="text-emerald-400 text-xs font-black uppercase tracking-[0.3em]">
                                    {project.category}
                                </span>
                            </div>
                        </motion.div>

                        {/* Animated Title */}
                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.5 }}
                            className="text-6xl md:text-8xl font-black text-white mb-6 leading-none tracking-tight"
                        >
                            {project.title.split(' ').map((word, i) => (
                                <motion.span
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: 0.6 + i * 0.1 }}
                                    className="inline-block mr-4"
                                    style={{
                                        background: i % 2 === 0
                                            ? 'linear-gradient(135deg, #10B981, #14B8A6)'
                                            : 'transparent',
                                        WebkitBackgroundClip: i % 2 === 0 ? 'text' : 'unset',
                                        WebkitTextFillColor: i % 2 === 0 ? 'transparent' : 'white',
                                    }}
                                >
                                    {word}
                                </motion.span>
                            ))}
                        </motion.h1>

                        {/* Description */}
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.8, delay: 1 }}
                            className="text-xl md:text-2xl text-gray-400 mb-12 max-w-3xl mx-auto font-light"
                        >
                            {project.description}
                        </motion.p>

                        {/* CTA Buttons */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 1.2 }}
                            className="flex flex-wrap justify-center gap-4"
                        >
                            {project.liveUrl && (
                                <MagneticButton href={project.liveUrl}>
                                    <div className="glass-panel px-8 py-4 rounded-full flex items-center gap-3 bg-gradient-to-r from-emerald-500 to-teal-500 hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] transition-all duration-300">
                                        <Globe className="w-5 h-5 text-white" />
                                        <span className="text-sm font-bold uppercase tracking-wider text-white">View Live</span>
                                    </div>
                                </MagneticButton>
                            )}
                            {project.githubUrl && (
                                <MagneticButton href={project.githubUrl}>
                                    <div className="glass-panel px-8 py-4 rounded-full flex items-center gap-3 border border-white/20 hover:border-emerald-500/50 hover:bg-white/5 transition-all duration-300">
                                        <Github className="w-5 h-5 text-emerald-400" />
                                        <span className="text-sm font-bold uppercase tracking-wider text-white">Source Code</span>
                                    </div>
                                </MagneticButton>
                            )}
                        </motion.div>
                    </div>

                    {/* Scroll Indicator */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 1.5 }}
                        className="absolute bottom-10 left-1/2 -translate-x-1/2"
                    >
                        <motion.div
                            animate={{ y: [0, 10, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                            className="w-6 h-10 border-2 border-emerald-500/50 rounded-full flex items-start justify-center p-2"
                        >
                            <motion.div className="w-1 h-2 bg-emerald-500 rounded-full" />
                        </motion.div>
                    </motion.div>
                </section>

                {/* Metrics Section */}
                {project.metrics && project.metrics.length > 0 && (
                    <section className="relative py-32 px-6">
                        <div className="max-w-7xl mx-auto">
                            <ScrollReveal>
                                <h2 className="text-sm font-black uppercase tracking-[0.3em] text-emerald-500 mb-16 text-center">
                                    Key Metrics
                                </h2>
                            </ScrollReveal>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                {project.metrics.map((metric, i) => (
                                    <ScrollReveal key={i} delay={i * 0.1} direction="up">
                                        <motion.div
                                            whileHover={{ scale: 1.05, rotateY: 5 }}
                                            className="glass-panel p-10 rounded-3xl border border-white/10 hover:border-emerald-500/50 transition-all duration-300 text-center group"
                                        >
                                            <div className="text-6xl font-black bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent mb-4">
                                                {metric.value}
                                            </div>
                                            <div className="text-gray-400 uppercase text-sm font-bold tracking-widest">
                                                {metric.label}
                                            </div>
                                            <div className="mt-4 h-1 w-0 group-hover:w-full bg-gradient-to-r from-emerald-500 to-cyan-500 transition-all duration-500 mx-auto rounded-full" />
                                        </motion.div>
                                    </ScrollReveal>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* Overview Section */}
                <section className="relative py-32 px-6 border-t border-white/5">
                    <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-20">
                        <ScrollReveal direction="left">
                            <div>
                                <h2 className="text-sm font-black uppercase tracking-[0.3em] text-emerald-500 mb-8">
                                    The Challenge
                                </h2>
                                <p className="text-4xl md:text-5xl font-black text-white leading-tight mb-8">
                                    {project.description.split(' ').slice(0, 6).join(' ')}
                                </p>
                                <p className="text-xl text-gray-400 leading-relaxed">
                                    {project.longDescription}
                                </p>
                            </div>
                        </ScrollReveal>

                        <ScrollReveal direction="right" delay={0.2}>
                            <div className="glass-panel p-10 rounded-3xl border border-emerald-500/20 bg-gradient-to-br from-emerald-500/5 to-transparent">
                                <Target className="w-12 h-12 text-emerald-500 mb-6" />
                                <h3 className="text-2xl font-black text-white mb-4">Core Achievement</h3>
                                <p className="text-gray-400 leading-relaxed">
                                    {project.results?.[0] || `Successfully delivered a high-performance solution using ${project.technologies[0]}.`}
                                </p>
                            </div>
                        </ScrollReveal>
                    </div>
                </section>

                {/* Technology Stack */}
                <section className="relative py-32 px-6">
                    <div className="max-w-7xl mx-auto">
                        <ScrollReveal>
                            <h2 className="text-sm font-black uppercase tracking-[0.3em] text-emerald-500 mb-16 text-center">
                                Technology Stack
                            </h2>
                        </ScrollReveal>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            {project.technologies.map((tech, i) => (
                                <ScrollReveal key={i} delay={i * 0.05} direction="up">
                                    <motion.div
                                        whileHover={{ y: -10 }}
                                        className="glass-panel p-8 rounded-2xl border border-white/10 hover:border-emerald-500/50 transition-all duration-300 text-center group"
                                    >
                                        <Zap className="w-8 h-8 text-emerald-500 mx-auto mb-4 group-hover:rotate-12 transition-transform" />
                                        <h4 className="text-lg font-bold text-white">{tech}</h4>
                                    </motion.div>
                                </ScrollReveal>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Challenges & Solutions */}
                {project.challenges && project.solutions && (
                    <section className="relative py-32 px-6 border-t border-white/5">
                        <div className="max-w-4xl mx-auto">
                            <ScrollReveal>
                                <h2 className="text-sm font-black uppercase tracking-[0.3em] text-emerald-500 mb-20 text-center">
                                    Development Journey
                                </h2>
                            </ScrollReveal>

                            <div className="space-y-16">
                                {project.challenges.map((challenge, i) => (
                                    <div key={i} className="relative">
                                        <ScrollReveal direction={i % 2 === 0 ? 'left' : 'right'} delay={i * 0.1}>
                                            <div className="grid md:grid-cols-2 gap-8">
                                                {/* Challenge */}
                                                <div className="glass-panel p-8 rounded-2xl border border-red-500/20 bg-red-500/5">
                                                    <div className="flex items-center gap-3 mb-4">
                                                        <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center">
                                                            <Target className="w-5 h-5 text-red-400" />
                                                        </div>
                                                        <h3 className="text-lg font-bold text-white">Challenge {i + 1}</h3>
                                                    </div>
                                                    <p className="text-gray-400">{challenge}</p>
                                                </div>

                                                {/* Solution */}
                                                <div className="glass-panel p-8 rounded-2xl border border-emerald-500/20 bg-emerald-500/5">
                                                    <div className="flex items-center gap-3 mb-4">
                                                        <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center">
                                                            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                                                        </div>
                                                        <h3 className="text-lg font-bold text-white">Solution</h3>
                                                    </div>
                                                    <p className="text-gray-400">{project.solutions?.[i] || 'Solution implemented successfully'}</p>
                                                </div>
                                            </div>
                                        </ScrollReveal>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* Results */}
                {project.results && (
                    <section className="relative py-32 px-6">
                        <div className="max-w-4xl mx-auto">
                            <ScrollReveal>
                                <h2 className="text-sm font-black uppercase tracking-[0.3em] text-emerald-500 mb-16 text-center">
                                    Impact & Results
                                </h2>
                            </ScrollReveal>

                            <div className="space-y-6">
                                {project.results.map((result, i) => (
                                    <ScrollReveal key={i} delay={i * 0.1} direction="up">
                                        <motion.div
                                            whileHover={{ x: 10 }}
                                            className="glass-panel p-8 rounded-2xl border border-white/10 hover:border-emerald-500/50 transition-all duration-300 flex items-start gap-4"
                                        >
                                            <TrendingUp className="w-6 h-6 text-emerald-500 flex-shrink-0 mt-1" />
                                            <p className="text-lg text-gray-300">{result}</p>
                                        </motion.div>
                                    </ScrollReveal>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* Footer CTA */}
                <footer className="relative py-40 px-6 text-center border-t border-white/5">
                    <ScrollReveal>
                        <h2 className="text-sm font-black uppercase tracking-[0.3em] text-gray-600 mb-10">
                            Project Complete
                        </h2>
                        <div className="text-7xl md:text-9xl font-black text-white mb-16 leading-none">
                            <span className="bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 bg-clip-text text-transparent">
                                SUCCESS
                            </span>
                        </div>
                        <MagneticButton>
                            <Link
                                href="/projects"
                                className="inline-flex items-center gap-3 text-emerald-400 font-bold hover:text-white transition-colors text-lg group"
                            >
                                <span>Explore More Projects</span>
                                <ArrowLeft className="w-5 h-5 rotate-180 group-hover:translate-x-2 transition-transform" />
                            </Link>
                        </MagneticButton>
                    </ScrollReveal>
                </footer>
            </main>
        </SmoothScrollProvider>
    )
}
