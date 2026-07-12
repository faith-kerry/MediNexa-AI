"use client";

import { useEffect, useState } from "react";

import DashboardLayout from "@/components/layout/DashboardLayout";

import {
  UploadCloud,
  FileText,
  Loader2,
  Trash2,
  Plus,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

import {
  getLabResults,
  uploadLabResult,
  deleteLabResult,
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

  const [fileUrl, setFileUrl] = useState("");

  const [loading, setLoading] = useState(true);

  const [saving, setSaving] = useState(false);

  const [message, setMessage] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  const loadLabResults = async () => {
    try {
      setLoading(true);

      const data = await getLabResults();

      setLabResults(data.labResults || []);
    } catch (error) {
      console.error(error);

      setErrorMessage("Unable to load lab results.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadLabResults();
  }, []);

  const handleUpload = async () => {
    if (!title.trim() || !fileUrl.trim()) {
      setErrorMessage(
        "Please enter both the report title and the file URL."
      );

      setMessage("");

      return;
    }

    try {
      setSaving(true);

      setMessage("");

      setErrorMessage("");

      await uploadLabResult({
        title,
        fileUrl,
      });

      setTitle("");

      setFileUrl("");

      await loadLabResults();

      setMessage("Lab result uploaded successfully.");
    } catch (error) {
      console.error(error);

      setErrorMessage(
        "Unable to upload the laboratory report. Please try again."
      );
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this lab result?")) return;

    try {
      await deleteLabResult(id);

      await loadLabResults();

      setMessage("Lab result deleted successfully.");

      setErrorMessage("");
    } catch (error) {
      console.error(error);

      setErrorMessage("Unable to delete lab result.");
    }
  };

  return (
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
            <CheckCircle2 size={22} />
            <span>{message}</span>
          </div>
        )}

        {errorMessage && (
          <div className="flex items-center gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 text-red-700">
            <AlertCircle size={22} />
            <span>{errorMessage}</span>
          </div>
        )}

        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">

          <div className="mb-6 flex items-center gap-3">

            <UploadCloud
              className="text-green-600"
              size={32}
            />

            <h2 className="text-2xl font-bold">
              Upload Lab Result
            </h2>

          </div>

          <div className="grid gap-6 md:grid-cols-2">

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
                File URL
              </label>

              <input
                type="text"
                value={fileUrl}
                onChange={(e) => setFileUrl(e.target.value)}
                placeholder="https://example.com/report.pdf"
                className="w-full rounded-xl border p-3 outline-none focus:ring-2 focus:ring-green-500"
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
                Upload Lab Result
              </>
            )}
          </button>

        </div>        <div className="rounded-3xl border border-slate-200 bg-white shadow-sm">

          <div className="border-b p-6">

            <h2 className="text-2xl font-bold">
              Uploaded Lab Results
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
                  No Lab Results Yet
                </h3>

                <p className="mt-2">
                  Upload your first laboratory report above.
                </p>

              </div>

            ) : (

              labResults.map((report) => (

                <div
                  key={report.id}
                  className="border-b last:border-b-0 p-6"
                >

                  <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">

                    <div className="flex-1">

                      <h3 className="text-xl font-bold text-slate-800">
                        {report.title}
                      </h3>

                      <p className="mt-2 text-sm text-slate-500">
                        Uploaded on{" "}
                        {new Date(report.uploadedAt).toLocaleDateString()}
                      </p>

                      <a
                        href={report.fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-4 inline-flex rounded-lg bg-green-100 px-4 py-2 font-medium text-green-700 transition hover:bg-green-200"
                      >
                        View Report
                      </a>

                      {report.aiExplanation && (

                        <div className="mt-6 rounded-2xl border border-green-100 bg-green-50 p-5">

                          <h4 className="font-semibold text-green-700">
                            AI Explanation
                          </h4>

                          <p className="mt-3 whitespace-pre-wrap leading-7 text-slate-700">
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

        </div>      </div>
    </DashboardLayout>
  );
}