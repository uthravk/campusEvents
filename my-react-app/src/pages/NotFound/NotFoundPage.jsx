import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <section className="events-section">
      <p className="eyebrow">404</p>
      <h1>Page not found</h1>
      <p>The page you requested does not exist.</p>
      <Link to="/" className="hero-button">Return home</Link>
    </section>
  );
}
