import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Menu, X } from "lucide-react";
import logoAlicia from "@/assets/logo-alicia.svg";
import { ThemeToggle } from "./ThemeToggle";

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
            aria-label="Menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>
      </motion.header>

      {/* Mobile Menu - rendered via portal to escape PageTransition transform scope */}
      {isOpen && createPortal(
        <div className="fixed inset-0 z-[55] lg:hidden bg-background flex flex-col items-center justify-center gap-8">
          {/* Mobile Logo */}
          <img 
            src={logoAlicia} 
            alt="O P'tit Four Truck" 
            className="h-24 mb-4"
          />
          
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`font-display text-3xl transition-colors ${
                location.pathname === link.path 
                  ? "text-primary" 
                  : "text-foreground hover:text-primary"
              }`}
            >
              {link.name}
            </Link>
          ))}
          <div className="flex flex-col items-center gap-6 mt-4">
            <Link to="/devis" className="btn-primary">
              Demander un devis
            </Link>
            <div className="flex items-center gap-2 text-muted-foreground text-sm">
              <span>Thème</span>
              <ThemeToggle />
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
};
