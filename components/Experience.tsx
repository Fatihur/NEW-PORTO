import React from 'react';
import { ExperienceItem } from '../types';
import { motion } from 'framer-motion';

interface ExperienceProps {
  items?: ExperienceItem[];
}

const Experience: React.FC<ExperienceProps> = ({ items = [] }) => {
  if (items.length === 0) return null;

  return (
    <section id="experience" className="py-24 md:py-32 bg-zinc-50 border-b border-zinc-200">
      <div className="container mx-auto px-8 md:px-16 lg:px-24">
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Left Column: Sticky Title */}
          <div className="lg:w-1/3">
            <div className="sticky top-32">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Experience</h2>
                <p className="text-zinc-500 leading-relaxed mb-8">
                  My professional journey across different roles and companies, focused on delivering robust digital products.
                </p>
                <div className="h-[1px] w-16 bg-zinc-900 hidden lg:block"></div>
              </motion.div>
            </div>
          </div>

          {/* Right Column: Stacking Cards */}
          <div className="lg:w-2/3 relative">
            {items.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                // The Sticky Stack Magic
                className="sticky mb-8 bg-white border border-zinc-200 p-8 md:p-10 shadow-sm"
                style={{ 
                  top: `calc(120px + ${index * 20}px)`, // Dynamic top offset creates the stack effect
                  zIndex: index + 1
                }}
              >
                {/* Card Content */}
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-2">
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold text-zinc-900">{item.role}</h3>
                    <p className="text-zinc-500 font-medium">{item.company}</p>
                  </div>
                  <div className="px-3 py-1 border border-zinc-900 rounded-full inline-block w-fit">
                    <span className="text-xs font-bold uppercase tracking-widest">{item.period}</span>
                  </div>
                </div>

                <p className="text-zinc-600 leading-relaxed mb-8 text-base md:text-lg">
                  {item.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {item.skills.map((skill) => (
                    <span 
                      key={skill} 
                      className="px-3 py-1 bg-zinc-50 text-xs font-medium text-zinc-500 uppercase tracking-wider border border-zinc-100"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                {/* Decorative Geometric Element */}
                <div className="absolute top-0 right-0 w-6 h-6 border-b border-l border-zinc-200"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;