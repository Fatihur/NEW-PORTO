import React from 'react';
import { ArrowRight, Mail, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

const Contact: React.FC = () => {
  return (
    <section id="contact" className="py-24 md:py-32 bg-zinc-900 text-zinc-50">
      <div className="container mx-auto px-8 md:px-16 lg:px-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-8">Let's start a<br/>project together.</h2>
            <p className="text-zinc-400 text-lg mb-12 max-w-md">
              Interested in working together? We should queue up a time to chat. I'll buy the coffee.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 border border-zinc-700 flex items-center justify-center">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs text-zinc-500 uppercase tracking-wider mb-1">Email</p>
                  <a href="mailto:hello@jakarta.dev" className="text-lg hover:text-white transition-colors">hello@jakarta.dev</a>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 border border-zinc-700 flex items-center justify-center">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs text-zinc-500 uppercase tracking-wider mb-1">Location</p>
                  <p className="text-lg">Jakarta, Indonesia</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-zinc-850 p-8 md:p-12 border border-zinc-800 relative"
          >
            <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-white/10"></div>
            <div className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-white/10"></div>
            
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-xs uppercase tracking-wider text-zinc-500">Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    className="w-full bg-transparent border-b border-zinc-700 py-3 text-white focus:border-white focus:outline-none transition-colors rounded-none"
                    placeholder="John Doe"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-xs uppercase tracking-wider text-zinc-500">Email</label>
                  <input 
                    type="email" 
                    id="email" 
                    className="w-full bg-transparent border-b border-zinc-700 py-3 text-white focus:border-white focus:outline-none transition-colors rounded-none"
                    placeholder="john@example.com"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="message" className="text-xs uppercase tracking-wider text-zinc-500">Message</label>
                <textarea 
                  id="message" 
                  rows={4}
                  className="w-full bg-transparent border-b border-zinc-700 py-3 text-white focus:border-white focus:outline-none transition-colors resize-none rounded-none"
                  placeholder="Tell me about your project..."
                ></textarea>
              </div>

              <button 
                type="submit" 
                className="mt-4 w-full bg-white text-zinc-900 py-4 font-bold text-sm uppercase tracking-widest hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2 group"
              >
                Send Message
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;