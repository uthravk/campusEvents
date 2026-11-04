import { Link } from "react-router-dom";
import "./Footer.css";
export function Footer() {
  return (
    <footer className="footer">
      <div>
        <strong>CampusConnect</strong>
        <p>Discover events. Meet people. Make memories.</p>
      </div>
      <div className="footer-links">
        <Link to="/events">Explore events</Link>
        <Link to="/register">Student registration</Link>
      </div>
      <small>&copy; {new Date().getFullYear()} CampusConnect</small>
    </footer>
  );
}
