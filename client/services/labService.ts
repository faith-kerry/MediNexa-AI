const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

// ==============================
// Get all lab results
// ==============================

export const getLabResults = async () => {
  const response = await fetch(`${API_URL}/api/lab`);

  if (!response.ok) {
    throw new Error("Failed to fetch lab results.");
  }

  return response.json();
};

// ==============================
// Upload Lab Result
// ==============================

export const uploadLabResult = async (
  title: string,
  file: File
) => {
  const formData = new FormData();

  formData.append("title", title);
  formData.append("file", file);

  const response = await fetch(`${API_URL}/api/lab`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.message || "Upload failed.");
  }

  return response.json();
};

// ==============================
// Delete Lab Result
// ==============================

export const deleteLabResult = async (id: string) => {
  const response = await fetch(`${API_URL}/api/lab/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete lab result.");
  }

  return response.json();
};



// =====================================
// Explain Lab Result
// =====================================

export const explainLabResult = async (id: string) => {
  const response = await fetch(
    `${API_URL}/api/ai/explain-lab/${id}`,
    {
      method: "POST",
    }
  );

  if (!response.ok) {
    throw new Error("Unable to generate AI explanation.");
  }

  return response.json();
};