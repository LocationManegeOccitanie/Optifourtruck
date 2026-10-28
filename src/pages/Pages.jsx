import { Link, useParams } from 'react-router'
import { PageHeader, CtaBand, Faq } from '../components/Blocks'
import Story from '../components/Story'
import Values from '../components/Values'
import Process from '../components/Process'
import Services from '../components/Services'
import Gallery from '../components/Gallery'
import Wall from '../components/Wall'
import Reviews, { Card } from '../components/Reviews'
import Contact from '../components/Contact'
import { reviews, services, contact } from '../data/content'
import { servicePages, generalFaq } from '../data/seo'
import { img, byIndex } from '../data/photos'
import { Reveal, Icon } from '../lib'

export function SavoirFaire() {
  return (
    <>
      <PageHeader crumbs={[['Savoir-faire']]} eyebrow="Notre savoir-faire" photo={9}
        title="Une pâtisserie _faite _avec _intention"
        lead="Des produits frais, locaux et de saison, travaillés à la main à Saverdun, sans additifs ni conservateurs. Découvrez l’histoire d’Alicia et sa façon de travailler." />
      <Story />
      <Values />
      <Process />
      <CtaBand title="Envie de goûter son _savoir-faire ?" />
    </>
  )
}

export function Prestations() {
  return (
    <>
      <PageHeader crumbs={[['Prestations']]} eyebrow="Nos prestations" photo={0}
        title="Mariages, anniversaires & _événements"
        lead="Wedding cakes, gâteaux d’anniversaire, cake design, buffets et traiteur événementiel : des créations sur-mesure pour les particuliers et les professionnels d’Ariège et de Haute-Garonne." />
      <Services heading="h2" />
      <Faq items={generalFaq} />
      <CtaBand />
    </>
  )
}

export function ServicePage() {
  const { slug } = useParams()
  const sp = servicePages[slug]
  const s = services.find((x) => x.slug === slug)
  if (!sp || !s) return <NotFound />
  const others = services.filter((x) => x.slug !== slug)
  return (
    <>
      <PageHeader crumbs={[['Prestations', '/prestations/'], [s.title]]} eyebrow={s.kicker} photo={s.photo} title={sp.h1} lead={sp.lead} />
      <section className="svcpage section">
        <div className="svcpage__grid">
          {sp.sections.map((sec, i) => (
            <Reveal key={sec.title} className="svcpage__block" delay={i * 0.08}>
              <span className="svcpage__n">0{i + 1}</span>
              <h2>{sec.title}</h2>
              <p>{sec.text}</p>
            </Reveal>
          ))}
        </div>
        <Reveal className="svcpage__incl">
          <h2>Ce que comprend la prestation</h2>
          <ul>{s.items.map((it) => <li key={it}><Icon name="check" size={18} /> {it}</li>)}</ul>
          <Link to={`/devis/?occasion=${s.occasion}`} className="btn">Demander un devis <Icon name="arrow" size={18} /></Link>
        </Reveal>
      </section>
      <Gallery cats={sp.cats} limit={12} showFilters={false} eyebrow="En images" title="Quelques _réalisations" moreLink="/galerie/" />
      <Faq items={sp.faq} />
      <section className="related section" aria-labelledby="related-title">
        <h2 id="related-title" className="h2">Autres _prestations</h2>
        <div className="related__grid">
          {others.map((o) => (
            <Link key={o.slug} to={`/prestations/${o.slug}/`} className="related__card" data-cursor="Voir">
              <img src={img(byIndex(o.photo), 800)} alt="" loading="lazy" />
              <span><small>{o.kicker}</small>{o.title}</span>
            </Link>
          ))}
        </div>
      </section>
      <CtaBand occasion={s.occasion} title="Parlons de votre _projet" />
    </>
  )
}

export function Galerie() {
  return (
    <>
      <PageHeader crumbs={[['Galerie']]} eyebrow="Galerie gourmande"
        title="Plus de 60 créations _faites _main"
        lead="Pièces montées, number cakes, cake design, tartes de saison, entremets et bûches : filtrez par catégorie et cliquez sur une photo pour l’agrandir." />
      <Gallery eyebrow="Toutes les créations" title="Laissez-vous _séduire" />
      <Wall />
      <CtaBand title="Un coup de cœur ? _Parlons-en" />
    </>
  )
}

export function Avis() {
  return (
    <>
      <PageHeader crumbs={[['Avis']]} eyebrow="Avis clients"
        title="Ce qu’ils _en _disent"
        lead="Mariages, anniversaires, soirées tapas ou événements d’entreprise : les retours sincères de ceux qui ont fait confiance à Alicia." />
      <section className="section">
        <ul className="reviews__grid">
          {reviews.map((r, i) => <Reveal as="li" key={r.a} delay={(i % 3) * 0.08}><Card r={r} /></Reveal>)}
        </ul>
        <Reveal className="gbp">
          <div>
            <strong className="gbp__score">{contact.rating.value}<small>/5</small></strong>
            <span className="gbp__stars" aria-hidden="true">{[0, 1, 2, 3, 4].map((k) => <Icon key={k} name="star" size={18} />)}</span>
            <span>{contact.rating.count} avis sur Google</span>
          </div>
          <p>Vous avez goûté une création d’Alicia ? Votre avis l’aide énormément à se faire connaître.</p>
          <div className="gbp__btns">
            <a className="btn" href={contact.google} target="_blank" rel="noreferrer">Laisser un avis Google <Icon name="arrow" size={18} /></a>
            <a className="link-underline" href={contact.google} target="_blank" rel="noreferrer">Lire tous les avis</a>
          </div>
        </Reveal>
      </section>
      <Reviews />
      <CtaBand title="À votre tour de _vous _régaler" />
    </>
  )
}

export function Devis() {
  return (
    <>
      <PageHeader crumbs={[['Devis']]} eyebrow="Devis gratuit"
        title="Demandez votre _devis _sur-mesure"
        lead="Quelques questions sur votre événement, deux minutes à peine : Alicia vous répond avec une proposition personnalisée sous 48 h, sans engagement." />
      <Contact />
    </>
  )
}

export function NotFound() {
  return (
    <section className="notfound section">
      <p className="eyebrow">Erreur 404</p>
      <h1 className="phead__title">Oups, cette page <em>s’est envolée</em></h1>
      <p className="lead">Comme le dernier petit four du buffet. Mais il reste plein de douceurs à découvrir :</p>
      <div className="notfound__links">
        <Link to="/" className="btn">Retour à l’accueil</Link>
        <Link to="/galerie/" className="link-underline">Voir la galerie</Link>
        <Link to="/devis/" className="link-underline">Demander un devis</Link>
      </div>
    </section>
  )
}
