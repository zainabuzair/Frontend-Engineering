import { Task, Project } from '../types';

const TASKS_STORAGE_KEY = 'devtrack_tasks_v1';

const getInitialTasks = (): Task[] => {
  const stored = localStorage.getItem(TASKS_STORAGE_KEY);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch (e) {
      console.error('Failed to parse stored tasks', e);
    }
  }
  return [
    {
      id: '1',
      title: 'Design initial Figma wireframes',
      description: 'Create low-fidelity mockups for dashboard and tasks pages.',
      status: 'completed',
      priority: 'high',
      createdAt: new Date(Date.now() - 86400000 * 3).toISOString(),
    },
    {
      id: '2',
      title: 'Set up TypeScript & React Query',
      description: 'Configure QueryClientProvider and base custom hooks.',
      status: 'in_progress',
      priority: 'medium',
      createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    },
    {
      id: '3',
      title: 'Implement Task CRUD operations',
      description: 'Connect form submission to reactive state updates.',
      status: 'todo',
      priority: 'high',
      createdAt: new Date(Date.now() - 86400000).toISOString(),
    },
  ];
};

let mockTasks: Task[] = getInitialTasks();

const saveTasksToStorage = (tasks: Task[]) => {
  localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks));
};

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const fetchTasks = async (): Promise<Task[]> => {
  await delay(200);
  return [...mockTasks];
};

export const createTask = async (task: Omit<Task, 'id' | 'createdAt'>): Promise<Task> => {
  await delay(200);
  const newTask: Task = {
    ...task,
    id: Math.random().toString(36).substring(2, 9),
    createdAt: new Date().toISOString(),
  };
  mockTasks = [newTask, ...mockTasks];
  saveTasksToStorage(mockTasks);
  return newTask;
};

export const updateTaskStatus = async (id: string, status: Task['status']): Promise<Task> => {
  await delay(150);
  mockTasks = mockTasks.map((t) => (t.id === id ? { ...t, status } : t));
  saveTasksToStorage(mockTasks);
  const updated = mockTasks.find((t) => t.id === id);
  if (!updated) throw new Error('Task not found');
  return updated;
};

export const deleteTask = async (id: string): Promise<string> => {
  await delay(150);
  mockTasks = mockTasks.filter((t) => t.id !== id);
  saveTasksToStorage(mockTasks);
  return id;
};