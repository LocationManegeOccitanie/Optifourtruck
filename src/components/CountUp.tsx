import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef } from "react";

interface CountUpProps {
  value: number;
  suffix?: string;
  prefix?: string;
  className?: string;
  duration?: number;
}

export const CountUp = ({ 
  value, 
  suffix = "", 
  prefix = "",
  className = "",
  duration = 2
}: CountUpProps) => {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { 
    damping: 50, 
    stiffness: 100,
    duration: duration * 1000
  });
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [isInView, value, motionValue]);
  
  useEffect(() => {
    const unsubscribe = springValue.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = prefix + Math.round(latest) + suffix;
      }
    });
    
    return () => unsubscribe();
  }, [springValue, suffix, prefix]);
  
  return (
    <motion.span 
      ref={ref} 
      className={className}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      {prefix}0{suffix}
    </motion.span>
  );
};
