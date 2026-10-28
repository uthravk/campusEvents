import { useState } from "react";
import Navbar from "./components/Navbar";
import EventCard from "./components/EventCard";
import EventList from "./components/EventList";
import Footer from "./components/Footer";
import "./App.css";

const initialEvents = [
  {
    id: 1,
    name: "Campus Tech Fest 2026",
    category: "TECH",
    description:
      "Explore technology, discover new ideas, and connect with fellow students.",
    date: "November 5, 2026",
    venue: "Main Auditorium"
  },
  {
    id: 2,
    name: "Cultural Day",
    category: "CULTURE",
    description:
      "Celebrate music, dance, art, and cultures from across campus.",
    date: "November 10, 2026",
    venue: "Open Air Theatre"
  },
  {
    id: 3,
    name: "React Workshop",
    category: "WORKSHOP",
    description:
      "Learn React components, props, and interactive interfaces.",
    date: "November 15, 2026",
    venue: "Computer Lab 2"
  }
];

export default function App() {
  const [events, setEvents] = useState(initialEvents);

  function handleRemove(eventId) {
    setEvents(previousEvents =>
      previousEvents.filter(event => event.id !== eventId)
    );
  }

  function handleAddEvent() {
    const newEvent = {
      id: Date.now(),
      name: "New Campus Event",
      category: "GENERAL",
      description: "A new event has been added to campus.",
      date: "November 20, 2026",
      venue: "Seminar Hall"
    };

    setEvents(previousEvents => [
      ...previousEvents,
      newEvent
    ]);
  }

  return (
    <>
      <Navbar />

      <main id="home">
        <section className="hero">
          <p className="eyebrow">YOUR CAMPUS. YOUR COMMUNITY.</p>

          <h1>
            Make Your Campus
            <br />
            <span>Experience Count.</span>
          </h1>

          <p>
            Discover exciting events, meet new people,
            and make the most of your college life.
          </p>

          <a href="#events" className="hero-button">
            Explore Events
          </a>
        </section>

        <section className="events-section">
          <button
            className="add-button"
            onClick={handleAddEvent}
          >
            + Add Sample Event
          </button>
        </section>

        <EventList
          events={events}
          onRemove={handleRemove}
        />
      </main>

      <Footer />
    </>
  );
}