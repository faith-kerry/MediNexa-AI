"use client";

import { useRouter } from "next/navigation";
import { User, Stethoscope } from "lucide-react";

export default function SelectRolePage() {
  const router = useRouter();

  return (
    <main className="min-h-screen flex items-center justify-center bg-emerald-50 px-6">

      <div className="w-full max-w-5xl">

        <div className="text-center mb-12">

          <h1 className="text-5xl font-bold text-slate-900">
            Welcome to MediNexa AI
          </h1>

          <p className="mt-4 text-lg text-slate-600">
            Monitor patients, manage appointments, review reports and access intelligent healthcare tools.
          </p>

        </div>

        <div className="grid gap-8 md:grid-cols-2">

          {/* Patient Card */}

          <div
            onClick={() => router.push("/pages/dashboard")}
            className="cursor-pointer rounded-3xl bg-white border border-emerald-100 p-8 shadow-md transition hover:-translate-y-2 hover:shadow-xl"
          >

            <div className="w-16 h-16 rounded-2xl bg-emerald-100 flex items-center justify-center">

              <User
                className="text-emerald-600"
                size={34}
              />

            </div>

            <h2 className="mt-6 text-2xl font-bold">
              Continue as Patient
            </h2>

            <p className="mt-3 text-slate-600">
              Book appointments, access prescriptions, chat with AI, upload lab reports and manage your healthcare.
            </p>

            <button className="mt-8 w-full rounded-xl bg-emerald-600 py-3 font-semibold text-white hover:bg-emerald-700">
              Continue
            </button>

          </div>

          {/* Doctor Card */}

          <div
            onClick={() => router.push("/pages/doctor")}
            className="cursor-pointer rounded-3xl bg-white border border-emerald-100 p-8 shadow-md transition hover:-translate-y-2 hover:shadow-xl"
          >

            <div className="w-16 h-16 rounded-2xl bg-emerald-100 flex items-center justify-center">

              <Stethoscope
                className="text-emerald-600"
                size={34}
              />

            </div>

            <h2 className="mt-6 text-2xl font-bold">
              Continue as Doctor
            </h2>

            <p className="mt-3 text-slate-600">
              Manage patients, appointments, prescriptions, lab reports and hospital workflows.
            </p>

            <button className="mt-8 w-full rounded-xl bg-emerald-600 py-3 font-semibold text-white hover:bg-emerald-700">
              Continue
            </button>

          </div>

        </div>

      </div>

    </main>
  );
}