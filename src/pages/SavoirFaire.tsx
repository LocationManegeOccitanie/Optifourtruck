import { Layout } from "@/components/Layout";
import { RevealSection } from "@/components/RevealSection";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Heart, Award, Leaf } from "lucide-react";
import chefPortrait from "@/assets/chef-portrait.jpg";
import petitFours from "@/assets/petit-fours.jpg";
import macarons from "@/assets/macarons.jpg";

const SavoirFaire = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="pt-32 pb-20 bg-background">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <RevealSection>
              <span className="text-caption">Notre savoir-faire</span>
              <h1 className="heading-hero mt-4">
                L'artisanat au service de{" "}
                <span className="text-gradient">l'émotion</span>
              </h1>
              <p className="text-body mt-8 text-lg">
                Chez O P'tit Four Truck, chaque création raconte une histoire. 
                Celle d'un savoir-faire transmis avec passion, d'ingrédients nobles 
                et d'un engagement sans faille pour la qualité.
              </p>
            </RevealSection>

            <RevealSection delay={0.2} direction="right">
              <div className="relative">
                <motion.div
                  initial={{ scale: 0.95, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="aspect-[4/5] rounded-3xl overflow-hidden"
                >
                  <img
                    src={chefPortrait}
                    alt="Alicia Catala"
                    className="w-full h-full object-cover"
                  />
                </motion.div>
                <div className="absolute -bottom-6 -left-6 bg-primary text-primary-foreground rounded-2xl p-6 shadow-[var(--shadow-elevated)]">
                  <p className="font-display text-2xl">Alicia Catala</p>
                  <p className="text-sm opacity-90">Fondatrice & Chef Pâtissière</p>
                </div>
              </div>
            </RevealSection>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="section-padding bg-secondary/30">
        <div className="container-narrow">
          <RevealSection className="text-center">
            <span className="text-caption">Mon histoire</span>
            <h2 className="heading-section mt-4">
              Une passion née dans la <span className="text-primary">cuisine familiale</span>
            </h2>
          </RevealSection>

          <div className="mt-16 space-y-8">
            <RevealSection delay={0.1}>
              <p className="text-body text-lg">
                Depuis mon enfance, la pâtisserie a toujours été plus qu'une activité : 
                c'est un langage, une façon de transmettre l'amour et de créer des souvenirs. 
                Les odeurs de gâteaux qui emplissaient la cuisine de ma grand-mère ont façonné 
                ma vocation.
              </p>
            </RevealSection>

            <RevealSection delay={0.2}>
              <p className="text-body text-lg">
                Après une formation rigoureuse et des années d'expérience auprès de maîtres 
                artisans, j'ai créé O P'tit Four Truck pour partager cette passion avec vous. 
                Chaque création est le fruit d'heures de travail, d'essais et de perfectionnement.
              </p>
            </RevealSection>

            <RevealSection delay={0.3}>
              <p className="text-body text-lg">
                Mon engagement ? Vous offrir des pâtisseries qui ne sont pas seulement belles 
                et délicieuses, mais qui racontent une histoire – la vôtre. Car chaque événement 
                est unique, et mérite des gourmandises à sa mesure.
              </p>
            </RevealSection>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="section-padding">
        <div className="container-wide">
          <RevealSection className="text-center max-w-2xl mx-auto">
            <span className="text-caption">Nos valeurs</span>
            <h2 className="heading-section mt-4">
              Ce qui guide chaque <span className="text-primary">création</span>
            </h2>
          </RevealSection>

          <div className="grid md:grid-cols-3 gap-8 mt-16">
            {[
              {
                icon: Heart,
                title: "Passion",
                description:
                  "Chaque pâtisserie est créée avec amour et dévouement. La passion est l'ingrédient secret qui fait la différence.",
              },
              {
                icon: Award,
                title: "Excellence",
                description:
                  "Nous sélectionnons les meilleurs ingrédients et appliquons les techniques les plus exigeantes pour un résultat irréprochable.",
              },
              {
                icon: Leaf,
                title: "Authenticité",
                description:
                  "Tout est fait maison, de A à Z. Aucun compromis sur la qualité, aucun raccourci. Du vrai, du bon, du fait avec soin.",
              },
            ].map((value, index) => (
              <RevealSection key={index} delay={index * 0.15}>
                <motion.div
                  whileHover={{ y: -4 }}
                  className="card-premium text-center"
                >
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
                    <value.icon className="text-primary" size={28} />
                  </div>
                  <h3 className="heading-card">{value.title}</h3>
                  <p className="text-body mt-4">{value.description}</p>
                </motion.div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="section-padding bg-foreground text-background">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <RevealSection>
              <span className="text-caption text-primary">Notre approche</span>
              <h2 className="heading-section mt-4 text-background">
                De la conception à la <span className="text-primary">dégustation</span>
              </h2>

              <div className="mt-12 space-y-8">
                {[
                  {
                    step: "01",
                    title: "Échange & écoute",
                    description:
                      "Nous prenons le temps de comprendre vos envies, votre événement et vos attentes.",
                  },
                  {
                    step: "02",
                    title: "Création sur-mesure",
                    description:
                      "Nous élaborons des propositions uniques, adaptées à votre budget et à vos goûts.",
                  },
                  {
                    step: "03",
                    title: "Réalisation artisanale",
                    description:
                      "Chaque création est préparée avec soin, à partir d'ingrédients frais et de qualité.",
                  },
                  {
                    step: "04",
                    title: "Livraison & service",
                    description:
                      "Nous assurons une livraison soignée et, si souhaité, un service sur place.",
                  },
                ].map((item, index) => (
                  <RevealSection key={index} delay={index * 0.1}>
                    <div className="flex gap-6">
                      <span className="text-primary font-display text-2xl font-semibold">
                        {item.step}
                      </span>
                      <div>
                        <h4 className="text-xl font-medium text-background">{item.title}</h4>
                        <p className="text-background/60 mt-2">{item.description}</p>
                      </div>
                    </div>
                  </RevealSection>
                ))}
              </div>
            </RevealSection>

            <RevealSection delay={0.3} direction="right">
              <div className="grid grid-cols-2 gap-4">
                <div className="aspect-[3/4] rounded-2xl overflow-hidden">
                  <img src={petitFours} alt="Petit fours" className="w-full h-full object-cover" />
                </div>
                <div className="aspect-[3/4] rounded-2xl overflow-hidden mt-12">
                  <img src={macarons} alt="Macarons" className="w-full h-full object-cover" />
                </div>
              </div>
            </RevealSection>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-accent/30">
        <div className="container-narrow text-center">
          <RevealSection>
            <span className="text-caption">Prêt à créer ensemble ?</span>
            <h2 className="heading-section mt-4">
              Parlons de votre <span className="text-primary">projet</span>
            </h2>
            <p className="text-body mt-6 max-w-xl mx-auto">
              Chaque événement est unique. Partagez-nous vos envies et créons 
              ensemble des moments gourmands inoubliables.
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

export default SavoirFaire;
