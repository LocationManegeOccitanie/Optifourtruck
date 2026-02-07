/**
 * Premium Animation System
 * Unified easing, timing, and spring configurations for cinematic animations
 */

// ============ EASING CURVES ============
// All curves are tuned for premium, professional feel

export const EASE = {
  /** Standard smooth transitions - most common use */
  smooth: [0.22, 1, 0.36, 1] as const,
  
  /** Spectacular entrances - hero elements, page reveals */
  expo: [0.16, 1, 0.3, 1] as const,
  
  /** Micro-interactions - buttons, hovers, subtle feedback */
  bounce: [0.34, 1.56, 0.64, 1] as const,
  
  /** Exit animations - fade outs, slide outs */
  exit: [0.4, 0, 0.2, 1] as const,
  
  /** Cinematic slow reveals */
  cinematic: [0.7, 0, 0.3, 1] as const,
} as const;

// ============ DURATIONS ============
// Consistent timing across all animations

export const DURATION = {
  /** Quick micro-interactions: 200ms */
  instant: 0.2,
  
  /** Fast transitions: 300ms */
  fast: 0.3,
  
  /** Normal transitions: 500ms */
  normal: 0.5,
  
  /** Slow, deliberate animations: 800ms */
  slow: 0.8,
  
  /** Cinematic reveals: 1.2s */
  cinematic: 1.2,
  
  /** Epic page transitions: 1.6s */
  epic: 1.6,
} as const;

// ============ SPRING CONFIGS ============
// Physics-based animation presets

export const SPRING = {
  /** Gentle, smooth feel */
  gentle: { stiffness: 120, damping: 20, mass: 1 },
  
  /** Quick, responsive feel */
  snappy: { stiffness: 400, damping: 30, mass: 0.8 },
  
  /** Playful, bouncy feel */
  bouncy: { stiffness: 300, damping: 15, mass: 1 },
  
  /** Subtle, barely noticeable */
  subtle: { stiffness: 200, damping: 25, mass: 1 },
  
  /** Cursor/following elements */
  cursor: { stiffness: 300, damping: 25, mass: 0.5 },
} as const;

// ============ STAGGER CONFIGS ============
// Delay patterns for sequential animations

export const STAGGER = {
  /** Fast cascade: 50ms */
  fast: 0.05,
  
  /** Normal cascade: 100ms */
  normal: 0.1,
  
  /** Slow, deliberate cascade: 150ms */
  slow: 0.15,
  
  /** Cinematic cascade: 200ms */
  cinematic: 0.2,
} as const;

// ============ VIEWPORT CONFIGS ============
// Scroll trigger configurations

export const VIEWPORT = {
  /** Standard viewport trigger */
  default: { once: true, margin: "-100px" as const },
  
  /** Early trigger for above-fold content */
  early: { once: true, margin: "-50px" as const },
  
  /** Late trigger for dramatic reveals */
  late: { once: true, margin: "-200px" as const },
  
  /** Repeating animations */
  repeat: { once: false, margin: "-100px" as const },
} as const;

// ============ ANIMATION PRESETS ============
// Ready-to-use animation configurations

export const ANIMATE = {
  /** Fade in from below */
  fadeInUp: {
    initial: { opacity: 0, y: 40 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: DURATION.normal, ease: EASE.smooth },
  },
  
  /** Fade in from above */
  fadeInDown: {
    initial: { opacity: 0, y: -40 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: DURATION.normal, ease: EASE.smooth },
  },
  
  /** Fade in from left */
  fadeInLeft: {
    initial: { opacity: 0, x: -40 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: DURATION.normal, ease: EASE.smooth },
  },
  
  /** Fade in from right */
  fadeInRight: {
    initial: { opacity: 0, x: 40 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: DURATION.normal, ease: EASE.smooth },
  },
  
  /** Scale in with fade */
  scaleIn: {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: DURATION.fast, ease: EASE.bounce },
  },
  
  /** Blur in reveal */
  blurIn: {
    initial: { opacity: 0, filter: "blur(10px)" },
    animate: { opacity: 1, filter: "blur(0px)" },
    transition: { duration: DURATION.slow, ease: EASE.smooth },
  },
} as const;

// ============ TRANSITION PRESETS ============
// Common transition configurations

export const TRANSITION = {
  /** Standard smooth transition */
  smooth: {
    duration: DURATION.normal,
    ease: EASE.smooth,
  },
  
  /** Fast micro-interaction */
  fast: {
    duration: DURATION.fast,
    ease: EASE.smooth,
  },
  
  /** Slow cinematic transition */
  slow: {
    duration: DURATION.slow,
    ease: EASE.expo,
  },
  
  /** Spring-based transition */
  spring: {
    type: "spring" as const,
    ...SPRING.gentle,
  },
  
  /** Snappy spring transition */
  snappySpring: {
    type: "spring" as const,
    ...SPRING.snappy,
  },
} as const;

// ============ GPU OPTIMIZATION ============
// Will-change and transform utilities

export const GPU_ACCELERATED_STYLES = {
  willChangeTransform: { willChange: "transform" },
  willChangeOpacity: { willChange: "opacity" },
  willChangeAll: { willChange: "transform, opacity, filter" },
  forceGPU: { transform: "translateZ(0)" },
} as const;

// ============ CONTAINER VARIANTS ============
// For staggered children animations

export const createStaggerContainer = (stagger = STAGGER.normal) => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: stagger,
      delayChildren: 0.1,
    },
  },
});

export const staggerItem = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: DURATION.normal,
      ease: EASE.smooth,
    },
  },
};
