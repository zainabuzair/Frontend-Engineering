import React, { useState } from 'react';
import { Plus, CheckCircle2, Clock, AlertCircle } from 'lucide-react';
import { Button } from '../assets/components/common/Button';
import { Badge } from '../assets/components/common/Badge';

interface Task {
  id: string;
  title: string;
  priority: 'low' | 'medium' | 'high';
  status: 'todo' | 'in_progress' | 'completed';
}

const initialTasks: Task[] = [
  { id: '1', title: 'Setup Vite + React Router Layout', priority: 'high', status: 'completed' },
  { id: '2', title: 'Design Component UI Library with Tailwind', priority: 'medium', status: 'in_progress' },
  { id: '3', title: 'Integrate TanStack Query & REST API Data', priority: 'high', status: 'todo' },
];

export const Tasks: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  const toggleStatus = (id: string) => {
    setTasks(
      tasks.map((t) => {
        if (t.id === id) {
          const nextStatus = t.status === 'todo' ? 'in_progress' : t.status === 'in_progress' ? 'completed' : 'todo';
          return { ...t, status: nextStatus };
        }
        return t;
      })
    );
  };

  const getPriorityBadge = (p: Task['priority']) => {
    switch (p) {
      case 'high': return <Badge variant="danger">High</Badge>;
      case 'medium': return <Badge variant="warning">Medium</Badge>;
      case 'low': return <Badge variant="default">Low</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Tasks Breakdown</h2>
          <p className="text-sm text-slate-500">Interactive task status and workflow tracker.</p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 divide-y divide-slate-100 shadow-sm">
        {tasks.map((task) => (
          <div key={task.id} className="p-4 flex items-center justify-between hover:bg-slate-50/50 transition-colors">
            <div className="flex items-center gap-3">
              <button onClick={() => toggleStatus(task.id)} className="text-slate-400 hover:text-indigo-600">
                {task.status === 'completed' ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                ) : task.status === 'in_progress' ? (
                  <Clock className="w-5 h-5 text-amber-500" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-slate-300" />
                )}
              </button>
              <span className={`text-sm font-medium ${task.status === 'completed' ? 'line-through text-slate-400' : 'text-slate-700'}`}>
                {task.title}
              </span>
            </div>
            <div className="flex items-center gap-4">
              {getPriorityBadge(task.priority)}
              <span className="text-xs capitalize px-2 py-1 bg-slate-100 text-slate-600 rounded">
                {task.status.replace('_', ' ')}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};