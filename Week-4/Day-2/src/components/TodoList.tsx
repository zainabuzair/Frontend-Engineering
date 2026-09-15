import React from "react";
import { TodoListProps } from "../types/todo";

export const TodoList: React.FC<TodoListProps> = ({
  todos,
  onToggleTodo,
  onDeleteTodo,
}) => {
  if (todos.length === 0) {
    return <p>No tasks found.</p>;
  }

  return (
    <ul style={{ listStyle: "none", padding: 0 }}>
      {todos.map((todo) => (
        <li
          key={todo.id}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "8px",
            borderBottom: "1px solid #ccc",
            width: "350px",
          }}
        >
          <span
            onClick={() => onToggleTodo(todo.id)}
            style={{
              textDecoration: todo.completed ? "line-through" : "none",
              cursor: "pointer",
            }}
          >
            {todo.title}
          </span>
          <button
            onClick={() => onDeleteTodo(todo.id)}
            style={{
              backgroundColor: "#ff4d4d",
              color: "#fff",
              border: "none",
              padding: "4px 8px",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};