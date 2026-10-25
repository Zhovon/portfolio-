'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Terminal as TerminalIcon, Send, Sparkles, ChevronRight } from 'lucide-react'

interface Message {
    role: 'system' | 'user' | 'assistant'
    content: string
    timestamp: string
}

export function TerminalContact() {
    const [messages, setMessages] = useState<Message[]>([
        { role: 'system', content: 'Initializing Secure Uplink...', timestamp: new Date().toLocaleTimeString() },
        { role: 'assistant', content: 'Connection established. Welcome to the Nexus Terminal. Please provide your NAME and EMAIL, then state your mission parameters.', timestamp: new Date().toLocaleTimeString() }
    ])
    const [inputValue, setInputValue] = useState('')
    const [isTyping, setIsTyping] = useState(false)
    const [status, setStatus] = useState<'idle' | 'sending' | 'success'>('idle')
    const [mounted, setMounted] = useState(false)
    const scrollRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        setMounted(true)
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight
        }
    }, [messages])

    const handleCommand = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!inputValue.trim() || status === 'sending') return

        const userMsg = inputValue.trim()
        setMessages(prev => [...prev, { role: 'user', content: userMsg, timestamp: new Date().toLocaleTimeString() }])
        setInputValue('')
        setIsTyping(true)

        // Dynamic CLI response logic
        setTimeout(() => {
            let response = ''
            const msg = userMsg.toLowerCase().trim()

            if (msg === 'help' || msg === '?') {
                response = 'COMMAND PROTOCOL MANUAL:\n• [status] - Live server telemetry & availability\n• [skills] - Tech stack & architectural proficiencies\n• [pricing] - Standard commercial ranges & turnaround\n• [projects] - Flagship production works\n• [clear] - Flush terminal memory buffer\n• Or enter your NAME, EMAIL, and project brief to transmit.'
            } else if (msg === 'status') {
                response = 'TELEMETRY STATUS:\n• Server Node: Dhaka / Bangalore [Online]\n• Gateway Status: 100% Operational (Resend + Supabase Edge)\n• Response P99: 18ms\n• Availability: Accepting select High-Impact contracts for Q4 2026 / 2027.'
            } else if (msg === 'skills' || msg === 'stack') {
                response = 'CORE ARCHITECTURAL STACK:\n• Frontend: Next.js 15, React 19, TypeScript, Tailwind CSS v4\n• Backend & Edge: Node.js, Next Server Actions, Edge Functions\n• Persistence & Cache: PostgreSQL, Supabase, Redis, Prisma\n• Protocols: WebSockets, REST, GraphQL, Resend API'
            } else if (msg.includes('pricing') || msg.includes('price') || msg.includes('cost') || msg.includes('rate')) {
                response = 'COMMERCIAL TIERS:\n• MVP / Micro-SaaS (2-3 Weeks): $2,500 - $4,500\n• Full-Stack Production System (4-6 Weeks): $5,000 - $12,000\n• Enterprise / Architectural Advisory: Custom Scope\nAll tiers include complete documentation, test suite, and 30-day post-launch warranty.'
            } else if (msg === 'projects' || msg.includes('portfolio') || msg.includes('work')) {
                response = 'FEATURED PRODUCTION DEPLOYMENTS:\n1. Tailor SaaS (tailor.zhovon.com) - Bespoke ERP & Order Pipeline\n2. Rukaya AI (rukaya.zhovon.com) - Offline-first PWA Companion\n3. ZBooking Gateway - Distributed Cryptographic Licensing Engine\nExplore full interactive case studies in the /projects directory.'
            } else if (msg === 'clear') {
                setMessages([{ role: 'system', content: 'Buffer reset. Uplink stable.', timestamp: new Date().toLocaleTimeString() }])
                setIsTyping(false)
                return
            } else if (msg.includes('hello') || msg.includes('hi') || msg.includes('hey')) {
                response = 'Greetings, operator. Terminal uplink ready. Enter your NAME and EMAIL to initialize direct comms with Zhovon.'
            } else if (msg.includes('@') && msg.includes('.')) {
                response = `✓ Email address captured [${userMsg}]. Please provide your NAME and brief parameters of what you want to build, then click "Transmit Mission".`
            } else if (!messages.some(m => m.role === 'user' && m.content.includes('@'))) {
                response = `✓ Parameter noted: "${userMsg}". Please provide your contact EMAIL address (e.g. operator@domain.com) so an auto-reply and direct briefing can be dispatched.`
            } else {
                response = `✓ Briefing updated. All parameters logged into the payload buffer. Click "Transmit Mission" to dispatch to admin@zhovon.com.`
            }

            setMessages(prev => [...prev, { role: 'assistant', content: response, timestamp: new Date().toLocaleTimeString() }])
            setIsTyping(false)
        }, 600)
    }

    const launchMission = async () => {
        const userMessages = messages.filter(m => m.role === 'user').map(m => m.content)
        const hasEmail = userMessages.some(msg => msg.includes('@') && msg.includes('.'))

        if (!hasEmail) {
            setMessages(prev => [...prev, {
                role: 'system',
                content: 'ERROR: No valid EMAIL address detected in session. Type your email address before transmitting.',
                timestamp: new Date().toLocaleTimeString()
            }])
            return
        }

        setStatus('sending')

        // Extract email and name
        const emailMatch = userMessages.join(' ').match(/[\w.-]+@[\w.-]+\.\w+/)
        const email = emailMatch ? emailMatch[0] : ''
        const nameMessage = userMessages.find(msg => !msg.includes('@') && msg.trim().length > 1)
        const name = nameMessage || 'Terminal Operator'

        // Log visual progress sequence
        setMessages(prev => [...prev, {
            role: 'system',
            content: `[UPLINK INITIATED] Packaging payload for ${name} <${email}>...`,
            timestamp: new Date().toLocaleTimeString()
        }])

        const finalContent = messages
            .filter(m => m.role === 'user' || m.role === 'assistant')
            .map(m => `[${m.role.toUpperCase()}] ${m.content}`)
            .join('\n')

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: name,
                    email: email,
                    subject: `Terminal Mission Briefing // ${name}`,
                    message: finalContent
                })
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.error || 'Transmission refused by gateway')
            }

            const txHash = 'TX-' + Math.random().toString(36).substring(2, 8).toUpperCase()

            setMessages(prev => [...prev, {
                role: 'system',
                content: `✓ DISPATCH CONFIRMED [${txHash}].\n• Notification delivered to admin@zhovon.com\n• Confirmation receipt dispatched to ${email}\n• Status: QUEUED_FOR_EXECUTION (24-48h SLA)`,
                timestamp: new Date().toLocaleTimeString()
            }])
            setStatus('success')
        } catch (err: any) {
            setMessages(prev => [...prev, {
                role: 'system',
                content: `✗ GATEWAY ERROR: ${err.message}. Please check connection or retry.`,
                timestamp: new Date().toLocaleTimeString()
            }])
            setStatus('idle')
        }
    }

    return (
        <div className="w-full max-w-4xl mx-auto glass-panel rounded-2xl sm:rounded-3xl overflow-hidden border-white/5 shadow-2xl bg-black/40 backdrop-blur-3xl">
            {/* Header Bar */}
            <div className="bg-white/5 px-4 sm:px-6 py-3 sm:py-4 border-b border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-2 sm:gap-4 min-w-0">
                    <div className="flex gap-1.5 flex-shrink-0">
                        <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-red-500/20 border border-red-500/50" />
                        <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
                        <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-green-500/20 border border-green-500/50" />
                    </div>
                    <div className="flex items-center gap-2 ml-2 sm:ml-4 min-w-0 truncate">
                        <TerminalIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-500 flex-shrink-0" />
                        <span className="text-[9px] sm:text-[10px] font-mono text-gray-400 tracking-[0.15em] sm:tracking-[0.2em] uppercase truncate">ZHOVON Terminal v4.0.2</span>
                    </div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                    <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
                    <span className="text-[8px] font-mono text-purple-400 uppercase tracking-widest">Linked</span>
                </div>
            </div>

            {/* Message Output Area */}
            <div
                ref={scrollRef}
                className="h-[280px] xs:h-[320px] sm:h-[380px] md:h-[420px] overflow-y-auto p-4 sm:p-6 md:p-8 font-mono text-xs sm:text-sm leading-relaxed space-y-4 sm:space-y-6 scrollbar-hide"
            >
                {messages.map((msg, i) => (
                    <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        key={i}
                        className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
                    >
                        <div className="flex items-center gap-2 sm:gap-3 mb-1 opacity-70">
                            <span className={`text-[9px] sm:text-[10px] uppercase tracking-widest font-black ${msg.role === 'system' ? 'text-blue-400' :
                                msg.role === 'assistant' ? 'text-purple-400' : 'text-cyan-400'
                                }`}>
                                {msg.role === 'user' ? 'OPERATOR' : 'SYSTEM'}
                            </span>
                            <span className="text-[8px] text-gray-500">{mounted ? msg.timestamp : '--:--:--'}</span>
                        </div>
                        <div className={`max-w-[92%] sm:max-w-[85%] px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl sm:rounded-2xl break-words text-xs sm:text-sm ${msg.role === 'user' ? 'bg-white/10 text-white border border-white/10' : 'text-gray-300 bg-white/[0.02]'
                            }`}>
                            {msg.content}
                        </div>
                    </motion.div>
                ))}
                {isTyping && (
                    <div className="flex gap-1.5 py-2">
                        <motion.div animate={{ opacity: [0.2, 1, 0.2] }} transition={{ repeat: Infinity, duration: 1 }} className="w-1.5 h-1.5 bg-purple-500 rounded-full" />
                        <motion.div animate={{ opacity: [0.2, 1, 0.2] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="w-1.5 h-1.5 bg-purple-500 rounded-full" />
                        <motion.div animate={{ opacity: [0.2, 1, 0.2] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="w-1.5 h-1.5 bg-purple-500 rounded-full" />
                    </div>
                )}
            </div>

            {/* Input Field */}
            <div className="p-4 sm:p-6 bg-white/5 border-t border-white/5">
                <form onSubmit={handleCommand} className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                    <div className="flex-1 relative">
                        <div className="absolute left-3.5 sm:left-4 top-1/2 -translate-y-1/2 text-purple-400 font-mono text-base sm:text-lg">{'>'}</div>
                        <input
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            placeholder="Enter command or message..."
                            className="w-full bg-black/50 border border-white/10 rounded-xl pl-8 sm:pl-10 pr-4 py-3 sm:py-4 text-white font-mono text-base sm:text-sm placeholder:text-gray-600 focus:outline-none focus:border-purple-500 transition-colors"
                        />
                    </div>
                    <button
                        type="button"
                        onClick={launchMission}
                        disabled={status !== 'idle'}
                        className="w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 bg-white text-black font-black uppercase tracking-[0.2em] text-[10px] rounded-xl hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:scale-100 flex items-center justify-center gap-2.5 sm:gap-3 flex-shrink-0 cursor-pointer"
                    >
                        {status === 'idle' ? (
                            <>
                                <Send className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                                Transmit Mission
                            </>
                        ) : status === 'sending' ? (
                            <>
                                <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: 'linear' }} className="w-3.5 h-3.5 sm:w-4 sm:h-4 border-2 border-black border-t-transparent rounded-full" />
                                Sending...
                            </>
                        ) : (
                            <>
                                <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-green-600" />
                                Mission Logged
                            </>
                        )}
                    </button>
                </form>
                <div className="mt-3 sm:mt-4 flex flex-wrap items-center justify-between gap-2 text-[10px] font-mono text-gray-500 uppercase tracking-wider">
                    <div className="flex flex-wrap items-center gap-1.5">
                        <span className="text-gray-600 text-[9px]">Commands:</span>
                        {['status', 'skills', 'pricing', 'projects', 'help', 'clear'].map((cmd) => (
                            <button
                                key={cmd}
                                type="button"
                                onClick={() => {
                                    setInputValue(cmd)
                                    const fakeEvent = { preventDefault: () => {} } as React.FormEvent
                                    // Trigger command execution directly
                                    setTimeout(() => {
                                        const form = document.querySelector('form')
                                        if (form) form.requestSubmit()
                                    }, 50)
                                }}
                                className="px-2 py-0.5 rounded bg-white/5 hover:bg-white/10 text-purple-300 hover:text-white border border-white/5 transition-colors cursor-pointer text-[9px]"
                            >
                                [{cmd}]
                            </button>
                        ))}
                    </div>
                    <span className="underline decoration-purple-500/30 text-[8px] text-gray-500">
                        TLS Encrypted // Gateway: admin@zhovon.com
                    </span>
                </div>
            </div>
        </div>
    )
}
