import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@/payload.config'

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
    try {
        console.log('🔄 Initializing Payload and creating database tables...')

        // Initialize Payload - this should trigger table creation with push: true
        const payload = await getPayload({ config })

        console.log('✅ Payload initialized successfully')

        // Try to query the users collection to verify tables exist
        try {
            await payload.find({
                collection: 'users',
                limit: 1,
            })
            console.log('✅ Users table exists and is accessible')
        } catch (error) {
            console.log('⚠️ Users table query failed:', error)
        }

        return NextResponse.json({
            success: true,
            message: 'Database initialized successfully. Tables should now be created.',
            timestamp: new Date().toISOString(),
        })
    } catch (error) {
        console.error('❌ Database initialization failed:', error)
        return NextResponse.json({
            success: false,
            error: error instanceof Error ? error.message : 'Unknown error',
            timestamp: new Date().toISOString(),
        }, { status: 500 })
    }
}
