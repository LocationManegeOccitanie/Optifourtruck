import { contact } from '../data/content'
import { SplitWords, Icon, Reveal } from '../lib'
import QuoteForm from './QuoteForm'

export default function Contact() {
  return (
    <section id="devis" className="contact section">
      <div className="contact__inner">
        <div className="contact__head">
          <div>
            <p className="eyebrow">Prêt à vous régaler ?</p>
            <SplitWords as="h2" className="h2 h2--light" text="Créons ensemble votre _moment _parfait" />
          </div>
          <Reveal className="contact__aside">
            <p className="lead">Racontez votre projet en quelques clics : Alicia vous envoie une proposition personnalisée sous 48 h.</p>
            <ul className="contact__list">
              <li><a href={contact.phoneHref}><Icon name="phone" /> {contact.phone}</a></li>
              <li><a href={`mailto:${contact.email}`}><Icon name="mail" /> {contact.email}</a></li>
              <li><span><Icon name="pin" /> {contact.zone}</span></li>
            </ul>
          </Reveal>
        </div>
        <QuoteForm />
      </div>
    </section>
  )
}
