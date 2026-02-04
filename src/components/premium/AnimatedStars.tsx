import { motion, useReducedMotion } from "framer-motion";
import { Star } from "lucide-react";

interface AnimatedStarsProps {
  rating?: number;
  size?: number;
  className?: string;
  staggerDelay?: number;
}

export const AnimatedStars = ({
  rating = 5,
  size = 16,
  className = "",
  staggerDelay = 0.1,
}: AnimatedStarsProps) => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className={`flex gap-1 ${className}`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <motion.div
          key={i}
          initial={prefersReducedMotion ? {} : { opacity: 0, scale: 0, rotate: -180 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={
            prefersReducedMotion
              ? { duration: 0 }
              : {
                  delay: i * staggerDelay,
                  duration: 0.5,
                  type: "spring",
                  stiffness: 200,
                  damping: 15,
                }
          }
          whileHover={prefersReducedMotion ? {} : { scale: 1.2, rotate: 15 }}
          className="relative"
        >
          <Star
            size={size}
            className={`transition-colors duration-300 ${
              i < rating
                ? "text-accent fill-accent"
                : "text-muted-foreground/30"
            }`}
          />
          {/* Glow effect for filled stars */}
          {i < rating && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0.3, 0.6, 0.3] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.2,
              }}
              className="absolute inset-0 blur-sm"
            >
              <Star size={size} className="text-accent fill-accent" />
            </motion.div>
          )}
        </motion.div>
      ))}
    </div>
  );
};
