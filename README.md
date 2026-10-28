# O P'tit Four Truck — site web

Site vitrine d'Alicia, pâtissière-traiteur artisanale à Saverdun (Ariège) : https://optifourtruck.fr

## Technique

- React 19 + Vite, animations avec Motion (ex-Framer Motion), défilement fluide avec Lenis
- React Router, avec **pré-rendu HTML de chaque page** au build (`scripts/prerender.mjs`) pour le référencement :
  titre, description, aperçus de partage et données structurées schema.org par page, `sitemap.xml`, `robots.txt`, `404.html`
- Formulaire de devis relié à Supabase (table `quote_requests`) et à la fonction `send-quote-notification`
  (e-mail à contact@optifourtruck.fr via Resend) — voir le dossier `supabase/`

## Développement

```bash
npm install
cp .env.example .env.local   # puis renseigner la clé publique Supabase
npm run dev
```

## Publication

Chaque push sur `main` publie automatiquement le site sur GitHub Pages (`.github/workflows/deploy.yml`).
Les variables `VITE_SUPABASE_URL` et `VITE_SUPABASE_PUBLISHABLE_KEY` doivent exister dans
*Settings → Secrets and variables → Actions*.

## Contenus

- Textes et coordonnées : `src/data/content.js`
- Pages prestations, FAQ et référencement : `src/data/seo.js`
- Photos : `src/data/photos.js`
