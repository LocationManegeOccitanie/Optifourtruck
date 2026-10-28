import { useState } from 'react'
import { Link } from 'react-router'
import { motion } from 'motion/react'
import { img, byIndex } from '../data/photos'
import { SplitWords, Icon, Magnetic, Reveal } from '../lib'

// En-tête des pages intérieures : fil d'Ariane + titre H1 + photo
export function PageHeader({ eyebrow, title, lead, photo, crumbs = [] }) {
  return (
    <header className="phead">
      <div className="phead__text">
        <nav aria-label="Fil d’Ariane" className="crumbs">
          <ol>
            <li><Link to="/">Accueil</Link></li>
            {crumbs.map(([label, to]) => (
              <li key={label}>{to ? <Link to={to}>{label}</Link> : <span aria-current="page">{label}</span>}</li>
            ))}
          </ol>
        </nav>
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <SplitWords as="h1" className="phead__title" text={title} animate />
        {lead && <Reveal as="p" className="lead" delay={0.3}>{lead}</Reveal>}
      </div>
      {photo !== undefined && (
        <motion.div className="phead__img" initial={{ clipPath: 'inset(0 0 100% 0 round 24px)' }} animate={{ clipPath: 'inset(0 0 0% 0 round 24px)' }} transition={{ duration: 1.1, ease: [0.76, 0, 0.24, 1], delay: 0.15 }}>
          <motion.img src={img(byIndex(photo), 1100)} alt="" fetchPriority="high" initial={{ scale: 1.25 }} animate={{ scale: 1 }} transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }} />
        </motion.div>
      )}
    </header>
  )
}

// Bandeau d'appel à l'action vers le devis
export function CtaBand({ title = 'Un projet, une date, une envie ?', occasion }) {
  const to = occasion ? `/devis/?occasion=${occasion}` : '/devis/'
  return (
    <section className="ctaband" aria-label="Demander un devis">
      <div className="ctaband__inner">
        <SplitWords as="h2" className="h2 h2--light" text={title} />
        <Reveal className="ctaband__side">
          <p>Décrivez votre événement en 2 minutes : Alicia vous répond sous 48 h, gratuitement et sans engagement.</p>
          <Magnetic>
            <Link to={to} className="btn btn--cream">Demander un devis <Icon name="arrow" size={18} /></Link>
          </Magnetic>
        </Reveal>
      </div>
    </section>
  )
}

// Questions fréquentes en accordéon (balisage FAQPage ajouté dans le <head>)
export function Faq({ items, title = 'Questions fréquentes' }) {
  const [open, setOpen] = useState(0)
  return (
    <section className="faq section" aria-labelledby="faq-title">
      <div className="faq__grid">
        <div>
          <p className="eyebrow">FAQ</p>
          <h2 id="faq-title" className="h2">{title}</h2>
        </div>
        <ul className="faq__list">
          {items.map(([q, a], i) => (
            <li key={q} className={open === i ? 'is-open' : ''}>
              <h3>
                <button type="button" aria-expanded={open === i} aria-controls={`faq-${i}`} id={`faq-q-${i}`} onClick={() => setOpen(open === i ? -1 : i)}>
                  {q}
                  <span className="faq__icon" aria-hidden="true" />
                </button>
              </h3>
              {/* la réponse reste dans le HTML (lisible par les moteurs) même repliée */}
              <motion.div id={`faq-${i}`} role="region" aria-labelledby={`faq-q-${i}`} className="faq__a"
                initial={false} animate={{ height: open === i ? 'auto' : 0, opacity: open === i ? 1 : 0 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }} inert={open !== i ? true : undefined}>
                <p>{a}</p>
              </motion.div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
