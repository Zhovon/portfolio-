'use client'

import { motion } from 'framer-motion'
import { ArrowLeft, Layers, Filter } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useMemo, useState } from 'react'
import { Project } from '@/data/projects'

const FILTERS: { label: string; keywords: RegExp | null }[] = [
    { label: 'All', keywords: null },
    { label: 'AI', keywords: /\bai\b/i },
    { label: 'E-Commerce', keywords: /commerce|shopify/i },
    { label: 'WordPress / CMS', keywords: /wordpress|cms/i },
    { label: 'Enterprise', keywords: /enterprise|corporate|business|management|crm/i },
    { label: 'SaaS & Tools', keywords: /saas|devtools|tools|utilities|platform|apps?\b/i },
]

function matchesFilter(project: Project, keywords: RegExp | null): boolean {
    if (!keywords) return true
    const haystack = `${project.category || ''} ${project.technologies?.join(' ') || ''}`
    return keywords.test(haystack)
}

export function ProjectsClient({ projects }: { projects: Project[] }) {
    const [activeFilter, setActiveFilter] = useState('All')

    const filtered = useMemo(() => {
        const filter = FILTERS.find((f) => f.label === activeFilter) || FILTERS[0]
        return projects.filter((p) => matchesFilter(p, filter.keywords))
    }, [projects, activeFilter])

    return (
        <main className="min-h-screen bg-black pt-32 pb-20 px-6 lg:px-20">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-10">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                    >
                        <Link href="/" className="flex items-center gap-2 text-gray-500 hover:text-white transition-colors mb-8 group">
                            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                            <span className="text-xs uppercase tracking-widest font-bold">Back to Genesis</span>
                        </Link>
                        <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter uppercase italic">
                            The <span className="text-gray-800">Archive</span>
                        </h1>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex flex-wrap items-center gap-x-6 gap-y-3 glass-panel px-6 py-3 rounded-full border-white/5"
                    >
                        <Filter className="w-3 h-3 text-purple-500" />
                        {FILTERS.map((f) => (
                            <button
                                key={f.label}
                                onClick={() => setActiveFilter(f.label)}
                                className={`text-[10px] uppercase tracking-widest transition-colors ${
                                    activeFilter === f.label ? 'text-purple-400 font-black' : 'text-gray-400 hover:text-white'
                                }`}
                            >
                                {f.label}
                            </button>
                        ))}
                    </motion.div>
                </div>

                {/* Project Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-20">
                    {filtered.map((project, idx) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: (idx % 2) * 0.1 }}
                            viewport={{ once: true, amount: 0.2 }}
                            className="group"
                        >
                            <Link href={`/projects/${project.slug}`}>
                                <div className="aspect-[16/10] rounded-3xl overflow-hidden glass-panel relative mb-8 border border-white/5 group-hover:border-purple-500/50 transition-all duration-500 hover:translate-y-[-10px]">
                                    <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60 z-10" />

                                    {project.image ? (
                                        <Image
                                            src={project.image}
                                            alt={project.title}
                                            fill
                                            sizes="(max-width: 768px) 100vw, 50vw"
                                            className="object-cover opacity-50 group-hover:opacity-80 transition-all duration-700 group-hover:scale-105"
                                        />
                                    ) : (
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <Layers className="w-16 h-16 text-white/5 group-hover:text-purple-500 group-hover:scale-110 transition-all duration-700" />
                                        </div>
                                    )}

                                    {/* Floating Tag */}
                                    <div className="absolute top-8 left-8 z-20">
                                        <div className="glass-panel px-4 py-1.5 rounded-full text-[8px] font-black uppercase tracking-[0.2em] text-purple-400">
                                            {project.technologies?.[0] || 'Artifact'}
                                        </div>
                                    </div>
                                </div>
                            </Link>

                            <div className="flex justify-between items-start gap-4">
                                <div>
                                    <h3 className="text-3xl font-black text-white tracking-tight mb-2 group-hover:text-purple-400 transition-colors uppercase italic">{project.title}</h3>
                                    <p className="text-gray-500 font-medium max-w-sm line-clamp-2">{project.description}</p>
                                </div>
                                <div className="text-[10px] font-mono uppercase tracking-widest text-gray-600 whitespace-nowrap pt-2">
                                    {project.category?.split('/')[0].trim() || 'Build'}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {filtered.length === 0 && (
                    <p className="text-gray-600 text-sm uppercase tracking-widest text-center py-20">No artifacts match this filter.</p>
                )}
            </div>
        </main>
    )
}
