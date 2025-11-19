
import React, { useState, useEffect } from 'react';
import { Command, Search, ArrowRight, FileText, Home, Briefcase, User, Mail, Terminal } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Project, NavigationItem } from '../types';
import { NAV_ITEMS } from '../constants';

interface CommandPaletteProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  projects: Project[];
  onNavigate: (view: string, data?: Project) => void;
}

const CommandPalette: React.FC<CommandPaletteProps> = ({ isOpen, setIsOpen, projects, onNavigate }) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Filter Items
  const filteredNav = NAV_ITEMS.filter(item => 
    item.label.toLowerCase().includes(query.toLowerCase())
  );
  
  const filteredProjects = projects.filter(project => 
    project.title.toLowerCase().includes(query.toLowerCase()) || 
    project.category.toLowerCase().includes(query.toLowerCase())
  );

  const allItems = [
    ...filteredNav.map(item => ({ type: 'nav', data: item, id: `nav-${item.label}` })),
    ...filteredProjects.map(item => ({ type: 'project', data: item, id: `proj-${item.id}` }))
  ];

  // Reset selection on query change
  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(prev => (prev + 1) % allItems.length);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(prev => (prev - 1 + allItems.length) % allItems.length);
      } else if (e.key === 'Enter') {
        e.preventDefault();
        const selected = allItems[selectedIndex];
        if (selected) {
           handleSelect(selected);
        }
      } else if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, selectedIndex, allItems]);

  const handleSelect = (item: any) => {
    if (item.type === 'nav') {
      // Handle Nav
      const navItem = item.data as NavigationItem;
      const href = navItem.href;
      if (href.startsWith('#')) {
        onNavigate('home'); // Basic nav logic
        setTimeout(() => {
            document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    } else if (item.type === 'project') {
      onNavigate('project-detail', (item.data as Project));
    }
    setIsOpen(false);
    setQuery('');
  };

  const getIcon = (type: string, label: string) => {
    if (type === 'project') return <FileText className="w-4 h-4" />;
    if (label === 'Home') return <Home className="w-4 h-4" />;
    if (label === 'Work') return <Briefcase className="w-4 h-4" />;
    if (label === 'About') return <User className="w-4 h-4" />;
    if (label === 'Contact') return <Mail className="w-4 h-4" />;
    return <ArrowRight className="w-4 h-4" />;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-zinc-900/50 backdrop-blur-sm z-[100]"
            onClick={() => setIsOpen(false)}
          />

          {/* Modal */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed top-[20%] left-1/2 -translate-x-1/2 w-full max-w-2xl z-[101] p-4"
          >
            <div className="bg-white shadow-2xl border border-zinc-200 overflow-hidden rounded-lg flex flex-col max-h-[60vh]">
              {/* Input */}
              <div className="flex items-center px-4 border-b border-zinc-100">
                <Search className="w-5 h-5 text-zinc-400" />
                <input 
                  autoFocus
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Type a command or search..."
                  className="w-full p-4 text-lg outline-none bg-transparent placeholder:text-zinc-400 text-zinc-900"
                />
                <div className="text-xs font-bold px-2 py-1 bg-zinc-100 text-zinc-500 rounded border border-zinc-200">ESC</div>
              </div>

              {/* Results */}
              <div className="overflow-y-auto py-2">
                {allItems.length === 0 ? (
                  <div className="p-8 text-center text-zinc-400">
                    <Terminal className="w-8 h-8 mx-auto mb-2 opacity-50" />
                    <p className="text-sm">No results found.</p>
                  </div>
                ) : (
                  <>
                    {filteredNav.length > 0 && (
                      <div className="px-4 py-2">
                         <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-2">Navigation</h4>
                         {allItems.filter(i => i.type === 'nav').map((item, i) => {
                           const navItem = item.data as NavigationItem;
                           return (
                           <button 
                             key={item.id}
                             onClick={() => handleSelect(item)}
                             className={`w-full flex items-center justify-between px-4 py-3 rounded-md transition-colors text-left mb-1 ${
                               allItems.indexOf(item) === selectedIndex ? 'bg-zinc-900 text-white' : 'hover:bg-zinc-100 text-zinc-600'
                             }`}
                           >
                              <div className="flex items-center gap-3">
                                {getIcon('nav', navItem.label)}
                                <span className="font-medium">{navItem.label}</span>
                              </div>
                              {allItems.indexOf(item) === selectedIndex && <ArrowRight className="w-4 h-4" />}
                           </button>
                           );
                         })}
                      </div>
                    )}

                    {filteredProjects.length > 0 && (
                      <div className="px-4 py-2 border-t border-zinc-100 mt-2 pt-4">
                         <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-2">Projects</h4>
                         {allItems.filter(i => i.type === 'project').map((item, i) => {
                           const projectItem = item.data as Project;
                           return (
                           <button 
                             key={item.id}
                             onClick={() => handleSelect(item)}
                             className={`w-full flex items-center justify-between px-4 py-3 rounded-md transition-colors text-left mb-1 ${
                               allItems.indexOf(item) === selectedIndex ? 'bg-zinc-900 text-white' : 'hover:bg-zinc-100 text-zinc-600'
                             }`}
                           >
                              <div className="flex items-center gap-3">
                                <div className="w-6 h-6 bg-zinc-200 rounded-sm overflow-hidden">
                                   <img src={projectItem.image} className="w-full h-full object-cover" />
                                </div>
                                <span className="font-medium">{projectItem.title}</span>
                              </div>
                              <span className={`text-xs uppercase tracking-wider ${allItems.indexOf(item) === selectedIndex ? 'text-zinc-400' : 'text-zinc-400'}`}>
                                {projectItem.category}
                              </span>
                           </button>
                           );
                         })}
                      </div>
                    )}
                  </>
                )}
              </div>

              {/* Footer */}
              <div className="bg-zinc-50 p-2 border-t border-zinc-200 flex justify-between items-center px-4 text-[10px] text-zinc-400 uppercase tracking-wider">
                 <div className="flex gap-2">
                   <span>↑↓ Navigate</span>
                   <span>↵ Select</span>
                 </div>
                 <span>Fatih.dev CMS</span>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CommandPalette;
