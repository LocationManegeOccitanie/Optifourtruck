import { Layout } from "@/components/Layout";
import { SEO } from "@/components/SEO";
import { RevealSection } from "@/components/RevealSection";
import { TiltCard } from "@/components/premium/TiltCard";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Heart, Building2, Sparkles } from "lucide-react";
import weddingCake from "@/assets/wedding-cake.jpg";
import cateringSpread from "@/assets/catering-spread.jpg";
import petitFours from "@/assets/petit-fours.jpg";

const prestations = [
  {
    id: "particuliers",
    icon: Heart,
    title: "Événements privés",
    subtitle: "Mariages, anniversaires, baptêmes...",
    description:
      "Votre événement mérite des créations à la hauteur de vos émotions. Du wedding cake de vos rêves aux petits fours les plus raffinés, nous imaginons ensemble une offre sur-mesure, livrée directement sur le lieu de votre événement.",
    services: [
      "Wedding cakes & pièces montées",
      "Buffets de desserts",
      "Mignardises & petits fours",
      "Gâteaux d'anniversaire personnalisés",
      "Livraison sur le lieu de l'événement",
    ],
    image: weddingCake,
  },
  {
    id: "professionnels",
    icon: Building2,
    title: "Événements professionnels",
    subtitle: "Séminaires, pauses gourmandes, célébrations...",
    description:
      "Impressionnez vos collaborateurs et partenaires avec des créations pâtissières haut de gamme. Nous préparons et livrons directement sur votre lieu d'événement pour sublimer vos moments d'entreprise.",
    services: [
      "Pauses gourmandes & brunchs sucrés",
      "Buffets de desserts",
      "Mignardises pour cocktails",
      "Cadeaux d'entreprise personnalisés",
      "Livraison clé en main",
    ],
    image: cateringSpread,
  },
  {
    id: "surmesure",
    icon: Sparkles,
    title: "Créations sur-mesure",
    subtitle: "Vos envies prennent forme",
    description:
      "Vous avez une idée précise ou un thème particulier ? Partagez-nous votre vision et nous la transformons en réalité gourmande. Chaque création est unique, à votre image, et livrée avec soin.",
    services: [
      "Gâteaux thématiques",
      "Créations selon vos inspirations",
      "Desserts signature",
      "Adaptations diététiques (sans gluten, vegan...)",
      "Collaborations créatives",
    ],
    image: petitFours,
  },
];

const Prestations = () => {
  return (
    <Layout>
      <SEO 
        title="Prestations | Gâteaux & Buffets sur-mesure en Ariège et Haute-Garonne"
        description="Wedding cakes, gâteaux d'anniversaire, buffets sucrés pour particuliers et professionnels. Livraison à Saverdun, Pamiers, Foix, Toulouse et toute la Haute-Garonne."
        canonical="/prestations"
      />
      {/* Hero */}
      <section className="pt-32 pb-20 bg-background">
        <div className="container-wide text-center">
          <RevealSection>
            <span className="text-caption">Nos prestations</span>
            <h1 className="heading-hero mt-4 max-w-4xl mx-auto">
              Des créations pour{" "}
              <span className="text-gradient">chaque occasion</span>
            </h1>
            <p className="text-body mt-8 max-w-2xl mx-auto text-lg">
              Particuliers ou professionnels, nous vous accompagnons avec des prestations 
              sur-mesure pour transformer vos événements en moments d'exception.
            </p>
          </RevealSection>
        </div>
      </section>

      {/* Prestations */}
      {prestations.map((prestation, index) => (
        <section
          key={prestation.id}
          className={`section-padding ${index % 2 === 0 ? "bg-secondary/30" : "bg-background"}`}
        >
          <div className="container-wide">
            <div
              className={`grid lg:grid-cols-2 gap-16 items-center ${
                index % 2 !== 0 ? "lg:grid-flow-dense" : ""
              }`}
            >
              <RevealSection
                direction={index % 2 === 0 ? "left" : "right"}
                className={index % 2 !== 0 ? "lg:col-start-2" : ""}
              >
                <TiltCard 
                  className="perspective-1000 cursor-pointer"
                  intensity={12}
                  glareEnabled={true}
                  scaleOnHover={1.03}
                >
                  <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-[var(--shadow-medium)]">
                    <motion.img
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                      src={prestation.image}
                      alt={prestation.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </TiltCard>
              </RevealSection>

              <RevealSection
                direction={index % 2 === 0 ? "right" : "left"}
                delay={0.2}
                className={index % 2 !== 0 ? "lg:col-start-1" : ""}
              >
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                  <prestation.icon className="text-primary" size={28} />
                </div>
                <span className="text-caption">{prestation.subtitle}</span>
                <h2 className="heading-section mt-2">{prestation.title}</h2>
                <p className="text-body mt-6">{prestation.description}</p>

                <ul className="mt-8 space-y-3">
                  {prestation.services.map((service, i) => (
                    <li key={i} className="flex items-center gap-3 text-foreground">
                      <span className="w-2 h-2 rounded-full bg-primary flex-shrink-0" />
                      {service}
                    </li>
                  ))}
                </ul>

                <Link
                  to="/devis"
                  className="btn-primary mt-10 inline-flex items-center gap-2"
                >
                  Demander un devis
                  <ArrowRight size={18} />
                </Link>
              </RevealSection>
            </div>
          </div>
        </section>
      ))}

      {/* CTA */}
      <section className="section-padding bg-foreground text-background">
        <div className="container-narrow text-center">
          <RevealSection>
            <span className="text-caption text-primary">Votre projet est unique</span>
            <h2 className="heading-section mt-4 text-background">
              Parlons de vos <span className="text-primary">envies</span>
            </h2>
            <p className="text-background/70 mt-6 max-w-xl mx-auto">
              Chaque prestation est personnalisée selon vos besoins. Partagez-nous votre projet 
              et recevez un devis sur-mesure sous 48h.
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

export default Prestations;
