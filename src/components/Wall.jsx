import { useEffect, useRef } from 'react'
import { useReducedMotion } from 'motion/react'
import { photos, img } from '../data/photos'
import { SplitWords } from '../lib'

const picks = photos.filter((p) => p.cat !== 'logo' && p.ratio === 1).slice(0, 40)
const RADIUS = 240
const PUSH = 70

// Mur de photos : un "vide" suit le curseur et écarte doucement les créations autour
export default function Wall() {
  const wrap = useRef(null)
  const tiles = useRef([])
  const reduce = useReducedMotion()

  useEffect(() => {
    if (reduce || !window.matchMedia('(hover: hover)').matches) return
    const el = wrap.current
    const target = { x: -9999, y: -9999 }
    const pos = { x: -9999, y: -9999 }
    let centers = []
    const measure = () => {
      const r = el.getBoundingClientRect()
      centers = tiles.current.map((t) => {
        const b = t.getBoundingClientRect()
        return { x: b.left - r.left + b.width / 2, y: b.top - r.top + b.height / 2 }
      })
    }
    measure()
    const onMove = (e) => {
      const r = el.getBoundingClientRect()
      target.x = e.clientX - r.left; target.y = e.clientY - r.top
      if (pos.x < -999) { pos.x = target.x; pos.y = target.y }
    }
    const onLeave = () => { target.x = target.y = pos.x = pos.y = -9999 }
    let id
    const tick = () => {
      if (pos.x > -999) { pos.x += (target.x - pos.x) * 0.12; pos.y += (target.y - pos.y) * 0.12 }
      tiles.current.forEach((t, k) => {
        const c = centers[k]
        if (!t || !c) return // page en cours de démontage
        const dx = c.x - pos.x, dy = c.y - pos.y
        const d = Math.hypot(dx, dy)
        const f = d < RADIUS ? (1 - d / RADIUS) ** 2 : 0
        const nx = d ? dx / d : 0, ny = d ? dy / d : 0
        t.style.transform = `translate(${nx * f * PUSH}px, ${ny * f * PUSH}px) scale(${1 - f * 0.25})`
        t.style.opacity = 1 - f * 0.5
      })
      id = requestAnimationFrame(tick)
    }
    id = requestAnimationFrame(tick)
    el.addEventListener('pointermove', onMove)
    el.addEventListener('pointerleave', onLeave)
    window.addEventListener('resize', measure)
    window.addEventListener('scroll', measure, { passive: true })
    return () => {
      cancelAnimationFrame(id)
      el.removeEventListener('pointermove', onMove)
      el.removeEventListener('pointerleave', onLeave)
      window.removeEventListener('resize', measure)
      window.removeEventListener('scroll', measure)
    }
  }, [reduce])

  return (
    <section className="wall" aria-labelledby="wall-title">
      <div className="wall__head">
        <p className="eyebrow">Le mur gourmand</p>
        <SplitWords as="h2" className="h2" text="Plus de 60 créations, _une _seule _passion" />
        <p className="lead">Passez la souris sur le mur : les douceurs s'écartent pour vous laisser regarder.</p>
      </div>
      <div className="wall__grid" ref={wrap} aria-hidden="true">
        {picks.map((p, k) => (
          <div key={p.i} className="wall__tile" ref={(n) => { tiles.current[k] = n }}>
            <img src={img(p, 320)} alt="" loading="lazy" />
          </div>
        ))}
      </div>
    </section>
  )
}
