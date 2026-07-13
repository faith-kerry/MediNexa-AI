"use client";

import { useEffect, useState } from "react";

import Link from "next/link";

import DashboardLayout from "@/components/layout/DashboardLayout";

import StatCard from "@/components/cards/StatCard";

import QuickActionCard from "@/components/cards/QuickActionCard";

import {
  CalendarDays,
  Pill,
  FlaskConical,
  FileText,
  Bot,
  Hospital,
  UserRound,
  Settings,
  Languages,
  Siren,
  HeartPulse,
} from "lucide-react";

interface Appointment {
  id: string;
  appointmentDate: string;
  reason: string;
  status: string;
  hospital: {
    name: string;
  };
}

interface Prescription {
  id: string;
  medicine: string;
  dosage: string;
  instructions: string;
  createdAt: string;
}

interface MedicalRecord {
  id: string;
  title: string;
  description: string;
  createdAt: string;
}

interface LabResult {
  id: string;
  title: string;
  fileUrl: string;
  aiExplanation?: string;
  uploadedAt: string;
}

interface DashboardData {
  appointments: Appointment[];
  prescriptions: Prescription[];
  records: MedicalRecord[];
  labResults: LabResult[];
}

export default function PatientDashboard() {
  const [loading, setLoading] = useState(true);

  const [dashboard, setDashboard] =
    useState<DashboardData | null>(null);

  useEffect(() => {
    loadDashboard();
  }, []);

  async function loadDashboard() {
    try {
      const user = JSON.parse(
        localStorage.getItem("user") || "{}"
      );

      if (!user.id) {
        setLoading(false);
        return;
      }

      const [
        appointments,
        prescriptions,
        records,
        labs,
      ] = await Promise.all([
        fetch(
          `http://localhost:5000/api/patient/${user.id}/appointments`
        ).then((res) => res.json()),

        fetch(
          `http://localhost:5000/api/patient/${user.id}/prescriptions`
        ).then((res) => res.json()),

        fetch(
          `http://localhost:5000/api/patient/${user.id}/medical-records`
        ).then((res) => res.json()),

        fetch(
          `http://localhost:5000/api/patient/${user.id}/lab-results`
        ).then((res) => res.json()),
      ]);

      setDashboard({
        appointments: appointments.appointments || [],
        prescriptions: prescriptions.prescriptions || [],
        records: records.records || [],
        labResults: labs.labResults || [],
      });

    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <DashboardLayout>
        <div className="p-10 text-center text-slate-500">
          Loading Dashboard...
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>

      <div className="space-y-10">

        <div className="rounded-3xl border border-slate-200 bg-gradient-to-r from-white to-slate-50 p-8 shadow-sm">

          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-emerald-600">
            Patient Dashboard
          </p>

          <h1 className="text-4xl font-bold text-slate-900">
            Welcome Back 👋
          </h1>

          <p className="mt-3 max-w-2xl text-slate-600 leading-7">
            Access your appointments, prescriptions, medical
            history, AI healthcare assistant, hospitals and
            everything related to your health in one place.
          </p>

        </div>

        {/* Statistics */}

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">

          <StatCard
            title="Appointments"
            value={
              dashboard?.appointments.length.toString() || "0"
            }
            icon={<CalendarDays size={28} />}
            color="bg-blue-600"
          />

          <StatCard
            title="Prescriptions"
            value={
              dashboard?.prescriptions.length.toString() || "0"
            }
            icon={<Pill size={28} />}
            color="bg-emerald-600"
          />

          <StatCard
            title="Medical Records"
            value={
              dashboard?.records.length.toString() || "0"
            }
            icon={<FileText size={28} />}
            color="bg-orange-500"
          />

          <StatCard
            title="Lab Reports"
            value={
              dashboard?.labResults.length.toString() || "0"
            }
            icon={<FlaskConical size={28} />}
            color="bg-violet-600"
          />

        </div>        {/* Quick Actions */}

        <div>

          <h2 className="mb-5 text-2xl font-bold text-slate-800">
            Quick Actions
          </h2>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">

            <QuickActionCard
              title="Book Appointment"
              description="Schedule your next consultation."
              href="/pages/appointments"
              icon={<CalendarDays size={28} />}
              color="bg-blue-600"
            />

            <QuickActionCard
              title="My Prescriptions"
              description="View medicines prescribed by your doctor."
              href="/pages/prescriptions"
              icon={<Pill size={28} />}
              color="bg-emerald-600"
            />

            <QuickActionCard
              title="Medical Records"
              description="Access your complete medical history."
              href="/pages/medical-records"
              icon={<FileText size={28} />}
              color="bg-orange-500"
            />

            <QuickActionCard
              title="Lab Results"
              description="View uploaded laboratory reports."
              href="/pages/lab-results"
              icon={<FlaskConical size={28} />}
              color="bg-violet-600"
            />

            <QuickActionCard
              title="AI Assistant"
              description="Ask AI health-related questions."
              href="/pages/ai-chat"
              icon={<Bot size={28} />}
              color="bg-indigo-600"
            />

            <QuickActionCard
              title="Nearby Hospitals"
              description="Find healthcare facilities around you."
              href="/pages/hospitals"
              icon={<Hospital size={28} />}
              color="bg-cyan-600"
            />

            <QuickActionCard
              title="Medical Translator"
              description="Translate medical instructions."
              href="/pages/translator"
              icon={<Languages size={28} />}
              color="bg-green-600"
            />

            <QuickActionCard
              title="Emergency SOS"
              description="Quick emergency assistance."
              href="/pages/emergency"
              icon={<Siren size={28} />}
              color="bg-red-600"
            />

            <QuickActionCard
              title="My Profile"
              description="Manage your account information."
              href="/pages/profile"
              icon={<UserRound size={28} />}
              color="bg-slate-700"
            />

            <QuickActionCard
              title="Settings"
              description="Manage your preferences."
              href="/pages/settings"
              icon={<Settings size={28} />}
              color="bg-gray-600"
            />

          </div>

        </div>

        {/* Upcoming Appointments */}

        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">

          <div className="mb-6 flex items-center justify-between">

            <h2 className="text-2xl font-bold text-slate-800">
              Upcoming Appointments
            </h2>

            <Link
              href="/pages/appointments"
              className="text-emerald-600 hover:underline"
            >
              View All
            </Link>

          </div>

          {dashboard?.appointments.length === 0 ? (

            <div className="rounded-2xl border border-dashed border-slate-300 p-8 text-center text-slate-500">
              No appointments available.
            </div>

          ) : (

            <div className="space-y-4">

              {dashboard?.appointments
                .slice(0, 5)
                .map((appointment) => (

                  <div
                    key={appointment.id}
                    className="rounded-2xl border border-slate-200 p-5"
                  >

                    <div className="flex items-center justify-between">

                      <div>

                        <h3 className="font-semibold text-slate-800">
                          {appointment.reason}
                        </h3>

                        <p className="mt-2 text-sm text-slate-500">
                          {appointment.hospital?.name}
                        </p>

                        <p className="mt-1 text-sm text-slate-500">
                          {new Date(
                            appointment.appointmentDate
                          ).toLocaleString()}
                        </p>

                      </div>

                      <span className="rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-700">
                        {appointment.status}
                      </span>

                    </div>

                  </div>

                ))}

            </div>

          )}

        </div>        {/* Recent Prescriptions */}

        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">

          <div className="mb-6 flex items-center justify-between">

            <h2 className="text-2xl font-bold text-slate-800">
              Recent Prescriptions
            </h2>

            <Link
              href="/pages/prescriptions"
              className="text-emerald-600 hover:underline"
            >
              View All
            </Link>

          </div>

          {dashboard?.prescriptions.length === 0 ? (

            <div className="rounded-2xl border border-dashed border-slate-300 p-8 text-center text-slate-500">
              No prescriptions available.
            </div>

          ) : (

            <div className="space-y-4">

              {dashboard?.prescriptions
                .slice(0, 5)
                .map((prescription) => (

                  <div
                    key={prescription.id}
                    className="rounded-2xl border border-slate-200 p-5"
                  >

                    <h3 className="text-lg font-semibold text-slate-800">
                      {prescription.medicine}
                    </h3>

                    <p className="mt-2 text-slate-600">
                      Dosage: {prescription.dosage}
                    </p>

                    <p className="mt-2 text-slate-600">
                      {prescription.instructions}
                    </p>

                  </div>

                ))}

            </div>

          )}

        </div>

        {/* Medical Records */}

        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">

          <div className="mb-6 flex items-center justify-between">

            <h2 className="text-2xl font-bold text-slate-800">
              Medical Records
            </h2>

            <Link
              href="/pages/medical-records"
              className="text-emerald-600 hover:underline"
            >
              View All
            </Link>

          </div>

          {dashboard?.records.length === 0 ? (

            <div className="rounded-2xl border border-dashed border-slate-300 p-8 text-center text-slate-500">
              No medical records found.
            </div>

          ) : (

            <div className="space-y-4">

              {dashboard?.records
                .slice(0, 5)
                .map((record) => (

                  <div
                    key={record.id}
                    className="rounded-2xl border border-slate-200 p-5"
                  >

                    <h3 className="text-lg font-semibold text-slate-800">
                      {record.title}
                    </h3>

                    <p className="mt-2 text-slate-600">
                      {record.description}
                    </p>

                  </div>

                ))}

            </div>

          )}

        </div>

        {/* Lab Results */}

        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">

          <div className="mb-6 flex items-center justify-between">

            <h2 className="text-2xl font-bold text-slate-800">
              Recent Lab Results
            </h2>

            <Link
              href="/pages/lab-results"
              className="text-emerald-600 hover:underline"
            >
              View All
            </Link>

          </div>

          {dashboard?.labResults.length === 0 ? (

            <div className="rounded-2xl border border-dashed border-slate-300 p-8 text-center text-slate-500">
              No laboratory reports found.
            </div>

          ) : (

            <div className="space-y-4">

              {dashboard?.labResults
                .slice(0, 5)
                .map((lab) => (

                  <div
                    key={lab.id}
                    className="rounded-2xl border border-slate-200 p-5"
                  >

                    <h3 className="text-lg font-semibold text-slate-800">
                      {lab.title}
                    </h3>

                    <a
                      href={lab.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 inline-block text-emerald-600 hover:underline"
                    >
                      View Report
                    </a>

                  </div>

                ))}

            </div>

          )}

        </div>      </div>

    </DashboardLayout>
  );
}