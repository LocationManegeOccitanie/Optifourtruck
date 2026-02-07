import { motion } from "framer-motion";
import { useOptimizedAnimation } from "@/hooks/useOptimizedAnimation";
import { DURATION } from "@/lib/animations";

export const FloatingElements = () => {
  const { floatingEnabled, intensity } = useOptimizedAnimation();

  // Don't render on mobile or if reduced motion
  if (!floatingEnabled) {
    // Return a static subtle gradient instead
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse 80% 50% at 20% 40%, hsl(var(--primary) / 0.08) 0%, transparent 50%),
              radial-gradient(ellipse 60% 80% at 80% 50%, hsl(var(--accent) / 0.06) 0%, transparent 50%)
            `,
          }}
        />
      </div>
    );
  }

  // Reduced animations for tablet
  const isReduced = intensity === 'reduced';
  
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Animated gradient mesh - GPU optimized */}
      <motion.div
        className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%]"
        style={{
          background: `
            radial-gradient(ellipse 80% 50% at 20% 40%, hsl(var(--primary) / 0.12) 0%, transparent 50%),
            radial-gradient(ellipse 60% 80% at 80% 50%, hsl(var(--accent) / 0.1) 0%, transparent 50%),
            radial-gradient(ellipse 50% 60% at 40% 80%, hsl(var(--primary) / 0.08) 0%, transparent 50%)
          `,
          willChange: "transform",
        }}
        animate={{
          rotate: [0, 360],
        }}
        transition={{
          duration: isReduced ? 180 : 120,
          repeat: Infinity,
          ease: "linear"
        }}
      />

      {/* Floating orb 1 - Primary glow */}
      <motion.div
        className="absolute top-[15%] left-[10%] w-[400px] h-[400px] rounded-full"
        style={{
          background: "radial-gradient(circle, hsl(var(--primary) / 0.2) 0%, transparent 60%)",
          filter: "blur(60px)",
          willChange: "transform",
        }}
        animate={{
          x: isReduced ? [0, 50, 0] : [0, 100, 50, 0],
          y: isReduced ? [0, -25, 0] : [0, -50, 30, 0],
          scale: isReduced ? [1, 1.15, 1] : [1, 1.3, 1.1, 1]
        }}
        transition={{
          duration: isReduced ? 30 : 20,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      {/* Floating orb 2 - Accent rose */}
      <motion.div
        className="absolute bottom-[10%] right-[5%] w-[350px] h-[350px] rounded-full"
        style={{
          background: "radial-gradient(circle, hsl(var(--accent) / 0.25) 0%, transparent 60%)",
          filter: "blur(50px)",
          willChange: "transform",
        }}
        animate={{
          x: isReduced ? [0, -40, 0] : [0, -80, -40, 0],
          y: isReduced ? [0, 30, 0] : [0, 60, -30, 0],
          scale: isReduced ? [1, 1.1, 1] : [1, 1.2, 1.15, 1]
        }}
        transition={{
          duration: isReduced ? 27 : 18,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 3
        }}
      />
      
      {/* Floating orb 3 - Center subtle - only on full mode */}
      {intensity === 'full' && (
        <motion.div
          className="absolute top-[40%] left-[50%] w-[300px] h-[300px] rounded-full -translate-x-1/2"
          style={{
            background: "radial-gradient(circle, hsl(var(--primary) / 0.12) 0%, transparent 60%)",
            filter: "blur(50px)",
            willChange: "transform, opacity",
          }}
          animate={{
            scale: [1, 1.4, 1],
            opacity: [0.4, 0.7, 0.4]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
      )}

      {/* Shimmer line effect - only on full mode */}
      {intensity === 'full' && (
        <motion.div
          className="absolute top-0 left-0 w-full h-full"
          style={{
            background: "linear-gradient(105deg, transparent 40%, hsl(var(--primary) / 0.06) 45%, hsl(var(--primary) / 0.12) 50%, hsl(var(--primary) / 0.06) 55%, transparent 60%)",
            backgroundSize: "200% 100%",
            willChange: "background-position",
          }}
          animate={{
            backgroundPosition: ["200% 0%", "-200% 0%"]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            repeatDelay: 6
          }}
        />
      )}

      {/* Particle dots - only on full mode */}
      {intensity === 'full' && [...Array(4)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-primary/30"
          style={{
            top: `${25 + i * 15}%`,
            left: `${15 + i * 20}%`,
            willChange: "transform, opacity",
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0, 0.8, 0],
            scale: [0, 1.2, 0]
          }}
          transition={{
            duration: DURATION.epic + i * 0.5,
            repeat: Infinity,
            ease: "easeOut",
            delay: i * 1.2
          }}
        />
      ))}
    </div>
  );
};
