import { Layout } from "@/components/Layout";
import { RevealSection } from "@/components/RevealSection";
import { motion } from "framer-motion";
import { useState } from "react";
import { Send, Phone, Mail, MapPin, CheckCircle2 } from "lucide-react";

const eventTypes = [
  "Mariage",
  "Anniversaire",
  "Baptême",
  "Événement d'entreprise",
  "Cocktail",
  "Autre",
];

const Devis = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    eventType: "",
    eventDate: "",
    guestCount: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    setIsSubmitted(true);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <Layout>
      {/* Hero */}
      <section className="pt-32 pb-16 bg-background">
        <div className="container-wide text-center">
          <RevealSection>
            <span className="text-caption">Demande de devis</span>
            <h1 className="heading-hero mt-4 max-w-4xl mx-auto">
              Créons ensemble votre{" "}
              <span className="text-gradient">moment parfait</span>
            </h1>
            <p className="text-body mt-8 max-w-2xl mx-auto text-lg">
              Partagez-nous votre projet et recevez un devis personnalisé sous 48h. 
              Nous avons hâte de contribuer à votre événement.
            </p>
          </RevealSection>
        </div>
      </section>

      {/* Form Section */}
      <section className="section-padding pt-8">
        <div className="container-wide">
          <div className="grid lg:grid-cols-5 gap-16">
            {/* Contact Info */}
            <RevealSection className="lg:col-span-2">
              <div className="card-glass sticky top-32">
                <h3 className="heading-card mb-8">Informations de contact</h3>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Phone className="text-primary" size={22} />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Téléphone</p>
                      <p className="text-muted-foreground">06 XX XX XX XX</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Mail className="text-primary" size={22} />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Email</p>
                      <p className="text-muted-foreground">contact@optitfourtruck.fr</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <MapPin className="text-primary" size={22} />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Zone d'intervention</p>
                      <p className="text-muted-foreground">Région Occitanie et environs</p>
                    </div>
                  </div>
                </div>

                <div className="mt-10 pt-8 border-t border-border">
                  <h4 className="font-medium text-foreground mb-4">Délai de réponse</h4>
                  <p className="text-muted-foreground text-sm">
                    Nous nous engageons à répondre à toutes les demandes sous 48h ouvrées. 
                    Pour les demandes urgentes, n'hésitez pas à nous contacter par téléphone.
                  </p>
                </div>
              </div>
            </RevealSection>

            {/* Form */}
            <RevealSection delay={0.2} className="lg:col-span-3">
              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="card-premium text-center py-16"
                >
                  <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="text-primary" size={40} />
                  </div>
                  <h3 className="heading-card">Demande envoyée !</h3>
                  <p className="text-body mt-4 max-w-md mx-auto">
                    Merci pour votre demande. Nous l'étudions avec attention et vous 
                    répondrons sous 48h avec un devis personnalisé.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="card-premium">
                  <h3 className="heading-card mb-8">Votre projet</h3>

                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Name */}
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                        Nom complet *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                        placeholder="Votre nom"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                        placeholder="votre@email.com"
                      />
                    </div>

                    {/* Phone */}
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
                        Téléphone
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                        placeholder="06 XX XX XX XX"
                      />
                    </div>

                    {/* Event Type */}
                    <div>
                      <label htmlFor="eventType" className="block text-sm font-medium text-foreground mb-2">
                        Type d'événement *
                      </label>
                      <select
                        id="eventType"
                        name="eventType"
                        required
                        value={formData.eventType}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none appearance-none"
                      >
                        <option value="">Sélectionnez...</option>
                        {eventTypes.map((type) => (
                          <option key={type} value={type}>
                            {type}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Event Date */}
                    <div>
                      <label htmlFor="eventDate" className="block text-sm font-medium text-foreground mb-2">
                        Date de l'événement
                      </label>
                      <input
                        type="date"
                        id="eventDate"
                        name="eventDate"
                        value={formData.eventDate}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                      />
                    </div>

                    {/* Guest Count */}
                    <div>
                      <label htmlFor="guestCount" className="block text-sm font-medium text-foreground mb-2">
                        Nombre d'invités
                      </label>
                      <input
                        type="number"
                        id="guestCount"
                        name="guestCount"
                        value={formData.guestCount}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                        placeholder="Estimation"
                      />
                    </div>
                  </div>

                  {/* Message */}
                  <div className="mt-6">
                    <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                      Décrivez votre projet *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      value={formData.message}
                      onChange={handleChange}
                      rows={5}
                      className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none resize-none"
                      placeholder="Parlez-nous de votre événement, vos envies, vos inspirations..."
                    />
                  </div>

                  {/* Submit */}
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="btn-primary w-full mt-8 flex items-center justify-center gap-2"
                  >
                    Envoyer ma demande
                    <Send size={18} />
                  </motion.button>

                  <p className="text-muted-foreground text-sm text-center mt-6">
                    En soumettant ce formulaire, vous acceptez d'être contacté concernant votre demande.
                  </p>
                </form>
              )}
            </RevealSection>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Devis;
