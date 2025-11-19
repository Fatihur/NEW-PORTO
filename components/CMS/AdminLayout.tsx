import React from 'react';
import { Layout, LogOut, FolderPlus, BarChart } from 'lucide-react';

interface AdminLayoutProps {
  children: React.ReactNode;
  activeTab: string;
  onTabChange: (tab: string) => void;
  onLogout: () => void;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children, activeTab, onTabChange, onLogout }) => {
  return (
    <div className="min-h-screen bg-zinc-100 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-zinc-900 text-white flex flex-col fixed h-full z-10">
        <div className="p-6 border-b border-zinc-800">
          <h1 className="text-lg font-bold tracking-tight">CMS PANEL</h1>
          <p className="text-xs text-zinc-500 uppercase tracking-widest mt-1">Neon Database</p>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          <button 
            onClick={() => onTabChange('dashboard')}
            className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors ${activeTab === 'dashboard' ? 'bg-zinc-800 text-white' : 'text-zinc-400 hover:bg-zinc-800/50 hover:text-white'}`}
          >
            <BarChart className="w-4 h-4" />
            Dashboard
          </button>
          <button 
            onClick={() => onTabChange('projects')}
            className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors ${activeTab === 'projects' ? 'bg-zinc-800 text-white' : 'text-zinc-400 hover:bg-zinc-800/50 hover:text-white'}`}
          >
            <FolderPlus className="w-4 h-4" />
            Projects
          </button>
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
      <main className="flex-1 ml-64 p-8 md:p-12 overflow-y-auto h-screen">
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;
