/*!
  * Zhovon Portfolio 2.0 - Visitor Counter
  * Live visitor count using Supabase Realtime
  * Accessibility-focused with reduced motion support
*/

import { useEffect, useState } from 'react'

interface VisitorCounterProps {
  showAvatar?: boolean
  avatarSize?: number
  animation?: string
}

/**
 * VisitorCounter - Displays live visitor count
 * In production: connects to Supabase Realtime for live updates
 * Demo version: simulates real-time counting
 */
export function VisitorCounter({ 
  showAvatar = true,
  avatarSize = 32,
  animation = 'fade-in'
}: VisitorCounterProps) {
  const [visitorCount, setVisitorCount] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [reducedMotion, setReducedMotion] = useState(
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )

  // Check reduced motion preference
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(mq.matches)
    mq.addEventListener('change', (e: any) => setReducedMotion(e.matches))
  }, [])

  // Initialize counter
  useEffect(() => {
    if (reducedMotion) {
      setVisitorCount(0)
      setIsLoading(false)
      return
    }

    // Simulate real-time visitor count
    const startCount = Math.floor(Math.random() * 500) + 100
    let isMounted = true

    const interval = setInterval(() => {
      if (!isMounted) return
      setVisitorCount(prev => Math.min(prev + 1, startCount + 30))
    }, 800)

    setIsLoading(false)

    return () => {
      isMounted = false
      clearInterval(interval)
    }
  }, [reducedMotion])

  // Counter animation
  useEffect(() => {
    if (reducedMotion) return

    const counterElement = document.querySelector('[data-visitor-count]') as HTMLElement | null
    if (counterElement) {
      counterElement.style.transition = 'opacity 0.5s ease, transform 0.3s ease'
    }
  }, [visitorCount, reducedMotion])

  return (
    <div
      aria-label={`Current visitor count: ${visitorCount} active viewers`}
      style={{
        position: 'fixed',
        bottom: 20,
        right: 20,
        background: 'rgba(0, 0, 0, 0.5)',
        color: 'white',
        padding: '8px 16px',
        borderRadius: '8px',
        fontSize: '14px',
        zIndex: 9998,
        ...(reducedMotion && {
          animation: 'none',
          transition: 'none',
        }),
        ...(!reducedMotion && animation === 'fade-in' && {
          animation: 'fade-in 0.5s ease-in-out',
        }),
      }}
      data-visitor-count
    >
      {showAvatar && !reducedMotion && (
        <svg
          width={avatarSize}
          height={avatarSize}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          style={{ marginRight: '8px', flexShrink: 0 }}
        >
          <circle cx={12} cy={12} r={10} />
          <path d="M8 14s1.5 2 4 2 4-2 4-2" />
          <line x1={9} y1={9} x2={9.01} y2={9} />
        </svg>
      )}
      <span>{visitorCount}+ viewers</span>
    </div>
  )
}