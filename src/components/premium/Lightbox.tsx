import { motion, AnimatePresence, useMotionValue, useTransform, PanInfo } from "framer-motion";
import { useEffect, useCallback, useState } from "react";
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from "lucide-react";

interface LightboxImage {
  src: string;
  alt: string;
}

interface LightboxProps {
  images: LightboxImage[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export const Lightbox = ({ images, currentIndex, isOpen, onClose, onNavigate }: LightboxProps) => {
  const [direction, setDirection] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const x = useMotionValue(0);
  const opacity = useTransform(x, [-200, 0, 200], [0.5, 1, 0.5]);
  const scale = useTransform(x, [-200, 0, 200], [0.9, 1, 0.9]);

  const handlePrev = useCallback(() => {
    if (currentIndex > 0) {
      setDirection(-1);
      setIsZoomed(false);
      onNavigate(currentIndex - 1);
    }
  }, [currentIndex, onNavigate]);

  const handleNext = useCallback(() => {
    if (currentIndex < images.length - 1) {
      setDirection(1);
      setIsZoomed(false);
      onNavigate(currentIndex + 1);
    }
  }, [currentIndex, images.length, onNavigate]);

  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (isZoomed) return;
    const threshold = 100;
    if (info.offset.x > threshold && currentIndex > 0) {
      handlePrev();
    } else if (info.offset.x < -threshold && currentIndex < images.length - 1) {
      handleNext();
    }
  };

  const toggleZoom = () => setIsZoomed(!isZoomed);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft" && !isZoomed) handlePrev();
      if (e.key === "ArrowRight" && !isZoomed) handleNext();
      if (e.key === " " || e.key === "z") {
        e.preventDefault();
        toggleZoom();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose, handlePrev, handleNext, isZoomed]);

