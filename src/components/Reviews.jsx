import { reviews, contact } from '../data/content'
import { SplitWords, Icon } from '../lib'

export function Card({ r }) {
  return (
    <figure className="review">
      <div className="review__stars" aria-label="5 étoiles sur 5">
        {[0, 1, 2, 3, 4].map((k) => <Icon key={k} name="star" size={16} />)}
      </div>
      <blockquote>« {r.q} »</blockquote>
      <figcaption>
        <span className="review__avatar" aria-hidden="true">{r.a.split(' ').map((w) => w[0]).join('')}</span>
        {r.a}
      </figcaption>
    </figure>
  )
}

export default function Reviews({ heading = 'h2' }) {
  const a = reviews.slice(0, 5)
  const b = reviews.slice(5)
  return (
    <section id="avis" className="reviews section">
      <div className="section__head section__head--center">
        <p className="eyebrow">Ils en parlent</p>
        <SplitWords as={heading} className="h2" text="La confiance de _nos _clients" />
        <a className="reviews__score" href={contact.google} target="_blank" rel="noreferrer">
          <strong>{contact.rating.value}</strong> / 5 · {contact.rating.count} avis sur Google <Icon name="arrow" size={16} />
        </a>
      </div>
      {[a, b].map((row, k) => (
        <div className={`marquee ${k ? 'marquee--rev' : ''}`} key={k}>
          <div className="marquee__track">
            {[...row, ...row].map((r, i) => <Card key={i} r={r} />)}
          </div>
        </div>
      ))}
    </section>
  )
}
