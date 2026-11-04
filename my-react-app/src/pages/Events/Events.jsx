import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  createEvent,
  deleteEvent,
  getEvents,
  updateEvent,
} from "../../services/eventService";
import { getStudents } from "../../services/studentService";
import { useFavorites } from "../../context/FavoritesContext";
import useDebounce from "../../hooks/useDebounce";
import EventList from "../../components/EventList/EventList";
import Popup from "../../components/common/Popup/Popup";
import "./Events.css";

const empty = {
  name: "",
  category: "TECH",
  date: "",
  venue: "",
  description: "",
  fee: "0",
  isOpen: true,
};

export default function Events() {
  const [events, setEvents] = useState([]);
  const [students, setStudents] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") || "");
  const [category, setCategory] = useState(
    searchParams.get("category") || "All",
  );
  const showFavorites = searchParams.get("favorites") === "true";
  const [form, setForm] = useState(empty);
  const [editing, setEditing] = useState(null);
  const [confirm, setConfirm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);
  const { removeFavorite, isFavorite } = useFavorites();
  const debounced = useDebounce(query);

  useEffect(() => {
    const params = {};
    if (debounced) params.q = debounced;
    if (category !== "All") params.category = category;
    if (showFavorites) params.favorites = "true";
    setSearchParams(params, { replace: true });
  }, [debounced, category, showFavorites, setSearchParams]);

  async function load() {
    setLoading(true);
    try {
      setEvents(await getEvents());
      setError("");
    } catch {
      setError("Could not load events. Make sure JSON Server is running.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    let active = true;
    load();
    getStudents()
      .then((data) => {
        if (active) setStudents(data);
      })
      .catch(() => {
        if (active) setStudents([]);
      });
    return () => {
      active = false;
    };
  }, []);

  const categories = useMemo(
    () => [
      "All",
      ...new Set(events.map((event) => event.category).filter(Boolean)),
    ],
    [events],
  );
  const filtered = events.filter(
    (event) =>
      (event.name + " " + event.venue)
        .toLowerCase()
        .includes(debounced.toLowerCase()) &&
      (category === "All" || event.category === category) &&
      (!showFavorites || isFavorite(event.id)),
  );

  function getRegistrationCount(eventId) {
    return students.filter(
      (student) => String(student.eventId) === String(eventId),
    ).length;
  }

  function edit(event) {
    setMessage("");
    setError("");
    setEditing(String(event.id));
    setForm({
      ...empty,
      ...event,
      fee: String(event.fee ?? 0),
      isOpen: event.isOpen !== false,
    });
    document
      .querySelector(".manage-panel")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function cancelEdit() {
    setEditing(null);
    setForm(empty);
    setError("");
    setMessage("");
  }

  async function submit(event) {
    event.preventDefault();
    if (saving) return;
    setSaving(true);
    setError("");
    setMessage("");
    try {
      const data = {
        ...form,
        name: form.name.trim(),
        venue: form.venue.trim(),
        description: form.description.trim(),
        fee: Number(form.fee) || 0,
        isOpen: Boolean(form.isOpen),
      };
      if (editing !== null) {
        const updated = await updateEvent(editing, data);
        setEvents((current) =>
          current.map((item) =>
            String(item.id) === String(updated.id) ? updated : item,
          ),
        );
        setMessage("Event changes saved successfully.");
      } else {
        const created = await createEvent(data);
        setEvents((current) => [...current, created]);
        setMessage("Event created successfully.");
      }
      setEditing(null);
      setForm(empty);
    } catch (requestError) {
      setError(
        requestError.message || "Could not save the event. Please try again.",
      );
    } finally {
      setSaving(false);
    }
  }

  async function remove() {
    if (!confirm) return;
    try {
      await deleteEvent(confirm.id);
      setEvents((current) =>
        current.filter((event) => String(event.id) !== String(confirm.id)),
      );
      removeFavorite(confirm.id);
      if (String(editing) === String(confirm.id)) cancelEdit();
      setMessage("Event deleted successfully.");
      setConfirm(null);
    } catch (requestError) {
      setError(requestError.message || "Could not delete the event.");
      setConfirm(null);
    }
  }

  function resetFilters() {
    setQuery("");
    setCategory("All");
    setSearchParams({}, { replace: true });
  }

  return (
    <main className="page-shell">
      <header className="events-heading">
        <div>
          <p className="eyebrow">CAMPUS CALENDAR</p>
          <h1>{showFavorites ? "Favorite Events" : "Upcoming Events"}</h1>
          <p>
            {showFavorites
              ? "Your saved campus experiences, all in one place."
              : "Find an event to learn, connect, and make the most of campus."}
          </p>
        </div>
        <span className="event-total">
          {showFavorites ? filtered.length : events.length} events
        </span>
      </header>
      <section className="manage-panel surface">
        <h2>{editing !== null ? "Edit Event" : "Add New Event"}</h2>
        <form className="event-form" onSubmit={submit}>
          <label>
            Event Name
            <input
              required
              value={form.name}
              onChange={(event) =>
                setForm({ ...form, name: event.target.value })
              }
            />
          </label>
          <label>
            Category
            <select
              value={form.category}
              onChange={(event) =>
                setForm({ ...form, category: event.target.value })
              }
            >
              {[
                "TECH",
                "CULTURE",
                "SPORTS",
                "DESIGN",
                "WORKSHOP",
                "GENERAL",
              ].map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </label>
          <label>
            Date
            <input
              required
              type="date"
              value={form.date}
              onChange={(event) =>
                setForm({ ...form, date: event.target.value })
              }
            />
          </label>
          <label>
            Venue
            <input
              required
              value={form.venue}
              onChange={(event) =>
                setForm({ ...form, venue: event.target.value })
              }
            />
          </label>
          <label>
            Fee (INR)
            <input
              min="0"
              type="number"
              value={form.fee}
              onChange={(event) =>
                setForm({ ...form, fee: event.target.value })
              }
            />
          </label>
          <label className="status-field">
            Registration status
            <select
              value={form.isOpen ? "open" : "closed"}
              onChange={(event) =>
                setForm({ ...form, isOpen: event.target.value === "open" })
              }
            >
              <option value="open">Open</option>
              <option value="closed">Closed</option>
            </select>
          </label>
          <label className="form-wide">
            Description
            <textarea
              required
              rows="3"
              value={form.description}
              onChange={(event) =>
                setForm({ ...form, description: event.target.value })
              }
            />
          </label>
          {error && (
            <p className="error-message form-wide" role="alert">
              {error}
            </p>
          )}
          {message && (
            <p className="success-message form-wide" role="status">
              {message}
            </p>
          )}
          <div className="form-wide form-actions">
            <button className="primary-button" disabled={saving}>
              {saving
                ? "Saving..."
                : editing !== null
                  ? "Save Changes"
                  : "Add Event"}
            </button>
            {editing !== null && (
              <button
                type="button"
                className="secondary-button"
                onClick={cancelEdit}
                disabled={saving}
              >
                Cancel Edit
              </button>
            )}
          </div>
        </form>
      </section>
      <section className="events-results">
        <div className="filter-row">
          <input
            aria-label="Search events"
            type="search"
            placeholder="Search by event name or venue"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
          <select
            aria-label="Filter by category"
            value={category}
            onChange={(event) => setCategory(event.target.value)}
          >
            {categories.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
          <button className="secondary-button" onClick={resetFilters}>
            Reset Filters
          </button>
        </div>
        <h2>{showFavorites ? "Saved Events" : "Upcoming Events"}</h2>
        {loading ? (
          <p>Loading events...</p>
        ) : error && !events.length ? (
          <p className="error-message" role="alert">
            {error} <button onClick={load}>Retry</button>
          </p>
        ) : filtered.length ? (
          <EventList
            events={filtered}
            onEdit={edit}
            onDelete={setConfirm}
            getRegistrationCount={getRegistrationCount}
          />
        ) : (
          <p className="empty-state surface">
            {showFavorites
              ? "You have not saved any events yet."
              : "No events match these filters. Try another search or add an event above."}
          </p>
        )}
        {error && events.length > 0 && (
          <p className="error-message" role="alert">
            {error}
          </p>
        )}
      </section>
      {confirm && (
        <Popup
          title="Delete this event?"
          message={`${confirm.name} will be permanently removed.`}
          onCancel={() => setConfirm(null)}
          onConfirm={remove}
        />
      )}
    </main>
  );
}
