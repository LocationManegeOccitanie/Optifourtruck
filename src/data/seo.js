import { contact, hours } from './content'
import { photos } from './photos'

export const SITE = {
  url: 'https://optifourtruck.fr',
  name: "O P'tit Four Truck",
  locale: 'fr_FR',
}

const ogImage = (i) => `${photos[i].src}=w1200-h630-c`

// Contenu éditorial des pages prestations (texte unique par page, pensé pour la recherche locale)
export const servicePages = {
  mariage: {
    cats: ['wedding'],
    h1: 'Wedding cake et pièce montée artisanale en Ariège',
    lead: 'Pour le plus beau jour de votre vie, Alicia imagine avec vous un gâteau de mariage unique : wedding cake, pièce montée, number cake ou buffet de desserts, entièrement fait maison à Saverdun et livré sur votre lieu de réception.',
    sections: [
      {
        title: 'Un gâteau qui vous ressemble',
        text: 'Thème champêtre, bohème ou élégant, fleurs fraîches ou en sucre, couleurs de votre décoration : chaque wedding cake est dessiné sur-mesure. Les saveurs se choisissent ensemble — fruits rouges, vanille, chocolat, praliné ou agrumes — pour un gâteau aussi bon que beau.',
      },
      {
        title: 'Du vin d’honneur au dessert',
        text: 'Mignardises, petits fours, verrines et buffet de desserts complètent la pièce maîtresse. Les ingrédients sont frais, locaux et de saison, sans additifs ni conservateurs, et les contenants réutilisables quand c’est possible.',
      },
      {
        title: 'Livraison en Ariège et en Haute-Garonne',
        text: 'Basée à Saverdun, Alicia livre les salles de réception et domaines de l’Ariège (09) et de la Haute-Garonne (31) — Pamiers, Mazères, Foix, Auterive, Toulouse et leurs alentours, selon la distance.',
      },
    ],
    faq: [
      ['Combien de temps à l’avance faut-il commander un wedding cake ?', 'Le plus tôt possible : les dates de mariage partent vite, surtout au printemps et en été. Faites votre demande dès que la date est fixée, Alicia vous répond sous 48 h.'],
      ['Peut-on goûter avant de choisir ?', 'Parlez-en lors de votre demande de devis : Alicia vous indiquera les possibilités selon votre projet.'],
      ['Livrez-vous sur le lieu du mariage ?', 'Oui, la livraison sur le lieu de réception est possible en Ariège, en Haute-Garonne et aux alentours.'],
      ['Proposez-vous des options sans gluten ou vegan ?', 'Oui, des adaptations sont possibles (sans gluten, vegan, sans lactose…). Précisez-les dans votre demande.'],
    ],
    meta: {
      title: 'Wedding cake & pièce montée en Ariège | O P’tit Four Truck',
      description: 'Wedding cakes, pièces montées et buffets de desserts faits maison pour votre mariage. Livraison Ariège et Haute-Garonne depuis Saverdun. Devis sous 48 h.',
    },
  },
  anniversaire: {
    cats: ['fete', 'lettres'],
    h1: 'Gâteau d’anniversaire personnalisé et cake design en Ariège',
    lead: 'Number cake, letter cake, gâteau à thème ou layer cake gourmand : Alicia transforme vos idées en gâteau d’anniversaire unique, fait maison avec des produits frais, pour les enfants comme pour les grands.',
    sections: [
      {
        title: 'Number cakes et letter cakes',
        text: 'Les chiffres et les lettres de votre choix, garnis de crème, de fruits frais, de macarons et de décorations selon vos couleurs. Idéal pour un anniversaire, un baptême ou une communion.',
      },
      {
        title: 'Gâteaux à thème',
        text: 'Personnage préféré, passion, univers enfantin ou élégant : chaque cake design est créé sur-mesure à partir de vos inspirations, avec des saveurs choisies ensemble.',
      },
      {
        title: 'Fait maison, près de chez vous',
        text: 'Réalisés à Saverdun sans additifs ni conservateurs, les gâteaux sont livrés en Ariège et en Haute-Garonne, ou à récupérer selon l’organisation convenue.',
      },
    ],
    faq: [
      ['Pour combien de personnes peut-on commander ?', 'De quelques parts à de grandes tablées : indiquez le nombre d’invités dans votre demande, Alicia adapte la taille et le format.'],
      ['Peut-on reproduire un gâteau vu en photo ?', 'Partagez vos inspirations : Alicia s’en sert comme point de départ pour créer un gâteau unique, à votre image.'],
      ['Quelles saveurs sont possibles ?', 'Chocolat, vanille, fruits rouges, caramel, pistache, praliné, agrumes… et des options sans gluten ou vegan sur demande.'],
    ],
    meta: {
      title: 'Gâteau d’anniversaire personnalisé & number cake | Ariège',
      description: 'Number cakes, letter cakes et gâteaux à thème faits maison par Alicia à Saverdun. Cake design sur-mesure, livraison Ariège & Haute-Garonne. Devis sous 48 h.',
    },
  },
  'evenements-professionnels': {
    cats: ['douceurs', 'tartes'],
    h1: 'Traiteur pâtissier pour vos événements professionnels',
    lead: 'Séminaire, inauguration, cocktail, pause gourmande ou cadeau d’entreprise : des créations pâtissières et des buffets sucrés-salés faits maison, livrés clé en main en Ariège et en Haute-Garonne.',
    sections: [
      {
        title: 'Pauses gourmandes et brunchs',
        text: 'Viennoiseries, mignardises, tartes de saison et douceurs à partager pour rythmer vos journées de travail et vos réunions.',
      },
      {
        title: 'Cocktails et buffets',
        text: 'Mignardises sucrées, bouchées salées et verrines pour vos inaugurations, soirées clients et célébrations d’équipe, adaptées au nombre de convives.',
      },
      {
        title: 'Une prestation clé en main',
        text: 'Proposition sur-mesure selon votre budget, livraison soignée sur votre lieu d’événement et, si souhaité, service sur place. Devis rapide sous 48 h.',
      },
    ],
    faq: [
      ['Travaillez-vous avec les entreprises et collectivités ?', 'Oui : séminaires, inaugurations, cocktails, pauses gourmandes et cadeaux d’entreprise font partie des prestations.'],
      ['Pouvez-vous gérer de grands effectifs ?', 'Indiquez le nombre de participants dans votre demande : la proposition est construite en fonction.'],
      ['Où livrez-vous ?', 'En Ariège, en Haute-Garonne et aux alentours, directement sur votre lieu d’événement.'],
    ],
    meta: {
      title: 'Traiteur pâtissier pour entreprises | Ariège & Toulouse',
      description: 'Buffets sucrés-salés, mignardises de cocktail, pauses gourmandes et brunchs faits maison pour vos événements professionnels. Livraison Ariège & Haute-Garonne.',
    },
  },
}

