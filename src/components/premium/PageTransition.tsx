import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";
import { ReactNode } from "react";
import { useOptimizedAnimation, getOptimizedValues } from "@/hooks/useOptimizedAnimation";
import { EASE, DURATION } from "@/lib/animations";

interface PageTransitionProps {
  children: ReactNode;
}

// Route order for directional transitions
const routeOrder = ['/', '/savoir-faire', '/prestations', '/galerie', '/avis', '/devis'];

// Module-level variable so direction persists across component remounts caused by AnimatePresence
let _prevPath: string | null = null;

const getDirection = (currentPath: string): number => {
  const prevPath = _prevPath;
  _prevPath = currentPath;
  if (!prevPath) return 1;
  const currentIndex = routeOrder.indexOf(currentPath);
  const prevIndex = routeOrder.indexOf(prevPath);
  if (currentIndex === -1 || prevIndex === -1) return 1;
  return currentIndex > prevIndex ? 1 : -1;
};

// Premium page variants with blur and scale
const createPageVariants = (direction: number, intensity: 'none' | 'minimal' | 'reduced' | 'full') => {
  const values = getOptimizedValues(intensity);
  
  if (intensity === 'none') {
    return {
      initial: {},
      enter: {},
      exit: {},
    };
  }

  return {
    initial: {
      opacity: 0,
      y: values.distance,
      filter: `blur(${values.blur}px)`,
      scale: values.scale,
    },
    enter: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      scale: 1,
      transition: {
        duration: values.duration,
        ease: EASE.smooth,
        when: "beforeChildren" as const,
      },
    },
    exit: {
      opacity: 0,
      y: -values.distance / 2,
      filter: `blur(${values.blur / 2}px)`,
      transition: {
        duration: values.duration * 0.7,
        ease: EASE.exit,
      },
    },
  };
};

// Curtain/reveal effect overlay
const createCurtainVariants = (intensity: 'none' | 'minimal' | 'reduced' | 'full') => {
  if (intensity === 'none' || intensity === 'minimal') {
    return {
      initial: { scaleY: 0 },
      enter: { scaleY: 0 },
      exit: { scaleY: 0 },
    };
  }

  const duration = intensity === 'reduced' ? DURATION.normal : DURATION.slow;

  return {
    initial: {
      scaleY: 1,
    },
    enter: {
      scaleY: 0,
      transition: {
        duration,
        ease: EASE.expo,
        delay: 0.1,
      },
    },
    exit: {
      scaleY: 1,
      transition: {
        duration: duration * 0.8,
        ease: EASE.smooth,
      },
    },
  };
};

// Stagger container for page content
const contentStaggerVariants = {
  initial: {},
  enter: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.3,
    },
  },
};

export const PageTransition = ({ children }: PageTransitionProps) => {
  const location = useLocation();
  const { intensity, shouldAnimate } = useOptimizedAnimation();

  const direction = getDirection(location.pathname);

  const pageVariants = createPageVariants(direction, intensity);
  const curtainVariants = createCurtainVariants(intensity);

  // Skip animation entirely if reduced motion
  if (!shouldAnimate) {
    return <>{children}</>;
  }

  return (
    <motion.div
      key={location.pathname}
      initial="initial"
      animate="enter"
      exit="exit"
      style={{ willChange: "transform, opacity, filter" }}
    >
      {/* Curtain overlay - primary color */}
      {(intensity === 'full' || intensity === 'reduced') && (
        <>
          <motion.div
            variants={curtainVariants}
            className="fixed inset-0 z-[100] bg-primary origin-top pointer-events-none"
            style={{ willChange: "transform" }}
          />
          <motion.div
            variants={curtainVariants}
            className="fixed inset-0 z-[99] bg-background origin-bottom pointer-events-none"
            style={{ 
              willChange: "transform",
              transitionDelay: "0.05s" 
            }}
          />
        </>
      )}
      
      {/* Page content with stagger */}
      <motion.div 
        variants={pageVariants}
        style={{ willChange: "transform, opacity, filter" }}
      >
        <motion.div variants={contentStaggerVariants}>
          {children}
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

// Simpler fade transition for less dramatic pages
export const FadeTransition = ({ children }: PageTransitionProps) => {
  const location = useLocation();
  const { shouldAnimate, intensity } = useOptimizedAnimation();
  const optimized = getOptimizedValues(intensity);

  if (!shouldAnimate) {
    return <>{children}</>;
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: optimized.duration, ease: EASE.smooth }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

/**
 * Stagger item - use inside PageTransition for cascading reveal
 */
export const StaggerItem = ({ 
  children, 
  className = "" 
}: { 
  children: ReactNode; 
  className?: string;
}) => {
  const { shouldAnimate, intensity } = useOptimizedAnimation();
  const optimized = getOptimizedValues(intensity);

  if (!shouldAnimate) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      variants={{
        initial: { 
          opacity: 0, 
          y: optimized.distance,
          filter: `blur(${optimized.blur}px)`
        },
        enter: { 
          opacity: 1, 
          y: 0,
          filter: "blur(0px)",
          transition: {
            duration: optimized.duration,
            ease: EASE.smooth,
          }
        },
      }}
      style={{ willChange: "transform, opacity, filter" }}
    >
      {children}
    </motion.div>
  );
};
