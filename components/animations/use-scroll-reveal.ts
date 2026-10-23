import { useEffect, useState, useRef } from 'react'

export function useScrollReveal(
  options = { rootMargin: '0px 0px -50px 0px', threshold: 0.2 }
) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting)
      },
      {
        root: null,
        rootMargin: options.rootMargin,
        threshold: options.threshold,
      }
    )

    observer.observe(element)

    return () => observer.disconnect()
  }, [options.rootMargin, options.threshold])

  return { ref, isVisible }
}