import { motion, useAnimationControls, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState, useCallback } from "react";
import { TestimonialCard } from "./TestimonialCard";

interface Testimonial {
  name: string;
  text: string;
  rating?: number;
}

interface TestimonialMarqueeProps {
  testimonials: Testimonial[];
  speed?: number;
  direction?: "left" | "right";
  pauseOnHover?: boolean;
  className?: string;
}

export const TestimonialMarquee = ({
  testimonials,
  speed = 25,
  direction = "left",
  pauseOnHover = true,
  className = "",
}: TestimonialMarqueeProps) => {
  const [isPaused, setIsPaused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const controls = useAnimationControls();
  const prefersReducedMotion = useReducedMotion();

  // Triple the items for seamless infinite loop
  const items = [...testimonials, ...testimonials, ...testimonials];

  const startAnimation = useCallback(async () => {
    if (!containerRef.current || prefersReducedMotion) return;

    const contentWidth = containerRef.current.scrollWidth / 3;
    const duration = contentWidth / speed;

    // Set initial position
    controls.set({ x: direction === "left" ? 0 : -contentWidth });

    // Start infinite animation
    await controls.start({
      x: direction === "left" ? -contentWidth : 0,
      transition: {
        duration,
        ease: "linear",
        repeat: Infinity,
        repeatType: "loop",
      },
    });
  }, [controls, speed, direction, prefersReducedMotion]);

  useEffect(() => {
    if (!isPaused) {
      startAnimation();
    }
  }, [isPaused, startAnimation]);

  const handleMouseEnter = () => {
    if (pauseOnHover && !prefersReducedMotion) {
      setIsPaused(true);
      controls.stop();
    }
  };

  const handleMouseLeave = () => {
    if (pauseOnHover && !prefersReducedMotion) {
      setIsPaused(false);
    }
  };

  // For reduced motion, show a static grid instead
  if (prefersReducedMotion) {
    return (
      <div className={`overflow-x-auto scrollbar-thin ${className}`}>
        <div className="flex gap-6 pb-4">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={index}
              name={testimonial.name}
              text={testimonial.text}
              rating={testimonial.rating ?? 5}
              index={index}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div
      className={`overflow-hidden relative ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Gradient masks for smooth fade effect */}
      <div className="absolute left-0 top-0 bottom-0 w-20 md:w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-20 md:w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

      <motion.div
        ref={containerRef}
        animate={controls}
        className="flex gap-6 w-fit py-4"
      >
        {items.map((testimonial, index) => (
          <TestimonialCard
            key={`${testimonial.name}-${index}`}
            name={testimonial.name}
            text={testimonial.text}
            rating={testimonial.rating ?? 5}
            index={index % testimonials.length}
          />
        ))}
      </motion.div>
    </div>
  );
};
