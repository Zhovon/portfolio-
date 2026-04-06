'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Github, ExternalLink, Code2, Layers, Search } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { Project } from '@/data/projects'

export function PortfolioClient({ projects }: { projects: Project[] }) {
    const [filter, setFilter] = useState<string>('All')
    
    // Get unique categories for the filter
    const categories = ['All', ...Array.from(new Set(projects.map(p => p.category).filter(Boolean)))] as string[]

    const filteredProjects = projects.filter(p => filter === 'All' || p.category === filter)

    return (
        <main className="min-h-screen pt-32 pb-20 px-6 lg:px-20 relative z-10 w-full overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                >
                    <Link href="/" className="flex items-center gap-2 text-emerald-500/70 hover:text-emerald-400 transition-colors mb-12 group w-fit">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 group-hover:-translate-x-1 transition-transform">
                            <path d="m12 19-7-7 7-7"/>
                            <path d="M19 12H5"/>
                        </svg>
                        <span className="text-xs uppercase tracking-widest font-bold">Return to Base</span>
                    </Link>
                </motion.div>
                
                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-2xl"
                    >
                        <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter uppercase italic mb-6">
                            My <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">Portfolio</span>
                        </h1>
                        <p className="text-gray-400 text-lg md:text-xl font-medium leading-relaxed">
                            A curated selection of my recent projects, spanning from highly optimized SaaS architectures and enterprise solutions to deep-space visualizers and open-source tools.
                        </p>
                    </motion.div>

                    {/* Filter Pills */}
                    <motion.div 
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex flex-wrap gap-2"
                    >
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setFilter(cat)}
                                className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300 backdrop-blur-md ${
                                    filter === cat 
                                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/50 shadow-[0_0_20px_rgba(16,185,129,0.2)]'
                                    : 'bg-white/5 text-gray-400 border border-white/5 hover:bg-white/10 hover:text-white'
                                }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </motion.div>
                </div>

                {/* Grid */}
                <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <AnimatePresence>
                        {filteredProjects.map((project, idx) => (
                            <motion.div
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.4, delay: idx * 0.05 }}
                                key={project.id}
                                className="group relative glass-panel rounded-3xl overflow-hidden border border-white/5 hover:border-emerald-500/30 transition-colors duration-500 bg-black/40 backdrop-blur-xl"
                            >
                                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-emerald-950/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                
                                {/* Image Container */}
                                <div className="relative h-64 overflow-hidden border-b border-white/5">
                                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 z-10" />
                                    {project.image ? (
                                        <Image
                                            src={project.image}
                                            alt={project.title}
                                            fill
                                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex flex-col items-center justify-center bg-zinc-900/50">
                                            <Code2 className="w-12 h-12 text-zinc-700 group-hover:text-emerald-500/50 transition-colors duration-500" />
                                        </div>
                                    )}
                                    
                                    {/* Overlay Tags */}
                                    <div className="absolute top-4 left-4 z-20 flex gap-2">
                                        <span className="px-3 py-1 text-[10px] uppercase tracking-widest font-bold bg-black/60 backdrop-blur-md text-emerald-400 rounded-full border border-emerald-500/20">
                                            {project.category || 'App'}
                                        </span>
                                    </div>
                                    
                                    {/* Hover Actions */}
                                    <div className="absolute bottom-4 right-4 z-20 flex gap-2 opacity-0 -translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 delay-100">
                                        {project.githubUrl && (
                                            <Link href={project.githubUrl} target="_blank" className="p-2 bg-black/80 hover:bg-emerald-600 rounded-full text-white backdrop-blur-md border border-white/10 transition-colors">
                                                <Github className="w-4 h-4" />
                                            </Link>
                                        )}
                                        <Link href={`/projects/${project.slug}`} className="p-2 bg-emerald-500 hover:bg-emerald-400 rounded-full text-black shadow-[0_0_20px_rgba(16,185,129,0.4)] transition-colors">
                                            <ExternalLink className="w-4 h-4" />
                                        </Link>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-6 relative z-10">
                                    <Link href={`/projects/${project.slug}`}>
                                        <h3 className="text-2xl font-black text-white italic tracking-tight mb-3 group-hover:text-emerald-400 transition-colors">
                                            {project.title}
                                        </h3>
                                    </Link>
                                    <p className="text-gray-400 text-sm leading-relaxed mb-6 line-clamp-3">
                                        {project.description}
                                    </p>

                                    {/* Tech Stack */}
                                    <div className="flex flex-wrap gap-2">
                                        {project.technologies?.slice(0, 4).map(tech => (
                                            <span key={tech} className="px-2.5 py-1 text-[10px] font-mono text-gray-500 bg-white/5 rounded border border-white/5">
                                                {tech}
                                            </span>
                                        ))}
                                        {project.technologies && project.technologies.length > 4 && (
                                            <span className="px-2.5 py-1 text-[10px] font-mono text-gray-600 bg-transparent rounded">
                                                +{project.technologies.length - 4}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>

                {filteredProjects.length === 0 && (
                    <div className="text-center py-20">
                        <Search className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                        <h3 className="text-xl font-bold text-white mb-2">No projects found.</h3>
                        <p className="text-gray-500">Try adjusting your filters.</p>
                    </div>
                )}
            </div>
        </main>
    )
}
