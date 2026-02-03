import { useState, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Sun, Moon } from "lucide-react";

export const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  // Check for saved preference or system preference on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    
    if (savedTheme === "dark" || (!savedTheme && systemPrefersDark)) {
      setIsDark(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    
    if (newIsDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  const springTransition = prefersReducedMotion 
    ? { duration: 0 }
    : { type: "spring" as const, stiffness: 300, damping: 20 };

  return (
    <motion.button
      onClick={toggleTheme}
      className="relative p-2 rounded-full bg-muted/50 hover:bg-muted transition-colors duration-300 group"
      whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
      whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
      aria-label={isDark ? "Activer le mode clair" : "Activer le mode sombre"}
      title={isDark ? "Mode clair" : "Mode sombre"}
    >
      <div className="relative w-5 h-5 overflow-hidden">
        {/* Sun icon */}
        <motion.div
          initial={false}
          animate={{
            y: isDark ? -24 : 0,
            opacity: isDark ? 0 : 1,
            rotate: isDark ? -90 : 0,
          }}
          transition={springTransition}
          className="absolute inset-0 flex items-center justify-center text-primary"
        >
          <Sun size={18} strokeWidth={2} />
        </motion.div>
        
        {/* Moon icon */}
        <motion.div
          initial={false}
          animate={{
            y: isDark ? 0 : 24,
            opacity: isDark ? 1 : 0,
            rotate: isDark ? 0 : 90,
          }}
          transition={springTransition}
          className="absolute inset-0 flex items-center justify-center text-primary"
        >
          <Moon size={18} strokeWidth={2} />
        </motion.div>
      </div>
      
      {/* Glow effect on hover */}
      <motion.div
        className="absolute inset-0 rounded-full bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        initial={false}
      />
    </motion.button>
  );
};
