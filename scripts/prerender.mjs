// Génère un vrai fichier HTML par page (titre, description, données structurées et contenu inclus),
// plus 404.html, sitemap.xml et robots.txt. Lancé par `npm run build`.
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const dist = path.join(root, 'dist')
const SITE = 'https://optifourtruck.fr'

const template = fs.readFileSync(path.join(dist, 'index.html'), 'utf8')
const { render, routes } = await import(pathToFileURL(path.join(root, 'dist-ssr', 'entry-server.js')).href)

const page = (url) => {
  const { html, head } = render(url)
  return template.replace('<!--app-head-->', head).replace('<!--app-html-->', html)
}

for (const url of routes) {
  const file = path.join(dist, url, 'index.html')
  fs.mkdirSync(path.dirname(file), { recursive: true })
  fs.writeFileSync(file, page(url))
  console.log('  ✓', url)
}
fs.writeFileSync(path.join(dist, '404.html'), page('/404/'))
console.log('  ✓ 404.html')

const today = new Date().toISOString().slice(0, 10)
const priority = (u) => (u === '/' ? '1.0' : u.split('/').length > 3 ? '0.9' : u === '/devis/' ? '0.8' : '0.7')
fs.writeFileSync(path.join(dist, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${routes
    .map((u) => `  <url><loc>${SITE}${u}</loc><lastmod>${today}</lastmod><priority>${priority(u)}</priority></url>`)
    .join('\n')}\n</urlset>\n`)
fs.writeFileSync(path.join(dist, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${SITE}/sitemap.xml\n`)
console.log('  ✓ sitemap.xml, robots.txt')

fs.rmSync(path.join(root, 'dist-ssr'), { recursive: true, force: true })
