import { NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY || 're_dummy_for_build')

export async function POST(req: Request) {
    try {
        const { name, email, message } = await req.json()

        if (!name || !email || !message) {
            return NextResponse.json({ error: 'Missing parameters' }, { status: 400 })
        }

        const toEmail = process.env.CONTACT_EMAIL || 'shahadathossain1932@gmail.com'

        const data = await resend.emails.send({
            from: 'Zhovon Protocol <onboarding@resend.dev>', // Verifiable via resend
            to: [toEmail],
            subject: `[ZHOVON_SYS] New Comms from ${name}`,
            html: `
                <div style="font-family: monospace; background-color: #0a0a0a; color: #10b981; padding: 40px;">
                    <h2 style="color: #fff; text-transform: uppercase;">Incoming Interface Transmission</h2>
                    <p><strong>SENDER:</strong> ${name} &lt;${email}&gt;</p>
                    <hr style="border: 1px solid #10b98133;" />
                    <p style="white-space: pre-wrap; font-size: 16px; color: #d4d4d4;">${message}</p>
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
