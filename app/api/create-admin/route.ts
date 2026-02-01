import { getPayload } from 'payload'
import config from '../../../payload.config'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
    try {
        let email: string
        let password: string

        try {
            const body = await request.json()
            email = body.email
            password = body.password
        } catch (parseError) {
            console.error('JSON parse error:', parseError)
            return NextResponse.json(
                { error: 'Invalid JSON in request body' },
                { status: 400 }
            )
        }

        if (!email || !password) {
            return NextResponse.json(
                { error: 'Email and password are required' },
                { status: 400 }
            )
        }

        console.log('Creating admin user with email:', email)

        const payload = await getPayload({ config })

        // Create the first admin user
        const user = await payload.create({
            collection: 'users',
            data: {
                email,
                password,
                roles: ['admin'],
            },
        })

        return NextResponse.json({
            success: true,
            message: 'Admin user created successfully',
            user: {
                id: user.id,
                email: user.email,
            },
        })
    } catch (error: any) {
        console.error('Error creating admin user:', error)
        return NextResponse.json(
            { error: error.message || 'Failed to create admin user' },
            { status: 500 }
        )
    }
}
