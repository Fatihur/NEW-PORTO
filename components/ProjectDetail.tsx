
import React, { useState, useEffect } from 'react';
import { Project } from '../types';
import { ArrowLeft, ChevronLeft, ChevronRight, ExternalLink, ArrowRight } from 'lucide-react';
import { GridPattern } from './GeometricElements';
import { motion, AnimatePresence } from 'framer-motion';

interface ProjectDetailProps {
  project: Project;
  onBack: () => void;
}

const ProjectDetail: React.FC<ProjectDetailProps> = ({ project, onBack }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // Reset image index when project changes
  useEffect(() => {
    setCurrentImageIndex(0);
  }, [project]);
  
  const images = project.gallery && project.gallery.length > 0 
    ? [project.image, ...project.gallery] 
    : [project.image];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-white min-h-screen pt-24 pb-24"
    >
      {/* Sticky Sub-header */}
      <div className="sticky top-[70px] z-30 bg-white/90 backdrop-blur-sm border-b border-zinc-100 w-full">
        <div className="container mx-auto px-6 md:px-12 lg:px-24 h-14 flex justify-between items-center">
          <button 
            onClick={onBack}
            className="flex items-center gap-3 text-sm font-medium text-zinc-500 hover:text-zinc-900 transition-colors group"
          >
            <div className="w-8 h-8 rounded-full border border-zinc-200 flex items-center justify-center group-hover:border-zinc-900 group-hover:bg-zinc-900 group-hover:text-white transition-all">
               <ArrowLeft className="w-4 h-4" />
            </div>
            <span className="hidden sm:inline">Back to Projects</span>
          </button>
          
          <div className="flex items-center gap-4">
            <span className="text-xs font-bold uppercase tracking-widest text-zinc-400">
              {project.category}
            </span>
            <span className="w-px h-4 bg-zinc-200"></span>
            <span className="text-xs font-bold uppercase tracking-widest text-zinc-900">
              {project.year}
            </span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 md:px-12 lg:px-24 mt-12">
        {/* Title Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-16 items-end">
          <div className="lg:col-span-8">
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter leading-[1.1]"
            >
              {project.title}
            </motion.h1>
          </div>
          <div className="lg:col-span-4">
             <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg md:text-xl text-zinc-600 leading-relaxed border-l-2 border-zinc-900 pl-6"
            >
              {project.description}
            </motion.p>
          </div>
        </div>

        {/* Gallery Carousel */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="relative mb-20 group"
        >
          <div className="aspect-video w-full bg-zinc-100 overflow-hidden relative">
            <AnimatePresence mode="wait">
              <motion.img 
                key={currentImageIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                src={images[currentImageIndex]} 
                alt={`${project.title} view ${currentImageIndex + 1}`}
                className="w-full h-full object-cover"
              />
            </AnimatePresence>

            {/* Navigation Overlay */}
            {images.length > 1 && (
              <div className="absolute inset-0 flex items-center justify-between p-4 pointer-events-none">
                <button 
                  onClick={prevImage}
                  className="w-12 h-12 md:w-16 md:h-16 bg-white hover:bg-zinc-900 hover:text-white text-zinc-900 flex items-center justify-center pointer-events-auto transition-colors border border-zinc-200"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button 
                  onClick={nextImage}
                  className="w-12 h-12 md:w-16 md:h-16 bg-white hover:bg-zinc-900 hover:text-white text-zinc-900 flex items-center justify-center pointer-events-auto transition-colors border border-zinc-200"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>
            )}
          </div>

          {/* Geometric Progress Bar */}
          <div className="flex items-center mt-4 gap-4">
            <span className="text-xs font-bold tracking-widest w-12">
              {String(currentImageIndex + 1).padStart(2, '0')}
            </span>
            <div className="flex-1 h-px bg-zinc-200 relative">
              <motion.div 
                className="absolute top-0 left-0 h-full bg-zinc-900"
                initial={{ width: 0 }}
                animate={{ width: `${((currentImageIndex + 1) / images.length) * 100}%` }}
                transition={{ ease: "linear", duration: 0.3 }}
              />
            </div>
            <span className="text-xs font-bold tracking-widest text-zinc-400 w-12 text-right">
              {String(images.length).padStart(2, '0')}
            </span>
          </div>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
          
          {/* Sticky Sidebar (Meta Info) - Order 2 on mobile, Order 1 on desktop */}
          <div className="lg:col-span-4 order-2 lg:order-1">
            <div className="lg:sticky lg:top-32 space-y-8 lg:pr-8">
              {project.client && (
                <div className="border-t border-zinc-200 pt-4">
                  <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-400 mb-2">Client</h4>
                  <p className="text-zinc-900 font-medium text-lg">{project.client}</p>
                </div>
              )}

              <div className="border-t border-zinc-200 pt-4">
                <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-400 mb-2">Role</h4>
                <p className="text-zinc-900 font-medium text-lg">Design & Development</p>
              </div>

              {project.techStack && (
                <div className="border-t border-zinc-200 pt-4">
                  <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-400 mb-3">Tech Stack</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.map(tech => (
                      <span key={tech} className="px-3 py-1 bg-zinc-100 text-xs font-medium text-zinc-600">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="pt-8">
                <a 
                  href={project.link}
                  className="w-full py-4 bg-zinc-900 text-white font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-3 hover:bg-zinc-700 transition-all group"
                >
                  Visit Live Site
                  <ExternalLink className="w-4 h-4 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
                </a>
              </div>
            </div>
          </div>

          {/* Detailed Text Content - Order 1 on mobile, Order 2 on desktop */}
          <div className="lg:col-span-8 order-1 lg:order-2">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="prose prose-zinc prose-lg max-w-none"
            >
              <h3 className="text-2xl font-bold tracking-tight mb-6">The Overview</h3>
              <p className="text-zinc-600 leading-loose mb-12 text-lg">
                {project.longDescription || project.description}
              </p>
              
              <div className="bg-zinc-50 p-8 md:p-12 border border-zinc-200 relative overflow-hidden my-12">
                <GridPattern />
                <h3 className="text-lg font-bold tracking-tight mb-4 relative z-10">The Challenge & Solution</h3>
                <p className="text-zinc-600 relative z-10 leading-relaxed">
                  We approached this project with a mobile-first philosophy, ensuring that every interaction was optimized for touch before scaling up to desktop. The result is a fluid interface that maintains performance metrics of 98+ on Lighthouse.
                </p>
                {/* Decorative Element */}
                <div className="absolute bottom-0 right-0 w-12 h-12 border-t border-l border-zinc-300"></div>
              </div>

              <h3 className="text-2xl font-bold tracking-tight mb-6">Key Features</h3>
              <ul className="space-y-4 list-none pl-0 text-zinc-600">
                 {[1,2,3].map((i) => (
                   <li key={i} className="flex items-start gap-4">
                     <div className="w-6 h-px bg-zinc-400 mt-3 shrink-0"></div>
                     <span>Seamless integration with existing backend systems to ensure data integrity.</span>
                   </li>
                 ))}
              </ul>
            </motion.div>
          </div>

        </div>
        
        {/* Next Project Teaser (Optional) */}
        <div className="mt-24 pt-12 border-t border-zinc-200 flex justify-end">
            <button onClick={onBack} className="group text-right">
               <span className="block text-xs font-bold text-zinc-400 uppercase tracking-widest mb-2">Next</span>
               <div className="flex items-center gap-4 text-xl md:text-3xl font-bold group-hover:text-zinc-600 transition-colors">
                  Back to Archive <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
               </div>
            </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectDetail;
