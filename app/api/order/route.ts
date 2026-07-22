import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { z } from 'zod'
import { checkRateLimit, escapeHtml, getClientIp } from '@/lib/api-utils'

const resend = new Resend(process.env.RESEND_API_KEY || 're_dummy_for_build')

const orderSchema = z.object({
    name: z.string().trim().min(1).max(100),
    email: z.string().trim().email().max(200),
    packageType: z.string().trim().min(1).max(100),
    budget: z.string().trim().max(100).optional(),
    details: z.string().trim().min(1).max(5000),
})

export async function POST(req: Request) {
    try {
        const allowed = await checkRateLimit(`order:${getClientIp(req)}`)
        if (!allowed) {
            return NextResponse.json({ error: 'Too many requests' }, { status: 429 })
        }

        const parsed = orderSchema.safeParse(await req.json())
        if (!parsed.success) {
            return NextResponse.json({ error: 'Missing or invalid parameters' }, { status: 400 })
        }

        const { name, email, packageType, budget, details } = parsed.data
        const safeName = escapeHtml(name)
        const safeEmail = escapeHtml(email)
        const safePackage = escapeHtml(packageType)
        const safeBudget = escapeHtml(budget || 'Not specified')
        const safeDetails = escapeHtml(details)

        const toEmail = process.env.CONTACT_EMAIL || 'shahadathossain1932@gmail.com'

        const data = await resend.emails.send({
            from: 'Zhovon Orders <onboarding@resend.dev>',
            to: [toEmail],
            replyTo: email,
            subject: `[ZHOVON_SYS] New Order Request - ${packageType}`,
            html: `
                <div style="font-family: monospace; background-color: #050505; color: #e5e7eb; padding: 40px;">
                    <h2 style="color: #10b981; text-transform: uppercase; letter-spacing: 0.2em;">Incoming Order Transmission</h2>
                    <p><strong>SENDER:</strong> ${safeName} &lt;${safeEmail}&gt;</p>
                    <p><strong>PACKAGE:</strong> ${safePackage}</p>
                    <p><strong>BUDGET:</strong> ${safeBudget}</p>
                    <hr style="border: 1px solid #10b98133; margin: 24px 0;" />
                    <p style="white-space: pre-wrap; font-size: 16px; color: #d4d4d4; line-height: 1.6;">${safeDetails}</p>
                    <hr style="border: 1px solid #10b98133; margin: 24px 0;" />
                    <p style="font-size: 10px; color: #9ca3af;">END OF TRANSMISSION // SENT VIA ZHOVON.COM</p>
                </div>
            `,
        })

        return NextResponse.json({ success: true, data })
    } catch (error) {
        console.error('Order error:', error)
        return NextResponse.json({ error: 'Transmission Failed' }, { status: 500 })
    }
}
