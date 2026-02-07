import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState, useCallback } from "react";
import { useOptimizedAnimation } from "@/hooks/useOptimizedAnimation";
import { SPRING } from "@/lib/animations";

type CursorState = 'default' | 'link' | 'button' | 'image' | 'text' | 'magnetic';

export const SmoothCursor = () => {
  const { cursorEnabled } = useOptimizedAnimation();
  const [isVisible, setIsVisible] = useState(false);
  const [cursorState, setCursorState] = useState<CursorState>('default');
  const [isClicking, setIsClicking] = useState(false);
  
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  // Optimized spring config for smooth following
  const springConfig = SPRING.cursor;
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);
  
  // Trail cursor with slightly delayed spring
  const trailSpringConfig = { ...SPRING.gentle, damping: 30 };
  const trailXSpring = useSpring(cursorX, trailSpringConfig);
  const trailYSpring = useSpring(cursorY, trailSpringConfig);

  const detectElementType = useCallback((target: HTMLElement): CursorState => {
    // Check for magnetic buttons
    if (target.closest('[data-magnetic]')) return 'magnetic';
    
    // Check for images
    if (target.tagName === 'IMG' || target.closest('[data-cursor-image]') || target.closest('.lightbox-trigger')) {
      return 'image';
    }
    
    // Check for buttons
    if (target.tagName === 'BUTTON' || target.closest('button')) return 'button';
    
    // Check for links
    if (target.tagName === 'A' || target.closest('a')) return 'link';
    
    // Check for text inputs
    if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') return 'text';
    
    return 'default';
  }, []);
  
  useEffect(() => {
    if (!cursorEnabled) return;
    
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      setIsVisible(true);
    };
    
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      setCursorState(detectElementType(target));
    };
    
    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    
    const handleMouseLeave = () => {
      setIsVisible(false);
    };
    
    const handleMouseEnter = () => {
      setIsVisible(true);
    };
    
    window.addEventListener("mousemove", moveCursor);
    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);
    document.documentElement.addEventListener("mouseleave", handleMouseLeave);
    document.documentElement.addEventListener("mouseenter", handleMouseEnter);
    
    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);
      document.documentElement.removeEventListener("mouseleave", handleMouseLeave);
      document.documentElement.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [cursorX, cursorY, cursorEnabled, detectElementType]);
  
  if (!cursorEnabled) return null;

  // Cursor visual states
  const getCursorSize = () => {
    if (isClicking) return { main: 12, trail: 32 };
    switch (cursorState) {
      case 'image': return { main: 60, trail: 80 };
      case 'button': return { main: 40, trail: 56 };
      case 'link': return { main: 32, trail: 48 };
      case 'magnetic': return { main: 48, trail: 64 };
      case 'text': return { main: 2, trail: 24 };
      default: return { main: 16, trail: 40 };
    }
  };

  const sizes = getCursorSize();
  
  return (
    <>
      {/* Main cursor dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference hidden lg:block"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: sizes.main,
          height: sizes.main,
          opacity: isVisible ? 1 : 0,
          borderRadius: cursorState === 'text' ? '1px' : '50%',
        }}
        transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.div 
          className="w-full h-full bg-white rounded-full"
          animate={{
            scale: isClicking ? 0.8 : 1,
          }}
          transition={{ duration: 0.1 }}
        />
        
        {/* Image state: View icon */}
        {cursorState === 'image' && (
          <motion.span
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="absolute inset-0 flex items-center justify-center text-black text-[10px] font-medium uppercase tracking-wider"
          >
            View
          </motion.span>
        )}
      </motion.div>
      
      {/* Trailing ring cursor */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998] hidden lg:block"
        style={{
          x: trailXSpring,
          y: trailYSpring,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: sizes.trail,
          height: sizes.trail,
          opacity: isVisible ? (cursorState === 'default' ? 0.3 : 0.5) : 0,
          borderWidth: cursorState === 'image' ? 2 : 1,
        }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.div 
          className="w-full h-full rounded-full border border-primary"
          animate={{
            borderColor: cursorState === 'image' ? 'hsl(var(--accent))' : 'hsl(var(--primary))',
          }}
          transition={{ duration: 0.2 }}
        />
      </motion.div>
      
      {/* Third layer - subtle glow for interactive states */}
      {(cursorState === 'button' || cursorState === 'magnetic') && (
        <motion.div
          className="fixed top-0 left-0 pointer-events-none z-[9997] hidden lg:block"
          style={{
            x: trailXSpring,
            y: trailYSpring,
            translateX: "-50%",
            translateY: "-50%",
          }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{
            width: sizes.trail + 20,
            height: sizes.trail + 20,
            opacity: isVisible ? 0.15 : 0,
            scale: 1,
          }}
          exit={{ opacity: 0, scale: 0.5 }}
          transition={{ duration: 0.3 }}
        >
          <div className="w-full h-full rounded-full bg-primary blur-md" />
        </motion.div>
      )}
    </>
  );
};
