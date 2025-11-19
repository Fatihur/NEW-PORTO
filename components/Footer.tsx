
import React, { useState, useEffect } from 'react';
import { ArrowUp, Globe } from 'lucide-react';

interface FooterProps {
  onAdminClick?: () => void;
}

const Footer: React.FC<FooterProps> = ({ onAdminClick }) => {
  const [time, setTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = { 
        timeZone: 'Asia/Jakarta',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      };
      setTime(now.toLocaleTimeString('en-US', options));
    };
    
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-zinc-950 text-zinc-400 py-12 border-t border-zinc-800">
      <div className="container mx-auto px-8 md:px-16 lg:px-24 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex flex-col md:flex-row items-center gap-6">
           <div className="text-sm select-none" onDoubleClick={onAdminClick} title="Double click for Admin">
             <p className="cursor-default hover:text-zinc-200 transition-colors clickable">&copy; {new Date().getFullYear()} Fatih. All rights reserved.</p>
           </div>
           
           {/* Live Clock */}
           <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-xs font-mono text-zinc-500">
              <Globe className="w-3 h-3 text-zinc-600" />
              <span>JKT, ID</span>
              <span className="w-px h-3 bg-zinc-700"></span>
              <span className="text-zinc-300">{time}</span>
           </div>
        </div>
        
        <div className="flex items-center gap-8">
          <a href="#" className="text-sm hover:text-white transition-colors clickable">Twitter</a>
          <a href="#" className="text-sm hover:text-white transition-colors clickable">LinkedIn</a>
          <a href="#" className="text-sm hover:text-white transition-colors clickable">GitHub</a>
        </div>

        <button 
          onClick={scrollToTop}
          className="w-10 h-10 border border-zinc-800 flex items-center justify-center hover:bg-zinc-800 hover:text-white transition-colors clickable"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      </div>
    </footer>
  );
};

export default Footer;
