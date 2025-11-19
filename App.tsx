import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import Work from './components/Work';
import Experience from './components/Experience';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ProjectDetail from './components/ProjectDetail';
import AllProjects from './components/AllProjects';
import AdminLayout from './components/CMS/AdminLayout';
import ProjectForm from './components/CMS/ProjectForm';
import Chatbot from './components/Chatbot';
import { PROJECTS as STATIC_PROJECTS } from './constants';
import { Project } from './types';
import { initDB, fetchProjects, deleteProject } from './lib/db';
import { Loader2, Plus, Trash2, Edit, RefreshCcw } from 'lucide-react';

type ViewState = 'home' | 'project-detail' | 'all-projects' | 'admin-login' | 'admin-dashboard';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>('home');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [previousView, setPreviousView] = useState<ViewState>('home');
  
  // Data State
  const [projects, setProjects] = useState<Project[]>(STATIC_PROJECTS);
  const [loadingProjects, setLoadingProjects] = useState(false);

  // Admin State
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminTab, setAdminTab] = useState('dashboard');
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [dbInitStatus, setDbInitStatus] = useState<string>('');

  // Initial Fetch
  useEffect(() => {
    const loadData = async () => {
      setLoadingProjects(true);
      try {
        // Attempt to fetch from DB
        const dbProjects = await fetchProjects();
        if (dbProjects && dbProjects.length > 0) {
           setProjects(dbProjects);
        }
      } catch (e) {
        console.warn("Could not fetch from DB, using static data");
      } finally {
        setLoadingProjects(false);
      }
    };
    loadData();
  }, []);

  // Check for admin route in hash and listen for changes
  useEffect(() => {
    const checkHash = () => {
      if (window.location.hash === '#admin') {
        setCurrentView('admin-login');
      }
    };

    // Check initially
    checkHash();

    // Listen for hash changes (allows user to just type #admin and hit enter without refresh)
    window.addEventListener('hashchange', checkHash);
    return () => window.removeEventListener('hashchange', checkHash);
  }, []);

  // Scroll to top when view changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentView, selectedProject]);

  const handleProjectClick = (project: Project) => {
    setPreviousView(currentView);
    setSelectedProject(project);
    setCurrentView('project-detail');
  };

  const handleViewAll = () => {
    setCurrentView('all-projects');
  };

  const handleBackToHome = () => {
    setCurrentView('home');
    setSelectedProject(null);
  };

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple mock login for prototype
    setIsAdmin(true);
    setCurrentView('admin-dashboard');
  };

  const handleInitDB = async () => {
    setDbInitStatus('initializing');
    const success = await initDB();
    setDbInitStatus(success ? 'success' : 'error');
  };

  const refreshProjects = async () => {
    setLoadingProjects(true);
    const dbProjects = await fetchProjects();
    if (dbProjects) setProjects(dbProjects);
    setLoadingProjects(false);
  };

  const handleDeleteProject = async (id: number) => {
     if(window.confirm('Are you sure you want to delete this project?')) {
         await deleteProject(id);
         await refreshProjects();
     }
  }

  const handleEditProject = (project: Project) => {
    setEditingProject(project);
    setShowProjectForm(true);
  };

  const handleAddNewProject = () => {
    setEditingProject(null);
    setShowProjectForm(true);
  }

  // Render Admin Interface
  if (currentView === 'admin-login') {
    return (
      <div className="min-h-screen bg-zinc-50 flex items-center justify-center">
        <div className="w-full max-w-md p-8 bg-white border border-zinc-200 shadow-lg">
           <h2 className="text-2xl font-bold mb-6 text-center">CMS Login</h2>
           <form onSubmit={handleAdminLogin} className="space-y-4">
             <div>
               <label className="block text-xs uppercase font-bold text-zinc-500 mb-2">Email</label>
               <input type="email" className="w-full p-3 border border-zinc-300 bg-zinc-50" placeholder="admin@fatih.dev" />
             </div>
             <div>
               <label className="block text-xs uppercase font-bold text-zinc-500 mb-2">Password</label>
               <input type="password" className="w-full p-3 border border-zinc-300 bg-zinc-50" placeholder="••••••••" />
             </div>
             <button type="submit" className="w-full py-3 bg-zinc-900 text-white font-bold uppercase hover:bg-zinc-700 transition-colors">
               Access Panel
             </button>
             <button onClick={() => setCurrentView('home')} type="button" className="w-full text-xs text-zinc-400 hover:text-zinc-900 mt-4">
               Return to Website
             </button>
           </form>
        </div>
      </div>
    );
  }

  if (currentView === 'admin-dashboard' && isAdmin) {
    return (
      <AdminLayout 
        activeTab={adminTab} 
        onTabChange={setAdminTab} 
        onLogout={() => { setIsAdmin(false); setCurrentView('home'); }}
      >
        {adminTab === 'dashboard' && (
          <div>
            <h2 className="text-3xl font-bold mb-8">Dashboard Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className="bg-white p-6 border border-zinc-200 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 w-16 h-16 bg-zinc-50 rounded-bl-full -mr-8 -mt-8"></div>
                <p className="text-xs font-bold uppercase text-zinc-400 mb-2">Total Projects</p>
                <p className="text-4xl font-light">{projects.length}</p>
              </div>
              <div className="bg-white p-6 border border-zinc-200 shadow-sm relative overflow-hidden">
                 <div className="absolute top-0 right-0 w-16 h-16 bg-green-50 rounded-bl-full -mr-8 -mt-8"></div>
                 <p className="text-xs font-bold uppercase text-zinc-400 mb-2">Database Status</p>
                 <p className="text-xl font-medium text-green-600">Connected</p>
                 <p className="text-xs text-zinc-400 mt-1">Neon Serverless</p>
              </div>
              <div className="bg-white p-6 border border-zinc-200 shadow-sm relative overflow-hidden flex items-center justify-center">
                 <button onClick={refreshProjects} className="text-zinc-500 hover:text-zinc-900 flex flex-col items-center gap-2">
                    <RefreshCcw className={`w-6 h-6 ${loadingProjects ? 'animate-spin' : ''}`} />
                    <span className="text-xs font-bold uppercase">Sync Data</span>
                 </button>
              </div>
            </div>

            <div className="bg-white p-8 border border-zinc-200 max-w-xl">
              <h3 className="text-lg font-bold mb-4">Database Initialization</h3>
              <p className="text-zinc-500 mb-6 text-sm leading-relaxed">
                If this is your first time running the CMS, you need to create the necessary tables in your Neon database.
              </p>
              <button 
                onClick={handleInitDB}
                disabled={dbInitStatus === 'initializing'}
                className={`px-6 py-3 font-bold text-sm uppercase tracking-wider border transition-colors w-full md:w-auto ${
                  dbInitStatus === 'success' ? 'bg-green-100 text-green-800 border-green-200' : 'bg-zinc-900 text-white border-zinc-900 hover:bg-zinc-700'
                }`}
              >
                {dbInitStatus === 'initializing' ? 'Initializing...' : dbInitStatus === 'success' ? 'Tables Created' : 'Initialize Tables'}
              </button>
            </div>
          </div>
        )}

        {adminTab === 'projects' && (
          <div>
            {showProjectForm ? (
              <ProjectForm 
                initialData={editingProject}
                onSuccess={() => { setShowProjectForm(false); refreshProjects(); }}
                onCancel={() => setShowProjectForm(false)}
              />
            ) : (
              <>
                <div className="flex justify-between items-center mb-8">
                   <div>
                     <h2 className="text-3xl font-bold">Manage Projects</h2>
                     <p className="text-zinc-500 mt-1">Create, edit, and manage your portfolio items.</p>
                   </div>
                   <button 
                     onClick={handleAddNewProject}
                     className="flex items-center gap-2 px-6 py-3 bg-zinc-900 text-white font-bold uppercase text-sm tracking-wider hover:bg-zinc-800 transition-colors shadow-lg"
                   >
                     <Plus className="w-4 h-4" /> Add Project
                   </button>
                </div>

                <div className="bg-white border border-zinc-200 shadow-sm overflow-hidden">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b border-zinc-100 bg-zinc-50">
                        <th className="p-4 pl-6 text-xs font-bold uppercase tracking-wider text-zinc-500 w-24">Image</th>
                        <th className="p-4 text-xs font-bold uppercase tracking-wider text-zinc-500">Title</th>
                        <th className="p-4 text-xs font-bold uppercase tracking-wider text-zinc-500">Category</th>
                        <th className="p-4 text-xs font-bold uppercase tracking-wider text-zinc-500">Year</th>
                        <th className="p-4 pr-6 text-xs font-bold uppercase tracking-wider text-zinc-500 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-100">
                      {projects.map((project) => (
                        <tr key={project.id} className="hover:bg-zinc-50 transition-colors group">
                          <td className="p-4 pl-6">
                            <div className="w-12 h-12 bg-zinc-100 overflow-hidden border border-zinc-200 rounded-sm">
                              <img src={project.image} alt="" className="w-full h-full object-cover" />
                            </div>
                          </td>
                          <td className="p-4 font-medium text-zinc-900">{project.title}</td>
                          <td className="p-4 text-zinc-500 text-sm">
                            <span className="px-2 py-1 bg-zinc-100 border border-zinc-200 rounded text-xs font-medium">{project.category}</span>
                          </td>
                          <td className="p-4 text-zinc-500 text-sm">{project.year}</td>
                          <td className="p-4 pr-6 text-right">
                            <div className="flex items-center justify-end gap-2 opacity-60 group-hover:opacity-100 transition-opacity">
                              <button 
                                  onClick={() => handleEditProject(project)}
                                  className="p-2 text-zinc-500 hover:text-zinc-900 hover:bg-white hover:shadow-sm border border-transparent hover:border-zinc-200 rounded transition-all"
                                  title="Edit"
                              >
                                <Edit className="w-4 h-4" />
                              </button>
                              <button 
                                  onClick={() => handleDeleteProject(project.id)}
                                  className="p-2 text-zinc-500 hover:text-red-600 hover:bg-white hover:shadow-sm border border-transparent hover:border-red-100 rounded transition-all"
                                  title="Delete"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {projects.length === 0 && (
                    <div className="p-16 text-center flex flex-col items-center justify-center">
                      <div className="w-16 h-16 bg-zinc-50 rounded-full flex items-center justify-center mb-4">
                        <Plus className="w-6 h-6 text-zinc-300" />
                      </div>
                      <h3 className="text-lg font-medium text-zinc-900 mb-1">No projects yet</h3>
                      <p className="text-zinc-400 text-sm mb-6">Get started by adding your first project.</p>
                      <button onClick={handleAddNewProject} className="text-zinc-900 font-bold underline">Create Project</button>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        )}
      </AdminLayout>
    );
  }

  // Render Public Interface
  const renderContent = () => {
    switch (currentView) {
      case 'project-detail':
        return selectedProject ? (
          <ProjectDetail 
            project={selectedProject} 
            onBack={() => previousView === 'all-projects' ? setCurrentView('all-projects') : handleBackToHome()} 
          />
        ) : null;
      
      case 'all-projects':
        return (
          <AllProjects 
            projects={projects}
            onBack={handleBackToHome} 
            onProjectClick={handleProjectClick}
          />
        );

      case 'home':
      default:
        return (
          <div className="animate-in fade-in duration-500">
            <Hero />
            <Services />
            <Work 
              projects={projects}
              onProjectClick={handleProjectClick} 
              onViewAllClick={handleViewAll}
            />
            <Experience />
            <About />
            <Contact />
          </div>
        );
    }
  };

  return (
    <div className="antialiased min-h-screen bg-zinc-50 text-zinc-900 selection:bg-zinc-900 selection:text-white">
      {/* Hide Header on Admin Pages */}
      {!currentView.startsWith('admin') && (
        <Header onNavigate={(view) => setCurrentView(view as ViewState)} currentView={currentView} />
      )}
      
      <main>
        {renderContent()}
      </main>
      
      {!currentView.startsWith('admin') && (
        <Footer onAdminClick={() => setCurrentView('admin-login')} />
      )}

      {/* AI Chatbot - Only show on public pages */}
      {!currentView.startsWith('admin') && (
        <Chatbot projects={projects} />
      )}
    </div>
  );
};

export default App;