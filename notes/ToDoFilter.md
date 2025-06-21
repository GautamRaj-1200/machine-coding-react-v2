## Approach and learnings

- Start by creating an input box and an "Add" button.  
- Initially, I thought of creating a `div`, getting its ref, and manually appending todos to it.  
- But a better approach is to manage a `todoList` state and render todos using `.map()` in React.  
- The `todoList` is an array of objects, initially empty.  
- When the "Add" button is clicked, a new todo object is created with a unique `id`, the input text, and a `completed` flag set to `false`, and then added to the list using `setTodoList`.  
- To toggle the `completed` status, I use the `id` to identify the correct todo in the list, then use `.map()` to return a new list—keeping all properties the same except `completed`, which is toggled using `!t.completed`.  
- To delete a todo, I use `.filter()` to create a new list that excludes the todo with the matching `id`, and then update the state using `setTodoList`.  
- I added filter functionality using three buttons: **All**, **Completed**, and **Pending**, and managed the current filter selection using a separate `filter` state.  
- I learned why it's important **not to modify the original `todoList` directly when filtering**. Instead, I created a separate derived variable called `visibleTodos`, which holds the filtered result. This keeps the actual data intact and allows filtering to be dynamic and reversible.  
- The `getFilteredTodos()` function returns a new array based on the selected filter, and `visibleTodos.map()` is used for rendering. This separation of data and UI logic improves code clarity, ensures correct rendering, and avoids accidental data loss.

```js
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
```