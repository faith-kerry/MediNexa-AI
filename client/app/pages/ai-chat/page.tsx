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

  const [messages, setMessages] = useState<ChatMessage[]>([]);

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

        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">

          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-blue-600">
            Artificial Intelligence
          </p>

          <h1 className="text-4xl font-bold tracking-tight text-slate-900">
            AI Health Assistant
          </h1>

          <p className="mt-3 max-w-3xl leading-7 text-slate-600">
            Chat with MediNexa AI to understand symptoms, medications,
            laboratory reports and medical instructions in simple language.
          </p>

        </div>

        <div className="flex h-[720px] flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">

          <div className="flex items-center gap-4 border-b border-slate-200 bg-slate-50 px-6 py-5">

            <div className="rounded-2xl bg-blue-600 p-3 text-white shadow-sm">
              <Bot size={28} />
            </div>

            <div>

              <h2 className="text-lg font-bold text-slate-900">
                MediNexa AI
              </h2>

              <p className="text-sm font-medium text-emerald-600">
                ● Online
              </p>

            </div>

          </div>

          <div className="flex-1 overflow-y-auto p-6">

            {messages.length === 0 && !loading && (
              <div className="flex h-full items-center justify-center">

                <div className="max-w-2xl rounded-3xl border border-blue-100 bg-blue-50 p-10 text-center shadow-sm">

                  <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-blue-600 text-white">
                    <Bot size={40} />
                  </div>

                  <h2 className="text-3xl font-bold text-slate-900">
                    Welcome to MediNexa AI
                  </h2>

                  <p className="mt-4 leading-7 text-slate-600">
                    Your intelligent healthcare assistant. Ask about symptoms,
                    medications, lab results, medical instructions, or anything
                    related to your health.
                  </p>

                  <p className="mt-6 text-sm text-slate-500">
                    Try one of the suggested questions below or type your own.
                  </p>

                </div>

              </div>
            )}

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
                  className={`max-w-[75%] rounded-3xl px-5 py-4 transition-all ${
                    msg.sender === "user"
                      ? "bg-blue-600 text-white shadow-sm"
                      : "border border-slate-200 bg-white text-slate-800"
                  }`}
                >
                  <div className="mb-3 flex items-center gap-2">

                    {msg.sender === "ai" ? (
                      <Bot size={18} />
                    ) : (
                      <User size={18} />
                    )}

                    <span className="text-xs font-medium opacity-60">
                      {msg.time}
                    </span>

                  </div>

                  <p className="whitespace-pre-wrap leading-7 text-[15px]">
                    {msg.text}
                  </p>

                </div>
              </div>
            ))}

            {loading && (

              <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 w-fit">

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

            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-slate-500">
              Suggested Questions
            </h3>

            <div className="flex flex-wrap gap-3">

              <button
                onClick={() =>
                  setMessage("I have had a headache for three days.")
                }
                className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium transition hover:border-blue-300 hover:bg-blue-50"
              >
                🤕 Headache
              </button>

              <button
                onClick={() =>
                  setMessage("Explain my lab results in simple language.")
                }
                className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium transition hover:border-blue-300 hover:bg-blue-50"
              >
                🧪 Lab Results
              </button>

              <button
                onClick={() =>
                  setMessage("Translate my doctor's instructions into Swahili.")
                }
                className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium transition hover:border-blue-300 hover:bg-blue-50"
              >
                🌍 Translate
              </button>

              <button
                onClick={() =>
                  setMessage("Remind me how to take my medication.")
                }
                className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium transition hover:border-blue-300 hover:bg-blue-50"
              >
                💊 Medication
              </button>

            </div>

          </div>

          <div className="border-t border-slate-200 bg-slate-50 p-5">

            <div className="flex gap-3">

              <button className="rounded-2xl bg-white p-3 shadow-sm transition hover:bg-slate-100">
                <Languages size={20} />
              </button>

              <button
                onClick={handleVoiceInput}
                className={`rounded-2xl p-3 shadow-sm transition ${
                  listening
                    ? "bg-red-600 text-white animate-pulse"
                    : "bg-white hover:bg-slate-100"
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
                className="flex-1 rounded-2xl border border-slate-200 bg-white px-5 py-3 text-slate-800 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              />

              <button
                onClick={() => handleSend()}
                disabled={loading}
                className="flex items-center justify-center rounded-2xl bg-blue-600 px-6 text-white transition-all hover:scale-105 hover:bg-blue-700 disabled:opacity-50"
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