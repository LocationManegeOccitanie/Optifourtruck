import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useOptimizedAnimation } from "@/hooks/useOptimizedAnimation";

interface ParallaxImageProps {
  src: string;
  alt: string;
  className?: string;
  speed?: number;
}

export const ParallaxImage = ({ 
  src, 
  alt, 
  className = "", 
  speed = 0.3 
}: ParallaxImageProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { parallaxEnabled } = useOptimizedAnimation();
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [-50 * speed, 50 * speed]);

  // Static version for mobile/reduced motion
  if (!parallaxEnabled) {
    return (
      <div ref={ref} className={`overflow-hidden ${className}`}>
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>
    );
  }

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.img
        src={src}
        alt={alt}
        style={{ 
          y,
          willChange: "transform"
        }}
        className="w-full h-full object-cover scale-110"
        loading="lazy"
      />
    </div>
  );
};

/**
 * Multi-layer parallax for depth effect
 */
interface ParallaxLayerProps {
  children: React.ReactNode;
  speed?: number;
  className?: string;
}

export const ParallaxLayer = ({ 
  children, 
  speed = 0.5,
  className = "" 
}: ParallaxLayerProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { parallaxEnabled } = useOptimizedAnimation();
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [100 * speed, -100 * speed]);

  if (!parallaxEnabled) {
    return <div ref={ref} className={className}>{children}</div>;
  }

  return (
    <div ref={ref} className={className}>
      <motion.div style={{ y, willChange: "transform" }}>
        {children}
      </motion.div>
    </div>
  );
};
