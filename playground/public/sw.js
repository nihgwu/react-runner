self.importScripts('./sw-patch.js')

self.addEventListener('install', function (event) {
  event.waitUntil(self.skipWaiting())
})

self.addEventListener('activate', function (event) {
  const expectedCacheNames = ['esm.sh']
  event.waitUntil(
    self.clients.claim().then(() =>
      caches.keys().then(function (cacheNames) {
        return Promise.all(
          cacheNames.map(function (cacheName) {
            if (!expectedCacheNames.includes(cacheName)) {
              return caches.delete(cacheName)
            }
          })
        )
      })
    )
  )
})

self.addEventListener('fetch', function (event) {
  if (event.request.method !== 'GET') return

  const url = event.request.url
  const scope = self.registration.scope
  if (!url.startsWith(scope) && !/^https:\/\/(cdn.)?esm.sh\//.test(url)) return

  event.respondWith(
    (async function () {
      const cachedResponse = await caches.match(event.request)
      if (cachedResponse) return cachedResponse

      for (const pkg of packagesToPatch) {
        const patch = createPatch(url, pkg)
        if (patch) return patch
      }

      const networkResponse = await fetch(event.request)
      if (networkResponse.ok) {
        caches
          .open(url.startsWith(scope) ? 'web' : 'esm.sh')
          .then((cache) => cache.put(event.request, networkResponse))
      }
      return networkResponse.clone()
    })()
  )
})
