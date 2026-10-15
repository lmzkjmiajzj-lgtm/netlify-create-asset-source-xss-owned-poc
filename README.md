# Netlify Create asset-source URL XSS owned fixture

Separate harmless proof for the `assetSources[].url` -> iframe `src` path.
The `javascript:` payload modifies only the top-level Create DOM with a marker.

- Public host: https://create-asset-source-xss-poc-20261015.netlify.app
- Marker: `data-netlify-create-asset-source-xss="confirmed"`
- No cookies, tokens, account data, or network exfiltration are collected.

The public host alone is inert. Execution occurs only when this owned repository
is loaded as a Netlify Visual Editor project and the asset picker mounts.
