const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:5000";

export async function bookAppointment(data: {
  hospitalId: string;
  appointmentDate: string;
  reason: string;
}) {
  const token = localStorage.getItem("token");

  const response = await fetch(
    `${API_URL}/api/appointments`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to book appointment");
  }

  return response.json();
}