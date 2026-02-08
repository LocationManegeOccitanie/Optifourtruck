import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import logoHero from "@/assets/logo-hero.png";

interface PageLoaderProps {
  onLoadComplete?: () => void;
  minimumLoadTime?: number;
}

export const PageLoader = ({ onLoadComplete, minimumLoadTime = 1800 }: PageLoaderProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        // Accelerate towards the end
        const increment = prev < 80 ? Math.random() * 15 + 5 : Math.random() * 5 + 2;
        return Math.min(prev + increment, 100);
      });
    }, 150);

    // Minimum load time for dramatic effect
    const timer = setTimeout(() => {
      setProgress(100);
      setTimeout(() => {
        setIsLoading(false);
        onLoadComplete?.();
      }, 600);
    }, minimumLoadTime);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, [minimumLoadTime, onLoadComplete]);

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[9999] bg-background flex flex-col items-center justify-center"
        >
          {/* Background pattern */}
          <div className="absolute inset-0 bg-dots opacity-30" />
          
          {/* Glow effects */}
          <motion.div
            className="absolute w-[600px] h-[600px] bg-gradient-radial from-primary/20 via-primary/5 to-transparent rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute w-[400px] h-[400px] bg-gradient-radial from-accent/15 via-accent/5 to-transparent rounded-full blur-2xl"
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5,
            }}
          />

          {/* Logo reveal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 30, filter: "blur(20px)" }}
            animate={{ 
              opacity: 1, 
              scale: 1, 
              y: 0, 
              filter: "blur(0px)",
            }}
            transition={{ 
              duration: 1.2, 
              ease: [0.16, 1, 0.3, 1],
              delay: 0.2,
            }}
            className="relative z-10 mb-12"
          >
            {/* Logo glow */}
            <motion.div
              className="absolute inset-0 bg-gradient-radial from-primary/30 to-transparent blur-2xl scale-150"
              animate={{
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <img
              src={logoHero}
              alt="O P'tit Four Truck"
              className="h-32 sm:h-40 md:h-48 w-auto relative z-10 drop-shadow-[0_8px_32px_rgba(0,0,0,0.1)]"
            />
          </motion.div>

          {/* Progress bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="relative z-10 w-64 sm:w-80"
          >
            {/* Progress track */}
            <div className="h-[2px] bg-border rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-primary via-accent to-primary rounded-full"
                style={{ width: `${progress}%` }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              />
            </div>
            
            {/* Progress text */}
            <motion.div
              className="flex justify-between items-center mt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                Chargement
              </span>
              <span className="text-xs font-medium text-primary tabular-nums">
                {Math.round(progress)}%
              </span>
            </motion.div>
          </motion.div>

          {/* Decorative elements */}
          <motion.div
            className="absolute bottom-12 left-1/2 -translate-x-1/2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
          >
            <div className="flex items-center gap-3">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-1.5 h-1.5 rounded-full bg-primary/50"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 1.2,
                    repeat: Infinity,
                    delay: i * 0.2,
                  }}
                />
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
