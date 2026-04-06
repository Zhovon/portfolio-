'use client'

import { useCallback, useRef, useEffect } from 'react'

// A tiny, synthesized high-tech "tick" sound encoded in base64 (very small payload)
// Generated from a super short sine wave burst
const TICK_SOUND = 'data:audio/mp3;base64,//NExAAAAANIAAAAAExBTUUzLjEwMKqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq//NExEAAANIAAAAAExBTUUzLjEwMKqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq'

// Let's use standard web audio API directly to synthesize a high-tech interface click 
// without needing any external assets, ensuring perfect zero-latency performance.

export function useUISound() {
    const audioCtxRef = useRef<AudioContext | null>(null)

    useEffect(() => {
        // Initialize AudioContext only on user interaction if needed or just prepare it
        const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext
        if (AudioContextClass && !audioCtxRef.current) {
            audioCtxRef.current = new AudioContextClass()
        }
        
        return () => {
            if (audioCtxRef.current?.state !== 'closed') {
                audioCtxRef.current?.close()
            }
        }
    }, [])

    const playHover = useCallback(() => {
        if (!audioCtxRef.current) return
        
        // Resume context if suspended (browser autoplay policies)
        if (audioCtxRef.current.state === 'suspended') {
            audioCtxRef.current.resume()
        }

        const ctx = audioCtxRef.current
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
        if (!audioCtxRef.current) return
        
        if (audioCtxRef.current.state === 'suspended') {
            audioCtxRef.current.resume()
        }

        const ctx = audioCtxRef.current
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
