import { Link } from "react-router-dom";
import { Instagram, Facebook, Mail, Phone, MapPin, Send, Heart } from "lucide-react";
import { RevealSection } from "./RevealSection";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import logoAlicia from "@/assets/logo-alicia.svg";

export const Footer = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [email, setEmail] = useState("");
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  // Parallax effect
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["20%", "0%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0.5, 1]);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setTimeout(() => {
        setEmail("");
        setIsSubscribed(false);
      }, 3000);
    }
  };

  const socialLinks = [
    {
      name: "Instagram",
      icon: Instagram,
      href: "https://www.instagram.com/o_ptit_four_truck_by_alicia",
      color: "hover:bg-gradient-to-br hover:from-purple-500 hover:via-pink-500 hover:to-orange-400",
    },
    {
      name: "Facebook",
      icon: Facebook,
      href: "https://www.facebook.com/alicia.ctl.1",
      color: "hover:bg-[#1877F2]",
    },
  ];

  return (
    <footer ref={containerRef} className="relative overflow-hidden">
      {/* Parallax Background Layer */}
      <motion.div
        className="absolute inset-0 bg-foreground"
        style={{ y: backgroundY, opacity }}
      />
      
      {/* Decorative gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-foreground via-foreground/95 to-foreground/90" />
      
      {/* Floating decorative elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      
      <div className="relative z-10 text-background">
        <div className="container-wide section-padding">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
            {/* Brand with Logo */}
            <RevealSection className="lg:col-span-1">
              <div className="flex flex-col items-start">
                <Link to="/" className="block mb-6 group">
                  <motion.img 
                    src={logoAlicia} 
                    alt="O P'tit Four Truck - Alicia Catala" 
                    className="h-16 md:h-20 w-auto brightness-0 invert opacity-90"
                    whileHover={{ scale: 1.05, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </Link>
                <p className="text-background/70 text-sm leading-relaxed max-w-xs">
                  Pâtisserie artisanale & traiteur. Des créations sur-mesure pour sublimer vos moments précieux.
                </p>
                
                {/* Made with love badge */}
                <motion.div 
                  className="mt-6 flex items-center gap-2 text-xs text-background/50"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <span>Fait avec</span>
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <Heart size={12} className="text-accent fill-accent" />
                  </motion.div>
                  <span>en Ariège</span>
                </motion.div>
              </div>
            </RevealSection>

            {/* Navigation */}
            <RevealSection delay={0.1}>
              <h4 className="text-caption text-primary mb-6">Navigation</h4>
              <ul className="space-y-3">
                {[
                  { name: "Accueil", path: "/" },
                  { name: "Savoir-Faire", path: "/savoir-faire" },
                  { name: "Prestations", path: "/prestations" },
                  { name: "Galerie", path: "/galerie" },
                  { name: "Avis Clients", path: "/avis" },
                ].map((link, index) => (
                  <motion.li 
                    key={link.path}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      to={link.path}
                      className="text-background/70 hover:text-primary transition-colors duration-300 text-sm inline-block group"
                    >
                      <span className="relative">
                        {link.name}
                        <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-primary transition-all duration-300 group-hover:w-full" />
                      </span>
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </RevealSection>

            {/* Contact with real info */}
            <RevealSection delay={0.2}>
              <h4 className="text-caption text-primary mb-6">Contact</h4>
              <ul className="space-y-4">
                <motion.li 
                  className="flex items-start gap-3 group cursor-pointer"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <Phone size={18} className="text-primary mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform" />
                  <a href="tel:0656829711" className="text-background/70 text-sm hover:text-primary transition-colors">
                    06 56 82 97 11
                  </a>
                </motion.li>
                <motion.li 
                  className="flex items-start gap-3 group cursor-pointer"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <Mail size={18} className="text-primary mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform" />
                  <a href="mailto:contact@optifourtruck.fr" className="text-background/70 text-sm hover:text-primary transition-colors break-all">
                    contact@optifourtruck.fr
                  </a>
                </motion.li>
                <motion.li 
                  className="flex items-start gap-3 group"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <MapPin size={18} className="text-primary mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform" />
                  <span className="text-background/70 text-sm">
                    Saverdun (09700)<br />
                    <span className="text-background/50">Ariège, Occitanie</span>
                  </span>
                </motion.li>
              </ul>
            </RevealSection>

            {/* Newsletter & Social */}
            <RevealSection delay={0.3}>
              <h4 className="text-caption text-primary mb-6">Restez informé</h4>
              
              {/* Animated Newsletter Input */}
              <form onSubmit={handleNewsletterSubmit} className="mb-8">
                <div className={`relative transition-all duration-500 ${isEmailFocused ? 'scale-[1.02]' : ''}`}>
                  <motion.div
                    className="absolute inset-0 rounded-full bg-primary/20"
                    initial={false}
                    animate={{
                      scale: isEmailFocused ? 1.05 : 1,
                      opacity: isEmailFocused ? 1 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                  />
                  <div className="relative flex items-center">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      onFocus={() => setIsEmailFocused(true)}
                      onBlur={() => setIsEmailFocused(false)}
                      placeholder="Votre email"
                      className="w-full bg-background/10 border border-background/20 rounded-full py-3 pl-4 pr-12 text-sm text-background placeholder:text-background/40 focus:outline-none focus:border-primary/50 transition-all duration-300"
                    />
                    <motion.button
                      type="submit"
                      className="absolute right-1.5 w-9 h-9 rounded-full bg-primary flex items-center justify-center text-primary-foreground"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {isSubscribed ? (
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="text-xs"
                        >
                          ✓
                        </motion.span>
                      ) : (
                        <Send size={14} />
                      )}
                    </motion.button>
                  </div>
                </div>
                {isSubscribed && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-xs text-primary mt-2 text-center"
                  >
                    Merci de votre inscription !
                  </motion.p>
                )}
              </form>

              {/* Animated Social Icons */}
              <h4 className="text-caption text-primary mb-4">Suivez-nous</h4>
              <div className="flex gap-3">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-12 h-12 rounded-full bg-background/10 flex items-center justify-center text-background/70 transition-all duration-300 ${social.color} hover:text-white hover:shadow-lg`}
                    aria-label={social.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ 
                      scale: 1.15,
                      rotate: [0, -10, 10, 0],
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <social.icon size={20} />
                  </motion.a>
                ))}
              </div>

              {/* CTA Button */}
              <motion.div 
                className="mt-8"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link to="/devis" className="btn-primary text-sm py-3 px-6 inline-block">
                  Demander un devis
                </Link>
              </motion.div>
            </RevealSection>
          </div>

          {/* Bottom */}
          <motion.div 
            className="border-t border-background/10 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <p className="text-background/50 text-xs">
              © {new Date().getFullYear()} O P'tit Four Truck - Alicia Catala. Tous droits réservés.
            </p>
            <p className="text-background/50 text-xs">
              Artisan pâtissier-traiteur • Saverdun, Ariège
            </p>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};