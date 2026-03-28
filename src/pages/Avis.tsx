import { Layout } from "@/components/Layout";
import { RevealSection } from "@/components/RevealSection";
import { TestimonialMarquee } from "@/components/premium/TestimonialMarquee";
import { AnimatedStars } from "@/components/premium/AnimatedStars";
import { motion } from "framer-motion";
import { Users, Heart, Award, Star, Quote, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { CountUp } from "@/components/CountUp";
import { testimonials } from "@/data/testimonials";

const stats = [
  { icon: Users, value: 200, suffix: "+", label: "Clients satisfaits" },
  { icon: Heart, value: 500, suffix: "+", label: "Événements sublimés" },
  { icon: Award, value: 5, suffix: "/5", label: "Note moyenne" },
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
            
            {/* Average rating display */}
            <div className="mt-10 flex items-center justify-center gap-4">
              <AnimatedStars rating={5} size={24} staggerDelay={0.12} />
              <span className="text-2xl font-display text-foreground">5.0</span>
              <span className="text-muted-foreground">sur 5</span>
            </div>
          </RevealSection>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-secondary/20">
        <div className="container-wide">
          <div className="grid grid-cols-3 gap-6 md:gap-12">
            {stats.map((stat, index) => (
              <RevealSection key={index} delay={index * 0.1}>
                <div className="text-center">
                  <stat.icon className="w-8 h-8 md:w-10 md:h-10 text-primary mx-auto mb-3" />
                  <div className="text-2xl md:text-4xl font-display text-foreground">
                    <CountUp value={stat.value} duration={2} suffix={stat.suffix} />
                  </div>
                  <p className="text-xs md:text-sm text-muted-foreground mt-1">
                    {stat.label}
                  </p>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* Infinite Testimonial Carousel - Row 1 */}
      <section className="section-padding bg-background overflow-hidden">
        <div className="container-wide mb-12">
          <RevealSection>
            <h2 className="heading-section text-center">
              Ils nous font <span className="text-gradient">confiance</span>
            </h2>
          </RevealSection>
        </div>

        {/* First row - scrolling left */}
        <TestimonialMarquee
          testimonials={testimonials.slice(0, 5)}
          speed={20}
          direction="left"
          className="mb-6"
        />

        {/* Second row - scrolling right */}
        <TestimonialMarquee
          testimonials={testimonials.slice(5)}
          speed={15}
          direction="right"
        />
      </section>

      {/* Featured Quote from Alicia */}
      <section className="section-padding bg-primary/5">
        <div className="container-narrow text-center">
          <RevealSection>
            <motion.div
              animate={{ 
                rotate: [0, 5, -5, 0],
                scale: [1, 1.05, 1],
              }}
              transition={{ 
                duration: 4, 
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Quote className="text-primary/30 mx-auto mb-8" size={48} />
            </motion.div>
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
