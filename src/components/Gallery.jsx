import { useEffect, useMemo, useState, useCallback } from 'react'
import { motion, AnimatePresence, LayoutGroup } from 'motion/react'
import { photos, img } from '../data/photos'
import { filters } from '../data/content'
import { Link } from 'react-router'
import { SplitWords, Icon } from '../lib'

const labels = Object.fromEntries(filters.map((f) => [f.id, f.label]))
const STEP = 16

export default function Gallery({ cats, limit, eyebrow = 'Galerie gourmande', title = 'Laissez-vous _séduire', showFilters = true, moreLink }) {
  const [filter, setFilter] = useState('all')
  const [shown, setShown] = useState(limit ?? STEP)
  const [open, setOpen] = useState(null)

  const list = useMemo(
    () => photos.filter((p) => p.cat !== 'logo' && (!cats || cats.includes(p.cat)) && (filter === 'all' || p.cat === filter)),
    [filter, cats],
  )
  const visible = list.slice(0, shown)

  const move = useCallback((d) => {
    setOpen((cur) => {
      const k = list.findIndex((p) => p.i === cur)
      return list[(k + d + list.length) % list.length].i
    })
  }, [list])

  useEffect(() => {
    if (open === null) return
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(null)
      if (e.key === 'ArrowRight') move(1)
      if (e.key === 'ArrowLeft') move(-1)
    }
    window.__lenis?.stop()
    window.addEventListener('keydown', onKey)
    return () => { window.removeEventListener('keydown', onKey); window.__lenis?.start() }
  }, [open, move])

  const current = photos.find((p) => p.i === open)

  return (
    <section id="galerie" className="gallery section" aria-label="Galerie de créations">
      <div className="section__head section__head--row">
        <div>
          <p className="eyebrow">{eyebrow}</p>
          <SplitWords as="h2" className="h2" text={title} />
        </div>
        {showFilters && <LayoutGroup id="filters">
          <div className="chips" role="group" aria-label="Filtrer les créations">
            {filters.map((f) => (
              <button
                key={f.id}
                className={`chip ${filter === f.id ? 'is-active' : ''}`}
                aria-pressed={filter === f.id}
                onClick={() => { setFilter(f.id); setShown(limit ?? STEP) }}
              >
                {filter === f.id && <motion.span layoutId="chip-bg" className="chip__bg" transition={{ type: 'spring', stiffness: 400, damping: 32 }} />}
                <span className="chip__label">{f.label}</span>
              </button>
            ))}
          </div>
        </LayoutGroup>}
      </div>

      <motion.ul className="masonry" layout>
        <AnimatePresence mode="popLayout">
          {visible.map((p, k) => (
            <motion.li
              key={p.i}
              layout
              className={`tile ${p.ratio < 0.8 ? 'tile--tall' : ''} ${p.ratio > 1.5 ? 'tile--wide' : ''}`}
              initial={{ opacity: 0, scale: 0.85, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.85 }}
              transition={{ duration: 0.55, delay: (k % STEP) * 0.03 }}
            >
              <button className="tile__btn" onClick={() => setOpen(p.i)} data-cursor="Voir" aria-label={`Agrandir : ${labels[p.cat]}`}>
                <motion.img layoutId={`photo-${p.i}`} src={img(p, 700)} alt={`Création O P'tit Four Truck — ${labels[p.cat]}`} loading="lazy" />
                <span className="tile__tag">{labels[p.cat]}</span>
              </button>
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>

      {moreLink && (
        <div className="gallery__more">
          <Link to={moreLink} className="btn btn--ghost">Voir toute la galerie <Icon name="arrow" size={18} /></Link>
        </div>
      )}

      {!moreLink && shown < list.length && (
        <div className="gallery__more">
          <button className="btn btn--ghost" onClick={() => setShown((s) => s + STEP)}>
            Voir plus de créations <span className="tabular">({list.length - shown})</span>
          </button>
        </div>
      )}

      <AnimatePresence>
        {current && (
          <motion.div
            className="lightbox"
            role="dialog"
            aria-modal="true"
            aria-label="Photo agrandie"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setOpen(null)}
          >
            <motion.img
              layoutId={`photo-${current.i}`}
              src={img(current, 1600)}
              alt={`Création O P'tit Four Truck — ${labels[current.cat]}`}
              onClick={(e) => e.stopPropagation()}
              transition={{ type: 'spring', stiffness: 220, damping: 28 }}
            />
            <button className="lightbox__close" onClick={() => setOpen(null)} aria-label="Fermer"><Icon name="close" /></button>
            <button className="lightbox__nav lightbox__nav--prev" onClick={(e) => { e.stopPropagation(); move(-1) }} aria-label="Photo précédente"><Icon name="arrow" /></button>
            <button className="lightbox__nav lightbox__nav--next" onClick={(e) => { e.stopPropagation(); move(1) }} aria-label="Photo suivante"><Icon name="arrow" /></button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
