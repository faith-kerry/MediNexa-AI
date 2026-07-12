const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:5000";

const getToken = () => {
  return localStorage.getItem("token");
};

// ==============================
// Book Appointment
// ==============================
export async function bookAppointment(data: {
  hospitalId: string;
  appointmentDate: string;
  reason: string;
}) {
  const response = await fetch(
    `${API_URL}/api/appointments`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify(data),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to book appointment");
  }

  return response.json();
}

// ==============================
// Get My Appointments
// ==============================
export async function getAppointments() {
  const response = await fetch(
    `${API_URL}/api/appointments`,
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to load appointments");
  }

  return response.json();
}

// ==============================
// Cancel Appointment
// ==============================
export async function cancelAppointment(id: string) {
  const response = await fetch(
    `${API_URL}/api/appointments/${id}/cancel`,
    {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to cancel appointment");
  }

  return response.json();
}