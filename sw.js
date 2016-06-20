const CACHE_NAME = 'cache-v0';
const Paths = [
  '/'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(Paths))
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(cacheNames => Promise.all(
        cacheNames
          .filter(cacheName => cacheName.startsWith('reader-') && cacheName != CACHE_NAME)
          .map(cacheName => caches.delete(cacheName))
      ))
  );
});

self.addEventListener('fetch', event => {
  const processCSSRequest = () => fetch(`local-bootstrap.min.css`);

  if(event.request.url == `https://notarealcdn.com/bootstrap.min.css`)
    event.respondWith(
      fetch(event.request)
        .then(response => response.status >= 400 ? processCSSRequest() : response)
        .catch(processCSSRequest)
    );
  else
    event.respondWith(
      caches.match(event.request)
        .then(response => response || fetch(event.request))
    );
});
