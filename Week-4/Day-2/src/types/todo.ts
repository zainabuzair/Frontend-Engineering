// Reusable primitive type aliases
export type TodoId = number;
export type FilterStatus = "all" | "completed" | "active";

// Interface representing the shape of a single Todo item
export interface TodoItem {
  id: TodoId;
  title: string;
  completed: boolean;
  userId?: number;
}

// Generic interface for API responses
export interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}

// Component Props Interfaces
export interface TodoListProps {
  todos: TodoItem[];
  onToggleTodo: (id: TodoId) => void;
  onDeleteTodo: (id: TodoId) => void;
}

export interface TodoFormProps {
  onAddTodo: (title: string) => void;
}