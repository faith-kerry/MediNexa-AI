"use client";

import DashboardLayout from "@/components/layout/DashboardLayout";
import {
  Users,
  HeartPulse,
  CalendarDays,
  Pill,
  Phone,
  ShieldCheck,
} from "lucide-react";

const familyMembers = [
  {
    id: 1,
    name: "Mary Wanjiku",
    relationship: "Mother",
    status: "Healthy",
    nextAppointment: "15 July 2026",
  },
  {
    id: 2,
    name: "John Kamau",
    relationship: "Father",
    status: "Needs Follow-up",
    nextAppointment: "18 July 2026",
  },
];

export default function Page() {
  return (
    <DashboardLayout>

      <div className="space-y-8">

        <div>

          <h1 className="text-4xl font-bold text-slate-800">
            Family Health Dashboard
          </h1>

          <p className="text-slate-500 mt-2">
            Monitor and support the health of your loved ones from one secure place.
          </p>

        </div>

        <div className="grid md:grid-cols-3 gap-6">

          <div className="bg-white rounded-2xl shadow border p-6">

            <Users
              className="text-green-600 mb-4"
              size={36}
            />

            <h2 className="text-3xl font-bold">
              {familyMembers.length}
            </h2>

            <p className="text-slate-500 mt-2">
              Family Members
            </p>

          </div>

          <div className="bg-white rounded-2xl shadow border p-6">

            <CalendarDays
              className="text-green-600 mb-4"
              size={36}
            />

            <h2 className="text-3xl font-bold">
              2
            </h2>

            <p className="text-slate-500 mt-2">
              Upcoming Appointments
            </p>

          </div>

          <div className="bg-white rounded-2xl shadow border p-6">

            <Pill
              className="text-green-600 mb-4"
              size={36}
            />

            <h2 className="text-3xl font-bold">
              4
            </h2>

            <p className="text-slate-500 mt-2">
              Active Medications
            </p>

          </div>

        </div>

        <div className="bg-white rounded-3xl shadow border">

          <div className="border-b px-6 py-5">

            <h2 className="text-2xl font-bold">
              Family Members
            </h2>

          </div>

          <div className="divide-y">

            {familyMembers.map((member) => (

              <div
                key={member.id}
                className="flex flex-col md:flex-row md:justify-between md:items-center p-6 hover:bg-slate-50 transition"
              >

                <div>

                  <h3 className="text-xl font-semibold">
                    {member.name}
                  </h3>

                  <p className="text-slate-500">
                    {member.relationship}
                  </p>

                </div>

                <div className="mt-4 md:mt-0">

                  <span
                    className={`px-4 py-2 rounded-full text-sm font-semibold ${
                      member.status === "Healthy"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {member.status}
                  </span>

                </div>

                <div className="mt-4 md:mt-0 text-slate-600">

                  Next Visit:
                  <br />
                  <span className="font-semibold">
                    {member.nextAppointment}
                  </span>

                </div>

                <button className="mt-4 md:mt-0 bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-xl transition">
                  View Profile
                </button>

              </div>

            ))}

          </div>

        </div>

        <div className="grid md:grid-cols-2 gap-6">

          <div className="bg-white rounded-3xl shadow border p-6">

            <HeartPulse
              className="text-green-600 mb-4"
              size={34}
            />

            <h2 className="text-2xl font-bold">
              Health Summary
            </h2>

            <p className="text-slate-500 mt-4 leading-7">
              View appointments, prescriptions, lab reports and AI health summaries
              for each registered family member.
            </p>

          </div>

          <div className="bg-white rounded-3xl shadow border p-6">

            <ShieldCheck
              className="text-green-600 mb-4"
              size={34}
            />

            <h2 className="text-2xl font-bold">
              Emergency Contact
            </h2>

            <div className="mt-5 flex items-center gap-3">

              <Phone className="text-green-600" />

              <span className="font-medium">
                +254 712 345 678
              </span>

            </div>

            <button className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white rounded-xl py-3 transition">
              Contact Caregiver
            </button>

          </div>

        </div>

      </div>

    </DashboardLayout>
  );
}