"use client"

import { useEffect, useState } from 'react'

interface GitHubMetrics {
  followers: number
  repos: number
  stars: number
  lastUpdated: string
}

export function RealTimeMetrics() {
  const [metrics, setMetrics] = useState<GitHubMetrics | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchGitHubStats() {
      try {
        // Fetch from GitHub API using the token
        const res = await fetch('/api/github', {
          cache: 'no-store',
          headers: {
            'Authorization': `Bearer ${process.env.GITHUB_TOKEN}`,
          },
        })
        const data = await res.json()
        setMetrics(data)
      } catch (error) {
        console.error('Failed to fetch GitHub stats:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchGitHubStats()
    
    // Refresh every 60 seconds
    const interval = setInterval(fetchGitHubStats, 60_000)
    return () => clearInterval(interval)
  }, [])

  if (isLoading) return <div className="text-muted-foreground text-sm">Loading...</div>
  if (!metrics) return <div className="text-muted-foreground text-sm">Unavailable</div>

  return (
    <div className="grid grid-cols-3 gap-4 text-sm">
      <div>
        <div className="text-2xl font-bold text-white">{metrics.followers}</div>
        <div className="text-muted-foreground">Followers</div>
      </div>
      <div>
        <div className="text-2xl font-bold text-white">{metrics.repos}</div>
        <div className="text-muted-foreground">Repositories</div>
      </div>
      <div>
        <div className="text-2xl font-bold text-white">{metrics.stars}</div>
        <div className="text-muted-foreground">Stars</div>
      </div>
    </div>
  )
}