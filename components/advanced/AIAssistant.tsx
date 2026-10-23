/*!
  * Zhovon Portfolio 2.0 - AI Assistant Integration
  * Chat-based AI assistant for portfolio guidance
  * Privacy-focused with local knowledge base
  * Accessibility-focused with reduced motion support
*/

import { useEffect, useState } from 'react'

interface AIMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: string
}

// Local knowledge base responses
const getLocalResponse = (userInput: string) => {
  const inputLower = userInput.toLowerCase()

  if (/hello|hi|hey/.test(inputLower)) {
    return 'Hello! I\'m your AI assistant for ZHOVON Portfolio 2.0. I can help you navigate the portfolio, explain features, and answer questions about the projects displayed.'
  }

  if (inputLower.includes('three') || inputLower.includes('3d')) {
    return 'The Three.js particle system is a real-time interactive background that responds to your mouse cursor and creates dynamic visual patterns. It respects your reduced motion preferences and optimizes performance across devices.'
  }

  if (inputLower.includes('supabase') || inputLower.includes('database')) {
    return 'Supabase provides the backend infrastructure including real-time databases, authentication, and storage. The portfolio uses Supabase for visitor counting, comments, and live cursor tracking with instant updates across all viewers.'
  }

  if (inputLower.includes('performance') || inputLower.includes('speed') || inputLower.includes('fast')) {
    return 'The portfolio implements multiple performance optimizations: lazy loading, reduced motion support, PWA caching via Service Worker, and Core Web Vitals monitoring. All assets are optimized for quick loading even on slow connections.'
  }

  if (inputLower.includes('contact') || inputLower.includes('email') || inputLower.includes('reach')) {
    return 'You can reach me through the contact section of the portfolio or connect via GitHub. The newsletter form also allows you to subscribe for updates on new projects and features.'
  }

  return 'I\'m still learning about ZHOVON Portfolio 2.0! For now, I can help you with information about the interactive features, technology stack, performance, and general navigation. Feel free to ask me about any specific aspect of the portfolio.'
}

interface AIAssistantProps {
  reducedMotion?: boolean
}

export function AIAssistant({ reducedMotion = false }: AIAssistantProps) {
  const [messages, setMessages] = useState<AIMessage[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isInitialized, setIsInitialized] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (mq.matches) {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    setIsInitialized(true)
  }, [])

  const sendMessage = async () => {
    if (!input.trim() || isLoading || !isInitialized) return

    const userMessage: AIMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date().toLocaleTimeString()
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    await new Promise(resolve => setTimeout(resolve, 800))

    const aiResponse = getLocalResponse(input)

    const assistantMessage: AIMessage = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: aiResponse,
      timestamp: new Date().toLocaleTimeString()
    }

    setMessages(prev => [...prev, assistantMessage])
    setIsLoading(false)
  }

  return (
    <div aria-label="AI Assistant chat" style={{ ...(reducedMotion && { animation: 'none', transition: 'none' }) }}>
      <div style={{ height: '300px', overflowY: 'auto', marginBottom: '12px' }}>
        {messages.map((msg) => (
          <div key={msg.id} style={{ marginBottom: '12px', maxWidth: '80%', textAlign: msg.role === 'user' ? 'right' : 'left' }}>
            <div style={{ background: msg.role === 'user' ? 'oklch(0.645 0.237 165.47)' : 'rgba(255, 255, 255, 0.1)', color: msg.role === 'user' ? 'white' : 'white', padding: '8px 12px', borderRadius: '12px 12px 2px 12px', fontSize: '13px' }}>{msg.content}</div>
            <small style={{ marginTop: '4px', fontSize: '10px', color: 'var(--muted-color, #666)', display: 'block', textAlign: msg.role === 'user' ? 'right' : 'left' }}>{msg.timestamp}</small>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', gap: '8px' }}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask me about the portfolio..."
          style={{
            flex: 1,
            background: 'rgba(255, 255, 255, 0.1)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '20px',
            padding: '8px 16px',
            color: 'white',
            fontSize: '13px',
            outline: 'none',
          }}
          disabled={isLoading}
        />
        <button
          type="button"
          onClick={sendMessage}
          disabled={isLoading || !input.trim()}
          style={{
            background: 'oklch(0.645 0.237 165.47)',
            border: 'none',
            color: 'white',
            padding: '0 20px',
            borderRadius: '20px',
            fontSize: '13px',
          }}
        >
          Send
        </button>
      </div>
    </div>
  )
}