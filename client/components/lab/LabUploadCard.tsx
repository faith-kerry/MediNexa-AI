"use client";

import { useState } from "react";
import { Upload, FileText, CheckCircle } from "lucide-react";

export default function LabUploadCard() {
  const [fileName, setFileName] = useState("");

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (file) {
      setFileName(file.name);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 hover:shadow-lg transition">

      <div className="flex items-center gap-3 mb-6">

        <div className="bg-green-100 p-3 rounded-2xl">
          <Upload
            className="text-green-700"
            size={28}
          />
        </div>

        <div>

          <h2 className="text-2xl font-bold text-slate-800">
            Upload Lab Report
          </h2>

          <p className="text-slate-500">
            Upload your lab report for AI analysis.
          </p>

        </div>

      </div>

      <label
        htmlFor="lab-file"
        className="border-2 border-dashed border-green-300 rounded-2xl p-10 flex flex-col items-center justify-center cursor-pointer hover:bg-green-50 transition"
      >

        <FileText
          className="text-green-600 mb-4"
          size={50}
        />

        <p className="font-medium text-slate-700">
          Click to upload
        </p>

        <p className="text-slate-500 text-sm mt-2">
          PDF, JPG or PNG
        </p>

      </label>

      <input
        id="lab-file"
        type="file"
        accept=".pdf,.png,.jpg,.jpeg"
        onChange={handleFileChange}
        className="hidden"
      />

      {fileName && (

        <div className="mt-6 flex items-center gap-3 bg-green-50 rounded-xl p-4">

          <CheckCircle
            className="text-green-600"
            size={22}
          />

          <span className="text-green-700 font-medium">
            {fileName}
          </span>

        </div>

      )}

      <button className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white rounded-xl py-3 font-semibold transition">
        Upload Report
      </button>

    </div>
  );
}