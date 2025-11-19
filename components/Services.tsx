import React from 'react';
import { SERVICES } from '../constants';
import { PlusIcon } from './GeometricElements';
import { motion, Variants } from 'framer-motion';

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

const Services: React.FC = () => {
  return (
    <section id="services" className="py-24 md:py-32 border-b border-zinc-200 bg-white">
      <div className="container mx-auto px-8 md:px-16 lg:px-24">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6"
        >
          <div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Technical Expertise</h2>
            <p className="text-zinc-500 max-w-md">Bridging the gap between complex engineering and intuitive design.</p>
          </div>
          <div className="hidden md:block h-[1px] flex-1 bg-zinc-200 mx-8 mb-2"></div>
        </motion.div>

        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-zinc-200 border border-zinc-200"
        >
          {SERVICES.map((service) => (
            <motion.div 
              key={service.id} 
              variants={item}
              className="bg-white p-8 hover:bg-zinc-50 transition-colors duration-300 group relative h-full"
            >
              <div className="absolute top-4 right-4 text-zinc-200 group-hover:text-zinc-900 transition-colors">
                <PlusIcon />
              </div>
              
              <div className="mb-6 p-3 bg-zinc-50 w-fit rounded-none border border-zinc-100 group-hover:border-zinc-300 transition-colors">
                {service.icon}
              </div>
              
              <h3 className="text-lg font-semibold mb-3">{service.title}</h3>
              <p className="text-sm text-zinc-500 leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Services;