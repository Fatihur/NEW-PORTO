import React, { useState, useEffect } from 'react';
import { Project } from '../../types';
import { createProject, updateProject } from '../../lib/db';
import { Image, Plus, X, Loader2, ArrowLeft, Save, Check } from 'lucide-react';
import RichEditor from './RichEditor';

interface ProjectFormProps {
  initialData?: Project | null;
  onSuccess: () => void;
  onCancel: () => void;
}

const ProjectForm: React.FC<ProjectFormProps> = ({ initialData, onSuccess, onCancel }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<Partial<Project>>({
    title: '',
    category: '',
    year: new Date().getFullYear().toString(),
    description: '',
    longDescription: '',
    link: '',
    client: '',
    techStack: [],
    image: '',
    gallery: []
  });
  
  const [newTech, setNewTech] = useState('');

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleRichTextChange = (field: string, html: string) => {
    setFormData(prev => ({ ...prev, [field]: html }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, isGallery = false) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        if (isGallery) {
          setFormData(prev => ({ ...prev, gallery: [...(prev.gallery || []), base64String] }));
        } else {
          setFormData(prev => ({ ...prev, image: base64String }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const addTech = () => {
    if (newTech.trim()) {
      setFormData(prev => ({ ...prev, techStack: [...(prev.techStack || []), newTech.trim()] }));
      setNewTech('');
    }
  };

  const removeTech = (index: number) => {
    setFormData(prev => ({
      ...prev,
      techStack: prev.techStack?.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (initialData && initialData.id) {
        await updateProject(initialData.id, formData);
      } else {
        await createProject(formData);
      }
      onSuccess();
    } catch (error) {
      alert('Failed to save project');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
         <div className="flex items-center gap-4">
           <button onClick={onCancel} className="p-2 hover:bg-zinc-100 rounded-full transition-colors">
             <ArrowLeft className="w-5 h-5" />
           </button>
           <h2 className="text-2xl font-bold">{initialData ? `Edit Project: ${initialData.title}` : 'Create New Project'}</h2>
         </div>
         <div className="flex gap-3">
            <button 
             type="button" 
             onClick={onCancel}
             className="px-6 py-3 text-sm font-medium text-zinc-600 hover:text-zinc-900"
           >
             Discard
           </button>
           <button 
             onClick={handleSubmit}
             disabled={loading}
             className="px-8 py-3 bg-zinc-900 text-white text-sm font-bold uppercase tracking-wider hover:bg-zinc-800 disabled:opacity-50 flex items-center gap-2 shadow-lg"
           >
             {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
             {initialData ? 'Update Project' : 'Publish Project'}
           </button>
         </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        
        {/* Main Info Card */}
        <div className="bg-white p-8 border border-zinc-200 shadow-sm relative">
          <div className="absolute top-0 left-0 w-1 h-full bg-zinc-900"></div>
          <h3 className="text-lg font-bold mb-6 pb-4 border-b border-zinc-100">General Information</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 mb-2">Project Title</label>
              <input 
                required name="title" value={formData.title} onChange={handleInputChange}
                className="w-full bg-zinc-50 border border-zinc-200 p-3 focus:outline-none focus:border-zinc-900 focus:bg-white transition-all"
                placeholder="e.g. Fintech Dashboard"
              />
            </div>
            <div>
               <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 mb-2">Category</label>
               <input 
                 required name="category" value={formData.category} onChange={handleInputChange}
                 className="w-full bg-zinc-50 border border-zinc-200 p-3 focus:outline-none focus:border-zinc-900 focus:bg-white transition-all"
                 placeholder="e.g. Web Application"
               />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-6">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 mb-2">Year</label>
              <input 
                name="year" value={formData.year} onChange={handleInputChange}
                className="w-full bg-zinc-50 border border-zinc-200 p-3 focus:outline-none focus:border-zinc-900 focus:bg-white transition-all"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 mb-2">Client</label>
              <input 
                name="client" value={formData.client} onChange={handleInputChange}
                className="w-full bg-zinc-50 border border-zinc-200 p-3 focus:outline-none focus:border-zinc-900 focus:bg-white transition-all"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 mb-2">Live Link</label>
              <input 
                name="link" value={formData.link} onChange={handleInputChange}
                className="w-full bg-zinc-50 border border-zinc-200 p-3 focus:outline-none focus:border-zinc-900 focus:bg-white transition-all"
              />
            </div>
          </div>
        </div>

        {/* Content Card */}
        <div className="bg-white p-8 border border-zinc-200 shadow-sm">
           <h3 className="text-lg font-bold mb-6 pb-4 border-b border-zinc-100">Content Details</h3>
           
           <div className="space-y-8">
             <RichEditor 
                label="Short Description (Excerpt)"
                value={formData.description || ''}
                onChange={(html) => handleRichTextChange('description', html)}
                minHeight="100px"
             />

             <RichEditor 
                label="Full Case Study"
                value={formData.longDescription || ''}
                onChange={(html) => handleRichTextChange('longDescription', html)}
                minHeight="300px"
             />
           </div>
        </div>

        {/* Tech & Media */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
           {/* Tech Stack */}
           <div className="bg-white p-8 border border-zinc-200 shadow-sm lg:col-span-1 h-fit">
             <h3 className="text-lg font-bold mb-6 pb-4 border-b border-zinc-100">Tech Stack</h3>
             <div className="flex gap-2 mb-4">
               <input 
                 value={newTech} onChange={(e) => setNewTech(e.target.value)}
                 className="border border-zinc-300 px-3 py-2 text-sm w-full focus:outline-none focus:border-zinc-900"
                 placeholder="Add technology..."
                 onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addTech())}
               />
               <button type="button" onClick={addTech} className="bg-zinc-900 text-white px-3 py-2 hover:bg-zinc-700"><Plus className="w-4 h-4" /></button>
             </div>
             <div className="flex flex-wrap gap-2">
               {formData.techStack?.map((tech, i) => (
                 <span key={i} className="bg-zinc-100 border border-zinc-200 px-3 py-1 text-xs font-medium flex items-center gap-2 group">
                   {tech} 
                   <button type="button" onClick={() => removeTech(i)} className="text-zinc-400 hover:text-red-500"><X className="w-3 h-3" /></button>
                 </span>
               ))}
               {(!formData.techStack || formData.techStack.length === 0) && (
                 <p className="text-xs text-zinc-400 italic">No technologies added yet.</p>
               )}
             </div>
           </div>

           {/* Media Upload */}
           <div className="bg-white p-8 border border-zinc-200 shadow-sm lg:col-span-2">
              <h3 className="text-lg font-bold mb-6 pb-4 border-b border-zinc-100">Media Assets</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 mb-4">Cover Image</label>
                  <div className="border-2 border-dashed border-zinc-300 bg-zinc-50 hover:bg-white hover:border-zinc-400 transition-all relative h-64 flex flex-col items-center justify-center text-center group">
                    {formData.image ? (
                      <>
                        <img src={formData.image} alt="Cover" className="absolute inset-0 w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <p className="text-white text-xs font-bold uppercase">Change Image</p>
                        </div>
                      </>
                    ) : (
                      <div className="pointer-events-none">
                        <Image className="w-10 h-10 text-zinc-300 mx-auto mb-3" />
                        <p className="text-xs font-bold text-zinc-400 uppercase">Upload Cover</p>
                      </div>
                    )}
                    <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e)} className="absolute inset-0 opacity-0 cursor-pointer" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 mb-4">Gallery</label>
                  <div className="grid grid-cols-3 gap-2 mb-2">
                     {formData.gallery?.map((img, i) => (
                       <div key={i} className="aspect-square bg-zinc-100 relative group overflow-hidden border border-zinc-200">
                         <img src={img} className="w-full h-full object-cover" />
                         <button 
                           type="button"
                           onClick={() => setFormData(prev => ({...prev, gallery: prev.gallery?.filter((_, idx) => idx !== i)}))}
                           className="absolute top-0 right-0 bg-red-600 text-white p-1.5 opacity-0 group-hover:opacity-100 transition-opacity"
                         >
                           <X className="w-3 h-3" />
                         </button>
                       </div>
                     ))}
                     
                     {/* Upload Button */}
                     <div className="aspect-square border-2 border-dashed border-zinc-300 bg-zinc-50 hover:bg-white hover:border-zinc-400 transition-all relative flex flex-col items-center justify-center cursor-pointer">
                        <Plus className="w-6 h-6 text-zinc-300" />
                        <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, true)} className="absolute inset-0 opacity-0 cursor-pointer" />
                     </div>
                  </div>
                </div>
              </div>
           </div>
        </div>

      </form>
    </div>
  );
};

export default ProjectForm;