  // Prevent body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Reset zoom when closing
  useEffect(() => {
    if (!isOpen) setIsZoomed(false);
  }, [isOpen]);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? "100%" : "-100%",
      opacity: 0,
      scale: 0.85,
      rotateY: direction > 0 ? 15 : -15,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      rotateY: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
    exit: (direction: number) => ({
      x: direction < 0 ? "100%" : "-100%",
      opacity: 0,
      scale: 0.85,
      rotateY: direction < 0 ? 15 : -15,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    }),
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.4, ease: "easeOut" as const }
    },
    exit: { 
      opacity: 0,
      transition: { duration: 0.3, ease: "easeIn" as const }
    }
  };

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { delay: 0.2, duration: 0.3 }
    },
    exit: { opacity: 0, scale: 0.8 },
    hover: { scale: 1.1, backgroundColor: "rgba(255,255,255,0.25)" },
    tap: { scale: 0.95 }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="fixed inset-0 z-[9999] flex items-center justify-center"
          onClick={onClose}
        >
          {/* Blurred background with gradient overlay */}
          <motion.div 
            className="absolute inset-0 bg-foreground/90 backdrop-blur-2xl"
            initial={{ backdropFilter: "blur(0px)" }}
            animate={{ backdropFilter: "blur(24px)" }}
            exit={{ backdropFilter: "blur(0px)" }}
            transition={{ duration: 0.4 }}
          />
          
          {/* Ambient glow effect */}
          <motion.div
            className="absolute inset-0 opacity-30"
            style={{
              background: `radial-gradient(circle at 50% 50%, hsl(var(--primary) / 0.3) 0%, transparent 70%)`
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            exit={{ opacity: 0 }}
          />

          {/* Close button */}
          <motion.button
            variants={buttonVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            whileHover="hover"
            whileTap="tap"
            onClick={onClose}
            className="absolute top-6 right-6 z-20 w-12 h-12 rounded-full bg-background/10 backdrop-blur-md
                       flex items-center justify-center text-background
                       transition-colors duration-300 border border-background/20"
            aria-label="Fermer"
          >
            <X size={24} />
          </motion.button>

          {/* Zoom button */}
          <motion.button
            variants={buttonVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            whileHover="hover"
            whileTap="tap"
            onClick={(e) => {
              e.stopPropagation();
              toggleZoom();
            }}
            className="absolute top-6 right-20 z-20 w-12 h-12 rounded-full bg-background/10 backdrop-blur-md
                       flex items-center justify-center text-background
                       transition-colors duration-300 border border-background/20"
            aria-label={isZoomed ? "Dézoomer" : "Zoomer"}
          >
            {isZoomed ? <ZoomOut size={20} /> : <ZoomIn size={20} />}
          </motion.button>

          {/* Navigation arrows */}
          <AnimatePresence>
            {currentIndex > 0 && !isZoomed && (
              <motion.button
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.25)" }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrev();
                }}
                className="absolute left-4 md:left-8 z-20 w-14 h-14 rounded-full bg-background/10 backdrop-blur-md
                           flex items-center justify-center text-background
                           transition-colors duration-300 border border-background/20"
                aria-label="Image précédente"
              >
                <ChevronLeft size={28} />
              </motion.button>
            )}
          </AnimatePresence>
          
          <AnimatePresence>
            {currentIndex < images.length - 1 && !isZoomed && (
              <motion.button
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.25)" }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => {
                  e.stopPropagation();
                  handleNext();
                }}
                className="absolute right-4 md:right-8 z-20 w-14 h-14 rounded-full bg-background/10 backdrop-blur-md
                           flex items-center justify-center text-background
                           transition-colors duration-300 border border-background/20"
                aria-label="Image suivante"
              >
                <ChevronRight size={28} />
              </motion.button>
            )}
          </AnimatePresence>

          {/* Image container with 3D perspective */}
          <div 
            className="relative w-full h-full flex items-center justify-center p-4 md:p-16"
            style={{ perspective: "1200px" }}
            onClick={(e) => e.stopPropagation()}
          >
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                drag={isZoomed ? false : "x"}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.15}
                onDragEnd={handleDragEnd}
                style={isZoomed ? {} : { x, opacity, scale }}
                className={`max-w-full max-h-full ${isZoomed ? '' : 'cursor-grab active:cursor-grabbing'}`}
              >
                <motion.img
                  src={images[currentIndex].src}
                  alt={images[currentIndex].alt}
                  className="max-w-full max-h-[85vh] object-contain rounded-2xl"
                  style={{
                    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 100px rgba(0, 0, 0, 0.3)"
                  }}
                  animate={{
                    scale: isZoomed ? 1.5 : 1,
                  }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  draggable={false}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (!isZoomed) toggleZoom();
                  }}
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Bottom info bar */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ delay: 0.3, duration: 0.4 }}
            className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-foreground/80 to-transparent 
                       pt-20 pb-8 px-6"
          >
            <div className="max-w-4xl mx-auto">
              {/* Caption */}
              <motion.p 
                key={currentIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-background text-center text-lg font-medium mb-4"
              >
                {images[currentIndex].alt}
              </motion.p>
              
              {/* Dots navigation */}
              <div className="flex items-center justify-center gap-2">
                {images.map((_, i) => (
                  <motion.button
                    key={i}
                    onClick={(e) => {
                      e.stopPropagation();
                      setDirection(i > currentIndex ? 1 : -1);
                      setIsZoomed(false);
                      onNavigate(i);
                    }}
                    className="relative h-2 rounded-full overflow-hidden transition-all duration-500"
                    animate={{
                      width: i === currentIndex ? 32 : 8,
                      backgroundColor: i === currentIndex 
                        ? "hsl(var(--primary))" 
                        : "rgba(255,255,255,0.3)"
                    }}
                    whileHover={{ backgroundColor: i === currentIndex 
                      ? "hsl(var(--primary))" 
                      : "rgba(255,255,255,0.5)" 
                    }}
                    aria-label={`Image ${i + 1}`}
                  >
                    {i === currentIndex && (
                      <motion.div
                        className="absolute inset-0 bg-primary-foreground/30"
                        initial={{ x: "-100%" }}
                        animate={{ x: "100%" }}
                        transition={{ 
                          duration: 3, 
                          repeat: Infinity,
                          ease: "linear"
                        }}
                      />
                    )}
                  </motion.button>
                ))}
              </div>
              
              {/* Counter */}
              <p className="text-background/60 text-center text-sm mt-4">
                {currentIndex + 1} / {images.length}
              </p>
            </div>
          </motion.div>

          {/* Swipe hint for mobile */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.5 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none
                       md:hidden"
          >
            <motion.div
              initial={{ opacity: 0.5, x: 0 }}
              animate={{ opacity: [0.5, 0, 0.5], x: [-10, 10, -10] }}
              transition={{ duration: 2, repeat: 2, delay: 1 }}
              className="text-background/40 text-sm flex items-center gap-2"
            >
              <ChevronLeft size={16} />
              Balayez pour naviguer
              <ChevronRight size={16} />
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
