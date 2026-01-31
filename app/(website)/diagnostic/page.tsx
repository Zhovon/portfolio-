import { headers } from 'next/headers'

export const dynamic = 'force-dynamic'

export default async function DiagnosticPage() {
    const diagnostics = {
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV,
        hasPostgresPrismaUrl: !!process.env.blob_PRISMA_DATABASE_URL,
        hasPostgresUrl: !!process.env.blob_DATABASE_URL,
        hasDatabaseUrl: !!process.env.DATABASE_URL,
        payloadSecret: !!process.env.PAYLOAD_SECRET,
        serverUrl: process.env.NEXT_PUBLIC_SERVER_URL,
    }

    // Try to get database host without exposing credentials
    let dbHost = 'Not configured'
    const dbUrl = process.env.blob_PRISMA_DATABASE_URL || process.env.blob_DATABASE_URL || process.env.DATABASE_URL
    if (dbUrl) {
        const match = dbUrl.match(/postgresql:\/\/.*@([^\/]+)/)
        dbHost = match ? match[1] : 'Invalid URL format'
    }

    return (
        <div style={{ fontFamily: 'monospace', padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
            <h1>🔍 Payload CMS Diagnostics</h1>
            <p style={{ color: '#666' }}>Generated at: {diagnostics.timestamp}</p>

            <h2>Environment Variables</h2>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <tbody>
                    <tr style={{ borderBottom: '1px solid #ddd' }}>
                        <td style={{ padding: '8px' }}><strong>NODE_ENV</strong></td>
                        <td style={{ padding: '8px' }}>{diagnostics.environment}</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid #ddd' }}>
                        <td style={{ padding: '8px' }}><strong>blob_PRISMA_DATABASE_URL</strong></td>
                        <td style={{ padding: '8px' }}>{diagnostics.hasPostgresPrismaUrl ? '✅ Set' : '❌ Not set'}</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid #ddd' }}>
                        <td style={{ padding: '8px' }}><strong>blob_DATABASE_URL</strong></td>
                        <td style={{ padding: '8px' }}>{diagnostics.hasPostgresUrl ? '✅ Set' : '❌ Not set'}</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid #ddd' }}>
                        <td style={{ padding: '8px' }}><strong>DATABASE_URL</strong></td>
                        <td style={{ padding: '8px' }}>{diagnostics.hasDatabaseUrl ? '✅ Set' : '❌ Not set'}</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid #ddd' }}>
                        <td style={{ padding: '8px' }}><strong>PAYLOAD_SECRET</strong></td>
                        <td style={{ padding: '8px' }}>{diagnostics.payloadSecret ? '✅ Set' : '❌ Not set'}</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid #ddd' }}>
                        <td style={{ padding: '8px' }}><strong>NEXT_PUBLIC_SERVER_URL</strong></td>
                        <td style={{ padding: '8px' }}>{diagnostics.serverUrl || '❌ Not set'}</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid #ddd' }}>
                        <td style={{ padding: '8px' }}><strong>Database Host</strong></td>
                        <td style={{ padding: '8px' }}>{dbHost}</td>
                    </tr>
                </tbody>
            </table>

            <h2>Next Steps</h2>
            <ul>
                <li>If database variables are not set, check Vercel environment variables</li>
                <li>If database host shows "Not configured", no database URL is available</li>
                <li>Try accessing <a href="/admin">/admin</a> to test Payload CMS</li>
            </ul>

            <p style={{ marginTop: '40px', padding: '16px', background: '#f0f0f0', borderRadius: '4px' }}>
                <strong>⚠️ Security Note:</strong> This page should be removed or protected in production.
            </p>
        </div>
    )
}
