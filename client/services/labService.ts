const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

const getToken = () => {
  if (typeof window === "undefined") return null;

  const token = localStorage.getItem("token");

  console.log("Lab Token:", token);

  return token;
};

// Get all lab results
export const getLabResults = async () => {
  const token = getToken();

  console.log("Sending Authorization:", `Bearer ${token}`);

  const response = await fetch(`${API_URL}/api/lab`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  console.log("Server Response:", data);

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch lab results.");
  }

  return data;
};

// Upload lab result
export const uploadLabResult = async (data: {
  title: string;
  fileUrl: string;
}) => {
  const token = getToken();

  const response = await fetch(`${API_URL}/api/lab`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to upload lab result.");
  }

  return response.json();
};

// Delete lab result
export const deleteLabResult = async (id: string) => {
  const token = getToken();

  const response = await fetch(`${API_URL}/api/lab/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to delete lab result.");
  }

  return response.json();
};