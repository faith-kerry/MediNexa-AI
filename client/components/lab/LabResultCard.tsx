"use client";

import {
  FileText,
  CalendarDays,
  Brain,
  Download,
} from "lucide-react";

interface LabResultCardProps {
  title: string;
  uploadedDate: string;
  aiSummary: string;
  status: "Normal" | "Attention" | "Critical";
}

export default function LabResultCard({
  title,
  uploadedDate,
  aiSummary,
  status,
}: LabResultCardProps) {
  const statusColor =
    status === "Normal"
      ? "bg-green-100 text-green-700"
      : status === "Attention"
      ? "bg-yellow-100 text-yellow-700"
      : "bg-red-100 text-red-700";

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 hover:shadow-lg transition">

      <div className="flex justify-between items-start">

        <div>

          <div className="flex items-center gap-3">

            <div className="bg-green-100 p-3 rounded-2xl">
              <FileText
                size={24}
                className="text-green-700"
              />
            </div>

            <div>

              <h2 className="text-xl font-bold text-slate-800">
                {title}
              </h2>

              <div className="flex items-center gap-2 mt-1 text-slate-500">

                <CalendarDays size={16} />

                <span>{uploadedDate}</span>

              </div>

            </div>

          </div>

        </div>

        <span
          className={`px-4 py-2 rounded-full text-sm font-semibold ${statusColor}`}
        >
          {status}
        </span>

      </div>

      <div className="mt-6 bg-slate-50 rounded-2xl p-5">

        <div className="flex items-center gap-2 mb-3">

          <Brain
            size={20}
            className="text-green-600"
          />

          <h3 className="font-semibold text-slate-800">
            AI Explanation
          </h3>

        </div>

        <p className="text-slate-600 leading-7">
          {aiSummary}
        </p>

      </div>

      <div className="mt-6 flex gap-4">

        <button className="flex-1 bg-green-600 hover:bg-green-700 text-white rounded-xl py-3 font-semibold transition">
          View Report
        </button>

        <button className="flex items-center justify-center gap-2 px-5 border border-green-600 text-green-600 hover:bg-green-50 rounded-xl transition">
          <Download size={18} />
          Download
        </button>

      </div>

    </div>
  );
}