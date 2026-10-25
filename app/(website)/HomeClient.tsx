'use client'

import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion'
import { Rocket, Zap, Layers, Cpu, Command, ArrowDownRight } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useRef } from 'react'
import type { IconType } from 'react-icons'
import { SiHtml5, SiNextdotjs, SiShopify, SiWordpress, SiReact, SiTypescript, SiPayloadcms, SiHubspot, SiWebflow } from 'react-icons/si'
import { Hero } from '@/components/sections/Hero'
import { Projects } from '@/components/sections/Projects'
import { Skills } from '@/components/sections/Skills'
import { Terminal } from '@/components/sections/Terminal'
import { Project } from '@/data/projects'

import { About } from '@/components/sections/About'

function BrandLogo({ icon: Icon, label, accentClass, compact = false }: { icon: IconType; label: string; accentClass: string; compact?: boolean }) {
    return (
        <div className={`flex items-center gap-2.5 sm:gap-3 rounded-2xl border border-white/10 bg-white/5 text-white/80 shadow-[0_10px_30px_rgba(0,0,0,0.22)] ${compact ? 'min-w-0 p-2.5 overflow-hidden' : 'min-w-[170px] px-4 py-4'}`}>
            <div className={`flex items-center justify-center rounded-full border border-white/10 bg-black/50 ${accentClass} shadow-[0_0_24px_rgba(255,255,255,0.06)] shrink-0 ${compact ? 'h-8 w-8 sm:h-9 sm:w-9' : 'h-12 w-12'}`}>
                <Icon className={compact ? 'h-4 w-4' : 'h-6 w-6'} />
            </div>
            <div className="min-w-0 flex-1 overflow-hidden">
                <span className="block text-[10px] sm:text-xs font-black uppercase tracking-wider text-white/85 truncate">{label}</span>
                <span className="block text-[8px] uppercase tracking-wider text-white/40 truncate">official mark</span>
            </div>
        </div>
    )
}

