/*!
  * Zhovon Portfolio 2.0 - Live Cursor System
  * Real-time cursor tracking for multi-viewer experience
  * Respects prefers-reduced-motion preference
*/

"use client"

import { useEffect, useRef } from 'react'

interface LiveCursorProps {
  color?: string
  size?: number
  enableTrail?: boolean
  reducedMotion?: boolean
}

/**
 * LiveCursorComponent - Renders cursor position indicator
 */
export function LiveCursorComponent({ 
  color = 'oklch(0.645 0.237 165.47)',
  size = 20, 
  enableTrail = true,
  reducedMotion = false
}: LiveCursorProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const shouldReduceMotion = reducedMotion || prefersReducedMotion

    if (shouldReduceMotion) return

    const handleMouseMove = (e: MouseEvent) => {
      if (!canvasRef.current) return
      const canvas = canvasRef.current
      const ctx = canvas.getContext('2d')
      if (!ctx) return

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      if (enableTrail) {
        ctx.beginPath()
        ctx.moveTo(canvas.width / 2, canvas.height / 2)
        ctx.lineTo(e.clientX, e.clientY)
        ctx.strokeStyle = color
        ctx.lineWidth = 2
        ctx.stroke()
      }

      ctx.beginPath()
      ctx.arc(e.clientX, e.clientY, size / 2, 0, Math.PI * 2)
      ctx.fillStyle = color
      ctx.globalAlpha = 0.8
      ctx.fill()
      ctx.globalAlpha = 1
    }

    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth
        canvasRef.current.height = window.innerHeight
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('resize', handleResize)
    handleResize()

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', handleResize)
    }
  }, [color, size, enableTrail, reducedMotion])

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
      {enableTrail && (
        <canvas
          ref={canvasRef}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
          }}
        />
      )}

      <svg
        aria-hidden="true"
        focusable="false"
        style={{
          position: 'absolute',
          width: `${size}px`,
          height: `${size}px`,
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
        }}
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={size / 2}
          fill={color}
          opacity={0.8}
        />
      </svg>
    </div>
  )
}