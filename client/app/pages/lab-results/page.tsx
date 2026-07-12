"use client";

import { useEffect, useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";

import {
  UploadCloud,
  FileText,
  Loader2,
  Trash2,
  Plus,
  CheckCircle,
} from "lucide-react";

import {
  getLabResults,
  uploadLabResult,
  deleteLabResult,
  explainLabResult,
} from "@/services/labService";

interface LabResult {
  id: string;
  title: string;
  fileUrl: string;
  aiExplanation?: string;
  uploadedAt: string;
}

export default function LabResultsPage() {
  const [labResults, setLabResults] = useState<LabResult[]>([]);
  const [title, setTitle] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [explainingId, setExplainingId] = useState<string | null>(null);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const loadLabResults = async () => {
    try {
      const data = await getLabResults();
      setLabResults(data.labResults);
    } catch (err) {
      console.error(err);
      setError("Unable to load lab reports.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadLabResults();
  }, []);

  const handleUpload = async () => {
    if (!title || !file) {
      setError("Please provide a report title and choose a file.");
      return;
    }

    try {
      setSaving(true);
      setError("");

      await uploadLabResult(title, file);

      setTitle("");
      setFile(null);

      setMessage("✅ Lab report uploaded successfully.");

      setTimeout(() => {
        setMessage("");
      }, 3000);

      await loadLabResults();
    } catch (err: any) {
      setError(err.message || "Unable to upload report.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this lab report?")) return;

    try {
      await deleteLabResult(id);

      setMessage("Lab report deleted successfully.");

      setTimeout(() => {
        setMessage("");
      }, 3000);

      await loadLabResults();
    } catch {
      setError("Unable to delete report.");
    }
  };

  const handleExplain = async (id: string) => {
    try {
      setExplainingId(id);

      await explainLabResult(id);

      setMessage("AI explanation generated successfully.");

      setTimeout(() => {
        setMessage("");
      }, 3000);

      await loadLabResults();
    } catch {
      setError("Unable to generate AI explanation.");
    } finally {
      setExplainingId(null);
    }
  };  return (
    <DashboardLayout>
      <div className="space-y-8">

        <div>
          <h1 className="text-4xl font-bold text-slate-800">
            Lab Results
          </h1>

          <p className="mt-2 text-slate-500">
            Upload and manage laboratory reports securely.
          </p>
        </div>

        {message && (
          <div className="flex items-center gap-3 rounded-2xl border border-green-200 bg-green-50 p-4 text-green-700">
            <CheckCircle size={22} />
            <p className="font-medium">{message}</p>
          </div>
        )}

        {error && (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-red-700">
            {error}
          </div>
        )}

        {/* Upload Card */}

        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">

          <div className="mb-6 flex items-center gap-3">
            <UploadCloud
              className="text-green-600"
              size={32}
            />

            <h2 className="text-2xl font-bold">
              Upload Lab Report
            </h2>
          </div>

          <div className="grid gap-6">

            <div>
              <label className="mb-2 block font-medium">
                Report Title
              </label>

              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Full Blood Count"
                className="w-full rounded-xl border p-3 outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div>
              <label className="mb-2 block font-medium">
                Choose File
              </label>

              <input
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={(e) =>
                  setFile(e.target.files?.[0] || null)
                }
                className="w-full rounded-xl border p-3"
              />
            </div>

          </div>

          <button
            onClick={handleUpload}
            disabled={saving}
            className="mt-6 flex items-center gap-2 rounded-xl bg-green-600 px-6 py-3 font-semibold text-white transition hover:bg-green-700 disabled:opacity-60"
          >
            {saving ? (
              <>
                <Loader2
                  className="animate-spin"
                  size={20}
                />
                Uploading...
              </>
            ) : (
              <>
                <Plus size={20} />
                Upload Lab Report
              </>
            )}
          </button>

        </div>

        {/* Uploaded Reports */}

        <div className="rounded-3xl border border-slate-200 bg-white shadow-sm">

          <div className="border-b p-6">
            <h2 className="text-2xl font-bold">
              Uploaded Lab Reports
            </h2>
          </div>

          <div>

            {loading ? (

              <div className="flex justify-center py-16">
                <Loader2
                  size={40}
                  className="animate-spin text-green-600"
                />
              </div>

            ) : labResults.length === 0 ? (

              <div className="py-16 text-center text-slate-500">

                <FileText
                  size={60}
                  className="mx-auto mb-4 text-slate-300"
                />

                <h3 className="text-xl font-semibold">
                  No Lab Reports Yet
                </h3>

                <p className="mt-2">
                  Upload your first report above.
                </p>

              </div>

            ) : (

              labResults.map((report) => (

                <div
                  key={report.id}
                  className="border-b last:border-b-0 p-6"
                >

                  <div className="flex flex-col gap-6 md:flex-row md:justify-between">

                    <div className="flex-1">

                      <h3 className="text-xl font-bold text-slate-800">
                        {report.title}
                      </h3>

                      <p className="mt-2 text-sm text-slate-500">
                        Uploaded on{" "}
                        {new Date(report.uploadedAt).toLocaleDateString()}
                      </p>

                      <div className="mt-4 flex flex-wrap gap-3">

                        <a
                          href={report.fileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="rounded-xl border border-green-200 bg-green-50 px-4 py-2 font-medium text-green-700 hover:bg-green-100"
                        >
                          📄 View Report
                        </a>

                        <button
                          onClick={() => handleExplain(report.id)}
                          disabled={explainingId === report.id}
                          className="rounded-xl bg-green-600 px-4 py-2 font-medium text-white hover:bg-green-700 disabled:opacity-60"
                        >
                          {explainingId === report.id
                            ? "Analyzing Report..."
                            : "✨ Explain with AI"}
                        </button>

                      </div>

                      {report.aiExplanation && (

                        <div className="mt-6 rounded-2xl border border-green-200 bg-green-50 p-5">

                          <h4 className="mb-3 text-lg font-bold text-green-700">
                            🤖 MediNexa AI Explanation
                          </h4>

                          <p className="whitespace-pre-wrap leading-7 text-slate-700">
                            {report.aiExplanation}
                          </p>

                        </div>

                      )}

                    </div>

                    <button
                      onClick={() => handleDelete(report.id)}
                      className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-100 text-red-600 transition hover:bg-red-200"
                    >
                      <Trash2 size={20} />
                    </button>

                  </div>

                </div>

              ))

            )}

          </div>

        </div>

      </div>
    </DashboardLayout>
  );
}