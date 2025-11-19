
import React, { useState, useMemo } from 'react';
import { ArrowLeft, Plus, ArrowUpRight } from 'lucide-react';
import { Project } from '../types';
import { motion, AnimatePresence } from 'framer-motion';

interface AllProjectsProps {
  projects: Project[];
  onBack: () => void;
  onProjectClick: (project: Project) => void;
}

const AllProjects: React.FC<AllProjectsProps> = ({ projects, onBack, onProjectClick }) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');

  // Extract unique categories from passed projects
  const categories = useMemo(() => {
    const allCats = projects.map(p => p.category);
    return ['All', ...Array.from(new Set(allCats))];
  }, [projects]);

  const filteredProjects = useMemo(() => {
    if (activeCategory === 'All') return projects;
    return projects.filter(p => p.category === activeCategory);
  }, [activeCategory, projects]);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-zinc-50 min-h-screen pt-24 pb-24"
    >
      <div className="container mx-auto px-6 md:px-12 lg:px-24">
        {/* Header Section */}
        <div className="mb-16">
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-zinc-500 hover:text-zinc-900 transition-colors mb-8 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Home
          </button>
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div>
              <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6">Archive</h1>
              <p className="text-zinc-500 text-lg max-w-lg leading-relaxed">
                A curated collection of select works, experiments, and commercial projects from 2022 to present.
              </p>
            </div>
            
            {/* Stats / Counter */}
            <div className="hidden md:block text-right">
              <div className="text-6xl font-light text-zinc-200">
                {String(filteredProjects.length).padStart(2, '0')}
              </div>
              <div className="text-xs font-bold uppercase tracking-widest text-zinc-400 mt-2">
                Projects found
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-12 flex flex-wrap gap-4 border-y border-zinc-200 py-6 bg-white sticky top-[70px] z-20 -mx-6 px-6 md:-mx-0 md:px-0 md:bg-transparent md:static md:border-t-0 md:border-b md:pb-8">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 border ${
                activeCategory === category 
                  ? 'bg-zinc-900 text-white border-zinc-900' 
                  : 'bg-transparent text-zinc-500 border-zinc-200 hover:border-zinc-400 hover:text-zinc-900'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <motion.div 
                layout
                key={project.id} 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="group cursor-pointer flex flex-col"
                onClick={() => onProjectClick(project)}
              >
                {/* Image Card */}
                <div className="relative overflow-hidden bg-white mb-6">
                  <div className="aspect-[4/3] overflow-hidden bg-zinc-100 relative">
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 grayscale group-hover:grayscale-0"
                    />
                    
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-zinc-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    <div className="absolute bottom-4 right-4 w-10 h-10 bg-white flex items-center justify-center translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 z-10 shadow-lg">
                      <ArrowUpRight className="w-5 h-5 text-zinc-900" />
                    </div>
                  </div>
                  
                  {/* Geometric Frame */}
                  <div className="absolute inset-0 border border-zinc-200 pointer-events-none group-hover:border-zinc-400 transition-colors duration-300"></div>
                </div>

                {/* Content */}
                <div className="flex justify-between items-start">
                  <div className="flex-1 pr-4">
                     <div className="flex items-center gap-3 mb-2">
                      <span className="text-xs font-bold uppercase tracking-widest text-zinc-400">{project.year}</span>
                      <span className="w-1 h-1 rounded-full bg-zinc-300"></span>
                      <span className="text-xs font-bold uppercase tracking-widest text-zinc-900">{project.category}</span>
                    </div>
                    <h3 className="text-2xl font-bold text-zinc-900 group-hover:text-zinc-600 transition-colors leading-tight">
                      {project.title}
                    </h3>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        
        {filteredProjects.length === 0 && (
            <div className="py-32 text-center">
                <p className="text-zinc-400">No projects found in this category.</p>
                <button onClick={() => setActiveCategory('All')} className="mt-4 text-sm font-bold underline">Reset Filters</button>
            </div>
        )}
      </div>
    </motion.div>
  );
};

export default AllProjects;
