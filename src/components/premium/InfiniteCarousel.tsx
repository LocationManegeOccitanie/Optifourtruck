import { motion, useAnimationControls } from "framer-motion";
import { useEffect, useState, useRef, ReactNode } from "react";

interface InfiniteCarouselProps {
  children: ReactNode[];
  speed?: number;
  pauseOnHover?: boolean;
  direction?: "left" | "right";
  className?: string;
}

export const InfiniteCarousel = ({
  children,
  speed = 30,
  pauseOnHover = true,
  direction = "left",
  className = "",
}: InfiniteCarouselProps) => {
  const [isPaused, setIsPaused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const controls = useAnimationControls();
  
  // Duplicate children for seamless loop
  const items = [...children, ...children];

  useEffect(() => {
    if (!containerRef.current) return;
    
    const contentWidth = containerRef.current.scrollWidth / 2;
    const duration = contentWidth / speed;

    const animate = async () => {
      if (isPaused) return;
      
      await controls.start({
        x: direction === "left" ? -contentWidth : 0,
        transition: {
          duration,
          ease: "linear",
          repeat: Infinity,
          repeatType: "loop",
        },
      });
    };

    controls.set({ x: direction === "left" ? 0 : -contentWidth });
    animate();
  }, [controls, speed, direction, isPaused]);

  const handleMouseEnter = () => {
    if (pauseOnHover) {
      setIsPaused(true);
      controls.stop();
    }
  };

  const handleMouseLeave = () => {
    if (pauseOnHover) {
      setIsPaused(false);
    }
  };

  return (
    <div 
      className={`overflow-hidden ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        ref={containerRef}
        animate={controls}
        className="flex gap-6 w-fit"
      >
        {items.map((child, index) => (
          <div key={index} className="flex-shrink-0">
            {child}
          </div>
        ))}
      </motion.div>
    </div>
  );
};

// Single item carousel for testimonials
interface TestimonialCarouselProps {
  testimonials: {
    content: string;
    author: string;
    role?: string;
    rating?: number;
  }[];
  autoPlayInterval?: number;
  className?: string;
}

export const TestimonialCarousel = ({
  testimonials,
  autoPlayInterval = 5000,
  className = "",
}: TestimonialCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isHovered) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [testimonials.length, autoPlayInterval, isHovered]);

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div 
      className={`relative ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="overflow-hidden">
        <motion.div
          animate={{ x: `-${currentIndex * 100}%` }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex"
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              className="w-full flex-shrink-0 px-4"
            >
              <div className="bg-card rounded-2xl p-8 shadow-[var(--shadow-soft)]">
                {/* Rating stars */}
                {testimonial.rating && (
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <motion.svg
                        key={i}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                        className={`w-5 h-5 ${
                          i < testimonial.rating! 
                            ? "text-primary fill-primary" 
                            : "text-muted stroke-muted-foreground"
                        }`}
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </motion.svg>
                    ))}
                  </div>
                )}

                {/* Quote */}
                <p className="text-lg text-foreground leading-relaxed mb-6">
                  "{testimonial.content}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground font-medium">
                    {getInitials(testimonial.author)}
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{testimonial.author}</p>
                    {testimonial.role && (
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Dots indicator */}
      <div className="flex justify-center gap-2 mt-6">
        {testimonials.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentIndex(i)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              i === currentIndex 
                ? "bg-primary w-6" 
                : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
            }`}
            aria-label={`Témoignage ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
};
