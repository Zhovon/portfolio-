'use client'

import { motion } from 'framer-motion'
import { Send, Globe, Github, Twitter, Linkedin, ArrowLeft, Mail, MapPin } from 'lucide-react'
import Link from 'next/link'
import { TerminalContact } from '@/components/TerminalContact'

export default function ContactPage() {
    return (
        <main className="min-h-screen bg-[#020202] pt-32 pb-20 px-6 lg:px-20 overflow-hidden relative">
            <div className="max-w-7xl mx-auto relative z-10">
                <Link href="/" className="flex items-center gap-2 text-gray-500 hover:text-white transition-colors mb-16 group">
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    <span className="text-xs uppercase tracking-widest font-bold">Abort to Genesis</span>
                </Link>

                <div className="grid lg:grid-cols-2 gap-20">
                    {/* Left: Text & Info */}
                    <div>
                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-7xl md:text-9xl font-black text-white italic tracking-tighter mb-12 uppercase"
                        >
                            TRANSMIT.
                        </motion.h1>
                        <p className="text-gray-500 text-xl font-medium leading-relaxed max-w-md mb-20">
                            Initializing communication protocol. Send your mission parameters and I will calculate the trajectory.
                        </p>

                        <div className="space-y-10">
                            <div className="flex items-center gap-8 group">
                                <div className="w-14 h-14 rounded-2xl glass-panel flex items-center justify-center group-hover:border-purple-500 transition-colors">
                                    <Mail className="w-6 h-6 text-purple-400" />
                                </div>
                                <div>
                                    <div className="text-[10px] uppercase tracking-widest text-gray-700 font-bold mb-1">Direct Channel</div>
                                    <div className="text-xl font-bold text-white">hello@cosmic.sys</div>
                                </div>
                            </div>
                            <div className="flex items-center gap-8 group">
                                <div className="w-14 h-14 rounded-2xl glass-panel flex items-center justify-center group-hover:border-blue-500 transition-colors">
                                    <MapPin className="w-6 h-6 text-blue-400" />
                                </div>
                                <div>
                                    <div className="text-[10px] uppercase tracking-widest text-gray-700 font-bold mb-1">Station Location</div>
                                    <div className="text-xl font-bold text-white">Earth, Solar System</div>
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-6 mt-20">
                            {[Github, Twitter, Linkedin].map((Icon, i) => (
                                <Link key={i} href="#" className="w-12 h-12 glass-panel rounded-xl flex items-center justify-center text-gray-400 hover:text-white hover:scale-110 transition-all">
                                    <Icon className="w-5 h-5" />
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Right: Terminal Interface */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="lg:pl-10"
                    >
                        <TerminalContact />
                    </motion.div>
                </div>
            </div>

            {/* Background HUD Decals */}
            <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[150px] -z-10" />
            <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-[120px] -z-10" />
        </main>
    )
}
