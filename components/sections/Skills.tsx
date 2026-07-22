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
                        { name: 'Full-Stack Apps', level: '95%', tech: 'Next.js 16, React 19, Supabase Auth', color: 'from-emerald-500 to-teal-500', desc: 'Architecting scalable multi-role CRM portals, room scheduling dashboards, and reactive client interfaces.' },
                        { name: 'Data Pipeline', level: '92%', tech: 'Python, PostgreSQL, SQLAlchemy', color: 'from-teal-500 to-cyan-500', desc: 'Engineering chronological UID re-indexing pipelines, sequence drift fixes, and automated CSV/Excel imports.' },
                        { name: 'Storefront Integration', level: '90%', tech: 'Shopify Liquid, Embeds, Next.js CSP', color: 'from-cyan-500 to-emerald-400', desc: 'Building zero-leakage Shopify 2.0 booking overlays with secure cross-origin frame headers.' },
                        { name: 'AI & Automation', level: '88%', tech: 'N8n, Ollama LLM, Webhooks, Git Actions', color: 'from-emerald-400 to-teal-400', desc: 'Connecting multi-channel messaging flows (WhatsApp/IG) with agentic memory skills and local AI.' }
                    ].map((skill, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="group relative glass-panel p-10 rounded-[2.5rem] border-white/5 hover:border-white/20 transition-all cursor-crosshair flex flex-col justify-between"
                        >
                            <div>
                                <div className="mb-10 flex justify-between items-baseline">
                                    <span className="text-4xl font-black text-white/10 group-hover:text-white/20 transition-colors uppercase italic tracking-tighter">0{i + 1}</span>
                                    <span className={`text-xs font-black tracking-widest bg-gradient-to-r ${skill.color} bg-clip-text text-transparent`}>{skill.level}</span>
                                </div>
                                <h4 className="text-3xl font-black text-white mb-4 uppercase italic tracking-tighter group-hover:text-emerald-400 transition-colors">{skill.name}</h4>
                                <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest leading-relaxed mb-6">
                                    {skill.tech}
                                </p>
                                <p className="text-gray-400 text-sm leading-relaxed mb-8 border-l border-white/10 pl-4 py-1 italic">
                                    {skill.desc}
                                </p>
                            </div>

                            <div className="mt-auto h-1 w-full bg-white/5 rounded-full overflow-hidden">
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
