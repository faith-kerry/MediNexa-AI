"use client";

import DashboardLayout from "@/components/layout/DashboardLayout";
import { Bot, Send, Mic, Languages } from "lucide-react";

export default function AIChatPage() {
  return (
    <DashboardLayout>
      <div className="space-y-8">

        <div>
          <h1 className="text-4xl font-bold text-slate-800">
            AI Health Assistant
          </h1>

          <p className="text-slate-500 mt-2">
            Ask health questions, translate doctor's instructions and get AI guidance.
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm h-[550px] flex flex-col">

          <div className="border-b p-5 flex items-center gap-3">

            <div className="bg-blue-600 w-12 h-12 rounded-xl flex items-center justify-center text-white">
              <Bot size={26} />
            </div>

            <div>
              <h2 className="font-bold text-lg">
                MediNexa AI
              </h2>

              <p className="text-sm text-green-600">
                Online
              </p>
            </div>

          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-5">

            <div className="bg-slate-100 rounded-2xl p-4 max-w-xl">
              Hello 👋 I'm your AI healthcare assistant.
              <br /><br />
              I can help you:
              <br />
              • Understand symptoms
              <br />
              • Explain lab results
              <br />
              • Translate doctor's instructions
              <br />
              • Medication guidance
              <br />
              • Mental wellness support
            </div>

          </div>

          <div className="border-t p-5">

            <div className="flex gap-3">

              <button className="p-3 rounded-xl bg-slate-100">
                <Languages size={22}/>
              </button>

              <button className="p-3 rounded-xl bg-slate-100">
                <Mic size={22}/>
              </button>

              <input
                className="flex-1 border rounded-xl px-5 outline-none"
                placeholder="Describe your symptoms..."
              />

              <button className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-6">
                <Send size={22}/>
              </button>

            </div>

          </div>

        </div>

      </div>
    </DashboardLayout>
  );
}