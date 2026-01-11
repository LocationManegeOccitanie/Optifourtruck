import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Sparkles, Star, Award, Heart } from "lucide-react";
import { RevealSection } from "@/components/RevealSection";
import { Layout } from "@/components/Layout";
import { TextReveal, SplitText } from "@/components/TextReveal";
import { MagneticButton } from "@/components/MagneticButton";
import { ImageReveal } from "@/components/ImageReveal";
import { FloatingElements } from "@/components/FloatingElements";
import { HeroParallax } from "@/components/HeroParallax";
import { CountUp } from "@/components/CountUp";
import heroPastries from "@/assets/hero-pastries.jpg";
import chefPortrait from "@/assets/chef-portrait.jpg";
import petitFours from "@/assets/petit-fours.jpg";
import weddingCake from "@/assets/wedding-cake.jpg";
import cateringSpread from "@/assets/catering-spread.jpg";
import macarons from "@/assets/macarons.jpg";
import { useRef } from "react";

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
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"]
  });
  
  const heroTextY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <Layout>
      {/* Hero Section */}
      <section ref={targetRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <HeroParallax src={heroPastries} alt="Pâtisseries artisanales" />
        <FloatingElements />

        {/* Content */}
        <motion.div 
          className="relative z-10 container-wide text-center pt-32 pb-20"
          style={{ y: heroTextY, opacity: heroOpacity }}
        >
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants}>
              <motion.span 
                className="text-caption inline-flex items-center gap-2 mb-6 backdrop-blur-sm bg-background/30 px-4 py-2 rounded-full"
                whileHover={{ scale: 1.05 }}
              >
                <motion.span
                  animate={{ rotate: [0, 15, -15, 0] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                >
                  <Sparkles size={16} />
                </motion.span>
                Pâtissier – Traiteur artisanal
              </motion.span>
            </motion.div>

            <motion.div variants={itemVariants}>
              <h1 className="heading-hero max-w-4xl mx-auto">
                <SplitText 
                  text="L'art de sublimer vos" 
                  delay={0.5}
                  staggerDelay={0.04}
                />
                <br />
                <span className="text-gradient">
                  <SplitText 
                    text="moments précieux" 
                    delay={0.8}
                    staggerDelay={0.05}
                  />
                </span>
              </h1>
            </motion.div>

            <motion.p
              variants={itemVariants}
              className="text-body max-w-2xl mx-auto mt-8 text-lg backdrop-blur-sm bg-background/20 p-4 rounded-2xl"
            >
              Créations pâtissières sur-mesure et service traiteur d'exception. 
              Chaque gourmandise est une invitation au voyage des saveurs.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12"
            >
              <MagneticButton>
                <Link to="/devis" className="btn-primary flex items-center gap-2 group">
                  Demander un devis
                  <motion.span
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <ArrowRight size={18} />
                  </motion.span>
                </Link>
              </MagneticButton>
              <MagneticButton>
                <Link to="/galerie" className="btn-secondary">
                  Découvrir nos créations
                </Link>
              </MagneticButton>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center gap-2"
          >
            <span className="text-xs uppercase tracking-widest text-muted-foreground">Découvrir</span>
            <div className="w-6 h-10 border-2 border-foreground/30 rounded-full flex items-start justify-center p-1">
              <motion.div 
                className="w-1.5 h-2.5 bg-primary rounded-full"
                animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-secondary/30 relative overflow-hidden">
        <div className="container-wide">
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {[
              { value: 10, suffix: "+", label: "Années d'expérience", icon: Award },
              { value: 500, suffix: "+", label: "Événements réalisés", icon: Star },
              { value: 98, suffix: "%", label: "Clients satisfaits", icon: Heart },
              { value: 1000, suffix: "+", label: "Créations uniques", icon: Sparkles },
            ].map((stat, index) => (
              <motion.div 
                key={index}
                variants={itemVariants}
                className="text-center group"
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="inline-flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-primary/10 text-primary"
                >
                  <stat.icon size={24} />
                </motion.div>
                <div className="font-display text-4xl md:text-5xl font-semibold text-foreground">
                  <CountUp value={stat.value} suffix={stat.suffix} />
                </div>
                <p className="text-muted-foreground text-sm mt-2">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Savoir-faire Section */}
      <section className="section-padding bg-background relative overflow-hidden">
        <FloatingElements />
        <div className="container-wide relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <RevealSection direction="left">
              <div className="relative">
                <ImageReveal 
                  src={chefPortrait}
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
                    <CountUp value={10} prefix="+" suffix="" />
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
                  Un savoir-faire artisanal transmis avec <span className="text-primary">passion</span>
                </h2>
              </TextReveal>
              <RevealSection delay={0.3}>
                <p className="text-body">
                  Derrière O P'tit Four Truck, il y a Alicia Catala, artisane passionnée qui a fait de la pâtisserie 
                  bien plus qu'un métier : une véritable vocation. Chaque création est le fruit d'un travail minutieux, 
                  d'ingrédients soigneusement sélectionnés et d'un amour sincère pour l'art culinaire.
                </p>
              </RevealSection>
              <RevealSection delay={0.4}>
                <p className="text-body">
                  Notre engagement ? Vous offrir des moments de pur bonheur gustatif, que ce soit pour 
                  vos événements familiaux ou vos réceptions professionnelles.
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
              { image: heroPastries, span: "md:col-span-2 md:row-span-2" },
              { image: macarons, span: "" },
              { image: petitFours, span: "" },
              { image: weddingCake, span: "md:col-span-2" },
              { image: cateringSpread, span: "" },
              { image: chefPortrait, span: "" },
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
