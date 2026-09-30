import React, { useState } from 'react';
import { Plus, CheckCircle2, Clock, AlertCircle, Trash2, Filter } from 'lucide-react';
import { useTasks } from '../hooks/useTasks';
import { Button } from '../assets/components/common/Button';
import { Badge } from '../assets/components/common/Badge';
import { Modal } from '../assets/components/common/Modal';
import { TaskPriority, TaskStatus } from '../types';

export const Tasks: React.FC = () => {
  const { tasks, isLoading, createTask, updateStatus, deleteTask, isCreating } = useTasks();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filter, setFilter] = useState<TaskStatus | 'all'>('all');

  // Form state
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<TaskPriority>('medium');

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    createTask(
      {
        title,
        description,
        priority,
        status: 'todo',
      },
      {
        onSuccess: () => {
          setTitle('');
          setDescription('');
          setPriority('medium');
          setIsModalOpen(false);
        },
      }
    );
  };

  const filteredTasks = tasks.filter((t) => (filter === 'all' ? true : t.status === filter));

  const getPriorityBadge = (p: TaskPriority) => {
    switch (p) {
      case 'high':
        return <Badge variant="danger">High</Badge>;
      case 'medium':
        return <Badge variant="warning">Medium</Badge>;
      case 'low':
        return <Badge variant="info">Low</Badge>;
    }
  };

  const toggleTaskStatus = (id: string, currentStatus: TaskStatus) => {
    const nextStatus: Record<TaskStatus, TaskStatus> = {
      todo: 'in_progress',
      in_progress: 'completed',
      completed: 'todo',
    };
    updateStatus({ id, status: nextStatus[currentStatus] });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Task Management</h1>
          <p className="text-sm text-slate-500">Track and manage daily developer deliverables.</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Create Task
        </Button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
        <Filter className="w-4 h-4 text-slate-400 mr-1" />
        {(['all', 'todo', 'in_progress', 'completed'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-colors ${
              filter === tab
                ? 'bg-slate-900 text-white'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            {tab.replace('_', ' ')}
          </button>
        ))}
      </div>

      {/* Task List */}
      {isLoading ? (
        <div className="py-12 text-center text-slate-400 text-sm">Loading tasks...</div>
      ) : filteredTasks.length === 0 ? (
        <div className="py-12 text-center text-slate-400 text-sm">No tasks found.</div>
      ) : (
        <div className="bg-white rounded-xl border border-slate-200 divide-y divide-slate-100 shadow-sm">
          {filteredTasks.map((task) => (
            <div
              key={task.id}
              className="p-4 flex items-center justify-between hover:bg-slate-50/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <button
                  onClick={() => toggleTaskStatus(task.id, task.status)}
                  className="text-slate-400 hover:text-indigo-600 transition-colors"
                  title="Click to advance status"
                >
                  {task.status === 'completed' ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                  ) : task.status === 'in_progress' ? (
                    <Clock className="w-5 h-5 text-amber-500" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-slate-300" />
                  )}
                </button>
                <div>
                  <h4
                    className={`text-sm font-medium ${
                      task.status === 'completed'
                        ? 'line-through text-slate-400'
                        : 'text-slate-800'
                    }`}
                  >
                    {task.title}
                  </h4>
                  {task.description && (
                    <p className="text-xs text-slate-400 mt-0.5">{task.description}</p>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-3">
                {getPriorityBadge(task.priority)}
                <span className="text-xs capitalize px-2 py-1 bg-slate-100 text-slate-600 rounded">
                  {task.status.replace('_', ' ')}
                </span>
                <button
                  onClick={() => deleteTask(task.id)}
                  className="p-1 text-slate-400 hover:text-rose-600 transition-colors"
                  title="Delete task"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create Task Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Create New Task">
        <form onSubmit={handleCreateTask} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Task Title</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Implement API route guards"
              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Description</label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add optional task context..."
              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Priority</label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value as TaskPriority)}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="low">Low Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="high">High Priority</option>
            </select>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isCreating}>
              {isCreating ? 'Creating...' : 'Create Task'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};