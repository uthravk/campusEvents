import { Link } from "react-router-dom";
import { useFavorites } from "../../context/FavoritesContext";
import { getEventCategoryImage } from "../../assets/eventCategoryImages";
import "./EventCard.css";

function HeartIcon({ filled }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path
        d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z"
        fill={filled ? "currentColor" : "none"}
      />
    </svg>
  );
}

export default function EventCard({
  event,
  onEdit,
  onDelete,
  registrationCount = 0,
}) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorite = isFavorite(event.id);

  return (
    <article className="event-card surface">
      <div className="event-category-strip" aria-hidden="true" />
      <div className="event-card-body">
        <div className="event-card-cover">
          <img
            src={getEventCategoryImage(event.category)}
            alt=""
            loading="lazy"
          />
          <div className="event-card-heading">
            <span className="category-pill">{event.category}</span>
            <button
              className={`favorite-toggle${favorite ? " is-favorite" : ""}`}
              aria-label={
                favorite ? "Remove from favorites" : "Add to favorites"
              }
              aria-pressed={favorite}
              onClick={() => toggleFavorite(event)}
            >
              <HeartIcon filled={favorite} />
            </button>
          </div>
        </div>
        <h2>{event.name}</h2>
        <p className="event-description">{event.description}</p>
        <div className="event-meta">
          <span>
            <strong>Date</strong>
            {event.date
              ? new Date(`${event.date}T00:00:00`).toLocaleDateString(
                  undefined,
                  { month: "short", day: "numeric", year: "numeric" },
                )
              : "Date TBA"}
          </span>
          <span>
            <strong>Venue</strong>
            {event.venue}
          </span>
        </div>
        <div className="event-card-summary">
          <span>
            {registrationCount}{" "}
            {registrationCount === 1 ? "registration" : "registrations"}
          </span>
          <span>{favorite ? "Saved to favorites" : "Not favorited"}</span>
          <span>{event.fee ? `INR ${event.fee}` : "Free"}</span>
        </div>
        <div className="event-card-actions">
          <Link className="primary-button" to={`/events/${event.id}`}>
            Event Details
          </Link>
          <Link className="secondary-button" to={`/register?event=${event.id}`}>
            Register
          </Link>
          <button className="card-text-button" onClick={() => onEdit(event)}>
            Edit Event
          </button>
          <button
            className="card-text-button delete-action"
            onClick={() => onDelete(event)}
          >
            Delete Event
          </button>
        </div>
      </div>
    </article>
  );
}
