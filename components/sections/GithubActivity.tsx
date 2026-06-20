'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { GitCommit, Github, Activity, Clock, Flame, ExternalLink, Code2, GitBranch, Zap } from 'lucide-react'

interface RepoActivity {
    name: string
    fullName: string
    latestCommit: string
    commitCount: number
    lastActive: string
    language?: string
    description?: string
    url: string
}

interface GithubData {
    activeRepos: RepoActivity[]
    totalToday: number
    streak: number
    username: string
}

const LANG_COLORS: Record<string, string> = {
    TypeScript: '#3178c6',
    JavaScript: '#f1e05a',
    Python: '#3572A5',
    CSS: '#563d7c',
    HTML: '#e34c26',
    Go: '#00ADD8',
    Rust: '#dea584',
    default: '#8b949e',
}

function timeAgo(dateString: string) {
    const diff = Math.floor((Date.now() - new Date(dateString).getTime()) / 1000)
    if (diff < 60) return `${diff}s ago`
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`
    return `${Math.floor(diff / 86400)}d ago`
}

export function GithubActivity() {
    const [data, setData] = useState<GithubData | null>(null)
    const [loading, setLoading] = useState(true)
    const [activeRepo, setActiveRepo] = useState(0)

    useEffect(() => {
        fetch('/api/github')
            .then(r => r.json())
            .then((d: GithubData) => {
                if (d?.activeRepos) setData(d)
            })
            .catch(console.error)
            .finally(() => setLoading(false))
    }, [])

    // Auto-cycle through repos
    useEffect(() => {
        if (!data?.activeRepos.length) return
        const interval = setInterval(() => {
            setActiveRepo(prev => (prev + 1) % data.activeRepos.length)
        }, 4000)
        return () => clearInterval(interval)
    }, [data])

    if (loading) {
        return (
            <div className="glass-panel rounded-[2rem] border border-white/5 p-6 animate-pulse">
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 rounded-full bg-white/5" />
                    <div className="h-3 w-32 bg-white/5 rounded-full" />
                </div>
                <div className="space-y-3">
                    {[...Array(3)].map((_, i) => (
                        <div key={i} className="h-12 bg-white/5 rounded-xl" />
                    ))}
                </div>
            </div>
        )
    }

    if (!data || !data.activeRepos.length) return null

    const repo = data.activeRepos[activeRepo]
    const langColor = LANG_COLORS[repo.language || ''] || LANG_COLORS.default

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="w-full glass-panel rounded-[2rem] border border-white/5 overflow-hidden"
        >
            {/* Header */}
            <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-white/5">
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <div className="w-8 h-8 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                            <Github className="w-4 h-4 text-emerald-400" />
                        </div>
                        <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 border border-black animate-pulse" />
                    </div>
                    <div>
                        <p className="text-white text-xs font-black uppercase tracking-[0.35em]">Live Activity</p>
                        <p className="text-gray-500 text-[10px] font-mono">github/{data.username}</p>
                    </div>
                </div>

                {/* Stats pills */}
                <div className="flex items-center gap-2">
                    {data.streak > 0 && (
                        <div className="flex items-center gap-1 bg-orange-500/10 border border-orange-500/20 px-2 py-1 rounded-full">
                            <Flame className="w-3 h-3 text-orange-400" />
                            <span className="text-[10px] font-black text-orange-400">{data.streak}d</span>
                        </div>
                    )}
                    {data.totalToday > 0 && (
                        <div className="flex items-center gap-1 bg-emerald-500/10 border border-emerald-500/20 px-2 py-1 rounded-full">
                            <Zap className="w-3 h-3 text-emerald-400" />
                            <span className="text-[10px] font-black text-emerald-400">{data.totalToday} today</span>
                        </div>
                    )}
                </div>
            </div>

            {/* Active repo card — cycles automatically */}
            <div className="px-6 py-4 border-b border-white/5">
                <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-500">Currently Working On</span>
                    <div className="flex items-center gap-1">
                        {data.activeRepos.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setActiveRepo(i)}
                                className={`h-1 rounded-full transition-all duration-300 ${i === activeRepo ? 'w-4 bg-emerald-500' : 'w-1 bg-white/20'}`}
                            />
                        ))}
                    </div>
                </div>

                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeRepo}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="flex items-start justify-between gap-2 mb-2">
                            <div className="flex items-center gap-2 min-w-0">
                                <GitBranch className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                                <span className="text-white text-sm font-black truncate">{repo.name}</span>
                                {repo.language && (
                                    <span
                                        className="flex-shrink-0 text-[9px] font-bold px-2 py-0.5 rounded-full border"
                                        style={{ color: langColor, borderColor: `${langColor}40`, background: `${langColor}15` }}
                                    >
                                        {repo.language}
                                    </span>
                                )}
                            </div>
                            <a
                                href={repo.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex-shrink-0 text-gray-600 hover:text-emerald-400 transition-colors"
                            >
                                <ExternalLink className="w-3.5 h-3.5" />
                            </a>
                        </div>

                        {repo.description && (
                            <p className="text-gray-500 text-[11px] leading-relaxed mb-2 line-clamp-1">{repo.description}</p>
                        )}

                        <div className="flex items-start gap-2 mt-2">
                            <GitCommit className="w-3.5 h-3.5 text-gray-600 flex-shrink-0 mt-0.5" />
                            <p className="text-gray-300 text-xs italic line-clamp-2 leading-relaxed">
                                "{repo.latestCommit}"
                            </p>
                        </div>

                        <div className="flex items-center justify-between mt-3">
                            <span className="text-[10px] text-emerald-500 font-mono">
                                {repo.commitCount} commit{repo.commitCount !== 1 ? 's' : ''} recent
                            </span>
                            <span className="text-[10px] text-gray-600 flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {timeAgo(repo.lastActive)}
                            </span>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* All active repos list */}
            <div className="px-6 py-4">
                <p className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-500 mb-3">Recent Repos</p>
                <div className="space-y-2">
                    {data.activeRepos.slice(0, 4).map((r, i) => (
                        <motion.button
                            key={r.fullName}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.06 }}
                            onClick={() => setActiveRepo(i)}
                            className={`w-full flex items-center justify-between px-3 py-2 rounded-xl transition-all text-left ${
                                i === activeRepo
                                    ? 'bg-emerald-500/10 border border-emerald-500/20'
                                    : 'bg-white/[0.02] border border-white/5 hover:border-white/10'
                            }`}
                        >
                            <div className="flex items-center gap-2 min-w-0">
                                <Activity className={`w-3 h-3 flex-shrink-0 ${i === activeRepo ? 'text-emerald-400' : 'text-gray-600'}`} />
                                <span className={`text-xs font-bold truncate ${i === activeRepo ? 'text-white' : 'text-gray-400'}`}>
                                    {r.name}
                                </span>
                            </div>
                            <div className="flex items-center gap-2 flex-shrink-0">
                                {r.language && (
                                    <span
                                        className="w-2 h-2 rounded-full"
                                        style={{ background: LANG_COLORS[r.language] || LANG_COLORS.default }}
                                    />
                                )}
                                <span className="text-[10px] text-gray-600 font-mono">{timeAgo(r.lastActive)}</span>
                            </div>
                        </motion.button>
                    ))}
                </div>
            </div>

            {/* Footer link */}
            <div className="px-6 pb-5">
                <a
                    href={`https://github.com/${data.username}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl border border-white/5 bg-white/[0.02] hover:border-emerald-500/30 hover:bg-emerald-500/5 transition-all text-[10px] font-black uppercase tracking-[0.3em] text-gray-500 hover:text-emerald-400"
                >
                    <Code2 className="w-3 h-3" />
                    View Full Profile
                </a>
            </div>
        </motion.div>
    )
}
