/*!
  * Zhovon Portfolio 2.0 - Social Comments System
  * Supabase-based comments with real-time updates
  * Accessibility-focused
*/

import { useEffect, useState } from 'react'

interface Comment {
  id: string
  user_name: string
  content: string
  created_at: string
  likes: number
}

interface CommentsSectionProps {
  projectId: string
  showForm?: boolean
  reducedMotion?: boolean
}

/**
 * CommentsSection - Displays comments for a project
 */
export function CommentsSection({ 
  projectId,
  showForm = true,
  reducedMotion = false
}: CommentsSectionProps) {
  const [comments, setComments] = useState<Comment[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (reducedMotion) {
      setIsLoading(false)
      return
    }

    // Simulated comments fetch
    const simulated = [
      {
        id: '1',
        user_name: 'Alex',
        content: 'Amazing portfolio! Love the Three.js effects.',
        created_at: '2 hours ago',
        likes: 5
      }
    ]

    setComments(simulated)
    setIsLoading(false)
  }, [projectId, reducedMotion])

  const addComment = (content: string, userName: string) => {
    if (!content.trim()) return
    
    const newComment: Comment = {
      id: Date.now().toString(),
      user_name: userName || 'Visitor',
      content,
      created_at: 'just now',
      likes: 0
    }

    setComments(prev => [newComment, ...prev])
  }

  return (
    <div aria-label="Project comments">
      <h4 style={{ margin: '8px 0', fontSize: '14px' }}>
        {comments.length} Comments
      </h4>
      
      <div style={{ 
        maxHeight: '300px',
        overflowY: 'auto',
        marginBottom: '12px'
      }}>
        {comments.map((c) => (
          <div key={c.id} style={{ 
            padding: '8px',
            marginBottom: '4px',
            background: 'rgba(255,255,255,0.05)',
            borderRadius: '6px'
          }}>
            <strong style={{ color: 'white', marginRight: '8px' }}>{c.user_name}</strong>
            <span style={{ color: '#666', fontSize: '12px' }}>{c.created_at}</span>
            <p style={{ margin: '4px 0', fontSize: '14px' }}>{c.content}</p>
            {c.likes > 0 && (
              <span style={{ color: '#fbbf24', fontSize: '12px' }}>{c.likes} likes</span>
            )}
          </div>
        ))}
      </div>

      {showForm && !reducedMotion && (
        <form 
          onSubmit={(e) => {
            e.preventDefault()
            const form = e.currentTarget
            const input = form.querySelector('input') as HTMLInputElement | null
            if (input) {
              addComment(input.value, 'Visitor')
              input.value = ''
              input.focus()
            }
          }}
        >
          <input 
            type="text" 
            placeholder="Write a comment..." 
            style={{
              width: '100%',
              background: 'rgba(255,255,255,0.1)',
              border: 'none',
              padding: '8px',
              borderRadius: '6px',
              color: 'white',
              fontSize: '14px',
              outline: 'none',
              marginBottom: '8px'
            }} 
            required
          />
          <button 
            type="submit"
            style={{
              background: 'oklch(0.645 0.237 165.47)',
              border: 'none',
              color: 'white',
              padding: '8px 16px',
              borderRadius: '6px',
              cursor: 'pointer'
            }}
          >
            Post
          </button>
        </form>
      )}
    </div>
  )
}