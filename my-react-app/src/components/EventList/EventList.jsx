import EventCard from "../EventCard/EventCard";
import "./EventList.css";
export default function EventList({
  events,
  onEdit,
  onDelete,
  getRegistrationCount,
}) {
  return (
    <div className="event-list">
      {events.map((event) => (
        <EventCard
          key={event.id}
          event={event}
          onEdit={onEdit}
          onDelete={onDelete}
          registrationCount={getRegistrationCount(event.id)}
        />
      ))}
    </div>
  );
}
