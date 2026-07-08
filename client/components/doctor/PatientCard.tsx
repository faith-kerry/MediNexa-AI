"use client";

import {
  User,
  Phone,
  Calendar,
  HeartPulse,
} from "lucide-react";

interface PatientCardProps {
  name: string;
  age: number;
  gender: string;
  phone: string;
  appointmentDate: string;
  condition: string;
}

export default function PatientCard({
  name,
  age,
  gender,
  phone,
  appointmentDate,
  condition,
}: PatientCardProps) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 hover:shadow-lg transition">

      <div className="flex items-center gap-4">

        <div className="bg-green-100 p-4 rounded-full">
          <User
            size={32}
            className="text-green-700"
          />
        </div>

        <div>

          <h2 className="text-xl font-bold text-slate-800">
            {name}
          </h2>

          <p className="text-slate-500">
            {age} years • {gender}
          </p>

        </div>

      </div>

      <div className="mt-6 space-y-4">

        <div className="flex items-center gap-3 text-slate-600">

          <Phone
            size={18}
            className="text-green-600"
          />

          <span>{phone}</span>

        </div>

        <div className="flex items-center gap-3 text-slate-600">

          <Calendar
            size={18}
            className="text-green-600"
          />

          <span>{appointmentDate}</span>

        </div>

        <div className="flex items-center gap-3 text-slate-600">

          <HeartPulse
            size={18}
            className="text-green-600"
          />

          <span>{condition}</span>

        </div>

      </div>

      <button className="mt-8 w-full bg-green-600 hover:bg-green-700 text-white rounded-xl py-3 font-semibold transition">
        View Medical Record
      </button>

    </div>
  );
}