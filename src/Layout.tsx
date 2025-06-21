import { Link, Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div>
      <div style={{ padding: "1rem" }}>
        <Link to="/">
          <button>Back to Home</button>
        </Link>
      </div>
      <Outlet />
    </div>
  );
}
