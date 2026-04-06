'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, Terminal, Loader2, CheckCircle2, ShieldAlert } from 'lucide-react'

export function SciFiContact() {
    const [status, setStatus] = useState<'idle' | 'transmitting' | 'success' | 'error'>('idle')
    
    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setStatus('transmitting')
        
        const formData = new FormData(e.currentTarget)
        
        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: formData.get('name'),
                    email: formData.get('email'),
                    message: formData.get('message')
                })
            })

            if (res.ok) {
                setStatus('success')
            } else {
                setStatus('error')
            }
        } catch {
            setStatus('error')
        }
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-2xl mx-auto glass-panel p-8 md:p-12 rounded-[2.5rem] border border-emerald-500/20 relative overflow-hidden"
        >
            {/* Background scanner line */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent opacity-50 animate-pulse" />

            <div className="flex items-center gap-4 mb-8 border-b border-white/5 pb-6">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
                    <Terminal className="w-6 h-6 text-emerald-400" />
                </div>
                <div>
                    <h3 className="text-white font-black uppercase tracking-widest text-xl">Secure Protocol</h3>
                    <p className="text-gray-500 text-xs font-mono">End-to-end encrypted transmission</p>
                </div>
            </div>

            {status === 'success' ? (
                <motion.div 
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="flex flex-col items-center justify-center py-12 text-center"
                >
                    <CheckCircle2 className="w-20 h-20 text-emerald-500 mb-6" />
                    <h4 className="text-2xl font-black text-white uppercase tracking-widest mb-2">Transmission Received</h4>
                    <p className="text-gray-400 font-medium">Your message has been securely routed to my direct terminal.</p>
                </motion.div>
            ) : status === 'error' ? (
                <motion.div 
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="flex flex-col items-center justify-center py-12 text-center"
                >
                    <ShieldAlert className="w-20 h-20 text-red-500 mb-6" />
                    <h4 className="text-2xl font-black text-white uppercase tracking-widest mb-2">Connection Failed</h4>
                    <p className="text-gray-400 font-medium mb-6">There was an anomaly in the routing protocol.</p>
                    <button 
                        onClick={() => setStatus('idle')}
                        className="px-6 py-2 bg-white/10 hover:bg-white/20 text-white rounded-full text-xs font-bold uppercase transition-colors"
                    >
                        Retry Transmission
                    </button>
                </motion.div>
            ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-emerald-500">Identity</label>
                            <input 
                                required
                                name="name"
                                type="text"
                                placeholder="YOUR NAME"
                                className="w-full bg-black/40 border border-white/10 hover:border-emerald-500/50 focus:border-emerald-500 rounded-xl px-4 py-3 text-white placeholder-gray-600 outline-none transition-colors italic"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-emerald-500">Return Address</label>
                            <input 
                                required
                                name="email"
                                type="email"
                                placeholder="YOUR EMAIL"
                                className="w-full bg-black/40 border border-white/10 hover:border-emerald-500/50 focus:border-emerald-500 rounded-xl px-4 py-3 text-white placeholder-gray-600 outline-none transition-colors italic"
                            />
                        </div>
                    </div>
                    
                    <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-emerald-500">Payload</label>
                        <textarea 
                            required
                            name="message"
                            placeholder="INITIALIZE TRANSMISSION..."
                            rows={5}
                            className="w-full bg-black/40 border border-white/10 hover:border-emerald-500/50 focus:border-emerald-500 rounded-xl px-4 py-3 text-white placeholder-gray-600 outline-none transition-colors resize-none italic"
                        />
                    </div>

                    <button 
                        type="submit"
                        disabled={status === 'transmitting'}
                        className="w-full relative group overflow-hidden bg-emerald-500 text-black font-black uppercase tracking-[0.2em] text-xs py-4 rounded-xl transition-transform hover:scale-[1.02] disabled:opacity-50 disabled:hover:scale-100 flex items-center justify-center gap-3"
                    >
                        {status === 'transmitting' ? (
                            <>
                                <Loader2 className="w-4 h-4 animate-spin" />
                                Transmitting...
                            </>
                        ) : (
                            <>
                                Init Sequence
                                <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                            </>
                        )}
                        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                    </button>
                </form>
            )}
        </motion.div>
    )
}
