const API_URL = "http://localhost:5000/api/appointments";

export async function bookAppointment(data: {
  patientName: string;
  doctor: string;
  specialty: string;
  date: string;
  time: string;
  reason: string;
}) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to book appointment");
  }

  return response.json();
}