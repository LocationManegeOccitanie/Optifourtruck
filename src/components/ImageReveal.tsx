import { motion } from "framer-motion";

interface ImageRevealProps {
  src: string;
  alt: string;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
}

export const ImageReveal = ({ 
  src, 
  alt, 
  className = "", 
  delay = 0,
  direction = "up"
}: ImageRevealProps) => {
  const clipPaths = {
    up: {
      hidden: "inset(100% 0 0 0)",
      visible: "inset(0 0 0 0)"
    },
    down: {
      hidden: "inset(0 0 100% 0)",
      visible: "inset(0 0 0 0)"
    },
    left: {
      hidden: "inset(0 100% 0 0)",
      visible: "inset(0 0 0 0)"
    },
    right: {
      hidden: "inset(0 0 0 100%)",
      visible: "inset(0 0 0 0)"
    }
  };

  return (
    <motion.div 
      className={`relative overflow-hidden ${className}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
    >
      {/* Reveal overlay */}
      <motion.div
        className="absolute inset-0 z-10 bg-primary"
        variants={{
          hidden: { scaleY: 1, originY: direction === "up" ? 0 : 1 },
          visible: { 
            scaleY: 0,
            transition: {
              duration: 0.8,
              delay: delay + 0.3,
              ease: [0.22, 1, 0.36, 1]
            }
          }
        }}
      />
      
      {/* Image with scale animation */}
      <motion.div
        className="w-full h-full"
        variants={{
          hidden: { 
            scale: 1.3,
            clipPath: clipPaths[direction].hidden
          },
          visible: { 
            scale: 1,
            clipPath: clipPaths[direction].visible,
            transition: {
              duration: 1.2,
              delay,
              ease: [0.22, 1, 0.36, 1]
            }
          }
        }}
      >
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover"
        />
      </motion.div>
    </motion.div>
  );
};
