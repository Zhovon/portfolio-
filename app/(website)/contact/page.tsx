'use client'

import { motion } from 'framer-motion'
import { Send, Globe, Github, Twitter, Linkedin, ArrowLeft, Mail, MapPin } from 'lucide-react'
import Link from 'next/link'
import { TerminalContact } from '@/components/TerminalContact'

export default function ContactPage() {
    return (
        <main className="min-h-screen bg-[#020202] pt-24 sm:pt-28 md:pt-32 pb-16 sm:pb-20 px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20 overflow-x-hidden relative">
            <div className="max-w-7xl mx-auto relative z-10">
                <Link href="/" className="inline-flex items-center gap-2 text-gray-500 hover:text-white transition-colors mb-8 sm:mb-12 lg:mb-16 group">
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    <span className="text-xs uppercase tracking-widest font-bold">Abort to Genesis</span>
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-14 lg:gap-12 xl:gap-20 items-start">
                    {/* Left: Text & Info */}
                    <div className="w-full min-w-0">
                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black text-white italic tracking-tighter mb-6 sm:mb-8 md:mb-12 uppercase break-words"
                        >
                            TRANSMIT.
                        </motion.h1>
                        <p className="text-gray-400 text-sm sm:text-base md:text-lg lg:text-xl font-medium leading-relaxed max-w-md mb-8 sm:mb-12 md:mb-16">
                            Initializing communication protocol. Send your mission parameters and I will calculate the trajectory.
                        </p>

                        <div className="space-y-6 sm:space-y-8">
                            <div className="flex items-start sm:items-center gap-4 sm:gap-6 group">
                                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl glass-panel flex items-center justify-center group-hover:border-purple-500 transition-colors flex-shrink-0">
                                    <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-purple-400" />
                                </div>
                                <div className="min-w-0 flex-1">
                                    <div className="text-[10px] uppercase tracking-widest text-gray-500 font-bold mb-1">Direct Channel</div>
                                    <a href="mailto:admin@zhovon.com" className="text-base sm:text-lg md:text-xl font-bold text-white hover:text-purple-400 transition-colors break-all">
                                        admin@zhovon.com
                                    </a>
                                </div>
                            </div>
                            <div className="flex items-start sm:items-center gap-4 sm:gap-6 group">
                                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl glass-panel flex items-center justify-center group-hover:border-blue-500 transition-colors flex-shrink-0">
                                    <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400" />
                                </div>
                                <div className="min-w-0 flex-1">
                                    <div className="text-[10px] uppercase tracking-widest text-gray-500 font-bold mb-1">Station Location</div>
                                    <div className="text-sm sm:text-base md:text-lg font-bold text-white break-words">
                                        71, Sayed Nagar, Dakshin Khan, Dhaka 1230
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-4 sm:gap-6 mt-8 sm:mt-12 md:mt-16">
                            <Link href="https://github.com/Zhovon" target="_blank" rel="noopener noreferrer" className="w-11 h-11 sm:w-12 sm:h-12 glass-panel rounded-xl flex items-center justify-center text-gray-400 hover:text-white hover:scale-110 transition-all">
                                <Github className="w-5 h-5" />
                            </Link>
                            <Link href="https://www.linkedin.com/in/shahadat-hossain-b314601b2/" target="_blank" rel="noopener noreferrer" className="w-11 h-11 sm:w-12 sm:h-12 glass-panel rounded-xl flex items-center justify-center text-gray-400 hover:text-white hover:scale-110 transition-all">
                                <Linkedin className="w-5 h-5" />
                            </Link>
                            <Link href="https://www.facebook.com/shahadathossai.shovon" target="_blank" rel="noopener noreferrer" className="w-11 h-11 sm:w-12 sm:h-12 glass-panel rounded-xl flex items-center justify-center text-gray-400 hover:text-white hover:scale-110 transition-all">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
                            </Link>
                        </div>
                    </div>

                    {/* Right: Terminal Interface */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="w-full min-w-0 relative z-20"
                    >
                        <TerminalContact />
                    </motion.div>
                </div>
            </div>

            {/* Background HUD Decals */}
            <div className="absolute top-1/2 left-0 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-purple-600/10 rounded-full blur-[100px] sm:blur-[150px] -z-10 pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-[250px] sm:w-[400px] h-[250px] sm:h-[400px] bg-blue-600/10 rounded-full blur-[80px] sm:blur-[120px] -z-10 pointer-events-none" />
        </main>
    )
}
