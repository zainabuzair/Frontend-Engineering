import React, { useState, useMemo } from 'react';
import { Plus, CheckCircle2, Clock, AlertCircle, Trash2, Search, ArrowUpDown, SlidersHorizontal } from 'lucide-react';
import { useTasks } from '../hooks/useTasks';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { Button } from '../assets/components/common/Button';
import { Badge } from '../assets/components/common/Badge';
import { Modal } from '../assets/components/common/Modal';
import { TaskPriority, TaskStatus, SortByOption, SortOrderOption } from '../types';

export const Tasks: React.FC = () => {
  const { tasks, isLoading, createTask, updateStatus, deleteTask, isCreating } = useTasks();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Persistent Filter States via useLocalStorage
  const [searchQuery, setSearchQuery] = useLocalStorage<string>('tasks_search', '');
  const [statusFilter, setStatusFilter] = useLocalStorage<TaskStatus | 'all'>('tasks_status_filter', 'all');
  const [priorityFilter, setPriorityFilter] = useLocalStorage<TaskPriority | 'all'>('tasks_priority_filter', 'all');
  const [sortBy, setSortBy] = useLocalStorage<SortByOption>('tasks_sort_by', 'createdAt');
  const [sortOrder, setSortOrder] = useLocalStorage<SortOrderOption>('tasks_sort_order', 'desc');

  // New Task Form State
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<TaskPriority>('medium');

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    createTask(
      { title, description, priority, status: 'todo' },
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

  // Filter and Sort Pipeline
  const filteredAndSortedTasks = useMemo(() => {
    return tasks
      .filter((task) => {
        const matchesSearch =
          task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (task.description && task.description.toLowerCase().includes(searchQuery.toLowerCase()));
        const matchesStatus = statusFilter === 'all' || task.status === statusFilter;
        const matchesPriority = priorityFilter === 'all' || task.priority === priorityFilter;
        return matchesSearch && matchesStatus && matchesPriority;
      })
      .sort((a, b) => {
        let comparison = 0;
        if (sortBy === 'createdAt') {
          comparison = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        } else if (sortBy === 'title') {
          comparison = a.title.localeCompare(b.title);
        } else if (sortBy === 'priority') {
          const priorityWeights: Record<TaskPriority, number> = { high: 3, medium: 2, low: 1 };
          comparison = priorityWeights[a.priority] - priorityWeights[b.priority];
        }
        return sortOrder === 'asc' ? comparison : -comparison;
      });
  }, [tasks, searchQuery, statusFilter, priorityFilter, sortBy, sortOrder]);

  const toggleTaskStatus = (id: string, currentStatus: TaskStatus) => {
    const nextStatus: Record<TaskStatus, TaskStatus> = {
      todo: 'in_progress',
      in_progress: 'completed',
      completed: 'todo',
    };
    updateStatus({ id, status: nextStatus[currentStatus] });
  };

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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Tasks Dashboard</h1>
          <p className="text-sm text-slate-500">Filter, search, and manage ongoing developer tasks.</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Create Task
        </Button>
      </div>

      {/* Control Panel: Search & Filters */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-3">
        <div className="flex flex-col md:flex-row gap-3">
          {/* Search Box */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search tasks by title or description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Priority Filter */}
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-slate-400" />
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value as TaskPriority | 'all')}
              className="px-3 py-2 text-sm border border-slate-200 rounded-lg bg-white focus:outline-none"
            >
              <option value="all">All Priorities</option>
              <option value="high">High Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="low">Low Priority</option>
            </select>
          </div>

          {/* Sort Control */}
          <div className="flex items-center gap-2">
            <ArrowUpDown className="w-4 h-4 text-slate-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortByOption)}
              className="px-3 py-2 text-sm border border-slate-200 rounded-lg bg-white focus:outline-none"
            >
              <option value="createdAt">Sort by Date</option>
              <option value="priority">Sort by Priority</option>
              <option value="title">Sort by Title</option>
            </select>

            <button
              onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
              className="px-3 py-2 text-xs font-semibold border border-slate-200 rounded-lg hover:bg-slate-50 uppercase"
            >
              {sortOrder}
            </button>
          </div>
        </div>

        {/* Status Tabs */}
        <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
          {(['all', 'todo', 'in_progress', 'completed'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setStatusFilter(tab)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-colors ${
                statusFilter === tab ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              {tab.replace('_', ' ')}
            </button>
          ))}
        </div>
      </div>

      {/* Task List Render */}
      {isLoading ? (
        <div className="py-12 text-center text-slate-400 text-sm">Loading task dataset...</div>
      ) : filteredAndSortedTasks.length === 0 ? (
        <div className="py-12 text-center text-slate-400 text-sm bg-white rounded-xl border border-slate-200">
          No tasks match your current search or filter parameters.
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-slate-200 divide-y divide-slate-100 shadow-sm">
          {filteredAndSortedTasks.map((task) => (
            <div key={task.id} className="p-4 flex items-center justify-between hover:bg-slate-50/50 transition-colors">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => toggleTaskStatus(task.id, task.status)}
                  className="text-slate-400 hover:text-indigo-600 transition-colors"
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
                  <h4 className={`text-sm font-medium ${task.status === 'completed' ? 'line-through text-slate-400' : 'text-slate-800'}`}>
                    {task.title}
                  </h4>
                  {task.description && <p className="text-xs text-slate-400 mt-0.5">{task.description}</p>}
                </div>
              </div>

              <div className="flex items-center gap-3">
                {getPriorityBadge(task.priority)}
                <span className="text-xs capitalize px-2 py-1 bg-slate-100 text-slate-600 rounded">
                  {task.status.replace('_', ' ')}
                </span>
                <button onClick={() => deleteTask(task.id)} className="p-1 text-slate-400 hover:text-rose-600 transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Create New Task">
        <form onSubmit={handleCreateTask} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Task Title</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Implement search pipeline"
              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Description</label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add optional description..."
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