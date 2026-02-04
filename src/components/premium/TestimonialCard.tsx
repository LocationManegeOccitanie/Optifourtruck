import { motion, useReducedMotion } from "framer-motion";
import { Quote } from "lucide-react";
import { AnimatedStars } from "./AnimatedStars";

interface TestimonialCardProps {
  name: string;
  text: string;
  rating?: number;
  index?: number;
}

export const TestimonialCard = ({
  name,
  text,
  rating = 5,
  index = 0,
}: TestimonialCardProps) => {
  const prefersReducedMotion = useReducedMotion();

  const getInitials = (fullName: string) => {
    return fullName
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <motion.div
      initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={
        prefersReducedMotion
          ? { duration: 0 }
          : { delay: index * 0.05, duration: 0.6, ease: [0.22, 1, 0.36, 1] }
      }
      whileHover={prefersReducedMotion ? {} : { y: -8, scale: 1.02 }}
      className="group w-[320px] md:w-[360px] flex-shrink-0"
    >
      <div className="card-premium h-full flex flex-col p-6 relative overflow-hidden bg-card">
        {/* Decorative gradient */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/10 via-accent/5 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

        {/* Quote icon */}
        <motion.div
          whileHover={prefersReducedMotion ? {} : { rotate: 10, scale: 1.1 }}
          transition={{ duration: 0.3 }}
        >
          <Quote
            className="text-primary/20 mb-4 group-hover:text-primary/40 transition-colors duration-500"
            size={28}
          />
        </motion.div>

        {/* Animated Stars */}
        <AnimatedStars rating={rating} size={16} className="mb-4" staggerDelay={0.08} />

        {/* Text */}
        <p className="text-foreground/90 leading-relaxed flex-1 text-sm line-clamp-4">
          "{text}"
        </p>

        {/* Author */}
        <div className="mt-5 pt-4 border-t border-border/50 flex items-center gap-3">
          {/* Avatar with initials */}
          <motion.div
            whileHover={prefersReducedMotion ? {} : { scale: 1.1 }}
            className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground text-sm font-medium shadow-md"
          >
            {getInitials(name)}
          </motion.div>
          <p className="font-medium text-foreground text-sm">{name}</p>
        </div>
      </div>
    </motion.div>
  );
};
