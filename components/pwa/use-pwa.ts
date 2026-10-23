/*!
  * Zhovon Portfolio 2.0 - Service Worker Registration Hook
  * Registers service worker in production environment
*/

"use client"

import { useEffect } from 'react'

export function usePWA() {
  useEffect(() => {
    if (
      process.env.NEXT_PUBLIC_ENABLE_PWA !== 'true' ||
      process.env.NODE_ENV !== 'production' ||
      typeof window === 'undefined' ||
      !('serviceWorker' in navigator)
    ) {
      return
    }

    const registerSW = async () => {
      try {
        const registration = await navigator.serviceWorker.register('/sw.js', {
          scope: '/',
        })

        registration.onupdatefound = () => {
          const installingWorker = registration.installing
          if (!installingWorker) return

          installingWorker.onstatechange = () => {
            if (installingWorker.state === 'installed' && navigator.serviceWorker.controller) {
              if (navigator.onLine) {
                console.log('New content available, reload to update.')
              }
            }
          }
        }

        const syncReg = (registration as any).sync
        if (syncReg) {
          syncReg.register('form-submissions').catch(() => {})
        }
      } catch (error) {
        console.error('Service worker registration failed:', error)
      }
    }

    if (document.readyState === 'complete') {
      registerSW()
    } else {
      window.addEventListener('load', registerSW)
      return () => window.removeEventListener('load', registerSW)
    }
  }, [])
}

export default usePWA