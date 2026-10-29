import { useEffect, useState } from "react";
import EventCard from "../../components/EventCard/EventCard";
import "./EventsPage.css";

export default function EventsPage({
  events = [],
  onRemove,
  loading = false,
  error = ""
}) {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sortBy, setSortBy] = useState("name");

  // Debounce: wait 300ms after typing stops.
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search.trim());
    }, 300);

    // Clear the old timer when search changes.
    return () => clearTimeout(timer);
  }, [search]);

  // Build dropdown categories from the API data.
  const categories = [
    "All",
    ...new Set(
      events
        .map(event => event.category)
        .filter(Boolean)
    )
  ];

  // Search and category filtering.
  const filteredEvents = events.filter(event => {
    const text = debouncedSearch.toLowerCase();

    // Support either "title" or "name" in your data.
    const title = String(event.name ?? event.title ?? "").toLowerCase();

    const venue = String(event.venue ?? "").toLowerCase();

    const matchesText =
      title.includes(text) ||
      venue.includes(text);

    const matchesCategory =
      category === "All" ||
      event.category === category;

    return matchesText && matchesCategory;
  });

  // Sort a copy; do not mutate the original events array.
  const displayedEvents = [...filteredEvents].sort(
    (a, b) => {
      const first = String(a.name ?? a.title ?? "");
      const second = String(b.name ?? b.title ?? "");

      if (sortBy === "name") {
        return first.localeCompare(second);
      }

      return second.localeCompare(first);
    }
  );

  function resetFilters() {
    setSearch("");
    setDebouncedSearch("");
    setCategory("All");
    setSortBy("name");
  }

  return (
    <section id="events" className="events-section">
      <div className="section-heading">
        <p className="eyebrow">FIND YOUR NEXT EXPERIENCE</p>
        <h1>Upcoming Events</h1>
        <p>Discover what is happening around campus.</p>
      </div>

      {error && (
        <div>
          <p className="form-error" role="alert">{error}</p>
          <button
            type="button"
            className="add-button"
            onClick={() => window.location.reload()}
          >
            Retry
          </button>
        </div>
      )}

      {loading ? (
        <p role="status">Loading events...</p>
      ) : (
        <>
          <div className="event-controls">
            <input
              type="search"
              value={search}
              onChange={event => setSearch(event.target.value)}
              placeholder="Search by title or venue..."
              aria-label="Search events by title or venue"
            />

            <select
              value={category}
              onChange={event => setCategory(event.target.value)}
              aria-label="Filter by category"
            >
              {categories.map(item => (
                <option key={item} value={item}>
                  {item === "All" ? "All Categories" : item}
                </option>
              ))}
            </select>

            <select
              value={sortBy}
              onChange={event => setSortBy(event.target.value)}
              aria-label="Sort events"
            >
              <option value="name">Name: A to Z</option>
              <option value="reverse">Name: Z to A</option>
            </select>

            <button type="button" onClick={resetFilters}>
              Reset
            </button>
          </div>

          <p>
            Showing {displayedEvents.length} of {events.length} events
          </p>

          {displayedEvents.length === 0 ? (
            <p>No matching events found.</p>
          ) : (
            <div className="event-grid">
              {displayedEvents.map(event => (
                <EventCard
                  key={event.id}
                  event={event}
                  onRemove={onRemove}
                />
              ))}
            </div>
          )}
        </>
      )}
    </section>
  );
}