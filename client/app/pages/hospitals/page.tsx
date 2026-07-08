"use client";

import DashboardLayout from "@/components/layout/DashboardLayout";
import {
  Hospital,
  MapPin,
  Phone,
  Navigation,
  Search,
  Clock,
} from "lucide-react";

const hospitals = [
  {
    id: 1,
    name: "Kenyatta National Hospital",
    location: "Nairobi",
    phone: "+254 20 2726300",
    distance: "2.5 km",
    open: "Open 24 Hours",
  },
  {
    id: 2,
    name: "The Nairobi Hospital",
    location: "Upper Hill",
    phone: "+254 703 082000",
    distance: "3.8 km",
    open: "Open 24 Hours",
  },
  {
    id: 3,
    name: "Aga Khan University Hospital",
    location: "Parklands",
    phone: "+254 709 931000",
    distance: "5.1 km",
    open: "Open 24 Hours",
  },
];

export default function HospitalsPage() {
  return (
    <DashboardLayout>

      <div className="space-y-8">

        <div>

          <h1 className="text-4xl font-bold text-slate-800">
            Nearby Hospitals
          </h1>

          <p className="text-slate-500 mt-2">
            Find nearby hospitals, clinics, and emergency healthcare services.
          </p>

        </div>

        <div className="bg-white rounded-3xl border shadow p-6">

          <div className="relative">

            <Search
              className="absolute left-4 top-4 text-slate-400"
              size={20}
            />

            <input
              type="text"
              placeholder="Search hospitals..."
              className="w-full border rounded-2xl pl-12 pr-4 py-4 focus:outline-none focus:ring-2 focus:ring-green-500"
            />

          </div>

        </div>

        <div className="grid gap-6">

          {hospitals.map((hospital) => (

            <div
              key={hospital.id}
              className="bg-white rounded-3xl border shadow p-6 hover:shadow-lg transition"
            >

              <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-6">

                <div className="flex items-start gap-4">

                  <div className="bg-green-100 p-4 rounded-2xl">

                    <Hospital
                      className="text-green-700"
                      size={32}
                    />

                  </div>

                  <div>

                    <h2 className="text-2xl font-bold">
                      {hospital.name}
                    </h2>

                    <div className="mt-3 space-y-2 text-slate-600">

                      <div className="flex items-center gap-2">

                        <MapPin size={18} />

                        {hospital.location}

                      </div>

                      <div className="flex items-center gap-2">

                        <Phone size={18} />

                        {hospital.phone}

                      </div>

                      <div className="flex items-center gap-2">

                        <Clock size={18} />

                        {hospital.open}

                      </div>

                    </div>

                  </div>

                </div>

                <div className="text-center lg:text-right">

                  <div className="bg-green-100 text-green-700 px-4 py-2 rounded-full font-semibold inline-block">
                    {hospital.distance}
                  </div>

                  <div className="mt-5 flex flex-col gap-3">

                    <button className="bg-green-600 hover:bg-green-700 text-white rounded-xl px-6 py-3 transition">
                      View Details
                    </button>

                    <button className="border border-green-600 text-green-600 hover:bg-green-50 rounded-xl px-6 py-3 flex items-center justify-center gap-2 transition">

                      <Navigation size={18} />

                      Get Directions

                    </button>

                  </div>

                </div>

              </div>

            </div>

          ))}

        </div>

        <div className="bg-green-50 border border-green-200 rounded-3xl p-6">

          <h2 className="text-xl font-bold text-green-700">
            🚀 Coming Soon
          </h2>

          <p className="mt-3 text-slate-600 leading-7">
            This page will automatically detect your location using
            Google Maps and display nearby hospitals, clinics,
            pharmacies, emergency rooms, and navigation directions in
            real time.
          </p>

        </div>

      </div>

    </DashboardLayout>
  );
}