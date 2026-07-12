"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import DashboardLayout from "@/components/layout/DashboardLayout";

interface MedicalRecord {
  id: string;
  title: string;
  description: string;
  fileUrl?: string;
}

interface LabResult {
  id: string;
  title: string;
  fileUrl: string;
  aiExplanation?: string;
}

interface Appointment {
  id: string;
  appointmentDate: string;
  reason: string;
  status: string;
}

interface Patient {
  id: string;
  fullName: string;
  email: string;

  appointments: Appointment[];
  records: MedicalRecord[];
  labResults: LabResult[];
}

export default function PatientDetailsPage() {
  const params = useParams();

  const patientId = params.patientId as string;

  const [patient, setPatient] =
    useState<Patient | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [medicine, setMedicine] = useState("");

const [dosage, setDosage] = useState("");

const [instructions, setInstructions] =
  useState("");

const [savingPrescription, setSavingPrescription] =
  useState(false);

  useEffect(() => {
    fetchPatient();
  }, []);

  async function fetchPatient() {
    try {
      const response = await fetch(
        `http://localhost:5000/api/doctor/patient/${patientId}`
      );

      const data = await response.json();

      if (data.success) {
        setPatient(data.patient);
      }

    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <DashboardLayout>
        <div className="p-10 text-center">
          Loading patient...
        </div>
      </DashboardLayout>
    );
  }

  if (!patient) {
    return (
      <DashboardLayout>
        <div className="p-10 text-center text-red-600">
          Patient not found.
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>

      <div className="space-y-8">        {/* Patient Profile */}

        <div className="rounded-3xl border border-emerald-100 bg-white p-8 shadow-sm">

          <h1 className="text-3xl font-bold text-slate-800">
            {patient.fullName}
          </h1>

          <p className="mt-2 text-slate-500">
            {patient.email}
          </p>

        </div>

        {/* Medical History */}

        <div className="rounded-3xl border border-emerald-100 bg-white p-8 shadow-sm">

          <h2 className="mb-6 text-2xl font-bold">
            Medical History
          </h2>

          {patient.records.length === 0 ? (

            <p className="text-slate-500">
              No medical records available.
            </p>

          ) : (

            <div className="space-y-5">

              {patient.records.map((record) => (

                <div
                  key={record.id}
                  className="rounded-2xl border border-slate-200 p-5"
                >

                  <h3 className="text-lg font-semibold text-slate-800">
                    {record.title}
                  </h3>

                  <p className="mt-3 text-slate-600">
                    {record.description}
                  </p>

                  {record.fileUrl && (

                    <a
                      href={record.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-block text-emerald-600 hover:underline"
                    >
                      View Attached File
                    </a>

                  )}

                </div>

              ))}

            </div>

          )}

        </div>        {/* Lab Results */}

        <div className="rounded-3xl border border-emerald-100 bg-white p-8 shadow-sm">

          <h2 className="mb-6 text-2xl font-bold">
            Lab Results
          </h2>

          {patient.labResults.length === 0 ? (

            <p className="text-slate-500">
              No lab results uploaded.
            </p>

          ) : (

            <div className="space-y-5">

              {patient.labResults.map((lab) => (

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
                    className="mt-4 inline-block text-emerald-600 hover:underline"
                  >
                    View Lab Report
                  </a>

                  {lab.aiExplanation && (

                    <div className="mt-5 rounded-2xl bg-emerald-50 p-5">

                      <h4 className="font-semibold text-emerald-700">
                        AI Explanation
                      </h4>

                      <p className="mt-2 text-slate-700">
                        {lab.aiExplanation}
                      </p>

                    </div>

                  )}

                </div>

              ))}

            </div>

          )}

        </div>      </div>

    </DashboardLayout>
  );
}