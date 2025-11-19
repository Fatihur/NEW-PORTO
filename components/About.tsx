
import React from 'react';
import { CornerAccents, ConcentricCircles, GridPattern } from './GeometricElements';
import { CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { RevealTitle, Typewriter } from './TextAnimations';

const About: React.FC = () => {
  const skills = [
    "React / Next.js", "TypeScript", "Tailwind CSS",
    "Node.js", "PostgreSQL", "AWS / Cloud", "UI Animation"
  ];

  return (
    <section id="about" className="py-24 md:py-32 bg-white border-b border-zinc-200 overflow-hidden">
      <div className="container mx-auto px-8 md:px-16 lg:px-24">
        <div className="flex flex-col lg:flex-row gap-16">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, margin: "-20%" }}
            transition={{ duration: 0.6 }}
            className="lg:w-1/2"
          >
            <div className="mb-8">
               <RevealTitle text="Precision in code." className="text-3xl md:text-4xl font-bold tracking-tight" />
               <RevealTitle text="Elegance in design." className="text-3xl md:text-4xl font-bold tracking-tight" delay={0.2} />
            </div>
            
            <div className="space-y-6 text-zinc-600 leading-relaxed">
              <p>
                Hi, I'm <strong>Fatih</strong>. I am a frontend engineer with a background in graphic design. This duality allows me to bridge the gap between visual aesthetics and technical implementation. I believe that the best digital products are those where form and function are indistinguishable.
              </p>
              <p>
                My approach is rooted in modularity and scalability. I build systems, not just pages. Every component is crafted with attention to accessibility, performance, and reusability.
              </p>
            </div>
            
            <div className="mt-12">
              <div className="mb-6">
                <Typewriter text="TECH STACK" className="text-sm font-bold uppercase tracking-widest text-zinc-900" speed={0.1} />
              </div>
              <div className="flex flex-wrap gap-3">
                {skills.map((skill, index) => (
                  <motion.span 
                    key={skill} 
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false }}
                    transition={{ delay: 0.2 + (index * 0.05) }}
                    className="px-4 py-2 border border-zinc-200 text-sm hover:border-zinc-900 hover:bg-zinc-50 transition-colors cursor-default relative group"
                  >
                    {skill}
                    {/* Tiny corner markers on hover */}
                    <span className="absolute top-0 left-0 w-1 h-1 border-t border-l border-zinc-900 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    <span className="absolute bottom-0 right-0 w-1 h-1 border-b border-r border-zinc-900 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, margin: "-20%" }}
            transition={{ duration: 0.8 }}
            className="lg:w-1/2 relative"
          >
             {/* Abstract Profile / Graphic Representation */}
             <div className="relative w-full h-full min-h-[400px] bg-zinc-50 border border-zinc-100 p-8 flex items-center justify-center overflow-hidden">
                <GridPattern />
                <CornerAccents />
                
                {/* Background Geometric */}
                <ConcentricCircles className="absolute w-[500px] h-[500px] opacity-10 text-zinc-400" />

                <div className="w-64 h-64 border border-zinc-300 relative z-10 bg-white">
                   <motion.div 
                     animate={{ rotate: [6, 3, 6] }}
                     transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                     className="absolute top-0 left-0 w-full h-full border border-zinc-300 rotate-6"
                   ></motion.div>
                   <motion.div 
                     animate={{ rotate: [-6, -3, -6] }}
                     transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                     className="absolute top-0 left-0 w-full h-full border border-zinc-300 -rotate-6"
                   ></motion.div>
                   <img 
                     src="https://picsum.photos/600/800?grayscale" 
                     alt="Portrait of Fatih" 
                     className="absolute inset-0 w-full h-full object-cover opacity-90 mix-blend-multiply grayscale contrast-125 p-1 bg-white"
                   />
                </div>
                
                {/* Floating Badge */}
                <motion.div 
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: false }}
                  transition={{ delay: 0.6 }}
                  className="absolute bottom-12 left-8 bg-white border border-zinc-200 p-4 shadow-[8px_8px_0px_0px_rgba(0,0,0,0.1)] max-w-[200px] z-20"
                >
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-zinc-900 shrink-0 mt-0.5" />
                    <p className="text-xs font-medium leading-tight">
                      Available for freelance projects in Q4 2024.
                    </p>
                  </div>
                </motion.div>
             </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
