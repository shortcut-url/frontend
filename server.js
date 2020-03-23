const { createServer } = require('http');
const { join } = require('path');
const { parse } = require('url');
const next = require('next');

const dev = (process.env.NODE_ENV || '').trim() !== 'production';

const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer((req, res) => {
    let parsedUrl = parse(req.url, true);
    let { pathname } = parsedUrl;

    // handle GET request to /service-worker.js
    if (pathname === '/service-worker.js') {
      let filePath = join(__dirname, '.next', pathname);

      app.serveStatic(req, res, filePath);
    }

    handle(req, res, parsedUrl);
  }).listen(3000, () => {
    console.log(`> Ready on http://localhost:${3000}`);
  });
});
