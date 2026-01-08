import { Link } from "react-router-dom";
import { Instagram, Facebook, Mail, Phone, MapPin } from "lucide-react";
import { RevealSection } from "./RevealSection";

export const Footer = () => {
  return (
    <footer className="bg-foreground text-background">
      <div className="container-wide section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand */}
          <RevealSection className="lg:col-span-1">
            <div className="flex flex-col items-start">
              <span className="font-display text-3xl font-semibold">
                O P'tit Four
              </span>
              <span className="text-xs tracking-[0.3em] text-primary uppercase mt-1">
                Truck
              </span>
              <p className="mt-6 text-background/70 text-sm leading-relaxed max-w-xs">
                Pâtisserie artisanale & traiteur. Des créations sur-mesure pour sublimer vos moments précieux.
              </p>
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
              ].map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-background/70 hover:text-primary transition-colors duration-300 text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </RevealSection>

          {/* Contact */}
          <RevealSection delay={0.2}>
            <h4 className="text-caption text-primary mb-6">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Phone size={18} className="text-primary mt-0.5 flex-shrink-0" />
                <span className="text-background/70 text-sm">06 XX XX XX XX</span>
              </li>
              <li className="flex items-start gap-3">
                <Mail size={18} className="text-primary mt-0.5 flex-shrink-0" />
                <span className="text-background/70 text-sm">contact@optitfourtruck.fr</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-primary mt-0.5 flex-shrink-0" />
                <span className="text-background/70 text-sm">Région Occitanie, France</span>
              </li>
            </ul>
          </RevealSection>

          {/* Social */}
          <RevealSection delay={0.3}>
            <h4 className="text-caption text-primary mb-6">Suivez-nous</h4>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-12 h-12 rounded-full bg-background/10 flex items-center justify-center text-background/70 hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a
                href="#"
                className="w-12 h-12 rounded-full bg-background/10 flex items-center justify-center text-background/70 hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
            </div>
            <div className="mt-8">
              <Link to="/devis" className="btn-primary text-sm py-3 px-6">
                Demander un devis
              </Link>
            </div>
          </RevealSection>
        </div>

        {/* Bottom */}
        <div className="border-t border-background/10 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-background/50 text-xs">
            © 2024 O P'tit Four Truck. Tous droits réservés.
          </p>
          <p className="text-background/50 text-xs">
            Artisan pâtissier-traiteur
          </p>
        </div>
      </div>
    </footer>
  );
};
