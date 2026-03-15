import { Layout } from "@/components/Layout";
import { RevealSection } from "@/components/RevealSection";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { Lightbox } from "@/components/premium/Lightbox";
import { TiltCard } from "@/components/premium/TiltCard";
import heroPastries from "@/assets/hero-pastries.jpg";
import chefPortrait from "@/assets/chef-portrait.jpg";
import petitFours from "@/assets/petit-fours.jpg";
import weddingCake from "@/assets/wedding-cake.jpg";
import cateringSpread from "@/assets/catering-spread.jpg";
import macarons from "@/assets/macarons.jpg";
import galetteDesRois from "@/assets/galette-des-rois.jpg";
import bucheCaramel from "@/assets/buche-caramel.png";
import plateauCharcuterie from "@/assets/plateau-charcuterie.jpg";
import tarteFruits from "@/assets/tarte-fruits.png";
import lettreFruits from "@/assets/lettre-fruits.png";
import gateauMinnie from "@/assets/gateau-minnie.png";
import saintHonore from "@/assets/saint-honore.png";
import coeurFruits from "@/assets/coeur-fruits.png";
import numberCake49 from "@/assets/number-cake-49.png";
import bavaroisFruitsRouges from "@/assets/bavarois-fruits-rouges.png";

const categories = [
  { id: "all", name: "Tout" },
  { id: "patisserie", name: "Pâtisserie" },
  { id: "traiteur", name: "Traiteur" },
  { id: "evenements", name: "Événements" },
];

const galleryImages = [
  { src: heroPastries, alt: "Assortiment de pâtisseries", category: "patisserie" },
  { src: weddingCake, alt: "Wedding cake", category: "evenements" },
  { src: tarteFruits, alt: "Tarte aux fruits frais de saison", category: "patisserie" },
  { src: cateringSpread, alt: "Buffet traiteur", category: "traiteur" },
  { src: gateauMinnie, alt: "Gâteau d'anniversaire thème Minnie", category: "evenements" },
  { src: macarons, alt: "Macarons artisanaux", category: "patisserie" },
  { src: numberCake49, alt: "Number cake 49 aux macarons et chocolat blanc", category: "evenements" },
  { src: plateauCharcuterie, alt: "Plateau charcuterie et fromages", category: "traiteur" },
  { src: saintHonore, alt: "Saint-Honoré caramel et crème vanille", category: "patisserie" },
  { src: bucheCaramel, alt: "Bûche glacée caramel et fruits rouges", category: "patisserie" },
  { src: bavaroisFruitsRouges, alt: "Bavarois glacé aux fruits rouges et chocolat", category: "patisserie" },
  { src: coeurFruits, alt: "Cœur number cake aux fruits rouges et macarons", category: "patisserie" },
  { src: cateringSpread, alt: "Réception", category: "traiteur" },
  { src: lettreFruits, alt: "Lettre en biscuit aux fruits exotiques", category: "patisserie" },
  { src: chefPortrait, alt: "Alicia en cuisine", category: "evenements" },
  { src: petitFours, alt: "Petit fours", category: "patisserie" },
  { src: macarons, alt: "Macarons colorés", category: "patisserie" },
  { src: galetteDesRois, alt: "Galette des rois artisanale", category: "patisserie" },
  { src: heroPastries, alt: "Créations sucrées", category: "patisserie" },
];

const Galerie = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const filteredImages =
    activeCategory === "all"
      ? galleryImages
      : galleryImages.filter((img) => img.category === activeCategory);

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  return (
    <Layout>
      {/* Hero */}
      <section className="pt-32 pb-16 bg-background">
        <div className="container-wide text-center">
          <RevealSection>
            <span className="text-caption">Galerie gourmande</span>
            <h1 className="heading-hero mt-4 max-w-4xl mx-auto">
              Laissez-vous{" "}
              <span className="text-gradient">séduire</span>
            </h1>
            <p className="text-body mt-8 max-w-2xl mx-auto text-lg">
              Découvrez nos créations à travers cette galerie qui témoigne 
              de notre savoir-faire et de notre passion pour l'artisanat.
            </p>
          </RevealSection>
        </div>
      </section>

      {/* Filters */}
      <section className="pb-8 bg-background">
        <div className="container-wide">
          <RevealSection>
            <div className="flex flex-wrap justify-center gap-4">
              {categories.map((category) => (
                <motion.button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                    activeCategory === category.id
                      ? "bg-primary text-primary-foreground shadow-[var(--shadow-glow-sage)]"
                      : "bg-secondary text-muted-foreground hover:bg-secondary/80"
                  }`}
                >
                  {category.name}
                </motion.button>
              ))}
            </div>
          </RevealSection>
        </div>
      </section>

      {/* Gallery Grid with TiltCards */}
      <section className="section-padding pt-8">
        <div className="container-wide">
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredImages.map((image, index) => (
              <motion.div
                key={`${image.src}-${index}`}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <TiltCard 
                  className="perspective-1000 cursor-pointer"
                  intensity={8}
                  scaleOnHover={1.02}
                >
                  <motion.div
                    onClick={() => openLightbox(index)}
                    className="group relative aspect-square rounded-2xl overflow-hidden"
                  >
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                      <p className="text-background font-medium">{image.alt}</p>
                    </div>
                  </motion.div>
                </TiltCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Lightbox */}
      <Lightbox
        images={filteredImages}
        currentIndex={currentImageIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onNavigate={setCurrentImageIndex}
      />

      {/* CTA */}
      <section className="section-padding bg-accent/30">
        <div className="container-narrow text-center">
          <RevealSection>
            <span className="text-caption">Envie d'en voir plus ?</span>
            <h2 className="heading-section mt-4">
              Créons votre <span className="text-primary">prochaine œuvre</span>
            </h2>
            <p className="text-body mt-6 max-w-xl mx-auto">
              Chaque création est unique et réalisée sur-mesure. Partagez-nous 
              votre projet pour recevoir un devis personnalisé.
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

export default Galerie;
