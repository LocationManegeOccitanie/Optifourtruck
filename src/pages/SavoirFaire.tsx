import { Layout } from "@/components/Layout";
import { SEO } from "@/components/SEO";
import { RevealSection } from "@/components/RevealSection";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, Home, Leaf, Users } from "lucide-react";
import chefPortrait from "@/assets/chef-portrait.jpg";
import petitFours from "@/assets/petit-fours.jpg";
import macarons from "@/assets/macarons.jpg";

const SavoirFaire = () => {
  return (
    <Layout>
      <SEO 
        title="Notre Savoir-Faire | Pâtisserie Artisanale en Ariège"
        description="Découvrez le savoir-faire d'Alicia, artisan pâtissière à Saverdun. Créations gourmandes faites maison avec des produits locaux d'Ariège et d'Occitanie."
        canonical="/savoir-faire"
      />
      {/* Hero */}
      <section className="pt-32 pb-20 bg-background">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <RevealSection>
              <span className="text-caption">O P'tit Four Truck</span>
              <h1 className="heading-hero mt-4">
                Une histoire de passion,{" "}
                <span className="text-gradient">devenue métier</span>
              </h1>
              <p className="text-body mt-8 text-lg leading-relaxed">
                Derrière O P'tit Four Truck, il y a <strong>Alicia</strong>. Une jeune 
                entrepreneuse animée depuis toujours par la pâtisserie et la cuisine, 
                mais surtout par l'envie de faire les choses avec sens.
              </p>
              <p className="text-body mt-4 text-lg leading-relaxed">
                L'idée n'est pas née d'une tendance, mais d'un besoin profond : créer 
                un univers culinaire où les saveurs authentiques se rencontrent, 
                se respectent et se partagent.
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
                    alt="Alicia - Fondatrice d'O P'tit Four Truck"
                    className="w-full h-full object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                </motion.div>
                <div className="absolute -bottom-6 -left-6 bg-primary text-primary-foreground rounded-2xl p-6 shadow-[var(--shadow-elevated)]">
                  <p className="font-display text-2xl">Alicia</p>
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
            <span className="text-caption">L'origine</span>
            <h2 className="heading-section mt-4">
              À 20 ans, le choix d'une <span className="text-primary">voie exigeante</span>
            </h2>
          </RevealSection>

          <div className="mt-16 space-y-8">
            <RevealSection delay={0.1}>
              <p className="text-body text-lg leading-relaxed">
                À 20 ans, Alicia décide de transformer cette passion en projet professionnel. 
                Elle choisit une voie exigeante, celle du <em>fait avec intention</em> : 
                des produits frais, locaux, travaillés avec soin.
              </p>
            </RevealSection>

            <RevealSection delay={0.2}>
              <p className="text-body text-lg leading-relaxed">
                Pour que chaque création raconte quelque chose. Une histoire simple et sincère, 
                celle des ingrédients, des saisons et de l'attention portée à chaque détail.
              </p>
            </RevealSection>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="section-padding">
        <div className="container-wide">
          <RevealSection className="text-center max-w-2xl mx-auto">
            <span className="text-caption">Nos engagements</span>
            <h2 className="heading-section mt-4">
              Des valeurs qui guident chaque <span className="text-primary">création</span>
            </h2>
          </RevealSection>

          <div className="grid md:grid-cols-2 gap-8 mt-16">
            {[
              {
                icon: Sparkles,
                title: "La fraîcheur avant tout",
                description:
                  "Chaque recette commence par une sélection rigoureuse d'ingrédients de saison, choisis auprès de producteurs locaux. Ce choix n'est pas un argument, mais une évidence : la qualité naît du respect du produit et de son origine.",
              },
              {
                icon: Home,
                title: "Le fait maison, dans son sens le plus noble",
                description:
                  "Toutes les créations sont réalisées dans une cuisine professionnelle, sans additifs ni conservateurs. Ici, le fait maison n'est pas un slogan, mais un engagement quotidien pour des goûts francs, équilibrés et authentiques.",
              },
              {
                icon: Users,
                title: "Le plaisir du partage",
                description:
                  "Pour Alicia, la cuisine est avant tout un moment de transmission et de convivialité. Qu'il s'agisse d'un événement particulier ou d'une rencontre plus intime, chaque prestation est pensée pour créer du lien et des souvenirs autour de la table.",
              },
              {
                icon: Leaf,
                title: "Une responsabilité assumée",
                description:
                  "Réduction du gaspillage alimentaire, travail en circuit court, choix de contenants recyclables ou réutilisables (bocaux, verrines, bois) : chaque décision est prise avec cohérence et conscience.",
              },
            ].map((value, index) => (
              <RevealSection key={index} delay={index * 0.1}>
                <motion.div
                  whileHover={{ y: -4 }}
                  className="card-premium h-full"
                >
                  <div className="flex items-start gap-5">
                    <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <value.icon className="text-primary" size={26} />
                    </div>
                    <div>
                      <h3 className="heading-card">{value.title}</h3>
                      <p className="text-body mt-3 leading-relaxed">{value.description}</p>
                    </div>
                  </div>
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
                  <img src={petitFours} alt="Petit fours artisanaux" className="w-full h-full object-cover" loading="lazy" decoding="async" />
                </div>
                <div className="aspect-[3/4] rounded-2xl overflow-hidden mt-12">
                  <img src={macarons} alt="Macarons faits maison" className="w-full h-full object-cover" loading="lazy" decoding="async" />
                </div>
              </div>
            </RevealSection>
          </div>
        </div>
      </section>

      {/* Conclusion */}
      <section className="section-padding bg-secondary/30">
        <div className="container-narrow text-center">
          <RevealSection>
            <span className="text-caption">Bien plus qu'un service traiteur</span>
            <h2 className="heading-section mt-4">
              Une aventure culinaire à <span className="text-primary">taille humaine</span>
            </h2>
            <p className="text-body mt-8 text-lg leading-relaxed max-w-2xl mx-auto">
              O P'tit Four Truck, c'est une cuisine sincère, créative et engagée, 
              qui célèbre la fraîcheur, le goût juste et le plaisir simple de partager 
              un bon moment autour du bon.
            </p>
          </RevealSection>
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
