import { NextRequest, NextResponse } from 'next/server'
import {
    generateToken,
    validateEmail,
    createLicenseKey,
} from '@/lib/zbooking'

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const { email, plan = 'pro' } = body

        // Validate email
        if (!email || typeof email !== 'string') {
            return NextResponse.json(
                { success: false, error: 'Email is required' },
                { status: 400 }
            )
        }

        if (!validateEmail(email)) {
            return NextResponse.json(
                { success: false, error: 'Invalid email format' },
                { status: 400 }
            )
        }

        // Validate plan
        if (!['pro', 'basic', 'enterprise'].includes(plan)) {
            return NextResponse.json(
                { success: false, error: 'Invalid plan' },
                { status: 400 }
            )
        }

        // Determine max domains based on plan
        const maxDomainsMap: Record<string, number> = {
            basic: 1,
            pro: 3,
            enterprise: 10,
        }
        const maxDomains = maxDomainsMap[plan] || 1

        // Generate token
        const token = generateToken()

        // Create license key in database (1 year expiry)
        await createLicenseKey(email, token, plan, maxDomains, 365)

        return NextResponse.json(
            {
                success: true,
                token,
                plan,
                max_domains: maxDomains,
                message: 'Token generated successfully',
            },
            { status: 200 }
        )
    } catch (error) {
        console.error('Token generation error:', error)
        return NextResponse.json(
            {
                success: false,
                error: 'Failed to generate token',
            },
            { status: 500 }
        )
    }
}
