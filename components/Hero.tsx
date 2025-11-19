import React from 'react';
import { ArrowDown, ArrowRight } from 'lucide-react';
import { GridPattern, PlusIcon } from './GeometricElements';
import { motion, useScroll, useTransform } from 'framer-motion';

const Hero: React.FC = () => {
  const { scrollY } = useScroll();
  
  // Parallax effects
  const yBg = useTransform(scrollY, [0, 500], [0, 200]);
  const rotateBg = useTransform(scrollY, [0, 500], [45, 90]);
  const opacityText = useTransform(scrollY, [0, 300], [1, 0]);
  const yText = useTransform(scrollY, [0, 300], [0, 100]);

  return (
    <section className="relative min-h-screen flex flex-col justify-center pt-20 border-b border-zinc-200 overflow-hidden">
      <GridPattern />
      
      {/* Abstract Geometric Decoration with Parallax */}
      <motion.div 
        style={{ y: yBg, rotate: 0 }}
        className="absolute top-1/3 right-[10%] w-64 h-64 border border-zinc-200 rounded-full hidden lg:block opacity-40"
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
      />
      
      <motion.div 
        style={{ y: yBg, rotate: rotateBg }}
        className="absolute top-1/3 right-[10%] w-64 h-64 border border-zinc-200 hidden lg:block opacity-40"
      />

      <motion.div 
        className="container mx-auto px-8 md:px-16 lg:px-24 relative z-10"
        style={{ opacity: opacityText, y: yText }}
      >
        <div className="max-w-4xl">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex items-center gap-4 mb-6"
          >
            <span className="h-[1px] w-12 bg-zinc-400"></span>
            <span className="text-sm uppercase tracking-widest text-zinc-500 font-medium">Portfolio 2024</span>
          </motion.div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-[1.1] mb-8 overflow-hidden">
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
            >
              DESIGNING
            </motion.div>
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
              className="flex flex-wrap gap-x-4"
            >
              <span className="text-zinc-400 font-light">DIGITAL</span> CLARITY.
            </motion.div>
          </h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-lg md:text-xl text-zinc-600 max-w-xl leading-relaxed mb-12 border-l border-zinc-300 pl-6"
          >
            I craft high-performance interfaces with a focus on geometric precision, clean typography, and seamless user interaction.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex flex-col sm:flex-row items-start sm:items-center gap-6"
          >
            <a 
              href="#work" 
              className="group relative px-8 py-4 bg-zinc-900 text-white font-medium text-sm flex items-center gap-3 overflow-hidden"
            >
              <span className="relative z-10">VIEW PROJECTS</span>
              <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" />
              <div className="absolute inset-0 bg-zinc-700 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></div>
            </a>
            
            <a 
              href="#about" 
              className="px-8 py-4 border border-zinc-300 text-zinc-900 font-medium text-sm hover:bg-zinc-50 transition-colors"
            >
              ABOUT ME
            </a>
          </motion.div>
        </div>
      </motion.div>

      {/* Bottom Bar */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.5 }}
        className="absolute bottom-0 left-0 right-0 border-t border-zinc-200 bg-white/50 backdrop-blur-sm"
      >
        <div className="container mx-auto px-8 md:px-16 lg:px-24 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-zinc-500 uppercase tracking-widest">
            <PlusIcon className="text-zinc-400" />
            <span>Scroll to explore</span>
          </div>
          <motion.div 
            animate={{ y: [0, 5, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          >
            <ArrowDown className="w-4 h-4 text-zinc-400" />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;