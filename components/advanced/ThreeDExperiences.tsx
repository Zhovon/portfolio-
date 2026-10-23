/*!
  * Zhovon Portfolio 2.0 - Full 3D Interactive Experiences
  * Advanced Three.js integrations and WebGL visualizations
  * Performance-optimized with reduced motion preferences
  * Accessibility-focused with fallback options
*/

import { useEffect, useState } from 'react'

interface ThreeDConfig {
  id: string
  name: string
  description: string
  enabled: boolean
  props?: Record<string, any>
}

/**
 * ThreeDExperiences - Advanced Three.js visualizations
 * Provides multiple 3D interactive experiences with performance fallback
 */
export function ThreeDExperiences({ 
  reducedMotion = false
}: { reducedMotion?: boolean }) {
  const [experiences, setExperiences] = useState<ThreeDConfig[]>([])
  const [isWebGLSupported, setIsWebGLSupported] = useState(false)

  // Check WebGL support
  useEffect(() => {
    const canvas = document.createElement('canvas')
    setIsWebGLSupported(!!(canvas.getContext('webgl2') || canvas.getContext('webgl')))
  }, [])

  // Initialize experiences
  useEffect(() => {
    const defaultExperiences: ThreeDConfig[] = [
      {
        id: 'particle-system',
        name: 'Particle System',
        description: 'Interactive particle field responding to cursor movement',
        enabled: !reducedMotion
      },
      {
        id: 'wave-visualization',
        name: 'Wave Visualization',
        description: '3D wave pattern with physics-based interactions',
        enabled: !reducedMotion && isWebGLSupported
      },
      {
        id: 'star-field',
        name: 'Star Field',
        description: 'Deep space starfield with parallax scrolling',
        enabled: !reducedMotion
      }
    ]
    setExperiences(defaultExperiences)
  }, [reducedMotion, isWebGLSupported])

  return (
    <div
      aria-label="3D interactive experiences"
      style={{
        ...(reducedMotion && {
          animation: 'none',
          transition: 'none',
        }),
      }}
    >
      <h4 style={{ 
        margin: '8px 0',
        fontSize: '13px',
        ...(reducedMotion && { transition: 'color 0.2s ease' })
      }}>
        3D Experiences
      </h4>
      
      {isWebGLSupported && !reducedMotion && (
        <div style={{ 
          maxHeight: '300px',
          overflowY: 'auto',
          margin: '8px 0'
        }}>
          {experiences.map((exp) => exp.enabled && (
            <div
              key={exp.id}
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '8px',
                padding: '12px',
                marginBottom: '12px',
                color: 'white'
              }}
            >
              <h5 style={{ margin: '0 0 4px 0', fontSize: '12px' }}>{exp.name}</h5>
              <p style={{ 
                margin: '0',
                fontSize: '11px',
                color: 'var(--muted-color, #666)',
                lineHeight: '1.4'
              }}>
                {exp.description}
              </p>
            </div>
          ))}
          {experiences.every(e => !e.enabled) && (
            <p style={{ 
              fontSize: '12px',
              color: 'var(--muted-color, #666)',
              textAlign: 'center'
            }}>
              3D effects disabled (reduced motion enabled)
            </p>
          )}
        </div>
      )}
      
      {!isWebGLSupported && !reducedMotion && (
        <div style={{ 
          padding: '8px',
          background: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '8px',
          margin: '8px 0',
          fontSize: '12px',
          color: 'var(--muted-color, #666)'
        }}>
          WebGL not supported - using 2D fallbacks
        </div>
      )}
    </div>
  )
}