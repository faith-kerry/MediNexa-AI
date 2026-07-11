"use client";

import { useEffect, useState } from "react";

import DashboardLayout from "@/components/layout/DashboardLayout";

import {
  FileText,
  CalendarDays,
  ShieldCheck,
  Plus,
  Trash2,
  Loader2,
} from "lucide-react";

import {
  getMedicalRecords,
  createMedicalRecord,
  deleteMedicalRecord,
} from "@/services/medicalRecordService";

interface MedicalRecord {
  id: string;
  title: string;
  description: string;
  fileUrl?: string;
  createdAt: string;
}

export default function MedicalRecordsPage() {
  const [records, setRecords] = useState<MedicalRecord[]>([]);

  const [loading, setLoading] = useState(true);

  const [saving, setSaving] = useState(false);

  const [title, setTitle] = useState("");

  const [description, setDescription] = useState("");

  const [fileUrl, setFileUrl] = useState("");

  const loadRecords = async () => {
    try {
      const data = await getMedicalRecords();

      setRecords(data.records);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRecords();
  }, []);

  const handleCreate = async () => {
    if (!title || !description) {
      alert("Please enter the title and description.");
      return;
    }

    try {
      setSaving(true);

      await createMedicalRecord({
        title,
        description,
        fileUrl,
      });

      setTitle("");
      setDescription("");
      setFileUrl("");

      await loadRecords();
    } catch (error) {
      console.error(error);
      alert("Unable to create medical record.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this medical record?")) return;

    try {
      await deleteMedicalRecord(id);

      await loadRecords();
    } catch (error) {
      console.error(error);
      alert("Unable to delete record.");
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">

        <div className="flex items-center justify-between">

          <div>

            <h1 className="text-4xl font-bold text-slate-800">
              Medical Records
            </h1>

            <p className="mt-2 text-slate-500">
              Securely manage your medical history.
            </p>

          </div>

          <button
            onClick={handleCreate}
            disabled={saving}
            className="flex items-center gap-2 rounded-xl bg-green-600 px-6 py-3 font-semibold text-white transition hover:bg-green-700 disabled:opacity-60"
          >
            {saving ? (
              <Loader2
                size={18}
                className="animate-spin"
              />
            ) : (
              <Plus size={18} />
            )}

            {saving ? "Saving..." : "Add Record"}
          </button>

        </div>        <div className="grid gap-6 md:grid-cols-3">

          <div className="rounded-2xl border bg-white p-6 shadow">

            <ShieldCheck
              className="mb-4 text-green-600"
              size={34}
            />

            <h2 className="text-3xl font-bold">
              {records.length}
            </h2>

            <p className="mt-2 text-slate-500">
              Total Records
            </p>

          </div>

          <div className="rounded-2xl border bg-white p-6 shadow">

            <FileText
              className="mb-4 text-green-600"
              size={34}
            />

            <h2 className="text-3xl font-bold">
              {records.length}
            </h2>

            <p className="mt-2 text-slate-500">
              Medical Documents
            </p>

          </div>

          <div className="rounded-2xl border bg-white p-6 shadow">

            <CalendarDays
              className="mb-4 text-green-600"
              size={34}
            />

            <h2 className="text-3xl font-bold">
              {records.length > 0 ? "Available" : "None"}
            </h2>

            <p className="mt-2 text-slate-500">
              Latest Records
            </p>

          </div>

        </div>

        <div className="rounded-3xl border bg-white p-8 shadow">

          <h2 className="mb-6 text-2xl font-bold">
            Add Medical Record
          </h2>

          <div className="space-y-5">

            <input
              type="text"
              placeholder="Record title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded-xl border px-4 py-3 outline-none focus:border-green-600"
            />

            <textarea
              rows={5}
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full resize-none rounded-xl border px-4 py-3 outline-none focus:border-green-600"
            />

            <input
              type="text"
              placeholder="File URL (optional)"
              value={fileUrl}
              onChange={(e) => setFileUrl(e.target.value)}
              className="w-full rounded-xl border px-4 py-3 outline-none focus:border-green-600"
            />

          </div>

        </div>

        <div className="rounded-3xl border bg-white shadow overflow-hidden">

          <div className="border-b px-6 py-5">

            <h2 className="text-2xl font-bold">
              Medical History
            </h2>

          </div>        {loading ? (

          <div className="flex justify-center py-16">

            <Loader2
              className="animate-spin text-green-600"
              size={40}
            />

          </div>

        ) : records.length === 0 ? (

          <div className="p-12 text-center">

            <FileText
              className="mx-auto mb-4 text-slate-400"
              size={48}
            />

            <h3 className="text-xl font-semibold text-slate-700">
              No medical records found
            </h3>

            <p className="mt-2 text-slate-500">
              Add your first medical record using the form above.
            </p>

          </div>

        ) : (

          records.map((record) => (

            <div
              key={record.id}
              className="flex items-center justify-between border-b p-6 transition hover:bg-slate-50 last:border-b-0"
            >

              <div>

                <h3 className="text-lg font-semibold">
                  {record.title}
                </h3>

                <p className="mt-2 text-slate-600">
                  {record.description}
                </p>

                <p className="mt-3 text-sm text-slate-400">
                  {new Date(record.createdAt).toLocaleDateString()}
                </p>

                {record.fileUrl && (

                  <a
                    href={record.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-block font-medium text-green-600 hover:underline"
                  >
                    View Attachment
                  </a>

                )}

              </div>

              <button
                onClick={() => handleDelete(record.id)}
                className="rounded-xl bg-red-100 p-3 text-red-600 transition hover:bg-red-200"
              >

                <Trash2 size={20} />

              </button>

            </div>

          ))

        )}

      </div>

    </div>

  </DashboardLayout>
);

}