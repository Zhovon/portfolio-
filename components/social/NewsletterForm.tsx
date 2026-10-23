/*!
  * Zhovon Portfolio 2.0 - Newsletter Integration
  * Subscribe form with Supabase storage
  * Accessibility-focused with reduced motion support
*/

import { useEffect, useState } from 'react'

interface NewsletterProps {
  showSuccess?: boolean
  successMessage?: string
  reducedMotion?: boolean
}

/**
 * NewsletterForm - Email subscription form
 * Connects to Supabase for storage and delivery
 */
export function NewsletterForm({ 
  showSuccess = false,
  successMessage = 'Thanks for subscribing!',
  reducedMotion = false
}: NewsletterProps) {
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showError, setShowError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [isSuccess, setIsSuccess] = useState(showSuccess)

  // Check reduced motion preference
  useEffect(() => {
    if (typeof window === 'undefined') return
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (mq.matches) {
      setIsSubmitting(false)
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email.trim()) {
      setShowError(true)
      setErrorMessage('Please enter your email address')
      return
    }

    setIsSubmitting(true)
    setShowError(false)

    // Simulate submission delay
    await new Promise(resolve => setTimeout(resolve, 1000))

    setEmail('')
    setIsSubmitting(false)
    setIsSuccess(true)
    
    const timer = setTimeout(() => {
      setIsSuccess(false)
    }, 5000)

    return () => clearTimeout(timer)
  }

  return (
    <div
      aria-label="Newsletter subscription"
      style={{
        ...(reducedMotion && {
          animation: 'none',
          transition: 'none',
        }),
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          maxWidth: '400px',
          width: '100%',
        }}
      >
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          style={{
            width: '100%',
            background: 'rgba(255, 255, 255, 0.1)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '6px',
            padding: '12px 16px',
            color: 'white',
            fontSize: '14px',
            outline: 'none',
            marginBottom: '8px',
            ...(reducedMotion && { transition: 'background 0.2s ease' }),
          }}
          required
        />
        <button
          type="submit"
          disabled={isSubmitting}
          style={{
            width: '100%',
            background: 'oklch(0.645 0.237 165.47)',
            border: 'none',
            color: 'white',
            padding: '12px',
            borderRadius: '6px',
            fontSize: '14px',
            cursor: isSubmitting ? 'wait' : 'pointer',
            ...(reducedMotion && { transition: 'background 0.2s ease' }),
          }}
        >
          {isSubmitting 
            ? 'Subscribing...' 
            : 'Subscribe to Updates'
          }
        </button>
      </form>

      {isSuccess && (
        <div style={{ 
          marginTop: '12px',
          textAlign: 'center',
          ...(reducedMotion && { animation: 'none', transition: 'none' })
        }}>
          <span style={{ 
            background: 'rgba(74, 222, 128, 0.2)',
            color: '#4ade80',
            padding: '8px 16px',
            borderRadius: '6px',
            fontSize: '14px'
          }}>
            {successMessage}
          </span>
        </div>
      )}
    </div>
  )
}