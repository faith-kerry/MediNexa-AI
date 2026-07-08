"use client";

import { CheckCircle, Clock } from "lucide-react";

interface Appointment {
  id: number;
  patient: string;
  reason: string;
  date: string;
  time: string;
  status: "Pending" | "Confirmed" | "Completed";
}

interface AppointmentTableProps {
  appointments: Appointment[];
}

export default function AppointmentTable({
  appointments,
}: AppointmentTableProps) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">

      <div className="px-6 py-5 border-b">

        <h2 className="text-xl font-bold text-slate-800">
          Today's Appointments
        </h2>

        <p className="text-slate-500 text-sm mt-1">
          Manage all patient appointments.
        </p>

      </div>

      <div className="overflow-x-auto">

        <table className="w-full">

          <thead className="bg-slate-50">

            <tr>

              <th className="text-left px-6 py-4 font-semibold">
                Patient
              </th>

              <th className="text-left px-6 py-4 font-semibold">
                Reason
              </th>

              <th className="text-left px-6 py-4 font-semibold">
                Date
              </th>

              <th className="text-left px-6 py-4 font-semibold">
                Time
              </th>

              <th className="text-left px-6 py-4 font-semibold">
                Status
              </th>

            </tr>

          </thead>

          <tbody>

            {appointments.length === 0 ? (

              <tr>

                <td
                  colSpan={5}
                  className="text-center py-10 text-slate-500"
                >
                  No appointments available.
                </td>

              </tr>

            ) : (

              appointments.map((appointment) => (

                <tr
                  key={appointment.id}
                  className="border-t hover:bg-slate-50 transition"
                >

                  <td className="px-6 py-5 font-medium">
                    {appointment.patient}
                  </td>

                  <td className="px-6 py-5">
                    {appointment.reason}
                  </td>

                  <td className="px-6 py-5">
                    {appointment.date}
                  </td>

                  <td className="px-6 py-5">

                    <div className="flex items-center gap-2">

                      <Clock
                        size={16}
                        className="text-green-600"
                      />

                      {appointment.time}

                    </div>

                  </td>

                  <td className="px-6 py-5">

                    <span
                      className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${
                        appointment.status === "Confirmed"
                          ? "bg-green-100 text-green-700"
                          : appointment.status === "Completed"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >

                      <CheckCircle size={16} />

                      {appointment.status}

                    </span>

                  </td>

                </tr>

              ))

            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}