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

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const {
            token,
            secret_key,
            domain,
            plugin,
            plugin_ver,
        } = body

        // Validate required fields
        if (!token || !secret_key || !domain) {
            return NextResponse.json(
                { valid: false, reason: 'missing_fields' },
                { status: 400 }
            )
        }

        // Verify shared secret
        if (secret_key !== ZBOOKING_SHARED_SECRET) {
            await logVerification(token, domain, false, 'bad_secret', request)
            return NextResponse.json(
                { valid: false, reason: 'bad_secret' },
                { status: 401 }
            )
        }

        // Get license from database
        const license = await getLicenseByToken(token)

        if (!license) {
            await logVerification(token, domain, false, 'invalid_token', request)
            return NextResponse.json(
                { valid: false, reason: 'invalid_token' },
                { status: 200 }
            )
        }

        // Check status
        if (license.status !== 'active') {
            await logVerification(
                token,
                domain,
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
        const existingBinding = await getDomainBinding(license.id, domain)

        let domainCount = 0

        if (existingBinding) {
            // Update last_seen_at
            await updateDomainBinding(license.id, domain)
        } else {
            // Check domain limit
            domainCount = await countDomainBindings(license.id)

            if (domainCount >= license.max_domains) {
                await logVerification(
                    token,
                    domain,
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
            await createDomainBinding(license.id, domain)
        }

        // Log successful verification
        await logVerification(token, domain, true, null, request)

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
        try {
            const body = await request.json()
            await logVerification(
                body.token || 'unknown',
                body.domain || 'unknown',
                false,
                'error',
                request
            )
        } catch {
            // Silently fail - don't let logging prevent the response
        }

        return NextResponse.json(
            { valid: false, reason: 'error' },
            { status: 500 }
        )
    }
}
