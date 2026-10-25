'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { RotateCcw, Home, AlertTriangle } from 'lucide-react'

export default function ErrorBoundary({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        console.error('Unhandled interface anomaly:', error)
    }, [error])

    return (
        <div className="min-h-screen bg-[#030712] text-white flex items-center justify-center p-6 relative overflow-hidden font-mono">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(239,68,68,0.06)_1px,transparent_1px)] bg-[length:32px_32px] pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-red-500/10 rounded-full blur-[100px] pointer-events-none" />

            <div className="relative z-10 max-w-lg w-full glass-panel p-8 sm:p-10 rounded-2xl border border-red-500/20 text-center shadow-2xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs uppercase tracking-widest mb-6">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    <span>Runtime Anomaly Detected</span>
                </div>

                <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white mb-4">
                    Signal Interrupted
                </h1>

                <p className="text-xs sm:text-sm text-gray-400 mb-6 font-light leading-relaxed">
                    A transient runtime fault occurred during execution. State has been isolated to prevent subsystem disruption.
                </p>

                {error?.digest && (
                    <div className="p-2.5 rounded bg-black/40 border border-white/5 text-[10px] text-gray-500 mb-6 truncate font-mono">
                        FAULT_DIGEST: {error.digest}
                    </div>
                )}

                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                    <button
                        type="button"
                        onClick={() => reset()}
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-white text-black font-black text-xs uppercase tracking-widest hover:scale-105 transition-transform cursor-pointer"
                    >
                        <RotateCcw className="w-3.5 h-3.5" />
                        Re-initialize Subsystem
                    </button>
                    <Link
                        href="/"
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-white/5 border border-white/15 text-white font-bold text-xs uppercase tracking-widest hover:bg-white/10 transition-colors"
                    >
                        <Home className="w-3.5 h-3.5" />
                        Return to Base
                    </Link>
                </div>
            </div>
        </div>
    )
}
