export const contact = {
  phone: '06 56 82 97 11',
  phoneHref: 'tel:+33656829711',
  email: 'contact@optifourtruck.fr',
  instagram: 'https://www.instagram.com/o_ptit_four_truck_by_alicia',
  facebook: 'https://www.facebook.com/alicia.ctl.1',
  zone: 'Saverdun · Ariège (09) & Haute-Garonne (31)',
  google: 'https://maps.app.goo.gl/ZvYEoQgDwToBCP7VA',
  rating: { value: '4,7', count: 14 },
}

// Horaires de la fiche Google Business Profile
export const hours = [
  { days: 'Lundi', label: '14 h – 18 h', spec: [['Monday', '14:00', '18:00']] },
  { days: 'Mardi – samedi', label: '10 h – 12 h · 14 h – 18 h', spec: ['Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].flatMap((d) => [[d, '10:00', '12:00'], [d, '14:00', '18:00']]) },
  { days: 'Dimanche', label: 'Fermé', spec: [] },
]

export const nav = [
  { to: '/savoir-faire/', label: 'Savoir-faire' },
  { to: '/prestations/', label: 'Prestations' },
  { to: '/galerie/', label: 'Galerie' },
  { to: '/avis/', label: 'Avis' },
]

export const ribbon = [
  'Wedding cakes', 'Number cakes', 'Brunchs', 'Mignardises', 'Pièces montées',
  'Tartes de saison', 'Bûches', 'Traiteur événementiel', 'Cake design',
]

export const values = [
  {
    icon: 'leaf',
    title: 'La fraîcheur avant tout',
    text: "Des ingrédients de saison, choisis auprès de producteurs locaux. La qualité naît du respect du produit.",
  },
  {
    icon: 'whisk',
    title: 'Le fait maison, vraiment',
    text: 'Tout est réalisé en cuisine professionnelle, sans additifs ni conservateurs. Des goûts francs et justes.',
  },
  {
    icon: 'heart',
    title: 'Le plaisir du partage',
    text: 'Chaque prestation est pensée pour créer du lien et des souvenirs autour de la table.',
  },
  {
    icon: 'jar',
    title: 'Une responsabilité assumée',
    text: 'Circuit court, anti-gaspillage, contenants réutilisables : bocaux, verrines, bois.',
  },
]

// Les 3 prestations phares : chacune a sa page dédiée (/prestations/<slug>/)
export const services = [
  {
    slug: 'mariage',
    occasion: 'mariage',
    kicker: 'Mariages · fiançailles · baptêmes',
    title: 'Wedding cakes & pièces montées',
    text: 'Du wedding cake de vos rêves aux mignardises du vin d’honneur, une création unique livrée sur le lieu de votre réception.',
    items: ['Wedding cakes & pièces montées', 'Buffets de desserts', 'Mignardises & petits fours', 'Livraison sur le lieu de réception'],
    photo: 0,
    tone: 'blush',
  },
  {
    slug: 'anniversaire',
    occasion: 'anniversaire',
    kicker: 'Anniversaires · cake design · thèmes',
    title: 'Gâteaux d’anniversaire & cake design',
    text: 'Number cakes, letter cakes, gâteaux à thème : vos envies prennent forme, à votre image et à celle de la personne fêtée.',
    items: ['Number & letter cakes', 'Gâteaux à thème', 'Desserts signature', 'Sans gluten, vegan… sur demande'],
    photo: 25,
    tone: 'cocoa',
  },
  {
    slug: 'evenements-professionnels',
    occasion: 'entreprise',
    kicker: 'Séminaires · cocktails · inaugurations',
    title: 'Traiteur & buffets pour professionnels',
    text: 'Pauses gourmandes, brunchs, buffets sucrés-salés et mignardises de cocktail pour impressionner collaborateurs et partenaires.',
    items: ['Pauses gourmandes & brunchs', 'Buffets sucrés et salés', 'Mignardises pour cocktails', 'Livraison clé en main'],
    photo: 57,
    tone: 'sage',
  },
  {
    slug: 'food-truck',
    occasion: 'autre',
    kicker: 'Mariages · EVJF · comités des fêtes',
    title: 'Privatiser le food truck',
    text: 'La remorque food truck d’Alicia s’installe sur votre événement : douceurs, brunch et bouchées servis sur place, devant vos invités.',
    items: ['Service sur place', 'Particuliers & entreprises', 'Comités des fêtes & associations', 'Sucré et salé'],
    photo: 24,
    tone: 'blush',
  },
]

export const filters = [
  { id: 'all', label: 'Tout' },
  { id: 'wedding', label: 'Pièces montées' },
  { id: 'fete', label: 'Cake design' },
  { id: 'lettres', label: 'Number cakes' },
  { id: 'tartes', label: 'Tartes & entremets' },
  { id: 'douceurs', label: 'Bûches & douceurs' },
]

export const steps = [
  { n: '01', title: 'Échange & écoute', text: 'On prend le temps de comprendre vos envies, votre événement et vos attentes.' },
  { n: '02', title: 'Création sur-mesure', text: 'Une proposition unique, adaptée à vos goûts et à votre budget. Devis sous 48 h.' },
  { n: '03', title: 'Réalisation artisanale', text: "Chaque création est préparée avec soin, à partir d'ingrédients frais et locaux." },
  { n: '04', title: 'Livraison & service', text: 'Livraison soignée sur votre lieu de réception et, si souhaité, service sur place.' },
]

export const reviews = [
  { q: "Un gâteau d'anniversaire parfaitement équilibré, léger et généreux. Tout le monde s'est resservi.", a: 'Olivier H.' },
  { q: 'Savoureux, varié et parfaitement maîtrisé. Une valeur sûre, sans aucune déception.', a: 'Baptiste C.' },
  { q: 'Des tapas très bons et généreux. Une prestation qui fait vraiment plaisir.', a: 'Patrick P.' },
  { q: 'Menu tapas varié et de qualité. Une très belle soirée gourmande.', a: 'Gilles C.' },
  { q: 'Très bons tapas, une soirée réussie et appréciée de tous.', a: 'Virginie S.' },
  { q: 'Soirée très agréable, cuisine appréciée et service soigné.', a: 'Claudie P.' },
  { q: 'Commande pour un anniversaire, tout était excellent. Je recommande sans hésiter.', a: 'Lorna D.' },
  { q: 'Un travail magnifique et une grande maîtrise. Je recommande les yeux fermés.', a: 'Sabrina C.' },
  { q: 'Un wedding cake somptueux qui a impressionné tous nos invités. Merci Alicia !', a: 'Marie-Claire B.' },
  { q: 'Service traiteur impeccable pour notre événement d’entreprise. Professionnalisme au rendez-vous.', a: 'Thomas R.' },
]
