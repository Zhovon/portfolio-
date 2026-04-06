'use client'

import { motion } from 'framer-motion'
import { Calendar } from 'lucide-react'
import Link from 'next/link'

export function CalComFloatingButton() {
    return (
        <Link 
            href="https://cal.com/zhovon/30min"
            target="_blank"
            rel="noopener noreferrer"
        >
            <motion.div
                initial={{ opacity: 0, y: 50, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="fixed bottom-6 right-6 z-[9000] flex items-center gap-3 px-6 py-4 rounded-full bg-emerald-500 hover:bg-emerald-400 text-black font-black uppercase tracking-widest text-[10px] md:text-sm shadow-[0_0_30px_-5px_rgba(16,185,129,0.5)] transition-colors border border-emerald-400 cursor-pointer"
            >
                <Calendar className="w-4 h-4 md:w-5 md:h-5" />
                <span>Initiate Strategic Uplink</span>
            </motion.div>
        </Link>
    )
}
