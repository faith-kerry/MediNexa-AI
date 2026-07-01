"use client";

import { useEffect, useRef, useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import {
  Bot,
  Send,
  Mic,
  Languages,
  User,
  Loader2,
} from "lucide-react";
import { sendMessage } from "@/services/aiService";
import useSpeechRecognition from "@/hooks/useSpeechRecognition";

interface ChatMessage {
  sender: "user" | "ai";
  text: string;
  time: string;
}

export default function AIChatPage() {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const { listening, startListening } = useSpeechRecognition();

  const bottomRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      sender: "ai",
      text: "Hello! I'm MediNexa AI. I can help explain symptoms, medications, lab results and doctor's instructions. How can I help you today?",
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    },
  ]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  const handleSend = async (customMessage?: string) => {
    const currentMessage = customMessage || message;

    if (!currentMessage.trim()) return;

    const userMessage: ChatMessage = {
      sender: "user",
      text: currentMessage,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((prev) => [...prev, userMessage]);

    setLoading(true);

    try {
      const response = await sendMessage(currentMessage);

      const aiMessage: ChatMessage = {
        sender: "ai",
        text: response.reply,
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: "Sorry, something went wrong. Please try again.",
          time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ]);
    }

    setLoading(false);
    setMessage("");
  };

  const handleVoiceInput = () => {
    startListening(async (text) => {
      await handleSend(text);
    });
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">

        <div>
          <h1 className="text-4xl font-bold">
            AI Health Assistant
          </h1>

          <p className="text-slate-500 mt-2">
            Ask questions about symptoms, medication, lab results and more.
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-lg border h-[700px] flex flex-col">

          <div className="border-b p-5 flex items-center gap-3">

            <div className="bg-blue-600 rounded-xl p-3 text-white">
              <Bot size={28} />
            </div>

            <div>
              <h2 className="font-bold text-lg">
                MediNexa AI
              </h2>

              <p className="text-green-600 text-sm">
                Online
              </p>
            </div>

          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-5">            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${
                  msg.sender === "user"
                    ? "justify-end"
                    : "justify-start"
                }`}
              >
                <div
                  className={`max-w-xl rounded-2xl px-5 py-4 shadow ${
                    msg.sender === "user"
                      ? "bg-blue-600 text-white"
                      : "bg-slate-100 text-slate-800"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-2">

                    {msg.sender === "ai" ? (
                      <Bot size={18} />
                    ) : (
                      <User size={18} />
                    )}

                    <span className="text-xs opacity-70">
                      {msg.time}
                    </span>

                  </div>

                  <p className="leading-7 whitespace-pre-wrap">
                    {msg.text}
                  </p>

                </div>
              </div>
            ))}

            {loading && (
              <div className="flex items-center gap-3">

                <Loader2
                  className="animate-spin text-blue-600"
                  size={20}
                />

                <span className="text-slate-500">
                  MediNexa AI is typing...
                </span>

              </div>
            )}

            <div ref={bottomRef} />

          </div>

          <div className="px-6 pb-4">

            <h3 className="font-semibold mb-3">
              Suggested Questions
            </h3>

            <div className="flex flex-wrap gap-3">

              <button
                onClick={() =>
                  setMessage("I have had a headache for three days.")
                }
                className="rounded-full bg-slate-100 hover:bg-slate-200 px-4 py-2 transition"
              >
                Headache
              </button>

              <button
                onClick={() =>
                  setMessage("Explain my lab results in simple language.")
                }
                className="rounded-full bg-slate-100 hover:bg-slate-200 px-4 py-2 transition"
              >
                Lab Results
              </button>

              <button
                onClick={() =>
                  setMessage("Translate my doctor's instructions into Swahili.")
                }
                className="rounded-full bg-slate-100 hover:bg-slate-200 px-4 py-2 transition"
              >
                Translate
              </button>

              <button
                onClick={() =>
                  setMessage("Remind me how to take my medication.")
                }
                className="rounded-full bg-slate-100 hover:bg-slate-200 px-4 py-2 transition"
              >
                Medication
              </button>

            </div>

          </div>

          <div className="border-t p-5">

            <div className="flex gap-3">              <button className="bg-slate-100 hover:bg-slate-200 p-3 rounded-xl transition">
                <Languages size={20} />
              </button>

              <button
                onClick={handleVoiceInput}
                className={`p-3 rounded-xl transition ${
                  listening
                    ? "bg-red-600 text-white animate-pulse"
                    : "bg-slate-100 hover:bg-slate-200"
                }`}
              >
                <Mic size={20} />
              </button>

              <input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSend();
                  }
                }}
                placeholder="Describe your symptoms or ask a health question..."
                className="flex-1 border border-slate-300 rounded-xl px-5 outline-none focus:ring-2 focus:ring-blue-600"
              />

              <button
                onClick={() => handleSend()}
                disabled={loading}
                className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-xl px-6 flex items-center justify-center transition"
              >
                <Send size={20} />
              </button>

            </div>

          </div>

        </div>

      </div>
    </DashboardLayout>
  );
}