'use client'

import { motion } from 'framer-motion'
import { ArrowLeft, Layers, Filter } from 'lucide-react'
import Link from 'next/link'

export function ProjectsClient({ projects }: { projects: any[] }) {
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
                        className="flex items-center gap-6 glass-panel px-6 py-3 rounded-full border-white/5"
                    >
                        <Filter className="w-3 h-3 text-purple-500" />
                        {['All', 'SaaS', 'WordPress', 'Enterprise'].map(cat => (
                            <button key={cat} className="text-[10px] uppercase tracking-widest text-gray-400 hover:text-white transition-colors">{cat}</button>
                        ))}
                    </motion.div>
                </div>

                {/* Project Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-20">
                    {projects.map((project, idx) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            viewport={{ once: true }}
                            className="group"
                        >
                            <Link href={`/projects/${project.slug}`}>
                                <div className="aspect-[16/10] rounded-3xl overflow-hidden glass-panel relative mb-8 border border-white/5 group-hover:border-purple-500/50 transition-all duration-500 hover:translate-y-[-10px]">
                                    <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60" />

                                    {project.thumbnail?.url ? (
                                        <img
                                            src={project.thumbnail.url}
                                            alt={project.title}
                                            className="w-full h-full object-cover opacity-50 group-hover:opacity-80 transition-opacity duration-700 group-hover:scale-105"
                                        />
                                    ) : (
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <Layers className="w-16 h-16 text-white/5 group-hover:text-purple-500 group-hover:scale-110 transition-all duration-700" />
                                        </div>
                                    )}

                                    {/* Floating Tag */}
                                    <div className="absolute top-8 left-8">
                                        <div className="glass-panel px-4 py-1.5 rounded-full text-[8px] font-black uppercase tracking-[0.2em] text-purple-400">
                                            {project.techStack?.[0]?.name || 'Artifact'}
                                        </div>
                                    </div>
                                </div>
                            </Link>

                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="text-3xl font-black text-white tracking-tight mb-2 group-hover:text-purple-400 transition-colors uppercase italic">{project.title}</h3>
                                    <p className="text-gray-500 font-medium max-w-sm line-clamp-2">{project.description}</p>
                                </div>
                                <div className="text-xs font-mono text-gray-700">2024</div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </main>
    )
}
