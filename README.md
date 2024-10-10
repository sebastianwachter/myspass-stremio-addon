# myspass-stremio-addon

MySpass streaming addon for stremio.

Currently only the series "Stromberg" is supported.

They recently updated their website to feature a more modern approach to streaming using `.m3u8` files and also included the 1080p versions of their series.

## How to add addon to stremio

1. Open strem.io
2. In the addons menu paste `https://myspass-stremio-addon.vercel.app/manifest.json` into the search bar
3. A popup should appear asking whether to install the addon - press the `Install` button
4. Done

## How to run locally

```bash
npm i
npm start
```

## Run development server

```bash
npm i 
npm run dev
```
