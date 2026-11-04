import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { getEvents } from "../../services/eventService";
import { createStudent } from "../../services/studentService";
import "./Register.css";
const initial = {
  studentName: "",
  email: "",
  department: "",
  yearOfStudy: "",
  password: "",
  attendanceType: "In person",
  eventId: "",
  accessibilitySupport: false,
  message: "",
};
export default function Register() {
  const [params] = useSearchParams(),
    [events, setEvents] = useState([]),
    [form, setForm] = useState({
      ...initial,
      eventId: params.get("event") || "",
    }),
    [error, setError] = useState(""),
    [success, setSuccess] = useState(false),
    [successDetails, setSuccessDetails] = useState(null),
    [saving, setSaving] = useState(false);
  useEffect(() => {
    let active = true;
    getEvents()
      .then((data) => {
        if (active) setEvents(data);
      })
      .catch(() => {
        if (active)
          setError("Events are unavailable right now. Please try again later.");
      });
    return () => {
      active = false;
    };
  }, []);
  function change(e) {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({ ...f, [name]: type === "checkbox" ? checked : value }));
  }
  async function submit(e) {
    e.preventDefault();
    setError("");
    setSuccess(false);
    setSuccessDetails(null);
    if (form.password.length < 8) {
      setError("Use a password with at least 8 characters.");
      return;
    }
    setSaving(true);
    try {
      await createStudent({
        ...form,
        yearOfStudy: Number(form.yearOfStudy),
        eventId: String(form.eventId),
        registeredAt: new Date().toISOString(),
      });
      const selectedEvent = events.find(
        (event) => String(event.id) === String(form.eventId),
      );
      setSuccessDetails({
        studentName: form.studentName,
        email: form.email,
        department: form.department,
        yearOfStudy: form.yearOfStudy,
        eventName: selectedEvent?.name || "Selected event",
        attendanceType: form.attendanceType,
        accessibilitySupport: form.accessibilitySupport,
        message: form.message,
      });
      setSuccess(true);
      setForm(initial);
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }
  return (
    <main className="page-shell register-page">
      <div className="register-heading">
        <p className="eyebrow">JOIN THE EXPERIENCE</p>
        <h1>Student Registration</h1>
        <p className="register-lead">
          Save your place and get ready for something great.
        </p>
      </div>
      <form className="register-form surface" onSubmit={submit}>
        <label>
          Student name
          <input
            required
            name="studentName"
            autoComplete="name"
            value={form.studentName}
            onChange={change}
          />
        </label>
        <label>
          Email address
          <input
            required
            type="email"
            name="email"
            autoComplete="email"
            value={form.email}
            onChange={change}
          />
        </label>
        <label>
          Department
          <input
            required
            name="department"
            value={form.department}
            onChange={change}
          />
        </label>
        <label>
          Year of study
          <select
            required
            name="yearOfStudy"
            value={form.yearOfStudy}
            onChange={change}
          >
            <option value="">Select year</option>
            {[1, 2, 3, 4, 5].map((y) => (
              <option key={y} value={y}>
                Year {y}
              </option>
            ))}
          </select>
        </label>
        <label>
          Password
          <input
            required
            minLength="8"
            type="password"
            name="password"
            autoComplete="new-password"
            value={form.password}
            onChange={change}
          />
        </label>
        <label>
          Attendance preference
          <select
            name="attendanceType"
            value={form.attendanceType}
            onChange={change}
          >
            <option>In person</option>
            <option>Online</option>
            <option>Hybrid</option>
          </select>
        </label>
        <label className="register-wide">
          Choose an event
          <select
            required
            name="eventId"
            value={form.eventId}
            onChange={change}
          >
            <option value="">Select an event</option>
            {events.map((ev) => (
              <option key={ev.id} value={ev.id}>
                {ev.name} - {ev.date}
              </option>
            ))}
          </select>
        </label>
        <label className="check-label register-wide">
          <input
            type="checkbox"
            name="accessibilitySupport"
            checked={form.accessibilitySupport}
            onChange={change}
          />{" "}
          I would like accessibility support
        </label>
        <label className="register-wide">
          Message (optional)
          <textarea
            name="message"
            rows="3"
            value={form.message}
            onChange={change}
            placeholder="Anything you would like the organizers to know?"
          />
        </label>
        {error && (
          <p role="alert" className="register-error register-wide">
            {error}
          </p>
        )}
        {success && (
          <div role="status" className="register-success register-wide">
            <strong>Registration submitted successfully</strong>
            <p>
              {successDetails?.studentName} is registered for{" "}
              {successDetails?.eventName}.
            </p>
            <dl className="registration-summary">
              <div>
                <dt>Email</dt>
                <dd>{successDetails?.email}</dd>
              </div>
              <div>
                <dt>Department</dt>
                <dd>{successDetails?.department}</dd>
              </div>
              <div>
                <dt>Year of study</dt>
                <dd>{successDetails?.yearOfStudy}</dd>
              </div>
              <div>
                <dt>Attendance</dt>
                <dd>{successDetails?.attendanceType}</dd>
              </div>
              <div>
                <dt>Accessibility support</dt>
                <dd>
                  {successDetails?.accessibilitySupport
                    ? "Requested"
                    : "Not requested"}
                </dd>
              </div>
              {successDetails?.message && (
                <div className="registration-message">
                  <dt>Message</dt>
                  <dd>{successDetails.message}</dd>
                </div>
              )}
            </dl>
            <Link to="/events">Explore more events</Link>
          </div>
        )}
        <div className="register-actions register-wide">
          <button
            className="primary-button"
            disabled={saving || !events.length}
          >
            {saving ? "Submitting..." : "Submit Registration"}
          </button>
          <button
            type="reset"
            className="secondary-button"
            onClick={() => {
              setForm(initial);
              setError("");
              setSuccess(false);
              setSuccessDetails(null);
            }}
          >
            Reset Form
          </button>
        </div>
      </form>
    </main>
  );
}
