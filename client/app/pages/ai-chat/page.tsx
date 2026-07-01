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

export default function AIChatPage() {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const bottomRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState([
    {
      sender: "ai",
      text: "Hello! I'm MediNexa AI. I can help explain symptoms, medications, lab results and doctor's instructions.",
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

  const handleSend = async () => {
    if (!message.trim()) return;

    const userMessage = {
      sender: "user",
      text: message,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((prev) => [...prev, userMessage]);

    setLoading(true);

    try {
      const response = await sendMessage(message);

      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: response.reply,
          time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: "Sorry, I couldn't process your request.",
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

          <div className="flex-1 overflow-y-auto p-6 space-y-5">

            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${
                  msg.sender === "user"
                    ? "justify-end"
                    : "justify-start"
                }`}
              >
                <div
                  className={`max-w-xl rounded-2xl px-5 py-4 ${
                    msg.sender === "user"
                      ? "bg-blue-600 text-white"
                      : "bg-slate-100"
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

                  {msg.text}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex items-center gap-3">

                <Loader2
                  className="animate-spin text-blue-600"
                  size={20}
                />

                <p>MediNexa AI is typing...</p>

              </div>
            )}

            <div ref={bottomRef}></div>

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
                className="bg-slate-100 rounded-full px-4 py-2 hover:bg-slate-200"
              >
                Headache
              </button>

              <button
                onClick={() =>
                  setMessage("Explain my lab results.")
                }
                className="bg-slate-100 rounded-full px-4 py-2 hover:bg-slate-200"
              >
                Lab Results
              </button>

              <button
                onClick={() =>
                  setMessage("Translate doctor's instructions.")
                }
                className="bg-slate-100 rounded-full px-4 py-2 hover:bg-slate-200"
              >
                Translate
              </button>

              <button
                onClick={() =>
                  setMessage("How should I take my medication?")
                }
                className="bg-slate-100 rounded-full px-4 py-2 hover:bg-slate-200"
              >
                Medication
              </button>

            </div>

          </div>

          <div className="border-t p-5">

            <div className="flex gap-3">

              <button className="bg-slate-100 p-3 rounded-xl">
                <Languages />
              </button>

              <button className="bg-slate-100 p-3 rounded-xl">
                <Mic />
              </button>

              <input
                value={message}
                onChange={(e) =>
                  setMessage(e.target.value)
                }
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSend();
                  }
                }}
                placeholder="Type your message..."
                className="flex-1 border rounded-xl px-5"
              />

              <button
                onClick={handleSend}
                className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-6"
              >
                <Send />
              </button>

            </div>

          </div>

        </div>

      </div>
    </DashboardLayout>
  );
}