import "./App.css";
import { Routes, Route } from "react-router-dom";
import TodoSimple from "./components/todoSimple/TodoSimple";
import Home from "./pages/Home";
import TodoFilter from "./components/todoFilter/TodoFilter";
import TodoFilterSimple from "./components/todoFilterSimple/TodoFilterSimple";
import Layout from "./Layout";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route element={<Layout />}>
        <Route path="/todo-simple" element={<TodoSimple />} />
        <Route path="/todo-filter-simple" element={<TodoFilterSimple />} />
        <Route path="/todo-filter" element={<TodoFilter />} />
      </Route>
    </Routes>
  );
}

export default App;
