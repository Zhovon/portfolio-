import { Resend } from 'resend'
import { NextRequest, NextResponse } from 'next/server'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const { name, email, subject, message } = body

        // Validation
        if (!name || !email || !message) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            )
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(email)) {
            return NextResponse.json(
                { error: 'Invalid email address' },
                { status: 400 }
            )
        }

        console.log('📧 Attempting to send emails...')
        console.log('From:', name, email)
        console.log('Message:', message.substring(0, 100))

        // Send notification email to admin
        const adminEmail = await resend.emails.send({
            from: 'Portfolio Contact <noreply@zhovon.com>',
            to: 'admin@zhovon.com',
            subject: `New Contact Form Submission: ${subject || 'No Subject'}`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #f9fafb; border-radius: 8px;">
                    <div style="background: linear-gradient(135deg, #10B981 0%, #14B8A6 50%, #06B6D4 100%); padding: 30px; border-radius: 8px 8px 0 0; text-align: center;">
                        <h1 style="color: white; margin: 0; font-size: 24px; font-weight: bold;">New Contact Form Submission</h1>
                    </div>
                    <div style="background: white; padding: 30px; border-radius: 0 0 8px 8px;">
                        <div style="margin-bottom: 20px;">
                            <p style="margin: 0 0 5px 0; color: #6b7280; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">From</p>
                            <p style="margin: 0; color: #111827; font-size: 16px; font-weight: 600;">${name}</p>
                            <p style="margin: 5px 0 0 0; color: #10B981; font-size: 14px;">${email}</p>
                        </div>
                        <div style="margin-bottom: 20px;">
                            <p style="margin: 0 0 5px 0; color: #6b7280; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Subject</p>
                            <p style="margin: 0; color: #111827; font-size: 16px;">${subject || 'No Subject'}</p>
                        </div>
                        <div style="margin-bottom: 20px;">
                            <p style="margin: 0 0 10px 0; color: #6b7280; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Message</p>
                            <div style="background: #f9fafb; padding: 15px; border-radius: 6px; border-left: 4px solid #10B981;">
                                <p style="margin: 0; color: #374151; font-size: 14px; line-height: 1.6; white-space: pre-wrap;">${message}</p>
                            </div>
                        </div>
                        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
                            <p style="margin: 0; color: #9ca3af; font-size: 12px; text-align: center;">
                                Received on ${new Date().toLocaleString('en-US', { dateStyle: 'full', timeStyle: 'short' })}
                            </p>
                        </div>
                    </div>
                </div>
            `
        })

        console.log('✅ Admin email sent:', adminEmail)

        // Send auto-reply to user
        const userEmail = await resend.emails.send({
            from: 'Zhovon <noreply@zhovon.com>',
            to: email,
            subject: 'Thanks for reaching out! 🚀',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #020202;">
                    <div style="background: linear-gradient(135deg, #10B981 0%, #14B8A6 50%, #06B6D4 100%); padding: 40px; border-radius: 12px; text-align: center;">
                        <h1 style="color: white; margin: 0 0 10px 0; font-size: 32px; font-weight: 900; letter-spacing: -1px;">MISSION RECEIVED</h1>
                        <p style="color: rgba(255,255,255,0.9); margin: 0; font-size: 14px; text-transform: uppercase; letter-spacing: 2px;">Transmission Confirmed</p>
                    </div>
                    <div style="background: #111111; padding: 40px; border-radius: 12px; margin-top: 20px;">
                        <p style="color: #e5e7eb; font-size: 16px; line-height: 1.8; margin: 0 0 20px 0;">
                            Hey <strong style="color: #10B981;">${name}</strong>,
                        </p>
                        <p style="color: #9ca3af; font-size: 15px; line-height: 1.8; margin: 0 0 20px 0;">
                            Thanks for reaching out! Your message has been successfully received and logged into my mission control system. I'll review your inquiry and get back to you within <strong style="color: #14B8A6;">24-48 hours</strong>.
                        </p>
                        <div style="background: rgba(16, 185, 129, 0.1); border-left: 4px solid #10B981; padding: 20px; border-radius: 6px; margin: 30px 0;">
                            <p style="color: #6b7280; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; margin: 0 0 10px 0;">Your Message</p>
                            <p style="color: #d1d5db; font-size: 14px; line-height: 1.6; margin: 0; white-space: pre-wrap;">${message.substring(0, 200)}${message.length > 200 ? '...' : ''}</p>
                        </div>
                        <p style="color: #9ca3af; font-size: 14px; line-height: 1.8; margin: 30px 0 0 0;">
                            In the meantime, feel free to check out my latest projects or connect with me on social media.
                        </p>
                        <div style="margin-top: 30px; text-align: center;">
                            <a href="https://github.com/Zhovon" style="display: inline-block; margin: 0 10px; color: #10B981; text-decoration: none; font-size: 14px; font-weight: 600;">GitHub</a>
                            <span style="color: #374151;">•</span>
                            <a href="https://www.linkedin.com/in/shahadat-hossain-b314601b2/" style="display: inline-block; margin: 0 10px; color: #14B8A6; text-decoration: none; font-size: 14px; font-weight: 600;">LinkedIn</a>
                            <span style="color: #374151;">•</span>
                            <a href="https://www.facebook.com/shahadathossai.shovon" style="display: inline-block; margin: 0 10px; color: #06B6D4; text-decoration: none; font-size: 14px; font-weight: 600;">Facebook</a>
                        </div>
                    </div>
                    <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #1f2937;">
                        <p style="color: #6b7280; font-size: 12px; margin: 0 0 5px 0;">Shahadat Hossain (Zhovon)</p>
                        <p style="color: #4b5563; font-size: 11px; margin: 0;">Lead SaaS Architect & Full-Stack Engineer</p>
                        <p style="color: #10B981; font-size: 11px; margin: 5px 0 0 0;">71, Sayed Nagar, Dakshin Khan, Dhaka 1230</p>
                    </div>
                </div>
            `
        })

        console.log('✅ User auto-reply sent:', userEmail)

        return NextResponse.json(
            { success: true, message: 'Message sent successfully' },
            { status: 200 }
        )
    } catch (error) {
        console.error('Contact form error:', error)
        return NextResponse.json(
            { error: 'Failed to send message. Please try again later.' },
            { status: 500 }
        )
    }
}
