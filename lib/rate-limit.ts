interface RateLimitRecord {
    count: number
    resetTime: number
}

const ipMap = new Map<string, RateLimitRecord>()

// Clean up stale entries every 5 minutes
if (typeof setInterval !== 'undefined') {
    setInterval(() => {
        const now = Date.now()
        for (const [ip, record] of ipMap.entries()) {
            if (now > record.resetTime) {
                ipMap.delete(ip)
            }
        }
    }, 5 * 60 * 1000).unref?.()
}

export function checkRateLimit(
    identifier: string,
    limit: number = 5,
    windowMs: number = 60 * 1000
): { success: boolean; remaining: number; resetTime: number } {
    const now = Date.now()
    const record = ipMap.get(identifier)

    if (!record || now > record.resetTime) {
        ipMap.set(identifier, {
            count: 1,
            resetTime: now + windowMs,
        })
        return { success: true, remaining: limit - 1, resetTime: now + windowMs }
    }

    if (record.count >= limit) {
        return { success: false, remaining: 0, resetTime: record.resetTime }
    }

    record.count += 1
    return { success: true, remaining: limit - record.count, resetTime: record.resetTime }
}

export function getClientIp(req: Request): string {
    const headers = req.headers
    const forwarded = headers.get('x-forwarded-for')
    if (forwarded) {
        return forwarded.split(',')[0].trim()
    }
    return headers.get('x-real-ip') || '127.0.0.1'
}
