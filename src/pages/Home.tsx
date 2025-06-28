import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
  return (
    <nav>
      <ul className="links">
        <Link to="/todo-simple">
          <li>Todo Simple</li>
        </Link>
        <Link to="/todo-filter-simple">
          <li>Todo Filter Simple</li>
        </Link>
        <Link to="/todo-filter">
          <li>Todo Filter</li>
        </Link>
        <Link to="/todo-search">
          <li>Todo Search</li>
        </Link>
        <Link to="/todo-edit">
          <li>Todo Edit</li>
        </Link>
      </ul>
    </nav>
  );
};

export default Home;
