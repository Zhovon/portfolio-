import { NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY || 're_dummy_for_build')

export async function POST(req: Request) {
    try {
        const { name, email, packageType, budget, details } = await req.json()

        if (!name || !email || !packageType || !details) {
            return NextResponse.json({ error: 'Missing parameters' }, { status: 400 })
        }

        const toEmail = process.env.CONTACT_EMAIL || 'shahadathossain1932@gmail.com'

        const data = await resend.emails.send({
            from: 'Zhovon Orders <onboarding@resend.dev>',
            to: [toEmail],
            subject: `[ZHOVON_SYS] New Order Request - ${packageType}`,
            html: `
                <div style="font-family: monospace; background-color: #050505; color: #e5e7eb; padding: 40px;">
                    <h2 style="color: #10b981; text-transform: uppercase; letter-spacing: 0.2em;">Incoming Order Transmission</h2>
                    <p><strong>SENDER:</strong> ${name} &lt;${email}&gt;</p>
                    <p><strong>PACKAGE:</strong> ${packageType}</p>
                    <p><strong>BUDGET:</strong> ${budget || 'Not specified'}</p>
                    <hr style="border: 1px solid #10b98133; margin: 24px 0;" />
                    <p style="white-space: pre-wrap; font-size: 16px; color: #d4d4d4; line-height: 1.6;">${details}</p>
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