function VoidModuleCard({ i, scrollYProgress }: { i: number; scrollYProgress: MotionValue<number> }) {
    const scale = useTransform(scrollYProgress, [0.4 + i * 0.05, 0.9], [0, 4])
    const opacity = useTransform(scrollYProgress, [0.4 + i * 0.05, 0.6 + i * 0.05, 0.9], [0, 1, 0])

    return (
        <motion.div
            style={{
                x: (i % 2 === 0 ? 1 : -1) * (200 + i * 50),
                y: (i < 3 ? 1 : -1) * (150 + i * 40),
                scale,
                opacity,
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
    )
}

export default function HomeClient({ initialProjects }: { initialProjects: Project[] }) {
    const { scrollYProgress } = useScroll()
    const voidScale1 = useTransform(scrollYProgress, [0, 0.5], [1, 15])
    const voidOpacity1 = useTransform(scrollYProgress, [0, 0.4], [0.2, 0])
    const voidScale2 = useTransform(scrollYProgress, [0.3, 0.7], [0.5, 2])
    const voidOpacity2 = useTransform(scrollYProgress, [0.3, 0.5, 0.7], [0, 1, 0])
    const voidY2 = useTransform(scrollYProgress, [0.3, 0.7], [100, -100])
    const voidScale3 = useTransform(scrollYProgress, [0.8, 1], [0.8, 1])
    const voidOpacity3 = useTransform(scrollYProgress, [0.85, 1], [0, 1])
    const pricingStripRef = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        const strip = pricingStripRef.current
        if (!strip) return

        const handleWheel = (event: WheelEvent) => {
            if (window.innerWidth < 768) return

            const maxScrollLeft = strip.scrollWidth - strip.clientWidth
            if (maxScrollLeft <= 0) return

            const goingRight = event.deltaY > 0
            const goingLeft = event.deltaY < 0
            const canScrollRight = strip.scrollLeft < maxScrollLeft
            const canScrollLeft = strip.scrollLeft > 0

            if ((goingRight && canScrollRight) || (goingLeft && canScrollLeft)) {
                event.preventDefault()
                strip.scrollLeft += event.deltaY
            }
        }

        strip.addEventListener('wheel', handleWheel, { passive: false })

        return () => {
            strip.removeEventListener('wheel', handleWheel)
        }
    }, [])

    return (
        <main className="relative w-full">
            <nav className="fixed top-0 left-0 right-0 z-[100] p-4 sm:p-6 lg:p-10 pointer-events-none">
                <div className="max-w-screen-2xl mx-auto flex items-center justify-between gap-3 sm:gap-4 flex-wrap sm:flex-nowrap">
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pointer-events-auto">
                        <Link href="/" className="mix-blend-difference text-lg sm:text-xl font-black tracking-tighter text-white">ZHOVON</Link>
                    </motion.div>
                    <div className="flex items-center gap-2 sm:gap-4 pointer-events-auto ml-auto sm:ml-0">
                        <Link href="/portfolio" className="glass-panel px-3 sm:px-6 py-2 rounded-full text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.18em] sm:tracking-widest text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/10 hover:border-emerald-500/70 transition-all flex items-center gap-2">
                            <Layers className="w-3 h-3" />
                            <span className="hidden sm:inline">Portfolio</span>
                        </Link>
                        <Link href="/contact" className="glass-panel px-3 sm:px-6 py-2 rounded-full text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.18em] sm:tracking-widest text-white hover:bg-white/10 transition-colors flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                            <span className="hidden sm:inline">Contact Protocol</span>
                        </Link>
                    </div>
                </div>
            </nav>

            <Hero />

            <section id="warp" className="relative min-h-[70vh] sm:h-screen flex items-center justify-center overflow-hidden bg-white/5 backdrop-blur-sm py-20 sm:py-0">
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
                        className="text-3xl sm:text-5xl md:text-7xl font-black text-white mb-6 sm:mb-10 tracking-tighter"
                    >
                        MOVING AT THE VELOCITY OF <span className="text-emerald-500">INNOVATION.</span>
                    </motion.h2>
                    <p className="text-gray-400 text-base sm:text-xl font-medium leading-relaxed">
                        I don"t just build websites. I engineer digital engines that drive growth, speed, and interstellar user experiences. WordPress was the launchpad. Next.js is the rocket.
                    </p>
                </div>
            </section>

            <div className="relative py-20 overflow-hidden z-20">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(124,58,237,0.12),transparent_50%),radial-gradient(circle_at_bottom,rgba(16,185,129,0.10),transparent_45%)]" />

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.1 }}
                        transition={{ duration: 0.6, ease: 'easeOut' }}
                        className="glass-panel relative overflow-hidden rounded-[1.75rem] sm:rounded-[2rem] p-4 sm:p-6 md:p-8"
                    >
                        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-emerald-400/40 to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-teal-400/40 to-transparent" />

                        <div className="relative space-y-6 sm:space-y-8">
                            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
                                <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/80 text-[10px] sm:text-[11px] font-black tracking-widest shrink-0">
                                    ZH
                                </div>
                                <div className="space-y-0.5 sm:space-y-1">
                                    <p className="text-[10px] font-black uppercase tracking-widest text-emerald-400">02.2 — Stack & Services</p>
                                    <p className="text-white text-base sm:text-lg font-bold tracking-tight">Real brand marks, not placeholders.</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-2.5 sm:gap-3 md:hidden">
                                {[
                                    { label: 'HTML5', icon: SiHtml5, accentClass: 'text-[#e34f26]' },
                                    { label: 'Next.js', icon: SiNextdotjs, accentClass: 'text-white' },
                                    { label: 'Shopify', icon: SiShopify, accentClass: 'text-[#95bf47]' },
                                    { label: 'WordPress', icon: SiWordpress, accentClass: 'text-[#21759b]' },
                                    { label: 'React', icon: SiReact, accentClass: 'text-[#61dafb]' },
                                    { label: 'TypeScript', icon: SiTypescript, accentClass: 'text-[#3178c6]' },
                                    { label: 'Payload CMS', icon: SiPayloadcms, accentClass: 'text-white' },
                                    { label: 'HubSpot', icon: SiHubspot, accentClass: 'text-[#ff7a59]' },
                                ].map((item, index) => {
                                    const Icon = item.icon

                                    return (
                                        <BrandLogo key={`${item.label}-${index}`} icon={Icon} label={item.label} accentClass={item.accentClass} compact />
                                    )
                                })}
                            </div>

                            <div className="hidden md:block overflow-hidden rounded-[1.6rem] border border-white/10 bg-black/20 py-5">
                                <motion.div
                                    animate={{ x: ['0%', '-50%'] }}
                                    transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
                                    className="flex w-max items-center gap-4 whitespace-nowrap px-4"
                                >
                                    {[
                                        { label: 'HTML5', icon: SiHtml5, accentClass: 'text-[#e34f26]' },
                                        { label: 'Next.js', icon: SiNextdotjs, accentClass: 'text-white' },
                                        { label: 'Shopify', icon: SiShopify, accentClass: 'text-[#95bf47]' },
                                        { label: 'WordPress', icon: SiWordpress, accentClass: 'text-[#21759b]' },
                                        { label: 'React', icon: SiReact, accentClass: 'text-[#61dafb]' },
                                        { label: 'TypeScript', icon: SiTypescript, accentClass: 'text-[#3178c6]' },
                                        { label: 'Payload CMS', icon: SiPayloadcms, accentClass: 'text-white' },
                                        { label: 'HubSpot', icon: SiHubspot, accentClass: 'text-[#ff7a59]' },
                                        { label: 'Webflow', icon: SiWebflow, accentClass: 'text-[#4353ff]' },
                                        { label: 'HTML5', icon: SiHtml5, accentClass: 'text-[#e34f26]' },
                                        { label: 'Next.js', icon: SiNextdotjs, accentClass: 'text-white' },
                                        { label: 'Shopify', icon: SiShopify, accentClass: 'text-[#95bf47]' },
                                        { label: 'WordPress', icon: SiWordpress, accentClass: 'text-[#21759b]' },
                                        { label: 'React', icon: SiReact, accentClass: 'text-[#61dafb]' },
                                        { label: 'TypeScript', icon: SiTypescript, accentClass: 'text-[#3178c6]' },
                                        { label: 'Payload CMS', icon: SiPayloadcms, accentClass: 'text-white' },
                                        { label: 'HubSpot', icon: SiHubspot, accentClass: 'text-[#ff7a59]' },
                                        { label: 'Webflow', icon: SiWebflow, accentClass: 'text-[#4353ff]' },
                                    ].map((item, index) => {
                                        const Icon = item.icon

                                        return (
                                            <BrandLogo key={`${item.label}-${index}`} icon={Icon} label={item.label} accentClass={item.accentClass} />
                                        )
                                    })}
                                </motion.div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full min-w-0">
                                <div className="w-full min-w-0 rounded-2xl sm:rounded-[1.5rem] border border-white/10 bg-white/5 p-4 sm:p-6">
                                    <p className="text-[10px] font-black uppercase tracking-wider text-emerald-400 mb-3 sm:mb-4">Website services</p>
                                    <div className="space-y-2.5 sm:space-y-3">
                                        {[
                                            'Custom code websites',
                                            'CRM integrations and automations',
                                            'WordPress builds and redesigns',
                                            'Migrations, landing pages, ecommerce',
                                        ].map((item) => (
                                            <div key={item} className="flex items-center gap-3 rounded-xl border border-white/5 bg-black/30 px-3.5 py-2.5 sm:px-4 sm:py-3 text-xs sm:text-sm text-white/90">
                                                <span className="h-2 w-2 rounded-full bg-emerald-500 shrink-0 shadow-[0_0_10px_rgba(16,185,129,0.8)]" />
                                                <span className="font-medium leading-snug break-words min-w-0 flex-1">{item}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="w-full min-w-0 max-w-full rounded-2xl sm:rounded-[1.5rem] border border-white/10 bg-black/30 p-4 sm:p-6 flex flex-col justify-between gap-5">
                                    <div className="w-full min-w-0">
                                        <p className="text-[10px] font-black uppercase tracking-wider text-white/45 mb-2">What stays consistent</p>
                                        <h4 className="text-xl sm:text-2xl font-black text-white tracking-tight mb-2 leading-tight break-words">Brand marks first, text second.</h4>
                                        <p className="text-xs sm:text-sm text-gray-400 leading-relaxed break-words">
                                            The section now behaves like a real brand strip: official logos in motion, dark surfaces, and a service summary that fits the rest of the page.
                                        </p>
                                    </div>

                                    <div className="w-full min-w-0 max-w-full overflow-hidden rounded-full border border-white/10 bg-black/40 py-2 sm:py-2.5">
                                        <motion.div
                                            animate={{ x: ['0%', '-50%'] }}
                                            transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
                                            className="flex w-max items-center gap-2.5 sm:gap-3 whitespace-nowrap px-3"
                                        >
                                            {['HTML5', 'Next.js', 'Shopify', 'WordPress', 'React', 'TypeScript', 'Payload', 'HubSpot', 'Webflow', 'HTML5', 'Next.js', 'Shopify', 'WordPress', 'React', 'TypeScript', 'Payload', 'HubSpot', 'Webflow'].map((item, index) => (
                                                <span key={`${item}-${index}`} className="shrink-0 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] sm:text-[11px] font-bold tracking-wider text-white/80">
                                                    {item}
                                                </span>
                                            ))}
                                        </motion.div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            <About />

            <section className="relative h-[300vh]" id="dive">
                <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
                    <div className="relative w-full h-full flex items-center justify-center">
                        <motion.div
                            style={{
                                scale: voidScale1,
                                opacity: voidOpacity1,
                            }}
                            className="absolute w-[150%] h-[150%] bg-[radial-gradient(circle_at_center,rgba(124,58,237,0.2)_0%,transparent_70%)] blur-[100px]"
                        />

                        <motion.div
                            style={{
                                scale: voidScale2,
                                opacity: voidOpacity2,
                                y: voidY2,
                            }}
                            className="text-center z-10 p-6"
                        >
                            <h3 className="text-4xl md:text-6xl font-black text-white italic tracking-tighter mb-4">
                                DISCO-VERING <br /> THE VOID
                            </h3>
                            <p className="text-gray-500 text-lg uppercase tracking-[0.4em] font-bold">Scanning for intelligent patterns...</p>
                        </motion.div>

                        {[...Array(6)].map((_, i) => (
                            <VoidModuleCard key={i} i={i} scrollYProgress={scrollYProgress} />
                        ))}

                        <motion.div
                            style={{
                                scale: voidScale3,
                                opacity: voidOpacity3,
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

            <section id="core" className="relative py-16 sm:py-24 lg:py-40 px-4 sm:px-6 lg:px-20 bg-gradient-to-b from-black via-purple-950/10 to-black">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
                        <motion.div
                            whileHover={{ y: -10, scale: 1.02 }}
                            className="md:col-span-2 glass-panel p-6 sm:p-10 lg:p-12 rounded-[1.5rem] sm:rounded-[2rem] lg:rounded-[2.5rem] flex flex-col justify-between min-h-[220px] sm:min-h-[320px] lg:h-[400px] group transition-all duration-500 hover:border-purple-500/50"
                        >
                            <Cpu className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-emerald-500 mb-4 sm:mb-6 group-hover:rotate-12 transition-transform" />
                            <div>
                                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white mb-3 sm:mb-4 italic">Next-Gen Stack</h3>
                                <p className="text-gray-500 text-sm sm:text-base lg:text-lg">Next.js 15, React 19, TypeScript, Payload 3, and Tailwind 4. The bleeding edge of SaaS development.</p>
                            </div>
                        </motion.div>
                        <motion.div
                            whileHover={{ y: -10, scale: 1.02 }}
                            className="glass-panel p-6 sm:p-10 lg:p-12 rounded-[1.5rem] sm:rounded-[2rem] lg:rounded-[2.5rem] bg-emerald-600/10 border-emerald-500/20 min-h-[220px] sm:min-h-[320px] lg:h-[400px] flex flex-col justify-between group transition-all duration-500 hover:border-teal-500/50"
                        >
                            <Zap className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-teal-400 mb-4 sm:mb-6 group-hover:scale-125 transition-transform" />
                            <div>
                                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white mb-3 sm:mb-4 italic">Speed.</h3>
                                <p className="text-gray-500 text-sm sm:text-base lg:text-lg font-medium">Core Web Vitals optimized out of the box. 100/100 performance scores aren&apos;t a goal—they&apos;re the baseline.</p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            <section id="pricing" className="relative py-16 sm:py-24 lg:py-40 px-4 sm:px-6 lg:px-20 overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.08),transparent_45%),radial-gradient(circle_at_bottom_right,rgba(124,58,237,0.10),transparent_40%)]" />

                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="max-w-3xl mb-8 sm:mb-14">
                        <h2 className="text-xs font-black uppercase tracking-[0.4em] sm:tracking-[0.5em] text-emerald-500 mb-3 sm:mb-4">04 — Pricing</h2>
                        <h3 className="text-3xl sm:text-5xl md:text-7xl font-black text-white italic tracking-tighter uppercase leading-none mb-4 sm:mb-6">
                            Choose the <span className="text-gray-800">build</span>
                        </h3>
                        <p className="text-gray-400 text-base sm:text-lg leading-relaxed max-w-2xl">
                            Pricing is structured around the kind of system you need: a focused launch page, a business site with CRM, or a full custom platform.
                        </p>
                    </div>

                    <div ref={pricingStripRef} className="overflow-x-auto pb-4 -mx-4 sm:-mx-6 lg:-mx-20 px-4 sm:px-6 lg:px-20 snap-x snap-mandatory touch-pan-x">
                        <div className="flex flex-row gap-4 sm:gap-6 min-w-max">
                        {[
                            {
                                name: 'Custom Website',
                                price: '$1.5k+',
                                summary: 'A tailored site for brands that need a clean custom build.',
                                features: ['Custom UI system', 'Responsive build', 'Basic CMS or forms', 'Fast delivery'],
                                accent: 'from-emerald-500 to-teal-500',
                            },
                            {
                                name: 'WordPress Website',
                                price: '$900+',
                                summary: 'A polished WordPress site for content, services, or marketing.',
                                features: ['Theme or custom build', 'SEO-ready structure', 'Content setup', 'Plugin support'],
                                accent: 'from-teal-500 to-cyan-500',
                                featured: true,
                            },
                            {
                                name: 'SaaS Platform',
                                price: '$4.5k+',
                                summary: 'For product systems, dashboards, and scalable SaaS builds.',
                                features: ['Auth + dashboards', 'API integrations', 'Database setup', 'Launch support'],
                                accent: 'from-cyan-500 to-emerald-400',
                            },
                            {
                                name: 'Custom Order',
                                price: 'Custom',
                                summary: 'For larger, mixed-scope work like ecommerce, CRM, and migrations.',
                                features: ['Multi-page build', 'CRM + automation', 'Ecommerce or SaaS', 'Ongoing support'],
                                accent: 'from-emerald-500 to-cyan-500',
                            },
                        ].map((plan) => (
                            <motion.div
                                key={plan.name}
                                initial={{ opacity: 0, y: 24 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6 }}
                                className={`snap-start shrink-0 w-[80vw] sm:w-[72vw] md:w-[28rem] lg:w-[30rem] glass-panel relative overflow-hidden rounded-[1.5rem] sm:rounded-[2rem] p-5 sm:p-8 border ${plan.featured ? 'border-emerald-500/30 bg-white/5' : 'border-white/10'}`}
                            >
                                <div className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${plan.accent} opacity-80`} />
                                <div className="flex items-start justify-between gap-3 mb-5 sm:mb-8">
                                    <div className="min-w-0">
                                        <p className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.4em] sm:tracking-[0.5em] text-emerald-500 mb-2 sm:mb-3">Package</p>
                                        <h4 className="text-xl sm:text-2xl lg:text-3xl font-black text-white italic tracking-tight uppercase leading-tight">{plan.name}</h4>
                                        <p className="text-gray-400 mt-2 sm:mt-3 text-xs sm:text-sm leading-relaxed">{plan.summary}</p>
                                    </div>
                                    <div className={`flex-shrink-0 px-3 py-1.5 rounded-full border border-white/10 bg-black/30 text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] sm:tracking-[0.35em] bg-gradient-to-r ${plan.accent} bg-clip-text text-transparent`}>
                                        {plan.price}
                                    </div>
                                </div>

                                <div className="space-y-2 sm:space-y-3 mb-5 sm:mb-8">
                                    {plan.features.map((feature) => (
                                        <div key={feature} className="flex items-center gap-3 rounded-xl sm:rounded-2xl border border-white/5 bg-black/20 px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm text-white/80">
                                            <span className="h-1.5 w-1.5 sm:h-2 sm:w-2 flex-shrink-0 rounded-full bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.75)]" />
                                            {feature}
                                        </div>
                                    ))}
                                </div>

                                <div className="flex gap-2 sm:gap-3">
                                    <Link href="/order" className="flex-1 rounded-full bg-white text-black px-3 sm:px-5 py-2.5 sm:py-3 text-[9px] sm:text-[10px] font-black uppercase tracking-[0.25em] sm:tracking-[0.35em] text-center hover:scale-[1.02] transition-transform">
                                        Order Now
                                    </Link>
                                    <Link href="/contact" className="flex-1 rounded-full border border-white/10 bg-black/20 px-3 sm:px-5 py-2.5 sm:py-3 text-[9px] sm:text-[10px] font-black uppercase tracking-[0.25em] sm:tracking-[0.35em] text-white text-center hover:border-white/30 transition-colors">
                                        Ask First
                                    </Link>
                                </div>
                            </motion.div>
                        ))}
                        </div>
                    </div>
                </div>
            </section>

            <Terminal />
        </main>
    )
}

