/*!
  * Zhovon Portfolio 2.0 - Live Cursors Section
  * Main container for live cursor system
  * Combines cursor tracking and visitor counting
  * Fully accessible with reduced motion support
*/

"use client"

import { useEffect, useState } from 'react'
import { LiveCursorComponent } from './LiveCursors'
import { VisitorCounter } from './VisitorCounter'

interface LiveCursorsSectionProps {
  enabled?: boolean
  showVisitorCount?: boolean
  cursorColor?: string
}

/**
 * LiveCursorsSection - Main container for live cursor system
 * Provides real-time cursor tracking and visitor count display
 */
export function LiveCursorsSection({ 
  enabled = true,
  showVisitorCount = true,
  cursorColor = 'oklch(0.645 0.237 165.47)'
}: LiveCursorsSectionProps) {
  const [isReducedMotion, setIsReducedMotion] = useState(false)
  const [mounted, setMounted] = useState(false)

  // Check reduced motion preference on mount and on change
  useEffect(() => {
    setMounted(true)
    if (typeof window === 'undefined') return
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setIsReducedMotion(mq.matches)
    const handler = (e: MediaQueryListEvent) => setIsReducedMotion(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  if (!mounted || !enabled || isReducedMotion) {
    return null
  }

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 9999,
      }}
    >
      {/* Live cursor component */}
      <LiveCursorComponent 
        color={cursorColor} 
        size={20} 
        enableTrail={true} 
        reducedMotion={false}
      />

      {/* Visitor counter */}
      {showVisitorCount && (
        <VisitorCounter 
          showAvatar={true} 
          animation="fade-in"
        />
      )}
    </div>
  )
}