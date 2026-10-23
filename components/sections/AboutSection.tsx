"use client"

import { useAboutSection } from "@/components/hooks/use-about-section"
import { motion } from "framer-motion"

export function AboutSection() {
  const { data, loading, error } = useAboutSection()

  if (loading) {
    return (
      <div className="py-24 bg-gray-950 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-black mb-12 tracking-ticker">Loading About Section...</h2>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="py-24 bg-gray-950 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-black mb-12 tracking-ticker">Error loading About</h2>
          <p className="text-muted-foreground">{error}</p>
        </div>
      </div>
    )
  }

  if (!data) {
    return (
      <div className="py-24 bg-gray-950 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-black mb-12 tracking-ticker">No About Section Found</h2>
          <p className="text-muted-foreground">Add an about section via the admin panel</p>
        </div>
      </div>
    )
  }

  const { tagline, title, subtitle, narrative, avatar_url, problem_solving } = data

  return (
    <section className="py-24 bg-gray-950 text-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Tagline with animation */}
        {tagline && (
          <h1 className="text-4xl md:text-5xl font-black tracking-[0.35em] mb-6">
            <motion.span
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="inline-block"
            >
              {tagline}
            </motion.span>
          </h1>
        )}

        {/* Profile image */}
        {avatar_url && (
          <div className="rounded-2xl overflow-hidden mb-12">
            <img 
              src={avatar_url} 
              alt={`${title || 'Profile'} portrait`} 
              className="w-64 h-64 object-cover"
              loading="lazy"
            />
          </div>
        )}

        {/* Narrative content */}
        <div className="prose prose-invert max-w-none my-12">
          <p className="text-gray-300 leading-relaxed whitespace-pre-line">{narrative}</p>
        </div>

        {/* Problem-solving showcase */}
        {problem_solving && problem_solving.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
            {problem_solving.map((problem: any, index: number) => (
              <div 
                key={problem.id}
                className="glass-panel p-6 rounded-2xl border-white/5 backdrop-blur"
                style={{ transitionDelay: `${index * 0.1}s` }}
              >
                <h3 className="text-xl font-bold mb-2">{problem.title}</h3>
                <p className="text-muted-foreground">{problem.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}