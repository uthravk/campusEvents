import { Link, NavLink, useLocation, useSearchParams } from "react-router-dom";
import { useFavorites } from "../../../context/FavoritesContext";
import "./Navbar.css";

export function Navbar() {
  const { favorites } = useFavorites();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const showingFavorites =
    location.pathname === "/events" && searchParams.get("favorites") === "true";

  return (
    <header className="navbar">
      <Link className="brand" to="/">
        <svg aria-hidden="true" viewBox="0 0 24 24">
          <path d="M2 10 12 4l10 6-10 6L2 10Z" />
          <path d="M6 12.5V17c3.6 2.7 8.4 2.7 12 0v-4.5M22 10v6" />
        </svg>
        CampusConnect
      </Link>
      <nav aria-label="Main navigation">
        <NavLink to="/" end>
          Home
        </NavLink>
        <NavLink
          to="/events"
          className={
            location.pathname === "/events" && !showingFavorites ? "active" : ""
          }
        >
          Events
        </NavLink>
        <NavLink to="/register">Register</NavLink>
        <NavLink
          to="/events?favorites=true"
          className={
            showingFavorites ? "active favorite-nav-link" : "favorite-nav-link"
          }
        >
          Favorites{" "}
          <span className="favorite-count">
            <svg aria-hidden="true" viewBox="0 0 24 24">
              <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z" />
            </svg>
            {favorites.length}
          </span>
        </NavLink>
      </nav>
    </header>
  );
}
