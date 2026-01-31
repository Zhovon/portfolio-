import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
    // Check all environment variables
    const envCheck = {
        // blob_ prefixed (what we see in Vercel dashboard)
        blob_POSTGRES_URL: !!process.env.blob_POSTGRES_URL,
        blob_PRISMA_DATABASE_URL: !!process.env.blob_PRISMA_DATABASE_URL,
        blob_DATABASE_URL: !!process.env.blob_DATABASE_URL,
        // STORAGE_ prefixed (what we were looking for)
        STORAGE_POSTGRES_URL: !!process.env.STORAGE_POSTGRES_URL,
        STORAGE_PRISMA_DATABASE_URL: !!process.env.STORAGE_PRISMA_DATABASE_URL,
        STORAGE_DATABASE_URL: !!process.env.STORAGE_DATABASE_URL,
        // Standard Vercel Postgres
        POSTGRES_URL: !!process.env.POSTGRES_URL,
        POSTGRES_PRISMA_URL: !!process.env.POSTGRES_PRISMA_URL,
        // Other
        PAYLOAD_SECRET: !!process.env.PAYLOAD_SECRET,
        NEXT_PUBLIC_SERVER_URL: !!process.env.NEXT_PUBLIC_SERVER_URL,
        BLOB_READ_WRITE_TOKEN: !!process.env.BLOB_READ_WRITE_TOKEN,
    }

    // Get the actual database URL being used
    const dbUrl = process.env.blob_POSTGRES_URL ||
        process.env.blob_PRISMA_DATABASE_URL ||
        process.env.blob_DATABASE_URL ||
        process.env.STORAGE_POSTGRES_URL ||
        process.env.POSTGRES_URL ||
        process.env.DATABASE_URL

    return NextResponse.json({
        envCheck,
        dbUrlFound: !!dbUrl,
        dbUrlPrefix: dbUrl ? dbUrl.substring(0, 20) + '...' : 'NOT FOUND',
        timestamp: new Date().toISOString(),
    })
}
