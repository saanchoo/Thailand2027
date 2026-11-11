# Lost in Thailand · 2027

Open `dist/index.html` directly in a browser (single self-contained file; photos load from Wikimedia Commons, so an internet connection is needed).

Develop: `npm install` → `npm run dev`. Build: `npm run build`.
Stack: React + Vite + Tailwind v4 + Motion + Lucide. Map paths are pre-generated from Natural Earth (`world-atlas`) via `npm run geo` into `src/geo.json`.
Trip data, prices and photos live in `src/data.js`. All prices are estimates (EUR, for two) unless marked "Provided".
