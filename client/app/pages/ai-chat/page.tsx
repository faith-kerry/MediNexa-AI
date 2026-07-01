"use client";

import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Bot, Send, Mic, Languages } from "lucide-react";
import { sendMessage } from "@/services/aiService";

export default function AIChatPage() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      sender: "ai",
      text: "Hello! I'm MediNexa AI. How can I help you today?",
    },
  ]);

  const handleSend = async () => {
    if (!message.trim()) return;

    const userMessage = {
      sender: "user",
      text: message,
    };

    setMessages((prev) => [...prev, userMessage]);

    try {
      const response = await sendMessage(message);

      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: response.reply,
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: "Sorry, something went wrong.",
        },
      ]);
    }

    setMessage("");
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">

        <div>
          <h1 className="text-4xl font-bold">
            AI Health Assistant
          </h1>

          <p className="text-slate-500">
            Chat with MediNexa AI
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow border flex flex-col h-[650px]">

          <div className="p-5 border-b flex items-center gap-3">
            <Bot className="text-blue-600" size={30} />
            <h2 className="font-bold text-xl">
              MediNexa AI
            </h2>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-4">

            {messages.map((msg, index) => (
              <div
                key={index}
                className={`max-w-xl p-4 rounded-xl ${
                  msg.sender === "user"
                    ? "bg-blue-600 text-white ml-auto"
                    : "bg-slate-100"
                }`}
              >
                {msg.text}
              </div>
            ))}

          </div>

          <div className="border-t p-5 flex gap-3">

            <button className="p-3 bg-slate-100 rounded-xl">
              <Languages />
            </button>

            <button className="p-3 bg-slate-100 rounded-xl">
              <Mic />
            </button>

            <input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Describe your symptoms..."
              className="flex-1 border rounded-xl px-4"
            />

            <button
              onClick={handleSend}
              className="bg-blue-600 text-white px-6 rounded-xl"
            >
              <Send />
            </button>

          </div>

        </div>

      </div>
    </DashboardLayout>
  );
}