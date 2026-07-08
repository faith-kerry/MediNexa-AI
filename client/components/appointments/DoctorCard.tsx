"use client";

import { Star, MapPin, Calendar, Stethoscope } from "lucide-react";

interface DoctorCardProps {
  name: string;
  specialty: string;
  hospital: string;
  experience: number;
  rating: number;
  availability: string;
}

export default function DoctorCard({
  name,
  specialty,
  hospital,
  experience,
  rating,
  availability,
}: DoctorCardProps) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 hover:shadow-lg transition">

      <div className="flex items-center justify-between">

        <div>

          <h2 className="text-xl font-bold text-slate-800">
            Dr. {name}
          </h2>

          <div className="flex items-center gap-2 mt-1 text-green-600">

            <Stethoscope size={18} />

            <span>{specialty}</span>

          </div>

        </div>

        <div className="flex items-center gap-1 bg-yellow-100 px-3 py-1 rounded-full">

          <Star
            size={16}
            className="fill-yellow-500 text-yellow-500"
          />

          <span className="font-semibold">
            {rating}
          </span>

        </div>

      </div>

      <div className="mt-6 space-y-4">

        <div className="flex items-center gap-3 text-slate-600">

          <MapPin
            size={18}
            className="text-green-600"
          />

          <span>{hospital}</span>

        </div>

        <div className="flex items-center gap-3 text-slate-600">

          <Calendar
            size={18}
            className="text-green-600"
          />

          <span>{availability}</span>

        </div>

        <div className="flex items-center gap-3 text-slate-600">

          <Stethoscope
            size={18}
            className="text-green-600"
          />

          <span>{experience} years experience</span>

        </div>

      </div>

      <button className="mt-8 w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold transition">
        Book Appointment
      </button>

    </div>
  );
}