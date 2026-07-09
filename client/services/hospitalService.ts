const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export const getHospitals = async () => {
  const response = await fetch(`${API_URL}/api/hospitals`);

  if (!response.ok) {
    throw new Error("Failed to fetch hospitals");
  }

  return response.json();
};