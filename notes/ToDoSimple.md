## Approach and learnings
- Start by creating an input box and an "Add" button.
- Initially, I thought of creating a div, getting its ref, and manually appending todos to it.
- But a better approach is to manage a todoList state and render todos using .map() in React.
- The todoList is an array of objects, initially empty.
- When the "Add" button is clicked, a new todo object is created with a unique id, the input text, and a completed flag set to false, and then added to the list using setTodoList.
- To toggle the completed status, I use the id to identify the correct todo in the list, then use .map() to return a new list—keeping all properties the same except completed, which is toggled using !t.completed.
- To delete a todo, I use .filter() to create a new list that excludes the todo with the matching id, and then update the state using setTodoList.

```js
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
```