import { NextRequest, NextResponse } from 'next/server'
import {
    getLicenseByToken,
    getDomainBinding,
    createDomainBinding,
    updateDomainBinding,
    countDomainBindings,
    logVerification,
} from '@/lib/zbooking'

// ---------------------------------------------------------------------------
// Rate limiting — Upstash Redis (sliding window, 20 req/min per IP)
// Falls back gracefully if UPSTASH_REDIS_REST_URL is not configured.
// ---------------------------------------------------------------------------
let rateLimiter: { limit: (id: string) => Promise<{ success: boolean }> } | null = null

async function getRateLimiter() {
    if (rateLimiter) return rateLimiter

    const url = process.env.UPSTASH_REDIS_REST_URL
    const token = process.env.UPSTASH_REDIS_REST_TOKEN

    if (!url || !token) return null

    try {
        const { Ratelimit } = await import('@upstash/ratelimit')
        const { Redis } = await import('@upstash/redis')

        const redis = new Redis({ url, token })
        rateLimiter = new Ratelimit({
            redis,
            limiter: Ratelimit.slidingWindow(20, '1 m'),
            analytics: true,
            prefix: 'zbooking:verify',
        })
        return rateLimiter
    } catch {
        return null
    }
}

// ---------------------------------------------------------------------------

const ZBOOKING_SHARED_SECRET = process.env.ZBOOKING_SHARED_SECRET

function normalizeDomain(input: string): string {
    return input
        .trim()
        .toLowerCase()
        .replace(/^https?:\/\//, '')
        .replace(/^www\./, '')
        .split('/')[0]
}

async function parseRequestBody(request: NextRequest): Promise<Record<string, any>> {
    const contentType = (request.headers.get('content-type') || '').toLowerCase()

    if (contentType.includes('application/json')) {
        return await request.json()
    }

    if (contentType.includes('application/x-www-form-urlencoded')) {
        const text = await request.text()
        const params = new URLSearchParams(text)
        return Object.fromEntries(params.entries())
    }

    if (contentType.includes('multipart/form-data')) {
        const form = await request.formData()
        const data: Record<string, any> = {}
        for (const [key, value] of form.entries()) {
            data[key] = typeof value === 'string' ? value : ''
        }
        return data
    }

    // WordPress clients sometimes omit content-type; attempt form parsing first.
    const text = await request.text()
    if (text.includes('=')) {
        const params = new URLSearchParams(text)
        return Object.fromEntries(params.entries())
    }

    try {
        return JSON.parse(text)
    } catch {
        return {}
    }
}

export async function POST(request: NextRequest) {
    let incomingToken = 'unknown'
    let incomingDomain = 'unknown'

    // --- Rate limit check ---
    const limiter = await getRateLimiter()
    if (limiter) {
        const ip =
            request.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
            request.headers.get('x-real-ip') ||
            'anonymous'
        const { success } = await limiter.limit(ip)
        if (!success) {
            return NextResponse.json(
                { valid: false, reason: 'rate_limited' },
                {
                    status: 429,
                    headers: { 'Retry-After': '60' },
                }
            )
        }
    }

    try {
        const body = await parseRequestBody(request)
        const {
            token,
            secret_key,
            secret,
            shared_secret,
            domain,
            plugin,
            plugin_ver,
        } = body

        const normalizedToken = typeof token === 'string' ? token.trim() : ''
        const normalizedDomain = typeof domain === 'string' ? normalizeDomain(domain) : ''
        const providedSecret =
            (typeof secret_key === 'string' && secret_key.trim()) ||
            (typeof secret === 'string' && secret.trim()) ||
            (typeof shared_secret === 'string' && shared_secret.trim()) ||
            ''

        incomingToken = normalizedToken || 'unknown'
        incomingDomain = normalizedDomain || 'unknown'

        // Validate required fields
        if (!normalizedToken || !providedSecret || !normalizedDomain) {
            return NextResponse.json(
                { valid: false, reason: 'missing_fields' },
                { status: 400 }
            )
        }

        // Verify shared secret
        if (!ZBOOKING_SHARED_SECRET || providedSecret !== ZBOOKING_SHARED_SECRET) {
            await logVerification(normalizedToken, normalizedDomain, false, 'bad_secret', request)
            return NextResponse.json(
                { valid: false, reason: 'bad_secret' },
                { status: 401 }
            )
        }

        // Get license from database
        const license = await getLicenseByToken(normalizedToken)

        if (!license) {
            await logVerification(normalizedToken, normalizedDomain, false, 'invalid_token', request)
            return NextResponse.json(
                { valid: false, reason: 'invalid_token' },
                { status: 200 }
            )
        }

        // Check status
        if (license.status !== 'active') {
            await logVerification(
                normalizedToken,
                normalizedDomain,
                false,
                license.status === 'revoked' ? 'revoked' : 'invalid',
                request
            )
            return NextResponse.json(
                { valid: false, reason: license.status === 'revoked' ? 'revoked' : 'invalid' },
                { status: 200 }
            )
        }

        // Check expiry
        if (license.expires_at) {
            const expiryDate = new Date(license.expires_at)
            if (new Date() > expiryDate) {
                // Fix: use normalized vars, not raw destructured ones
                await logVerification(normalizedToken, normalizedDomain, false, 'expired', request)
                return NextResponse.json(
                    { valid: false, reason: 'expired' },
                    { status: 200 }
                )
            }
        }

        // Handle domain binding
        const existingBinding = await getDomainBinding(license.id, normalizedDomain)

        let domainCount = 0

        if (existingBinding) {
            // Update last_seen_at
            await updateDomainBinding(license.id, normalizedDomain)
        } else {
            // Check domain limit
            domainCount = await countDomainBindings(license.id)

            if (domainCount >= license.max_domains) {
                await logVerification(
                    normalizedToken,
                    normalizedDomain,
                    false,
                    'domain_limit',
                    request
                )
                return NextResponse.json(
                    { valid: false, reason: 'domain_limit' },
                    { status: 200 }
                )
            }

            // Create new binding
            await createDomainBinding(license.id, normalizedDomain)
        }

        // Log successful verification
        await logVerification(normalizedToken, normalizedDomain, true, null, request)

        return NextResponse.json(
            {
                valid: true,
                plan: license.plan,
                expires_at: license.expires_at,
                plugin: plugin || 'zbooking',
            },
            { status: 200 }
        )
    } catch (error) {
        console.error('Token verification error:', error)

        // Still attempt to log the error
        await logVerification(incomingToken, incomingDomain, false, 'error', request)

        return NextResponse.json(
            { valid: false, reason: 'error' },
            { status: 500 }
        )
    }
}
