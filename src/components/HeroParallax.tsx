import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

interface HeroParallaxProps {
  src: string;
  alt: string;
}

export const HeroParallax = ({ src, alt }: HeroParallaxProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [0, 250]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const opacity = useTransform(scrollYProgress, [0, 0.7, 1], [1, 0.4, 0]);

  return (
    <div ref={ref} className="absolute inset-0 overflow-hidden">
      {/* Image with parallax and cinematic zoom entrance */}
      <motion.div
        className="absolute inset-0"
        style={{ y, scale }}
      >
        <motion.img
          initial={{ scale: 1.3, filter: "blur(10px)" }}
          animate={{ scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 2.2, ease: [0.16, 1, 0.3, 1] }}
          src={src}
          alt={alt}
          className="w-full h-full object-cover"
          style={{ opacity }}
          loading="eager"
          fetchPriority="high"
          decoding="sync"
        />
      </motion.div>

      {/* Cinematic gradient overlays */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 0.5 }}
        className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/20 to-background"
      />
      
      {/* Side vignettes for depth */}
      <div className="absolute inset-0 bg-gradient-to-r from-background/50 via-transparent to-background/50" />
      
      {/* Top fade for navbar integration */}
      <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-background/80 to-transparent" />
      
      {/* Premium vignette effect */}
      <div 
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse 70% 50% at center 40%, transparent 0%, hsl(var(--background) / 0.5) 100%)"
        }}
      />

      {/* Subtle animated grain texture */}
      <motion.div 
        className="absolute inset-0 opacity-[0.015] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
        animate={{
          opacity: [0.015, 0.025, 0.015]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </div>
  );
};