export const generalFaq = [
  ['Où se trouve O P’tit Four Truck ?', 'Alicia est basée à Saverdun, en Ariège (09), et intervient en Ariège, en Haute-Garonne (31) et aux alentours.'],
  ['Comment obtenir un devis ?', 'Remplissez le formulaire de devis en ligne (2 minutes) ou appelez le 06 56 82 97 11. Vous recevez une proposition personnalisée sous 48 h, gratuitement et sans engagement.'],
  ['Les créations sont-elles faites maison ?', 'Oui, tout est réalisé en cuisine professionnelle à partir de produits frais, locaux et de saison, sans additifs ni conservateurs.'],
  ['Proposez-vous des options sans gluten ou vegan ?', 'Oui, des adaptations diététiques sont possibles : sans gluten, vegan, sans lactose… Précisez-les dans votre demande.'],
]

// Métadonnées de chaque page
export const pages = {
  '/': {
    title: 'Pâtissière & traiteur à Saverdun (Ariège) | O P’tit Four Truck',
    description: 'Wedding cakes, gâteaux d’anniversaire, cake design et buffets sucrés-salés faits maison par Alicia. Saverdun, Ariège & Haute-Garonne. Devis gratuit sous 48 h.',
    image: 14,
  },
  '/savoir-faire/': {
    title: 'Savoir-faire : pâtisserie artisanale | O P’tit Four Truck',
    description: 'L’histoire d’Alicia, ses engagements (produits frais, locaux, sans conservateurs) et sa méthode, de l’écoute à la livraison de votre gâteau.',
    image: 9,
  },
  '/prestations/': {
    title: 'Mariages, anniversaires & pros | O P’tit Four Truck',
    description: 'Wedding cakes, gâteaux d’anniversaire, cake design, buffets et traiteur événementiel pour particuliers et professionnels en Ariège et Haute-Garonne.',
    image: 0,
  },
  '/galerie/': {
    title: 'Galerie : plus de 60 créations | O P’tit Four Truck',
    description: 'Pièces montées, number cakes, tartes de saison, entremets et bûches : découvrez les créations faites maison par Alicia.',
    image: 36,
  },
  '/avis/': {
    title: 'Avis clients — Ils ont goûté | O P’tit Four Truck',
    description: 'Les retours des clients d’Alicia sur ses gâteaux, wedding cakes et prestations traiteur en Ariège et Haute-Garonne.',
    image: 16,
  },
  '/devis/': {
    title: 'Demande de devis gratuit sous 48 h | O P’tit Four Truck',
    description: 'Décrivez votre événement en 2 minutes et recevez une proposition personnalisée d’Alicia sous 48 h, gratuitement et sans engagement.',
    image: 58,
  },
}
Object.entries(servicePages).forEach(([slug, p]) => {
  pages[`/prestations/${slug}/`] = { ...p.meta, image: p.cats[0] === 'wedding' ? 0 : slug === 'anniversaire' ? 25 : 57 }
})

