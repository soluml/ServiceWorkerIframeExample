if('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js')
    .then(reg => {
      const doc = document.getElementById('iframe').contentDocument;

      doc.open();
      doc.write(`<!doctype html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta http-equiv="x-ua-compatible" content="ie=edge">
            <title>Iframe Service Worker Proxy - Iframe</title>
            <link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" rel="stylesheet">
          </head>
          <body>
            <div class="well">Here's the iframe body in a .well class. Bootstrap should be substitueted for a local CSS file, which turns this text blue.</div>
          </body>
        </html>
      `);
      doc.close();
    });
}
