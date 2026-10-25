import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { createClient } from '@supabase/supabase-js'
import { checkRateLimit, getClientIp } from '@/lib/rate-limit'

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
        const ip = getClientIp(req)
        const rateCheck = checkRateLimit(`contact:${ip}`, 5, 60 * 1000)
        if (!rateCheck.success) {
            return NextResponse.json(
                { error: 'Rate limit exceeded. Please wait a minute before sending another message.' },
                { status: 429 }
            )
        }

        const { name, email, message } = await req.json()

        if (!name || !email || !message) {
            return NextResponse.json({ error: 'Missing required parameters' }, { status: 400 })
        }

        const trimmedName = String(name).trim()
        const trimmedEmail = String(email).trim()
        const trimmedMessage = String(message).trim()

        if (trimmedName.length > 100 || trimmedEmail.length > 255 || trimmedMessage.length > 5000) {
            return NextResponse.json({ error: 'Payload exceeds maximum allowed length' }, { status: 400 })
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(trimmedEmail)) {
            return NextResponse.json({ error: 'Invalid email address format' }, { status: 400 })
        }

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
        const toEmail = process.env.CONTACT_EMAIL || 'admin@zhovon.com'
        const fromEmail = process.env.MAIL_FROM || 'Zhovon <admin@zhovon.com>'

        if (resendApiKey) {
            const resend = new Resend(resendApiKey)
            const safeName = escapeHtml(trimmedName)
            const safeEmail = escapeHtml(trimmedEmail)
            const safeMessage = escapeHtml(trimmedMessage)

            const emailPromise = resend.emails.send({
                from: fromEmail,
                to: [toEmail],
                replyTo: trimmedEmail,
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

            // Auto-reply confirmation receipt to the visitor
            const visitorReceiptPromise = resend.emails.send({
                from: fromEmail,
                to: [trimmedEmail],
                subject: `Transmission Confirmed // Zhovon Engineering Protocol`,
                html: `
                    <div style="font-family: monospace; background-color: #030712; color: #f9fafb; padding: 32px; border-radius: 12px; border: 1px solid #10b98144; max-width: 600px; margin: 0 auto;">
                        <div style="border-bottom: 1px solid #10b98133; padding-bottom: 16px; margin-bottom: 24px;">
                            <span style="font-size: 11px; color: #10b981; letter-spacing: 0.25em; text-transform: uppercase;">// ZHOVON PROTOCOL // SYSTEM DISPATCH</span>
                            <h2 style="font-size: 20px; color: #ffffff; margin: 8px 0 0 0; text-transform: uppercase;">Transmission Acknowledged</h2>
                        </div>
                        <p style="color: #9ca3af; font-size: 14px; line-height: 1.6;">
                            Hello <strong style="color: #ffffff;">${safeName}</strong>,
                        </p>
                        <p style="color: #9ca3af; font-size: 14px; line-height: 1.6;">
                            Your briefing has been received and securely logged to the active priority queue at <strong style="color: #10b981;">admin@zhovon.com</strong>.
                        </p>
                        <div style="background-color: #111827; border-left: 3px solid #10b981; padding: 16px; margin: 20px 0; border-radius: 4px;">
                            <p style="margin: 0; font-size: 11px; color: #6b7280; text-transform: uppercase;">Transmitted Briefing</p>
                            <p style="margin: 8px 0 0 0; color: #e5e7eb; font-size: 13px; white-space: pre-wrap; font-style: italic;">"${safeMessage.slice(0, 350)}${safeMessage.length > 350 ? '...' : ''}"</p>
                        </div>
                        <p style="color: #9ca3af; font-size: 13px; line-height: 1.6;">
                            <strong>Response Turnaround:</strong> Typically within 24 to 48 hours.<br/>
                            For urgent inquiries or direct scheduling, reply to this email or contact <a href="mailto:admin@zhovon.com" style="color: #10b981; text-decoration: none;">admin@zhovon.com</a>.
                        </p>
                        <div style="border-top: 1px solid #1f2937; margin-top: 24px; padding-top: 16px; font-size: 11px; color: #6b7280; display: flex; justify-content: space-between;">
                            <span>LOCATION: BANGALORE / DHAKA</span>
                            <span>PORTFOLIO: ZHOVON.COM</span>
                        </div>
                    </div>
                `,
            }).catch((receiptErr) => {
                console.warn('Visitor auto-reply delivery warning:', receiptErr)
            })

            // 5-second timeout safeguard for email transport
            const timeoutPromise = new Promise((_, reject) =>
                setTimeout(() => reject(new Error('Resend transport timeout')), 5000)
            )

            await Promise.race([
                Promise.all([emailPromise, visitorReceiptPromise]),
                timeoutPromise,
            ]).catch((mailErr) => {
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
