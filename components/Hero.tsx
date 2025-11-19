
import React from 'react';
import { ArrowDown, ArrowRight } from 'lucide-react';
import { GridPattern, PlusIcon, Crosshair, StripedBar, DotPattern } from './GeometricElements';
import { motion, useScroll, useTransform } from 'framer-motion';
import { RevealTitle, Typewriter, StaggerText } from './TextAnimations';

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
      <DotPattern className="opacity-20" />
      
      {/* Geometric Accents */}
      <div className="absolute top-32 left-8 hidden lg:block opacity-50">
        <Crosshair />
        <div className="mt-2 text-[10px] font-mono text-zinc-400">FIG. 01</div>
      </div>
      
      <div className="absolute bottom-32 right-8 hidden lg:block opacity-50">
        <Crosshair />
        <div className="mt-2 text-[10px] font-mono text-zinc-400 text-right">FIG. 02</div>
      </div>

      <motion.div 
        style={{ y: yBg }}
        className="absolute top-1/4 right-0 w-24 opacity-20 hidden lg:block"
      >
         <StripedBar className="w-full h-64 rotate-90" />
      </motion.div>

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
            className="flex items-center gap-4 mb-8"
          >
            <span className="h-[1px] w-12 bg-zinc-400"></span>
            <Typewriter 
              text="PORTFOLIO 2024 / FATIH.DEV" 
              className="text-sm uppercase tracking-widest text-zinc-500 font-medium"
              speed={0.03}
            />
            <StripedBar className="w-12 h-2 ml-4 opacity-30 hidden sm:block" />
          </motion.div>
          
          <div className="mb-8">
            {/* Adjusted font sizes for better mobile fit: text-4xl instead of 5xl on small screens */}
            <RevealTitle 
              text="DESIGNING" 
              className="text-4xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-[1.1]"
            />
             <div className="flex flex-wrap gap-x-4 items-baseline">
                <span className="text-4xl md:text-7xl lg:text-8xl font-light tracking-tighter text-zinc-400 leading-[1.1]">
                   <RevealTitle text="DIGITAL" delay={0.2} />
                </span>
                <RevealTitle text="CLARITY." delay={0.4} className="text-4xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-[1.1]" />
             </div>
          </div>
          
          <div className="max-w-xl border-l border-zinc-300 pl-6 mb-12 relative">
            <div className="absolute -left-[5px] top-0 w-2 h-2 bg-zinc-900 rounded-full"></div>
            <div className="absolute -left-[5px] bottom-0 w-2 h-2 bg-zinc-900 rounded-full"></div>
            
            <StaggerText 
              text="I'm Fatih. I craft high-performance interfaces with a focus on geometric precision, clean typography, and seamless user interaction."
              className="text-lg md:text-xl text-zinc-600 leading-relaxed"
              delay={0.8}
            />
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="flex flex-col sm:flex-row items-start sm:items-center gap-6"
          >
            <a 
              href="#work" 
              className="group relative px-8 py-4 bg-zinc-900 text-white font-medium text-sm flex items-center gap-3 overflow-hidden w-full sm:w-auto justify-center sm:justify-start"
            >
              <span className="relative z-10">VIEW PROJECTS</span>
              <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" />
              <div className="absolute inset-0 bg-zinc-700 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></div>
            </a>
            
            <a 
              href="#about" 
              className="px-8 py-4 border border-zinc-300 text-zinc-900 font-medium text-sm hover:bg-zinc-50 transition-colors w-full sm:w-auto text-center relative overflow-hidden group"
            >
              <span className="relative z-10">ABOUT ME</span>
              <div className="absolute bottom-0 left-0 w-full h-[2px] bg-zinc-900 scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
            </a>
          </motion.div>
        </div>
      </motion.div>

      {/* Bottom Bar - Hidden on very short screens to prevent overlap */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.5 }}
        className="absolute bottom-0 left-0 right-0 border-t border-zinc-200 bg-white/50 backdrop-blur-sm hidden min-h-[700px]:block"
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
