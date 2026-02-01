'use client'

import { motion, useScroll, useTransform, useSpring, useVelocity } from 'framer-motion'
import { Rocket, Sparkles, Globe, ChevronRight, Github, Twitter, Linkedin, Layers, Zap, Cpu, Command, ArrowDownRight } from 'lucide-react'
import Link from 'next/link'
import { useRef, useState, useEffect } from 'react'

const FALLBACK_PROJECTS = [
    {
        id: 'fallback-1',
        title: 'Project Nebula',
        slug: 'project-nebula',
        description: 'Advanced autonomous fleet management system for deep-space logistics and telemetry.',
        techStack: [{ name: 'Next.js' }, { name: 'Payload' }]
    },
    {
        id: 'fallback-2',
        title: 'Void Analytics',
        slug: 'void-analytics',
        description: 'Real-time data visualization engine for high-velocity interstellar transmission packets.',
        techStack: [{ name: 'Three.js' }, { name: 'React' }]
    },
    {
        id: 'fallback-3',
        title: 'Core Protocol',
        slug: 'core-protocol',
        description: 'Bespoke enterprise architecture for modern digital manufacturing and growth.',
        techStack: [{ name: 'TypeScript' }, { name: 'Node.js' }]
    }
]

function ProjectCard({ project, i }: { project: any, i: number }) {
    return (
        <div className="w-[80vw] md:w-[60vw] lg:w-[40vw] flex-shrink-0 group relative">
            <Link href={`/projects/${project.slug}`}>
                <div className="aspect-[16/10] rounded-[2rem] overflow-hidden relative glass-panel mb-8 border border-white/5 group-hover:border-purple-500/50 transition-colors duration-700">
                    <div className="absolute inset-0 bg-gradient-to-t from-[#020202] to-transparent opacity-60 group-hover:opacity-20 transition-opacity duration-700" />

                    {project.thumbnail?.url ? (
                        <img
                            src={project.thumbnail.url}
                            alt={project.title}
                            className="w-full h-full object-cover opacity-50 group-hover:opacity-80 transition-opacity duration-700 group-hover:scale-105"
                        />
                    ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                            <motion.div
                                whileHover={{ scale: 1.2, rotate: 10 }}
                                className="w-24 h-24 rounded-full bg-white/5 backdrop-blur-3xl flex items-center justify-center border border-white/10 shadow-[0_0_30px_rgba(255,255,255,0.05)]"
                            >
                                <Layers className="w-10 h-10 text-white/20 group-hover:text-purple-500 transition-colors duration-500" />
                            </motion.div>
                        </div>
                    )}

                    <div className="absolute top-6 left-6 flex gap-2">
                        <div className="px-3 py-1 rounded-full border border-white/10 bg-black/50 backdrop-blur-md text-[8px] uppercase tracking-widest text-gray-400">
                            {project.techStack?.[0]?.name || 'NEXUS_V.01'}
                        </div>
                    </div>
                </div>
            </Link>

            <div className="px-4">
                <div className="flex justify-between items-start">
                    <h3 className="text-4xl font-black text-white italic tracking-tighter group-hover:text-purple-400 transition-colors duration-500 uppercase">
                        {project.title}
                    </h3>
                    <ArrowDownRight className="w-6 h-6 text-gray-700 group-hover:text-purple-500 group-hover:rotate-45 transition-all duration-500" />
                </div>
                <p className="text-gray-500 mt-4 text-lg font-medium leading-relaxed max-w-md line-clamp-2">
                    {project.description}
                </p>
            </div>
        </div>
    )
}

