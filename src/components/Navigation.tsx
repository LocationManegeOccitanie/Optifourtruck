import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Menu, X } from "lucide-react";
import logoAlicia from "@/assets/logo-alicia.svg";
import { ThemeToggle } from "./ThemeToggle";

const mobileMenuVariants = {
  hidden: { opacity: 0, y: -16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] as const },
  },
  exit: {
    opacity: 0,
    y: -16,
    transition: { duration: 0.25, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const mobileLinkVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.07 + 0.1, duration: 0.4, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

const navLinks = [
  { name: "Accueil", path: "/" },
  { name: "Savoir-Faire", path: "/savoir-faire" },
  { name: "Prestations", path: "/prestations" },
  { name: "Galerie", path: "/galerie" },
  { name: "Avis Clients", path: "/avis" },
];

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

  const logoAnimation = prefersReducedMotion 
    ? {} 
    : {
        initial: { opacity: 0, x: -20 },
        animate: { opacity: 1, x: 0 },
        transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const, delay: 0.1 }
      };

  const logoHover = prefersReducedMotion
    ? {}
    : {
        whileHover: { 
          scale: 1.03,
          filter: "drop-shadow(0 2px 8px hsl(78 32% 59% / 0.2))"
        },
        transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] as const }
      };

  return (
    <>
      <motion.header
        initial={prefersReducedMotion ? {} : { y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled 
            ? "bg-background/95 backdrop-blur-md shadow-[var(--shadow-soft)]" 
            : "bg-background/80 backdrop-blur-sm"
        }`}
      >
        <nav className="container-wide flex items-center justify-between py-2 md:py-3">
          {/* Logo */}
          <Link to="/" className="relative z-10">
            <motion.div 
              {...logoAnimation}
              {...logoHover}
              className="flex items-center"
            >
              <img 
                src={logoAlicia} 
                alt="O P'tit Four Truck - Alicia Catala" 
                className={`transition-all duration-300 ${
                  isScrolled 
                    ? "h-10 md:h-12" 
                    : "h-12 md:h-14"
                }`}
              />
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

          {/* Right side: Theme Toggle + CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <ThemeToggle />
            <Link
              to="/devis"
              className="btn-primary text-sm py-3 px-6"
            >
              Demander un devis
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden relative z-10 p-2 text-foreground"
            aria-label={isOpen ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
          >
            <AnimatePresence mode="wait" initial={false}>
              {isOpen ? (
                <motion.span
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  style={{ display: "block" }}
                >
                  <X size={24} />
                </motion.span>
              ) : (
                <motion.span
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  style={{ display: "block" }}
                >
                  <Menu size={24} />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </nav>
      </motion.header>

      {/* Mobile Menu - rendered via portal to escape PageTransition transform scope */}
      {createPortal(
        <AnimatePresence>
          {isOpen && (
            <motion.div
              id="mobile-menu"
              role="dialog"
              aria-label="Menu de navigation"
              variants={prefersReducedMotion ? undefined : mobileMenuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed inset-0 z-[55] lg:hidden bg-background flex flex-col items-center justify-center gap-8"
            >
              {/* Mobile Logo */}
              <img
                src={logoAlicia}
                alt="O P'tit Four Truck"
                className="h-24 mb-4"
                loading="lazy"
              />

              {navLinks.map((link, i) => (
                <motion.div
                  key={link.path}
                  custom={i}
                  variants={prefersReducedMotion ? undefined : mobileLinkVariants}
                  initial="hidden"
                  animate="visible"
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
                custom={navLinks.length}
                variants={prefersReducedMotion ? undefined : mobileLinkVariants}
                initial="hidden"
                animate="visible"
                className="flex flex-col items-center gap-6 mt-4"
              >
                <Link to="/devis" className="btn-primary">
                  Demander un devis
                </Link>
                <div className="flex items-center gap-2 text-muted-foreground text-sm">
                  <span>Thème</span>
                  <ThemeToggle />
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
};
