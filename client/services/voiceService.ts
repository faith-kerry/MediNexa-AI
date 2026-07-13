const API_URL = "http://localhost:5000/api/voice/speak";

export async function speak(text: string) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text }),
  });

  if (!response.ok) {
    throw new Error("Failed to generate speech");
  }

  const blob = await response.blob();

  const audioUrl = URL.createObjectURL(blob);

  const audio = new Audio(audioUrl);

  await audio.play();
}