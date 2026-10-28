// Options du formulaire de devis.
// Les identifiants (category, services, budget, contact) sont ceux attendus par la table
// Supabase `quote_requests` et la fonction `send-quote-notification` de l'ancien site.

export const occasions = [
  { id: 'mariage', label: 'Mariage', hint: 'Wedding cake, pièce montée, dessert', category: 'private', photo: 0 },
  { id: 'anniversaire', label: 'Anniversaire', hint: 'Number cake, gâteau à thème', category: 'private', photo: 21 },
  { id: 'bapteme', label: 'Baptême · communion', hint: 'Gâteau personnalisé, buffet', category: 'private', photo: 14 },
  { id: 'entreprise', label: 'Événement pro', hint: 'Séminaire, cocktail, inauguration', category: 'professional', photo: 57 },
  { id: 'brunch', label: 'Brunch · réception', hint: 'Sucré-salé, pauses gourmandes', category: 'private', photo: 60 },
  { id: 'autre', label: 'Autre projet', hint: 'Une idée ? Racontez-la', category: 'other', photo: 23 },
]

export const services = [
  { id: 'cakes', label: 'Gâteaux & pièces montées', photo: 9 },
  { id: 'individual-pastries', label: 'Pâtisseries individuelles', photo: 59 },
  { id: 'sweet-buffet', label: 'Buffet sucré', photo: 56 },
  { id: 'savory-buffet', label: 'Buffet salé', photo: null },
  { id: 'other', label: 'Autre / sur-mesure', photo: 25 },
]

export const flavours = ['Chocolat', 'Fruits rouges', 'Vanille', 'Caramel', 'Agrumes', 'Fruits exotiques', 'Pistache', 'Praliné', 'Café']
export const diets = ['Sans gluten', 'Vegan', 'Sans lactose', 'Sans fruits à coque']

export const slots = ['Matin', 'Midi', 'Après-midi', 'Soirée']
export const departments = [
  { id: '09', label: '09 · Ariège' },
  { id: '31', label: '31 · Haute-Garonne' },
  { id: '11', label: '11 · Aude' },
  { id: 'autre', label: 'Autre' },
]
export const guestPresets = [10, 20, 30, 50, 80, 120]

export const budgets = [
  { id: 'unknown', label: 'Je ne sais pas encore' },
  { id: 'under-500', label: 'Moins de 500 €' },
  { id: '500-1000', label: '500 – 1 000 €' },
  { id: '1000-2000', label: '1 000 – 2 000 €' },
  { id: '2000-5000', label: '2 000 – 5 000 €' },
  { id: 'over-5000', label: 'Plus de 5 000 €' },
]

export const contactPrefs = [
  { id: 'email', label: 'E-mail' },
  { id: 'phone', label: 'Téléphone' },
  { id: 'both', label: 'Les deux' },
]

export const steps = ['Occasion', 'Envies', 'Détails', 'Budget', 'Coordonnées', 'Récapitulatif']

export const emptyQuote = {
  occasion: '',
  services: [],
  flavours: [],
  diets: [],
  projectDescription: '',
  eventDate: '',
  eventTime: '',
  eventCity: '',
  eventDepartment: '09',
  guestCount: 30,
  budget: '',
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  contactPreference: 'email',
  consent: false,
}
