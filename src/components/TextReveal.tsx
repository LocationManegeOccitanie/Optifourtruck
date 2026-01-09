import { motion } from "framer-motion";
import { ReactNode } from "react";

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
  duration = 0.8
}: TextRevealProps) => {
  return (
    <div className={`overflow-hidden ${className}`}>
      <motion.div
        initial={{ y: "100%", opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ 
          duration,
          delay,
          ease: [0.22, 1, 0.36, 1]
        }}
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
  staggerDelay = 0.03
}: SplitTextProps) => {
  const words = text.split(" ");
  
  return (
    <motion.span 
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
    >
      {words.map((word, index) => (
        <span key={index} className="inline-block overflow-hidden mr-[0.25em]">
          <motion.span
            className="inline-block"
            variants={{
              hidden: { y: "100%", opacity: 0, rotateX: -45 },
              visible: { 
                y: 0, 
                opacity: 1, 
                rotateX: 0,
                transition: {
                  duration: 0.6,
                  delay: delay + index * staggerDelay,
                  ease: [0.22, 1, 0.36, 1]
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
