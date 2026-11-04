import { useParams } from "react-router-dom";
import { getbyid } from "../services/eventService";
import { useState } from "react";
export default function EventDetails() {
  const id = useParams();
  const [events, setEvents] = useState([]);
  useEffect(() => {
    async function loadEvents() {
      const data = await getbyid(id);
      setEvents(data);
    }

    loadEvents();
  }, []);
  return (
    <>
      <h1>Details for event {id}</h1>;
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </>
  );
}
