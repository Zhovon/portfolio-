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
        { role: 'assistant', content: 'Connection established. Welcome to the Nexus Terminal. State your mission parameters.', timestamp: new Date().toLocaleTimeString() }
    ])
    const [inputValue, setInputValue] = useState('')
    const [isTyping, setIsTyping] = useState(false)
    const [status, setStatus] = useState<'idle' | 'sending' | 'success'>('idle')
    const scrollRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
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
            if (userMsg.toLowerCase().includes('hello') || userMsg.toLowerCase().includes('hi')) {
                response = 'Greetings, operator. I am the Cosmic Architect. How can I assist your next build?'
            } else if (userMsg.toLowerCase().includes('project') || userMsg.toLowerCase().includes('build')) {
                response = 'Mission acknowledged. Please provide details regarding your tech stack and timeline.'
            } else if (userMsg.toLowerCase().includes('clear')) {
                setMessages([{ role: 'system', content: 'Buffer cleared. Connection stable.', timestamp: new Date().toLocaleTimeString() }])
                setIsTyping(false)
                return
            } else {
                response = 'Command processed. Data logged to primary buffer. Continue transmission.'
            }

            setMessages(prev => [...prev, { role: 'assistant', content: response, timestamp: new Date().toLocaleTimeString() }])
            setIsTyping(false)
        }, 1000)
    }

    const launchMission = async () => {
        setStatus('sending')

        // Final message to system
        const finalContent = messages.map(m => `[${m.role.toUpperCase()}] ${m.content}`).join('\n')

        try {
            const response = await fetch('/api/messages', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: 'Terminal User', // We could ask for this in chat
                    email: 'terminal@zhovon.com', // Placeholder if not provided
                    subject: `Mission Briefing from ${new Date().toLocaleDateString()}`,
                    message: finalContent
                })
            })

            if (!response.ok) throw new Error('Transmission interrupted')

            setMessages(prev => [...prev, { role: 'system', content: 'MISSION DATA TRANSMITTED. STORAGE SEALED.', timestamp: new Date().toLocaleTimeString() }])
            setStatus('success')
        } catch (err) {
            setMessages(prev => [...prev, { role: 'system', content: 'SIGNAL LOST. ATTEMPT RE-TRANSMISSION.', timestamp: new Date().toLocaleTimeString() }])
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
                            <span className="text-[8px] text-gray-700">{msg.timestamp}</span>
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
