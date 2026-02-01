import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";
import { ReactNode } from "react";

interface PageTransitionProps {
  children: ReactNode;
}

const pageVariants = {
  initial: {
    opacity: 0,
    y: 20,
    filter: "blur(10px)",
  },
  enter: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1] as const,
      when: "beforeChildren" as const,
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    filter: "blur(5px)",
    transition: {
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

// Curtain/reveal effect overlay
const curtainVariants = {
  initial: {
    scaleY: 1,
  },
  enter: {
    scaleY: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1] as const,
      delay: 0.1,
    },
  },
  exit: {
    scaleY: 1,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

export const PageTransition = ({ children }: PageTransitionProps) => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={location.pathname}
        initial="initial"
        animate="enter"
        exit="exit"
      >
        {/* Curtain overlay */}
        <motion.div
          variants={curtainVariants}
          className="fixed inset-0 z-[100] bg-primary origin-top pointer-events-none"
        />
        <motion.div
          variants={curtainVariants}
          className="fixed inset-0 z-[99] bg-background origin-bottom pointer-events-none"
          style={{ transitionDelay: "0.05s" }}
        />
        
        {/* Page content */}
        <motion.div variants={pageVariants}>
          {children}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

// Simpler fade transition for less dramatic pages
export const FadeTransition = ({ children }: PageTransitionProps) => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};
