/*!
  * Zhovon Portfolio 2.0 - Performance Dashboard
  * Core Web Vitals monitoring
  * Simplified version for Phase A
*/

"use client"

import { useEffect, useState } from 'react'

interface PerformanceMetrics {
  lcp?: number
  cls?: number
  fid?: number
}

interface PerformanceDashboardProps {
  reducedMotion?: boolean
}

export function PerformanceDashboard({ 
  reducedMotion = false
}: PerformanceDashboardProps) {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({})

  useEffect(() => {
    if (reducedMotion || typeof window === 'undefined' || typeof performance === 'undefined') return

    const onLoad = () => {
      try {
        const lcpEntry = performance.getEntriesByName('largest-contentful-paint')[0]
        const lcp = lcpEntry ? lcpEntry.startTime : undefined

        const clsEntries = performance.getEntriesByType('layout-shift') as any[]
        const cls = clsEntries.reduce((acc: number, entry: any) => {
          return entry.hadRecentInput ? acc : acc + (entry.value || 0)
        }, 0)

        setMetrics({
          lcp: lcp !== undefined ? Math.round(lcp) : undefined,
          cls: Math.round(cls * 1000) / 1000,
        })
      } catch {
        // Performance observer entries not supported in all browsers
      }
    }

    if (document.readyState === 'complete') {
      onLoad()
    } else {
      window.addEventListener('load', onLoad)
    }

    return () => {
      window.removeEventListener('load', onLoad)
    }
  }, [reducedMotion])

  const format = (value: number | undefined, type: 'ms' | 'score') => {
    if (value === undefined) return '–'
    if (type === 'ms') return `${value.toFixed(0)}ms`
    return `${value.toFixed(3)} ${value < 0.1 ? '✓' : '✗'}`
  }

  if (Object.keys(metrics).length === 0) {
    return null
  }

  return (
    <div
      aria-label="Performance metrics"
      style={{
        position: 'fixed',
        top: 20,
        left: 20,
        background: 'rgba(0, 0, 0, 0.8)',
        color: 'white',
        padding: '12px 20px',
        borderRadius: '8px',
        fontSize: '12px',
        zIndex: 9997,
        ...(reducedMotion && { transition: 'none', animation: 'none' }),
      }}
    >
      <div>
        <div style={{ marginBottom: 6 }}>
          <span>LCP: </span>
          <span style={{ 
            color: (metrics.lcp ?? 0) < 2500 ? '#4ade80' : '#f87171',
            fontWeight: 500
          }}>{format(metrics.lcp, 'ms')}</span>
        </div>
        
        <div>
          <span>CLS: </span>
          <span style={{ 
            color: (metrics.cls ?? 0) < 0.1 ? '#4ade80' : '#f87171',
            fontWeight: 500
          }}>{format(metrics.cls, 'score')}</span>
        </div>
      </div>
    </div>
  )
}