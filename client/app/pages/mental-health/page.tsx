"use client";

import DashboardLayout from "@/components/layout/DashboardLayout";
import {
  Brain,
  Heart,
  Smile,
  MessageCircle,
  Activity,
  Sparkles,
} from "lucide-react";

const moods = [
  { emoji: "😊", label: "Happy" },
  { emoji: "😌", label: "Calm" },
  { emoji: "😐", label: "Okay" },
  { emoji: "😔", label: "Sad" },
  { emoji: "😰", label: "Anxious" },
];

export default function Page() {
  return (
    <DashboardLayout>

      <div className="space-y-8">

        <div>

          <h1 className="text-4xl font-bold text-slate-800">
            Mental Health Companion
          </h1>

          <p className="text-slate-500 mt-2">
            Your private AI wellness companion to help you reflect,
            relax and care for your emotional well-being.
          </p>

        </div>

        <div className="grid md:grid-cols-3 gap-6">

          <div className="bg-white rounded-2xl border shadow p-6">

            <Brain
              className="text-green-600 mb-4"
              size={36}
            />

            <h2 className="text-3xl font-bold">
              AI Support
            </h2>

            <p className="text-slate-500 mt-2">
              Available 24/7
            </p>

          </div>

          <div className="bg-white rounded-2xl border shadow p-6">

            <Heart
              className="text-green-600 mb-4"
              size={36}
            />

            <h2 className="text-3xl font-bold">
              Daily Check-in
            </h2>

            <p className="text-slate-500 mt-2">
              Track your emotions
            </p>

          </div>

          <div className="bg-white rounded-2xl border shadow p-6">

            <Activity
              className="text-green-600 mb-4"
              size={36}
            />

            <h2 className="text-3xl font-bold">
              Wellness Tips
            </h2>

            <p className="text-slate-500 mt-2">
              Personalized guidance
            </p>

          </div>

        </div>

        <div className="bg-white rounded-3xl border shadow p-8">

          <h2 className="text-2xl font-bold mb-6">
            How are you feeling today?
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">

            {moods.map((mood) => (

              <button
                key={mood.label}
                className="border rounded-2xl p-6 hover:bg-green-50 hover:border-green-500 transition"
              >

                <div className="text-4xl">
                  {mood.emoji}
                </div>

                <p className="mt-3 font-medium">
                  {mood.label}
                </p>

              </button>

            ))}

          </div>

        </div>

        <div className="grid lg:grid-cols-2 gap-6">

          <div className="bg-white rounded-3xl border shadow p-6">

            <div className="flex items-center gap-3 mb-5">

              <MessageCircle
                className="text-green-600"
                size={30}
              />

              <h2 className="text-2xl font-bold">
                AI Wellness Chat
              </h2>

            </div>

            <div className="bg-slate-50 rounded-2xl p-5 min-h-[220px]">

              <p className="text-slate-500 leading-7">
                Hello 👋

                <br />
                <br />

                I'm your MediNexa AI companion.
                Tell me how you're feeling today,
                and I'll listen, offer support,
                breathing exercises, and wellness tips.
              </p>

            </div>

            <button className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white rounded-xl py-3 font-semibold transition">
              Start Conversation
            </button>

          </div>

          <div className="bg-white rounded-3xl border shadow p-6">

            <div className="flex items-center gap-3 mb-5">

              <Sparkles
                className="text-green-600"
                size={30}
              />

              <h2 className="text-2xl font-bold">
                Today's Wellness Tips
              </h2>

            </div>

            <ul className="space-y-4 text-slate-600 leading-7">

              <li>🌿 Take a 10-minute walk outside.</li>

              <li>💧 Drink enough water today.</li>

              <li>🧘 Practice deep breathing for 5 minutes.</li>

              <li>📖 Write down three things you're grateful for.</li>

              <li>😴 Aim for at least 7–8 hours of sleep tonight.</li>

            </ul>

          </div>

        </div>

      </div>

    </DashboardLayout>
  );
}