'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import {
    Mail,
    Phone,
    ArrowLeft,
    TrendingUp,
    Target,
    Users,
    Briefcase,
    CheckCircle,
    ChevronRight,
    CreditCard,
    Globe,
    Star,
    Layers,
    BarChart3,
    Lightbulb,
    Handshake,
} from 'lucide-react'

const SERVICES = [
    {
        icon: TrendingUp,
        title: 'Growth Strategy',
        description: 'Data-driven frameworks that accelerate market penetration, revenue growth, and sustainable scaling for ambitious businesses.',
        color: 'amber',
    },
    {
        icon: Layers,
        title: 'Brand Development',
        description: 'Crafting compelling brand identities and positioning strategies that resonate with target audiences and build long-term equity.',
        color: 'yellow',
    },
    {
        icon: BarChart3,
        title: 'Operational Excellence',
        description: 'Streamlining processes, eliminating inefficiencies, and building robust operational frameworks that enable scale without chaos.',
        color: 'amber',
    },
    {
        icon: Users,
        title: 'Client Relations',
        description: 'Building and nurturing high-value client relationships through strategic communication and exceptional service delivery.',
        color: 'yellow',
    },
    {
        icon: Globe,
        title: 'Market Expansion',
        description: 'Navigating new market entry across the MENA region with localised insight, strategic partnerships, and risk management.',
        color: 'amber',
    },
    {
        icon: Lightbulb,
        title: 'Business Innovation',
        description: 'Identifying transformative opportunities and guiding organisations through innovation cycles to stay ahead of the curve.',
        color: 'yellow',
    },
]

const PROCESS = [
    { step: '01', label: 'Discover', description: 'Deep-dive into your business landscape, goals, competitive environment, and pain points.' },
    { step: '02', label: 'Strategise', description: 'Develop a tailored, actionable roadmap aligned with your vision and market realities.' },
    { step: '03', label: 'Execute', description: 'Hands-on guidance through implementation, keeping momentum and ensuring quality outcomes.' },
    { step: '04', label: 'Review', description: 'Measure results against KPIs, refine strategy, and lock in continuous improvement cycles.' },
]

const STATS = [
    { value: '7+', label: 'Years Experience' },
    { value: '50+', label: 'Clients Served' },
    { value: 'MENA', label: 'Regional Focus' },
    { value: '100%', label: 'Commitment' },
]

const EXPERTISE = [
    'Growth Strategy', 'Brand Positioning', 'Market Analysis', 'Operations Management',
    'Client Acquisition', 'Revenue Optimization', 'Team Leadership', 'Business Development',
    'MENA Markets', 'Stakeholder Management', 'Process Design', 'KPI Frameworks',
    'Growth Strategy', 'Brand Positioning', 'Market Analysis', 'Operations Management',
    'Client Acquisition', 'Revenue Optimization', 'Team Leadership', 'Business Development',
]

