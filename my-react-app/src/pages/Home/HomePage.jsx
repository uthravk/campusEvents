import { useState } from "react";
import { Link } from "react-router-dom";
import EventForm from "../../components/EventForm/EventForm";
import EventsPage from "../Events/EventsPage";

export default function HomePage({
  events,
  loading,
  error,
  onCreateEvent,
  onRemove
}) {
  const [showForm, setShowForm] = useState(false);

  return (
    <>
      <section className="hero" id="home">
        <p className="eyebrow">YOUR CAMPUS. YOUR COMMUNITY.</p>
        <h1>
          Make Your Campus
          <br />
          <span>Experience Count.</span>
        </h1>
        <p>
          Discover exciting events, meet new people, and make the most of your
          college life.
        </p>
        <Link to="/events" className="hero-button">
          Explore Events
        </Link>
      </section>

      <section className="events-section">
        <button
          type="button"
          className="add-button"
          onClick={() => setShowForm(previous => !previous)}
          aria-expanded={showForm}
        >
          {showForm ? "− Close Form" : "+ Add Event"}
        </button>
        {showForm && (
          <EventForm
            onAdd={onCreateEvent}
            onCancel={() => setShowForm(false)}
          />
        )}
      </section>

      <EventsPage
        events={events}
        loading={loading}
        error={error}
        onRemove={onRemove}
      />
    </>
  );
}
