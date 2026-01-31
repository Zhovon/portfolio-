import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@/payload.config'

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
    try {
        console.log('🔄 Testing /api/users/me endpoint...')

        const payload = await getPayload({ config })
        console.log('✅ Payload initialized')

        // Try to get the current user (this is what /api/users/me does)
        // Since we're not authenticated, this should return null or an error
        const result = await payload.find({
            collection: 'users',
            limit: 1,
        })

        console.log('✅ Users query succeeded')
        console.log('Users count:', result.docs.length)

        return NextResponse.json({
            success: true,
            message: 'API is working correctly',
            usersCount: result.docs.length,
            hasUsers: result.docs.length > 0,
            timestamp: new Date().toISOString(),
        })
    } catch (error) {
        console.error('❌ Error:', error)

        return NextResponse.json({
            success: false,
            error: error instanceof Error ? error.message : 'Unknown error',
            stack: error instanceof Error ? error.stack : undefined,
            timestamp: new Date().toISOString(),
        }, { status: 500 })
    }
}
