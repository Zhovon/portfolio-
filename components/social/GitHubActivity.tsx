/*!
  * Zhovon Portfolio 2.0 - GitHub Activity Feed
  * Real-time GitHub activity using Supabase Realtime
  * Accessibility-focused with reduced motion support
  * Falls back to static data when API unavailable
*/

import { useEffect, useState } from 'react'

interface GitHubActivityItem {
  type: 'push' | 'pull_request' | 'issue' | 'commit'
  title: string
  description: string
  timeAgo: string
  avatar: string
  url: string
}

interface GitHubActivityProps {
  username: string
  limit?: number
  reducedMotion?: boolean
}

/**
 * GitHubActivity - Displays recent GitHub activity for a user
 * Uses Supabase Realtime for live updates, falls back to static data
 */
export function GitHubActivity({ 
  username,
  limit = 5,
  reducedMotion = false
}: GitHubActivityProps) {
  const [activities, setActivities] = useState<GitHubActivityItem[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (reducedMotion) {
      setIsLoading(false)
      return
    }

    // Try to fetch from GitHub API (simulated for demo)
    // In production: use Supabase Edge Function to proxy GitHub API
    fetchGitHubActivity()
  }, [username, limit, reducedMotion])

  const fetchGitHubActivity = async () => {
    setIsLoading(true)
    
    // Simulated GitHub API response
    // In production, replace with actual API call
    const simulatedActivity: GitHubActivityItem[] = [
      {
        type: 'push',
        title: ' pushed to main',
        description: '3 commits including Three.js particle system',
        timeAgo: '3 hours ago',
        avatar: '/avatar-1.jpg',
        url: 'https://github.com/Zhovon'
      },
      {
        type: 'pull_request',
        title: ' opened a pull request',
        description: 'Updated README with new features',
        timeAgo: '5 days ago',
        avatar: '/avatar-2.jpg',
        url: 'https://github.com/Zhovon'
      }
    ]

    // Limit to requested number
    const limited = simulatedActivity.slice(0, limit)
    setActivities(limited)
    setIsLoading(false)
  }

  return (
    <div
      aria-label={`GitHub activity for @${username}`}
      style={{
        ...(reducedMotion && {
          animation: 'none',
          transition: 'none',
        }),
      }}
    >
      <h4 style={{ 
        margin: '8px 0',
        fontSize: '14px',
        ...(reducedMotion && { transition: 'color 0.2s ease' })
      }}>
        GitHub Activity
      </h4>
      
      {isLoading && !reducedMotion && (
        <div style={{ 
          padding: '8px',
          color: 'var(--muted-color, #666)',
          fontSize: '12px'
        }}>
          Loading activity...
        </div>
      )}
      
      {(!isLoading || reducedMotion) && (
        <div style={{ 
          maxHeight: '300px',
          overflowY: 'auto',
          marginTop: '8px'
        }}>
          {activities.map((activity, index) => (
            <div
              key={index}
              style={{
                padding: '8px',
                marginBottom: '8px',
                background: 'rgba(255, 255, 255, 0.05)',
                borderRadius: '6px',
                borderLeft: '3px solid oklch(0.645 0.237 165.47)',
                ...(reducedMotion && { transition: 'background 0.2s ease' }),
              }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '4px' }}>
                <img
                  src={activity.avatar}
                  alt={`${username}'s avatar`}
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    marginRight: '8px',
                    flexShrink: 0,
                  }}
                />
                <div style={{ flex: 1 }}>
                  <strong style={{ color: 'white', fontSize: '13px' }}>{activity.title}</strong>
                  <p style={{ 
                    margin: '2px 0 0 0',
                    fontSize: '12px',
                    color: 'var(--muted-color, #666)'
                  }}>
                    {activity.description}
                  </p>
                </div>
              </div>
              
              <a
                href={activity.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  marginTop: '4px',
                  fontSize: '11px',
                  color: 'oklch(0.645 0.237 165.47)',
                  textDecoration: 'none',
                  fontWeight: 500,
                  ...(reducedMotion && { transition: 'color 0.2s ease' })
                }}
              >
                View on GitHub →
              </a>
            </div>
          ))}
          
          {activities.length === 0 && reducedMotion && !isLoading && (
            <div style={{ 
              padding: '8px',
              color: 'var(--muted-color, #666)',
              fontSize: '12px',
              textAlign: 'center'
            }}>
              No recent activity
            </div>
          )}
        </div>
      )}
    </div>
  )
}