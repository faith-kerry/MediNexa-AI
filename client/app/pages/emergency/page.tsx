"use client";

import DashboardLayout from "@/components/layout/DashboardLayout";
import {
  Ambulance,
  Phone,
  MapPin,
  ShieldAlert,
  HeartPulse,
  Siren,
} from "lucide-react";

export default function Page() {
  return (
    <DashboardLayout>

      <div className="space-y-8">

        <div>

          <h1 className="text-4xl font-bold text-slate-800">
            Emergency SOS
          </h1>

          <p className="text-slate-500 mt-2">
            Quickly contact emergency services and notify your emergency contacts.
          </p>

        </div>

        <div className="grid lg:grid-cols-3 gap-6">

          <div className="bg-red-600 text-white rounded-3xl shadow-lg p-8">

            <Siren size={60} />

            <h2 className="text-3xl font-bold mt-6">
              Emergency SOS
            </h2>

            <p className="mt-3 opacity-90 leading-7">
              Press the button below during an emergency to alert your emergency contacts.
            </p>

            <button className="mt-8 w-full bg-white text-red-600 hover:bg-red-100 rounded-2xl py-4 font-bold transition">
              SEND SOS ALERT
            </button>

          </div>

          <div className="bg-white rounded-3xl shadow border p-6">

            <Phone
              className="text-green-600"
              size={38}
            />

            <h2 className="text-2xl font-bold mt-5">
              Emergency Contact
            </h2>

            <p className="text-slate-500 mt-3">
              Faith's Mother
            </p>

            <p className="font-semibold mt-2">
              +254 712 345 678
            </p>

            <button className="mt-8 w-full bg-green-600 hover:bg-green-700 text-white rounded-xl py-3 transition">
              Call Contact
            </button>

          </div>

          <div className="bg-white rounded-3xl shadow border p-6">

            <Ambulance
              className="text-green-600"
              size={38}
            />

            <h2 className="text-2xl font-bold mt-5">
              Ambulance
            </h2>

            <p className="text-slate-500 mt-3">
              Call emergency ambulance services immediately.
            </p>

            <button className="mt-8 w-full bg-green-600 hover:bg-green-700 text-white rounded-xl py-3 transition">
              Call Ambulance
            </button>

          </div>

        </div>

        <div className="grid md:grid-cols-2 gap-6">

          <div className="bg-white rounded-3xl shadow border p-6">

            <MapPin
              className="text-green-600"
              size={34}
            />

            <h2 className="text-2xl font-bold mt-4">
              Current Location
            </h2>

            <p className="text-slate-500 mt-3 leading-7">
              Your live location will be shared with emergency contacts
              when an SOS alert is sent.
            </p>

          </div>

          <div className="bg-white rounded-3xl shadow border p-6">

            <HeartPulse
              className="text-green-600"
              size={34}
            />

            <h2 className="text-2xl font-bold mt-4">
              Medical Information
            </h2>

            <div className="mt-4 space-y-2 text-slate-600">

              <p>Blood Group: O+</p>

              <p>Allergies: None Recorded</p>

              <p>Medical Condition: Asthma</p>

            </div>

          </div>

        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-3xl p-6 flex gap-4">

          <ShieldAlert
            className="text-yellow-600 mt-1"
            size={30}
          />

          <div>

            <h3 className="font-bold text-yellow-700 text-lg">
              Safety Notice
            </h3>

            <p className="text-slate-600 mt-2 leading-7">
              The SOS feature will later send your live location,
              emergency medical details, and notify your registered
              caregiver and emergency contacts automatically.
            </p>

          </div>

        </div>

      </div>

    </DashboardLayout>
  );
}