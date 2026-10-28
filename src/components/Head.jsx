import { useEffect } from 'react'
import { useLocation } from 'react-router'
import { meta, jsonLd, pages } from '../data/seo'

const setMeta = (attr, key, value) => {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`)
  if (!el) { el = document.createElement('meta'); el.setAttribute(attr, key); document.head.appendChild(el) }
  el.setAttribute('content', value)
}

// Met à jour le <head> lors d'une navigation côté client (le HTML pré-rendu contient déjà les bonnes balises)
export default function Head() {
  const { pathname } = useLocation()
  useEffect(() => {
    const path = pathname.endsWith('/') ? pathname : `${pathname}/`
    const m = meta(pages[path] ? path : '__404')
    document.title = m.title
    setMeta('name', 'description', m.description)
    setMeta('property', 'og:title', m.title)
    setMeta('property', 'og:description', m.description)
    setMeta('property', 'og:url', m.canonical)
    setMeta('property', 'og:image', m.ogImage)
    let link = document.head.querySelector('link[rel="canonical"]')
    if (link && !m.noindex) link.href = m.canonical
    let ld = document.head.querySelector('script[type="application/ld+json"]')
    if (!m.noindex) {
      if (!ld) { ld = document.createElement('script'); ld.type = 'application/ld+json'; document.head.appendChild(ld) }
      ld.textContent = JSON.stringify(jsonLd(path))
    }
  }, [pathname])
  return null
}
