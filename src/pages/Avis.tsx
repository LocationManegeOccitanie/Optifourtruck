import { Layout } from "@/components/Layout";
import { RevealSection } from "@/components/RevealSection";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Olivier H.",
    text: "Un gâteau d'anniversaire parfaitement équilibré, léger et généreux. Tout le monde s'est resservi.",
  },
  {
    name: "Baptiste C.",
    text: "Savoureux, varié et parfaitement maîtrisé. Une valeur sûre, sans aucune déception.",
  },
  {
    name: "Patrick P.",
    text: "Des tapas très bons et généreux. Une prestation qui fait vraiment plaisir.",
  },
  {
    name: "Gilles C.",
    text: "Menu tapas varié et de qualité. Une très belle soirée gourmande.",
  },
  {
    name: "Virginie S.",
    text: "Très bons tapas, une soirée réussie et appréciée de tous.",
  },
  {
    name: "Claudie P.",
    text: "Soirée très agréable, cuisine appréciée et service soigné.",
  },
  {
    name: "Lorna D.",
    text: "Commande pour un anniversaire, tout était excellent. Je recommande sans hésiter.",
  },
  {
    name: "Sabrina C.",
    text: "Un travail magnifique et une grande maîtrise. Je recommande les yeux fermés.",
  },
];

const Avis = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="pt-32 pb-16 bg-background">
        <div className="container-wide text-center">
          <RevealSection>
            <span className="text-caption">Ce qu'ils en disent</span>
            <h1 className="heading-hero mt-4 max-w-4xl mx-auto">
              La confiance de nos{" "}
              <span className="text-gradient">clients</span>
            </h1>
            <p className="text-body mt-8 max-w-2xl mx-auto text-lg">
              Des moments partagés, des souvenirs créés. 
              Découvrez les retours sincères de ceux qui nous ont fait confiance.
            </p>
          </RevealSection>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="section-padding bg-secondary/20">
        <div className="container-wide">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {testimonials.map((testimonial, index) => (
              <RevealSection key={index} delay={index * 0.08}>
                <motion.div
                  whileHover={{ y: -8, scale: 1.02 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="group h-full"
                >
                  <div className="card-premium h-full flex flex-col p-6 relative overflow-hidden">
                    {/* Decorative gradient */}
                    <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-primary/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    {/* Quote icon */}
                    <Quote className="text-primary/20 mb-4 group-hover:text-primary/40 transition-colors duration-300" size={28} />

                    {/* Stars */}
                    <div className="flex gap-0.5 mb-4">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className="text-accent fill-accent" size={14} />
                      ))}
                    </div>

                    {/* Text */}
                    <p className="text-foreground/90 leading-relaxed flex-1 text-sm">
                      "{testimonial.text}"
                    </p>

                    {/* Author */}
                    <div className="mt-5 pt-4 border-t border-border/50">
                      <p className="font-medium text-foreground text-sm">— {testimonial.name}</p>
                    </div>
                  </div>
                </motion.div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Quote from Alicia */}
      <section className="section-padding bg-primary/5">
        <div className="container-narrow text-center">
          <RevealSection>
            <Quote className="text-primary/30 mx-auto mb-8" size={48} />
            <blockquote>
              <p className="font-display text-2xl md:text-3xl lg:text-4xl italic leading-relaxed text-foreground">
                "Chaque avis est une récompense. Savoir que mes créations ont contribué à rendre 
                un moment unique, c'est ce qui me motive chaque jour."
              </p>
              <footer className="mt-8">
                <p className="font-medium text-primary text-lg">Alicia</p>
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
            <span className="text-caption text-primary">À votre tour</span>
            <h2 className="heading-section mt-4 text-background">
              Créons ensemble votre <span className="text-primary">moment</span>
            </h2>
            <p className="text-background/70 mt-6 max-w-xl mx-auto">
              Faites confiance à notre savoir-faire artisanal pour sublimer vos événements. 
              Demandez votre devis personnalisé.
            </p>
            <Link to="/devis" className="btn-primary mt-10 inline-flex items-center gap-2">
              Demander un devis
              <ArrowRight size={18} />
            </Link>
          </RevealSection>
        </div>
      </section>
    </Layout>
  );
};

export default Avis;
