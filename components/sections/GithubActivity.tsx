'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { GitCommit, Github, Activity, Clock } from 'lucide-react'

interface GithubEvent {
    id: string
    type: string
    created_at: string
    repo: {
        name: string
    }
    payload: {
        commits?: { message: string }[]
        action?: string
    }
}

export function GithubActivity() {
    const [latestEvent, setLatestEvent] = useState<GithubEvent | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchActivity() {
            try {
                const res = await fetch('/api/github')
                if (!res.ok) {
                    console.warn('GitHub activity request returned non-OK status:', res.status)
                    return
                }

                const data: GithubEvent[] = await res.json()
                
                // Find the latest PushEvent or meaningful activity
                const pushEvent = data.find(e => e.type === 'PushEvent' || e.type === 'CreateEvent')
                if (pushEvent) {
                    setLatestEvent(pushEvent)
                }
            } catch (error) {
                console.error('Github fetch error:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchActivity()
    }, [])

    if (loading) return null

    if (!latestEvent) return null

    const timeAgo = (dateString: string) => {
        const date = new Date(dateString)
        const now = new Date()
        const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)
        
        if (diffInSeconds < 60) return `${diffInSeconds}s ago`
        if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`
        if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`
        return `${Math.floor(diffInSeconds / 86400)}d ago`
    }

    const repoName = latestEvent.repo.name.split('/').pop() || latestEvent.repo.name
    const commitMessage = latestEvent.payload.commits?.[0]?.message || (latestEvent.type === 'CreateEvent' ? 'Created repository/branch' : 'Repository activity')

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="w-full max-w-sm glass-panel p-6 rounded-2xl border border-white/5 hover:border-emerald-500/30 transition-colors group relative overflow-hidden"
        >
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                <Github className="w-24 h-24 text-emerald-500" />
            </div>

            <div className="flex items-center gap-3 mb-6 relative z-10">
                <div className="relative">
                    <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
                        <Activity className="w-4 h-4 text-emerald-400" />
                    </div>
                    <div className="absolute top-0 right-0 w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                </div>
                <div>
                    <h4 className="text-white text-xs font-bold uppercase tracking-widest">Live Telemetry</h4>
                    <p className="text-gray-500 text-[10px] uppercase font-mono">GitHub Synchronization</p>
                </div>
            </div>

            <div className="space-y-4 relative z-10">
                <div>
                    <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-emerald-400 font-mono flex items-center gap-2">
                            <GitCommit className="w-3 h-3" />
                            {repoName}
                        </span>
                        <span className="text-[10px] text-gray-500 font-mono flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {timeAgo(latestEvent.created_at)}
                        </span>
                    </div>
                    <p className="text-sm text-gray-300 font-medium line-clamp-2 italic border-l-2 border-emerald-500/30 pl-3 py-1">
                        "{commitMessage}"
                    </p>
                </div>
            </div>
        </motion.div>
    )
}
