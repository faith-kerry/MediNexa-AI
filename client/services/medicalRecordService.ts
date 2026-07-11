const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

const getToken = () => localStorage.getItem("token");

export const getMedicalRecords = async () => {
  const response = await fetch(`${API_URL}/api/medical-records`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch medical records");
  }

  return response.json();
};

export const createMedicalRecord = async (record: {
  title: string;
  description: string;
  fileUrl?: string;
}) => {
  const response = await fetch(`${API_URL}/api/medical-records`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify(record),
  });

  if (!response.ok) {
    throw new Error("Failed to create medical record");
  }

  return response.json();
};

export const deleteMedicalRecord = async (id: string) => {
  const response = await fetch(
    `${API_URL}/api/medical-records/${id}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to delete medical record");
  }

  return response.json();
};