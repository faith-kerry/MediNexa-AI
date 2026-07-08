"use client";

import { useState } from "react";
import { CalendarPlus } from "lucide-react";

export default function AppointmentForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    hospital: "",
    doctor: "",
    date: "",
    time: "",
    reason: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    alert("Appointment booked successfully!");

    setFormData({
      fullName: "",
      hospital: "",
      doctor: "",
      date: "",
      time: "",
      reason: "",
    });
  };

  return (
    <div className="bg-white rounded-3xl shadow-lg border border-slate-200 p-8">

      <div className="flex items-center gap-3 mb-8">

        <div className="bg-green-100 p-3 rounded-2xl">
          <CalendarPlus className="text-green-600" size={28} />
        </div>

        <div>

          <h2 className="text-2xl font-bold text-slate-800">
            Book Appointment
          </h2>

          <p className="text-slate-500">
            Fill in your appointment details.
          </p>

        </div>

      </div>

      <form onSubmit={handleSubmit} className="space-y-5">

        <div>

          <label className="block font-medium mb-2">
            Full Name
          </label>

          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Enter your full name"
            className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />

        </div>

        <div>

          <label className="block font-medium mb-2">
            Hospital
          </label>

          <input
            type="text"
            name="hospital"
            value={formData.hospital}
            onChange={handleChange}
            placeholder="Hospital name"
            className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />

        </div>

        <div>

          <label className="block font-medium mb-2">
            Doctor
          </label>

          <input
            type="text"
            name="doctor"
            value={formData.doctor}
            onChange={handleChange}
            placeholder="Doctor's name"
            className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
          />

        </div>

        <div className="grid md:grid-cols-2 gap-5">

          <div>

            <label className="block font-medium mb-2">
              Appointment Date
            </label>

            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />

          </div>

          <div>

            <label className="block font-medium mb-2">
              Appointment Time
            </label>

            <input
              type="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />

          </div>

        </div>

        <div>

          <label className="block font-medium mb-2">
            Reason for Visit
          </label>

          <textarea
            rows={5}
            name="reason"
            value={formData.reason}
            onChange={handleChange}
            placeholder="Describe your symptoms or reason for booking..."
            className="w-full border rounded-xl px-4 py-3 resize-none focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />

        </div>

        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-2xl font-semibold transition"
        >
          Book Appointment
        </button>

      </form>

    </div>
  );
}