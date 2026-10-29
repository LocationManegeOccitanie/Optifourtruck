import { useEffect, useRef } from 'react'
import { motion, useReducedMotion, useMotionValue, animate, useScroll, useSpring, useTransform, useVelocity } from 'motion/react'
import { Link } from 'react-router'
import { img, byIndex } from '../data/photos'
import { Icon, Magnetic } from '../lib'

// La vitrine de la remorque : quelques vraies créations d'Alicia posées sur l'étagère, avec leur étiquette
const vitrine = [
  { i: 0, label: 'Wedding cake' },
  { i: 16, label: 'Gâteau aux roses' },
  { i: 25, label: 'Letter cake' },
  { i: 36, label: 'Tarte aux fraises' },
  { i: 58, label: 'Tartelettes de saison' },
  { i: 9, label: 'Pièce montée' },
  { i: 44, label: 'Tarte aux fruits rouges' },
  { i: 50, label: 'Bûche de Noël' },
  { i: 30, label: 'Entremets' },
  { i: 21, label: 'Number cake' },
]

// Ressort critique (sans rebond) pour tout ce qui apparaît : principe « apple-design »
const settle = { type: 'spring', bounce: 0, duration: 0.6 }
// Pendule de l'étiquette : ressort peu amorti, lancé avec une vitesse depuis sa position actuelle (interruptible)
const pendulum = { type: 'spring', stiffness: 140, damping: 5 }

function Item({ it, k, ready, sway }) {
  const reduce = useReducedMotion()
  const swing = useMotionValue(0)
  // inclinaison = balancement propre + élan donné par le défilement de la vitrine
  const rotate = useTransform(() => swing.get() + sway.get())
  const push = (v) => { if (!reduce) animate(swing, 0, { ...pendulum, velocity: v }) }

  // L'étiquette se balance une fois quand la création est posée sur l'étagère
  useEffect(() => {
    if (!ready) return
    if (k > 5) return
    const t = setTimeout(() => push(k % 2 ? 160 : -160), (1.2 + k * 0.12) * 1000)
    return () => clearTimeout(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready])

  return (
    <motion.li
      className="vitrine__item"
      initial={{ y: -36, opacity: 0 }}
      animate={ready ? { y: 0, opacity: 1 } : {}}
      transition={{ ...settle, delay: 1.0 + Math.min(k, 6) * 0.1 }}
      whileHover="hover"
      onPointerEnter={(e) => push(e.movementX >= 0 ? 220 : -220)}
    >
      <Link to="/galerie/" className="vitrine__link" data-cursor="Voir">
        <motion.span className="vitrine__cake" variants={{ hover: { y: -8 } }} transition={{ type: 'spring', bounce: 0, duration: 0.35 }}>
          <img src={img(byIndex(it.i), 520)} alt={it.label} width="260" height="320" decoding="async"
            loading={k < 6 ? 'eager' : 'lazy'} fetchPriority={k < 3 ? 'high' : 'auto'} />
        </motion.span>
        <motion.span className="vitrine__tag" style={{ rotate, originX: 0.5, originY: 0 }}>
          {it.label}
        </motion.span>
      </Link>
    </motion.li>
  )
}

export default function Hero({ ready }) {
  const reduce = useReducedMotion()
  const section = useRef(null)
  const viewport = useRef(null)
  const track = useRef(null)
  const max = useRef(0)

  // Distance que la vitrine peut parcourir (largeur des créations - largeur visible)
  useEffect(() => {
    const measure = () => {
      if (track.current && viewport.current) max.current = Math.max(0, track.current.scrollWidth - viewport.current.clientWidth)
    }
    measure()
    const ro = new ResizeObserver(measure)
    if (track.current) ro.observe(track.current)
    if (viewport.current) ro.observe(viewport.current)
    return () => ro.disconnect()
  }, [])

  // Défilement lié au scroll : la vitrine glisse vers la gauche à mesure que l'on descend
  // (mouvement piloté par l'utilisateur, pas de boucle automatique), lissé par un ressort sans rebond
  // départ : bas de la vitrine aligné sur le bas de l'écran (vitrine entièrement visible) ; fin : elle quitte l'écran par le haut
  const { scrollYProgress } = useScroll({ target: viewport, offset: ['end end', 'end start'] })
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.6 })
  const x = useTransform(progress, (p) => (reduce ? 0 : -Math.min(1, p * 1.25) * max.current))
  // l'élan du défilement fait pencher les étiquettes dans le sens du mouvement
  const sway = useSpring(useTransform(useVelocity(x), [-1500, 0, 1500], [-9, 0, 9]), { stiffness: 200, damping: 18 })

  return (
    <section id="top" className="truck" aria-labelledby="hero-title" ref={section}>
      {/* Store de la remorque : se déroule au chargement */}
      <motion.div
        className="awning"
        aria-hidden="true"
        initial={{ scaleY: 0 }}
        animate={ready ? { scaleY: 1 } : {}}
        transition={{ type: 'spring', bounce: 0, duration: 0.7, delay: 0.1 }}
      />

      <div className="truck__front">
        <h1 id="hero-title" className="truck__sign">
          <motion.span
            className="truck__name"
            initial={{ opacity: 0, scale: 1.06, rotate: -3 }}
            animate={ready ? { opacity: 1, scale: 1, rotate: -2 } : {}}
            transition={{ ...settle, delay: 0.4 }}
          >
            O P’tit Four <span>Truck</span>
          </motion.span>
          <span className="sr-only">, </span>
          <motion.span
            className="truck__trade"
            initial={{ opacity: 0, y: 10 }}
            animate={ready ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.75 }}
          >
            Pâtisserie <i aria-hidden="true">•</i> traiteur <i aria-hidden="true">•</i> brunch, faits main à Saverdun
          </motion.span>
        </h1>

        <motion.div
          className="truck__intro"
          initial={{ opacity: 0, y: 14 }}
          animate={ready ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.9 }}
        >
          <p>
            Wedding cakes, number cakes, buffets et brunchs préparés par Alicia avec des produits frais d’Ariège.
            Sa remorque gourmande s’installe sur vos mariages, anniversaires et événements d’entreprise.
          </p>
          <div className="truck__ctas">
            <Magnetic>
              <Link to="/devis/" className="btn">Demander un devis <Icon name="arrow" size={18} /></Link>
            </Magnetic>
            <Link to="/galerie/" className="link-underline">Voir toutes les créations</Link>
          </div>
        </motion.div>

        {/* La vitrine */}
        <div className="vitrine">
          <div className={`vitrine__viewport ${reduce ? 'is-static' : ''}`} ref={viewport}>
            <motion.ul className="vitrine__shelf" aria-label="Quelques créations d’Alicia" ref={track} style={{ x }}>
              {vitrine.map((it, k) => <Item key={it.i} it={it} k={k} ready={ready} sway={sway} />)}
            </motion.ul>
          </div>
          <div className="vitrine__board" aria-hidden="true" />
        </div>
      </div>
    </section>
  )
}
