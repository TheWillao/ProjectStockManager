import { Link, useLocation } from "react-router-dom";
import { Outlet } from "react-router-dom";

export default function Items() {
  const location = useLocation();
  const { pathname } = location;

  return (
    <div className="h-100 p-5">
      <h1>Itens</h1>
      <div className="mt-5 d-flex w-100 gap-5 mb-2">
        <Link
          to="/items"
          className={`${
            pathname === "/items" ? "border-bottom border-white" : ""
          } text-decoration-none`}
        >
          <h5 role="button">Todos os itens</h5>
        </Link>
        <Link
          to="new"
          className={`${
            pathname === "/items/new" ? "border-bottom border-white" : ""
          } text-decoration-none`}
        >
          <h5 role="button">Novo item</h5>
        </Link>
      </div>
      <Outlet />
    </div>
  );
}
