self.importScripts('./sw-patch.js')

self.addEventListener('install', function (event) {
  event.waitUntil(self.skipWaiting())
})

self.addEventListener('activate', function (event) {
  event.waitUntil(self.clients.claim())
})

self.addEventListener('fetch', async (event) => {
  const url = event.request.url
  if (!url.startsWith('http') || event.request.method !== 'GET') return

  event.respondWith(
    (async function () {
      const cache = await caches.open('v1')
      if (shouldPatchReact(url)) {
        return createScriptResponse(reactScript)
      }
      if (shoulePatchJsxRuntime(url)) {
        return createScriptResponse(jsxRuntimeScript)
      }
      if (shouldPatchReactDom(url)) {
        return createScriptResponse(reactDOMScript)
      }

      const cachedResponse = await cache.match(event.request)
      if (cachedResponse) return cachedResponse

      const networkResponse = await fetch(event.request)
      event.waitUntil(cache.put(event.request, networkResponse.clone()))
      return networkResponse
    })()
  )
})
