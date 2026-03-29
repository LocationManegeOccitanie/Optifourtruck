import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Layout } from "@/components/Layout";
import { SEO } from "@/components/SEO";
import { motion } from "framer-motion";
import { Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <Layout>
      <SEO title="Page introuvable" description="La page que vous cherchez n'existe pas." canonical={location.pathname} />
      <section className="min-h-[70vh] flex items-center justify-center">
        <div className="text-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="font-display text-8xl md:text-9xl text-primary/20">404</span>
            <h1 className="heading-section mt-4">Page introuvable</h1>
            <p className="text-body mt-4 max-w-md mx-auto">
              Oups ! La page que vous cherchez n'existe pas ou a été déplacée.
            </p>
            <Link
              to="/"
              className="btn-primary mt-10 inline-flex items-center gap-2"
            >
              <Home size={18} />
              Retour à l'accueil
            </Link>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default NotFound;
