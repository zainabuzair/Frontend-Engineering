import { useState, useEffect } from "react";
import { TodoItem, FilterStatus, TodoId } from "./types/todo";
import { TodoForm } from "./components/TodoForm";
import { TodoList } from "./components/TodoList";

export function App() {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [filter, setFilter] = useState<FilterStatus>("all");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchInitialTodos = async (): Promise<void> => {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/todos?_limit=5"
        );
        if (!response.ok) {
          throw new Error("Failed to load initial tasks");
        }
        const data: TodoItem[] = await response.json();
        setTodos(data);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unexpected error occurred.");
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchInitialTodos();
  }, []);

  const handleAddTodo = (title: string): void => {
    const newTodo: TodoItem = {
      id: Date.now(),
      title,
      completed: false,
    };
    setTodos((prev) => [newTodo, ...prev]);
  };

  const handleToggleTodo = (id: TodoId): void => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const handleDeleteTodo = (id: TodoId): void => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === "completed") return todo.completed;
    if (filter === "active") return !todo.completed;
    return true;
  });

  return (
    <div style={{ padding: "40px", fontFamily: "sans-serif" }}>
      <h1>Day 2: React + TypeScript Task Manager</h1>

      <TodoForm onAddTodo={handleAddTodo} />

      <div style={{ marginBottom: "20px" }}>
        {(["all", "active", "completed"] as FilterStatus[]).map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            style={{
              marginRight: "8px",
              padding: "6px 12px",
              fontWeight: filter === status ? "bold" : "normal",
              textTransform: "capitalize",
              cursor: "pointer",
            }}
          >
            {status}
          </button>
        ))}
      </div>

      {isLoading && <p>Loading tasks from API...</p>}
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
      {!isLoading && !error && (
        <TodoList
          todos={filteredTodos}
          onToggleTodo={handleToggleTodo}
          onDeleteTodo={handleDeleteTodo}
        />
      )}
    </div>
  );
}

export default App;