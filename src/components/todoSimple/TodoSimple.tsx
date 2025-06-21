import "./TodoSimple.css";
import { useState } from "react";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}
function TodoSimple() {
  const [input, setInput] = useState<string>("");
  const [todoList, setTodoList] = useState<Todo[]>([]);
  const addTodo = () => {
    if (input.trim() === "") return;
    const todo: Todo = {
      id: todoList.length + 1,
      text: input.trim(),
      completed: false,
    };
    setTodoList((prev) => [...prev, todo]);
    setInput("");
  };

  const toggleCompleted = (id: number) => {
    setTodoList(
      todoList.map((t) => {
        if (t.id === id) {
          return {
            ...t,
            completed: !t.completed,
          };
        } else {
          return t;
        }
      })
    );
  };

  const deleteTodo = (id: number) => {
    setTodoList(todoList.filter((t) => t.id !== id));
  };
  return (
    <div className="todo">
      <div className="todo-input">
        <input
          type="text"
          placeholder="Enter todo"
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
          }}
        />
        <button onClick={addTodo}>Add</button>
      </div>

      <ul className="todo-list">
        {todoList.map((t) => (
          <li key={t.id} className="todo-list-item">
            <input
              type="checkbox"
              checked={t.completed}
              onChange={() => toggleCompleted(t.id)}
            />
            <span className={t.completed ? "strikethrough" : ""}>{t.text}</span>
            <button onClick={() => deleteTodo(t.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoSimple;
