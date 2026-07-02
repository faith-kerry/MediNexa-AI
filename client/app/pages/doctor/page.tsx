"use client";

import DashboardLayout from "@/components/layout/DashboardLayout";
import {
  Users,
  CalendarDays,
  FileText,
  Activity,
  Search,
} from "lucide-react";

const stats = [
  {
    title: "Today's Appointments",
    value: "12",
    icon: CalendarDays,
  },
  {
    title: "Total Patients",
    value: "148",
    icon: Users,
  },
  {
    title: "Pending Reports",
    value: "5",
    icon: FileText,
  },
  {
    title: "Completed Today",
    value: "9",
    icon: Activity,
  },
];

export default function DoctorDashboard() {
  return (
    <DashboardLayout>

      <div className="space-y-8">

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">

          <div>

            <h1 className="text-4xl font-bold text-slate-800 dark:text-white">
              Welcome back, Doctor 👋
            </h1>

            <p className="text-slate-500 mt-2">
              Here's an overview of today's activities.
            </p>

          </div>

          <div className="relative w-full lg:w-96">

            <Search
              className="absolute left-4 top-4 text-slate-400"
              size={20}
            />

            <input
              placeholder="Search patients..."
              className="w-full rounded-2xl border pl-12 pr-4 py-4 bg-white dark:bg-slate-900"
            />

          </div>

        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">        {stats.map((stat, index) => {
          const Icon = stat.icon;

          return (
            <div
              key={index}
              className="bg-white dark:bg-slate-900 rounded-3xl shadow-md hover:shadow-xl transition-all duration-300 border border-slate-200 dark:border-slate-700 overflow-hidden"
            >

              <div className="h-2 bg-emerald-600"></div>

              <div className="p-6">

                <div className="flex items-center justify-between">

                  <div>

                    <p className="text-slate-500 text-sm">
                      {stat.title}
                    </p>

                    <h2 className="text-4xl font-bold mt-3 text-slate-800 dark:text-white">
                      {stat.value}
                    </h2>

                  </div>

                  <div className="w-16 h-16 rounded-2xl bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">

                    <Icon
                      size={30}
                      className="text-emerald-600"
                    />

                  </div>

                </div>

              </div>

            </div>
          );
        })}

      </div>

      {/* Today's Appointments */}

      <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-md p-8">

        <div className="flex items-center justify-between mb-6">

          <h2 className="text-2xl font-bold">
            Today's Appointments
          </h2>

          <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-3 rounded-xl transition">
            View All
          </button>

        </div>

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead>

              <tr className="border-b">

                <th className="text-left py-4">
                  Patient
                </th>

                <th className="text-left py-4">
                  Time
                </th>

                <th className="text-left py-4">
                  Department
                </th>

                <th className="text-left py-4">
                  Status
                </th>

              </tr>

            </thead>

            <tbody>              {[
                {
                  patient: "Faith Kerubo",
                  time: "09:00 AM",
                  department: "General Medicine",
                  status: "Waiting",
                },
                {
                  patient: "John Mwangi",
                  time: "10:30 AM",
                  department: "Cardiology",
                  status: "In Progress",
                },
                {
                  patient: "Mary Atieno",
                  time: "11:15 AM",
                  department: "Dermatology",
                  status: "Completed",
                },
                {
                  patient: "Brian Kiptoo",
                  time: "02:00 PM",
                  department: "Neurology",
                  status: "Waiting",
                },
              ].map((appointment, index) => (
                <tr
                  key={index}
                  className="border-b hover:bg-slate-50 dark:hover:bg-slate-800 transition"
                >
                  <td className="py-5 font-semibold">
                    {appointment.patient}
                  </td>

                  <td>{appointment.time}</td>

                  <td>{appointment.department}</td>

                  <td>
                    <span
                      className={`px-4 py-2 rounded-full text-sm font-semibold ${
                        appointment.status === "Completed"
                          ? "bg-emerald-100 text-emerald-700"
                          : appointment.status === "In Progress"
                          ? "bg-amber-100 text-amber-700"
                          : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {appointment.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>

        </div>

      </div>

      {/* Quick Actions */}

      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">        {[
          {
            title: "Write Prescription",
            description:
              "Create and manage patient prescriptions.",
          },
          {
            title: "AI Medical Assistant",
            description:
              "Consult MediNexa AI for clinical support.",
          },
          {
            title: "Lab Reports",
            description:
              "Review uploaded laboratory results.",
          },
          {
            title: "Patient Records",
            description:
              "Access complete medical histories.",
          },
        ].map((action, index) => (
          <div
            key={index}
            className="bg-white dark:bg-slate-900 rounded-3xl shadow-md border border-slate-200 dark:border-slate-700 p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          >
            <h3 className="text-xl font-bold text-slate-800 dark:text-white">
              {action.title}
            </h3>

            <p className="text-slate-500 mt-3 leading-7">
              {action.description}
            </p>

            <button className="mt-6 w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-2xl font-semibold transition">
              Open
            </button>
          </div>
        ))}

      </div>

    </div>

  </DashboardLayout>
);
}