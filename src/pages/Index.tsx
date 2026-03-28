import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ArrowRight, Star, Award, Heart } from "lucide-react";
import { testimonials } from "@/data/testimonials";
import { RevealSection } from "@/components/RevealSection";
import { Layout } from "@/components/Layout";
import { TextReveal, SplitText } from "@/components/TextReveal";
import { MagneticButton } from "@/components/MagneticButton";
import { ImageReveal } from "@/components/ImageReveal";
import { FloatingElements } from "@/components/FloatingElements";
import { HeroParallax } from "@/components/HeroParallax";
import { CountUp } from "@/components/CountUp";
import tarteFruits from "@/assets/tarte-fruits.png";
import saintHonore from "@/assets/saint-honore.png";
import gateauMinnie from "@/assets/gateau-minnie.png";
import bucheCaramel from "@/assets/buche-caramel.png";
import misesEnBouche from "@/assets/mises-en-bouche.png";
import numberCake49 from "@/assets/number-cake-49.png";
import logoHero from "@/assets/logo-hero.png";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1] as const
    }
  }
};

const Index = () => {
  const prefersReducedMotion = useReducedMotion();

  // Animation d'entrée spectaculaire - effet "wow" cinématographique
  const logoVariants = {
    hidden: {
      opacity: 0,
      scale: 0.6,
      y: 80,
      filter: "blur(30px)",
      rotateX: 15
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      filter: "blur(0px)",
      rotateX: 0,
      transition: {
        duration: 1.6,
        ease: [0.16, 1, 0.3, 1] as const
      }
    }
  };

  // Micro-animation de respiration premium
  const breathingAnimation = prefersReducedMotion
    ? {}
    : {
        animate: {
          scale: [1, 1.02, 1],
          y: [0, -3, 0]
        },
        transition: {
          duration: 6,
          ease: [0.37, 0, 0.63, 1] as const,
          repeat: Infinity,
          repeatType: "loop" as const,
          delay: 2
        }
      };

  // Hover effet magnétique premium
  const logoHover = prefersReducedMotion
    ? {}
    : {
        whileHover: {
          scale: 1.05,
          y: -5,
          filter: "drop-shadow(0 20px 50px hsl(78 32% 59% / 0.4))"
        },
        transition: {
          duration: 0.6,
          ease: [0.22, 1, 0.36, 1] as const
        }
      };

  // Staggered reveal pour le contenu hero
  const heroContentVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.8
      }
    }
  };

  const heroItemVariants = {
    hidden: {
      opacity: 0,
      y: 40,
      filter: "blur(10px)"
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.9,
        ease: [0.16, 1, 0.3, 1] as const
      }
    }
  };

  // Animation pour les boutons CTA
  const ctaVariants = {
    hidden: {
      opacity: 0,
      y: 30,
      scale: 0.9
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1] as const
      }
    }
  };

  return (
    <Layout>
      {/* Hero Section - Full cinematic experience */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <HeroParallax src={tarteFruits} alt="Pâtisseries artisanales" />
        <FloatingElements />

        {/* Premium content container */}
        <div className="relative z-10 container-wide text-center pt-20 pb-16 md:pt-28 md:pb-20">
          
          {/* Logo central avec animation spectaculaire */}
          <motion.div
            variants={prefersReducedMotion ? {} : logoVariants}
            initial="hidden"
            animate="visible"
            className="mb-8 md:mb-12 flex justify-center perspective-1000"
          >
            <motion.div
              {...breathingAnimation}
              {...logoHover}
              className="relative group cursor-pointer"
            >
              {/* Glow layers dynamiques */}
              <motion.div 
                className="absolute inset-0 bg-gradient-radial from-primary/30 via-primary/10 to-transparent blur-[80px] scale-[2.5]"
                animate={{
                  opacity: [0.4, 0.7, 0.4],
                  scale: [2.5, 2.8, 2.5]
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <motion.div 
                className="absolute inset-0 bg-gradient-radial from-accent/20 via-transparent to-transparent blur-[60px] scale-[2]"
                animate={{
                  opacity: [0.3, 0.6, 0.3],
                  scale: [2, 2.3, 2]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5
                }}
              />
              
              {/* Shimmer effect on hover */}
              <div className="absolute inset-0 overflow-hidden rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"
                />
              </div>
              
              {/* Logo - Rendu ultra net et professionnel */}
              <img
                src={logoHero}
                alt="O P'tit Four Truck - Alicia Catala - Pâtisserie Traiteur"
                className="relative h-32 sm:h-40 md:h-52 lg:h-64 xl:h-80 w-auto max-w-[90vw] drop-shadow-[0_8px_32px_rgba(0,0,0,0.12)]"
                style={{
                  imageRendering: 'auto',
                  WebkitFontSmoothing: 'antialiased'
                }}
                decoding="async"
              />
            </motion.div>
          </motion.div>

          {/* Titre avec animation lettre par lettre */}
          <motion.div
            variants={prefersReducedMotion ? containerVariants : heroContentVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={prefersReducedMotion ? itemVariants : heroItemVariants}>
              <h1 className="heading-hero max-w-4xl mx-auto leading-[1.1]">
                <SplitText
                  text="L'art de sublimer vos"
                  delay={prefersReducedMotion ? 0 : 0.9}
                  staggerDelay={0.03}
                />
                <br />
                <span className="text-gradient inline-block mt-2">
                  <SplitText
                    text="moments précieux"
                    delay={prefersReducedMotion ? 0 : 1.2}
                    staggerDelay={0.04}
                  />
                </span>
              </h1>
            </motion.div>

            {/* Sous-titre avec glassmorphism */}
            <motion.div
              variants={prefersReducedMotion ? itemVariants : heroItemVariants}
              className="mt-8 md:mt-10"
            >
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed backdrop-blur-md bg-background/30 px-6 py-4 rounded-2xl border border-white/10 shadow-lg">
                Créations pâtissières sur-mesure et service traiteur d'exception.
                <br className="hidden sm:block" />
                <span className="text-foreground/90">Chaque gourmandise est une invitation au voyage des saveurs.</span>
              </p>
            </motion.div>

            {/* CTAs avec animations premium */}
            <motion.div
              variants={prefersReducedMotion ? itemVariants : ctaVariants}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10 md:mt-14"
            >
              <MagneticButton>
                <Link 
                  to="/devis" 
                  className="btn-primary flex items-center gap-3 group text-base md:text-lg px-8 py-4 shadow-lg hover:shadow-xl transition-shadow"
                >
                  <span>Demander un devis</span>
                  <motion.span 
                    className="inline-block"
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <ArrowRight size={20} />
                  </motion.span>
                </Link>
              </MagneticButton>
              <MagneticButton>
                <Link 
                  to="/galerie" 
                  className="btn-secondary text-base md:text-lg px-8 py-4 backdrop-blur-sm"
                >
                  Découvrir nos créations
                </Link>
              </MagneticButton>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator élégant */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.2, duration: 0.8 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div 
            className="flex flex-col items-center gap-3 cursor-pointer group"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground group-hover:text-foreground transition-colors">
              Découvrir
            </span>
            <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 group-hover:border-primary/50 transition-colors flex justify-center pt-2">
              <motion.div 
                className="w-1.5 h-1.5 rounded-full bg-primary"
                animate={{ y: [0, 12, 0], opacity: [1, 0.5, 1] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Savoir-faire Section */}
      <section className="section-padding bg-background relative overflow-hidden">
        <FloatingElements />
        <div className="container-wide relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <RevealSection direction="left">
              <div className="relative">
                <ImageReveal 
                  src={saintHonore}
                  alt="Alicia Catala, chef pâtissière"
                  className="aspect-[3/4] rounded-3xl"
                  direction="left"
                />
                <motion.div 
                  initial={{ opacity: 0, scale: 0.8, x: 20 }}
                  whileInView={{ opacity: 1, scale: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.8, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute -bottom-6 -right-6 bg-accent rounded-2xl p-6 shadow-[var(--shadow-elevated)]"
                >
                  <p className="font-display text-3xl text-foreground">
                    <CountUp value={5} prefix="+" suffix="" />
                    <span className="text-lg ml-1">ans</span>
                  </p>
                  <p className="text-sm text-muted-foreground">de passion</p>
                </motion.div>
              </div>
            </RevealSection>

            <div className="space-y-6">
              <TextReveal>
                <span className="text-caption">Notre histoire</span>
              </TextReveal>
              <TextReveal delay={0.1}>
                <h2 className="heading-section mt-4">
                  Une passion guidée par le <span className="text-primary">sens</span>
                </h2>
              </TextReveal>
              <RevealSection delay={0.3}>
                <p className="text-body">
                  Derrière O P'tit Four Truck, il y a Alicia. Une jeune entrepreneuse animée depuis toujours 
                  par la pâtisserie et la cuisine, mais surtout par l'envie de faire les choses avec sens.
                </p>
              </RevealSection>
              <RevealSection delay={0.4}>
                <p className="text-body">
                  L'idée n'est pas née d'une tendance, mais d'un besoin profond : créer un univers culinaire 
                  où les saveurs authentiques se rencontrent, se respectent et se partagent.
                </p>
              </RevealSection>
              <RevealSection delay={0.5}>
                <MagneticButton>
                  <Link
                    to="/savoir-faire"
                    className="inline-flex items-center gap-2 mt-4 text-primary font-medium link-underline group"
                  >
                    En savoir plus sur notre histoire
                    <motion.span
                      className="group-hover:translate-x-1 transition-transform"
                    >
                      <ArrowRight size={18} />
                    </motion.span>
                  </Link>
                </MagneticButton>
              </RevealSection>
            </div>
          </div>
        </div>
      </section>

      {/* Prestations Preview */}
      <section className="section-padding bg-secondary/50 relative overflow-hidden">
        <div className="container-wide">
          <RevealSection className="text-center max-w-2xl mx-auto">
            <TextReveal>
              <span className="text-caption">Nos prestations</span>
            </TextReveal>
            <TextReveal delay={0.1}>
              <h2 className="heading-section mt-4">
                Des créations pour chaque <span className="text-primary">occasion</span>
              </h2>
            </TextReveal>
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-body mt-6"
            >
              Mariages, anniversaires, événements d'entreprise ou moments du quotidien : 
              nous créons des gourmandises sur-mesure adaptées à vos envies.
            </motion.p>
          </RevealSection>

          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {[
              {
                image: gateauMinnie,
                title: "Événements privés",
                description: "Mariages, anniversaires, baptêmes... Sublimez vos moments précieux.",
              },
              {
                image: misesEnBouche,
                title: "Événements professionnels",
                description: "Séminaires, inaugurations, cocktails... Impressionnez vos invités.",
              },
              {
                image: bucheCaramel,
                title: "Prestations sur-mesure",
                description: "Des créations uniques pensées selon vos goûts et vos envies.",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="group cursor-pointer"
              >
                <motion.div
                  whileHover={{ y: -12 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="aspect-[4/5] rounded-2xl overflow-hidden mb-6 relative">
                    <motion.img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    />
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    />
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileHover={{ opacity: 1, y: 0 }}
                      className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-500"
                    >
                      <span className="text-white text-sm font-medium">Découvrir →</span>
                    </motion.div>
                  </div>
                  <h3 className="heading-card group-hover:text-primary transition-colors duration-300">{item.title}</h3>
                  <p className="text-body mt-2">{item.description}</p>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>

          <RevealSection delay={0.5} className="text-center mt-16">
            <MagneticButton>
              <Link to="/prestations" className="btn-primary inline-flex items-center gap-2">
                Découvrir toutes nos prestations
                <ArrowRight size={18} />
              </Link>
            </MagneticButton>
          </RevealSection>
        </div>
      </section>

      {/* Gallery Preview - Masonry Style */}
      <section className="section-padding relative overflow-hidden">
        <FloatingElements />
        <div className="container-wide relative z-10">
          <RevealSection className="text-center max-w-2xl mx-auto">
            <TextReveal>
              <span className="text-caption">Galerie gourmande</span>
            </TextReveal>
            <TextReveal delay={0.1}>
              <h2 className="heading-section mt-4">
                Laissez-vous <span className="text-primary">séduire</span>
              </h2>
            </TextReveal>
          </RevealSection>

          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {[
              { image: tarteFruits, span: "md:col-span-2 md:row-span-2" },
              { image: numberCake49, span: "" },
              { image: bucheCaramel, span: "" },
              { image: gateauMinnie, span: "md:col-span-2" },
              { image: misesEnBouche, span: "" },
              { image: saintHonore, span: "" },
            ].map((item, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className={`overflow-hidden rounded-2xl ${item.span} group cursor-pointer`}
              >
                <motion.div
                  className="relative w-full h-full aspect-square"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  <motion.img
                    src={item.image}
                    alt="Création pâtissière"
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  />
                  <motion.div 
                    className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  />
                </motion.div>
              </motion.div>
            ))}
          </motion.div>

          <RevealSection delay={0.6} className="text-center mt-12">
            <MagneticButton>
              <Link
                to="/galerie"
                className="inline-flex items-center gap-2 text-primary font-medium link-underline group"
              >
                Voir toute la galerie
                <motion.span className="group-hover:translate-x-1 transition-transform">
                  <ArrowRight size={18} />
                </motion.span>
              </Link>
            </MagneticButton>
          </RevealSection>
        </div>
      </section>

      {/* Testimonial Preview */}
      <section className="section-padding bg-primary/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-dots opacity-30" />
        <div className="container-narrow text-center relative z-10">
          <RevealSection>
            <TextReveal>
              <span className="text-caption">Témoignages</span>
            </TextReveal>
            <motion.blockquote 
              className="mt-8"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.div
                className="flex justify-center gap-1 mb-6"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
              >
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6 + i * 0.1, type: "spring", stiffness: 300 }}
                  >
                    <Star className="w-6 h-6 fill-primary text-primary" />
                  </motion.div>
                ))}
              </motion.div>
              <p className="font-display text-2xl md:text-3xl lg:text-4xl italic leading-relaxed text-foreground">
                "Alicia a sublimé notre mariage avec ses créations. Chaque pâtisserie était une œuvre d'art, 
                et nos invités en parlent encore !"
              </p>
              <footer className="mt-8">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.8 }}
                >
                  <p className="font-medium text-foreground">Marie & Thomas</p>
                  <p className="text-muted-foreground text-sm">Mariage - Juin 2024</p>
                </motion.div>
              </footer>
            </motion.blockquote>
          </RevealSection>

          <RevealSection delay={0.3} className="mt-12">
            <MagneticButton>
              <Link
                to="/avis"
                className="inline-flex items-center gap-2 text-primary font-medium link-underline group"
              >
                Lire tous les avis
                <motion.span className="group-hover:translate-x-1 transition-transform">
                  <ArrowRight size={18} />
                </motion.span>
              </Link>
            </MagneticButton>
          </RevealSection>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-foreground text-background relative overflow-hidden">
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-primary/10 blur-[100px]" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full bg-accent/10 blur-[100px]" />
        </motion.div>
        
        <div className="container-narrow text-center relative z-10">
          <RevealSection>
            <TextReveal>
              <span className="text-caption text-primary">Prêt à vous régaler ?</span>
            </TextReveal>
            <TextReveal delay={0.1}>
              <h2 className="heading-section mt-4 text-background">
                Créons ensemble votre <span className="text-primary">moment parfait</span>
              </h2>
            </TextReveal>
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-background/70 mt-6 text-lg max-w-xl mx-auto"
            >
              Partagez-nous votre projet et recevez un devis personnalisé sous 48h. 
              Nous avons hâte de contribuer à votre événement.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              <MagneticButton strength={0.4}>
                <Link to="/devis" className="btn-primary mt-10 inline-flex items-center gap-2 group">
                  Demander un devis gratuit
                  <motion.span
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <ArrowRight size={18} />
                  </motion.span>
                </Link>
              </MagneticButton>
            </motion.div>
          </RevealSection>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
