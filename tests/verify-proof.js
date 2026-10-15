const fs = require('fs');
const vm = require('vm');
const config = fs.readFileSync('stackbit.config.ts', 'utf8');
const match = config.match(/const harmlessMarker = ("(?:\\.|[^"\\])*");/);
if (!match) throw new Error('asset-source payload not found');
const url = JSON.parse(match[1]);
if (!url.startsWith('javascript:')) throw new Error('asset-source scheme changed');
if (!config.includes('assetSources:')) throw new Error('asset-source source missing');
if (config.includes('custom-inline-script') || config.includes('controlUrl')) throw new Error('fixture is not isolated from custom-control path');
const attrs = new Map();
const ids = new Map();
const root = { setAttribute: (k, v) => attrs.set(k, String(v)), getAttribute: (k) => attrs.get(k) || null };
const body = { appendChild: (node) => { if (node.id) ids.set(node.id, node); } };
const document = {
  documentElement: root,
  body,
  getElementById: (id) => ids.get(id) || null,
  createElement: (tag) => ({ tagName: tag.toUpperCase(), style: {}, id: '', textContent: '' })
};
vm.runInNewContext(url.slice('javascript:'.length), { parent: { document } });
if (root.getAttribute('data-netlify-create-asset-source-xss') !== 'confirmed') throw new Error('parent marker missing');
if (!ids.has('netlify-create-asset-source-xss-proof')) throw new Error('visible marker missing');
console.log(JSON.stringify({ proof: 'asset-source-url', marker: 'confirmed', isolated: true }));
