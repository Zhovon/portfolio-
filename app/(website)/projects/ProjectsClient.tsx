'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, Layers, Filter, ExternalLink } from 'lucide-react'
import Link from 'next/link'
import type { Project } from '@/data/projects'

export function ProjectsClient({ projects }: { projects: Project[] }) {
    const [selectedCategory, setSelectedCategory] = useState<string>('All')

    const categories = useMemo(() => {
        const set = new Set<string>()
        projects.forEach(p => {
            if (p.category) set.add(p.category)
        })
        return ['All', ...Array.from(set)]
    }, [projects])

    const filteredProjects = useMemo(() => {
        if (selectedCategory === 'All') return projects
        return projects.filter(p => p.category?.toLowerCase() === selectedCategory.toLowerCase())
    }, [projects, selectedCategory])

    return (
        <main className="min-h-screen bg-black pt-28 sm:pt-32 pb-20 px-4 sm:px-6 md:px-10 lg:px-20 overflow-x-hidden">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 sm:mb-16 md:mb-20 gap-8">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                    >
                        <Link href="/" className="inline-flex items-center gap-2 text-gray-500 hover:text-white transition-colors mb-6 group">
                            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                            <span className="text-xs uppercase tracking-widest font-bold">Back to Genesis</span>
                        </Link>
                        <h1 className="text-4xl xs:text-5xl sm:text-6xl md:text-8xl font-black text-white tracking-tighter uppercase italic break-words">
                            The <span className="text-gray-700">Archive</span>
                        </h1>
                    </motion.div>

                    {/* Filter Pills */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex flex-wrap items-center gap-2 sm:gap-3 glass-panel px-4 py-2 sm:px-5 sm:py-2.5 rounded-full border-white/5"
                    >
                        <Filter className="w-3.5 h-3.5 text-purple-400 mr-1" />
                        {categories.map(cat => {
                            const isSelected = selectedCategory === cat
                            return (
                                <button
                                    key={cat}
                                    onClick={() => setSelectedCategory(cat)}
                                    className={`text-[10px] uppercase tracking-widest px-3 py-1 rounded-full transition-all cursor-pointer font-bold ${
                                        isSelected
                                            ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30'
                                            : 'text-gray-400 hover:text-white hover:bg-white/5'
                                    }`}
                                >
                                    {cat}
                                </button>
                            )
                        })}
                    </motion.div>
                </div>

                {/* Project Grid */}
                <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-x-8 lg:gap-x-12 gap-y-12 sm:gap-y-16 lg:gap-y-20">
                    <AnimatePresence mode="popLayout">
                        {filteredProjects.map((project, idx) => (
                            <motion.div
                                layout
                                key={project.id}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.4, delay: idx * 0.05 }}
                                className="group"
                            >
                                <Link href={`/projects/${project.slug}`} className="block">
                                    <div className="aspect-[16/10] rounded-2xl sm:rounded-3xl overflow-hidden glass-panel relative mb-6 border border-white/5 group-hover:border-purple-500/50 transition-all duration-500 group-hover:-translate-y-2 shadow-2xl">
                                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-70 z-10" />

                                        {project.image ? (
                                            <img
                                                src={project.image}
                                                alt={project.title}
                                                className="w-full h-full object-cover opacity-60 group-hover:opacity-90 transition-all duration-700 group-hover:scale-105"
                                            />
                                        ) : (
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <Layers className="w-16 h-16 text-white/5 group-hover:text-purple-500 group-hover:scale-110 transition-all duration-700" />
                                            </div>
                                        )}

                                        {/* Floating Tag */}
                                        <div className="absolute top-4 sm:top-6 left-4 sm:left-6 z-20">
                                            <div className="glass-panel px-3.5 py-1 rounded-full text-[9px] font-black uppercase tracking-[0.2em] text-purple-300 border border-purple-500/20 bg-black/40">
                                                {project.category || project.technologies?.[0] || 'Artifact'}
                                            </div>
                                        </div>

                                        <div className="absolute bottom-4 sm:bottom-6 right-4 sm:right-6 z-20 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <div className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center shadow-lg">
                                                <ExternalLink className="w-4 h-4" />
                                            </div>
                                        </div>
                                    </div>
                                </Link>

                                <div className="flex justify-between items-start gap-4">
                                    <div className="min-w-0 flex-1">
                                        <Link href={`/projects/${project.slug}`}>
                                            <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-2 group-hover:text-purple-400 transition-colors uppercase italic truncate">
                                                {project.title}
                                            </h3>
                                        </Link>
                                        <p className="text-gray-400 font-normal text-sm sm:text-base line-clamp-2 leading-relaxed">
                                            {project.description}
                                        </p>
                                    </div>
                                    <div className="text-[10px] font-mono text-gray-600 uppercase tracking-widest flex-shrink-0 pt-1">
                                        Active
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>

                {filteredProjects.length === 0 && (
                    <div className="text-center py-24 glass-panel rounded-3xl border border-white/5">
                        <Layers className="w-12 h-12 text-gray-700 mx-auto mb-4" />
                        <h3 className="text-xl font-bold text-white mb-2">No projects found</h3>
                        <p className="text-sm text-gray-500 mb-6">No artifacts cataloged under &ldquo;{selectedCategory}&rdquo;.</p>
                        <button
                            onClick={() => setSelectedCategory('All')}
                            className="px-6 py-2.5 rounded-full bg-white text-black text-xs font-bold uppercase tracking-wider hover:bg-gray-200 transition-colors cursor-pointer"
                        >
                            Reset Filter
                        </button>
                    </div>
                )}
            </div>
        </main>
    )
}
