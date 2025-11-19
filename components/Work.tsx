
import React from 'react';
import { ArrowUpRight, Plus } from 'lucide-react';
import { Project } from '../types';
import { motion } from 'framer-motion';
import { RevealTitle, StaggerText } from './TextAnimations';
import { TechnicalCorner } from './GeometricElements';
import ScrollFocusItem from './ScrollFocusItem';

interface WorkProps {
  projects: Project[];
  onProjectClick: (project: Project) => void;
  onViewAllClick: () => void;
}

const Work: React.FC<WorkProps> = ({ projects, onProjectClick, onViewAllClick }) => {
  // Show only first 4 projects on home page from the passed data
  const featuredProjects = projects.slice(0, 4);

  return (
    <section id="work" className="py-24 md:py-32 bg-zinc-50 border-b border-zinc-200">
      <div className="container mx-auto px-6 md:px-12 lg:px-24">
        <div className="flex justify-between items-end mb-12">
          <div>
            <RevealTitle text="Selected Works" className="text-3xl md:text-4xl font-bold tracking-tight mb-4" />
            <StaggerText 
              text="A collection of digital products and experiences."
              className="text-zinc-500"
              delay={0.2}
            />
          </div>
          <motion.button 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            onClick={onViewAllClick}
            className="hidden md:flex items-center gap-2 text-sm font-bold uppercase tracking-wider hover:text-zinc-600 transition-colors border-b border-transparent hover:border-zinc-900 pb-1"
          >
            View All
            <ArrowUpRight className="w-4 h-4" />
          </motion.button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {featuredProjects.map((project) => (
            <ScrollFocusItem key={project.id} intensity="medium">
              <div 
                className="group cursor-pointer block"
                onClick={() => onProjectClick(project)}
              >
                <div className="relative overflow-hidden border border-zinc-200 bg-white p-3 mb-6">
                  {/* Crop Marks */}
                  <TechnicalCorner className="absolute top-0 left-0 text-zinc-900 z-20" />
                  <TechnicalCorner className="absolute top-0 right-0 rotate-90 text-zinc-900 z-20" />
                  <TechnicalCorner className="absolute bottom-0 left-0 -rotate-90 text-zinc-900 z-20" />
                  <TechnicalCorner className="absolute bottom-0 right-0 rotate-180 text-zinc-900 z-20" />

                  <div className="aspect-[4/3] overflow-hidden bg-zinc-100 relative m-1">
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-zinc-900/0 group-hover:bg-zinc-900/10 transition-colors duration-300 flex items-center justify-center">
                      <div className="bg-white text-zinc-900 px-6 py-3 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 font-medium text-sm">
                        View Project
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between items-start px-2">
                  <div>
                    <div className="flex items-center gap-3 mb-2 text-xs font-medium uppercase tracking-widest text-zinc-500">
                      <span>{project.year}</span>
                      <span className="w-4 h-[1px] bg-zinc-300"></span>
                      <span>{project.category}</span>
                    </div>
                    <h3 className="text-2xl font-bold group-hover:underline decoration-1 underline-offset-4 transition-all">
                      {project.title}
                    </h3>
                  </div>
                  <div className="w-8 h-8 border border-zinc-200 flex items-center justify-center text-zinc-400 group-hover:bg-zinc-900 group-hover:text-white group-hover:border-zinc-900 transition-colors">
                    <Plus className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </ScrollFocusItem>
          ))}
        </div>
        
        <div className="mt-12 md:mt-16 flex justify-center md:hidden">
          <button 
            onClick={onViewAllClick}
            className="w-full py-4 border border-zinc-300 text-sm font-medium hover:bg-zinc-900 hover:text-white hover:border-zinc-900 transition-all duration-300 flex items-center justify-center gap-2"
          >
            VIEW ALL ARCHIVE <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Work;
