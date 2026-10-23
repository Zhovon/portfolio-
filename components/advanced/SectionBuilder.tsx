/*!
  * Zhovon Portfolio 2.0 - Section Builder Modularity
  * Drag-and-drop section builder for personalized layouts
  * Pre-built sections with configurable props
  * Accessibility-focused with reduced motion support
*/

import { useState, useEffect } from 'react'

interface SectionConfig {
  id: string
  name: string
  component: React.ComponentType
  description: string
  defaultProps?: Record<string, any>
}

interface SectionBuilderProps {
  enabled?: boolean
  reducedMotion?: boolean
  onSectionChange?: (sectionId: string) => void
}

/**
 * SectionBuilder - Modular drag-and-drop section builder
 * Allows users to customize their portfolio layout
 */
export function SectionBuilder({ 
  enabled = true,
  reducedMotion = false,
  onSectionChange
}: SectionBuilderProps) {
  const [sections, setSections] = useState<SectionConfig[]>([])
  const [dragging, setDragging] = useState<string | null>(null)
  const [hoveredSection, setHoveredSection] = useState<string | null>(null)

  // Initialize default sections
  useEffect(() => {
    const defaultSections: SectionConfig[] = [
      {
        id: 'live-cursors',
        name: 'Live Cursors',
        component: null as any,
        description: 'Real-time cursor tracking for multi-viewer experience'
      },
      {
        id: 'performance',
        name: 'Performance Dashboard',
        component: null as any,
        description: 'Core Web Vitals monitoring and display'
      },
      {
        id: 'comments',
        name: 'Comments',
        component: null as any,
        description: 'Social comments system for projects'
      },
      {
        id: 'github',
        name: 'GitHub Activity',
        component: null as any,
        description: 'Recent GitHub activity feed'
      }
    ]
    setSections(defaultSections)
  }, [])

  // Reorder sections via drag-drop
  const handleDragStart = (sectionId: string) => {
    setDragging(sectionId)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleDrop = (targetId: string) => {
    setDragging(null)
    // In a full implementation, this would reorder the sections
    onSectionChange?.(targetId)
  }

  return (
    <div
      aria-label="Section builder"
      style={{
        ...(reducedMotion && {
          animation: 'none',
          transition: 'none',
        }),
        ...(!enabled && { display: 'none' }),
      }}
    >
      <h4 style={{ 
        margin: '8px 0',
        fontSize: '13px',
        ...(reducedMotion && { transition: 'color 0.2s ease' })
      }}>
        Section Builder
      </h4>
      
      {enabled && (
        <div style={{ 
          maxHeight: '300px',
          overflowY: 'auto',
          margin: '8px 0'
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
            gap: '8px'
          }}>
            {sections.map((section) => (
              <div
                key={section.id}
                draggable
                onDragStart={() => handleDragStart(section.id)}
                onDragOver={handleDragOver}
                onDrop={() => handleDrop(section.id)}
                style={{
                  background: hoveredSection === section.id 
                    ? 'rgba(125, 58, 237, 0.2)' 
                    : 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '8px',
                  padding: '12px',
                  cursor: 'grab',
                  transition: reducedMotion ? 'background 0.2s ease' : 'background 0.2s ease',
                  ...(reducedMotion && { transition: 'background 0.2s ease' })
                }}
              >
                <h5 style={{ 
                  margin: '0 0 4px 0',
                  fontSize: '12px',
                  color: 'oklch(0.645 0.237 165.47)'
                }}>
                  {section.name}
                </h5>
                <p style={{ 
                  margin: '0',
                  fontSize: '11px',
                  color: 'var(--muted-color, #666)',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap'
                }}>
                  {section.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}