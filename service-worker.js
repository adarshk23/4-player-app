const CACHE_NAME = 'score-keeper-cache-v10';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/vite.svg',
  '/index.tsx',
  '/App.tsx',
  '/types.ts',
  '/components/PlayerCard.tsx',
  '/components/ScoreButton.tsx',
  '/components/icons.tsx',
  'https://cdn.tailwindcss.com',
  'https://esm.sh/react@18.2.0',
  'https://esm.sh/react-dom@18.2.0/client',
  'https://images.unsplash.com/photo-1524293581270-99431958042d?q=80&w=1974&auto=format&fit=crop'
];

// Install the service worker and cache the static assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache and caching assets');
        return cache.addAll(urlsToCache);
      })
  );
});

// Serve content using a more intelligent caching strategy
self.addEventListener('fetch', event => {
  const requestUrl = new URL(event.request.url);

  // For TS/TSX files, try network first to get the latest transpiled version.
  // This is crucial for environments that transpile on the fly.
  // Fall back to cache only for offline access.
  if (requestUrl.pathname.endsWith('.tsx') || requestUrl.pathname.endsWith('.ts')) {
    event.respondWith(
      fetch(event.request).catch(() => {
        return caches.match(event.request);
      })
    );
    return;
  }

  // For all other requests (HTML, CSS, images), use a cache-first strategy
  // for speed and offline reliability.
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        return response || fetch(event.request);
      })
  );
});


// Clean up old caches
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
