"use client"

import { useSkillsData } from "@/components/hooks/use-skills-data"
import { motion } from "framer-motion"

export function SkillBar({ skill }: { skill: any }) {
  const levelPercent = Math.max(0, Math.min(100, parseInt(skill.level) || 0))
  const primaryColor = skill.color_primary || '#10b981'
  const secondaryColor = skill.color_secondary || '#059669'

  return (
    <motion.div
      key={skill.id}
      className="flex flex-col sm:flex-row mb-4 gap-3 transition-all duration-300 hover:scale-[1.02]"
      style={{ transitionDelay: `${skill.id % 5 * 0.1}s` }}
    >
      {/* Skill Name */}
      <span className="flex-1 text-sm font-medium text-white/90">
        {skill.name}
      </span>

      {/* Progress Container */}
      <div className="flex-1 h-4 bg-white/10 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-r from-primary-500 to-primary-600"
          style={{ width: `${levelPercent}%` }}
          aria-valuenow={levelPercent}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <span className="absolute left-2 top-1 text-xs font-medium text-white">
            {levelPercent}%
          </span>
        </div>
      </div>

      {/* Skill Level Label */}
      <span className="text-xs text-white/50">{skill.description || ''}</span>
    </motion.div>
  )
}

export function SkillsSection() {
  const { data, loading } = useSkillsData()

  if (loading) return <div className="p-8">Loading skills...</div>
  if (!data || data.length === 0) return <div className="p-8">No skills found</div>

  return (
    <section className="py-24 bg-gray-950 text-white">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-black mb-12 tracking-ticker">
          Technical Competencies
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {data.map((skill: any) => (
            <SkillBar key={skill.id} skill={skill} />
          ))}
        </div>
      </div>
    </section>
  )
}