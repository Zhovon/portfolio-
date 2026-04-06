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

        // Simulate system response logic
        setTimeout(() => {
            let response = ''
            const msg = userMsg.toLowerCase()

            if (msg.includes('hello') || msg.includes('hi') || msg.includes('hey')) {
                response = 'Greetings, operator. I am Zhovon\'s digital interface. Please provide your NAME and EMAIL to initiate secure communication.'
            } else if (msg.includes('pricing') || msg.includes('price') || msg.includes('cost') || msg.includes('rate')) {
                response = 'Project pricing varies based on scope, timeline, and complexity. Typical ranges: Small projects ($2K-5K), Medium ($5K-15K), Large ($15K+). Share your requirements and I\'ll provide a detailed quote.'
            } else if (msg.includes('service') || msg.includes('what do you do') || msg.includes('expertise')) {
                response = 'Core services: SaaS Development, Next.js/React Applications, Payload CMS Integration, Full-Stack Solutions, API Development, UI/UX Implementation. Specialized in high-performance, scalable architectures.'
            } else if (msg.includes('available') || msg.includes('availability') || msg.includes('timeline')) {
                response = 'Currently accepting new projects. Typical turnaround: 2-8 weeks depending on scope. Rush projects available with premium rates. Share your deadline requirements.'
            } else if (msg.includes('project') || msg.includes('build') || msg.includes('develop')) {
                response = 'Excellent! Please describe your project: tech stack preferences, key features, timeline, and budget range. Don\'t forget to provide your NAME and EMAIL for follow-up.'
            } else if (msg.includes('help') || msg.includes('?')) {
                response = 'Available commands: Type your NAME → Type your EMAIL → Describe your project → Click "Transmit Mission". Or ask about: pricing, services, availability, portfolio.'
            } else if (msg.includes('portfolio') || msg.includes('work') || msg.includes('examples')) {
                response = 'Check out my recent projects in the Projects section above. Highlights: Next.js 15 + Payload CMS integrations, React 19 applications, TypeScript-first architectures, 99+ Lighthouse scores.'
            } else if (msg.includes('clear')) {
                setMessages([{ role: 'system', content: 'Buffer cleared. Connection stable.', timestamp: new Date().toLocaleTimeString() }])
                setIsTyping(false)
                return
            } else if (msg.includes('@')) {
                response = 'Email received. Now provide your NAME and describe your project requirements. When ready, click "Transmit Mission" to send.'
            } else if (!messages.some(m => m.role === 'user' && m.content.includes('@'))) {
                // If no email provided yet
                response = 'Message logged. Please provide your EMAIL address (e.g., you@example.com) so I can respond to your inquiry.'
            } else {
                response = 'Information logged. Add any additional details, then click "Transmit Mission" to send your inquiry. I\'ll respond within 24-48 hours.'
            }

            setMessages(prev => [...prev, { role: 'assistant', content: response, timestamp: new Date().toLocaleTimeString() }])
            setIsTyping(false)
        }, 1000)
    }

    const launchMission = async () => {
        // Check if we have enough information
        const userMessages = messages.filter(m => m.role === 'user').map(m => m.content)
        const hasEmail = userMessages.some(msg => msg.includes('@'))
        const hasName = userMessages.some(msg => !msg.includes('@') && msg.trim().length > 2)

        if (!hasName || !hasEmail) {
            setMessages(prev => [...prev, {
                role: 'system',
                content: 'ERROR: Insufficient data. Please provide your NAME and EMAIL before transmission.',
                timestamp: new Date().toLocaleTimeString()
            }])
            return
        }

        setStatus('sending')

        // Extract email from messages (userMessages already defined above)
        const emailMatch = userMessages.join(' ').match(/[\w.-]+@[\w.-]+\.\w+/)
        const email = emailMatch ? emailMatch[0] : ''

        // Try to extract name (first user message that's not an email)
        const nameMessage = userMessages.find(msg => !msg.includes('@') && msg.length > 2)
        const name = nameMessage || 'Terminal User'

        // Compile all messages into the message body
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
                    subject: `Terminal Mission Briefing - ${new Date().toLocaleDateString()}`,
                    message: finalContent
                })
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.error || 'Transmission interrupted')
            }

            setMessages(prev => [...prev, {
                role: 'system',
                content: '✓ MISSION DATA TRANSMITTED. AUTO-REPLY SENT TO YOUR EMAIL. STORAGE SEALED.',
                timestamp: new Date().toLocaleTimeString()
            }])
            setStatus('success')
        } catch (err: any) {
            setMessages(prev => [...prev, {
                role: 'system',
                content: `✗ SIGNAL LOST: ${err.message}. ATTEMPT RE-TRANSMISSION.`,
                timestamp: new Date().toLocaleTimeString()
            }])
            setStatus('idle')
        }
    }

    return (
        <div className="w-full max-w-4xl mx-auto glass-panel rounded-3xl overflow-hidden border-white/5 shadow-2xl bg-black/40 backdrop-blur-3xl">
            {/* Header Bar */}
            <div className="bg-white/5 px-6 py-4 border-b border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className="flex gap-1.5">
                        <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50" />
                        <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
                        <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50" />
                    </div>
                    <div className="flex items-center gap-2 ml-4">
                        <TerminalIcon className="w-4 h-4 text-gray-500" />
                        <span className="text-[10px] font-mono text-gray-500 tracking-[0.2em] uppercase mt-0.5">ZHOVON Terminal v4.0.2</span>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
                    <span className="text-[8px] font-mono text-purple-500 uppercase tracking-widest">Linked</span>
                </div>
            </div>

            {/* Message Output Area */}
            <div
                ref={scrollRef}
                className="h-[400px] overflow-y-auto p-8 font-mono text-sm leading-relaxed space-y-6 scrollbar-hide"
            >
                {messages.map((msg, i) => (
                    <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        key={i}
                        className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
                    >
                        <div className="flex items-center gap-3 mb-1 opactiy-50">
                            <span className={`text-[10px] uppercase tracking-widest font-black ${msg.role === 'system' ? 'text-blue-500' :
                                msg.role === 'assistant' ? 'text-purple-500' : 'text-cyan-400'
                                }`}>
                                {msg.role === 'user' ? 'OPERATOR' : 'SYSTEM'}
                            </span>
                            <span className="text-[8px] text-gray-700">{mounted ? msg.timestamp : '--:--:--'}</span>
                        </div>
                        <div className={`max-w-[80%] px-4 py-2 rounded-2xl ${msg.role === 'user' ? 'bg-white/5 text-white border border-white/10' : 'text-gray-400'
                            }`}>
                            {msg.content}
                        </div>
                    </motion.div>
                ))}
                {isTyping && (
                    <div className="flex gap-1">
                        <motion.div animate={{ opacity: [0.2, 1, 0.2] }} transition={{ repeat: Infinity, duration: 1 }} className="w-1.5 h-1.5 bg-purple-500 rounded-full" />
                        <motion.div animate={{ opacity: [0.2, 1, 0.2] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="w-1.5 h-1.5 bg-purple-500 rounded-full" />
                        <motion.div animate={{ opacity: [0.2, 1, 0.2] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="w-1.5 h-1.5 bg-purple-500 rounded-full" />
                    </div>
                )}
            </div>

            {/* Input Field */}
            <div className="p-6 bg-white/5 border-t border-white/5">
                <form onSubmit={handleCommand} className="flex gap-4">
                    <div className="flex-1 relative">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-500 font-mono text-lg">{'>'}</div>
                        <input
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            placeholder="Enter command or message..."
                            className="w-full bg-black/40 border border-white/10 rounded-xl px-10 py-4 text-white font-mono placeholder:text-gray-800 focus:outline-none focus:border-purple-500 transition-colors"
                        />
                    </div>
                    <button
                        type="button"
                        onClick={launchMission}
                        disabled={status !== 'idle'}
                        className="px-8 py-4 bg-white text-black font-black uppercase tracking-[0.2em] text-[10px] rounded-xl hover:scale-105 transition-all disabled:opacity-50 disabled:scale-100 flex items-center gap-3"
                    >
                        {status === 'idle' ? (
                            <>
                                <Send className="w-4 h-4" />
                                Transmit Mission
                            </>
                        ) : status === 'sending' ? (
                            <>
                                <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: 'linear' }} className="w-4 h-4 border-2 border-black border-t-transparent rounded-full" />
                                Sending...
                            </>
                        ) : (
                            <>
                                <Sparkles className="w-4 h-4 text-green-600" />
                                Mission Logged
                            </>
                        )}
                    </button>
                </form>
                <div className="mt-4 flex gap-4 text-[8px] font-mono text-gray-700 uppercase tracking-[0.2em]">
                    <span>Commands: [clear] [projects] [help]</span>
                    <span className="ml-auto underline decoration-purple-500/30">End-to-end encrypted connection</span>
                </div>
            </div>
        </div>
    )
}
