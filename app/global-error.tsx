'use client'

import { useEffect } from 'react'

export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        console.error('Critical Global Anomaly:', error)
    }, [error])

    return (
        <html lang="en">
            <body style={{
                margin: 0,
                padding: 0,
                backgroundColor: '#030712',
                color: '#f9fafb',
                fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '100vh',
            }}>
                <div style={{
                    maxWidth: '520px',
                    width: '90%',
                    padding: '40px',
                    backgroundColor: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid rgba(239, 68, 68, 0.3)',
                    borderRadius: '16px',
                    textAlign: 'center',
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
                }}>
                    <div style={{
                        display: 'inline-block',
                        padding: '4px 12px',
                        backgroundColor: 'rgba(239, 68, 68, 0.1)',
                        border: '1px solid rgba(239, 68, 68, 0.25)',
                        borderRadius: '9999px',
                        color: '#f87171',
                        fontSize: '11px',
                        letterSpacing: '0.15em',
                        textTransform: 'uppercase',
                        marginBottom: '20px',
                    }}>
                        Critical Root Fault // Kernel Isolated
                    </div>

                    <h1 style={{
                        fontSize: '28px',
                        fontWeight: 900,
                        margin: '0 0 12px 0',
                        color: '#ffffff',
                        textTransform: 'uppercase',
                        letterSpacing: '-0.02em',
                    }}>
                        System Fault
                    </h1>

                    <p style={{
                        fontSize: '14px',
                        color: '#9ca3af',
                        lineHeight: '1.6',
                        margin: '0 0 24px 0',
                    }}>
                        A critical exception occurred at the root application shell. Core services have been paused to prevent cascading corruption.
                    </p>

                    {error?.digest && (
                        <div style={{
                            padding: '8px 12px',
                            backgroundColor: 'rgba(0, 0, 0, 0.4)',
                            border: '1px solid rgba(255, 255, 255, 0.05)',
                            borderRadius: '6px',
                            fontSize: '11px',
                            color: '#6b7280',
                            marginBottom: '24px',
                            wordBreak: 'break-all',
                        }}>
                            FAULT_DIGEST: {error.digest}
                        </div>
                    )}

                    <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
                        <button
                            type="button"
                            onClick={() => reset()}
                            style={{
                                padding: '12px 24px',
                                backgroundColor: '#ffffff',
                                color: '#000000',
                                border: 'none',
                                borderRadius: '9999px',
                                fontSize: '11px',
                                fontWeight: 900,
                                letterSpacing: '0.1em',
                                textTransform: 'uppercase',
                                cursor: 'pointer',
                            }}
                        >
                            Reset Root Subsystem
                        </button>
                    </div>
                </div>
            </body>
        </html>
    )
}
