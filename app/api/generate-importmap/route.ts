import { NextRequest, NextResponse } from 'next/server'
import { exec } from 'child_process'
import { promisify } from 'util'

const execAsync = promisify(exec)

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
    try {
        console.log('🔄 Generating Payload import map...')

        // Run the payload generate:importmap command
        const { stdout, stderr } = await execAsync('npx payload generate:importmap')

        console.log('✅ Import map generated successfully')
        console.log('stdout:', stdout)
        if (stderr) console.log('stderr:', stderr)

        return NextResponse.json({
            success: true,
            message: 'Import map generated successfully',
            output: stdout,
            timestamp: new Date().toISOString(),
        })
    } catch (error) {
        console.error('❌ Import map generation failed:', error)
        return NextResponse.json({
            success: false,
            error: error instanceof Error ? error.message : 'Unknown error',
            timestamp: new Date().toISOString(),
        }, { status: 500 })
    }
}
