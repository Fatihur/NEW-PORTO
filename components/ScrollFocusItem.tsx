
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface ScrollFocusItemProps {
  children: React.ReactNode;
  className?: string;
  /**
   * Adjusts the intensity of the Scale/Fly effect.
   */
  intensity?: 'light' | 'medium' | 'heavy';
}

const ScrollFocusItem: React.FC<ScrollFocusItemProps> = ({ 
  children, 
  className = "",
  intensity = 'medium' 
}) => {
  const ref = useRef<HTMLDivElement>(null);
  
  // Track element position in viewport
  // "start 90%": Animation starts when top of element enters bottom 10% of screen
  // "end 10%": Animation ends when bottom of element leaves top 10% of screen
  // This creates a continuous effect that reverses when scrolling back up
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 95%", "end 5%"] 
  });

  // Configuration for Scale, Opacity, and Y-translation (Fly effect)
  const settings = {
    light: {
      scale: [0.95, 1, 0.95],
      opacity: [0.7, 1, 0.7],
      y: [30, 0, -30]
    },
    medium: {
      scale: [0.85, 1, 0.85],
      opacity: [0.4, 1, 0.4],
      y: [60, 0, -60]
    },
    heavy: {
      scale: [0.75, 1, 0.75],
      opacity: [0.2, 1, 0.2],
      y: [100, 0, -100]
    }
  };

  const current = settings[intensity];

  // Map scroll position to styles
  // 0 = enters from bottom (Fly In)
  // 0.5 = center of screen (Focused)
  // 1 = exits to top (Fly Out)
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], current.scale);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], current.opacity);
  const y = useTransform(scrollYProgress, [0, 0.5, 1], current.y);

  return (
    <motion.div
      ref={ref}
      style={{ scale, opacity, y }}
      className={`${className} origin-center will-change-transform`}
    >
      {children}
    </motion.div>
  );
};

export default ScrollFocusItem;
