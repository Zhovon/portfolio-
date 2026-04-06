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
        <section id="about" className="relative py-32 px-6 lg:px-20 z-20">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
                    
                    {/* Left Column: Identity */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="flex items-center gap-4 mb-8">
                            <h2 className="text-xs font-black uppercase tracking-[0.5em] text-emerald-500">01.1 — Directive</h2>
                            <div className="h-[1px] flex-1 bg-white/10" />
                        </div>
                        
                        <h3 className="text-5xl md:text-7xl font-black text-white italic tracking-tighter uppercase leading-none mb-8">
                            The <span className="text-gray-800">Architect</span>
                        </h3>

                        <div className="space-y-6 text-gray-400 text-lg font-medium leading-relaxed">
                            <p>
                                I am <strong className="text-white">Shahadat Hossain</strong>. As a Lead SaaS Architect and Full-Stack Engineer, I treat code as infrastructure. I specialize in designing highly scalable, fault-tolerant digital engines that empower ambitious companies.
                            </p>
                            <p>
                                Moving beyond the era of clunky templates and bloated plugins, I leverage <span className="text-emerald-400">Next.js</span>, <span className="text-teal-400">TypeScript</span>, and headless architectures like <span className="text-cyan-400">Payload CMS</span> to construct digital platforms that respond at the speed of thought. 
                            </p>
                            <p>
                                My objective isn't just to write code that works; it's to write code that <span className="italic text-emerald-300 border-b border-emerald-500/30">dominates constraints.</span>
                            </p>
                        </div>

                        <div className="mt-12 flex flex-col md:flex-row items-stretch gap-6">
                            <div className="flex items-center gap-6 glass-panel p-6 border-emerald-500/20 rounded-2xl flex-1">
                                <Terminal className="w-8 h-8 text-emerald-500 flex-shrink-0" />
                                <div>
                                    <h4 className="text-white font-bold tracking-widest text-sm uppercase mb-1">Status: Operational</h4>
                                    <p className="text-xs text-gray-500">Currently exploring new dimensions in High-Performance UI & AI Integration.</p>
                                </div>
                            </div>
                            
                            <div className="flex-shrink-0 md:w-80">
                                <GithubActivity />
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Column: Problems Solved */}
                    <div className="space-y-12">
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                        >
                            <h4 className="text-2xl font-black text-white uppercase tracking-widest mb-2 flex items-center gap-3">
                                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                System Anomalies Resolved
                            </h4>
                            <p className="text-sm text-gray-500 uppercase tracking-wider font-bold mb-8">Real-world friction eliminated.</p>
                        </motion.div>

                        <div className="space-y-6">
                            {problemsSolved.map((problem, i) => (
                                <motion.div
                                    key={problem.id}
                                    initial={{ opacity: 0, x: 50 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6, delay: 0.3 + (i * 0.1) }}
                                    className="group glass-panel p-8 rounded-[2rem] border-white/5 hover:border-emerald-500/30 transition-all cursor-crosshair relative overflow-hidden"
                                >
                                    <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity duration-500 group-hover:scale-125 transform">
                                        <problem.icon className="w-32 h-32 text-emerald-500" />
                                    </div>
                                    
                                    <div className="relative z-10">
                                        <div className="flex items-center gap-4 mb-4">
                                            <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                                                ISSUE_{problem.id}
                                            </span>
                                            <h5 className="text-xl font-black text-white italic tracking-tight">{problem.title}</h5>
                                        </div>
                                        <p className="text-gray-400 text-sm leading-relaxed pr-8">
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
