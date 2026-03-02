import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef, useCallback } from "react";
import { useOptimizedAnimation } from "@/hooks/useOptimizedAnimation";
import { SPRING } from "@/lib/animations";

type CursorState = 'default' | 'link' | 'button' | 'image' | 'text' | 'magnetic';

export const SmoothCursor = () => {
  const { cursorEnabled } = useOptimizedAnimation();
  const cursorStateRef = useRef<CursorState>('default');
  const isClickingRef = useRef(false);
  const isVisibleRef = useRef(false);
  
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  // Main cursor spring
  const springConfig = SPRING.cursor;
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);
  
  // Trail with delayed spring
  const trailSpringConfig = { ...SPRING.gentle, damping: 30 };
  const trailXSpring = useSpring(cursorX, trailSpringConfig);
  const trailYSpring = useSpring(cursorY, trailSpringConfig);

  // Motion values for animated properties (no re-renders)
  const mainSize = useMotionValue(16);
  const trailSize = useMotionValue(40);
  const mainOpacity = useMotionValue(0);
  const trailOpacity = useMotionValue(0);
  const mainBorderRadius = useMotionValue("50%");

  const updateCursorVisuals = useCallback(() => {
    const state = cursorStateRef.current;
    const clicking = isClickingRef.current;
    const visible = isVisibleRef.current;

    let main = 16, trail = 40;
    if (clicking) { main = 12; trail = 32; }
    else {
      switch (state) {
        case 'image': main = 60; trail = 80; break;
        case 'button': main = 40; trail = 56; break;
        case 'link': main = 32; trail = 48; break;
        case 'magnetic': main = 48; trail = 64; break;
        case 'text': main = 2; trail = 24; break;
      }
    }

    mainSize.set(main);
    trailSize.set(trail);
    mainOpacity.set(visible ? 1 : 0);
    trailOpacity.set(visible ? (state === 'default' ? 0.3 : 0.5) : 0);
    mainBorderRadius.set(state === 'text' ? '1px' : '50%');
  }, [mainSize, trailSize, mainOpacity, trailOpacity, mainBorderRadius]);

  const detectElementType = useCallback((target: HTMLElement): CursorState => {
    if (target.closest('[data-magnetic]')) return 'magnetic';
    if (target.tagName === 'IMG' || target.closest('[data-cursor-image]') || target.closest('.lightbox-trigger')) return 'image';
    if (target.tagName === 'BUTTON' || target.closest('button')) return 'button';
    if (target.tagName === 'A' || target.closest('a')) return 'link';
    if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') return 'text';
    return 'default';
  }, []);
  
  useEffect(() => {
    if (!cursorEnabled) return;
    
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisibleRef.current) {
        isVisibleRef.current = true;
        updateCursorVisuals();
      }
    };
    
    const handleMouseOver = (e: MouseEvent) => {
      const newState = detectElementType(e.target as HTMLElement);
      if (newState !== cursorStateRef.current) {
        cursorStateRef.current = newState;
        updateCursorVisuals();
      }
    };
    
    const handleMouseDown = () => { isClickingRef.current = true; updateCursorVisuals(); };
    const handleMouseUp = () => { isClickingRef.current = false; updateCursorVisuals(); };
    const handleMouseLeave = () => { isVisibleRef.current = false; updateCursorVisuals(); };
    const handleMouseEnter = () => { isVisibleRef.current = true; updateCursorVisuals(); };
    
    window.addEventListener("mousemove", moveCursor, { passive: true });
    document.addEventListener("mouseover", handleMouseOver, { passive: true });
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
  }, [cursorX, cursorY, cursorEnabled, detectElementType, updateCursorVisuals]);
  
  if (!cursorEnabled) return null;
  
  return (
    <>
      {/* Main cursor dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference hidden lg:block rounded-full bg-white"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: "-50%",
          translateY: "-50%",
          width: mainSize,
          height: mainSize,
          opacity: mainOpacity,
          borderRadius: mainBorderRadius,
        }}
      />
      
      {/* Trailing ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998] hidden lg:block rounded-full border border-primary"
        style={{
          x: trailXSpring,
          y: trailYSpring,
          translateX: "-50%",
          translateY: "-50%",
          width: trailSize,
          height: trailSize,
          opacity: trailOpacity,
        }}
      />
    </>
  );
};
