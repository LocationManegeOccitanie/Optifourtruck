import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router'
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'motion/react'
import { nav, contact } from '../data/content'
import { img, logo } from '../data/photos'
import { Icon } from '../lib'

export default function Nav() {
  const { scrollY } = useScroll()
  const { pathname } = useLocation()
  const [hidden, setHidden] = useState(false)
  const [solid, setSolid] = useState(false)
  const [open, setOpen] = useState(false)

  useMotionValueEvent(scrollY, 'change', (v) => {
    const prev = scrollY.getPrevious() ?? 0
    setHidden(v > prev && v > 400 && !open)
    setSolid(v > 40)
  })

  // Ferme le menu mobile à chaque changement de page
  useEffect(() => { setOpen(false); setHidden(false) }, [pathname])

  return (
    <>
      <motion.header
        className={`nav ${solid && !open ? 'nav--solid' : ''} ${open ? 'nav--open' : ''}`}
        animate={{ y: hidden ? '-110%' : 0 }}
        transition={{ duration: 0.45 }}
      >
        <Link to="/" className="nav__brand" aria-label="O P'tit Four Truck — accueil">
          <img src={img(logo, 120)} alt="" width="44" height="44" />
          <span>O P'tit Four <em>Truck</em></span>
        </Link>
        <nav className="nav__links" aria-label="Navigation principale">
          {nav.map((l) => (
            <NavLink key={l.to} to={l.to} className={({ isActive }) => (isActive ? 'is-active' : '')}>
              <span data-text={l.label}>{l.label}</span>
            </NavLink>
          ))}
        </nav>
        <Link to="/devis/" className="btn btn--small nav__cta">Demander un devis</Link>
        <button className="nav__burger" aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'} aria-expanded={open} onClick={() => setOpen(!open)}>
          <span className={open ? 'is-open' : ''} />
        </button>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="menu"
            initial={{ clipPath: 'circle(0% at calc(100% - 40px) 36px)' }}
            animate={{ clipPath: 'circle(150% at calc(100% - 40px) 36px)' }}
            exit={{ clipPath: 'circle(0% at calc(100% - 40px) 36px)' }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          >
            <motion.ul initial="h" animate="s" variants={{ s: { transition: { staggerChildren: 0.07, delayChildren: 0.25 } } }}>
              {[{ to: '/', label: 'Accueil' }, ...nav, { to: '/devis/', label: 'Devis' }].map((l) => (
                <motion.li key={l.to} variants={{ h: { y: 60, opacity: 0 }, s: { y: 0, opacity: 1 } }}>
                  <Link to={l.to}>{l.label}</Link>
                </motion.li>
              ))}
            </motion.ul>
            <div className="menu__foot">
              <a href={contact.phoneHref}><Icon name="phone" size={18} /> {contact.phone}</a>
              <a href={contact.instagram} target="_blank" rel="noreferrer"><Icon name="insta" size={18} /> Instagram</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
