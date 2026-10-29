import { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'motion/react'
import { services } from '../data/content'
import { img, byIndex } from '../data/photos'
import { Link } from 'react-router'
import { SplitWords, Icon } from '../lib'

// Section épinglée : le défilement vertical fait glisser les prestations horizontalement (desktop)
export default function Services({ heading = 'h2' }) {
  const H = heading
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const p = useSpring(scrollYProgress, { stiffness: 90, damping: 25 })
  const x = useTransform(p, [0, 1], ['0%', `-${(services.length) * 100 / (services.length + 1)}%`])
  const bar = useTransform(p, [0, 1], [0, 1])

  // Clavier : amener le panneau qui reçoit le focus à l'écran (sinon le focus serait invisible)
  const showPanel = (k) => {
    const el = ref.current
    if (!el || window.innerWidth <= 900) return
    const top = el.getBoundingClientRect().top + window.scrollY
    const y = top + (k / services.length) * (el.offsetHeight - window.innerHeight)
    if (window.__lenis) window.__lenis.scrollTo(y, { immediate: true })
    else window.scrollTo(0, y)
  }

  return (
    <section id="prestations" className="services" ref={ref} style={{ '--n': services.length + 1 }}>
      <div className="services__sticky">
        <motion.div className="services__track" style={{ x }}>
          <div className="services__intro">
            <p className="eyebrow">Nos prestations</p>
            <SplitWords as={H} className="h2" text="Des créations pour _chaque occasion" />
            <p className="lead">Particuliers ou professionnels : des prestations sur-mesure, livrées sur votre lieu de réception, pour transformer vos événements en moments d'exception.</p>
            <span className="services__hint"><Icon name="arrow" size={18} /> Faites défiler</span>
          </div>
          {services.map((s, i) => (
            <article key={s.title} className={`service service--${s.tone}`} onFocus={() => showPanel(i + 1)}>
              <div className="service__img">
                <img src={img(byIndex(s.photo), 900)} alt={s.title} loading="lazy" />
                <span className="service__num">0{i + 1}</span>
              </div>
              <div className="service__body">
                <p className="service__kicker">{s.kicker}</p>
                <h3><Link to={`/prestations/${s.slug}/`}>{s.title}</Link></h3>
                <p>{s.text}</p>
                <ul>
                  {s.items.map((it) => <li key={it}><Icon name="check" size={16} /> {it}</li>)}
                </ul>
                <div className="service__links">
                  <Link to={`/prestations/${s.slug}/`} className="btn btn--small">Découvrir</Link>
                  <Link to={`/devis/?occasion=${s.occasion}`} className="link-underline">Demander un devis</Link>
                </div>
              </div>
            </article>
          ))}
        </motion.div>
        <div className="services__bar" aria-hidden="true"><motion.span style={{ scaleX: bar }} /></div>
      </div>
    </section>
  )
}
