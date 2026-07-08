"use client";

import { ReactNode } from "react";

interface DoctorStatCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  color?: string;
}

export default function DoctorStatCard({
  title,
  value,
  icon,
  color = "bg-green-100 text-green-700",
}: DoctorStatCardProps) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 hover:shadow-lg transition">

      <div className="flex justify-between items-center">

        <div>

          <p className="text-slate-500 text-sm">
            {title}
          </p>

          <h2 className="text-3xl font-bold mt-2 text-slate-800">
            {value}
          </h2>

        </div>

        <div className={`${color} p-4 rounded-2xl`}>
          {icon}
        </div>

      </div>

    </div>
  );
}