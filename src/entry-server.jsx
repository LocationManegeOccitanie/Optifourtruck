import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router'
import App from './App.jsx'
import { headTags, routes } from './data/seo'

// Utilisé au build par scripts/prerender.mjs pour générer le HTML de chaque page
export function render(url) {
  const html = renderToString(
    <StrictMode>
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    </StrictMode>,
  )
  return { html, head: headTags(url) }
}

export { routes }
