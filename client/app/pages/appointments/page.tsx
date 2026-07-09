"use client";

import { useEffect, useMemo, useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { bookAppointment } from "@/services/appointmentService";
import { getHospitals } from "@/services/hospitalService";

import {
  CalendarDays,
  Search,
  CheckCircle2,
  Hospital,
  MapPin,
} from "lucide-react";

interface Hospital {
  id: string;
  name: string;
  county: string;
  address: string;
  phone?: string;
}

export default function AppointmentPage() {
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [selectedHospital, setSelectedHospital] =
    useState<Hospital | null>(null);

  const [appointmentDate, setAppointmentDate] =
    useState("");

  const [reason, setReason] = useState("");

  const [success, setSuccess] = useState(false);

  useEffect(() => {
    fetchHospitals();
  }, []);

  async function fetchHospitals() {
    try {
      const data = await getHospitals();
      setHospitals(data.hospitals || []);
    } catch (error) {
      console.error("Failed to fetch hospitals:", error);
    } finally {
      setLoading(false);
    }
  }

  const filteredHospitals = useMemo(() => {
    return hospitals.filter((hospital) => {
      const query = search.toLowerCase();

      return (
        hospital.name.toLowerCase().includes(query) ||
        hospital.county.toLowerCase().includes(query) ||
        hospital.address.toLowerCase().includes(query)
      );
    });
  }, [hospitals, search]);

  const handleBookAppointment = async () => {
    if (!selectedHospital) {
      alert("Please select a hospital.");
      return;
    }

    if (!appointmentDate) {
      alert("Please choose an appointment date.");
      return;
    }

    if (!reason.trim()) {
      alert("Please provide the reason for your visit.");
      return;
    }

    try {
      await bookAppointment({
        hospitalId: selectedHospital.id,
        appointmentDate,
        reason,
      });

      setSuccess(true);

      setAppointmentDate("");
      setReason("");
      setSelectedHospital(null);

    } catch (error) {
      console.error(error);
      alert("Failed to book appointment.");
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">

        {/* Header */}

        <div className="rounded-3xl border border-emerald-100 bg-white p-8 shadow-sm">

          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-emerald-600">
            Appointment Booking
          </p>

          <h1 className="text-4xl font-bold text-slate-900">
            Book Your Appointment
          </h1>

          <p className="mt-3 max-w-3xl leading-7 text-slate-600">
            Search for a hospital, select where you want to be treated,
            choose your preferred appointment date, and submit your booking.
          </p>

        </div>

        {/* Search */}

        <div className="relative">

          <Search
            size={20}
            className="absolute left-4 top-4 text-slate-400"
          />

          <input
            type="text"
            placeholder="Search hospitals..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-2xl border border-emerald-200 bg-white py-4 pl-12 pr-5 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
          />

        </div>
                {/* Hospital List */}

        {loading ? (
          <div className="rounded-3xl bg-white p-12 text-center shadow-sm">
            <p className="text-slate-500">
              Loading hospitals...
            </p>
          </div>
        ) : filteredHospitals.length === 0 ? (
          <div className="rounded-3xl bg-white p-12 text-center shadow-sm">
            <p className="text-slate-500">
              No hospitals found.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {filteredHospitals.map((hospital) => (
              <div
                key={hospital.id}
                onClick={() => setSelectedHospital(hospital)}
                className={`cursor-pointer rounded-3xl border p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${
                  selectedHospital?.id === hospital.id
                    ? "border-emerald-500 bg-emerald-50 ring-2 ring-emerald-200"
                    : "border-slate-200 bg-white"
                }`}
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-100">
                  <Hospital
                    size={32}
                    className="text-emerald-600"
                  />
                </div>

                <h2 className="mt-5 text-xl font-bold text-slate-900">
                  {hospital.name}
                </h2>

                <div className="mt-4 flex items-center gap-2 text-slate-600">
                  <MapPin
                    size={18}
                    className="text-emerald-600"
                  />

                  <span>{hospital.county}</span>
                </div>

                <p className="mt-3 text-sm leading-6 text-slate-500">
                  {hospital.address}
                </p>

                {hospital.phone && (
                  <p className="mt-4 text-sm font-medium text-slate-700">
                    📞 {hospital.phone}
                  </p>
                )}

                <button
                  className={`mt-6 w-full rounded-xl py-3 font-semibold transition ${
                    selectedHospital?.id === hospital.id
                      ? "bg-emerald-600 text-white"
                      : "bg-emerald-100 text-emerald-700 hover:bg-emerald-200"
                  }`}
                >
                  {selectedHospital?.id === hospital.id
                    ? "Selected"
                    : "Select Hospital"}
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Appointment Form */}

        <div className="rounded-3xl border border-emerald-100 bg-white p-8 shadow-sm">

          <h2 className="mb-8 text-2xl font-bold text-slate-900">
            Appointment Details
          </h2>

          <div className="grid gap-6 md:grid-cols-2">

            <div>

              <label className="mb-2 block font-medium text-slate-700">
                Selected Hospital
              </label>

              <input
                readOnly
                value={selectedHospital?.name || ""}
                placeholder="Select a hospital above"
                className="w-full rounded-2xl border border-emerald-200 bg-slate-50 px-4 py-3"
              />

            </div>

            <div>

              <label className="mb-2 block font-medium text-slate-700">
                Appointment Date
              </label>

              <input
                type="datetime-local"
                value={appointmentDate}
                onChange={(e) =>
                  setAppointmentDate(e.target.value)
                }
                className="w-full rounded-2xl border border-emerald-200 px-4 py-3 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
              />

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
              className="w-full resize-none rounded-2xl border border-emerald-200 p-4 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
            />

          </div>

          <button
            onClick={handleBookAppointment}
            className="mt-8 w-full rounded-2xl bg-emerald-600 py-4 font-semibold text-white transition hover:bg-emerald-700"
          >
            Book Appointment
          </button>

          {success && (

            <div className="mt-8 flex items-start gap-4 rounded-3xl border border-emerald-200 bg-emerald-50 p-6">

              <CheckCircle2
                size={28}
                className="mt-1 text-emerald-600"
              />

              <div>

                <h3 className="text-lg font-bold text-emerald-700">
                  Appointment Booked Successfully!
                </h3>

                <p className="mt-2 leading-7 text-slate-600">
                  Your appointment has been submitted successfully.
                  The hospital will review your request and confirm the
                  appointment shortly.
                </p>

              </div>

            </div>

          )}

        </div>

      </div>

    </DashboardLayout>
  );
}