const CACHE_NAME = 'my-app-cache-v2';
const CACHE_VERSION = 'v2';
const CACHE_FILES = [
  '/',
  '/index.html',
  '/offline.html',
   // You can create an offline fallback page if needed
  // Add other URLs of assets you want to cache (e.g., JS, CSS, images)
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(`${CACHE_NAME}-${CACHE_VERSION}`)
      .then((cache) => cache.addAll(CACHE_FILES))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter(
            (cacheName) =>
              cacheName.startsWith(CACHE_NAME) && cacheName !== `${CACHE_NAME}-${CACHE_VERSION}`
          )
          .map((cacheName) => caches.delete(cacheName))
      );
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return (
        response ||
        fetch(event.request).then((fetchResponse) => {
          if (!fetchResponse || fetchResponse.status !== 200 || fetchResponse.type !== 'basic') {
            return fetchResponse;
          }

          const responseToCache = fetchResponse.clone();
          caches.open(`${CACHE_NAME}-${CACHE_VERSION}`).then((cache) => {
            cache.put(event.request, responseToCache);
          });

          return fetchResponse;
        })
      );
    }).catch(() => {
      // If there's an error while fetching, show the offline fallback page
      return caches.match('/offline.html');
    })
  );
});

self.addEventListener('message', (event) => {
  if (event.data.action === 'skipWaiting') {
    self.skipWaiting();
  }
});
