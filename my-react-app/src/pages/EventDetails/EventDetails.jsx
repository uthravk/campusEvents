import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getEvent } from "../../services/eventService";
import { useFavorites } from "../../context/FavoritesContext";
import { getEventCategoryImage } from "../../assets/eventCategoryImages";
import "./EventDetails.css";
function HeartIcon({ filled }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="detail-heart">
      <path
        d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z"
        fill={filled ? "currentColor" : "none"}
      />
    </svg>
  );
}
export default function EventDetails() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const { isFavorite, toggleFavorite } = useFavorites();
  useEffect(() => {
    let active = true;
    getEvent(id)
      .then((e) => {
        if (active) setEvent(e);
      })
      .catch(() => {
        if (active) setError("This event could not be found.");
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [id]);
  if (loading) return <main className="page-shell">Loading event...</main>;
  if (error)
    return (
      <main className="page-shell">
        <h1>Event unavailable</h1>
        <p>{error}</p>
        <Link className="secondary-button" to="/events">
          Back to events
        </Link>
      </main>
    );
  return (
    <main className="page-shell">
      <Link to="/events" className="secondary-button detail-back">
        Back to Events
      </Link>
      <article className="detail-card surface">
        <div className="detail-art">
          <img
            className="detail-art-image"
            src={getEventCategoryImage(event.category)}
            alt=""
          />
          <span>{event.category}</span>
        </div>
        <div className="detail-content">
          <p className="eyebrow">CAMPUS EVENT</p>
          <h1>{event.name}</h1>
          <p>{event.description}</p>
          <dl>
            <div>
              <dt>Date</dt>
              <dd>{event.date}</dd>
            </div>
            <div>
              <dt>Venue</dt>
              <dd>{event.venue}</dd>
            </div>
            <div>
              <dt>Entry</dt>
              <dd>{event.fee ? `INR ${event.fee}` : "Free"}</dd>
            </div>
            <div>
              <dt>Registration</dt>
              <dd>{event.isOpen === false ? "Closed" : "Open"}</dd>
            </div>
          </dl>
          <div className="detail-actions">
            <Link className="primary-button" to={`/register?event=${event.id}`}>
              Register for this event
            </Link>
            <button
              className="secondary-button favorite-action"
              onClick={() => toggleFavorite(event)}
            >
              <HeartIcon filled={isFavorite(event.id)} />
              {isFavorite(event.id) ? "Saved to favorites" : "Add to favorites"}
            </button>
          </div>
        </div>
      </article>
    </main>
  );
}
