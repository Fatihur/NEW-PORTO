import React, { useState, useEffect } from 'react';
import { NAV_ITEMS } from '../constants';
import { Menu, X, ArrowRight } from 'lucide-react';

interface HeaderProps {
  onNavigate: (view: string) => void;
  currentView: string;
}

const Header: React.FC<HeaderProps> = ({ onNavigate, currentView }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    
    if (href.startsWith('#')) {
      // If we are not on home, go home first, then scroll
      if (currentView !== 'home') {
        onNavigate('home');
        setTimeout(() => {
          const element = document.querySelector(href);
          element?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else {
        const element = document.querySelector(href);
        element?.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onNavigate('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 border-b ${
          isScrolled ? 'bg-white/90 backdrop-blur-md border-zinc-200 py-4' : 'bg-transparent border-transparent py-6'
        }`}
      >
        <div className="container mx-auto px-8 md:px-16 lg:px-24 flex items-center justify-between">
          <a href="#" onClick={handleLogoClick} className="text-xl font-bold tracking-tighter z-50 relative">
            JAKARTA<span className="text-zinc-400">.DEV</span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-8">
            {NAV_ITEMS.map((item) => (
              <button 
                key={item.label} 
                onClick={() => handleNavClick(item.href)}
                className="text-sm font-medium text-zinc-600 hover:text-zinc-900 tracking-wide transition-colors relative group"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-zinc-900 transition-all duration-300 group-hover:w-full"></span>
              </button>
            ))}
            <button 
              onClick={() => handleNavClick('#contact')}
              className="ml-4 px-5 py-2 bg-zinc-900 text-white text-sm font-medium hover:bg-zinc-700 transition-colors"
            >
              Let's Talk
            </button>
          </nav>

          {/* Mobile Toggle */}
          <button 
            className="md:hidden z-50 text-zinc-900 p-2 hover:bg-zinc-100 transition-colors border border-transparent hover:border-zinc-200"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Menu className="w-6 h-6" strokeWidth={1.5} />
          </button>
        </div>
      </header>

      {/* Mobile Drawer Backdrop */}
      <div 
        className={`fixed inset-0 bg-zinc-900/20 backdrop-blur-sm z-40 transition-opacity duration-300 md:hidden ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setMobileMenuOpen(false)}
      />

      {/* Mobile Drawer Panel */}
      <div 
        className={`fixed top-0 right-0 h-full w-[300px] sm:w-[400px] bg-white z-50 shadow-2xl transform transition-transform duration-300 md:hidden border-l border-zinc-200 ${
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="h-full flex flex-col relative">
          {/* Drawer Header */}
          <div className="p-6 flex items-center justify-between border-b border-zinc-100">
            <span className="text-xs font-bold uppercase tracking-widest text-zinc-400">Menu</span>
            <button 
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 hover:bg-zinc-100 transition-colors border border-transparent hover:border-zinc-200"
            >
              <X className="w-5 h-5 text-zinc-900" strokeWidth={1.5} />
            </button>
          </div>

          {/* Drawer Content */}
          <div className="flex-1 py-12 px-8 flex flex-col gap-8 overflow-y-auto">
            {NAV_ITEMS.map((item) => (
              <button 
                key={item.label} 
                onClick={() => handleNavClick(item.href)}
                className="text-3xl font-light text-zinc-900 text-left flex items-center justify-between group border-b border-zinc-100 pb-4"
              >
                <span>{item.label}</span>
                <ArrowRight className="w-5 h-5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-zinc-400" />
              </button>
            ))}
          </div>

          {/* Drawer Footer */}
          <div className="p-8 bg-zinc-50 border-t border-zinc-200">
            <div className="grid grid-cols-2 gap-4 mb-6">
               <div className="text-xs text-zinc-500 uppercase tracking-widest mb-1">Email</div>
               <div className="col-span-2 text-sm font-medium text-zinc-900">hello@jakarta.dev</div>
            </div>
            <button 
               onClick={() => handleNavClick('#contact')}
               className="w-full py-4 bg-zinc-900 text-white text-sm font-medium hover:bg-zinc-800 transition-colors flex items-center justify-center gap-2"
            >
              Start a Project
            </button>
          </div>
          
          {/* Geometric Deco */}
          <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-zinc-300 bg-white"></div>
        </div>
      </div>
    </>
  );
};

export default Header;