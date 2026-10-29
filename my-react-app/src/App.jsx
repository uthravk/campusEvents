import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import { FavoritesProvider } from "./context/FavoritesContext";
import EventDetailsPage from "./pages/EventDetails/EventDetailsPage";
import EventsPage from "./pages/Events/EventsPage";
import HomePage from "./pages/Home/HomePage";
import NotFoundPage from "./pages/NotFound/NotFoundPage";
import RegisterPage from "./pages/Register/RegisterPage";
import "./App.css";
import {
  getEvents,
  createEvent,
  deleteEvent
} from "./services/eventService";

export default function App() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  // Fetch events from JSON Server when the app mounts.
  useEffect(() => {
    async function loadEvents() {
      try {
        const data = await getEvents();
        setEvents(data);
        setLoadError("");
      } catch (error) {
        console.error("Failed to load events:", error);
        setLoadError(
          "Could not load events. Please check whether JSON Server is running."
        );
      } finally {
        setLoading(false);
      }
    }

    loadEvents();
  }, []);

  // Remove an event from the displayed list.
  async function handleRemove(eventId) {
    await deleteEvent(eventId);
    setEvents(previousEvents =>
      previousEvents.filter(event => String(event.id) !== String(eventId))
    );
  }

  // Save a new event to JSON Server using POST.
  async function handleCreateEvent(eventData) {
    const savedEvent = await createEvent(eventData);

    setEvents(previousEvents => [
      ...previousEvents,
      savedEvent
    ]);

  }

  return (
    <FavoritesProvider>
      <BrowserRouter>
        <Navbar />
        <main>
          <Routes>
            <Route
              path="/"
              element={
                <HomePage
                  events={events}
                  loading={loading}
                  error={loadError}
                  onCreateEvent={handleCreateEvent}
                  onRemove={handleRemove}
                />
              }
            />
            <Route
              path="/events"
              element={
                <EventsPage
                  events={events}
                  loading={loading}
                  error={loadError}
                  onRemove={handleRemove}
                />
              }
            />
            <Route
              path="/events/:eventId"
              element={<EventDetailsPage events={events} loading={loading} />}
            />
            <Route
              path="/register/:eventId"
              element={<RegisterPage events={events} loading={loading} />}
            />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </FavoritesProvider>
  );
}