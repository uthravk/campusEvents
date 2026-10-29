import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar">
      <Link className="logo" to="/" aria-label="CampusConnect home">
        CampusConnect
      </Link>

      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/events">Events</Link>
        <a href="/#about">About</a>
      </div>
    </nav>
  );
}