export default function HomeClient({ initialProjects }: { initialProjects: any[] }) {
    const [mounted, setMounted] = useState(false)
    const [stats, setStats] = useState({ core: 80, missions: 3, latency: 15 })
    const targetRef = useRef(null)
    useEffect(() => {
        setMounted(true)
        setStats({
            core: Math.floor(Math.random() * 20) + 80,
            missions: Math.floor(Math.random() * 5) + 3,
            latency: Math.floor(Math.random() * 9) + 10
        })
    }, [])

    const { scrollYProgress } = useScroll()
    const { scrollYProgress: scrollYProgressHorizontal } = useScroll({
        target: targetRef,
        offset: ["start start", "end end"]
    })



    const projectsToRender = initialProjects && initialProjects.length > 0 ? initialProjects : FALLBACK_PROJECTS
    const x = useTransform(scrollYProgressHorizontal, [0, 1], ["0%", `-${Math.max(0, (projectsToRender.length - 1) * 60)}%`])




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
                        I don't just build websites. I engineer digital engines that drive growth, speed, and interstellar user experiences. WordPress was the launchpad. Next.js is the rocket.
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

            <section ref={targetRef} id="works" className="relative h-[400vh] bg-black">
                <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-center">
                    <div className="px-6 lg:px-20 mb-20 relative z-20">
                        <div className="flex justify-between items-baseline overflow-hidden">
                            <motion.h2
                                initial={{ opacity: 0, x: -100 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                                className="text-8xl md:text-[12vw] font-black tracking-tighter text-white/5 uppercase leading-none"
                            >
                                Artifacts
                            </motion.h2>
                            <motion.span
                                initial={{ opacity: 0, x: 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 1, delay: 0.5 }}
                                className="text-xs font-mono text-emerald-500 animate-pulse hidden md:block"
                            >
                                [ SCANNING_DATA... ]
                            </motion.span>
                        </div>
                    </div>

                    <motion.div
                        style={{ x }}
                        className="flex gap-20 px-6 lg:px-20 relative z-10"
                    >
                        {projectsToRender.map((project, i) => (
                            <ProjectCard key={project.id} project={project} i={i} />
                        ))}
                    </motion.div>

                    <div className="absolute bottom-20 left-6 lg:left-20 right-6 lg:right-20 h-[1px] bg-white/5">
                        <motion.div
                            style={{ scaleX: scrollYProgressHorizontal }}
                            className="h-full bg-emerald-500 origin-left"
                        />
                    </div>
                </div>
            </section>

            <section id="meta" className="relative py-40 px-6 lg:px-20 overflow-hidden">
                <div className="max-w-7xl mx-auto">
                    <div className="mb-32">
                        <h2 className="text-xs font-black uppercase tracking-[0.5em] text-emerald-500 mb-6">03 — Universal Competencies</h2>
                        <h3 className="text-6xl md:text-9xl font-black text-white italic tracking-tighter uppercase leading-none">
                            Tech <br /> <span className="text-gray-800">Meta</span>
                        </h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                        {[
                            { name: 'Architecture', level: '95%', tech: 'Next.js, Payload, Microservices', color: 'from-emerald-500 to-teal-500' },
                            { name: 'Core Logic', level: '90%', tech: 'TypeScript, React, Node.js', color: 'from-teal-500 to-cyan-500' },
                            { name: '3D Mechanics', level: '85%', tech: 'Three.js, GLSL, R3F', color: 'from-cyan-500 to-emerald-400' },
                            { name: 'Growth Systems', level: '92%', tech: 'SEO, Conversion, SaaS Pipelines', color: 'from-emerald-400 to-teal-400' }
                        ].map((skill, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="group relative glass-panel p-10 rounded-[2.5rem] border-white/5 hover:border-white/20 transition-all cursor-crosshair"
                            >
                                <div className="mb-10 flex justify-between items-baseline">
                                    <span className="text-4xl font-black text-white/10 group-hover:text-white/20 transition-colors uppercase italic tracking-tighter">0{i + 1}</span>
                                    <span className={`text-xs font-black tracking-widest bg-gradient-to-r ${skill.color} bg-clip-text text-transparent`}>{skill.level}</span>
                                </div>
                                <h4 className="text-3xl font-black text-white mb-4 uppercase italic tracking-tighter group-hover:text-emerald-400 transition-colors">{skill.name}</h4>
                                <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest leading-relaxed">
                                    {skill.tech}
                                </p>

                                <div className="mt-10 h-1 w-full bg-white/5 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ x: '-100%' }}
                                        whileInView={{ x: '0%' }}
                                        transition={{ duration: 1.5, delay: 0.5 + i * 0.1 }}
                                        className={`h-full w-full bg-gradient-to-r ${skill.color}`}
                                        style={{ width: skill.level }}
                                    />
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

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
                                <p className="text-gray-500 text-lg font-medium">Core Web Vitals optimized out of the box. 100/100 performance scores aren't a goal—they're the baseline.</p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

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
        </main>
    )
}
