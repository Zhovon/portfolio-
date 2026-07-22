import { createClient, SupabaseClient } from '@supabase/supabase-js'
import { randomBytes } from 'crypto'

// Type definitions
export interface ZBookingLicense {
    id: string
    token: string
    customer_email: string
    plan: string
    status: string
    max_domains: number
    expires_at: string | null
    plugin?: string
    notes?: string
    created_at: string
    updated_at: string
}

export interface ZBookingDomainBinding {
    id: string
    license_id: string
    domain: string
    first_seen_at: string
    last_seen_at: string
}

export interface ZBookingVerificationLog {
    id: number
    token: string
    domain?: string
    ok: boolean
    reason?: string
    ip: string
    user_agent: string
    created_at: string
}

// Lazy initialization of Supabase client
let supabaseAdmin: SupabaseClient | null = null

function getSupabaseAdmin(): SupabaseClient {
    if (supabaseAdmin) {
        return supabaseAdmin
    }

    const supabaseUrl =
        process.env.SUPABASE_URL ||
        process.env.NEXT_PUBLIC_SUPABASE_URL

    // Admin operations must never silently downgrade to the anon key —
    // RLS would make writes fail in confusing ways or, worse, succeed
    // with the wrong privileges.
    const supabaseServiceKey =
        process.env.SUPABASE_SERVICE_ROLE_KEY ||
        process.env.SUPABASE_SERVICE_ROLE

    if (!supabaseUrl) {
        throw new Error('Missing SUPABASE_URL (or NEXT_PUBLIC_SUPABASE_URL)')
    }
    if (!supabaseServiceKey) {
        throw new Error('Missing SUPABASE_SERVICE_ROLE_KEY — refusing to run admin operations with the anon key')
    }

    supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey)
    return supabaseAdmin
}

/**
 * Generate a secure random token
 * Format: zbk_<64-char hex string>
 */
export function generateToken(): string {
    const randomPart = randomBytes(32).toString('hex')
    return `zbk_${randomPart}`
}

/**
 * Validate email format
 */
export function validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
}

/**
 * Insert a new license key to Supabase
 */
export async function createLicenseKey(
    email: string,
    token: string,
    plan: string = 'pro',
    maxDomains: number = 1,
    expiresIn?: number
): Promise<ZBookingLicense> {
    let expiresAt = null
    if (expiresIn) {
        const date = new Date()
        date.setDate(date.getDate() + expiresIn)
        expiresAt = date.toISOString()
    }

    const { data, error } = await getSupabaseAdmin()
        .from('zbooking_license_keys')
        .insert([
            {
                token,
                customer_email: email,
                plan,
                status: 'active',
                max_domains: maxDomains,
                expires_at: expiresAt,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
            },
        ])
        .select()

    if (error) {
        console.error('Error creating license key:', error)
        throw error
    }

    return data?.[0] as ZBookingLicense
}

/**
 * Get license key by token
 */
export async function getLicenseByToken(token: string): Promise<ZBookingLicense | null> {
    const { data, error } = await getSupabaseAdmin()
        .from('zbooking_license_keys')
        .select('*')
        .eq('token', token)
        .single()

    if (error && error.code !== 'PGRST116') {
        // PGRST116 = no rows returned
        console.error('Error fetching license:', error)
        throw error
    }

    return (data as ZBookingLicense) || null
}

/**
 * Get or create domain binding
 */
export async function getDomainBinding(licenseId: string, domain: string): Promise<ZBookingDomainBinding | null> {
    const { data, error } = await getSupabaseAdmin()
        .from('zbooking_license_domain_bindings')
        .select('*')
        .eq('license_id', licenseId)
        .eq('domain', domain)
        .single()

    if (error && error.code !== 'PGRST116') {
        console.error('Error fetching domain binding:', error)
        throw error
    }

    return (data as ZBookingDomainBinding) || null
}

/**
 * Create domain binding
 */
export async function createDomainBinding(
    licenseId: string,
    domain: string
): Promise<ZBookingDomainBinding> {
    const now = new Date().toISOString()
    const { data, error } = await getSupabaseAdmin()
        .from('zbooking_license_domain_bindings')
        .insert([
            {
                license_id: licenseId,
                domain,
                first_seen_at: now,
                last_seen_at: now,
            },
        ])
        .select()

    if (error) {
        console.error('Error creating domain binding:', error)
        throw error
    }

    return data?.[0] as ZBookingDomainBinding
}

/**
 * Update domain binding last_seen_at
 */
export async function updateDomainBinding(
    licenseId: string,
    domain: string
): Promise<ZBookingDomainBinding> {
    const { data, error } = await getSupabaseAdmin()
        .from('zbooking_license_domain_bindings')
        .update({ last_seen_at: new Date().toISOString() })
        .eq('license_id', licenseId)
        .eq('domain', domain)
        .select()

    if (error) {
        console.error('Error updating domain binding:', error)
        throw error
    }

    return data?.[0] as ZBookingDomainBinding
}

/**
 * Count domains bound to a license
 */
export async function countDomainBindings(licenseId: string): Promise<number> {
    const { count, error } = await getSupabaseAdmin()
        .from('zbooking_license_domain_bindings')
        .select('*', { count: 'exact', head: true })
        .eq('license_id', licenseId)

    if (error) {
        console.error('Error counting domain bindings:', error)
        throw error
    }

    return count || 0
}

/**
 * Log verification attempt
 */
export async function logVerification(
    token: string,
    domain: string,
    valid: boolean,
    reason: string | null,
    request: Request
): Promise<void> {
    const ip = request.headers.get('x-forwarded-for') ||
        request.headers.get('x-real-ip') ||
        'unknown'
    const userAgent = request.headers.get('user-agent') || 'unknown'

    const { error } = await getSupabaseAdmin()
        .from('zbooking_license_verification_logs')
        .insert([
            {
                token,
                domain,
                ok: valid,
                reason: valid ? null : reason,
                ip,
                user_agent: userAgent,
                created_at: new Date().toISOString(),
            },
        ])

    if (error) {
        console.error('Error logging verification:', error)
        // Don't throw - logging should not fail the request
    }
}
