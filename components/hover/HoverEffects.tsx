"use client"

import { motion } from 'framer-motion'

export function ProjectCardHover({
  techStack,
  onTechHover,
}: {
  techStack: string[]
  onTechHover?: (tech: string) => void
}) {
  return (
    <motion.div
      className="group relative rounded-2xl overflow-hidden border-white/5 backdrop-blur"
      whileHover={{
        rotateY: 10,
        rotateX: -10,
        y: -5,
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.5)',
        transition: { type: "spring", stiffness: 400, damping: 30 }
      }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Tech stack visualizer on hover */}
      <div className="absolute inset-0 overflow-hidden">
        {techStack.map((tech: string, i: number) => (
          <div
            key={i}
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-white/30"
            style={{ transitionDelay: `${i * 0.05}s` }}
          />
        ))}
      </div>

      {/* Content layer */}
      <div className="p-6">
        {/* Content would be passed in or rendered from project data */}
        <h3 className="text-lg font-bold mb-2">Project Title</h3>
        <p className="text-muted-foreground text-sm line-clamp-3">
          Project description showing on hover interaction.
        </p>
      </div>
    </motion.div>
  )
}

export function HoverCard({
  title,
  description,
  techStack,
}: {
  title: string
  description: string
  techStack: string[]
}) {
  return (
    <motion.div
      className="group relative p-6 rounded-2xl border-white/5 backdrop-blur"
      whileHover={{
        y: -10,
        scale: 1.02,
        transition: { type: "spring", stiffness: 300 }
      }}
    >
      <div className="flex flex-col sm:flex-row gap-4">
        <div>
          <h3 className="text-xl font-bold mb-2">{title}</h3>
          <p className="text-muted-foreground text-sm line-clamp-2">
            {description}
          </p>
        </div>
        <div className="flex gap-2">
          {techStack.map((tech, i) => (
            <span
              key={i}
              className="px-2 py-1 text-xs font-medium rounded-full border/2 border-white/10 text-white/70"
              style={{ backgroundColor: techColors[tech.toLowerCase()] || 'from-gray-500 to-gray-600' }}
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

// Color mapping for tech stack
const techColors: Record<string, string> = {
  'nextjs': 'from-emerald-500 to-emerald-600',
  'react': 'from-blue-500 to-blue-600',
  'typescript': 'from-violet-500 to-purple-600',
  'supabase': 'from-teal-500 to-teal-600',
  'nodejs': 'from-green-500 to-green-600',
  'html': 'from-orange-500 to-orange-600',
  'css': 'from-pink-500 to-pink-600',
}