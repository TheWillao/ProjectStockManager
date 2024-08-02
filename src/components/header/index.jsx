import { Link, useLocation } from "react-router-dom";

export default function Header() {
  const location = useLocation();
  const { pathname } = location;

  return (
    <header style={{ height: "100px" }}>
      <nav className="d-flex p-4 justify-content-between bg-warning border-bottom border-light">
        <Link to="/" className="text-decoration-none">
          <h4 className="text-uppercase" role="button">
            Stock Manager
          </h4>
        </Link>
        <div className="d-flex gap-4">
          <Link
            to="/"
            className={`${
              pathname === "/" ? "border-bottom border-dark" : ""
            } text-decoration-none`}
          >
            <h4 role="button">Início</h4>
          </Link>
          <Link
            to="/items"
            className={`${
              pathname !== "/" ? "border-bottom border-dark" : ""
            } text-decoration-none`}
          >
            <h4 role="button">Itens</h4>
          </Link>
        </div>
      </nav>
    </header>
  );
}
