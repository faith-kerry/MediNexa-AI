"use client";

import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { bookAppointment } from "@/services/appointmentService";
import {
  CalendarDays,
  Clock3,
  UserRound,
  Stethoscope,
  Search,
  CheckCircle2,
} from "lucide-react";

const doctors = [
  {
    id: 1,
    name: "Dr. Mercy Wanjiku",
    specialty: "General Medicine",
    hospital: "MediNexa Hospital",
    experience: "10 Years",
    rating: "4.9",
  },
  {
    id: 2,
    name: "Dr. Brian Otieno",
    specialty: "Cardiology",
    hospital: "Heart Care Centre",
    experience: "8 Years",
    rating: "4.8",
  },
  {
    id: 3,
    name: "Dr. Sarah Kiptoo",
    specialty: "Pediatrics",
    hospital: "Children's Hospital",
    experience: "6 Years",
    rating: "4.9",
  },
  {
    id: 4,
    name: "Dr. James Mwangi",
    specialty: "Dermatology",
    hospital: "Skin Care Clinic",
    experience: "9 Years",
    rating: "4.7",
  },
  {
    id: 5,
    name: "Dr. Anita Hassan",
    specialty: "Gynecology",
    hospital: "Women's Medical Centre",
    experience: "11 Years",
    rating: "5.0",
  },
  {
    id: 6,
    name: "Dr. David Kimani",
    specialty: "Neurology",
    hospital: "Neuro Health Hospital",
    experience: "12 Years",
    rating: "4.9",
  },
];

