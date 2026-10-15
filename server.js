const http = require('http');
const fs = require('fs');
const path = require('path');
const args = process.argv.slice(2);
const arg = (name, fallback) => { const i = args.indexOf(`--${name}`); return i >= 0 ? args[i + 1] : fallback; };
const port = Number(arg('port', process.env.PORT || 3000));
const hostname = arg('hostname', '0.0.0.0');
http.createServer((req, res) => {
  const pathname = new URL(req.url, 'http://local').pathname;
  const rel = pathname === '/assets/safe.svg' ? 'assets/safe.svg' : pathname === '/proof-manifest.json' ? 'proof-manifest.json' : 'index.html';
  const type = rel.endsWith('.svg') ? 'image/svg+xml' : rel.endsWith('.json') ? 'application/json; charset=utf-8' : 'text/html; charset=utf-8';
  res.writeHead(200, { 'content-type': type, 'cache-control': 'no-store' });
  res.end(fs.readFileSync(path.join(__dirname, rel)));
}).listen(port, hostname);
