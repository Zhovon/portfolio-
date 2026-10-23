import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { createClient } from '@supabase/supabase-js'

function escapeHtml(str: string): string {
    return String(str).replace(/[&<>"']/g, (m) => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;',
    }[m]!))
}

function getSupabaseClient() {
    const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    if (!url || !key) return null
    return createClient(url, key)
}

export async function POST(req: Request) {
    try {
        const { name, email, packageType, budget, details } = await req.json()

        if (!name || !email || !packageType || !details) {
            return NextResponse.json({ error: 'Missing required parameters' }, { status: 400 })
        }

        const trimmedName = String(name).trim()
        const trimmedEmail = String(email).trim()
        const trimmedPackage = String(packageType).trim()
        const trimmedBudget = budget ? String(budget).trim() : 'Not specified'
        const trimmedDetails = String(details).trim()

        // 1. Enforce Denominator Rule: Persist order submission to Supabase first
        let submissionId: string | null = null
        const supabase = getSupabaseClient()
        if (supabase) {
            const { data: inserted, error: dbError } = await supabase
                .from('order_submissions')
                .insert([
                    {
                        name: trimmedName,
                        email: trimmedEmail,
                        package_type: trimmedPackage,
                        budget: trimmedBudget,
                        details: trimmedDetails,
                    },
                ])
                .select('id')
                .single()

            if (dbError) {
                console.error('Failed to log order submission to DB:', dbError)
            } else if (inserted) {
                submissionId = inserted.id
            }
        }

        // 2. Dispatch notification email if Resend is configured
        const resendApiKey = process.env.RESEND_API_KEY
        const toEmail = process.env.CONTACT_EMAIL || 'shahadathossain1932@gmail.com'
        const fromEmail = process.env.MAIL_FROM || 'Zhovon Orders <onboarding@resend.dev>'

        if (resendApiKey) {
            const resend = new Resend(resendApiKey)
            const safeName = escapeHtml(trimmedName)
            const safeEmail = escapeHtml(trimmedEmail)
            const safePackage = escapeHtml(trimmedPackage)
            const safeBudget = escapeHtml(trimmedBudget)
            const safeDetails = escapeHtml(trimmedDetails)

            const emailPromise = resend.emails.send({
                from: fromEmail,
                to: [toEmail],
                subject: `[ZHOVON_SYS] New Order Request - ${safePackage}`,
                html: `
                    <div style="font-family: monospace; background-color: #050505; color: #e5e7eb; padding: 40px; border-radius: 8px;">
                        <h2 style="color: #10b981; text-transform: uppercase; letter-spacing: 0.15em;">Incoming Order Transmission</h2>
                        <p style="margin: 6px 0;"><strong>SENDER:</strong> ${safeName} &lt;${safeEmail}&gt;</p>
                        <p style="margin: 6px 0;"><strong>PACKAGE:</strong> ${safePackage}</p>
                        <p style="margin: 6px 0;"><strong>BUDGET:</strong> ${safeBudget}</p>
                        <hr style="border: 1px solid #10b98133; margin: 20px 0;" />
                        <p style="white-space: pre-wrap; font-size: 15px; color: #d4d4d4; line-height: 1.6;">${safeDetails}</p>
                        <hr style="border: 1px solid #10b98133; margin: 20px 0;" />
                        <p style="font-size: 11px; color: #9ca3af;">END OF TRANSMISSION // SENT VIA ZHOVON.COM</p>
                    </div>
                `,
            })

            const timeoutPromise = new Promise((_, reject) =>
                setTimeout(() => reject(new Error('Resend transport timeout')), 5000)
            )

            await Promise.race([emailPromise, timeoutPromise]).catch((mailErr) => {
                console.error('Email dispatch failure (order captured in DB):', mailErr)
            })
        }

        return NextResponse.json({
            success: true,
            submissionId,
            message: 'Order transmission received and logged successfully',
        })
    } catch (error) {
        console.error('Order endpoint error:', error)
        return NextResponse.json({ error: 'Transmission Failed' }, { status: 500 })
    }
}
