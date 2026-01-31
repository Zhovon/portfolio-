import { headers } from 'next/headers'

export const dynamic = 'force-dynamic'

export default async function DiagnosticPage() {
    // Check all possible Vercel Postgres variable names
    const envVars = {
        // Postgres variables
        blob_POSTGRES_URL: process.env.blob_POSTGRES_URL,
        blob_PRISMA_DATABASE_URL: process.env.blob_PRISMA_DATABASE_URL,
        blob_DATABASE_URL: process.env.blob_DATABASE_URL,
        STORAGE_POSTGRES_URL: process.env.STORAGE_POSTGRES_URL,
        STORAGE_PRISMA_DATABASE_URL: process.env.STORAGE_PRISMA_DATABASE_URL,
        STORAGE_DATABASE_URL: process.env.STORAGE_DATABASE_URL,
        POSTGRES_URL: process.env.POSTGRES_URL,
        POSTGRES_PRISMA_URL: process.env.POSTGRES_PRISMA_URL,
        POSTGRES_URL_NON_POOLING: process.env.POSTGRES_URL_NON_POOLING,
        DATABASE_URL: process.env.DATABASE_URL,
        // Blob Storage variables
        BLOB_READ_WRITE_TOKEN: process.env.BLOB_READ_WRITE_TOKEN,
        // Payload variables
        PAYLOAD_SECRET: process.env.PAYLOAD_SECRET,
        NEXT_PUBLIC_SERVER_URL: process.env.NEXT_PUBLIC_SERVER_URL,
    }

    const diagnostics = {
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV,
        envVars,
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
                <thead>
                    <tr style={{ borderBottom: '2px solid #333', background: '#f5f5f5' }}>
                        <th style={{ padding: '8px', textAlign: 'left' }}>Variable Name</th>
                        <th style={{ padding: '8px', textAlign: 'left' }}>Status</th>
                        <th style={{ padding: '8px', textAlign: 'left' }}>Value (masked)</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.entries(envVars).map(([key, value]) => (
                        <tr key={key} style={{ borderBottom: '1px solid #ddd' }}>
                            <td style={{ padding: '8px', fontWeight: 'bold' }}>{key}</td>
                            <td style={{ padding: '8px' }}>
                                {value ? '✅ Set' : '❌ Not set'}
                            </td>
                            <td style={{ padding: '8px', fontFamily: 'monospace', fontSize: '12px' }}>
                                {value ? `${String(value).substring(0, 20)}...` : '-'}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <h2>Database Connection</h2>
            <p><strong>Using:</strong> {dbHost}</p>

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
