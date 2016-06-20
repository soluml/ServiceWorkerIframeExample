self.addEventListener('install', event => {
  console.log('Installed');
});

self.addEventListener('activate', event => {
  console.log('Activated');
});

self.addEventListener('fetch', event => {
  console.log('Fetching ->', event.request.url);

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
