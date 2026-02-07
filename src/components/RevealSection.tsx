import { motion } from "framer-motion";
import { ReactNode } from "react";
import { useOptimizedAnimation, getOptimizedValues } from "@/hooks/useOptimizedAnimation";
import { EASE, DURATION, VIEWPORT } from "@/lib/animations";

interface RevealSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
}

export const RevealSection = ({ 
  children, 
  className = "", 
  delay = 0,
  direction = "up" 
}: RevealSectionProps) => {
  const { intensity, shouldAnimate } = useOptimizedAnimation();
  const optimized = getOptimizedValues(intensity);

  // Skip animation entirely if reduced motion
  if (!shouldAnimate) {
    return <div className={className}>{children}</div>;
  }

  const directions = {
    up: { y: optimized.distance, x: 0 },
    down: { y: -optimized.distance, x: 0 },
    left: { y: 0, x: optimized.distance },
    right: { y: 0, x: -optimized.distance }
  };

  return (
    <motion.div
      initial={{ 
        opacity: 0, 
        ...directions[direction],
        // GPU optimization
        willChange: "transform, opacity"
      }}
      whileInView={{ 
        opacity: 1, 
        y: 0, 
        x: 0 
      }}
      viewport={VIEWPORT.default}
      transition={{ 
        duration: optimized.duration || DURATION.slow, 
        delay: delay * optimized.delay,
        ease: EASE.expo
      }}
      className={className}
      style={{ 
        // Force GPU layer
        transform: "translateZ(0)"
      }}
    >
      {children}
    </motion.div>
  );
};
