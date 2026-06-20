'use client'

import { motion } from 'framer-motion'
import type { Transition } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { ChevronRight, Code2, Zap, Globe, ArrowUpRight } from 'lucide-react'

const floatTransition = (duration: number, delay = 0): Transition => ({
    duration,
    repeat: Infinity,
    ease: 'easeInOut' as const,
    delay,
})

export function Hero() {
    return (
        <section id="hero" className="relative min-h-screen flex items-center overflow-hidden">

            {/* ── Background glows ── */}
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-emerald-500/8 rounded-full blur-[120px]" />
                <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-cyan-500/6 rounded-full blur-[100px]" />
                <div className="absolute top-0 right-0 w-[400px] h-[800px] bg-teal-400/5 blur-[80px]" />
            </div>

            <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 lg:px-16 py-20 lg:py-0">
                <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-0 min-h-screen lg:min-h-0">

                    {/* ── LEFT: Text content ── */}
                    <div className="flex-1 flex flex-col justify-center order-2 lg:order-1 text-center lg:text-left">

                        {/* Status badge */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2, duration: 0.8 }}
                            className="inline-flex items-center gap-2 mb-6 lg:mb-8 mx-auto lg:mx-0"
                        >
                            <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-4 py-2">
                                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
                                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-emerald-400">Available for Projects</span>
                            </div>
                        </motion.div>

                        {/* Main heading */}
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.35, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        >
                            <h1 className="font-black tracking-tighter text-white leading-[0.85] mb-4 lg:mb-6">
                                <span className="block text-[13vw] sm:text-[10vw] lg:text-[8.5vw] xl:text-[7.5rem]">FUTURE</span>
                                <span className="block text-[13vw] sm:text-[10vw] lg:text-[8.5vw] xl:text-[7.5rem] bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent italic">BUILT.</span>
                            </h1>
                        </motion.div>

                        {/* Name + title */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.55, duration: 0.8 }}
                            className="mb-8 lg:mb-10"
                        >
                            <p className="text-white/90 text-lg sm:text-xl font-bold mb-1">Shahadat Hossain</p>
                            <p className="text-gray-500 text-sm sm:text-base font-medium tracking-[0.15em] uppercase">
                                SaaS Architect &amp; Full-Stack Engineer — Est. 2019
                            </p>
                        </motion.div>

                        {/* Stat chips */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.7, duration: 0.8 }}
                            className="flex flex-wrap gap-3 mb-10 lg:mb-12 justify-center lg:justify-start"
                        >
                            {[
                                { icon: Code2, label: '50+ Projects', color: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/20' },
                                { icon: Zap, label: '5+ Years Exp.', color: 'text-teal-400', bg: 'bg-teal-500/10 border-teal-500/20' },
                                { icon: Globe, label: 'Global Clients', color: 'text-cyan-400', bg: 'bg-cyan-500/10 border-cyan-500/20' },
                            ].map(({ icon: Icon, label, color, bg }) => (
                                <div key={label} className={`flex items-center gap-2 border rounded-full px-4 py-2 ${bg}`}>
                                    <Icon className={`w-3.5 h-3.5 ${color}`} />
                                    <span className={`text-[11px] font-black uppercase tracking-wider ${color}`}>{label}</span>
                                </div>
                            ))}
                        </motion.div>

                        {/* CTA buttons */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.85, duration: 0.8 }}
                            className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start"
                        >
                            <Link
                                href="/contact"
                                className="group flex items-center justify-center gap-3 px-7 py-4 bg-white text-black text-[11px] font-black uppercase tracking-[0.2em] rounded-full hover:bg-emerald-400 transition-all duration-300 hover:scale-105 shadow-[0_0_30px_rgba(255,255,255,0.15)]"
                            >
                                Initiate Project
                                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <Link
                                href="/projects"
                                className="group flex items-center justify-center gap-3 px-7 py-4 glass-panel text-white text-[11px] font-black uppercase tracking-[0.2em] rounded-full hover:bg-white/5 transition-all border-white/10"
                            >
                                View Archive
                                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                            </Link>
                        </motion.div>
                    </div>

                    {/* ── RIGHT: Photo panel ── */}
                    <motion.div
                        initial={{ opacity: 0, x: 60 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                        className="flex-shrink-0 order-1 lg:order-2 relative w-full max-w-[340px] sm:max-w-[380px] lg:max-w-[420px] xl:max-w-[460px]"
                    >
                        {/* Decorative ring behind the photo */}
                        <div className="absolute inset-[-20px] rounded-[3rem] bg-gradient-to-br from-emerald-500/20 via-teal-400/10 to-cyan-500/20 blur-2xl" />

                        {/* Outer rotating gradient border */}
                        <div className="absolute inset-0 rounded-[2.5rem] p-[2px] bg-gradient-to-br from-emerald-500 via-teal-400 to-cyan-500 opacity-60 animate-spin-slow" />

                        {/* Photo container */}
                        <div className="relative rounded-[2.5rem] overflow-hidden bg-[#0a0a0b] border border-white/10 shadow-[0_40px_80px_rgba(0,0,0,0.7),0_0_40px_rgba(16,185,129,0.12)]">
                            <div className="aspect-[3/4] relative">
                                <Image
                                    src="/images/rashed-avatar.png"
                                    alt="Shahadat Hossain — SaaS Architect"
                                    fill
                                    className="object-cover object-center"
                                    priority
                                />
                                {/* Bottom gradient fade */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                                {/* Name tag at bottom of photo */}
                                <div className="absolute bottom-0 left-0 right-0 p-5">
                                    <div className="glass-panel rounded-2xl p-3 border-white/10">
                                        <p className="text-[9px] font-black uppercase tracking-[0.45em] text-emerald-400 mb-0.5">SaaS Architect</p>
                                        <p className="text-white font-black text-sm tracking-tight">Shahadat Hossain</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* ── Floating badge: GitHub ── */}
                        <motion.div
                            animate={{ y: [-6, 6, -6] }}
                            transition={floatTransition(4)}
                            className="absolute -left-6 top-12 sm:-left-10"
                        >
                            <div className="glass-panel rounded-2xl px-4 py-3 border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.5)] flex items-center gap-2.5">
                                <div className="w-7 h-7 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center">
                                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                                </div>
                                <div>
                                    <p className="text-[9px] font-black uppercase tracking-widest text-gray-500">GitHub</p>
                                    <p className="text-white text-xs font-black">Active Today</p>
                                </div>
                            </div>
                        </motion.div>

                        {/* ── Floating badge: Experience ── */}
                        <motion.div
                            animate={{ y: [6, -6, 6] }}
                            transition={floatTransition(5, 0.5)}
                            className="absolute -right-4 top-1/4 sm:-right-8"
                        >
                            <div className="glass-panel rounded-2xl px-4 py-3 border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
                                <p className="text-[9px] font-black uppercase tracking-widest text-gray-500 mb-0.5">Experience</p>
                                <p className="text-2xl font-black text-white leading-none">5+</p>
                                <p className="text-[9px] text-emerald-400 font-bold uppercase tracking-wider">Years</p>
                            </div>
                        </motion.div>

                        {/* ── Floating badge: Stack ── */}
                        <motion.div
                            animate={{ y: [-4, 4, -4] }}
                            transition={floatTransition(3.5, 1)}
                            className="absolute -left-4 bottom-24 sm:-left-8"
                        >
                            <div className="glass-panel rounded-2xl px-4 py-3 border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
                                <p className="text-[9px] font-black uppercase tracking-widest text-gray-500 mb-1.5">Stack</p>
                                <div className="flex gap-1">
                                    {['TS', 'RX', 'NX'].map((s) => (
                                        <span key={s} className="text-[9px] font-black px-2 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                                            {s}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>

                        {/* ── Floating badge: Projects ── */}
                        <motion.div
                            animate={{ y: [-6, 6, -6] }}
                            transition={floatTransition(4, 2)}
                            className="absolute -right-3 bottom-20 sm:-right-6"
                        >
                            <div className="glass-panel rounded-2xl px-4 py-3 border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
                                <p className="text-[9px] font-black uppercase tracking-widest text-gray-500 mb-0.5">Projects</p>
                                <p className="text-2xl font-black text-white leading-none">50+</p>
                                <p className="text-[9px] text-teal-400 font-bold uppercase tracking-wider">Delivered</p>
                            </div>
                        </motion.div>

                        {/* Corner dot decorations */}
                        <div className="absolute -top-3 -right-3 w-6 h-6 rounded-full bg-emerald-500 blur-sm opacity-60" />
                        <div className="absolute -bottom-3 -left-3 w-4 h-4 rounded-full bg-cyan-400 blur-sm opacity-50" />
                    </motion.div>

                </div>
            </div>

            {/* Bottom gradient fade */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#020202] to-transparent pointer-events-none" />
        </section>
    )
}
