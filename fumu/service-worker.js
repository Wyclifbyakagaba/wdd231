const CACHE_NAME = 'fumu-cache-v1';
const PRECACHE_URLS = [
  '/',
  '/fumu-sports.html',
  '/about-us.html',
  '/directory.html',
  '/contacts.html',
  '/styles/fumu-sports.css',
  '/styles/scripts/home.js',
  '/styles/scripts/directory.js',
  '/styles/scripts/fumu-sports.js',
  '/data/members.json'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(PRECACHE_URLS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);
  // only handle same-origin GET requests
  if (event.request.method !== 'GET' || url.origin !== location.origin) return;
  event.respondWith(
    caches.match(event.request).then(cached => cached || fetch(event.request).then(resp => {
      return caches.open(CACHE_NAME).then(cache => {
        cache.put(event.request, resp.clone());
        return resp;
      });
    })).catch(() => caches.match('/fumu-sports.html'))
  );
});
