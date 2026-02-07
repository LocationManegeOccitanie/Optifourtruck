import { motion } from "framer-motion";
import { ReactNode } from "react";
import { useOptimizedAnimation, getOptimizedValues } from "@/hooks/useOptimizedAnimation";
import { EASE, DURATION, VIEWPORT, STAGGER } from "@/lib/animations";

interface TextRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
}

export const TextReveal = ({ 
  children, 
  className = "", 
  delay = 0,
  duration = DURATION.slow
}: TextRevealProps) => {
  const { intensity, shouldAnimate } = useOptimizedAnimation();
  const optimized = getOptimizedValues(intensity);

  if (!shouldAnimate) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div className={`overflow-hidden ${className}`}>
      <motion.div
        initial={{ y: "100%", opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={VIEWPORT.early}
        transition={{ 
          duration: optimized.duration || duration,
          delay,
          ease: EASE.smooth
        }}
        style={{ willChange: "transform, opacity" }}
      >
        {children}
      </motion.div>
    </div>
  );
};

interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
  staggerDelay?: number;
}

export const SplitText = ({ 
  text, 
  className = "", 
  delay = 0,
  staggerDelay = STAGGER.fast
}: SplitTextProps) => {
  const { intensity, shouldAnimate } = useOptimizedAnimation();
  const optimized = getOptimizedValues(intensity);
  const words = text.split(" ");

  if (!shouldAnimate) {
    return <span className={className}>{text}</span>;
  }

  // Reduce stagger on lower-end devices
  const effectiveStagger = intensity === 'minimal' ? staggerDelay * 2 : staggerDelay;
  
  return (
    <motion.span 
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT.early}
    >
      {words.map((word, index) => (
        <span key={index} className="inline-block overflow-hidden mr-[0.25em]">
          <motion.span
            className="inline-block"
            style={{ willChange: "transform, opacity" }}
            variants={{
              hidden: { 
                y: "100%", 
                opacity: 0, 
                rotateX: intensity === 'full' ? -45 : 0 
              },
              visible: { 
                y: 0, 
                opacity: 1, 
                rotateX: 0,
                transition: {
                  duration: optimized.duration || DURATION.normal,
                  delay: delay + index * effectiveStagger,
                  ease: EASE.smooth
                }
              }
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
};

/**
 * Character-by-character reveal for dramatic headings
 */
interface CharacterRevealProps {
  text: string;
  className?: string;
  delay?: number;
}

export const CharacterReveal = ({
  text,
  className = "",
  delay = 0,
}: CharacterRevealProps) => {
  const { intensity, shouldAnimate } = useOptimizedAnimation();
  const characters = text.split("");

  if (!shouldAnimate || intensity === 'minimal') {
    return <span className={className}>{text}</span>;
  }

  return (
    <motion.span 
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT.early}
    >
      {characters.map((char, index) => (
        <motion.span
          key={index}
          className="inline-block"
          style={{ 
            willChange: "transform, opacity",
            whiteSpace: char === " " ? "pre" : "normal"
          }}
          variants={{
            hidden: { 
              opacity: 0,
              y: 20,
              filter: "blur(4px)"
            },
            visible: { 
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
              transition: {
                duration: DURATION.fast,
                delay: delay + index * 0.02,
                ease: EASE.smooth
              }
            }
          }}
        >
          {char}
        </motion.span>
      ))}
    </motion.span>
  );
};
