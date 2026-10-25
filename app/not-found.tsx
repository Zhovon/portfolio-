import Link from 'next/link'
import { ArrowLeft, Terminal } from 'lucide-react'

export default function NotFound() {
    return (
        <div className="min-h-screen bg-[#030712] text-white flex items-center justify-center p-6 relative overflow-hidden font-mono">
            {/* Ambient background glow */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.06)_1px,transparent_1px)] bg-[length:32px_32px] pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none" />

            <div className="relative z-10 max-w-lg w-full glass-panel p-8 sm:p-10 rounded-2xl border border-white/10 text-center shadow-2xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs uppercase tracking-widest mb-6">
                    <Terminal className="w-3.5 h-3.5" />
                    <span>Signal 404 // Coordinate Not Found</span>
                </div>

                <h1 className="text-6xl sm:text-8xl font-black tracking-tighter text-white mb-4 bg-gradient-to-b from-white to-gray-500 bg-clip-text text-transparent">
                    404
                </h1>

                <p className="text-sm sm:text-base text-gray-300 mb-8 font-light leading-relaxed">
                    The requested vector or asset is unmapped in the current registry. Return to the main command center or review active projects.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                    <Link
                        href="/"
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-white text-black font-black text-xs uppercase tracking-widest hover:scale-105 transition-transform"
                    >
                        <ArrowLeft className="w-3.5 h-3.5" />
                        Command Center
                    </Link>
                    <Link
                        href="/projects"
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-white/5 border border-white/15 text-white font-bold text-xs uppercase tracking-widest hover:bg-white/10 transition-colors"
                    >
                        Project Archive
                    </Link>
                </div>
            </div>
        </div>
    )
}
