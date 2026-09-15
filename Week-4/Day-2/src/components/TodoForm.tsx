import React, { useState } from "react";
import { TodoFormProps } from "../types/todo";

export const TodoForm: React.FC<TodoFormProps> = ({ onAddTodo }) => {
  const [inputTitle, setInputTitle] = useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (!inputTitle.trim()) return;

    onAddTodo(inputTitle.trim());
    setInputTitle("");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setInputTitle(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
      <input
        type="text"
        placeholder="Enter new task..."
        value={inputTitle}
        onChange={handleInputChange}
        style={{ padding: "8px", width: "250px", marginRight: "10px" }}
      />
      <button type="submit" style={{ padding: "8px 16px", cursor: "pointer" }}>
        Add Task
      </button>
    </form>
  );
};