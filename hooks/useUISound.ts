'use client'

import { useCallback, useRef, useEffect } from 'react'

export function useUISound() {
    const audioCtxRef = useRef<AudioContext | null>(null)

    const getAudioContext = useCallback(() => {
        if (typeof window === 'undefined') return null
        if (!audioCtxRef.current) {
            const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
            if (AudioContextClass) {
                audioCtxRef.current = new AudioContextClass()
            }
        }
        if (audioCtxRef.current?.state === 'suspended') {
            audioCtxRef.current.resume().catch(() => {})
        }
        return audioCtxRef.current
    }, [])

    useEffect(() => {
        return () => {
            if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
                audioCtxRef.current.close().catch(() => {})
            }
        }
    }, [])

    const playHover = useCallback(() => {
        const ctx = getAudioContext()
        if (!ctx) return

        const osc = ctx.createOscillator()
        const gainNode = ctx.createGain()
        
        // Sci-fi metallic tick settings
        osc.type = 'sine'
        osc.frequency.setValueAtTime(800, ctx.currentTime)
        osc.frequency.exponentialRampToValueAtTime(1200, ctx.currentTime + 0.05)
        
        gainNode.gain.setValueAtTime(0.05, ctx.currentTime) // Low volume
        gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05)
        
        osc.connect(gainNode)
        gainNode.connect(ctx.destination)
        
        osc.start(ctx.currentTime)
        osc.stop(ctx.currentTime + 0.05)
    }, [])

    const playClick = useCallback(() => {
        const ctx = getAudioContext()
        if (!ctx) return

        const osc = ctx.createOscillator()
        const gainNode = ctx.createGain()
        
        // Deeper confirm tech sound
        osc.type = 'triangle'
        osc.frequency.setValueAtTime(400, ctx.currentTime)
        osc.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.1)
        
        gainNode.gain.setValueAtTime(0.1, ctx.currentTime)
        gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1)
        
        osc.connect(gainNode)
        gainNode.connect(ctx.destination)
        
        osc.start(ctx.currentTime)
        osc.stop(ctx.currentTime + 0.1)
    }, [])

    return { playHover, playClick }
}
