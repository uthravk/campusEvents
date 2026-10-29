import { Link, useParams } from "react-router-dom";
import CountdownTimer from "../../components/CountdownTimer/CountdownTimer";

export default function EventDetailsPage({ events, loading }) {
  const { eventId } = useParams();
  const event = events.find(item => String(item.id) === eventId);

  if (loading) {
    return <p className="events-section" role="status">Loading event...</p>;
  }

  if (!event) {
    return (
      <section className="events-section">
        <h1>Event not found</h1>
        <Link to="/events">Browse all events</Link>
      </section>
    );
  }

  return (
    <section className="events-section event-detail-page">
      <p className="eyebrow">{event.category}</p>
      <h1>{event.name ?? event.title}</h1>
      <p>{event.description}</p>
      <p><strong>Date:</strong> {event.date}</p>
      <p><strong>Venue:</strong> {event.venue}</p>
      {event.date && <CountdownTimer targetDate={event.date} />}
      <div className="event-actions">
        <Link className="btn-primary" to={`/register/${event.id}`}>
          Register for this event
        </Link>
        <Link className="btn-primary" to="/events">
          Back to events
        </Link>
      </div>
    </section>
  );
}