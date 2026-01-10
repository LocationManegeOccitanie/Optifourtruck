import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import logo from "@/assets/logo.png";

const navLinks = [
  { name: "Accueil", path: "/" },
  { name: "Savoir-Faire", path: "/savoir-faire" },
  { name: "Prestations", path: "/prestations" },
  { name: "Galerie", path: "/galerie" },
  { name: "Avis Clients", path: "/avis" },
];

// Respect reduced motion preference
const useReducedMotion = () => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);
    
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);
  
  return prefersReducedMotion;
};

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  // Logo animation variants with accessibility
  const logoVariants = {
    initial: prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { duration: prefersReducedMotion ? 0 : 0.7, ease: [0.22, 1, 0.36, 1] as const }
    }
  };

  const logoHoverVariants = prefersReducedMotion ? undefined : {
    scale: 1.02,
    transition: { duration: 0.3, ease: "easeOut" as const }
  };

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: prefersReducedMotion ? 0 : 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled 
            ? "bg-background/95 backdrop-blur-md shadow-[var(--shadow-soft)]" 
            : "bg-background/80 backdrop-blur-sm"
        }`}
      >
        <nav className="container-wide flex items-center justify-between py-3 md:py-4">
          {/* Logo */}
          <Link to="/" className="relative z-10">
            <motion.div 
              variants={logoVariants}
              initial="initial"
              animate="animate"
              whileHover={logoHoverVariants}
              className="flex items-center gap-3 group"
              style={{ 
                filter: isScrolled ? "drop-shadow(0 2px 8px hsl(var(--primary) / 0.15))" : "none",
                transition: "filter 0.3s ease"
              }}
            >
              {/* Logo compact pour mobile, plus grand pour desktop */}
              <motion.img 
                src={logo}
                alt="O P'tit Four Truck - Pâtisserie Traiteur"
                className="h-12 w-12 md:h-14 md:w-14 object-contain rounded-lg"
                whileHover={prefersReducedMotion ? {} : { 
                  rotate: [0, -2, 2, 0],
                  transition: { duration: 0.4 }
                }}
              />
              {/* Texte visible uniquement en desktop */}
              <div className="hidden sm:flex flex-col">
                <span className="font-display text-lg md:text-xl font-semibold text-foreground leading-tight">
                  O P'tit Four Truck
                </span>
                <span className="text-[10px] tracking-[0.25em] text-primary uppercase">
                  Pâtisserie – Traiteur
                </span>
              </div>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-colors duration-300 link-underline ${
                  location.pathname === link.path 
                    ? "text-primary" 
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* CTA Button */}
          <Link
            to="/devis"
            className="hidden lg:block btn-primary text-sm py-3 px-6"
          >
            Demander un devis
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden relative z-10 p-2 text-foreground"
            aria-label="Menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 lg:hidden bg-background"
          >
            <motion.nav
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="flex flex-col items-center justify-center h-full gap-8"
            >
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + index * 0.05 }}
                >
                  <Link
                    to={link.path}
                    className={`font-display text-3xl transition-colors ${
                      location.pathname === link.path 
                        ? "text-primary" 
                        : "text-foreground hover:text-primary"
                    }`}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Link to="/devis" className="btn-primary mt-4">
                  Demander un devis
                </Link>
              </motion.div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
