import { useEffect, useRef, useState } from "react";

const initialForm = {
  name: "",
  category: "TECH",
  description: "",
  date: "",
  venue: ""
};

export default function EventForm({ onAdd, onCancel }) {
  const [formData, setFormData] = useState(initialForm);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const nameRef = useRef(null);
  const categoryRef = useRef(null);
  const descriptionRef = useRef(null);
  const dateRef = useRef(null);
  const venueRef = useRef(null);

  // Focus the first field when the form opens.
  useEffect(() => {
    nameRef.current.focus();
  }, []);

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData(previous => ({
      ...previous,
      [name]: value
    }));
  }

  // Press Enter to move to the next field.
  function handleNext(event, nextRef) {
    if (event.key === "Enter") {
      event.preventDefault();
      nextRef.current?.focus();
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setMessage("");
    setError("");

    if (
      !formData.name.trim() ||
      !formData.description.trim() ||
      !formData.date ||
      !formData.venue.trim()
    ) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      setSaving(true);

      await onAdd({
        name: formData.name.trim(),
        category: formData.category,
        description: formData.description.trim(),
        date: formData.date,
        venue: formData.venue.trim()
      });

      setFormData(initialForm);
      setMessage("Event added successfully!");

      nameRef.current?.focus();
    } catch (error) {
      setError(error.message || "Could not save the event.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <section className="add-event-panel">
      <div className="form-heading">
        <div>
          <p className="form-eyebrow">CAMPUS CONNECT</p>
          <h2>Add a New Event</h2>
          <p>Share an exciting event with your campus.</p>
        </div>

        <button
          type="button"
          className="form-close"
          onClick={onCancel}
          aria-label="Close form"
        >
          ✕
        </button>
      </div>

      <form className="add-event-form" onSubmit={handleSubmit}>
        <div className="form-field">
          <label htmlFor="event-name">Event Title *</label>
          <input
            ref={nameRef}
            id="event-name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            onKeyDown={event =>
              handleNext(event, categoryRef)
            }
            placeholder="e.g. React Workshop"
            required
          />
        </div>

        <div className="form-field">
          <label htmlFor="event-category">Category *</label>
          <select
            ref={categoryRef}
            id="event-category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            onKeyDown={event =>
              handleNext(event, descriptionRef)
            }
            required
          >
            <option value="TECH">TECH</option>
            <option value="CULTURE">CULTURE</option>
            <option value="SPORTS">SPORTS</option>
            <option value="DESIGN">DESIGN</option>
            <option value="GENERAL">GENERAL</option>
          </select>
        </div>

        <div className="form-field full-width">
          <label htmlFor="event-description">Description *</label>
          <textarea
            ref={descriptionRef}
            id="event-description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Describe your event..."
            rows={3}
            required
          />
          <p className="field-hint">
            Press Enter for a new line in the description.
          </p>
        </div>

        <div className="form-field">
          <label htmlFor="event-date">Event Date *</label>
          <input
            ref={dateRef}
            id="event-date"
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            onKeyDown={event =>
              handleNext(event, venueRef)
            }
            required
          />
        </div>

        <div className="form-field">
          <label htmlFor="event-venue">Venue *</label>
          <input
            ref={venueRef}
            id="event-venue"
            name="venue"
            value={formData.venue}
            onChange={handleChange}
            onKeyDown={event => {
              if (event.key === "Enter") {
                event.preventDefault();
                event.currentTarget.form?.requestSubmit();
              }
            }}
            placeholder="e.g. Main Auditorium"
            required
          />
        </div>

        {message && (
          <p className="form-success" role="status">
            {message}
          </p>
        )}

        {error && (
          <p className="form-error" role="alert">
            {error}
          </p>
        )}

        <div className="form-actions full-width">
          <button
            type="button"
            className="form-cancel-button"
            onClick={onCancel}
            disabled={saving}
          >
            Cancel
          </button>

          <button
            type="submit"
            className="form-submit-button"
            disabled={saving}
          >
            {saving ? "Saving..." : "Save Event"}
          </button>
        </div>
      </form>
    </section>
  );
}