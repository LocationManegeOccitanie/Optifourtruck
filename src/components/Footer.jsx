import { useRef } from 'react'
import { Link } from 'react-router'
import { motion, useScroll, useTransform } from 'motion/react'
import { contact, nav, services, hours } from '../data/content'
import { Icon } from '../lib'

export default function Footer() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end end'] })
  const y = useTransform(scrollYProgress, [0, 1], ['40%', '0%'])
  const letter = useTransform(scrollYProgress, [0, 1], ['0.2em', '-0.02em'])

  return (
    <footer className="footer" ref={ref}>
      <div className="footer__top">
        <div className="footer__brand">
          <img src="/icon-192.png" alt="" width="84" height="84" loading="lazy" />
          <p>Pâtissière & traiteur artisanal à Saverdun.<br />Fait maison, avec des produits frais et locaux.</p>
        </div>
        <nav aria-label="Pages du site">
          <p className="footer__title">Le site</p>
          {[{ to: '/', label: 'Accueil' }, ...nav, { to: '/devis/', label: 'Demande de devis' }].map((l) => (
            <Link key={l.to} to={l.to}>{l.label}</Link>
          ))}
        </nav>
        <nav aria-label="Prestations">
          <p className="footer__title">Prestations</p>
          {services.map((s) => <Link key={s.slug} to={`/prestations/${s.slug}/`}>{s.title}</Link>)}
        </nav>
        <div className="footer__contact">
          <p className="footer__title">Contact</p>
          <a href={contact.phoneHref}>{contact.phone}</a>
          <a href={`mailto:${contact.email}`}>{contact.email}</a>
          <span>Saverdun (09700) · Ariège & Haute-Garonne</span>
          <dl className="footer__hours">
            {hours.map((h) => <div key={h.days}><dt>{h.days}</dt><dd>{h.label}</dd></div>)}
          </dl>
          <a href={contact.google} target="_blank" rel="noreferrer" className="footer__gbp">★ {contact.rating.value}/5 · {contact.rating.count} avis Google</a>
          <div className="footer__social">
            <a href={contact.instagram} target="_blank" rel="noreferrer" aria-label="Instagram"><Icon name="insta" /></a>
            <a href={contact.facebook} target="_blank" rel="noreferrer" aria-label="Facebook"><Icon name="fb" /></a>
          </div>
        </div>
      </div>
      <motion.p className="footer__giant" style={{ y, letterSpacing: letter }} aria-hidden="true">
        O P'tit Four <em>Truck</em>
      </motion.p>
      <div className="footer__bottom">
        <span>© {new Date().getFullYear()} O P'tit Four Truck — Alicia Catala</span>
        <span>{contact.zone}</span>
      </div>
    </footer>
  )
}
