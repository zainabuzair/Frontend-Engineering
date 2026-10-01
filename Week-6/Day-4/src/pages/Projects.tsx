import React, { useState } from 'react';
import { Plus, Search, Folder, Calendar, Tag } from 'lucide-react';
import { Button } from '../assets/components/common/Button';
import { Badge } from '../assets/components/common/Badge';
import { Modal } from '../assets/components/common/Modal';

interface Project {
  id: string;
  name: string;
  description: string;
  category: string;
  status: 'active' | 'completed' | 'archived';
  taskCount: number;
}

const initialProjects: Project[] = [
  { id: '1', name: 'TripWise AI Engine', description: 'OpenAI API integrated travel itinerary generator.', category: 'AI & Web', status: 'active', taskCount: 8 },
  { id: '2', name: 'SecureNotesVault', description: 'Encrypted developer note keeping app with Netlify deployment.', category: 'Security', status: 'completed', taskCount: 14 },
  { id: '3', name: 'Star Security Services', description: 'Corporate portal for security Guard & shift management.', category: 'Enterprise', status: 'active', taskCount: 5 },
];

export const Projects: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newProject, setNewProject] = useState({ name: '', description: '', category: 'Web' });

  const filteredProjects = projects.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.category.toLowerCase().includes(search.toLowerCase())
  );

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProject.name) return;
    const created: Project = {
      id: Date.now().toString(),
      name: newProject.name,
      description: newProject.description,
      category: newProject.category,
      status: 'active',
      taskCount: 0,
    };
    setProjects([created, ...projects]);
    setNewProject({ name: '', description: '', category: 'Web' });
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Projects Directory</h2>
          <p className="text-sm text-slate-500">Manage active development repositories and applications.</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)}>
          <Plus className="w-4 h-4 mr-2" /> New Project
        </Button>
      </div>

      {/* Search Bar */}
      <div className="relative max-w-md">
        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          placeholder="Filter projects by name or category..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
        />
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <div key={project.id} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
            <div>
              <div className="flex items-start justify-between mb-3">
                <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600">
                  <Folder className="w-5 h-5" />
                </div>
                <Badge variant={project.status === 'completed' ? 'success' : 'info'}>
                  {project.status}
                </Badge>
              </div>
              <h3 className="font-semibold text-slate-800 text-lg mb-1">{project.name}</h3>
              <p className="text-slate-600 text-sm line-clamp-2 mb-4">{project.description}</p>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span className="flex items-center gap-1">
                <Tag className="w-3.5 h-3.5" /> {project.category}
              </span>
              <span>{project.taskCount} tasks</span>
            </div>
          </div>
        ))}
      </div>

      {/* New Project Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Create Project">
        <form onSubmit={handleCreate} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Project Name</label>
            <input
              type="text"
              required
              value={newProject.name}
              onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500"
              placeholder="e.g., Portfolio Dashboard"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Category</label>
            <input
              type="text"
              value={newProject.category}
              onChange={(e) => setNewProject({ ...newProject, category: e.target.value })}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Description</label>
            <textarea
              rows={3}
              value={newProject.description}
              onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500"
              placeholder="Brief overview..."
            />
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button type="submit">Create</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};