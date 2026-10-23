"use client"

import { useProjectsData } from "@/components/hooks/use-projects-data"
import { motion } from "framer-motion"

// Color mapping for tech stack
const techColors: Record<string, string> = {
  'nextjs': 'from-emerald-500 to-emerald-600',
  'react': 'from-blue-500 to-blue-600',
  'typescript': 'from-violet-500 to-purple-600',
  'supabase': 'from-teal-500 to-teal-600',
  'nodejs': 'from-green-500 to-green-600',
  'html': 'from-orange-500 to-orange-600',
  'css': 'from-pink-500 to-pink-600',
  'python': 'from-amber-500 to-amber-600',
  'java': 'from-red-500 to-red-400',
  'go': 'from-cyan-500 to-cyan-400',
}

export function ProjectsSection() {
  const { data, loading } = useProjectsData()

  if (loading) return <div className="p-8">Loading projects...</div>
  if (!data || data.length === 0) return <div className="p-8">No projects found</div>

  return (
    <section className="py-24 bg-gray-950 text-white">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-black mb-12 tracking-tighter">
          Featured Projects
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {data.map((project: any) => (
            <motion.div
              key={project.id}
              className="group relative w-full rounded-2xl overflow-hidden border-white/5 backdrop-blur"
              style={{ transitionDelay: `${Math.random() * 0.2}s` }}
              whileHover={{
                y: -10,
                rotate: 5,
                transition: { type: "spring", stiffness: 300 }
              }}
            >
              {/* Project Image */}
              {project.image_url && (
                <img
                  src={project.image_url}
                  alt={project.title}
                  width={400}
                  height={300}
                  className="w-full h-[200px] object-cover transition-opacity duration-300 group-hover:opacity-90"
                  loading="lazy"
                />
              )}

              {/* Project Info Layer */}
              <div className="p-5">
                <h3 className="text-lg font-bold mb-2">{project.title}</h3>
                <p className="text-muted-foreground text-sm line-clamp-3">
                  {project.description}
                </p>

                {/* Tech stack tags */}
                <div className="flex flex-wrap gap-2 mt-4">
                  {project.tech_stack?.map((tech: any, i: number) => {
                    const techName = tech.name || tech
                    const colorClass = techColors[techName.toLowerCase()] || 'from-gray-500 to-gray-600'
                    
                    return (
                      <span
                        key={i}
                        className={`px-2 py-1 text-xs font-medium rounded-full border border-white/10 text-white/90 bg-gradient-to-r ${colorClass}`}
                      >
                        {techName}
                      </span>
                    )
                  })}
                </div>

                {/* CTA Links */}
                <div className="mt-4 flex gap-3">
                  {project.live_url && (
                    <a
                      href={project.live_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 px-4 py-2 rounded-full border border-white/20 hover:border-white/30 hover:bg-white/5 transition-colors"
                    >
                      Live Demo
                    </a>
                  )}
                  {project.github_url && (
                    <a
                      href={project.github_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 rounded-full border border-white/20 hover:border-white/30 hover:bg-white/5 transition-colors"
                    >
                      GitHub
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}