"use client";

import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import {
  UploadCloud,
  FileText,
  Loader2,
  Sparkles,
} from "lucide-react";

export default function LabResultsPage() {
  const [reportText, setReportText] = useState("");
  const [analysis, setAnalysis] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    if (!reportText.trim()) return;

    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:5000/api/lab/analyze",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            reportText,
          }),
        }
      );

      const data = await response.json();

      setAnalysis(data.analysis);
    } catch {
      alert("Unable to analyze report.");
    }

    setLoading(false);
  };

  return (
    <DashboardLayout>

      <div className="space-y-8">

        <div>

          <h1 className="text-4xl font-bold text-slate-800 dark:text-white">
            Lab Results Analysis
          </h1>

          <p className="text-slate-500 mt-2">
            Paste your laboratory report below and let MediNexa AI explain it in simple language.
          </p>

        </div>

        <div className="grid lg:grid-cols-2 gap-8">        {/* LEFT PANEL */}

        <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-lg p-8">

          <div className="flex items-center gap-3 mb-6">

            <div className="w-14 h-14 rounded-2xl bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
              <UploadCloud
                size={28}
                className="text-emerald-600"
              />
            </div>

            <div>

              <h2 className="text-2xl font-bold">
                Upload Report
              </h2>

              <p className="text-slate-500 text-sm mt-1">
                Paste your laboratory results below.
              </p>

            </div>

          </div>

          <label className="font-semibold">
            Laboratory Report
          </label>

          <textarea
            rows={16}
            value={reportText}
            onChange={(e) =>
              setReportText(e.target.value)
            }
            placeholder="Example:

Hemoglobin: 14.5 g/dL
Blood Sugar: 95 mg/dL
Cholesterol: 215 mg/dL

Paste your report here..."
            className="w-full mt-3 border border-slate-300 dark:border-slate-700 rounded-2xl p-5 resize-none focus:outline-none focus:ring-2 focus:ring-emerald-600 dark:bg-slate-800"
          />

          <button
            onClick={handleAnalyze}
            disabled={loading}
            className="mt-6 w-full bg-emerald-600 hover:bg-emerald-700 disabled:opacity-60 text-white rounded-2xl py-4 font-semibold flex items-center justify-center gap-3 transition"
          >

            {loading ? (
              <>
                <Loader2
                  size={22}
                  className="animate-spin"
                />

                Analyzing Report...

              </>
            ) : (
              <>
                <Sparkles size={22} />

                Analyze with MediNexa AI

              </>
            )}

          </button>

        </div>        {/* RIGHT PANEL */}

        <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-lg p-8">

          <div className="flex items-center gap-3 mb-6">

            <div className="w-14 h-14 rounded-2xl bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
              <FileText
                size={28}
                className="text-emerald-600"
              />
            </div>

            <div>

              <h2 className="text-2xl font-bold">
                AI Analysis
              </h2>

              <p className="text-slate-500 text-sm mt-1">
                MediNexa AI explains your report in simple language.
              </p>

            </div>

          </div>

          <div className="min-h-[500px] rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 p-6 whitespace-pre-wrap leading-8">

            {analysis ? (
              analysis
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-slate-400">

                <FileText
                  size={70}
                  className="mb-6"
                />

                <h3 className="text-xl font-semibold mb-3">
                  No Analysis Yet
                </h3>

                <p className="text-center max-w-sm">
                  Paste your laboratory report on the left and
                  click <strong>Analyze with MediNexa AI</strong>.
                  Your explanation will appear here.
                </p>

              </div>
            )}

          </div>

          {analysis && (

            <div className="mt-6 rounded-2xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-700 p-5">

              <h3 className="font-bold text-emerald-700 dark:text-emerald-400 mb-3">
                Important Note
              </h3>

              <p className="text-slate-700 dark:text-slate-300 leading-7">
                This explanation is generated by MediNexa AI to
                help you better understand your laboratory
                results. It should not replace advice from a
                qualified healthcare professional. Always consult
                your doctor before making medical decisions.
              </p>

            </div>

          )}

        </div>

      </div>

    </div>

  </DashboardLayout>
);
}