import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'

export function escapeHtml(value: string): string {
    return value
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;')
}

export function getClientIp(req: Request): string {
    const forwarded = req.headers.get('x-forwarded-for')
    if (forwarded) return forwarded.split(',')[0].trim()
    return req.headers.get('x-real-ip') || 'unknown'
}

let upstashLimiter: Ratelimit | null | undefined

function getUpstashLimiter(): Ratelimit | null {
    if (upstashLimiter !== undefined) return upstashLimiter

    if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
        upstashLimiter = new Ratelimit({
            redis: Redis.fromEnv(),
            limiter: Ratelimit.slidingWindow(5, '60 s'),
            prefix: 'portfolio-rl',
        })
    } else {
        upstashLimiter = null
    }

    return upstashLimiter
}

// Per-instance fallback when Upstash is not configured. Serverless instances
// don't share this map, so it only slows abuse rather than hard-capping it.
const memoryHits = new Map<string, number[]>()
const MEMORY_LIMIT = 5
const MEMORY_WINDOW_MS = 60_000

export async function checkRateLimit(key: string): Promise<boolean> {
    const limiter = getUpstashLimiter()
    if (limiter) {
        const { success } = await limiter.limit(key)
        return success
    }

    const now = Date.now()
    const hits = (memoryHits.get(key) || []).filter((t) => now - t < MEMORY_WINDOW_MS)
    if (hits.length >= MEMORY_LIMIT) {
        memoryHits.set(key, hits)
        return false
    }
    hits.push(now)
    memoryHits.set(key, hits)
    return true
}
