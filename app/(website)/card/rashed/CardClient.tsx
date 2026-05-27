'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import {
    Mail,
    Phone,
    Globe,
    Share2,
    Copy,
    Check,
    Download,
    ExternalLink,
    ArrowLeft,
    MessageCircle,
    RotateCcw,
} from 'lucide-react'
import QRCode from 'qrcode'

const CARD_URL = 'https://zhovon.com/card/rashed'

const CONTACT = {
    name: 'Md Rashed Khan',
    title: 'Business Consultant',
    tagline: 'Strategic Growth & Brand Excellence',
    bio: 'A results-driven business consultant with deep expertise in growth strategy, brand development, and operational excellence. Helping ambitious organisations unlock their full potential across the MENA region and beyond.',
    phone: '+966 56 210 1651',
    email: 'rashedkhan25003@gmail.com',
    website: 'zhovon.com/card/rashed',
    specialties: ['Growth Strategy', 'Brand Development', 'Operations', 'Market Expansion', 'Client Relations'],
}

export function CardClient() {
    const [isFlipped, setIsFlipped] = useState(false)
    const [qrDataUrl, setQrDataUrl] = useState<string | null>(null)
    const [copied, setCopied] = useState(false)

    // Generate QR code on mount
    useEffect(() => {
        QRCode.toDataURL(CARD_URL, {
            width: 200,
            margin: 1,
            color: { dark: '#000000', light: '#ffffff' },
            errorCorrectionLevel: 'H',
        }).then(setQrDataUrl)
    }, [])

    const handleCopy = async () => {
        await navigator.clipboard.writeText(CARD_URL)
        setCopied(true)
        setTimeout(() => setCopied(false), 2200)
    }

    const whatsappUrl = `https://wa.me/${CONTACT.phone.replace(/\s+/g, '').replace('+', '')}?text=Hi%20Rashed,%20I%20found%20your%20digital%20card!`
    const shareMsg = encodeURIComponent(`Check out ${CONTACT.name}'s digital business card: ${CARD_URL}`)

    return (
        <main className="relative min-h-screen flex flex-col items-center justify-center px-4 py-20 overflow-hidden z-10">
            {/* Ambient background glows */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-amber-500/8 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-yellow-500/6 rounded-full blur-[100px]" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-amber-600/4 rounded-full blur-[150px]" />
            </div>

            {/* Back nav */}
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="absolute top-8 left-6 sm:left-10 z-20"
            >
                <Link
                    href="/team/rashed"
                    className="flex items-center gap-2 text-amber-500/70 hover:text-amber-400 transition-colors group"
                >
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    <span className="text-xs uppercase tracking-widest font-bold">View Full Profile</span>
                </Link>
            </motion.div>

            {/* Header label */}
            <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="text-[10px] uppercase tracking-[0.5em] text-amber-500 font-black mb-8"
            >
                Digital Visiting Card
            </motion.p>

            {/* ── 3D Flip Card ── */}
            <motion.div
                initial={{ opacity: 0, y: 40, scale: 0.92 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.7, ease: 'easeOut' }}
                className="w-full max-w-[420px] cursor-pointer"
                style={{ perspective: 1200 }}
                onClick={() => setIsFlipped(f => !f)}
            >
                <motion.div
                    animate={{ rotateY: isFlipped ? 180 : 0 }}
                    transition={{ duration: 0.65, ease: [0.23, 1, 0.32, 1] }}
                    style={{ transformStyle: 'preserve-3d' }}
                    className="relative w-full"
                >
                    {/* ──── FRONT FACE ──── */}
                    <div
                        style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
                        className="relative w-full rounded-[2rem] overflow-hidden border border-amber-500/20 shadow-[0_0_60px_rgba(245,158,11,0.15),0_30px_60px_rgba(0,0,0,0.6)] [backface-visibility:hidden]"
                    >
                        {/* Card gradient background */}
                        <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0b] via-[#0f0e0a] to-[#0a0805]" />
                        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(245,158,11,0.12),transparent_60%)]" />
                        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(234,179,8,0.07),transparent_55%)]" />

                        {/* Top accent line */}
                        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-amber-400 to-transparent opacity-80" />

                        {/* Decorative corner */}
                        <div className="absolute top-0 right-0 w-32 h-32 overflow-hidden">
                            <div className="absolute top-[-32px] right-[-32px] w-32 h-32 rounded-full border border-amber-500/15" />
                            <div className="absolute top-[-16px] right-[-16px] w-24 h-24 rounded-full border border-amber-500/10" />
                        </div>

                        <div className="relative z-10 p-8">
                            {/* Avatar + Name */}
                            <div className="flex items-start gap-5 mb-8">
                                <div className="relative flex-shrink-0">
                                    <div className="w-20 h-20 rounded-2xl overflow-hidden border-2 border-amber-500/30 shadow-[0_0_24px_rgba(245,158,11,0.25)] bg-[#0d0b07] flex items-center justify-center">
                                        <Image
                                            src="/images/rashed-avatar.png"
                                            alt="Md Rashed Khan"
                                            width={80}
                                            height={80}
                                            className="object-cover w-full h-full"
                                            onError={(e) => {
                                                e.currentTarget.style.display = 'none';
                                                e.currentTarget.parentElement!.innerHTML = '<span class="text-3xl font-black text-amber-500">MRK</span>';
                                            }}
                                        />
                                    </div>
                                    {/* Online indicator */}
                                    <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-amber-500 border-2 border-[#0a0a0b] shadow-[0_0_8px_rgba(245,158,11,0.7)]" />
                                </div>
                                <div>
                                    <p className="text-[9px] uppercase tracking-[0.45em] text-amber-500 font-black mb-1">Consultant</p>
                                    <h1 className="text-2xl font-black text-white tracking-tight leading-none mb-1">
                                        Md Rashed<br />Khan
                                    </h1>
                                    <p className="text-xs text-amber-400/80 font-medium">{CONTACT.tagline}</p>
                                </div>
                            </div>

                            {/* Divider */}
                            <div className="h-[1px] bg-gradient-to-r from-transparent via-amber-500/30 to-transparent mb-6" />

                            {/* Contact Details */}
                            <div className="space-y-3 mb-6">
                                <a
                                    href={`tel:${CONTACT.phone}`}
                                    onClick={e => e.stopPropagation()}
                                    className="flex items-center gap-3 group/link"
                                >
                                    <div className="w-8 h-8 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center flex-shrink-0 group-hover/link:bg-amber-500/20 transition-colors">
                                        <Phone className="w-3.5 h-3.5 text-amber-400" />
                                    </div>
                                    <span className="text-sm text-white/80 group-hover/link:text-amber-300 transition-colors font-mono tracking-wide">
                                        {CONTACT.phone}
                                    </span>
                                </a>

                                <a
                                    href={`mailto:${CONTACT.email}`}
                                    onClick={e => e.stopPropagation()}
                                    className="flex items-center gap-3 group/link"
                                >
                                    <div className="w-8 h-8 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center flex-shrink-0 group-hover/link:bg-amber-500/20 transition-colors">
                                        <Mail className="w-3.5 h-3.5 text-amber-400" />
                                    </div>
                                    <span className="text-sm text-white/80 group-hover/link:text-amber-300 transition-colors break-all">
                                        {CONTACT.email}
                                    </span>
                                </a>

                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center flex-shrink-0">
                                        <Globe className="w-3.5 h-3.5 text-amber-400" />
                                    </div>
                                    <span className="text-sm text-white/50 font-mono">{CONTACT.website}</span>
                                </div>
                            </div>

                            {/* QR Code */}
                            <div className="flex items-center gap-4">
                                <div className="flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border border-amber-500/20 bg-white p-1 shadow-[0_0_20px_rgba(245,158,11,0.15)]">
                                    {qrDataUrl ? (
                                        <img src={qrDataUrl} alt="QR Code" className="w-full h-full" />
                                    ) : (
                                        <div className="w-full h-full bg-gray-100 animate-pulse rounded" />
                                    )}
                                </div>
                                <div>
                                    <p className="text-[10px] text-amber-500 font-black uppercase tracking-[0.35em] mb-1">Scan to Connect</p>
                                    <p className="text-[11px] text-white/40 leading-relaxed">Point your camera at the QR code to open this card on any device</p>
                                </div>
                            </div>

                            {/* Flip hint */}
                            <div className="mt-5 flex items-center justify-center gap-2 text-white/20">
                                <RotateCcw className="w-3 h-3" />
                                <span className="text-[10px] uppercase tracking-wider font-bold">Tap to flip</span>
                            </div>
                        </div>
                    </div>

                    {/* ──── BACK FACE ──── */}
                    <div
                        style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden', transform: 'rotateY(180deg) translateZ(1px)' }}
                        className="absolute inset-0 w-full rounded-[2rem] overflow-hidden border border-amber-500/20 shadow-[0_0_60px_rgba(245,158,11,0.15),0_30px_60px_rgba(0,0,0,0.6)] [backface-visibility:hidden]"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-[#0d0b07] via-[#0a0a0b] to-[#060608]" />
                        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(245,158,11,0.10),transparent_60%)]" />
                        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-amber-400 to-transparent opacity-60" />

                        <div className="relative z-10 p-8 h-full flex flex-col justify-between">
                            <div>
                                <p className="text-[9px] uppercase tracking-[0.45em] text-amber-500 font-black mb-4">About</p>
                                <h2 className="text-xl font-black text-white italic tracking-tight mb-4 leading-snug">
                                    Turning Vision into<br />
                                    <span className="text-amber-400">Measurable Results.</span>
                                </h2>
                                <p className="text-sm text-gray-400 leading-relaxed mb-6">
                                    {CONTACT.bio}
                                </p>

                                {/* Specialties */}
                                <div className="flex flex-wrap gap-2 mb-6">
                                    {CONTACT.specialties.map(s => (
                                        <span
                                            key={s}
                                            className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-amber-500/10 border border-amber-500/20 text-amber-400"
                                        >
                                            {s}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div>
                                {/* Action buttons */}
                                <div className="flex flex-col gap-2">
                                    <a
                                        href="/rashed-contact.vcf"
                                        download="Rashed-Khan.vcf"
                                        onClick={e => e.stopPropagation()}
                                        className="w-full flex items-center justify-center gap-2 rounded-full bg-amber-500 text-black px-4 py-3 text-[10px] font-black uppercase tracking-[0.3em] hover:bg-amber-400 transition-colors shadow-[0_0_20px_rgba(245,158,11,0.35)]"
                                    >
                                        <Download className="w-3.5 h-3.5" />
                                        Save Contact
                                    </a>
                                    <div className="flex gap-2">
                                        <a
                                            href={whatsappUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            onClick={e => e.stopPropagation()}
                                            className="flex-1 flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 text-white px-4 py-3 text-[10px] font-black uppercase tracking-[0.3em] hover:border-green-500/50 hover:text-green-400 transition-all"
                                        >
                                            <MessageCircle className="w-3.5 h-3.5" />
                                            WhatsApp
                                        </a>
                                        <a
                                            href="/rashed-card-print.pdf"
                                            download="Rashed-Khan-Card-Print.pdf"
                                            onClick={e => e.stopPropagation()}
                                            className="flex-1 flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 text-white px-4 py-3 text-[10px] font-black uppercase tracking-[0.3em] hover:border-amber-500/50 hover:text-amber-400 transition-all"
                                        >
                                            <Download className="w-3.5 h-3.5" />
                                            Print PDF
                                        </a>
                                    </div>
                                </div>

                                {/* Flip back hint */}
                                <div className="mt-4 flex items-center justify-center gap-2 text-white/20">
                                    <RotateCcw className="w-3 h-3" />
                                    <span className="text-[10px] uppercase tracking-wider font-bold">Tap to flip back</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </motion.div>

            {/* ── Share Actions ── */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-8 w-full max-w-[420px]"
            >
                <div className="glass-panel rounded-2xl p-4 border-white/5">
                    <p className="text-[9px] uppercase tracking-[0.4em] text-white/30 font-black text-center mb-3">Share This Card</p>
                    <div className="flex gap-2">
                        <button
                            id="copy-card-link"
                            onClick={handleCopy}
                            className="flex-1 flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 py-2.5 text-[10px] font-black uppercase tracking-wider text-white/60 hover:text-white hover:border-white/20 transition-all"
                        >
                            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                            {copied ? 'Copied!' : 'Copy Link'}
                        </button>
                        <a
                            href={`https://wa.me/?text=${shareMsg}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            id="share-whatsapp"
                            className="flex-1 flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 py-2.5 text-[10px] font-black uppercase tracking-wider text-white/60 hover:text-green-400 hover:border-green-500/30 transition-all"
                        >
                            <MessageCircle className="w-3.5 h-3.5" />
                            WhatsApp
                        </a>
                        <a
                            href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(CARD_URL)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            id="share-linkedin"
                            className="flex-1 flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 py-2.5 text-[10px] font-black uppercase tracking-wider text-white/60 hover:text-blue-400 hover:border-blue-500/30 transition-all"
                        >
                            <Share2 className="w-3.5 h-3.5" />
                            LinkedIn
                        </a>
                    </div>
                </div>

                <div className="mt-3 text-center">
                    <Link
                        href="/team/rashed"
                        className="inline-flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold text-amber-500/60 hover:text-amber-400 transition-colors"
                    >
                        <ExternalLink className="w-3 h-3" />
                        View Full Profile
                    </Link>
                </div>
            </motion.div>

            {/* Powered by */}
            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="mt-10 text-[10px] uppercase tracking-[0.4em] text-white/15 font-black"
            >
                Powered by{' '}
                <Link href="/" className="text-white/25 hover:text-white/40 transition-colors">
                    ZHOVON
                </Link>
            </motion.p>
        </main>
    )
}
