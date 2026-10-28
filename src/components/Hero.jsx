import { useRef } from 'react'
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'motion/react'
import { img, byIndex } from '../data/photos'
import { Link } from 'react-router'
import { SplitWords, scrollToId, Magnetic, Icon, ease } from '../lib'

// Collage de photos flottantes : chaque carte a sa profondeur (parallaxe souris + défilement)
const cards = [
  { i: 14, cls: 'h-card--a', depth: 40, rot: -6 },
  { i: 16, cls: 'h-card--b', depth: -30, rot: 5 },
  { i: 36, cls: 'h-card--c', depth: 60, rot: 8 },
  { i: 58, cls: 'h-card--d', depth: -50, rot: -4 },
]

function Card({ c, mx, my, scroll, ready, k }) {
  const x = useTransform(mx, (v) => v * c.depth)
  const yMouse = useTransform(my, (v) => v * c.depth)
  const yScroll = useTransform(scroll, [0, 1], [0, c.depth * -6])
  const y = useTransform(() => yMouse.get() + yScroll.get())
  return (
    <motion.figure
      className={`h-card ${c.cls}`}
      style={{ x, y }}
      initial={{ opacity: 0, scale: 0.7, rotate: c.rot * 3 }}
      animate={ready ? { opacity: 1, scale: 1, rotate: c.rot } : {}}
      transition={{ type: 'spring', stiffness: 70, damping: 14, delay: 0.5 + k * 0.12 }}
      whileHover={{ scale: 1.06, rotate: 0, zIndex: 5 }}
    >
      <img src={img(byIndex(c.i), 700)} alt="" loading="eager" />
    </motion.figure>
  )
}

export default function Hero({ ready }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const mxRaw = useMotionValue(0)
  const myRaw = useMotionValue(0)
  const mx = useSpring(mxRaw, { stiffness: 60, damping: 20 })
  const my = useSpring(myRaw, { stiffness: 60, damping: 20 })
  const titleY = useTransform(scrollYProgress, [0, 1], ['0%', '35%'])
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect()
    mxRaw.set((e.clientX - r.left) / r.width - 0.5)
    myRaw.set((e.clientY - r.top) / r.height - 0.5)
  }

  return (
    <section id="top" className="hero" ref={ref} onPointerMove={onMove}>
      <div className="hero__blob hero__blob--rose" aria-hidden="true" />
      <div className="hero__blob hero__blob--sage" aria-hidden="true" />

      <motion.div className="hero__text" style={{ y: titleY, opacity: fade }}>
        <motion.p className="eyebrow" initial={{ opacity: 0, y: 20 }} animate={ready ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.2, duration: 0.8 }}>
          Pâtissière · Traiteur artisanal · Ariège
        </motion.p>
        <h1 className="hero__title">
          <SplitWords text="L'art de sublimer" animate={ready} delay={0.25} />
          <br />
          <SplitWords text="vos _moments _précieux" animate={ready} delay={0.5} />
        </h1>
        <motion.p className="hero__lead" initial={{ opacity: 0, y: 20 }} animate={ready ? { opacity: 1, y: 0 } : {}} transition={{ delay: 1, duration: 0.9, ease }}>
          Wedding cakes, cake design, brunchs et buffets sucrés-salés, imaginés et façonnés à la main par Alicia — avec des produits frais, locaux et de saison.
        </motion.p>
        <motion.div className="hero__ctas" initial={{ opacity: 0, y: 20 }} animate={ready ? { opacity: 1, y: 0 } : {}} transition={{ delay: 1.15, duration: 0.9, ease }}>
          <Magnetic>
            <Link to="/devis/" className="btn">
              Demander un devis <Icon name="arrow" size={18} />
            </Link>
          </Magnetic>
          <Link to="/galerie/" className="link-underline">
            Découvrir les créations
          </Link>
        </motion.div>
      </motion.div>

      <div className="hero__collage" aria-hidden="true">
        {cards.map((c, k) => <Card key={c.i} c={c} k={k} mx={mx} my={my} scroll={scrollYProgress} ready={ready} />)}
        <motion.div className="badge" initial={{ scale: 0 }} animate={ready ? { scale: 1 } : {}} transition={{ type: 'spring', delay: 1.2 }}>
          <svg viewBox="0 0 200 200" className="badge__ring">
            <defs><path id="circ" d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" /></defs>
            <text><textPath href="#circ" textLength="480" lengthAdjust="spacing">fait maison ✿ local ✿ de saison ✿ </textPath></text>
          </svg>
          <span className="badge__center">100%<small>artisanal</small></span>
        </motion.div>
      </div>

      <motion.button
        className="hero__scroll"
        onClick={() => scrollToId('histoire')}
        aria-label="Descendre vers la suite"
        initial={{ opacity: 0 }} animate={ready ? { opacity: 1 } : {}} transition={{ delay: 1.6 }}
      >
        <span /> Défiler
      </motion.button>
    </section>
  )
}
