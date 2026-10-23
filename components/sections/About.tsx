'use client'

import { motion } from 'framer-motion'
import { Terminal, Code2, Layers, Cpu } from 'lucide-react'
import { GithubActivity } from '@/components/sections/GithubActivity'

export function About() {
    const problemsSolved = [
        {
            id: '01',
            title: 'Monolithic Decoupling',
            description: 'Dismantled sluggish WordPress/legacy monoliths, decoupling the frontend to Next.js and headless CMS (Payload). Result: 300% faster payload delivery and perfect Core Web Vitals.',
            icon: Layers
        },
        {
            id: '02',
            title: 'State Synchronization Latency',
            description: 'Engineered custom WebSocket caching layers over Redis and PostgreSQL to synchronize real-time location and chat data globally, dropping average latency from 2500ms to <150ms.',
            icon: Cpu
        },
        {
            id: '03',
            title: 'Render Blocking Anomalies',
            description: 'Optimized complex Three.js/WebGL render pipelines using React server components and dynamic imports. Kept Lighthouse scores at 99+ despite rendering millions of particles.',
            icon: Code2
        }
    ]

    return (
        <section id="about" className="relative py-20 sm:py-32 px-4 sm:px-6 lg:px-20 z-20">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">

                    {/* Left Column: Identity */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.1 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="flex items-center gap-4 mb-6 sm:mb-8">
                            <h2 className="text-xs font-black uppercase tracking-[0.4em] sm:tracking-[0.5em] text-emerald-500 whitespace-nowrap">01.1 — Directive</h2>
                            <div className="h-[1px] flex-1 bg-white/10" />
                        </div>

                        <h3 className="text-4xl sm:text-5xl md:text-7xl font-black text-white italic tracking-tighter uppercase leading-none mb-6 sm:mb-8">
                            The <span className="text-gray-800">Architect</span>
                        </h3>

                        <div className="space-y-4 sm:space-y-6 text-gray-400 text-base sm:text-lg font-medium leading-relaxed">
                            <p>
                                I am <strong className="text-white">Shahadat Hossain</strong>. As a Lead SaaS Architect and Full-Stack Engineer, I treat code as infrastructure. I specialize in designing highly scalable, fault-tolerant digital engines that empower ambitious companies.
                            </p>
                            <p>
                                Moving beyond the era of clunky templates and bloated plugins, I leverage <span className="text-emerald-400">Next.js</span>, <span className="text-teal-400">TypeScript</span>, and headless architectures like <span className="text-cyan-400">Payload CMS</span> to construct digital platforms that respond at the speed of thought.
                            </p>
                            <p>
                                My objective isn&apos;t just to write code that works; it&apos;s to write code that <span className="italic text-emerald-300 border-b border-emerald-500/30">dominates constraints.</span>
                            </p>
                        </div>

                        <div className="mt-8 sm:mt-12 space-y-4">
                            <div className="flex items-center gap-4 sm:gap-6 glass-panel p-4 sm:p-6 border-emerald-500/20 rounded-2xl">
                                <Terminal className="w-7 h-7 sm:w-8 sm:h-8 text-emerald-500 flex-shrink-0" />
                                <div>
                                    <h4 className="text-white font-bold tracking-widest text-xs sm:text-sm uppercase mb-1">Status: Operational</h4>
                                    <p className="text-xs text-gray-500">Currently exploring new dimensions in High-Performance UI &amp; AI Integration.</p>
                                </div>
                            </div>

                            <GithubActivity />
                        </div>
                    </motion.div>

                    {/* Right Column: Problems Solved */}
                    <div className="space-y-8 sm:space-y-12">
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                        >
                            <h4 className="text-xl sm:text-2xl font-black text-white uppercase tracking-widest mb-2 flex items-center gap-3">
                                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse flex-shrink-0" />
                                System Anomalies Resolved
                            </h4>
                            <p className="text-sm text-gray-500 uppercase tracking-wider font-bold mb-6 sm:mb-8">Real-world friction eliminated.</p>
                        </motion.div>

                        <div className="space-y-4 sm:space-y-6">
                            {problemsSolved.map((problem, i) => (
                                <motion.div
                                    key={problem.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, amount: 0.1 }}
                                    transition={{ duration: 0.5, delay: 0.1 * i }}
                                    className="group glass-panel p-5 sm:p-8 rounded-[1.5rem] sm:rounded-[2rem] border-white/5 hover:border-emerald-500/30 transition-all cursor-crosshair relative overflow-hidden"
                                >
                                    <div className="absolute top-0 right-0 p-6 sm:p-8 opacity-5 group-hover:opacity-10 transition-opacity duration-500 group-hover:scale-125 transform">
                                        <problem.icon className="w-20 h-20 sm:w-32 sm:h-32 text-emerald-500" />
                                    </div>

                                    <div className="relative z-10">
                                        <div className="flex items-center gap-3 mb-3 sm:mb-4 flex-wrap">
                                            <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                                                ISSUE_{problem.id}
                                            </span>
                                            <h5 className="text-lg sm:text-xl font-black text-white italic tracking-tight">{problem.title}</h5>
                                        </div>
                                        <p className="text-gray-400 text-sm leading-relaxed pr-4 sm:pr-8">
                                            {problem.description}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </section>
    )
}
