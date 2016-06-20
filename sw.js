self.addEventListener('install', event => {
  console.log('Installed');
  event.waitUntil(self.skipWaiting());
});

self.addEventListener('activate', event => console.log('Activated'));

self.addEventListener('fetch', event => {
  console.log('Fetching ->', event.request.url);

  const processCSSRequest = () => fetch(`local-bootstrap.min.css`);

  if(event.request.url == `https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css`)
    event.respondWith(
      fetch(`local-bootstrap.min.css`)
    );
  else
    event.respondWith(
      fetch(event.request)
    );
});
