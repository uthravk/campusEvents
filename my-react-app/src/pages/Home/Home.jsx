import { Link } from "react-router-dom";
import "./Home.css";

export default function Home() {
  return (
    <main className="home-page">
      <section className="home-hero">
        <div className="hero-inner">
          <p className="eyebrow">YOUR CAMPUS, YOUR COMMUNITY</p>
          <h1>
            Make Your Campus
            <span>Experience Count.</span>
          </h1>
          <p className="hero-subtitle">
            Discover events, connect with your campus community, and make every
            moment count.
          </p>
          <div className="hero-actions">
            <Link className="primary-button" to="/events">
              Explore Events
            </Link>
            <Link className="secondary-button" to="/register">
              Register for an Event
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
