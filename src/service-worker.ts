/*!
  * Zhovon Portfolio 2.0 - Service Worker
  * Offline-first caching strategy
  * Strategic asset caching for performance
*/

// Cast global scope for TypeScript environments with DOM lib
const sw = self as any

const CACHE_NAME = 'zhovon-portfolio-v1'
const OFFLINE_URL = '/'

// Assets to cache on install
const ESSENTIAL_ASSETS = [
  '/',
]

// Install event - cache assets
sw.addEventListener('install', (event: any) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ESSENTIAL_ASSETS)
    })
  )

  // Skip waiting to activate immediately
  sw.skipWaiting()
})

// Activate event - clean up old caches
sw.addEventListener('activate', (event: any) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      )
    })
  )

  // Claim clients for immediate control
  if (sw.clients && sw.clients.claim) {
    event.waitUntil(sw.clients.claim())
  }
})

// Fetch event - strategic caching
sw.addEventListener('fetch', (event: any) => {
  // Skip non-GET requests
  if (event.request.method !== 'GET') return

  // Skip third-party requests for security
  try {
    const url = new URL(event.request.url)
    if (!url.origin.startsWith(sw.location.origin)) return
  } catch {
    return
  }

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse
      }

      return fetch(event.request).then((networkResponse) => {
        if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
          return networkResponse
        }

        const responseToCache = networkResponse.clone()

        caches.open(CACHE_NAME).then((cache) => {
          if (networkResponse.headers.get('content-length') && 
              parseInt(networkResponse.headers.get('content-length')!) > 2 * 1024 * 1024) {
            return
          }

          cache.put(event.request, responseToCache)
        })

        return networkResponse
      }).catch(() => {
        if (event.request.mode === 'navigate') {
          return caches.match(OFFLINE_URL).then((res) => res || Response.error())
        }
        return Response.error()
      })
    })
  )
})

// Background sync for form submissions
sw.addEventListener('sync', (event: any) => {
  if (event.tag === 'form-submissions') {
    event.waitUntil(Promise.resolve())
  }
})

// Push notifications (optional)
sw.addEventListener('push', (event: any) => {
  const title = event.data?.text() || 'Portfolio Update'
  const options = {
    body: 'Check out the latest updates on your portfolio',
    icon: '/favicon-192x192.png',
    badge: '/favicon-192x192.png',
    data: {
      dateOfArrival: Date.now()
    },
    actions: [
      {
        action: 'explore',
        title: 'Explore'
      }
    ]
  }

  event.waitUntil(
    sw.registration.showNotification(title, options)
  )
})

// Notification click handler
sw.addEventListener('notificationclick', (event: any) => {
  event.notification.close()

  event.waitUntil(
    sw.clients.matchAll({ type: 'window' }).then((clientList: any[]) => {
      for (const client of clientList) {
        if ('focus' in client && client.url.includes(sw.location.origin)) {
          return client.focus()
        }
      }

      if (sw.clients.openWindow) {
        return sw.clients.openWindow('/')
      }
    })
  )
})