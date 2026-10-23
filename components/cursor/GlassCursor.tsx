"use client"

import { useEffect, useState } from 'react'

export function GlassCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 })
  const [mounted, setMounted] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    setMounted(true)
    if (typeof window === 'undefined') return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    setReducedMotion(prefersReducedMotion)

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  if (!mounted || reducedMotion) {
    return null
  }

  return (
    <div
      className="fixed pointer-events-none w-8 h-8 rounded-full bg-white/20 backdrop-blur-md shadow-2xl z-50 transition-transform duration-75 ease-out -translate-x-1/2 -translate-y-1/2"
      style={{ left: `${position.x}px`, top: `${position.y}px` }}
    />
  )
}

export default GlassCursor