export function RashedClient() {
    return (
        <main className="relative min-h-screen w-full overflow-hidden z-10">
            {/* Ambient glows */}
            <div className="pointer-events-none fixed inset-0">
                <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-amber-500/5 rounded-full blur-[150px]" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-yellow-600/4 rounded-full blur-[120px]" />
            </div>

            {/* ── HERO ── */}
            <section className="relative min-h-[100vh] flex items-center justify-center px-6 lg:px-20 pt-32 pb-20">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(245,158,11,0.08),transparent_50%)]" />

                <div className="max-w-7xl mx-auto w-full">
                    {/* Back link */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="mb-16"
                    >
                        <Link
                            href="/"
                            className="flex items-center gap-2 text-amber-500/60 hover:text-amber-400 transition-colors group w-fit"
                        >
                            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                            <span className="text-xs uppercase tracking-widest font-bold">Return to Base</span>
                        </Link>
                    </motion.div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
                        {/* Left: Identity */}
                        <div>
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.7 }}
                            >
                                <div className="flex items-center gap-3 mb-6">
                                    <span className="text-[10px] font-black uppercase tracking-[0.5em] text-amber-500">ZHOVON Consulting</span>
                                    <div className="h-[1px] w-12 bg-amber-500/30" />
                                    <span className="flex items-center gap-1.5">
                                        <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse shadow-[0_0_8px_rgba(245,158,11,0.8)]" />
                                        <span className="text-[9px] font-bold uppercase tracking-widest text-amber-400">Available</span>
                                    </span>
                                </div>

                                <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white tracking-tighter uppercase italic leading-none mb-6">
                                    Md<br />
                                    <span className="bg-gradient-to-r from-amber-400 to-yellow-300 bg-clip-text text-transparent">Rashed</span><br />
                                    Khan
                                </h1>

                                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-amber-500/30 bg-amber-500/10 mb-8">
                                    <Briefcase className="w-3.5 h-3.5 text-amber-400" />
                                    <span className="text-xs font-black uppercase tracking-wider text-amber-300">Business Consultant</span>
                                </div>

                                <p className="text-gray-400 text-lg font-medium leading-relaxed max-w-xl mb-8">
                                    A results-driven strategist helping ambitious organisations unlock their full potential. Specialising in growth, brand excellence, and operational mastery across the{' '}
                                    <span className="text-amber-400">MENA region</span> and beyond.
                                </p>

                                {/* CTA Buttons */}
                                <div className="flex flex-wrap gap-3">
                                    <Link
                                        href="/card/rashed"
                                        className="flex items-center gap-2 px-6 py-3 rounded-full bg-amber-500 text-black text-[10px] font-black uppercase tracking-[0.3em] hover:bg-amber-400 transition-colors shadow-[0_0_30px_rgba(245,158,11,0.4)]"
                                    >
                                        <CreditCard className="w-4 h-4" />
                                        View Digital Card
                                    </Link>
                                    <a
                                        href="mailto:rashedkhan25003@gmail.com"
                                        className="flex items-center gap-2 px-6 py-3 rounded-full glass-panel border-amber-500/20 text-white text-[10px] font-black uppercase tracking-[0.3em] hover:border-amber-500/50 transition-all"
                                    >
                                        <Mail className="w-4 h-4 text-amber-400" />
                                        Get in Touch
                                    </a>
                                </div>
                            </motion.div>
                        </div>

                        {/* Right: Photo + Stats */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="flex flex-col items-center gap-8"
                        >
                            {/* Avatar */}
                            <div className="relative">
                                <div className="absolute -inset-4 rounded-[2.5rem] bg-gradient-to-br from-amber-500/20 to-yellow-500/10 blur-xl" />
                                <div className="relative w-72 h-72 lg:w-80 lg:h-80 rounded-[2.5rem] overflow-hidden border-2 border-amber-500/30 shadow-[0_0_60px_rgba(245,158,11,0.2)]">
                                    <Image
                                        src="/images/rashed-avatar.png"
                                        alt="Md Rashed Khan — Business Consultant"
                                        fill
                                        className="object-cover"
                                        priority
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                                    <div className="absolute bottom-4 left-4 right-4">
                                        <p className="text-[9px] font-black uppercase tracking-[0.4em] text-amber-400 mb-1">Strategic Consultant</p>
                                        <p className="text-white font-bold text-sm">Growth • Brand • Operations</p>
                                    </div>
                                </div>
                            </div>

                            {/* Stats Grid */}
                            <div className="grid grid-cols-2 gap-3 w-full max-w-xs">
                                {STATS.map((stat) => (
                                    <div
                                        key={stat.label}
                                        className="glass-panel rounded-2xl p-4 border-amber-500/10 text-center"
                                    >
                                        <p className="text-2xl font-black text-amber-400 mb-1">{stat.value}</p>
                                        <p className="text-[9px] uppercase tracking-widest text-white/40 font-bold">{stat.label}</p>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ── EXPERTISE MARQUEE ── */}
            <section className="relative py-12 overflow-hidden border-y border-amber-500/10">
                <div className="absolute inset-0 bg-amber-500/3" />
                <div className="relative overflow-hidden">
                    <motion.div
                        animate={{ x: ['0%', '-50%'] }}
                        transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
                        className="flex w-max items-center gap-4 whitespace-nowrap px-4"
                    >
                        {EXPERTISE.map((item, i) => (
                            <span
                                key={`${item}-${i}`}
                                className="flex items-center gap-3 px-5 py-2.5 rounded-full border border-amber-500/15 bg-amber-500/5 text-[10px] font-black uppercase tracking-[0.35em] text-amber-400/70"
                            >
                                <Star className="w-2.5 h-2.5 text-amber-500 fill-amber-500" />
                                {item}
                            </span>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* ── ABOUT ── */}
            <section className="relative py-32 px-6 lg:px-20">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
                    >
                        <div>
                            <p className="text-[10px] font-black uppercase tracking-[0.5em] text-amber-500 mb-4">01 — Identity</p>
                            <h2 className="text-4xl md:text-6xl font-black text-white italic tracking-tighter uppercase leading-none mb-8">
                                The <span className="text-gray-700">Strategist</span>
                            </h2>
                            <div className="space-y-5 text-gray-400 text-lg leading-relaxed">
                                <p>
                                    I am <strong className="text-white">Md Rashed Khan</strong>, a business consultant with over 7 years of experience helping companies define their direction and execute with precision.
                                </p>
                                <p>
                                    My approach bridges the gap between high-level strategy and ground-level execution — combining <span className="text-amber-400">market intelligence</span>, brand clarity, and operational discipline to deliver outcomes that matter.
                                </p>
                                <p>
                                    Based in Saudi Arabia, I work with organisations across the MENA region seeking <span className="text-amber-300 italic border-b border-amber-500/30">sustainable, measurable growth.</span>
                                </p>
                            </div>

                            <div className="mt-10 flex flex-wrap gap-3">
                                <a
                                    href="tel:+966562101651"
                                    className="flex items-center gap-2 glass-panel rounded-2xl px-5 py-3 border-amber-500/15 text-sm text-white/70 hover:text-amber-300 hover:border-amber-500/35 transition-all"
                                >
                                    <Phone className="w-4 h-4 text-amber-400" />
                                    +966 56 210 1651
                                </a>
                                <a
                                    href="mailto:rashedkhan25003@gmail.com"
                                    className="flex items-center gap-2 glass-panel rounded-2xl px-5 py-3 border-amber-500/15 text-sm text-white/70 hover:text-amber-300 hover:border-amber-500/35 transition-all"
                                >
                                    <Mail className="w-4 h-4 text-amber-400" />
                                    rashedkhan25003@gmail.com
                                </a>
                            </div>
                        </div>

                        {/* Value props */}
                        <div className="space-y-4">
                            {[
                                { icon: Target, title: 'Outcome-Focused', desc: 'Every strategy is built around measurable KPIs and real business results — not vanity metrics.' },
                                { icon: Handshake, title: 'Partnership Mindset', desc: 'I embed with your team, not just advise from a distance. Your success is my success.' },
                                { icon: BarChart3, title: 'Data-Informed', desc: 'Decisions grounded in market data, customer insight, and competitive intelligence.' },
                            ].map((item, i) => (
                                <motion.div
                                    key={item.title}
                                    initial={{ opacity: 0, x: 40 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6, delay: i * 0.12 }}
                                    className="group glass-panel rounded-2xl p-6 border-white/5 hover:border-amber-500/25 transition-all cursor-default"
                                >
                                    <div className="flex items-start gap-4">
                                        <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center flex-shrink-0 group-hover:bg-amber-500/15 transition-colors">
                                            <item.icon className="w-5 h-5 text-amber-400" />
                                        </div>
                                        <div>
                                            <h4 className="text-white font-black text-sm uppercase tracking-wider mb-1">{item.title}</h4>
                                            <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ── SERVICES ── */}
            <section className="relative py-32 px-6 lg:px-20">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(245,158,11,0.05),transparent_60%)]" />
                <div className="max-w-7xl mx-auto relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mb-16"
                    >
                        <p className="text-[10px] font-black uppercase tracking-[0.5em] text-amber-500 mb-4">02 — Services</p>
                        <h2 className="text-4xl md:text-6xl font-black text-white italic tracking-tighter uppercase leading-none">
                            What I <span className="text-gray-700">Deliver</span>
                        </h2>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                        {SERVICES.map((service, i) => (
                            <motion.div
                                key={service.title}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: i * 0.08 }}
                                className="group glass-panel rounded-[1.5rem] p-7 border-white/5 hover:border-amber-500/30 transition-all duration-500 relative overflow-hidden cursor-default"
                            >
                                <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity duration-500 group-hover:scale-110 transform">
                                    <service.icon className="w-24 h-24 text-amber-400" />
                                </div>
                                <div className="relative z-10">
                                    <div className="w-11 h-11 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mb-5 group-hover:bg-amber-500/15 transition-colors">
                                        <service.icon className="w-5 h-5 text-amber-400" />
                                    </div>
                                    <h3 className="text-lg font-black text-white italic tracking-tight mb-3">{service.title}</h3>
                                    <p className="text-gray-500 text-sm leading-relaxed">{service.description}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── PROCESS ── */}
            <section className="relative py-32 px-6 lg:px-20 overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-amber-500/20 to-transparent" />
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mb-16"
                    >
                        <p className="text-[10px] font-black uppercase tracking-[0.5em] text-amber-500 mb-4">03 — Process</p>
                        <h2 className="text-4xl md:text-6xl font-black text-white italic tracking-tighter uppercase leading-none">
                            How We <span className="text-gray-700">Work</span>
                        </h2>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 relative">
                        {/* Connector line (desktop) */}
                        <div className="hidden lg:block absolute top-8 left-[12.5%] right-[12.5%] h-[1px] bg-gradient-to-r from-amber-500/30 via-amber-500/10 to-amber-500/30" />

                        {PROCESS.map((step, i) => (
                            <motion.div
                                key={step.step}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: i * 0.15 }}
                                className="relative group"
                            >
                                <div className="glass-panel rounded-[1.5rem] p-7 border-white/5 hover:border-amber-500/25 transition-all h-full">
                                    <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/25 flex items-center justify-center mb-5 group-hover:bg-amber-500/15 transition-colors">
                                        <span className="text-xs font-black text-amber-400 font-mono">{step.step}</span>
                                    </div>
                                    <h4 className="text-xl font-black text-white italic tracking-tight mb-3">{step.label}</h4>
                                    <p className="text-gray-500 text-sm leading-relaxed">{step.description}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── CTA ── */}
            <section className="relative py-32 px-6 lg:px-20">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(245,158,11,0.07),transparent_55%)]" />
                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <p className="text-[10px] font-black uppercase tracking-[0.5em] text-amber-500 mb-6">04 — Connect</p>
                        <h2 className="text-4xl md:text-7xl font-black text-white italic tracking-tighter uppercase leading-none mb-6">
                            Let's Build<br />
                            <span className="bg-gradient-to-r from-amber-400 to-yellow-300 bg-clip-text text-transparent">Something Great.</span>
                        </h2>
                        <p className="text-gray-400 text-xl leading-relaxed mb-12 max-w-2xl mx-auto">
                            Whether you're launching a new venture, scaling an existing business, or navigating a strategic pivot — let's talk.
                        </p>

                        <div className="flex flex-wrap justify-center gap-4">
                            <Link
                                href="/card/rashed"
                                className="flex items-center gap-3 px-8 py-4 rounded-full bg-amber-500 text-black text-xs font-black uppercase tracking-[0.35em] hover:bg-amber-400 transition-colors shadow-[0_0_40px_rgba(245,158,11,0.4)] hover:shadow-[0_0_60px_rgba(245,158,11,0.5)]"
                            >
                                <CreditCard className="w-4 h-4" />
                                Get Digital Card
                            </Link>
                            <a
                                href="mailto:rashedkhan25003@gmail.com"
                                className="flex items-center gap-3 px-8 py-4 rounded-full glass-panel border-amber-500/25 text-white text-xs font-black uppercase tracking-[0.35em] hover:border-amber-500/50 transition-all"
                            >
                                <Mail className="w-4 h-4 text-amber-400" />
                                Send Email
                            </a>
                            <a
                                href="tel:+966562101651"
                                className="flex items-center gap-3 px-8 py-4 rounded-full glass-panel border-white/10 text-white text-xs font-black uppercase tracking-[0.35em] hover:border-white/25 transition-all"
                            >
                                <Phone className="w-4 h-4 text-amber-400" />
                                Call Now
                            </a>
                        </div>

                        {/* Powered by */}
                        <div className="mt-16 pt-8 border-t border-white/5">
                            <p className="text-xs text-white/20 uppercase tracking-widest font-bold">
                                Consulting services powered by{' '}
                                <Link href="/" className="text-white/35 hover:text-white/50 transition-colors">
                                    ZHOVON
                                </Link>
                            </p>
                        </div>
                    </motion.div>
                </div>
            </section>
        </main>
    )
}
