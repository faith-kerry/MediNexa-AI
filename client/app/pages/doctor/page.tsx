"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

import DashboardLayout from "@/components/layout/DashboardLayout";

import {
  Users,
  CalendarDays,
  FileText,
  Activity,
  Search,
} from "lucide-react";

interface DashboardStat {
  title: string;
  value: number;
  icon: any;
}

interface Appointment {
  id: string;
  appointmentDate: string;
  reason: string;
  status: string;

  patient: {
    fullName: string;
    email: string;
  };

  hospital: {
    name: string;
  };
}

export default function DoctorDashboard() {
  const [stats, setStats] = useState<DashboardStat[]>([
    {
      title: "Today's Appointments",
      value: 0,
      icon: CalendarDays,
    },
    {
      title: "Total Patients",
      value: 0,
      icon: Users,
    },
    {
      title: "Pending Reports",
      value: 0,
      icon: FileText,
    },
    {
      title: "Completed Today",
      value: 0,
      icon: Activity,
    },
  ]);

  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loadingAppointments, setLoadingAppointments] =
    useState(true);

  const [search, setSearch] = useState("");

  const filteredAppointments = useMemo(() => {
    return appointments.filter((appointment) => {
      const query = search.toLowerCase();

      return (
        appointment.patient.fullName
          .toLowerCase()
          .includes(query) ||
        appointment.hospital.name
          .toLowerCase()
          .includes(query)
      );
    });
  }, [appointments, search]);

  useEffect(() => {
    fetchDashboard();
    fetchAppointments();
  }, []);

  async function fetchDashboard() {
    try {
      const response = await fetch(
        "http://localhost:5000/api/doctor/dashboard"
      );

      const data = await response.json();

      setStats([
        {
          title: "Today's Appointments",
          value: data.stats.todayAppointments,
          icon: CalendarDays,
        },
        {
          title: "Total Patients",
          value: data.stats.totalPatients,
          icon: Users,
        },
        {
          title: "Pending Reports",
          value: data.stats.totalLabReports,
          icon: FileText,
        },
        {
          title: "Completed Today",
          value: data.stats.completedToday,
          icon: Activity,
        },
      ]);
    } catch (error) {
      console.error(error);
    }
  }

  async function fetchAppointments() {
    try {
      const response = await fetch(
        "http://localhost:5000/api/doctor/appointments/today"
      );

      const data = await response.json();

      setAppointments(data.appointments || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingAppointments(false);
    }
  }

  return (
    <DashboardLayout>

      <div className="space-y-8">{/* Header */}

<div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

  <div>

    <h1 className="text-4xl font-bold text-slate-800 dark:text-white">
      Good Morning, Doctor 👋
    </h1>

    <p className="mt-2 text-slate-500">
      Here's today's hospital overview.
    </p>

  </div>

  <div className="relative w-full lg:w-96">

    <Search
      size={20}
      className="absolute left-4 top-4 text-slate-400"
    />

    <input
      type="text"
      placeholder="Search patient..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="w-full rounded-2xl border border-slate-200 bg-white py-4 pl-12 pr-4 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
    />

  </div>

</div>

{/* Statistics */}

<div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

  {stats.map((stat, index) => {

    const Icon = stat.icon;

    return (

      <div
        key={index}
        className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
      >

        <div className="h-2 bg-emerald-600"></div>

        <div className="p-6">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm text-slate-500">
                {stat.title}
              </p>

              <h2 className="mt-3 text-4xl font-bold text-slate-800">
                {stat.value}
              </h2>

            </div>

            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-100">

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

</div>{/* Today's Appointments */}

<div className="rounded-3xl bg-white p-8 shadow-sm">

  <div className="mb-6 flex items-center justify-between">

    <h2 className="text-2xl font-bold text-slate-800">
      Today's Appointments
    </h2>

    <button
      onClick={fetchAppointments}
      className="rounded-xl bg-emerald-600 px-5 py-3 font-semibold text-white transition hover:bg-emerald-700"
    >
      Refresh
    </button>

  </div>

  {appointments.length === 0 ? (

    <div className="py-10 text-center text-slate-500">
      No appointments scheduled today.
    </div>

  ) : (

    <div className="overflow-x-auto">

      <table className="w-full">

        <thead>

          <tr className="border-b">

            <th className="py-4 text-left">Patient</th>

            <th className="py-4 text-left">Hospital</th>

            <th className="py-4 text-left">Time</th>

            <th className="py-4 text-left">Status</th>

          </tr>

        </thead>

        <tbody>

          {appointments.map((appointment) => (

            <tr
              key={appointment.id}
              className="border-b transition hover:bg-emerald-50"
            >

              <td className="py-5 font-semibold">
                {appointment.patient?.fullName}
              </td>

              <td>
                {appointment.hospital?.name}
              </td>

              <td>
                {new Date(
                  appointment.appointmentDate
                ).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </td>

              <td>

                <span
                  className={`rounded-full px-4 py-2 text-sm font-semibold ${
                    appointment.status === "COMPLETED"
                      ? "bg-emerald-100 text-emerald-700"
                      : appointment.status === "CONFIRMED"
                      ? "bg-blue-100 text-blue-700"
                      : appointment.status === "PENDING"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-red-100 text-red-700"
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

  )}

</div>{/* Quick Actions */}

<div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

  {[
    {
      title: "Write Prescription",
      description: "Create and manage patient prescriptions.",
      link: "/pages/prescriptions",
    },
    {
      title: "AI Medical Assistant",
      description: "Consult MediNexa AI for clinical support.",
      link: "/pages/ai-chat",
    },
    {
      title: "Lab Reports",
      description: "Review uploaded laboratory reports.",
      link: "/pages/lab-results",
    },
    {
      title: "Patient Records",
      description: "Access complete medical histories.",
      link: "/pages/medical-records",
    },
  ].map((action, index) => (

    <div
      key={index}
      className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
    >

      <h3 className="text-xl font-bold text-slate-800">
        {action.title}
      </h3>

      <p className="mt-3 leading-7 text-slate-500">
        {action.description}
      </p>

      <Link href={action.link}>

        <button className="mt-6 w-full rounded-2xl bg-emerald-600 py-3 font-semibold text-white transition hover:bg-emerald-700">

          Open

        </button>

      </Link>

    </div>

  ))}

</div>

</div>

</DashboardLayout>
);
}