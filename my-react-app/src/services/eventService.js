const API_URL = "http://localhost:3000/events";

async function readResponse(response) {
  if (!response.ok) {
    throw new Error(`Event request failed (${response.status}).`);
  }

  return response.status === 204 ? null : response.json();
}

function normalizeEvent(event) {
  return { ...event, name: event.name ?? event.title ?? "" };
}

export async function getEvents() {
  const response = await fetch(API_URL);
  const events = await readResponse(response);
  return events.map(normalizeEvent);
}

export async function createEvent(eventData) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...eventData, title: eventData.name })
  });

  return normalizeEvent(await readResponse(response));
}

export async function deleteEvent(eventId) {
  const response = await fetch(`${API_URL}/${encodeURIComponent(eventId)}`, {
    method: "DELETE"
  });

  await readResponse(response);
}
 