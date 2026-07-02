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

        <div>

          <h1 className="text-4xl font-bold">
            Book Appointment
          </h1>

          <p className="text-slate-500 mt-2">
            Choose a doctor and schedule your consultation.
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
            className="w-full border rounded-2xl pl-12 pr-5 py-4"
          />

        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">          {filteredDoctors.map((doc) => (

            <div
              key={doc.id}
              onClick={() => {
                setDoctor(doc.name);
                setSpecialty(doc.specialty);
              }}
              className={`cursor-pointer rounded-3xl border p-6 shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
                doctor === doc.name
                  ? "border-blue-600 ring-2 ring-blue-300"
                  : "border-slate-200 dark:border-slate-700"
              } bg-white dark:bg-slate-900`}
            >

              <div className="flex items-center justify-center w-20 h-20 rounded-full bg-blue-100 text-blue-700 text-3xl font-bold mx-auto">
                {doc.name.split(" ")[1][0]}
              </div>

              <h2 className="text-xl font-bold text-center mt-5">
                {doc.name}
              </h2>

              <div className="flex items-center justify-center gap-2 mt-2 text-blue-600">
                <Stethoscope size={18} />
                <span>{doc.specialty}</span>
              </div>

              <p className="text-center text-slate-500 mt-3">
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

        <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-lg p-8 mt-10">

          <h2 className="text-2xl font-bold mb-6">
            Appointment Details
          </h2>

          <div className="grid md:grid-cols-2 gap-6">

            <div>

              <label className="font-semibold">
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
                  className="w-full border rounded-xl pl-12 pr-4 py-3"
                  placeholder="Enter your full name"
                />

              </div>

            </div>

            <div>

              <label className="font-semibold">
                Selected Doctor
              </label>

              <input
                value={doctor}
                readOnly
                className="w-full mt-2 border rounded-xl px-4 py-3 bg-slate-100"
              />

            </div>            <div>

              <label className="font-semibold">
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
                  className="w-full border rounded-xl pl-12 pr-4 py-3"
                />

              </div>

            </div>

            <div>

              <label className="font-semibold">
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
                  className="w-full border rounded-xl pl-12 pr-4 py-3"
                />

              </div>

            </div>

          </div>

          <div className="mt-6">

            <label className="font-semibold">
              Reason for Visit
            </label>

            <textarea
              rows={5}
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Briefly describe your symptoms or reason for booking..."
              className="w-full mt-2 border rounded-2xl p-4 resize-none"
            />

          </div>

          <button
            onClick={handleBook}
            className="mt-8 w-full bg-blue-600 hover:bg-blue-700 text-white rounded-2xl py-4 font-bold transition"
          >
            Book Appointment
          </button>

          {success && (

            <div className="mt-8 rounded-2xl border border-green-200 bg-green-50 dark:bg-green-900/20 dark:border-green-700 p-6 flex items-start gap-4">

              <CheckCircle2
                className="text-green-600 mt-1"
                size={28}
              />

              <div>

                <h3 className="font-bold text-lg text-green-700 dark:text-green-400">
                  Appointment Booked Successfully!
                </h3>

                <p className="mt-2 text-slate-700 dark:text-slate-300">
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