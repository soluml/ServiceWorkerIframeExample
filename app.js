if(!'serviceWorker' in navigator)
  return;

navigator.serviceWorker.register('sw.js')
  .then(reg => {
    const doc = document.getElementById('iframe').contentDocument;
    const html = `<!doctype html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta http-equiv="x-ua-compatible" content="ie=edge">
          <title>Iframe Service Worker Proxy - Iframe</title>
          <link href="https://notarealcdn.com/bootstrap.min.css" rel="stylesheet">
        </head>
        <body>
          <div class="well">Here's the iframe body in a Bootstrap well. It should show up even though the src is wrong because of parents Service Worker.</div>
        </body>
      </html>
    `;
    doc.open();
    doc.write(html);
    doc.close();
  });
