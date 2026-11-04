const API_URL = "http://localhost:3000";
export async function getStudents() {
  const r = await fetch(`${API_URL}/students`);
  if (!r.ok) throw new Error("Could not load students");
  return r.json();
}
export async function createStudent(data) {
  const r = await fetch(`${API_URL}/students`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!r.ok)
    throw new Error("Registration could not be saved. Please try again.");
  return r.json();
}
