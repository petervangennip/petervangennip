# petervangennip — digitaal cv

Nuxt 4, statisch gegenereerd, NL (`/`) en EN (`/en`).

## Commando's

```bash
npm install
npm run dev        # http://localhost:3000
npm run generate   # statische output in .output/public
```

## Content aanpassen

Alle cv-inhoud staat in [`app/data/cv.js`](../app/data/cv.js). Vertaalbare velden zijn `{ nl, en }`-objecten;
datums (`{ y, m? }`) en namen worden gedeeld, zodat beide talen nooit uit elkaar lopen. De tijdlijn wordt
automatisch uit deze datums opgebouwd. UI-teksten staan in `i18n/locales/`.

## Configuratie

- `NUXT_PUBLIC_SITE_URL` — productie-URL voor canonical, hreflang en JSON-LD (default `https://www.petervangennip.com`).

## Deploy

Netlify / Cloudflare Pages: build command `npm run generate`, publish directory `.output/public`.
