"use client";

import DashboardLayout from "@/components/layout/DashboardLayout";
import {
  FileText,
  Download,
  CalendarDays,
  ShieldCheck,
  Plus,
} from "lucide-react";

const records = [
  {
    id: 1,
    title: "General Checkup",
    hospital: "Nairobi Hospital",
    date: "12 June 2026",
    doctor: "Dr. Sarah Kimani",
  },
  {
    id: 2,
    title: "Blood Test Results",
    hospital: "Aga Khan Hospital",
    date: "30 May 2026",
    doctor: "Dr. James Otieno",
  },
  {
    id: 3,
    title: "Chest X-Ray",
    hospital: "Kenyatta National Hospital",
    date: "14 April 2026",
    doctor: "Dr. Mercy Wanjiku",
  },
];

export default function Page() {
  return (
    <DashboardLayout>

      <div className="space-y-8">

        <div className="flex justify-between items-center">

          <div>

            <h1 className="text-4xl font-bold text-slate-800">
              Medical Records
            </h1>

            <p className="text-slate-500 mt-2">
              Securely store and manage your medical history.
            </p>

          </div>

          <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl flex items-center gap-2 transition">

            <Plus size={20} />

            Add Record

          </button>

        </div>

        <div className="grid md:grid-cols-3 gap-6">

          <div className="bg-white rounded-2xl shadow border p-6">

            <ShieldCheck
              className="text-green-600 mb-4"
              size={34}
            />

            <h2 className="text-3xl font-bold">
              {records.length}
            </h2>

            <p className="text-slate-500 mt-2">
              Total Records
            </p>

          </div>

          <div className="bg-white rounded-2xl shadow border p-6">

            <FileText
              className="text-green-600 mb-4"
              size={34}
            />

            <h2 className="text-3xl font-bold">
              5
            </h2>

            <p className="text-slate-500 mt-2">
              Prescriptions
            </p>

          </div>

          <div className="bg-white rounded-2xl shadow border p-6">

            <CalendarDays
              className="text-green-600 mb-4"
              size={34}
            />

            <h2 className="text-3xl font-bold">
              3
            </h2>

            <p className="text-slate-500 mt-2">
              Recent Visits
            </p>

          </div>

        </div>

        <div className="bg-white rounded-3xl shadow border overflow-hidden">

          <div className="px-6 py-5 border-b">

            <h2 className="text-2xl font-bold">
              Medical History
            </h2>

          </div>

          <div>

            {records.map((record) => (

              <div
                key={record.id}
                className="border-b last:border-b-0 p-6 flex justify-between items-center hover:bg-slate-50 transition"
              >

                <div>

                  <h3 className="text-lg font-semibold">
                    {record.title}
                  </h3>

                  <p className="text-slate-500 mt-1">
                    {record.hospital}
                  </p>

                  <p className="text-sm text-slate-400 mt-2">
                    {record.doctor}
                  </p>

                </div>

                <div className="text-right">

                  <p className="text-slate-600">
                    {record.date}
                  </p>

                  <button className="mt-4 flex items-center gap-2 text-green-600 hover:text-green-700 font-medium">

                    <Download size={18} />

                    Download

                  </button>

                </div>

              </div>

            ))}

          </div>

        </div>

      </div>

    </DashboardLayout>
  );
}