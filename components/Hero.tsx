
import React from 'react';
import { ArrowDown, ArrowRight } from 'lucide-react';
import { GridPattern, PlusIcon, Crosshair, StripedBar, DotPattern } from './GeometricElements';
import { motion, useScroll, useTransform } from 'framer-motion';
import { RevealTitle, Typewriter, StaggerText } from './TextAnimations';
import { SparklesText } from './ui/sparkles-text';

const Hero: React.FC = () => {
  const { scrollY } = useScroll();
  
  // Parallax effects
  const yBg = useTransform(scrollY, [0, 500], [0, 200]);
  const opacityText = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <section className="relative min-h-screen flex flex-col justify-center pt-28 pb-12 md:pt-32 border-b border-zinc-200 overflow-hidden">
      <GridPattern />
      <DotPattern className="opacity-20" />
      
      {/* Global Geometric Accents */}
      <div className="absolute top-32 left-8 hidden lg:block opacity-50">
        <Crosshair />
        <div className="mt-2 text-[10px] font-mono text-zinc-400">FIG. 01</div>
      </div>

      <div className="container mx-auto px-6 md:px-12 lg:px-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* LEFT COLUMN: Text Content */}
          <motion.div 
            className="lg:col-span-7 relative z-20"
            style={{ opacity: opacityText }}
          >
            <div className="max-w-4xl">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex items-center gap-4 mb-8"
              >
                <span className="h-[1px] w-8 md:w-12 bg-zinc-400"></span>
                <Typewriter 
                  text="PORTFOLIO 2024 / FATIH.DEV" 
                  className="text-xs md:text-sm uppercase tracking-widest text-zinc-500 font-medium"
                  speed={0.03}
                />
                <StripedBar className="w-12 h-2 ml-4 opacity-30 hidden sm:block" />
              </motion.div>
              
              <div className="mb-8">
                <SparklesText 
                  text="DESIGNING" 
                  className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-[1.1] block"
                  colors={{ first: '#71717a', second: '#a1a1aa' }} 
                />
                 <div className="flex flex-wrap gap-x-3 md:gap-x-4 items-baseline">
                    <span className="text-5xl md:text-7xl lg:text-8xl font-light tracking-tighter text-zinc-400 leading-[1.1]">
                       <RevealTitle text="DIGITAL" delay={0.2} />
                    </span>
                    <RevealTitle text="CLARITY." delay={0.4} className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-[1.1]" />
                 </div>
              </div>
              
              <div className="max-w-xl border-l border-zinc-300 pl-6 mb-12 relative">
                <div className="absolute -left-[5px] top-0 w-2 h-2 bg-zinc-900 rounded-full"></div>
                <div className="absolute -left-[5px] bottom-0 w-2 h-2 bg-zinc-900 rounded-full"></div>
                
                <StaggerText 
                  text="I'm Fatih. I craft high-performance interfaces with a focus on geometric precision, clean typography, and seamless user interaction."
                  className="text-base md:text-xl text-zinc-600 leading-relaxed"
                  delay={0.8}
                />
              </div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.2 }}
                className="flex flex-col sm:flex-row items-start sm:items-center gap-4 md:gap-6"
              >
                <a 
                  href="#work" 
                  className="group relative px-8 py-4 bg-zinc-900 text-white font-medium text-sm flex items-center gap-3 overflow-hidden w-full sm:w-auto justify-center sm:justify-start shadow-lg hover:shadow-xl transition-shadow"
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

          {/* RIGHT COLUMN: 3D Geometric Tesseract */}
          <motion.div 
            className="lg:col-span-5 relative hidden lg:flex items-center justify-center h-[600px]"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
             <div className="relative w-[400px] h-[400px] flex items-center justify-center [perspective:1000px]">
                {/* Orbital Rings */}
                <motion.div 
                   className="absolute border border-zinc-200 rounded-full w-[500px] h-[500px]"
                   animate={{ rotate: 360, scale: [1, 1.05, 1] }}
                   transition={{ rotate: { duration: 30, repeat: Infinity, ease: "linear" }, scale: { duration: 5, repeat: Infinity, ease: "easeInOut" } }}
                />
                <motion.div 
                   className="absolute border border-dashed border-zinc-300 rounded-full w-[350px] h-[350px]"
                   animate={{ rotate: -360 }}
                   transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                />

                {/* 3D Cube Container */}
                <motion.div 
                   className="relative w-48 h-48 [transform-style:preserve-3d]"
                   animate={{ rotateX: 360, rotateY: 360 }}
                   transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                    {/* Outer Cube Faces (Translucent) */}
                    <div className="absolute inset-0 border border-zinc-300 bg-zinc-100/30 [transform:translateZ(96px)]" />
                    <div className="absolute inset-0 border border-zinc-300 bg-zinc-100/30 [transform:rotateY(180deg)_translateZ(96px)]" />
                    <div className="absolute inset-0 border border-zinc-300 bg-zinc-100/30 [transform:rotateY(90deg)_translateZ(96px)]" />
                    <div className="absolute inset-0 border border-zinc-300 bg-zinc-100/30 [transform:rotateY(-90deg)_translateZ(96px)]" />
                    <div className="absolute inset-0 border border-zinc-300 bg-zinc-100/30 [transform:rotateX(90deg)_translateZ(96px)]" />
                    <div className="absolute inset-0 border border-zinc-300 bg-zinc-100/30 [transform:rotateX(-90deg)_translateZ(96px)]" />

                    {/* Inner Core Cube (Solid/Darker) */}
                    <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 border border-zinc-900 bg-zinc-900/5 [transform:translateZ(48px)] flex items-center justify-center">
                        <div className="w-1 h-1 bg-zinc-900 rounded-full"></div>
                    </div>
                    <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 border border-zinc-900 bg-zinc-900/5 [transform:rotateY(180deg)_translateZ(48px)]" />
                    <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 border border-zinc-900 bg-zinc-900/5 [transform:rotateY(90deg)_translateZ(48px)]" />
                    <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 border border-zinc-900 bg-zinc-900/5 [transform:rotateY(-90deg)_translateZ(48px)]" />
                    <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 border border-zinc-900 bg-zinc-900/5 [transform:rotateX(90deg)_translateZ(48px)]" />
                    <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 border border-zinc-900 bg-zinc-900/5 [transform:rotateX(-90deg)_translateZ(48px)]" />
                </motion.div>

                {/* Floating Particles around the core */}
                {[...Array(6)].map((_, i) => (
                   <motion.div
                      key={i}
                      className="absolute w-2 h-2 bg-zinc-400 rounded-full"
                      animate={{ 
                         y: [-20, 20, -20], 
                         x: [-20, 20, -20], 
                         opacity: [0.5, 1, 0.5] 
                      }}
                      transition={{ 
                         duration: 3 + i, 
                         repeat: Infinity, 
                         ease: "easeInOut",
                         delay: i * 0.5
                      }}
                      style={{
                         top: `${50 + (Math.random() * 40 - 20)}%`,
                         left: `${50 + (Math.random() * 40 - 20)}%`,
                      }}
                   />
                ))}
             </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Bar */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.5 }}
        className="absolute bottom-0 left-0 right-0 border-t border-zinc-200 bg-white/50 backdrop-blur-sm hidden min-h-[800px]:block"
      >
        <div className="container mx-auto px-6 md:px-12 lg:px-24 h-16 flex items-center justify-between">
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
