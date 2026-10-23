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
        const { name, email, message } = await req.json()

        if (!name || !email || !message) {
            return NextResponse.json({ error: 'Missing required parameters' }, { status: 400 })
        }

        const trimmedName = String(name).trim()
        const trimmedEmail = String(email).trim()
        const trimmedMessage = String(message).trim()

        // 1. Enforce Denominator Rule: Persist submission to Supabase database first
        let submissionId: string | null = null
        const supabase = getSupabaseClient()
        if (supabase) {
            const { data: inserted, error: dbError } = await supabase
                .from('contact_submissions')
                .insert([
                    {
                        name: trimmedName,
                        email: trimmedEmail,
                        message: trimmedMessage,
                    },
                ])
                .select('id')
                .single()

            if (dbError) {
                console.error('Failed to log contact submission to DB:', dbError)
            } else if (inserted) {
                submissionId = inserted.id
            }
        }

        // 2. Dispatch notification email if Resend is configured
        const resendApiKey = process.env.RESEND_API_KEY
        const toEmail = process.env.CONTACT_EMAIL || 'shahadathossain1932@gmail.com'
        const fromEmail = process.env.MAIL_FROM || 'Zhovon Protocol <onboarding@resend.dev>'

        if (resendApiKey) {
            const resend = new Resend(resendApiKey)
            const safeName = escapeHtml(trimmedName)
            const safeEmail = escapeHtml(trimmedEmail)
            const safeMessage = escapeHtml(trimmedMessage)

            const emailPromise = resend.emails.send({
                from: fromEmail,
                to: [toEmail],
                subject: `[ZHOVON_SYS] New Comms from ${safeName}`,
                html: `
                    <div style="font-family: monospace; background-color: #0a0a0a; color: #10b981; padding: 40px; border-radius: 8px;">
                        <h2 style="color: #ffffff; text-transform: uppercase;">Incoming Interface Transmission</h2>
                        <p style="margin: 8px 0;"><strong>SENDER:</strong> ${safeName} &lt;${safeEmail}&gt;</p>
                        <hr style="border: 1px solid #10b98133; margin: 16px 0;" />
                        <p style="white-space: pre-wrap; font-size: 15px; color: #d4d4d4; line-height: 1.6;">${safeMessage}</p>
                        <hr style="border: 1px solid #10b98133; margin: 16px 0;" />
                        <p style="font-size: 11px; color: #a3a3a3;">END OF TRANSMISSION // SENT VIA ZHOVON.COM</p>
                    </div>
                `,
            })

            // 5-second timeout safeguard for email transport
            const timeoutPromise = new Promise((_, reject) =>
                setTimeout(() => reject(new Error('Resend transport timeout')), 5000)
            )

            await Promise.race([emailPromise, timeoutPromise]).catch((mailErr) => {
                console.error('Email dispatch failure (submission captured in DB):', mailErr)
            })
        }

        return NextResponse.json({
            success: true,
            submissionId,
            message: 'Transmission received and logged successfully',
        })
    } catch (error) {
        console.error('Contact endpoint error:', error)
        return NextResponse.json({ error: 'Transmission Failed' }, { status: 500 })
    }
}
