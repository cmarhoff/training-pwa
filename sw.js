const CACHE = 'training-pwa-v1';
const ASSETS = [
  '.',
  'index.html',
  'style.css',
  'data.js',
  'app.js',
  'manifest.json'
];

self.addEventListener('install', evt => {
  evt.waitUntil(
    caches.open(CACHE)
      .then(cache => cache.addAll(ASSETS))
  );
});
self.addEventListener('fetch', evt => {
  evt.respondWith(
    caches.match(evt.request)
      .then(res => res || fetch(evt.request))
  );
});

