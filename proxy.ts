import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function proxy(request: NextRequest) {
    // 'unsafe-eval' is only needed by Next.js dev tooling (source maps/HMR)
    const devScriptSrc = process.env.NODE_ENV === 'development' ? " 'unsafe-eval'" : ''

    const cspHeader = `
    default-src 'self';
    script-src 'self' 'unsafe-inline'${devScriptSrc} https://*.cal.com https://cal.com https://va.vercel-scripts.com https://vercel.live;
    style-src 'self' 'unsafe-inline';
    img-src 'self' blob: data: https:;
    font-src 'self' data:;
    connect-src 'self' https://*.cal.com https://cal.com https://*.supabase.co https://vitals.vercel-insights.com;
    frame-src https://*.cal.com https://cal.com;
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    upgrade-insecure-requests;
`
    const requestHeaders = new Headers(request.headers)
    requestHeaders.set('Content-Security-Policy', cspHeader.replace(/\s{2,}/g, ' ').trim())

    const response = NextResponse.next({
        request: {
            headers: requestHeaders,
        },
    })

    const securityHeaders = {
        'X-DNS-Prefetch-Control': 'on',
        'Strict-Transport-Security': 'max-age=63072000; includeSubDomains; preload',
        'X-Frame-Options': 'DENY',
        'X-Content-Type-Options': 'nosniff',
        'Referrer-Policy': 'origin-when-cross-origin',
        'Content-Security-Policy': cspHeader.replace(/\s{2,}/g, ' ').trim()
    }

    Object.entries(securityHeaders).forEach(([key, value]) => {
        response.headers.set(key, value)
    })

    return response
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
}
