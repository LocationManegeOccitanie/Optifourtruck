import { motion } from 'motion/react'

export const ease = [0.22, 1, 0.36, 1]

export const scrollToId = (id) => {
  const el = document.getElementById(id)
  if (!el) return
  if (window.__lenis) window.__lenis.scrollTo(el, { offset: -70 })
  else el.scrollIntoView({ behavior: 'smooth' })
}

// Titre révélé mot par mot (chaque mot monte depuis un masque)
export function SplitWords({ text, as: Tag = 'span', className, delay = 0, stagger = 0.06, animate }) {
  const words = text.split(' ')
  const trigger = animate === undefined
    ? { initial: 'hidden', whileInView: 'show', viewport: { once: true, amount: 0.5 } }
    : { initial: 'hidden', animate: animate ? 'show' : 'hidden' }
  return (
    <Tag className={className} aria-label={text}>
      <motion.span
        style={{ display: 'inline' }}
        {...trigger}
        transition={{ staggerChildren: stagger, delayChildren: delay }}
        aria-hidden="true"
      >
        {words.map((w, i) => (
          <span key={i}>
            <span className="word-mask">
              <motion.span
                className={w.startsWith('_') ? 'word em' : 'word'}
                variants={{ hidden: { y: '110%', rotate: 6 }, show: { y: 0, rotate: 0 } }}
                transition={{ duration: 0.9, ease }}
              >
                {w.replace(/^_/, '')}
              </motion.span>
            </span>
            {i < words.length - 1 && ' '}
          </span>
        ))}
      </motion.span>
    </Tag>
  )
}

// Apparition douce à l'entrée dans l'écran
export function Reveal({ children, delay = 0, y = 40, className, as = 'div' }) {
  const M = motion[as]
  return (
    <M
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.9, delay, ease }}
    >
      {children}
    </M>
  )
}

const paths = {
  leaf: <><path d="M5 19c0-8 5-14 15-15-1 10-7 15-15 15z" /><path d="M5 19c3-4 6-7 10-9" /></>,
  whisk: <><path d="M14 10l7-7" /><path d="M14 10c-3-3-8-4-10-2s-1 7 2 10 8 4 10 2 1-7-2-10z" /><path d="M6.5 8.5c2 1 5 4 6 6" /></>,
  heart: <path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z" />,
  jar: <><path d="M8 3h8v3H8z" /><path d="M7 6h10l1 3v10a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V9z" /><path d="M6 12h12" /></>,
  arrow: <><path d="M5 12h14" /><path d="M13 6l6 6-6 6" /></>,
  phone: <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" />,
  mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 7l9 6 9-6" /></>,
  pin: <><path d="M12 21s7-6 7-12a7 7 0 0 0-14 0c0 6 7 12 7 12z" /><circle cx="12" cy="9" r="2.5" /></>,
  insta: <><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" /></>,
  fb: <path d="M14 8h3V4h-3a4 4 0 0 0-4 4v3H7v4h3v6h4v-6h3l1-4h-4V8z" />,
  close: <><path d="M6 6l12 12" /><path d="M18 6L6 18" /></>,
  check: <path d="M5 12l5 5 9-10" />,
  star: <path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z" />,
}

export function Icon({ name, size = 22, className }) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {paths[name]}
    </svg>
  )
}

// Bouton "magnétique" qui suit légèrement le pointeur
export function Magnetic({ children, strength = 0.35 }) {
  const onMove = (e) => {
    const el = e.currentTarget
    const r = el.getBoundingClientRect()
    const dx = (e.clientX - (r.left + r.width / 2)) * strength
    const dy = (e.clientY - (r.top + r.height / 2)) * strength
    el.style.transform = `translate(${dx}px, ${dy}px)`
  }
  const onLeave = (e) => { e.currentTarget.style.transform = '' }
  return <span className="magnetic" onPointerMove={onMove} onPointerLeave={onLeave}>{children}</span>
}
