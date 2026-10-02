export type TaskStatus = 'todo' | 'in_progress' | 'completed';
export type TaskPriority = 'low' | 'medium' | 'high';

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  priority: TaskPriority;
  projectId?: string;
  createdAt: string;
}

export interface Project {
  id: string;
  name: string;
  category: string;
  description: string;
  status: 'active' | 'completed' | 'on_hold';
  createdAt: string;
}

export type SortByOption = 'createdAt' | 'priority' | 'title';
export type SortOrderOption = 'asc' | 'desc';

export interface TaskFilterOptions {
  searchQuery: string;
  status: TaskStatus | 'all';
  priority: TaskPriority | 'all';
  sortBy: SortByOption;
  sortOrder: SortOrderOption;
}