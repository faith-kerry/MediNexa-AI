"use client";

import DashboardLayout from "@/components/layout/DashboardLayout";
import {
  Bell,
  Moon,
  Shield,
  Globe,
  Lock,
  Smartphone,
  Save,
} from "lucide-react";

export default function Page() {
  return (
    <DashboardLayout>

      <div className="space-y-8">

        <div>

          <h1 className="text-4xl font-bold text-slate-800">
            Settings
          </h1>

          <p className="text-slate-500 mt-2">
            Customize your MediNexa AI experience and account preferences.
          </p>

        </div>

        <div className="grid lg:grid-cols-2 gap-6">

          <div className="bg-white rounded-3xl shadow border p-6">

            <div className="flex items-center gap-3 mb-6">

              <Bell
                className="text-green-600"
                size={28}
              />

              <h2 className="text-2xl font-bold">
                Notifications
              </h2>

            </div>

            <div className="space-y-5">

              <label className="flex items-center justify-between">

                <span>Appointment reminders</span>

                <input type="checkbox" defaultChecked />

              </label>

              <label className="flex items-center justify-between">

                <span>Medication reminders</span>

                <input type="checkbox" defaultChecked />

              </label>

              <label className="flex items-center justify-between">

                <span>Lab result notifications</span>

                <input type="checkbox" defaultChecked />

              </label>

            </div>

          </div>

          <div className="bg-white rounded-3xl shadow border p-6">

            <div className="flex items-center gap-3 mb-6">

              <Moon
                className="text-green-600"
                size={28}
              />

              <h2 className="text-2xl font-bold">
                Appearance
              </h2>

            </div>

            <div className="space-y-5">

              <label className="flex items-center justify-between">

                <span>Dark Mode</span>

                <input type="checkbox" />

              </label>

              <label className="flex items-center justify-between">

                <span>Large Text</span>

                <input type="checkbox" />

              </label>

            </div>

          </div>

          <div className="bg-white rounded-3xl shadow border p-6">

            <div className="flex items-center gap-3 mb-6">

              <Globe
                className="text-green-600"
                size={28}
              />

              <h2 className="text-2xl font-bold">
                Language
              </h2>

            </div>

            <select className="w-full border rounded-xl p-3">

              <option>English</option>

              <option>Swahili</option>

              <option>Kikuyu</option>

              <option>Luo</option>

              <option>Kamba</option>

            </select>

          </div>

          <div className="bg-white rounded-3xl shadow border p-6">

            <div className="flex items-center gap-3 mb-6">

              <Shield
                className="text-green-600"
                size={28}
              />

              <h2 className="text-2xl font-bold">
                Privacy & Security
              </h2>

            </div>

            <div className="space-y-4">

              <button className="w-full border rounded-xl py-3 hover:bg-slate-50 transition">
                <div className="flex items-center justify-center gap-2">

                  <Lock size={18} />

                  Change Password

                </div>
              </button>

              <button className="w-full border rounded-xl py-3 hover:bg-slate-50 transition">
                <div className="flex items-center justify-center gap-2">

                  <Smartphone size={18} />

                  Manage Devices

                </div>
              </button>

            </div>

          </div>

        </div>

        <div className="bg-green-50 border border-green-200 rounded-3xl p-6 flex justify-end">

          <button className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-xl flex items-center gap-2 transition">

            <Save size={18} />

            Save Settings

          </button>

        </div>

      </div>

    </DashboardLayout>
  );
}