import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { RevealSection } from "@/components/RevealSection";
import { ParallaxImage } from "@/components/ParallaxImage";
import { Layout } from "@/components/Layout";
import heroPastries from "@/assets/hero-pastries.jpg";
import chefPortrait from "@/assets/chef-portrait.jpg";
import petitFours from "@/assets/petit-fours.jpg";
import weddingCake from "@/assets/wedding-cake.jpg";
import cateringSpread from "@/assets/catering-spread.jpg";
import macarons from "@/assets/macarons.jpg";

const Index = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src={heroPastries}
            alt="Pâtisseries artisanales"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/20 to-background" />
        </div>

        {/* Content */}
        <div className="relative z-10 container-wide text-center pt-32 pb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="text-caption inline-flex items-center gap-2 mb-6">
              <Sparkles size={16} />
              Pâtissier – Traiteur artisanal
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="heading-hero max-w-4xl mx-auto"
          >
            L'art de sublimer vos{" "}
            <span className="text-gradient">moments précieux</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-body max-w-2xl mx-auto mt-8 text-lg"
          >
            Créations pâtissières sur-mesure et service traiteur d'exception. 
            Chaque gourmandise est une invitation au voyage des saveurs.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12"
          >
            <Link to="/devis" className="btn-primary flex items-center gap-2">
              Demander un devis
              <ArrowRight size={18} />
            </Link>
            <Link to="/galerie" className="btn-secondary">
              Découvrir nos créations
            </Link>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-6 h-10 border-2 border-foreground/30 rounded-full flex items-start justify-center p-1"
          >
            <motion.div className="w-1.5 h-2.5 bg-primary rounded-full" />
          </motion.div>
        </motion.div>
      </section>

      {/* Savoir-faire Section */}
      <section className="section-padding bg-background">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <RevealSection direction="left">
              <div className="relative">
                <div className="aspect-[3/4] rounded-3xl overflow-hidden">
                  <img
                    src={chefPortrait}
                    alt="Alicia Catala, chef pâtissière"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 bg-accent rounded-2xl p-6 shadow-[var(--shadow-elevated)]">
                  <p className="font-display text-2xl text-foreground">+10 ans</p>
                  <p className="text-sm text-muted-foreground">de passion</p>
                </div>
              </div>
            </RevealSection>

            <RevealSection direction="right" delay={0.2}>
              <span className="text-caption">Notre histoire</span>
              <h2 className="heading-section mt-4">
                Un savoir-faire artisanal transmis avec <span className="text-primary">passion</span>
              </h2>
              <p className="text-body mt-8">
                Derrière O P'tit Four Truck, il y a Alicia Catala, artisane passionnée qui a fait de la pâtisserie 
                bien plus qu'un métier : une véritable vocation. Chaque création est le fruit d'un travail minutieux, 
                d'ingrédients soigneusement sélectionnés et d'un amour sincère pour l'art culinaire.
              </p>
              <p className="text-body mt-4">
                Notre engagement ? Vous offrir des moments de pur bonheur gustatif, que ce soit pour 
                vos événements familiaux ou vos réceptions professionnelles.
              </p>
              <Link
                to="/savoir-faire"
                className="inline-flex items-center gap-2 mt-8 text-primary font-medium link-underline"
              >
                En savoir plus sur notre histoire
                <ArrowRight size={18} />
              </Link>
            </RevealSection>
          </div>
        </div>
      </section>

      {/* Prestations Preview */}
      <section className="section-padding bg-secondary/50">
        <div className="container-wide">
          <RevealSection className="text-center max-w-2xl mx-auto">
            <span className="text-caption">Nos prestations</span>
            <h2 className="heading-section mt-4">
              Des créations pour chaque <span className="text-primary">occasion</span>
            </h2>
            <p className="text-body mt-6">
              Mariages, anniversaires, événements d'entreprise ou moments du quotidien : 
              nous créons des gourmandises sur-mesure adaptées à vos envies.
            </p>
          </RevealSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
            {[
              {
                image: weddingCake,
                title: "Événements privés",
                description: "Mariages, anniversaires, baptêmes... Sublimez vos moments précieux.",
              },
              {
                image: cateringSpread,
                title: "Événements professionnels",
                description: "Séminaires, inaugurations, cocktails... Impressionnez vos invités.",
              },
              {
                image: petitFours,
                title: "Prestations sur-mesure",
                description: "Des créations uniques pensées selon vos goûts et vos envies.",
              },
            ].map((item, index) => (
              <RevealSection key={index} delay={index * 0.15}>
                <motion.div
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="group"
                >
                  <div className="aspect-[4/5] rounded-2xl overflow-hidden mb-6">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <h3 className="heading-card">{item.title}</h3>
                  <p className="text-body mt-2">{item.description}</p>
                </motion.div>
              </RevealSection>
            ))}
          </div>

          <RevealSection delay={0.5} className="text-center mt-16">
            <Link to="/prestations" className="btn-primary inline-flex items-center gap-2">
              Découvrir toutes nos prestations
              <ArrowRight size={18} />
            </Link>
          </RevealSection>
        </div>
      </section>

      {/* Gallery Preview */}
      <section className="section-padding">
        <div className="container-wide">
          <RevealSection className="text-center max-w-2xl mx-auto">
            <span className="text-caption">Galerie gourmande</span>
            <h2 className="heading-section mt-4">
              Laissez-vous <span className="text-primary">séduire</span>
            </h2>
          </RevealSection>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-12">
            {[heroPastries, macarons, petitFours, weddingCake, cateringSpread, chefPortrait].map(
              (image, index) => (
                <RevealSection key={index} delay={index * 0.1}>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.4 }}
                    className={`overflow-hidden rounded-2xl ${
                      index === 0 || index === 5 ? "aspect-square md:aspect-[4/3]" : "aspect-square"
                    }`}
                  >
                    <img
                      src={image}
                      alt="Création pâtissière"
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                </RevealSection>
              )
            )}
          </div>

          <RevealSection delay={0.6} className="text-center mt-12">
            <Link
              to="/galerie"
              className="inline-flex items-center gap-2 text-primary font-medium link-underline"
            >
              Voir toute la galerie
              <ArrowRight size={18} />
            </Link>
          </RevealSection>
        </div>
      </section>

      {/* Testimonial Preview */}
      <section className="section-padding bg-primary/5">
        <div className="container-narrow text-center">
          <RevealSection>
            <span className="text-caption">Témoignages</span>
            <blockquote className="mt-8">
              <p className="font-display text-2xl md:text-3xl lg:text-4xl italic leading-relaxed text-foreground">
                "Alicia a sublimé notre mariage avec ses créations. Chaque pâtisserie était une œuvre d'art, 
                et nos invités en parlent encore !"
              </p>
              <footer className="mt-8">
                <p className="font-medium text-foreground">Marie & Thomas</p>
                <p className="text-muted-foreground text-sm">Mariage - Juin 2024</p>
              </footer>
            </blockquote>
          </RevealSection>

          <RevealSection delay={0.3} className="mt-12">
            <Link
              to="/avis"
              className="inline-flex items-center gap-2 text-primary font-medium link-underline"
            >
              Lire tous les avis
              <ArrowRight size={18} />
            </Link>
          </RevealSection>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-foreground text-background">
        <div className="container-narrow text-center">
          <RevealSection>
            <span className="text-caption text-primary">Prêt à vous régaler ?</span>
            <h2 className="heading-section mt-4 text-background">
              Créons ensemble votre <span className="text-primary">moment parfait</span>
            </h2>
            <p className="text-background/70 mt-6 text-lg max-w-xl mx-auto">
              Partagez-nous votre projet et recevez un devis personnalisé sous 48h. 
              Nous avons hâte de contribuer à votre événement.
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

export default Index;
