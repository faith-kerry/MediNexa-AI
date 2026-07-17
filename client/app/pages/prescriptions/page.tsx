"use client";

import { useState } from "react";

import DashboardLayout from "@/components/layout/DashboardLayout";
import { explainMedication } from "@/services/medicationService";

import {
  Pill,
  Clock,
  UserRound,
  CalendarDays,
  ShieldCheck,
  Sparkles,
  Loader2,
} from "lucide-react";


const prescriptions = [
  {
    id: 1,
    medicine: "Amoxicillin 500mg",
    dosage: "1 capsule, 3 times daily",
    duration: "7 Days",
    doctor: "Dr. Sarah Kimani",
    status: "Active",
  },
  {
    id: 2,
    medicine: "Paracetamol 500mg",
    dosage: "2 tablets when needed",
    duration: "5 Days",
    doctor: "Dr. James Otieno",
    status: "Completed",
  },
];


export default function Page() {

  const [selectedPrescription, setSelectedPrescription] =
    useState<number | null>(null);

  const [aiExplanation, setAiExplanation] =
    useState("");

  const [loadingAI, setLoadingAI] =
    useState(false);


  const handleExplainMedication = async (
    prescription: typeof prescriptions[0]
  ) => {

    setSelectedPrescription(prescription.id);

    setLoadingAI(true);

    setAiExplanation("");

    try {

      const response = await explainMedication(
        prescription.medicine,
        prescription.dosage,
        prescription.duration
      );

      setAiExplanation(response.explanation);

    } catch (error) {

      setAiExplanation(
        "Unable to generate medication explanation. Please try again."
      );

    } finally {

      setLoadingAI(false);

    }

  };


  return (
    <DashboardLayout>

      <div className="space-y-8">

        <div>

          <h1 className="text-4xl font-bold text-slate-800">
            Prescriptions
          </h1>

          <p className="mt-2 text-slate-500">
            View your medications and treatment plans in one place.
          </p>

        </div>


        <div className="grid md:grid-cols-3 gap-6">

          <div className="bg-white rounded-2xl shadow border p-6">

            <Pill
              className="text-green-600 mb-4"
              size={36}
            />

            <h2 className="text-3xl font-bold">
              {prescriptions.length}
            </h2>

            <p className="text-slate-500 mt-2">
              Total Prescriptions
            </p>

          </div>


          <div className="bg-white rounded-2xl shadow border p-6">

            <Clock
              className="text-green-600 mb-4"
              size={36}
            />

            <h2 className="text-3xl font-bold">
              3
            </h2>

            <p className="text-slate-500 mt-2">
              Daily Reminders
            </p>

          </div>


          <div className="bg-white rounded-2xl shadow border p-6">

            <ShieldCheck
              className="text-green-600 mb-4"
              size={36}
            />

            <h2 className="text-3xl font-bold">
              1
            </h2>

            <p className="text-slate-500 mt-2">
              Active Treatment
            </p>

          </div>

        </div>        <div className="space-y-6">

          {prescriptions.map((prescription) => (

            <div
              key={prescription.id}
              className="bg-white rounded-3xl border shadow p-6 hover:shadow-lg transition"
            >

              <div className="flex flex-col lg:flex-row lg:justify-between gap-6">


                <div>

                  <div className="flex items-center gap-3">

                    <div className="bg-green-100 p-3 rounded-2xl">

                      <Pill
                        className="text-green-700"
                        size={26}
                      />

                    </div>


                    <div>

                      <h2 className="text-2xl font-bold text-slate-800">
                        {prescription.medicine}
                      </h2>

                      <p className="text-slate-500">
                        {prescription.dosage}
                      </p>

                    </div>

                  </div>



                  <div className="mt-6 space-y-3 text-slate-600">


                    <div className="flex items-center gap-2">

                      <CalendarDays size={18} />

                      Duration: {prescription.duration}

                    </div>



                    <div className="flex items-center gap-2">

                      <UserRound size={18} />

                      {prescription.doctor}

                    </div>


                  </div>


                </div>




                <div className="flex flex-col justify-between">


                  <span
                    className={`px-4 py-2 rounded-full text-sm font-semibold text-center ${
                      prescription.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >

                    {prescription.status}

                  </span>



                  <div className="mt-6 flex flex-col gap-3">


                    <button
                      className="bg-green-600 hover:bg-green-700 text-white rounded-xl px-6 py-3 transition"
                    >

                      View Details

                    </button>



                    <button
                      onClick={() =>
                        handleExplainMedication(prescription)
                      }
                      className="flex items-center justify-center gap-2 rounded-xl bg-teal-700 hover:bg-teal-800 text-white px-6 py-3 transition"
                    >

                      {loadingAI &&
                      selectedPrescription === prescription.id ? (

                        <>

                          <Loader2
                            size={20}
                            className="animate-spin"
                          />

                          Explaining...

                        </>


                      ) : (

                        <>

                          <Sparkles size={20} />

                          Ask MediNexa AI

                        </>

                      )}

                    </button>


                  </div>


                </div>


              </div>



              {selectedPrescription === prescription.id && (

                <div className="mt-8 rounded-3xl border border-teal-200 bg-teal-50 p-6">


                  <div className="flex items-center gap-3 mb-4">


                    <div className="bg-teal-100 p-3 rounded-2xl">

                      <Sparkles
                        className="text-teal-700"
                        size={26}
                      />

                    </div>



                    <div>

                      <h3 className="text-xl font-bold text-teal-800">

                        MediNexa AI Medication Assistant

                      </h3>

                      <p className="text-sm text-slate-600">

                        AI explanation for {prescription.medicine}

                      </p>


                    </div>


                  </div>                  {loadingAI &&
                  selectedPrescription === prescription.id ? (

                    <div className="flex items-center justify-center py-8 text-teal-700">

                      <Loader2
                        size={28}
                        className="animate-spin mr-3"
                      />

                      MediNexa AI is preparing your medication explanation...

                    </div>

                  ) : (

                    <div className="whitespace-pre-wrap leading-8 text-slate-700">

                      {aiExplanation}

                    </div>

                  )}



                  <div className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50 p-5">


                    <h4 className="font-semibold text-emerald-800">

                      🛡️ Medical Safety Notice

                    </h4>


                    <p className="mt-2 text-sm leading-7 text-slate-600">

                      This AI explanation is meant to help you understand
                      your medication better. Always follow your doctor's
                      prescription and consult a healthcare professional
                      before making any changes to your treatment.

                    </p>


                  </div>


                </div>

              )}


            </div>

          ))}


        </div>



        {/* AI Assistant Information */}

        <div className="bg-gradient-to-r from-teal-50 to-green-50 border border-teal-200 rounded-3xl p-6">


          <div className="flex items-start gap-4">


            <div className="bg-teal-100 p-3 rounded-2xl">

              <Sparkles
                size={28}
                className="text-teal-700"
              />

            </div>


            <div>


              <h2 className="text-xl font-bold text-teal-800">

                🤖 MediNexa AI Medication Assistant

              </h2>


              <p className="mt-3 text-slate-600 leading-7">

                Ask MediNexa AI about your prescriptions to understand
                what your medication does, possible side effects,
                usage guidance, and important safety information.

              </p>


            </div>


          </div>


        </div>


      </div>


    </DashboardLayout>

  );

}
