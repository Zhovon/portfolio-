import { ImageResponse } from 'next/og'
import { NextRequest } from 'next/server'

export const runtime = 'edge'

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url)
        
        // Dynamic Params
        const title = searchParams.get('title') || 'Zhovon // Digital Architecture'
        const category = searchParams.get('category') || 'Portfolio'

        return new ImageResponse(
            (
                <div
                    style={{
                        height: '100%',
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                        justifyContent: 'center',
                        backgroundColor: '#0a0a0a',
                        backgroundImage: 'radial-gradient(circle at 25px 25px, #10b981 2%, transparent 0%), radial-gradient(circle at 75px 75px, #10b981 2%, transparent 0%)',
                        backgroundSize: '100px 100px',
                        padding: '80px',
                        fontFamily: 'Inter, sans-serif'
                    }}
                >
                    <div style={{ 
                        display: 'flex',
                        alignItems: 'center',
                        color: '#10b981', 
                        fontSize: 32, 
                        letterSpacing: '0.2em',
                        textTransform: 'uppercase',
                        fontWeight: 'bold',
                        marginBottom: 40
                    }}>
                        {category} <span style={{ color: '#fff', marginLeft: 10, marginRight: 10 }}>//</span> [ZHOVON_SYS]
                    </div>
                    
                    <div
                        style={{
                            display: 'flex',
                            fontSize: 100,
                            fontStyle: 'italic',
                            fontWeight: 900,
                            letterSpacing: '-0.05em',
                            color: 'white',
                            lineHeight: 1,
                            textTransform: 'uppercase',
                        }}
                    >
                        {title}
                    </div>

                    <div style={{
                        display: 'flex',
                        position: 'absolute',
                        bottom: 80,
                        left: 80,
                        color: '#a3a3a3',
                        fontSize: 24,
                        letterSpacing: '0.1em'
                    }}>
                        ZHOVON.COM // LEAD SAAS ARCHITECT
                    </div>
                    
                    <div style={{
                        display: 'flex',
                        position: 'absolute',
                        bottom: 80,
                        right: 80,
                        width: 80,
                        height: 80,
                        backgroundColor: '#10b981',
                        borderRadius: '50%'
                    }}></div>
                </div>
            ),
            {
                width: 1200,
                height: 630,
            }
        )
    } catch (e: any) {
        return new Response('Failed to generate OG image', { status: 500 })
    }
}
