const API_URL = "http://localhost:5000/api/ai/explain-medication";

export async function explainMedication(
  medicine: string,
  dosage: string,
  duration: string
) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      medicine,
      dosage,
      duration,
    }),
  });

  if (!response.ok) {
    throw new Error("Unable to explain medication.");
  }

  return response.json();
}