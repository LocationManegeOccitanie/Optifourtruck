import { motion, useScroll, useSpring } from "framer-motion";
import { useOptimizedAnimation } from "@/hooks/useOptimizedAnimation";
import { SPRING } from "@/lib/animations";

export const ScrollProgress = () => {
  const { shouldAnimate } = useOptimizedAnimation();
  const { scrollYProgress } = useScroll();
  
  const scaleX = useSpring(scrollYProgress, {
    ...SPRING.gentle,
    restDelta: 0.001
  });

  if (!shouldAnimate) {
    return null;
  }

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] bg-primary origin-left z-[60]"
      style={{ 
        scaleX,
        willChange: "transform"
      }}
    />
  );
};
