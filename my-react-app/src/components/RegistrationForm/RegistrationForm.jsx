import { useState } from "react";

export default function RegistrationForm({ eventName }) {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <p className="form-success" role="status">
        Registration submitted for {eventName}.
      </p>
    );
  }

  return (
    <form className="registration-form" onSubmit={handleSubmit}>
      <div className="form-field">
        <label htmlFor="registration-name">Name</label>
        <input id="registration-name" name="name" autoComplete="name" required />
      </div>
      <div className="form-field">
        <label htmlFor="registration-email">Email</label>
        <input
          id="registration-email"
          name="email"
          type="email"
          autoComplete="email"
          required
        />
      </div>
      <button className="form-submit-button" type="submit">
        Submit registration
      </button>
    </form>
  );
}
