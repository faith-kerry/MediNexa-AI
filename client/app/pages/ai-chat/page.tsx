"use client";

import { useEffect, useRef, useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";

import {
  Bot,
  Send,
  Mic,
  User,
  Loader2,
  Volume2,
  Globe,
  Languages,
  ShieldCheck,
} from "lucide-react";

import { sendMessage } from "@/services/aiService";
import { speak } from "@/services/voiceService";
import useSpeechRecognition from "@/hooks/useSpeechRecognition";

interface ChatMessage {
  sender: "user" | "ai";
  text: string;
  time: string;
}

export default function AIChatPage() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);

  const [speaking, setSpeaking] = useState(false);

  const [voiceEnabled, setVoiceEnabled] = useState(true);

  const [selectedLanguage, setSelectedLanguage] =
    useState("English");

  const [showLanguages, setShowLanguages] =
    useState(false);

  const bottomRef = useRef<HTMLDivElement>(null);

  const { listening, startListening } =
    useSpeechRecognition();

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  const handleSend = async (
    customMessage?: string
  ) => {
    const currentMessage =
      customMessage || message;

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
      const response = await sendMessage(
        `${currentMessage}

Respond ONLY in ${selectedLanguage}.
Keep the response simple and patient-friendly.`
      );

      const aiMessage: ChatMessage = {
        sender: "ai",
        text: response.reply,
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      setMessages((prev) => [...prev, aiMessage]);

      if (voiceEnabled) {
        setSpeaking(true);

        await speak(response.reply);

        setSpeaking(false);
      }

    } catch {
      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text:
            "Sorry, I couldn't process your request. Please try again.",
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
    startListening((text) => {
      setMessage(text);
    });
  };

  const playVoice = async (text: string) => {
    try {
      setSpeaking(true);

      await speak(text);

    } finally {
      setSpeaking(false);
    }
  };

  const copyMessage = (text: string) => {
    navigator.clipboard.writeText(text);
  };
 
return (
  <DashboardLayout>
    <div className="space-y-8">

      {/* Hero */}

      <div className="overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-600 via-emerald-500 to-green-500 p-8 text-white shadow-xl">

        <div className="flex items-center justify-between">

          <div>

            <div className="mb-4 flex items-center gap-3">

              <div className="rounded-2xl bg-white/20 p-3 backdrop-blur">

                <Bot size={34} />

              </div>

              <div>

                <h1 className="text-4xl font-bold">
                  MediNexa AI
                </h1>

                <p className="mt-1 text-emerald-100">
                  Your Intelligent Healthcare Companion
                </p>

              </div>

            </div>

            <p className="max-w-3xl leading-8 text-emerald-50">

              Ask about symptoms, medications,
              prescriptions, laboratory reports and receive
              simple healthcare guidance in your preferred
              language.

            </p>

          </div>

          <div className="hidden lg:block">

            <div className="rounded-3xl bg-white/15 p-6 backdrop-blur-lg">

              <ShieldCheck
                size={120}
                className="text-white"
              />

            </div>

          </div>

        </div>

      </div>

      {/* Status Cards */}

      <div className="grid gap-5 md:grid-cols-4">

        <div className="rounded-3xl border border-emerald-100 bg-white p-5 shadow-sm">

          <p className="text-sm text-slate-500">
            Status
          </p>

          <h3 className="mt-2 font-bold text-emerald-600">
            🟢 Online
          </h3>

        </div>

        <div className="rounded-3xl border border-emerald-100 bg-white p-5 shadow-sm">

          <p className="text-sm text-slate-500">
            Language
          </p>

          <button
            onClick={() =>
              setShowLanguages(!showLanguages)
            }
            className="mt-2 flex items-center gap-2 font-semibold text-emerald-600"
          >
            <Globe size={18} />

            {selectedLanguage}

          </button>

          {showLanguages && (

            <div className="mt-4 rounded-2xl border bg-white shadow-lg">

              {[
                "English",
                "Kiswahili",
                "Luo",
                "Kikuyu",
                "Kamba",
                "Somali",
              ].map((language) => (

                <button
                  key={language}
                  onClick={() => {
                    setSelectedLanguage(language);
                    setShowLanguages(false);
                  }}
                  className="block w-full px-4 py-3 text-left transition hover:bg-emerald-50"
                >
                  {language}
                </button>

              ))}

            </div>

          )}

        </div>

        <div className="rounded-3xl border border-emerald-100 bg-white p-5 shadow-sm">

          <p className="text-sm text-slate-500">
            Voice Assistant
          </p>

          <button
            onClick={() =>
              setVoiceEnabled(!voiceEnabled)
            }
            className={`mt-2 rounded-full px-4 py-2 text-sm font-semibold ${
              voiceEnabled
                ? "bg-emerald-100 text-emerald-700"
                : "bg-slate-100 text-slate-600"
            }`}
          >
            {voiceEnabled
              ? "Enabled"
              : "Disabled"}
          </button>

        </div>

        <div className="rounded-3xl border border-emerald-100 bg-white p-5 shadow-sm">

          <p className="text-sm text-slate-500">
            Services
          </p>

          <p className="mt-2 font-semibold text-slate-700">
            Symptoms • Translation • Voice
          </p>

        </div>

      </div>

      {/* Chat Container */}

      <div className="flex h-[730px] flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl">

        {/* Chat Header */}

        <div className="flex items-center justify-between border-b bg-white px-6 py-5">

          <div className="flex items-center gap-4">

            <div className="rounded-2xl bg-emerald-600 p-3 text-white">

              <Bot size={28} />

            </div>

            <div>

              <h2 className="font-bold text-slate-900">
                MediNexa AI Assistant
              </h2>

              <p className="text-sm text-emerald-600">
                Healthcare • Translation • Voice
              </p>

            </div>

          </div>

        </div>

        <div className="flex-1 overflow-y-auto bg-slate-50 p-6">

          {messages.length === 0 && !loading && (

            <div className="flex h-full items-center justify-center">

              <div className="max-w-2xl rounded-3xl bg-white p-10 text-center shadow">

                <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-emerald-600 text-white">

                  <Bot size={42} />

                </div>

                <h2 className="text-3xl font-bold">
                  Welcome to MediNexa AI
                </h2>

                <p className="mt-4 leading-8 text-slate-600">

                  Your trusted healthcare assistant.

                  Ask about medications,
                  symptoms,
                  laboratory reports,
                  prescriptions,
                  or receive answers in your
                  preferred language.

                </p>

              </div>

            </div>

          )}


          {messages.map((msg, index) => (
            <div
              key={index}
              className={`mb-5 flex ${
                msg.sender === "user"
                  ? "justify-end"
                  : "justify-start"
              }`}
            >
              <div
                className={`max-w-[80%] rounded-3xl px-5 py-4 shadow-sm ${
                  msg.sender === "user"
                    ? "bg-emerald-600 text-white"
                    : "border border-emerald-100 bg-white"
                }`}
              >
                <div className="mb-3 flex items-center justify-between">

                  <div className="flex items-center gap-2">

                    {msg.sender === "ai" ? (
                      <Bot
                        size={18}
                        className="text-emerald-600"
                      />
                    ) : (
                      <User size={18} />
                    )}

                    <span className="text-xs opacity-70">
                      {msg.time}
                    </span>

                  </div>

                  {msg.sender === "ai" && (
                    <div className="flex gap-2">

                      <button
                        onClick={() => navigator.clipboard.writeText(msg.text)}
                        className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700 hover:bg-emerald-100"
                      >
                        Copy
                      </button>

                      <button
                        onClick={() => playVoice(msg.text)}
                        disabled={speaking || !voiceEnabled}
                        className="flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700 hover:bg-emerald-100 disabled:opacity-50"
                      >
                        <Volume2 size={14} />

                        {speaking
                          ? "Speaking..."
                          : "Listen"}

                      </button>

                    </div>
                  )}

                </div>

                <p className="whitespace-pre-wrap leading-7">
                  {msg.text}
                </p>

              </div>

            </div>
          ))}

          {loading && (

            <div className="flex justify-start">

              <div className="flex items-center gap-3 rounded-3xl border border-emerald-100 bg-white px-5 py-4 shadow">

                <Loader2
                  className="animate-spin text-emerald-600"
                  size={20}
                />

                <span className="text-slate-600">
                  MediNexa AI is thinking...
                </span>

              </div>

            </div>

          )}

          <div ref={bottomRef} />

        </div>

        {/* Bottom Input */}

        <div className="border-t border-slate-200 bg-white p-5">

          <div className="flex items-center gap-3">

            <button
              onClick={() =>
                setMessage(
                  `Reply in ${selectedLanguage}: `
                )
              }
              className="rounded-2xl bg-emerald-100 p-3 text-emerald-700 hover:bg-emerald-200"
            >
              <Languages size={22} />
            </button>

            <button
              onClick={handleVoiceInput}
              className={`rounded-2xl p-3 ${
                listening
                  ? "animate-pulse bg-red-600 text-white"
                  : "bg-emerald-100 text-emerald-700 hover:bg-emerald-200"
              }`}
            >
              <Mic size={22} />
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
              placeholder={`Ask MediNexa AI... (${selectedLanguage})`}
              className="flex-1 rounded-2xl border border-emerald-200 px-5 py-3 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
            />

            <button
              onClick={() => handleSend()}
              disabled={loading}
              className="rounded-2xl bg-emerald-600 px-6 py-3 text-white transition hover:bg-emerald-700 disabled:opacity-60"
            >
              <Send size={22} />
            </button>

          </div>

        </div>

      </div>

    </div>

  </DashboardLayout>
);
}

