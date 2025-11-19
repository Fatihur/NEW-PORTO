import React from 'react';
import { ArrowUp } from 'lucide-react';

interface FooterProps {
  onAdminClick?: () => void;
}

const Footer: React.FC<FooterProps> = ({ onAdminClick }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-zinc-950 text-zinc-400 py-12 border-t border-zinc-800">
      <div className="container mx-auto px-8 md:px-16 lg:px-24 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-sm select-none" onDoubleClick={onAdminClick} title="Double click for Admin">
          <p className="cursor-default hover:text-zinc-200 transition-colors">&copy; {new Date().getFullYear()} Fatih. All rights reserved.</p>
        </div>
        
        <div className="flex items-center gap-8">
          <a href="#" className="text-sm hover:text-white transition-colors">Twitter</a>
          <a href="#" className="text-sm hover:text-white transition-colors">LinkedIn</a>
          <a href="#" className="text-sm hover:text-white transition-colors">GitHub</a>
        </div>

        <button 
          onClick={scrollToTop}
          className="w-10 h-10 border border-zinc-800 flex items-center justify-center hover:bg-zinc-800 hover:text-white transition-colors"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      </div>
    </footer>
  );
};

export default Footer;