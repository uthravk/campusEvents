const API_URL = "http://localhost:3000";
async function request(path, options) {
  const r = await fetch(`${API_URL}${path}`, options);
  if (!r.ok) throw new Error(`Request failed (${r.status})`);
  return r.status === 204 ? null : r.json();
}
export const getEvents = () => request("/events");
export const getEvent = (id) => request(`/events/${id}`);
export const createEvent = (data) =>
  request("/events", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
export const updateEvent = (id, data) =>
  request(`/events/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
export const deleteEvent = (id) =>
  request(`/events/${id}`, { method: "DELETE" });
