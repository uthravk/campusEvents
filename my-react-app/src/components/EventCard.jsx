import { useState } from "react";

function EventCard({ event, onRemove }) {
  const [isRegistered, setIsRegistered] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <article className="event-card">
      <div className="event-banner">
        {event.category}
      </div>

      <div className="event-details">
        <span className="category">
          {event.category}
        </span>

        <h2>{event.name}</h2>
        <p>{event.description}</p>

        <p><strong>Date:</strong> {event.date}</p>
        <p><strong>Venue:</strong> {event.venue}</p>

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
            onClick={() =>
              setIsFavorite(previous => !previous)
            }
          >
            {isFavorite ? "★ Favorited" : "☆ Add Favorite"}
          </button>

          <button
            className="btn-remove"
            onClick={() => onRemove(event.id)}
          >
            Remove Event
          </button>
        </div>
      </div>
    </article>
  );
}
export default EventCard