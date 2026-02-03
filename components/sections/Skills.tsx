'use client'

import { motion } from 'framer-motion'

export function Skills() {
    return (
        <section id="meta" className="relative py-40 px-6 lg:px-20 overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <div className="mb-32">
                    <h2 className="text-xs font-black uppercase tracking-[0.5em] text-emerald-500 mb-6">03 — Universal Competencies</h2>
                    <h3 className="text-6xl md:text-9xl font-black text-white italic tracking-tighter uppercase leading-none">
                        Tech <br /> <span className="text-gray-800">Meta</span>
                    </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    {[
                        { name: 'Architecture', level: '95%', tech: 'Next.js, Payload, Microservices', color: 'from-emerald-500 to-teal-500' },
                        { name: 'Core Logic', level: '90%', tech: 'TypeScript, React, Node.js', color: 'from-teal-500 to-cyan-500' },
                        { name: '3D Mechanics', level: '85%', tech: 'Three.js, GLSL, R3F', color: 'from-cyan-500 to-emerald-400' },
                        { name: 'Growth Systems', level: '92%', tech: 'SEO, Conversion, SaaS Pipelines', color: 'from-emerald-400 to-teal-400' }
                    ].map((skill, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="group relative glass-panel p-10 rounded-[2.5rem] border-white/5 hover:border-white/20 transition-all cursor-crosshair"
                        >
                            <div className="mb-10 flex justify-between items-baseline">
                                <span className="text-4xl font-black text-white/10 group-hover:text-white/20 transition-colors uppercase italic tracking-tighter">0{i + 1}</span>
                                <span className={`text-xs font-black tracking-widest bg-gradient-to-r ${skill.color} bg-clip-text text-transparent`}>{skill.level}</span>
                            </div>
                            <h4 className="text-3xl font-black text-white mb-4 uppercase italic tracking-tighter group-hover:text-emerald-400 transition-colors">{skill.name}</h4>
                            <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest leading-relaxed">
                                {skill.tech}
                            </p>

                            <div className="mt-10 h-1 w-full bg-white/5 rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ x: '-100%' }}
                                    whileInView={{ x: '0%' }}
                                    transition={{ duration: 1.5, delay: 0.5 + i * 0.1 }}
                                    className={`h-full w-full bg-gradient-to-r ${skill.color}`}
                                    style={{ width: skill.level }}
                                />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
