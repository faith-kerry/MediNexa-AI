"use client";

import DashboardLayout from "@/components/layout/DashboardLayout";
import {
  Pill,
  Clock,
  UserRound,
  CalendarDays,
  ShieldCheck,
} from "lucide-react";

const prescriptions = [
  {
    id: 1,
    medicine: "Amoxicillin 500mg",
    dosage: "1 capsule, 3 times daily",
    duration: "7 Days",
    doctor: "Dr. Sarah Kimani",
    status: "Active",
  },
  {
    id: 2,
    medicine: "Paracetamol 500mg",
    dosage: "2 tablets when needed",
    duration: "5 Days",
    doctor: "Dr. James Otieno",
    status: "Completed",
  },
];

export default function Page() {
  return (
    <DashboardLayout>

      <div className="space-y-8">

        <div>

          <h1 className="text-4xl font-bold text-slate-800">
            Prescriptions
          </h1>

          <p className="text-slate-500 mt-2">
            View all your medications and treatment plans in one place.
          </p>

        </div>

        <div className="grid md:grid-cols-3 gap-6">

          <div className="bg-white rounded-2xl shadow border p-6">

            <Pill
              className="text-green-600 mb-4"
              size={36}
            />

            <h2 className="text-3xl font-bold">
              {prescriptions.length}
            </h2>

            <p className="text-slate-500 mt-2">
              Total Prescriptions
            </p>

          </div>

          <div className="bg-white rounded-2xl shadow border p-6">

            <Clock
              className="text-green-600 mb-4"
              size={36}
            />

            <h2 className="text-3xl font-bold">
              3
            </h2>

            <p className="text-slate-500 mt-2">
              Daily Reminders
            </p>

          </div>

          <div className="bg-white rounded-2xl shadow border p-6">

            <ShieldCheck
              className="text-green-600 mb-4"
              size={36}
            />

            <h2 className="text-3xl font-bold">
              1
            </h2>

            <p className="text-slate-500 mt-2">
              Active Treatment
            </p>

          </div>

        </div>

        <div className="space-y-6">

          {prescriptions.map((prescription) => (

            <div
              key={prescription.id}
              className="bg-white rounded-3xl border shadow p-6 hover:shadow-lg transition"
            >

              <div className="flex flex-col lg:flex-row lg:justify-between gap-6">

                <div>

                  <div className="flex items-center gap-3">

                    <div className="bg-green-100 p-3 rounded-2xl">

                      <Pill
                        className="text-green-700"
                        size={26}
                      />

                    </div>

                    <div>

                      <h2 className="text-2xl font-bold">
                        {prescription.medicine}
                      </h2>

                      <p className="text-slate-500">
                        {prescription.dosage}
                      </p>

                    </div>

                  </div>

                  <div className="mt-6 space-y-3 text-slate-600">

                    <div className="flex items-center gap-2">

                      <CalendarDays size={18} />

                      Duration: {prescription.duration}

                    </div>

                    <div className="flex items-center gap-2">

                      <UserRound size={18} />

                      {prescription.doctor}

                    </div>

                  </div>

                </div>

                <div className="flex flex-col justify-between">

                  <span
                    className={`px-4 py-2 rounded-full text-sm font-semibold text-center ${
                      prescription.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {prescription.status}
                  </span>

                  <button className="mt-6 bg-green-600 hover:bg-green-700 text-white rounded-xl px-6 py-3 transition">
                    View Details
                  </button>

                </div>

              </div>

            </div>

          ))}

        </div>

        <div className="bg-green-50 border border-green-200 rounded-3xl p-6">

          <h2 className="text-xl font-bold text-green-700">
            🤖 AI Medication Assistant
          </h2>

          <p className="mt-3 text-slate-600 leading-7">
            Soon you'll be able to tap any prescription and let MediNexa AI
            explain what the medicine is for, possible side effects, the best
            time to take it, and send automatic medication reminders.
          </p>

        </div>

      </div>

    </DashboardLayout>
  );
}