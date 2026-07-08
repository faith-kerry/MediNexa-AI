"use client";

import DashboardLayout from "@/components/layout/DashboardLayout";
import {
  User,
  Mail,
  Phone,
  CalendarDays,
  MapPin,
  HeartPulse,
  ShieldCheck,
  Pencil,
} from "lucide-react";

export default function Page() {
  return (
    <DashboardLayout>

      <div className="space-y-8">

        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center">

          <div>

            <h1 className="text-4xl font-bold text-slate-800">
              My Profile
            </h1>

            <p className="text-slate-500 mt-2">
              Manage your personal information and health profile.
            </p>

          </div>

          <button className="mt-4 lg:mt-0 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl flex items-center gap-2 transition">

            <Pencil size={18} />

            Edit Profile

          </button>

        </div>

        <div className="grid lg:grid-cols-3 gap-6">

          <div className="bg-white rounded-3xl border shadow p-8 text-center">

            <div className="w-28 h-28 rounded-full bg-green-100 flex items-center justify-center mx-auto">

              <User
                className="text-green-700"
                size={60}
              />

            </div>

            <h2 className="text-2xl font-bold mt-6">
              Faith Kerubo
            </h2>

            <p className="text-slate-500 mt-2">
              Patient
            </p>

            <div className="mt-8 space-y-4 text-left">

              <div className="flex items-center gap-3">

                <Mail
                  className="text-green-600"
                  size={20}
                />

                <span>faith@example.com</span>

              </div>

              <div className="flex items-center gap-3">

                <Phone
                  className="text-green-600"
                  size={20}
                />

                <span>+254 712 345 678</span>

              </div>

              <div className="flex items-center gap-3">

                <MapPin
                  className="text-green-600"
                  size={20}
                />

                <span>Nairobi, Kenya</span>

              </div>

            </div>

          </div>

          <div className="lg:col-span-2 space-y-6">

            <div className="bg-white rounded-3xl border shadow p-6">

              <h2 className="text-2xl font-bold mb-6">
                Personal Information
              </h2>

              <div className="grid md:grid-cols-2 gap-6">

                <div>

                  <label className="text-sm text-slate-500">
                    Full Name
                  </label>

                  <p className="font-semibold mt-2">
                    Faith Kerubo
                  </p>

                </div>

                <div>

                  <label className="text-sm text-slate-500">
                    Date of Birth
                  </label>

                  <p className="font-semibold mt-2 flex items-center gap-2">

                    <CalendarDays size={18} />

                    20 March 2005

                  </p>

                </div>

                <div>

                  <label className="text-sm text-slate-500">
                    Gender
                  </label>

                  <p className="font-semibold mt-2">
                    Female
                  </p>

                </div>

                <div>

                  <label className="text-sm text-slate-500">
                    Blood Group
                  </label>

                  <p className="font-semibold mt-2">
                    O+
                  </p>

                </div>

              </div>

            </div>

            <div className="bg-white rounded-3xl border shadow p-6">

              <div className="flex items-center gap-3 mb-5">

                <HeartPulse
                  className="text-green-600"
                  size={26}
                />

                <h2 className="text-2xl font-bold">
                  Medical Summary
                </h2>

              </div>

              <div className="grid md:grid-cols-2 gap-6">

                <div>

                  <h3 className="font-semibold mb-2">
                    Allergies
                  </h3>

                  <p className="text-slate-600">
                    None Recorded
                  </p>

                </div>

                <div>

                  <h3 className="font-semibold mb-2">
                    Existing Conditions
                  </h3>

                  <p className="text-slate-600">
                    Asthma
                  </p>

                </div>

                <div>

                  <h3 className="font-semibold mb-2">
                    Emergency Contact
                  </h3>

                  <p className="text-slate-600">
                    +254 712 345 678
                  </p>

                </div>

                <div>

                  <h3 className="font-semibold mb-2">
                    Insurance
                  </h3>

                  <p className="text-slate-600">
                    SHA
                  </p>

                </div>

              </div>

            </div>

            <div className="bg-green-50 border border-green-200 rounded-3xl p-6">

              <div className="flex items-center gap-3">

                <ShieldCheck
                  className="text-green-700"
                  size={24}
                />

                <h2 className="text-xl font-bold text-green-700">
                  Privacy Notice
                </h2>

              </div>

              <p className="mt-4 text-slate-600 leading-7">
                Your personal and medical information is securely encrypted
                and will only be shared with authorized healthcare providers
                after your consent.
              </p>

            </div>

          </div>

        </div>

      </div>

    </DashboardLayout>
  );
}