import { Link, useParams } from "react-router-dom";
import RegistrationForm from "../../components/RegistrationForm/RegistrationForm";

export default function RegisterPage({ events, loading }) {
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
    <section className="events-section">
      <p className="eyebrow">SAVE YOUR SPOT</p>
      <h1>Register for {event.name ?? event.title}</h1>
      <p>{event.date} | {event.venue}</p>
      <RegistrationForm eventName={event.name ?? event.title} />
    </section>
  );
}
