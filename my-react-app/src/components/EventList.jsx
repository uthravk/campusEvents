import EventCard from "./EventCard";

function EventList({ events, onRemove }) {
  return (
    <section className="events-section" id="events">
      <div className="section-heading">
        <p className="eyebrow">DISCOVER YOUR CAMPUS</p>
        <h1>Upcoming Events</h1>
        <p>Find opportunities to learn, connect, and participate.</p>
      </div>

      {events.length === 0 ? (
        <p className="empty-message">
          No events available. Add a new event!
        </p>
      ) : (
        <div className="event-list">
          {events.map((event) => (
            <EventCard
              key={event.id}//or map with index
              event={event}
              onRemove={onRemove}
            />
          ))}
        </div>
      )}
    </section>
  );
}
export default EventList