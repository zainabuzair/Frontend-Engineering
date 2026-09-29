// src/types/index.ts

export type TaskStatus = 'todo' | 'in_progress' | 'completed';
export type Priority = 'low' | 'medium' | 'high';

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: Priority;
  projectId: string;
  createdAt: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  category: string;
  status: 'active' | 'archived' | 'completed';
  createdAt: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar: string;
}

export interface NavigationItem {
  label: string;
  path: string;
  iconName: string;
}