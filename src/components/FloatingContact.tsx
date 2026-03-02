import { Phone } from "lucide-react";
import { motion } from "framer-motion";
import { EASE } from "@/lib/animations";

export const FloatingContact = () => {
  return (
    <motion.a
      href="tel:0656829711"
      aria-label="Appeler O P'tit Four Truck"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1.5, duration: 0.4, ease: EASE.bounce }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-lg hover:shadow-xl transition-shadow duration-300"
    >
      <Phone size={22} />
    </motion.a>
  );
};
