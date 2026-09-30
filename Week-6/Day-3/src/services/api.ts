import { Task, Project } from '../types';

let mockTasks: Task[] = [
  {
    id: '1',
    title: 'Design initial Figma wireframes',
    description: 'Create low-fidelity mockups for dashboard and tasks pages.',
    status: 'completed',
    priority: 'high',
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'Set up TypeScript & React Query',
    description: 'Configure QueryClientProvider and base custom hooks.',
    status: 'in_progress',
    priority: 'medium',
    createdAt: new Date().toISOString(),
  },
  {
    id: '3',
    title: 'Implement Task CRUD operations',
    description: 'Connect form submission to reactive state updates.',
    status: 'todo',
    priority: 'high',
    createdAt: new Date().toISOString(),
  },
];

let mockProjects: Project[] = [
  {
    id: 'p1',
    name: 'DevTrack Portal',
    category: 'Web Application',
    description: 'Internal task and developer management workspace.',
    status: 'active',
    createdAt: new Date().toISOString(),
  },
];

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const fetchTasks = async (): Promise<Task[]> => {
  await delay(300);
  return [...mockTasks];
};

export const createTask = async (task: Omit<Task, 'id' | 'createdAt'>): Promise<Task> => {
  await delay(300);
  const newTask: Task = {
    ...task,
    id: Math.random().toString(36).substring(2, 9),
    createdAt: new Date().toISOString(),
  };
  mockTasks = [newTask, ...mockTasks];
  return newTask;
};

export const updateTaskStatus = async (id: string, status: Task['status']): Promise<Task> => {
  await delay(200);
  mockTasks = mockTasks.map((t) => (t.id === id ? { ...t, status } : t));
  const updated = mockTasks.find((t) => t.id === id);
  if (!updated) throw new Error('Task not found');
  return updated;
};

export const deleteTask = async (id: string): Promise<string> => {
  await delay(200);
  mockTasks = mockTasks.filter((t) => t.id !== id);
  return id;
};

export const fetchProjects = async (): Promise<Project[]> => {
  await delay(300);
  return [...mockProjects];
};

export const createProject = async (project: Omit<Project, 'id' | 'createdAt'>): Promise<Project> => {
  await delay(300);
  const newProj: Project = {
    ...project,
    id: Math.random().toString(36).substring(2, 9),
    createdAt: new Date().toISOString(),
  };
  mockProjects = [newProj, ...mockProjects];
  return newProj;
};