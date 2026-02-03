'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import Link from 'next/link'
import { useRef } from 'react'
import Image from 'next/image'
import { Layers, ArrowDownRight } from 'lucide-react'
import { Project, FALLBACK_PROJECTS } from '@/data/projects'

function ProjectCard({ project, i }: { project: Project, i: number }) {
    return (
        <div className="w-[80vw] md:w-[60vw] lg:w-[40vw] flex-shrink-0 group relative">
            <Link href={`/projects/${project.slug}`}>
                <div className="aspect-[16/10] rounded-[2rem] overflow-hidden relative glass-panel mb-8 border border-white/5 group-hover:border-purple-500/50 transition-colors duration-700">
                    <div className="absolute inset-0 bg-gradient-to-t from-[#020202] to-transparent opacity-60 group-hover:opacity-20 transition-opacity duration-700 z-10" />

                    {project.image ? (
                        <Image
                            src={project.image}
                            alt={project.title}
                            fill
                            className="object-cover opacity-50 group-hover:opacity-80 transition-opacity duration-700 group-hover:scale-105"
                            sizes="(max-width: 768px) 80vw, (max-width: 1200px) 60vw, 40vw"
                        />
                    ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                            <motion.div
                                whileHover={{ scale: 1.2, rotate: 10 }}
                                className="w-24 h-24 rounded-full bg-white/5 backdrop-blur-3xl flex items-center justify-center border border-white/10 shadow-[0_0_30px_rgba(255,255,255,0.05)]"
                            >
                                <Layers className="w-10 h-10 text-white/20 group-hover:text-purple-500 transition-colors duration-500" />
                            </motion.div>
                        </div>
                    )}

                    <div className="absolute top-6 left-6 flex gap-2 z-20">
                        <div className="px-3 py-1 rounded-full border border-white/10 bg-black/50 backdrop-blur-md text-[8px] uppercase tracking-widest text-gray-400">
                            {project.technologies?.[0] || 'NEXUS_V.01'}
                        </div>
                    </div>
                </div>
            </Link>

            <div className="px-4">
                <div className="flex justify-between items-start">
                    <h3 className="text-4xl font-black text-white italic tracking-tighter group-hover:text-purple-400 transition-colors duration-500 uppercase">
                        {project.title}
                    </h3>
                    <ArrowDownRight className="w-6 h-6 text-gray-700 group-hover:text-purple-500 group-hover:rotate-45 transition-all duration-500" />
                </div>
                <p className="text-gray-500 mt-4 text-lg font-medium leading-relaxed max-w-md line-clamp-2">
                    {project.description}
                </p>
            </div>
        </div>
    )
}

export function Projects({ projects }: { projects?: Project[] }) {
    const targetRef = useRef(null)
    const { scrollYProgress: scrollYProgressHorizontal } = useScroll({
        target: targetRef,
        offset: ["start start", "end end"]
    })

    const projectsToRender = projects && projects.length > 0 ? projects : FALLBACK_PROJECTS
    const x = useTransform(scrollYProgressHorizontal, [0, 1], ["0%", `-${Math.max(0, (projectsToRender.length - 1) * 60)}%`])

    return (
        <section ref={targetRef} id="works" className="relative h-[400vh] bg-black">
            <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-center">
                <div className="px-6 lg:px-20 mb-20 relative z-20">
                    <div className="flex justify-between items-baseline overflow-hidden">
                        <motion.h2
                            initial={{ opacity: 0, x: -100 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                            className="text-8xl md:text-[12vw] font-black tracking-tighter text-white/5 uppercase leading-none"
                        >
                            Artifacts
                        </motion.h2>
                        <motion.span
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 1, delay: 0.5 }}
                            className="text-xs font-mono text-emerald-500 animate-pulse hidden md:block"
                        >
                            [ SCANNING_DATA... ]
                        </motion.span>
                    </div>
                </div>

                <motion.div
                    style={{ x }}
                    className="flex gap-20 px-6 lg:px-20 relative z-10"
                >
                    {projectsToRender.map((project, i) => (
                        <ProjectCard key={project.id} project={project} i={i} />
                    ))}
                </motion.div>

                <div className="absolute bottom-20 left-6 lg:left-20 right-6 lg:right-20 h-[1px] bg-white/5">
                    <motion.div
                        style={{ scaleX: scrollYProgressHorizontal }}
                        className="h-full bg-emerald-500 origin-left"
                    />
                </div>
            </div>
        </section>
    )
}
