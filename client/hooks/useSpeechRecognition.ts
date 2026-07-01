"use client";

import { useState } from "react";

declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

export default function useSpeechRecognition() {
  const [listening, setListening] = useState(false);

  const startListening = (callback: (text: string) => void) => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Speech Recognition is not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();

    recognition.lang = "en-US";
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.start();

    setListening(true);

    recognition.onresult = (event: any) => {
      callback(event.results[0][0].transcript);
    };

    recognition.onend = () => {
      setListening(false);
    };
  };

  return {
    listening,
    startListening,
  };
}