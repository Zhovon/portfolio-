import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { z } from 'zod'
import { checkRateLimit, escapeHtml, getClientIp } from '@/lib/api-utils'

const resend = new Resend(process.env.RESEND_API_KEY || 're_dummy_for_build')

const contactSchema = z.object({
    name: z.string().trim().min(1).max(100),
    email: z.string().trim().email().max(200),
    message: z.string().trim().min(1).max(5000),
})

export async function POST(req: Request) {
    try {
        const allowed = await checkRateLimit(`contact:${getClientIp(req)}`)
        if (!allowed) {
            return NextResponse.json({ error: 'Too many requests' }, { status: 429 })
        }

        const parsed = contactSchema.safeParse(await req.json())
        if (!parsed.success) {
            return NextResponse.json({ error: 'Missing or invalid parameters' }, { status: 400 })
        }

        const { name, email, message } = parsed.data
        const safeName = escapeHtml(name)
        const safeEmail = escapeHtml(email)
        const safeMessage = escapeHtml(message)

        const toEmail = process.env.CONTACT_EMAIL || 'shahadathossain1932@gmail.com'

        const data = await resend.emails.send({
            from: 'Zhovon Protocol <onboarding@resend.dev>', // Verifiable via resend
            to: [toEmail],
            replyTo: email,
            subject: `[ZHOVON_SYS] New Comms from ${name}`,
            html: `
                <div style="font-family: monospace; background-color: #0a0a0a; color: #10b981; padding: 40px;">
                    <h2 style="color: #fff; text-transform: uppercase;">Incoming Interface Transmission</h2>
                    <p><strong>SENDER:</strong> ${safeName} &lt;${safeEmail}&gt;</p>
                    <hr style="border: 1px solid #10b98133;" />
                    <p style="white-space: pre-wrap; font-size: 16px; color: #d4d4d4;">${safeMessage}</p>
                    <hr style="border: 1px solid #10b98133;" />
                    <p style="font-size: 10px; color: #a3a3a3;">END OF TRANSMISSION // SENT VIA ZHOVON.COM</p>
                </div>
            `,
        })

        return NextResponse.json({ success: true, data })
    } catch (error) {
        console.error('Contact error:', error)
        return NextResponse.json({ error: 'Transmission Failed' }, { status: 500 })
    }
}