export default function AppointmentPage() {
  const [patientName, setPatientName] = useState("");
  const [doctor, setDoctor] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [reason, setReason] = useState("");
  const [search, setSearch] = useState("");
  const [success, setSuccess] = useState(false);

  const filteredDoctors = doctors.filter(
    (doc) =>
      doc.name.toLowerCase().includes(search.toLowerCase()) ||
      doc.specialty.toLowerCase().includes(search.toLowerCase())
  );

  const handleBook = async () => {
    if (
      !patientName ||
      !doctor ||
      !specialty ||
      !date ||
      !time
    ) {
      alert("Please fill all required fields.");
      return;
    }

    try {
      await bookAppointment({
        patientName,
        doctor,
        specialty,
        date,
        time,
        reason,
      });

      setSuccess(true);

      setPatientName("");
      setDoctor("");
      setSpecialty("");
      setDate("");
      setTime("");
      setReason("");
    } catch {
      alert("Booking failed.");
    }
  };

  return (
    <DashboardLayout>

      <div className="space-y-8">

        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">

          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-blue-600">
            Appointments
          </p>

          <h1 className="text-4xl font-bold tracking-tight text-slate-900">
            Book an Appointment
          </h1>

          <p className="mt-3 max-w-3xl leading-7 text-slate-600">
            Search for a doctor, choose a convenient date and time, and schedule your consultation.
          </p>

        </div>

        <div className="relative">

          <Search
            className="absolute left-4 top-4 text-slate-400"
            size={20}
          />

          <input
            type="text"
            placeholder="Search doctor or specialty..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-2xl border border-slate-200 bg-white py-4 pl-12 pr-5 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
          />

        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">          {filteredDoctors.map((doc) => (

            <div
              key={doc.id}
              onClick={() => {
                setDoctor(doc.name);
                setSpecialty(doc.specialty);
              }}
              className={`cursor-pointer rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${
                doctor === doc.name
                  ? "border-blue-500 ring-4 ring-blue-100"
                  : ""
              } bg-white dark:bg-slate-900`}
            >

              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-blue-100 text-3xl font-bold text-blue-600">
                {doc.name.split(" ")[1][0]}
              </div>

              <h2
                className={`mt-5 text-center text-xl font-bold ${
                  doctor === doc.name ? "text-blue-700" : "text-slate-900"
                }`}
              >
                {doc.name}
              </h2>

              <div
                className={`mt-2 flex items-center justify-center gap-2 ${
                  doctor === doc.name ? "text-blue-600" : "text-slate-500"
                }`}
              >
                <Stethoscope size={18} />
                <span>{doc.specialty}</span>
              </div>

              <p
                className={`mt-3 text-center ${
                  doctor === doc.name ? "text-slate-700" : "text-slate-500"
                }`}
              >
                {doc.hospital}
              </p>

              <div className="flex justify-between mt-6 text-sm text-slate-600">

                <div>
                  <p className="font-semibold">
                    Experience
                  </p>

                  <p>{doc.experience}</p>
                </div>

                <div className="text-right">
                  <p className="font-semibold">
                    Rating
                  </p>

                  <p>⭐ {doc.rating}</p>
                </div>

              </div>

              <button
                className={`mt-6 w-full rounded-xl py-3 font-semibold transition ${
                  doctor === doc.name
                    ? "bg-blue-600 text-white"
                    : "bg-slate-100 hover:bg-slate-200"
                }`}
              >
                {doctor === doc.name
                  ? "Selected"
                  : "Select Doctor"}
              </button>

            </div>

          ))}

        </div>

        <div className="mt-10 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">

          <h2 className="mb-6 text-2xl font-bold text-slate-900">
            Appointment Details
          </h2>

          <div className="grid md:grid-cols-2 gap-6">

            <div>

              <label className="mb-2 block font-medium text-slate-700">
                Patient Name
              </label>

              <div className="relative mt-2">

                <UserRound
                  className="absolute left-4 top-4 text-slate-400"
                  size={20}
                />

                <input
                  value={patientName}
                  onChange={(e) =>
                    setPatientName(e.target.value)
                  }
                  className="w-full rounded-2xl border border-slate-200 bg-white py-3 pl-12 pr-4 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                  placeholder="Enter your full name"
                />

              </div>

            </div>

            <div>

              <label className="mb-2 block font-medium text-slate-700">
                Selected Doctor
              </label>

              <input
                value={doctor}
                readOnly
                className="w-full rounded-2xl border border-slate-200 bg-white py-3 pl-12 pr-4 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              />

            </div>            <div>

              <label className="mb-2 block font-medium text-slate-700">
                Appointment Date
              </label>

              <div className="relative mt-2">

                <CalendarDays
                  className="absolute left-4 top-4 text-slate-400"
                  size={20}
                />

                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full rounded-2xl border border-slate-200 bg-white py-3 pl-12 pr-4 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                />

              </div>

            </div>

            <div>

              <label className="mb-2 block font-medium text-slate-700">
                Appointment Time
              </label>

              <div className="relative mt-2">

                <Clock3
                  className="absolute left-4 top-4 text-slate-400"
                  size={20}
                />

                <input
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full rounded-2xl border border-slate-200 bg-white py-3 pl-12 pr-4 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                />

              </div>

            </div>

          </div>

          <div className="mt-6">

            <label className="mb-2 block font-medium text-slate-700">
              Reason for Visit
            </label>

            <textarea
              rows={5}
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Briefly describe your symptoms or reason for booking..."
              className="mt-2 w-full resize-none rounded-2xl border border-slate-200 bg-white p-4 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            />

          </div>

          <button
            onClick={handleBook}
            className="mt-8 w-full rounded-2xl bg-blue-600 py-4 font-semibold text-white transition-all duration-300 hover:scale-[1.01] hover:bg-blue-700"
          >
            Book Appointment
          </button>

          {success && (

            <div className="mt-8 flex items-start gap-4 rounded-3xl border border-green-200 bg-green-50 p-6">

              <CheckCircle2
                className="text-green-600 mt-1"
                size={28}
              />

              <div>

                <h3 className="text-lg font-bold text-green-700">
                  Appointment Booked Successfully!
                </h3>

                <p className="mt-2 leading-7 text-slate-600">
                  Your appointment request has been submitted.
                  You will receive confirmation and reminders
                  once your booking is approved.
                </p>

              </div>

            </div>

          )}

        </div>

      </div>

    </DashboardLayout>
  );
}