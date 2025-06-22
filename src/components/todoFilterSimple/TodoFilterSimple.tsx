import "./TodoFilterSimple.css";
import { useState, useEffect } from "react";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export default function TodoFilterSimple() {
  const [todoInput, setTodoInput] = useState<string>("");
  const [todoList, setTodoList] = useState<Todo[]>([]);
  const [visibleTodos, setVisibleTodos] = useState<Todo[]>([]);

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

  useEffect(() => {
    // Show all todos by default whenever todoList changes
    setVisibleTodos(todoList);
  }, [todoList]);

  const handleAll = () => {
    setVisibleTodos(todoList);
  };

  const handleCompleted = () => {
    setVisibleTodos(todoList.filter((todo) => todo.completed));
  };

  const handlePending = () => {
    setVisibleTodos(todoList.filter((todo) => !todo.completed));
  };
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
        <button onClick={handleAll}>All</button>
        <button onClick={handleCompleted}>Completed</button>
        <button onClick={handlePending}>Pending</button>
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
