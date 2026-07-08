"use client";

import { Bot, Sparkles } from "lucide-react";
import Link from "next/link";

export default function AIWidget() {
  return (
    <div className="bg-white rounded-3xl shadow-lg border border-slate-200 p-6 hover:shadow-xl transition-all duration-300">
      <div className="flex items-center justify-between">

        <div>

          <div className="flex items-center gap-3">

            <div className="bg-green-100 p-3 rounded-2xl">
              <Bot className="text-green-600" size={28} />
            </div>

            <div>

              <h2 className="text-2xl font-bold text-slate-800">
                MediNexa AI
              </h2>

              <p className="text-slate-500 text-sm">
                AI Health Assistant
              </p>

            </div>

          </div>

          <p className="mt-5 text-slate-600 leading-7">
            Ask questions about symptoms, medications, lab reports,
            prescriptions, mental wellness, and general health.
            MediNexa AI responds instantly in simple language.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">

            <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm">
              Symptom Checker
            </span>

            <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm">
              Lab Report AI
            </span>

            <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm">
              Medication Help
            </span>

            <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm">
              Mental Health
            </span>

          </div>

        </div>

        <div className="hidden lg:flex items-center justify-center">

          <div className="bg-green-50 p-10 rounded-full">

            <Sparkles
              className="text-green-600"
              size={70}
            />

          </div>

        </div>

      </div>

      <div className="mt-8">

        <Link href="/pages/ai-chat">

          <button className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold rounded-2xl py-4 transition">
            Open AI Assistant
          </button>

        </Link>

      </div>

    </div>
  );
}