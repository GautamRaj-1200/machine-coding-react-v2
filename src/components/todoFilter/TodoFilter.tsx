import "./TodoFilter.css";
import { useState } from "react";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

type FilterType = "ALL" | "COMPLETED" | "PENDING";

export default function TodoFilter() {
  const [todoInput, setTodoInput] = useState<string>("");
  const [todoList, setTodoList] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<FilterType>("ALL");

  const handleTodoInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setTodoInput(e.target.value);
  };

  const addTodo = () => {
    if (todoInput.trim() === "") return;

    const todo: Todo = {
      id: todoList.length + 1,
      text: todoInput.trim(),
      completed: false,
    };

    const updatedTodos = [...todoList, todo];
    setTodoList(updatedTodos);
    setTodoInput("");
  };

  const toggleCompleted = (id: number) => {
    const updatedTodos = todoList.map((t) =>
      t.id === id ? { ...t, completed: !t.completed } : t
    );
    setTodoList(updatedTodos);
  };

  const handleDelete = (id: number) => {
    const updatedTodos = todoList.filter((t) => t.id !== id);
    setTodoList(updatedTodos);
  };

  const getFilteredTodos = () => {
    switch (filter) {
      case "COMPLETED":
        return todoList.filter((t) => t.completed);
      case "PENDING":
        return todoList.filter((t) => !t.completed);
      default:
        return todoList;
    }
  };

  const visibleTodos = getFilteredTodos();

  return (
    <div className="todo">
      <div className="todo-input">
        <input
          type="text"
          placeholder="Enter todo"
          value={todoInput}
          onChange={handleTodoInputChange}
        />
        <button type="button" onClick={addTodo}>
          Add
        </button>
      </div>

      <div style={{ marginTop: "10px" }} className="todo-filters">
        <button onClick={() => setFilter("ALL")}>All</button>
        <button onClick={() => setFilter("COMPLETED")}>Completed</button>
        <button onClick={() => setFilter("PENDING")}>Pending</button>
      </div>

      <ul className="todo-list">
        {visibleTodos.map((t) => (
          <li key={t.id} className="todo-list-item">
            <input
              type="checkbox"
              checked={t.completed}
              onChange={() => toggleCompleted(t.id)}
            />
            <span className={t.completed ? "strikethrough" : ""}>{t.text}</span>
            <button onClick={() => handleDelete(t.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
