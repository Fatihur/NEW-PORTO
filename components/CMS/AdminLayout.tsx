import React, { useState } from 'react';
import { Layout, LogOut, FolderPlus, BarChart, Briefcase, MessageSquare, Menu, X } from 'lucide-react';

interface AdminLayoutProps {
  children: React.ReactNode;
  activeTab: string;
  onTabChange: (tab: string) => void;
  onLogout: () => void;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children, activeTab, onTabChange, onLogout }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <BarChart className="w-4 h-4" /> },
    { id: 'projects', label: 'Projects', icon: <FolderPlus className="w-4 h-4" /> },
    { id: 'experience', label: 'Experience', icon: <Briefcase className="w-4 h-4" /> },
    { id: 'messages', label: 'Messages', icon: <MessageSquare className="w-4 h-4" /> },
  ];

  const handleTabClick = (id: string) => {
    onTabChange(id);
    setSidebarOpen(false); // Close sidebar on mobile after selection
  };

  return (
    <div className="min-h-screen bg-zinc-100 flex relative">
      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-zinc-900 text-white flex items-center justify-between px-4 z-30">
         <span className="font-bold tracking-tight">CMS PANEL</span>
         <button onClick={() => setSidebarOpen(!sidebarOpen)}>
           {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
         </button>
      </div>

      {/* Sidebar Backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-20 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed md:fixed inset-y-0 left-0 z-30
        w-64 bg-zinc-900 text-white flex flex-col 
        transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        mt-16 md:mt-0 h-[calc(100vh-64px)] md:h-screen
      `}>
        <div className="p-6 border-b border-zinc-800 hidden md:block">
          <h1 className="text-lg font-bold tracking-tight">CMS PANEL</h1>
          <p className="text-xs text-zinc-500 uppercase tracking-widest mt-1">Neon Database</p>
        </div>
        
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {navItems.map((item) => (
            <button 
              key={item.id}
              onClick={() => handleTabClick(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors ${
                activeTab === item.id 
                  ? 'bg-zinc-800 text-white border-l-4 border-white' 
                  : 'text-zinc-400 hover:bg-zinc-800/50 hover:text-white border-l-4 border-transparent'
              }`}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-zinc-800">
           <button 
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-zinc-400 hover:text-white hover:bg-red-900/20 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </aside>

      {/* Content */}
      <main className="flex-1 md:ml-64 p-4 md:p-12 mt-16 md:mt-0 overflow-y-auto h-[calc(100vh-64px)] md:h-screen w-full">
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;