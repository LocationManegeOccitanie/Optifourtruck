import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { ScrollToTop } from "@/components/ScrollToTop";
import { PageLoader } from "@/components/premium/PageLoader";
import { PageTransition } from "@/components/premium/PageTransition";
import Index from "./pages/Index";
import SavoirFaire from "./pages/SavoirFaire";
import Prestations from "./pages/Prestations";
import Galerie from "./pages/Galerie";
import Avis from "./pages/Avis";
import Devis from "./pages/Devis";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const AnimatedRoutes = () => {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><Index /></PageTransition>} />
        <Route path="/savoir-faire" element={<PageTransition><SavoirFaire /></PageTransition>} />
        <Route path="/prestations" element={<PageTransition><Prestations /></PageTransition>} />
        <Route path="/galerie" element={<PageTransition><Galerie /></PageTransition>} />
        <Route path="/avis" element={<PageTransition><Avis /></PageTransition>} />
        <Route path="/devis" element={<PageTransition><Devis /></PageTransition>} />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
};

const App = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        {!isLoaded && <PageLoader onLoadComplete={() => setIsLoaded(true)} />}
        <BrowserRouter>
          <ScrollToTop />
          <AnimatedRoutes />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
