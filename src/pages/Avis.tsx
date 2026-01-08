import { Layout } from "@/components/Layout";
import { RevealSection } from "@/components/RevealSection";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Marie & Thomas",
    event: "Mariage - Juin 2024",
    rating: 5,
    text: "Alicia a sublimé notre mariage avec ses créations. Chaque pâtisserie était une œuvre d'art, et nos invités en parlent encore ! Le wedding cake était exactement comme nous l'avions imaginé, et le service était impeccable.",
  },
  {
    name: "Sophie L.",
    event: "Anniversaire - Mars 2024",
    rating: 5,
    text: "Pour les 50 ans de ma mère, j'ai fait appel à O P'tit Four Truck et je ne regrette absolument pas. Le gâteau était magnifique et délicieux. Tout le monde a adoré les petits fours. Merci pour ce moment magique !",
  },
  {
    name: "Entreprise TechStart",
    event: "Séminaire d'entreprise - Avril 2024",
    rating: 5,
    text: "Nous avons fait appel à Alicia pour notre séminaire annuel. La qualité des prestations était au rendez-vous : buffet sucré raffiné, pauses gourmandes parfaites. Nos collaborateurs ont été conquis. Professionnalisme et créativité !",
  },
  {
    name: "Camille & Julien",
    event: "Baptême - Février 2024",
    rating: 5,
    text: "Un immense merci pour le baptême de notre fille. Les créations étaient à la fois belles et délicieuses. Alicia a su s'adapter à nos demandes et le résultat était au-delà de nos attentes. Une vraie artiste !",
  },
  {
    name: "Restaurant Le Jardin",
    event: "Partenariat continu",
    rating: 5,
    text: "Nous travaillons avec O P'tit Four Truck depuis un an pour nos desserts signatures. La qualité est constante, les créations sont innovantes et notre clientèle est ravie. Un partenariat précieux.",
  },
  {
    name: "Élodie M.",
    event: "Baby shower - Mai 2024",
    rating: 5,
    text: "J'ai organisé une baby shower surprise et Alicia a créé un buffet de rêve. Les macarons étaient divins, le gâteau magnifiquement décoré. C'était exactement ce que je voulais. Merci infiniment !",
  },
];

const Avis = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="pt-32 pb-20 bg-background">
        <div className="container-wide text-center">
          <RevealSection>
            <span className="text-caption">Témoignages</span>
            <h1 className="heading-hero mt-4 max-w-4xl mx-auto">
              Ils nous ont fait{" "}
              <span className="text-gradient">confiance</span>
            </h1>
            <p className="text-body mt-8 max-w-2xl mx-auto text-lg">
              Découvrez les retours de nos clients. Leur satisfaction est notre 
              plus belle récompense et notre motivation quotidienne.
            </p>
          </RevealSection>

          {/* Stats */}
          <RevealSection delay={0.2}>
            <div className="flex flex-wrap justify-center gap-8 mt-12">
              {[
                { value: "500+", label: "Événements réalisés" },
                { value: "100%", label: "Clients satisfaits" },
                { value: "5/5", label: "Note moyenne" },
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <p className="font-display text-4xl md:text-5xl text-primary">{stat.value}</p>
                  <p className="text-muted-foreground text-sm mt-2">{stat.label}</p>
                </div>
              ))}
            </div>
          </RevealSection>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="section-padding bg-secondary/30">
        <div className="container-wide">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <RevealSection key={index} delay={index * 0.1}>
                <motion.div
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.4 }}
                  className="card-premium h-full flex flex-col"
                >
                  {/* Quote icon */}
                  <Quote className="text-primary/30 mb-4" size={32} />

                  {/* Rating */}
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star key={i} className="text-accent fill-accent" size={18} />
                    ))}
                  </div>

                  {/* Text */}
                  <p className="text-foreground leading-relaxed flex-1">
                    "{testimonial.text}"
                  </p>

                  {/* Author */}
                  <div className="mt-6 pt-6 border-t border-border">
                    <p className="font-medium text-foreground">{testimonial.name}</p>
                    <p className="text-muted-foreground text-sm">{testimonial.event}</p>
                  </div>
                </motion.div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Quote */}
      <section className="section-padding bg-primary/5">
        <div className="container-narrow text-center">
          <RevealSection>
            <Quote className="text-primary/30 mx-auto mb-8" size={48} />
            <blockquote>
              <p className="font-display text-2xl md:text-3xl lg:text-4xl italic leading-relaxed text-foreground">
                "Travailler avec passion, c'est offrir à chaque client un morceau de mon cœur 
                à travers mes créations. Voir le bonheur dans leurs yeux est ma plus grande fierté."
              </p>
              <footer className="mt-8">
                <p className="font-medium text-primary text-lg">Alicia Catala</p>
                <p className="text-muted-foreground">Fondatrice, O P'tit Four Truck</p>
              </footer>
            </blockquote>
          </RevealSection>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-foreground text-background">
        <div className="container-narrow text-center">
          <RevealSection>
            <span className="text-caption text-primary">Rejoignez-les</span>
            <h2 className="heading-section mt-4 text-background">
              Votre événement mérite le <span className="text-primary">meilleur</span>
            </h2>
            <p className="text-background/70 mt-6 max-w-xl mx-auto">
              Faites confiance à notre savoir-faire pour sublimer vos moments précieux. 
              Demandez votre devis personnalisé dès maintenant.
            </p>
            <Link to="/devis" className="btn-primary mt-10 inline-flex items-center gap-2">
              Demander un devis gratuit
              <ArrowRight size={18} />
            </Link>
          </RevealSection>
        </div>
      </section>
    </Layout>
  );
};

export default Avis;
