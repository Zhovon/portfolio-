import { NextResponse } from 'next/server'

export const revalidate = 60 // Cache for 60 seconds

export async function GET() {
    try {
        const githubToken = process.env.GITHUB_TOKEN || process.env.GH_TOKEN || process.env.GITHUB_PAT
        const res = await fetch('https://api.github.com/users/Zhovon/events/public?per_page=10', {
            headers: {
                'User-Agent': 'Zhovon-Portfolio',
                Accept: 'application/vnd.github+json',
                ...(githubToken ? { Authorization: `Bearer ${githubToken}` } : {}),
            }
        })
        
        if (!res.ok) {
            console.warn('GitHub activity request failed:', res.status, res.statusText)
            return NextResponse.json([], {
                status: 200,
                headers: {
                    'Cache-Control': 's-maxage=60, stale-while-revalidate=300',
                },
            })
        }
        
        const data = await res.json()
        return NextResponse.json(Array.isArray(data) ? data : [], {
            headers: {
                'Cache-Control': 's-maxage=60, stale-while-revalidate=300',
            },
        })
    } catch (error) {
        console.error('Github API error:', error)
        return NextResponse.json([], {
            status: 200,
            headers: {
                'Cache-Control': 's-maxage=60, stale-while-revalidate=300',
            },
        })
    }
}
