import { useState } from "react";
import "./todoEdit.css";

interface Todo {
  id: number;
  content: string;
  completed: boolean;
}

export default function TodoEdit() {
  const [todoInput, setTodoInput] = useState<string>("");
  const [todoList, setTodoList] = useState<Todo[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editValue, setEditValue] = useState<string>("");

  const handleAddTodo = (): void => {
    if (todoInput.trim() === "") return;
    const todo: Todo = {
      id: Date.now(),
      content: todoInput.trim(),
      completed: false,
    };
    setTodoList((prev) => [...prev, todo]);
    setTodoInput("");
  };

  const handleDeleteTodo = (id: number): void => {
    setTodoList(todoList.filter((todo) => todo.id !== id));
  };

  const handleToggleCompleted = (id: number): void => {
    setTodoList(
      todoList.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const handleStartEditing = (id: number, currentContent: string): void => {
    setEditingId(id);
    setEditValue(currentContent);
  };

  const handleSaveEdit = (id: number): void => {
    setTodoList(
      todoList.map((todo) =>
        todo.id === id ? { ...todo, content: editValue } : todo
      )
    );
    setEditingId(null);
    setEditValue("");
  };

  return (
    <div className="container">
      <div className="input-group">
        <input
          type="text"
          placeholder="Enter a todo..."
          value={todoInput}
          onChange={(e) => setTodoInput(e.target.value)}
        />
        <button onClick={handleAddTodo}>Add Todo</button>
      </div>

      <ul>
        {todoList.map((todo) => (
          <li key={todo.id}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => handleToggleCompleted(todo.id)}
            />

            {editingId === todo.id ? (
              <input
                type="text"
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSaveEdit(todo.id);
                }}
              />
            ) : (
              <span className={todo.completed ? "strikethrough" : ""}>
                {todo.content}
              </span>
            )}

            {editingId === todo.id ? (
              <button onClick={() => handleSaveEdit(todo.id)}>Save</button>
            ) : (
              <button onClick={() => handleStartEditing(todo.id, todo.content)}>
                Edit
              </button>
            )}

            <button onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
