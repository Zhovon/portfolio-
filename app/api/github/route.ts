import { NextResponse } from 'next/server'

export const revalidate = 120 // Cache for 2 minutes

interface GitHubEvent {
    id: string
    type: string
    created_at: string
    repo: { name: string; url: string }
    payload: {
        commits?: { message: string; sha: string }[]
        action?: string
        ref?: string
        ref_type?: string
        description?: string
    }
}

export interface RepoActivity {
    name: string
    fullName: string
    latestCommit: string
    commitCount: number
    lastActive: string
    language?: string
    description?: string
    url: string
}

export interface GithubData {
    activeRepos: RepoActivity[]
    recentEvents: GitHubEvent[]
    totalToday: number
    streak: number
    username: string
}

export async function GET() {
    try {
        const githubToken = process.env.GITHUB_TOKEN || process.env.GH_TOKEN || process.env.GITHUB_PAT
        const username = 'Zhovon'

        const headers: HeadersInit = {
            'User-Agent': 'Zhovon-Portfolio',
            Accept: 'application/vnd.github+json',
            ...(githubToken ? { Authorization: `Bearer ${githubToken}` } : {}),
        }

        // Fetch public events (up to 30)
        const eventsRes = await fetch(
            `https://api.github.com/users/${username}/events/public?per_page=30`,
            { headers }
        )

        if (!eventsRes.ok) {
            return NextResponse.json(
                { activeRepos: [], recentEvents: [], totalToday: 0, streak: 0, username },
                { status: 200, headers: { 'Cache-Control': 's-maxage=120, stale-while-revalidate=300' } }
            )
        }

        const events: GitHubEvent[] = await eventsRes.json()

        // Build active repos map — group push events by repo
        const repoMap = new Map<string, RepoActivity>()
        const pushEvents = events.filter(e => e.type === 'PushEvent' || e.type === 'CreateEvent')

        for (const event of pushEvents) {
            const fullName = event.repo.name
            const repoName = fullName.split('/').pop() || fullName
            const existing = repoMap.get(fullName)
            const commits = event.payload.commits || []
            const latestMsg = commits[0]?.message || (event.type === 'CreateEvent' ? `Created ${event.payload.ref_type || 'repo'}` : 'Activity')

            if (existing) {
                existing.commitCount += commits.length
                // Keep most recent
                if (new Date(event.created_at) > new Date(existing.lastActive)) {
                    existing.latestCommit = latestMsg
                    existing.lastActive = event.created_at
                }
            } else {
                repoMap.set(fullName, {
                    name: repoName,
                    fullName,
                    latestCommit: latestMsg,
                    commitCount: commits.length || 1,
                    lastActive: event.created_at,
                    url: `https://github.com/${fullName}`,
                })
            }
        }

        // Sort by most recent
        const activeRepos = Array.from(repoMap.values())
            .sort((a, b) => new Date(b.lastActive).getTime() - new Date(a.lastActive).getTime())
            .slice(0, 5)

        // Try to enrich with repo metadata (language, description)
        await Promise.allSettled(
            activeRepos.map(async (repo) => {
                try {
                    const repoRes = await fetch(`https://api.github.com/repos/${repo.fullName}`, { headers })
                    if (repoRes.ok) {
                        const repoData = await repoRes.json()
                        repo.language = repoData.language
                        repo.description = repoData.description
                    }
                } catch { /* ignore */ }
            })
        )

        // Count today's events
        const today = new Date().toDateString()
        const totalToday = events.filter(e => new Date(e.created_at).toDateString() === today).length

        // Rough streak: count consecutive days with activity
        const activityDays = new Set(events.map(e => new Date(e.created_at).toDateString()))
        let streak = 0
        const checkDate = new Date()
        while (activityDays.has(checkDate.toDateString())) {
            streak++
            checkDate.setDate(checkDate.getDate() - 1)
        }

        const data: GithubData = {
            activeRepos,
            recentEvents: events.slice(0, 15),
            totalToday,
            streak,
            username,
        }

        return NextResponse.json(data, {
            headers: { 'Cache-Control': 's-maxage=120, stale-while-revalidate=300' },
        })
    } catch (error) {
        console.error('Github API error:', error)
        return NextResponse.json(
            { activeRepos: [], recentEvents: [], totalToday: 0, streak: 0, username: 'Zhovon' },
            { status: 200 }
        )
    }
}
