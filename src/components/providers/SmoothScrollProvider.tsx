import { ReactNode, useEffect, useRef } from "react";
import Lenis from "lenis";
import { useOptimizedAnimation } from "@/hooks/useOptimizedAnimation";

interface SmoothScrollProviderProps {
  children: ReactNode;
}

/**
 * Premium Smooth Scroll Provider
 * Uses Lenis for ultra-smooth scrolling like Apple/Awwwards sites
 * Automatically disabled on mobile and for reduced motion preferences
 */
export const SmoothScrollProvider = ({ children }: SmoothScrollProviderProps) => {
  const lenisRef = useRef<Lenis | null>(null);
  const { smoothScrollEnabled } = useOptimizedAnimation();

  useEffect(() => {
    if (!smoothScrollEnabled) {
      // Ensure native scroll behavior when smooth scroll is disabled
      document.documentElement.style.scrollBehavior = 'auto';
      return;
    }

    // Premium Lenis configuration
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      touchMultiplier: 2,
      infinite: false,
    });

    lenisRef.current = lenis;

    // Animation frame loop
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Sync with native scroll for compatibility
    lenis.on('scroll', () => {
      // This allows other scroll-based animations to work
    });

    return () => {
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [smoothScrollEnabled]);

  // Expose Lenis instance for programmatic control
  useEffect(() => {
    if (lenisRef.current) {
      // Make Lenis available globally for other components
      (window as any).__lenis = lenisRef.current;
    }
    return () => {
      (window as any).__lenis = null;
    };
  }, [smoothScrollEnabled]);

  return <>{children}</>;
};

/**
 * Hook to access Lenis instance for programmatic scroll control
 */
export const useLenis = () => {
  return (window as any).__lenis as Lenis | null;
};

/**
 * Scroll to element with smooth animation
 */
export const scrollToElement = (selector: string, offset = 0) => {
  const lenis = (window as any).__lenis as Lenis | null;
  const element = document.querySelector(selector) as HTMLElement | null;
  
  if (lenis && element) {
    lenis.scrollTo(element, { offset });
  } else if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};

/**
 * Scroll to top with smooth animation
 */
export const scrollToTop = () => {
  const lenis = (window as any).__lenis as Lenis | null;
  
  if (lenis) {
    lenis.scrollTo(0);
  } else {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
};
