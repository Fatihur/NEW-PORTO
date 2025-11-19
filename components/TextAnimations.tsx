
import React from 'react';
import { motion, Variants } from 'framer-motion';

// 1. MASK REVEAL EFFECT (Premium, sliding up from hidden)
interface RevealTitleProps {
  text: string;
  className?: string;
  delay?: number;
  lineHeight?: number | string;
}

export const RevealTitle: React.FC<RevealTitleProps> = ({ 
  text, 
  className = "", 
  delay = 0,
  lineHeight = 1.1
}) => {
  const words = text.split(" ");

  const container: Variants = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: delay * i },
    }),
  };

  const child: Variants = {
    hidden: { 
      y: "100%", 
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      }
    },
    visible: {
      y: "0%",
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 100,
        duration: 0.6
      },
    },
  };

  return (
    <motion.h1 
      className={`flex flex-wrap gap-x-[0.25em] overflow-hidden ${className}`}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, margin: "-10%" }} // Replay animation when scrolling back
      style={{ lineHeight }}
    >
      {words.map((word, index) => (
        <span key={index} className="relative overflow-hidden inline-block">
          <motion.span variants={child} className="inline-block">
            {word}
          </motion.span>
        </span>
      ))}
    </motion.h1>
  );
};

// 2. TYPEWRITER EFFECT (Technical/Code feel)
interface TypewriterProps {
  text: string;
  className?: string;
  delay?: number;
  speed?: number;
}

export const Typewriter: React.FC<TypewriterProps> = ({ 
  text, 
  className = "", 
  delay = 0,
  speed = 0.05 
}) => {
  const letters = Array.from(text);

  const container: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: speed, delayChildren: delay },
    },
  };

  const child: Variants = {
    hidden: { opacity: 0, y: 5 },
    visible: {
      opacity: 1,
      y: 0,
    },
  };

  return (
    <motion.div
      className={`inline-flex ${className}`}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, margin: "-5%" }} // Replay animation
    >
      {letters.map((letter, index) => (
        <motion.span key={index} variants={child}>
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0] }}
        transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
        className="ml-1 w-2 h-[1.2em] bg-zinc-900 align-middle inline-block"
      />
    </motion.div>
  );
};

// 3. STAGGERED TEXT (Smooth word fade for paragraphs/subtitles)
interface StaggerTextProps {
  text: string;
  className?: string;
  delay?: number;
}

export const StaggerText: React.FC<StaggerTextProps> = ({ 
  text, 
  className = "",
  delay = 0 
}) => {
  const words = text.split(" ");

  const container: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.03, delayChildren: delay },
    },
  };

  const child: Variants = {
    hidden: { opacity: 0, y: 10, filter: 'blur(4px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 0.4,
        ease: "easeOut"
      },
    },
  };

  return (
    <motion.p
      className={`flex flex-wrap gap-x-1.5 ${className}`}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, margin: "-10%" }} // Replay animation
    >
      {words.map((word, index) => (
        <motion.span key={index} variants={child}>
          {word}
        </motion.span>
      ))}
    </motion.p>
  );
};
