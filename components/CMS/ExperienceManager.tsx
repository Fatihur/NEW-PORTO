import React, { useState, useEffect } from 'react';
import { ExperienceItem } from '../../types';
import { createExperience, updateExperience, deleteExperience, fetchExperience } from '../../lib/db';
import { Plus, Edit, Trash2, Check, X, Briefcase } from 'lucide-react';

interface ExperienceManagerProps {
  initialData: ExperienceItem[];
  onRefresh: () => void;
}

const ExperienceManager: React.FC<ExperienceManagerProps> = ({ initialData, onRefresh }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    role: '',
    company: '',
    period: '',
    description: '',
    skills: ''
  });

  const resetForm = () => {
    setFormData({ role: '', company: '', period: '', description: '', skills: '' });
    setCurrentId(null);
    setIsEditing(false);
  };

  const handleEdit = (item: ExperienceItem) => {
    setFormData({
      role: item.role,
      company: item.company,
      period: item.period,
      description: item.description,
      skills: item.skills.join(', ')
    });
    setCurrentId(item.id);
    setIsEditing(true);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("Delete this experience item?")) {
      await deleteExperience(id);
      onRefresh();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      ...formData,
      skills: formData.skills.split(',').map(s => s.trim()).filter(s => s !== '')
    };

    try {
      if (currentId) {
        await updateExperience(currentId, payload);
      } else {
        await createExperience(payload);
      }
      resetForm();
      onRefresh();
    } catch (error) {
      console.error(error);
      alert('Failed to save experience');
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
           <h2 className="text-3xl font-bold">Experience</h2>
           <p className="text-zinc-500 mt-1">Manage your work history and resume items.</p>
        </div>
        {!isEditing && (
          <button 
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-2 px-6 py-3 bg-zinc-900 text-white font-bold uppercase text-sm tracking-wider hover:bg-zinc-800 transition-colors shadow-lg"
          >
            <Plus className="w-4 h-4" /> Add Experience
          </button>
        )}
      </div>

      {isEditing && (
        <div className="bg-white p-8 border border-zinc-200 shadow-lg relative">
          <h3 className="text-lg font-bold mb-6 pb-2 border-b border-zinc-100">
            {currentId ? 'Edit Experience' : 'New Experience'}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 mb-2">Role</label>
                <input 
                  required value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})}
                  className="w-full bg-zinc-50 border border-zinc-200 p-3 focus:border-zinc-900 outline-none"
                  placeholder="e.g. Senior Engineer"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 mb-2">Company</label>
                <input 
                  required value={formData.company} onChange={e => setFormData({...formData, company: e.target.value})}
                  className="w-full bg-zinc-50 border border-zinc-200 p-3 focus:border-zinc-900 outline-none"
                  placeholder="e.g. Google"
                />
              </div>
            </div>
            <div>
               <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 mb-2">Period</label>
               <input 
                 required value={formData.period} onChange={e => setFormData({...formData, period: e.target.value})}
                 className="w-full bg-zinc-50 border border-zinc-200 p-3 focus:border-zinc-900 outline-none"
                 placeholder="e.g. 2020 — Present"
               />
            </div>
            <div>
               <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 mb-2">Description</label>
               <textarea 
                 required rows={3} value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})}
                 className="w-full bg-zinc-50 border border-zinc-200 p-3 focus:border-zinc-900 outline-none"
                 placeholder="Brief description of responsibilities..."
               />
            </div>
            <div>
               <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 mb-2">Skills (Comma separated)</label>
               <input 
                 value={formData.skills} onChange={e => setFormData({...formData, skills: e.target.value})}
                 className="w-full bg-zinc-50 border border-zinc-200 p-3 focus:border-zinc-900 outline-none"
                 placeholder="React, Node.js, TypeScript"
               />
            </div>
            
            <div className="flex gap-4 pt-4">
              <button type="submit" className="px-6 py-3 bg-zinc-900 text-white text-sm font-bold uppercase flex items-center gap-2 hover:bg-zinc-700">
                <Check className="w-4 h-4" /> Save Item
              </button>
              <button type="button" onClick={resetForm} className="px-6 py-3 border border-zinc-200 text-zinc-600 text-sm font-bold uppercase flex items-center gap-2 hover:bg-zinc-50">
                <X className="w-4 h-4" /> Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="grid gap-6">
        {initialData.map(item => (
          <div key={item.id} className="bg-white p-6 border border-zinc-200 flex flex-col md:flex-row justify-between items-start gap-4 group hover:shadow-md transition-all">
             <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <Briefcase className="w-4 h-4 text-zinc-400" />
                  <span className="text-sm font-bold text-zinc-900">{item.role}</span>
                  <span className="text-zinc-300">/</span>
                  <span className="text-sm font-medium text-zinc-600">{item.company}</span>
                </div>
                <p className="text-xs text-zinc-500 uppercase tracking-wider mb-3">{item.period}</p>
                <p className="text-zinc-600 text-sm mb-3">{item.description}</p>
                <div className="flex flex-wrap gap-2">
                  {item.skills.map(skill => (
                    <span key={skill} className="text-xs bg-zinc-100 px-2 py-1 text-zinc-500 border border-zinc-200">{skill}</span>
                  ))}
                </div>
             </div>
             <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={() => handleEdit(item)} className="p-2 text-zinc-400 hover:text-zinc-900 hover:bg-zinc-100"><Edit className="w-4 h-4" /></button>
                <button onClick={() => handleDelete(item.id)} className="p-2 text-zinc-400 hover:text-red-600 hover:bg-red-50"><Trash2 className="w-4 h-4" /></button>
             </div>
          </div>
        ))}
        {initialData.length === 0 && !isEditing && (
          <div className="p-12 text-center border border-dashed border-zinc-300 text-zinc-400">
            No experience items found. Add one above.
          </div>
        )}
      </div>
    </div>
  );
};

export default ExperienceManager;