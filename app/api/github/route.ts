import { NextResponse } from 'next/server'

export const revalidate = 60 // Cache for 60 seconds

export async function GET() {
    try {
        const res = await fetch('https://api.github.com/users/Zhovon/events/public?per_page=10', {
            headers: {
                'User-Agent': 'Zhovon-Portfolio'
            }
        })
        
        if (!res.ok) {
            return NextResponse.json({ error: 'Failed to fetch from GitHub' }, { status: res.status })
        }
        
        const data = await res.json()
        return NextResponse.json(data)
    } catch (error) {
        console.error('Github API error:', error)
        return NextResponse.json({ error: 'Server Error' }, { status: 500 })
    }
}
