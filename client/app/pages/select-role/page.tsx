"use client";

import { useRouter } from "next/navigation";
import { User, Stethoscope } from "lucide-react";

export default function SelectRolePage() {
  const router = useRouter();

  const handlePatient = () => {
    localStorage.setItem("selectedRole", "patient");
    router.push("/dashboard");
  };

  const handleDoctor = () => {
    localStorage.setItem("selectedRole", "doctor");
    router.push("/pages/doctor");
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-emerald-50 px-6">
      <div className="w-full max-w-5xl">
        <div className="mb-12 text-center">
          <h1 className="text-5xl font-bold text-slate-900">
            Welcome to MediNexa AI
          </h1>

          <p className="mt-4 text-lg text-slate-600">
            Monitor patients, manage appointments, review reports and access
            intelligent healthcare tools.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {/* Patient Card */}
          <div
            onClick={handlePatient}
            className="cursor-pointer rounded-3xl border border-emerald-100 bg-white p-8 shadow-md transition duration-300 hover:-translate-y-2 hover:shadow-xl"
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-100">
              <User className="text-emerald-600" size={34} />
            </div>

            <h2 className="mt-6 text-2xl font-bold text-slate-900">
              Continue as Patient
            </h2>

            <p className="mt-3 text-slate-600">
              Book appointments, access prescriptions, chat with AI, upload lab
              reports and manage your healthcare.
            </p>

            <button className="mt-8 w-full rounded-xl bg-emerald-600 py-3 font-semibold text-white transition hover:bg-emerald-700">
              Continue
            </button>
          </div>

          {/* Doctor Card */}
          <div
            onClick={handleDoctor}
            className="cursor-pointer rounded-3xl border border-emerald-100 bg-white p-8 shadow-md transition duration-300 hover:-translate-y-2 hover:shadow-xl"
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-100">
              <Stethoscope className="text-emerald-600" size={34} />
            </div>

            <h2 className="mt-6 text-2xl font-bold text-slate-900">
              Continue as Doctor
            </h2>

            <p className="mt-3 text-slate-600">
              Manage patients, appointments, prescriptions, lab reports and
              hospital workflows.
            </p>

            <button className="mt-8 w-full rounded-xl bg-emerald-600 py-3 font-semibold text-white transition hover:bg-emerald-700">
              Continue
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}