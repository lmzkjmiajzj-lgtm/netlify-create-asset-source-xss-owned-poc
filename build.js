const fs = require('fs');
fs.mkdirSync('dist', { recursive: true });
fs.copyFileSync('index.html', 'dist/index.html');
fs.copyFileSync('proof-manifest.json', 'dist/proof-manifest.json');
fs.cpSync('assets', 'dist/assets', { recursive: true });
fs.writeFileSync('dist/_headers', `/proof-manifest.json
  Cache-Control: no-store
`);
