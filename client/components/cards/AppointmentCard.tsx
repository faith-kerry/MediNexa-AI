import { CalendarDays, Clock, MapPin, UserRound } from "lucide-react";

interface AppointmentCardProps {
  doctor: string;
  specialty: string;
  date: string;
  time: string;
  location: string;
  status: "Confirmed" | "Pending" | "Completed";
}

export default function AppointmentCard({
  doctor,
  specialty,
  date,
  time,
  location,
  status,
}: AppointmentCardProps) {
  const statusColor =
    status === "Confirmed"
      ? "bg-green-100 text-green-700"
      : status === "Pending"
      ? "bg-yellow-100 text-yellow-700"
      : "bg-gray-100 text-gray-700";

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 hover:shadow-lg transition">

      <div className="flex justify-between items-center">

        <div>
          <h2 className="text-xl font-bold">{doctor}</h2>
          <p className="text-slate-500">{specialty}</p>
        </div>

        <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusColor}`}>
          {status}
        </span>

      </div>

      <div className="mt-6 space-y-3 text-slate-600">

        <div className="flex items-center gap-3">
          <CalendarDays size={18} />
          {date}
        </div>

        <div className="flex items-center gap-3">
          <Clock size={18} />
          {time}
        </div>

        <div className="flex items-center gap-3">
          <MapPin size={18} />
          {location}
        </div>

        <div className="flex items-center gap-3">
          <UserRound size={18} />
          Doctor Consultation
        </div>

      </div>

      <button className="mt-6 w-full bg-sky-600 hover:bg-sky-700 text-white py-3 rounded-xl font-semibold transition">
        View Appointment
      </button>

    </div>
  );
}