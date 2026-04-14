import { NextRequest, NextResponse } from 'next/server'
import {
    getLicenseByToken,
    getDomainBinding,
    createDomainBinding,
    updateDomainBinding,
    countDomainBindings,
    logVerification,
} from '@/lib/zbooking'

const ZBOOKING_SHARED_SECRET = process.env.ZBOOKING_SHARED_SECRET || 'aspirine'

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
        if (providedSecret !== ZBOOKING_SHARED_SECRET) {
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
                await logVerification(token, domain, false, 'expired', request)
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