export const notFound = {
  title: 'Page introuvable | O P’tit Four Truck',
  description: 'Cette page n’existe pas ou a été déplacée.',
  image: 14,
  noindex: true,
}

export const routes = Object.keys(pages)

/* ---------- Données structurées (schema.org) ---------- */
const business = {
  '@type': 'Bakery',
  '@id': `${SITE.url}/#business`,
  name: SITE.name,
  alternateName: "O P'tit Four Truck by Alicia",
  description: 'Pâtissière-traiteur artisanale : wedding cakes, cake design, gâteaux d’anniversaire, brunchs et buffets événementiels faits maison.',
  url: `${SITE.url}/`,
  image: [ogImage(14), ogImage(0), ogImage(36)],
  logo: `${photos[1].src}=w512`,
  telephone: '+33656829711',
  email: contact.email,
  founder: { '@type': 'Person', name: 'Alicia Catala' },
  address: { '@type': 'PostalAddress', addressLocality: 'Saverdun', postalCode: '09700', addressRegion: 'Occitanie', addressCountry: 'FR' },
  geo: { '@type': 'GeoCoordinates', latitude: 43.2361, longitude: 1.5739 }, // centre de Saverdun
  hasMap: contact.google,
  openingHoursSpecification: hours.flatMap((h) => h.spec).map(([day, opens, closes]) => ({ '@type': 'OpeningHoursSpecification', dayOfWeek: day, opens, closes })),
  areaServed: [
    { '@type': 'AdministrativeArea', name: 'Ariège' },
    { '@type': 'AdministrativeArea', name: 'Haute-Garonne' },
    { '@type': 'City', name: 'Saverdun' },
    { '@type': 'City', name: 'Pamiers' },
    { '@type': 'City', name: 'Toulouse' },
  ],
  sameAs: [contact.instagram, contact.facebook, contact.google],
  servesCuisine: ['Pâtisserie', 'Traiteur'],
  knowsAbout: ['Wedding cake', 'Pièce montée', 'Number cake', 'Cake design', 'Buffet de desserts'],
}

const website = { '@type': 'WebSite', '@id': `${SITE.url}/#website`, url: `${SITE.url}/`, name: SITE.name, inLanguage: 'fr-FR', publisher: { '@id': business['@id'] } }

const crumbs = (items) => ({
  '@type': 'BreadcrumbList',
  itemListElement: items.map(([name, path], i) => ({ '@type': 'ListItem', position: i + 1, name, item: `${SITE.url}${path}` })),
})

const faqLd = (faq) => ({
  '@type': 'FAQPage',
  mainEntity: faq.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
})

const labels = {
  '/savoir-faire/': 'Savoir-faire', '/prestations/': 'Prestations', '/galerie/': 'Galerie', '/avis/': 'Avis', '/devis/': 'Devis',
}

export function jsonLd(path) {
  const graph = [business, website]
  if (path !== '/') {
    const trail = [['Accueil', '/']]
    if (path.startsWith('/prestations/')) trail.push(['Prestations', '/prestations/'])
    const slug = path.split('/')[2]
    if (slug && servicePages[slug]) {
      const sp = servicePages[slug]
      trail.push([sp.h1, path])
      graph.push({
        '@type': 'Service',
        name: sp.h1,
        description: sp.meta.description,
        provider: { '@id': business['@id'] },
        areaServed: business.areaServed.slice(0, 2),
        url: `${SITE.url}${path}`,
      })
      graph.push(faqLd(sp.faq))
    } else if (labels[path] && path !== '/prestations/') {
      trail.push([labels[path], path])
    }
    if (path === '/prestations/') graph.push(faqLd(generalFaq))
    graph.push(crumbs(trail))
  }
  return { '@context': 'https://schema.org', '@graph': graph }
}

export function meta(path) {
  const p = pages[path] ?? notFound
  return {
    ...p,
    canonical: `${SITE.url}${path}`,
    ogImage: ogImage(p.image),
  }
}

// Balises <head> sous forme de texte (utilisé par le pré-rendu)
export function headTags(path) {
  const m = meta(path)
  const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')
  return [
    `<title>${esc(m.title)}</title>`,
    `<meta name="description" content="${esc(m.description)}" />`,
    m.noindex ? '<meta name="robots" content="noindex" />' : `<link rel="canonical" href="${m.canonical}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="${esc(SITE.name)}" />`,
    `<meta property="og:locale" content="${SITE.locale}" />`,
    `<meta property="og:title" content="${esc(m.title)}" />`,
    `<meta property="og:description" content="${esc(m.description)}" />`,
    `<meta property="og:url" content="${m.canonical}" />`,
    `<meta property="og:image" content="${m.ogImage}" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${esc(m.title)}" />`,
    `<meta name="twitter:description" content="${esc(m.description)}" />`,
    `<meta name="twitter:image" content="${m.ogImage}" />`,
    m.noindex ? '' : `<script type="application/ld+json">${JSON.stringify(jsonLd(path)).replace(/</g, '\\u003c')}</script>`,
  ].join('\n    ')
}
