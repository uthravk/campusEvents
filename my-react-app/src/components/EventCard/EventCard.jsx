import { useState } from "react";
import { Link } from "react-router-dom";
import { useFavorites } from "../../context/FavoritesContext";

function EventCard({ event, onRemove }) {
  const [isRegistered, setIsRegistered] = useState(true);
  const [actionError, setActionError] = useState("");
  const { favorites, toggleFavorite } = useFavorites();
  const isFavorite = favorites.has(String(event.id));

  async function handleRemove() {
    setActionError("");
    try {
      await onRemove(event.id);
    } catch (error) {
      setActionError(error.message || "Could not remove the event.");
    }
  }

  return (
    <article className="event-card">
      <div className="event-banner">
        {event.category}
      </div>

      <div className="event-details">
        <span className="category">
          {event.category}
        </span>

        <h2>{event.name ?? event.title}</h2>
        <p>{event.description}</p>

        <p><strong>Date:</strong> {event.date}</p>
        <p><strong>Venue:</strong> {event.venue}</p>
        {actionError && <p className="form-error" role="alert">{actionError}</p>}

        <p>
          <strong>Registration:</strong>{" "}
          {isRegistered ? "1" : "0"}
        </p>

        <div className="event-actions">
          <button
            className="btn-primary"
            onClick={() =>
              setIsRegistered(previous => !previous)
            }
          >
            {isRegistered
              ? "Cancel Registration"
              : "Register"}
          </button>

          <button
            className="btn-favorite"
            onClick={() => toggleFavorite(event.id)}
          >
            {isFavorite ? "★ Favorited" : "☆ Add Favorite"}
          </button>

          <Link className="btn-primary" to={`/events/${event.id}`}>
            View Details
          </Link>
          <Link className="btn-primary" to={`/register/${event.id}`}>
            Register
          </Link>
          <button
            className="btn-remove"
            onClick={handleRemove}
          >
            Remove Event
          </button>
        </div>
      </div>
    </article>
  );
}
export default EventCard