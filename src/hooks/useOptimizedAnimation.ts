import { useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

const MOBILE_BREAKPOINT = 768;
const TABLET_BREAKPOINT = 1024;

/**
 * Hook to optimize animations based on device and user preferences
 * Automatically disables/reduces animations for:
 * - Users with prefers-reduced-motion
 * - Mobile devices (for performance)
 * - Low-end devices (detected via navigator.hardwareConcurrency)
 */
export function useOptimizedAnimation() {
  const prefersReduced = useReducedMotion();
  const [deviceType, setDeviceType] = useState<'mobile' | 'tablet' | 'desktop'>('desktop');
  const [isLowEndDevice, setIsLowEndDevice] = useState(false);

  useEffect(() => {
    const checkDevice = () => {
      const width = window.innerWidth;
      if (width < MOBILE_BREAKPOINT) {
        setDeviceType('mobile');
      } else if (width < TABLET_BREAKPOINT) {
        setDeviceType('tablet');
      } else {
        setDeviceType('desktop');
      }
    };

    // Check for low-end device
    const cores = navigator.hardwareConcurrency || 4;
    setIsLowEndDevice(cores <= 2);

    checkDevice();
    
    const mql = window.matchMedia(`(max-width: ${TABLET_BREAKPOINT - 1}px)`);
    const onChange = () => checkDevice();
    mql.addEventListener("change", onChange);
    
    return () => mql.removeEventListener("change", onChange);
  }, []);

  const isMobile = deviceType === 'mobile';
  const isTablet = deviceType === 'tablet';
  const isDesktop = deviceType === 'desktop';

  return {
    /** Whether animations should run at all */
    shouldAnimate: !prefersReduced,
    
    /** Animation intensity level */
    intensity: prefersReduced ? 'none' as const : 
               isMobile ? 'minimal' as const : 
               isTablet ? 'reduced' as const : 
               'full' as const,
    
    /** Whether parallax effects should be enabled */
    parallaxEnabled: isDesktop && !prefersReduced && !isLowEndDevice,
    
    /** Whether custom cursor should be shown */
    cursorEnabled: isDesktop && !prefersReduced,
    
    /** Whether floating/background elements should animate */
    floatingEnabled: !isMobile && !prefersReduced && !isLowEndDevice,
    
    /** Whether smooth scroll should be enabled */
    smoothScrollEnabled: !isMobile && !prefersReduced,
    
    /** Device type for conditional rendering */
    deviceType,
    
    /** Is mobile device */
    isMobile,
    
    /** Is tablet device */
    isTablet,
    
    /** Is desktop device */
    isDesktop,
    
    /** User prefers reduced motion */
    prefersReducedMotion: !!prefersReduced,
    
    /** Device has limited CPU resources */
    isLowEndDevice,
  };
}

/**
 * Get reduced animation values based on intensity
 */
export function getOptimizedValues(intensity: 'none' | 'minimal' | 'reduced' | 'full') {
  switch (intensity) {
    case 'none':
      return {
        duration: 0,
        distance: 0,
        scale: 1,
        blur: 0,
        delay: 0,
      };
    case 'minimal':
      return {
        duration: 0.2,
        distance: 10,
        scale: 0.98,
        blur: 0,
        delay: 0,
      };
    case 'reduced':
      return {
        duration: 0.4,
        distance: 20,
        scale: 0.95,
        blur: 5,
        delay: 0.05,
      };
    case 'full':
    default:
      return {
        duration: 0.6,
        distance: 40,
        scale: 0.9,
        blur: 10,
        delay: 0.1,
      };
  }
}
