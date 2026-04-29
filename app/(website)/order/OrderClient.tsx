'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowLeft, Loader2, ShieldCheck, Sparkles, Mail, User, MessageSquare, DollarSign } from 'lucide-react'

const plans = [
    {
        id: 'custom-website',
        name: 'Custom Website',
        price: '$1.5k+',
        summary: 'A tailored custom build for brands and service businesses.',
    },
    {
        id: 'wordpress-website',
        name: 'WordPress Website',
        price: '$900+',
        summary: 'A polished WordPress site with CMS, structure, and SEO support.',
    },
    {
        id: 'saas-platform',
        name: 'SaaS Platform',
        price: '$4.5k+',
        summary: 'Dashboards, auth, APIs, and scalable product builds.',
    },
    {
        id: 'custom-order',
        name: 'Custom Order',
        price: 'Custom',
        summary: 'Ecommerce, CRM, migrations, and larger scope builds.',
    },
]

export function OrderClient() {
    const [selectedPlan, setSelectedPlan] = useState('custom-website')
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [budget, setBudget] = useState('')
    const [details, setDetails] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState(false)

    const activePlan = useMemo(() => plans.find((plan) => plan.id === selectedPlan) || plans[1], [selectedPlan])

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setError('')
        setLoading(true)

        try {
            const response = await fetch('/api/order', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name,
                    email,
                    packageType: activePlan.name,
                    budget,
                    details,
                }),
            })

            const data = await response.json()

            if (!response.ok || !data.success) {
                setError(data.error || 'Failed to submit order')
                return
            }

            setSuccess(true)
            setName('')
            setEmail('')
            setBudget('')
            setDetails('')
        } catch (submitError) {
            console.error(submitError)
            setError('Transmission failed. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <main className="min-h-screen bg-[#020202] pt-32 pb-20 px-6 lg:px-20 overflow-hidden relative">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(16,185,129,0.08),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(124,58,237,0.10),transparent_40%)]" />
            <div className="max-w-7xl mx-auto relative z-10">
                <Link href="/" className="flex items-center gap-2 text-gray-500 hover:text-white transition-colors mb-16 group">
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    <span className="text-xs uppercase tracking-widest font-bold">Back to Orbit</span>
                </Link>

                <div className="grid lg:grid-cols-[0.9fr,1.1fr] gap-10 lg:gap-16 items-start">
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-10"
                    >
                        <div>
                            <p className="text-[10px] font-black uppercase tracking-[0.5em] text-emerald-500 mb-4">05 — Order</p>
                            <h1 className="text-6xl md:text-8xl font-black text-white italic tracking-tighter uppercase leading-none mb-6">
                                Start the <span className="text-gray-800">build</span>
                            </h1>
                            <p className="text-gray-400 text-lg leading-relaxed max-w-xl">
                                Tell me what you need and I’ll turn it into a scoped package, whether that is a custom code site, a CRM-powered business build, or a WordPress and ecommerce system.
                            </p>
                        </div>

                        <div className="overflow-x-auto pb-3 -mx-1 px-1 snap-x snap-mandatory touch-pan-y">
                            <div className="flex flex-col md:flex-row gap-4 md:min-w-max">
                            {plans.map((plan) => {
                                const selected = selectedPlan === plan.id

                                return (
                                    <button
                                        key={plan.id}
                                        type="button"
                                        onClick={() => setSelectedPlan(plan.id)}
                                        className={`snap-start text-left rounded-[1.75rem] border p-5 transition-all shrink-0 w-full md:w-[18rem] ${selected ? 'border-emerald-500/40 bg-white/5' : 'border-white/10 bg-white/[0.03] hover:border-white/20'}`}
                                    >
                                        <div className="flex items-center justify-between gap-4">
                                            <div>
                                                <p className="text-sm font-black uppercase tracking-[0.35em] text-white">{plan.name}</p>
                                                <p className="text-sm text-gray-400 mt-2 max-w-md">{plan.summary}</p>
                                            </div>
                                            <span className="text-xs font-black uppercase tracking-[0.35em] text-emerald-400">{plan.price}</span>
                                        </div>
                                    </button>
                                )
                            })}
                            </div>
                        </div>

                        <div className="glass-panel rounded-[1.75rem] p-6 border border-white/10">
                            <div className="flex items-center gap-3 mb-4">
                                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                                <h2 className="text-sm font-black uppercase tracking-[0.4em] text-white">What this includes</h2>
                            </div>
                            <div className="grid gap-3 text-sm text-gray-400">
                                {[
                                    'Discovery call and scope alignment',
                                    'UI direction matched to your brand',
                                    'Implementation in the same dark, sharp style you approved',
                                    'Clear handoff for content, CRM, or hosting setup',
                                ].map((item) => (
                                    <div key={item} className="rounded-2xl border border-white/5 bg-black/20 px-4 py-3">
                                        {item}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="relative"
                    >
                        <div className="glass-panel rounded-[2rem] border border-white/10 overflow-hidden">
                            <div className="p-6 md:p-8 border-b border-white/10 bg-black/20">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                                        <Sparkles className="w-5 h-5 text-emerald-400" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black uppercase tracking-[0.5em] text-emerald-500">Selected Package</p>
                                        <p className="text-xl font-black text-white italic uppercase tracking-tight">{activePlan.name}</p>
                                    </div>
                                </div>
                                <p className="text-gray-400 mt-4 text-sm leading-relaxed">{activePlan.summary}</p>
                            </div>

                            <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-5">
                                <div className="grid md:grid-cols-2 gap-5">
                                    <label className="space-y-2">
                                        <span className="text-[10px] font-black uppercase tracking-[0.35em] text-white/50">Your name</span>
                                        <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-black/25 px-4 py-3">
                                            <User className="w-4 h-4 text-emerald-400" />
                                            <input
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                required
                                                className="w-full bg-transparent outline-none text-white placeholder:text-gray-600"
                                                placeholder="Shahadat Hossain"
                                            />
                                        </div>
                                    </label>

                                    <label className="space-y-2">
                                        <span className="text-[10px] font-black uppercase tracking-[0.35em] text-white/50">Email</span>
                                        <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-black/25 px-4 py-3">
                                            <Mail className="w-4 h-4 text-emerald-400" />
                                            <input
                                                type="email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                required
                                                className="w-full bg-transparent outline-none text-white placeholder:text-gray-600"
                                                placeholder="you@company.com"
                                            />
                                        </div>
                                    </label>
                                </div>

                                <div className="grid md:grid-cols-2 gap-5">
                                    <label className="space-y-2">
                                        <span className="text-[10px] font-black uppercase tracking-[0.35em] text-white/50">Budget</span>
                                        <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-black/25 px-4 py-3">
                                            <DollarSign className="w-4 h-4 text-emerald-400" />
                                            <input
                                                value={budget}
                                                onChange={(e) => setBudget(e.target.value)}
                                                className="w-full bg-transparent outline-none text-white placeholder:text-gray-600"
                                                placeholder="$3k - $8k"
                                            />
                                        </div>
                                    </label>

                                    <label className="space-y-2">
                                        <span className="text-[10px] font-black uppercase tracking-[0.35em] text-white/50">Package</span>
                                        <select
                                            value={selectedPlan}
                                            onChange={(e) => setSelectedPlan(e.target.value)}
                                            className="w-full rounded-2xl border border-white/10 bg-black/25 px-4 py-3 text-white outline-none"
                                        >
                                            {plans.map((plan) => (
                                                <option key={plan.id} value={plan.id} className="bg-black text-white">
                                                    {plan.name}
                                                </option>
                                            ))}
                                        </select>
                                    </label>
                                </div>

                                <label className="space-y-2 block">
                                    <span className="text-[10px] font-black uppercase tracking-[0.35em] text-white/50">Project details</span>
                                    <div className="flex items-start gap-3 rounded-[1.5rem] border border-white/10 bg-black/25 px-4 py-4">
                                        <MessageSquare className="w-4 h-4 text-emerald-400 mt-1" />
                                        <textarea
                                            value={details}
                                            onChange={(e) => setDetails(e.target.value)}
                                            required
                                            rows={7}
                                            className="w-full resize-none bg-transparent outline-none text-white placeholder:text-gray-600"
                                            placeholder="What do you need built, redesigned, migrated, or automated?"
                                        />
                                    </div>
                                </label>

                                {error && (
                                    <div className="rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                                        {error}
                                    </div>
                                )}

                                {success && (
                                    <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-300">
                                        Request received. I’ll review it and get back to you.
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full rounded-full bg-white text-black px-6 py-4 text-[10px] font-black uppercase tracking-[0.45em] hover:scale-[1.01] transition-transform flex items-center justify-center gap-3 disabled:opacity-60"
                                >
                                    {loading ? (
                                        <>
                                            <Loader2 className="w-4 h-4 animate-spin" />
                                            Sending
                                        </>
                                    ) : (
                                        'Send Order'
                                    )}
                                </button>
                            </form>
                        </div>
                    </motion.div>
                </div>
            </div>
        </main>
    )
}
