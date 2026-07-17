"use client";

import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { translateText } from "@/services/translatorService";

import {
  Languages,
  Copy,
  Volume2,
  Loader2,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  Trash2,
  ArrowRightLeft,
} from "lucide-react";

export default function TranslatorPage() {
  const [inputText, setInputText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [language, setLanguage] = useState("Swahili");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const languages = [
    "Swahili",
    "Kikuyu",
    "Luo",
    "Luhya",
    "Kalenjin",
    "Kamba",
    "Somali",
    "English",
  ];

  const handleTranslate = async () => {
    if (!inputText.trim()) return;

    setLoading(true);

    try {
      const response = await translateText(
        inputText,
        language
      );

      setTranslatedText(response.translation);
    } catch (error) {
      setTranslatedText(
        "Unable to translate. Please try again."
      );
    }

    setLoading(false);
  };

  const handleCopy = async () => {
    if (!translatedText) return;

    await navigator.clipboard.writeText(translatedText);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  const handleSpeak = () => {
    if (!translatedText) return;

    const speech = new SpeechSynthesisUtterance(
      translatedText
    );

    speech.lang = "en-US";

    window.speechSynthesis.speak(speech);
  };

  const handleClear = () => {
    setInputText("");
    setTranslatedText("");
  };

  return (
    <DashboardLayout>

      <div className="space-y-8">

        {/* HERO */}

        <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-r from-teal-700 via-teal-600 to-emerald-500 p-8 md:p-10 shadow-xl">

          <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-white/10 blur-3xl" />

          <div className="absolute -bottom-24 left-1/3 h-56 w-56 rounded-full bg-emerald-300/20 blur-3xl" />

          <div className="relative flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">

            <div>

              <div className="inline-flex items-center gap-2 rounded-full bg-white/20 backdrop-blur-md px-4 py-2 text-sm font-medium text-white">

                <Sparkles size={16} />

                AI Powered Translation

              </div>

              <h1 className="mt-5 text-4xl md:text-5xl font-bold text-white">

                Medical Translator

              </h1>

              <p className="mt-4 max-w-2xl leading-8 text-teal-50">

                Translate prescriptions, diagnoses and doctor's
                instructions into local languages so patients
                clearly understand their treatment and medication.

              </p>

            </div>

            <div className="hidden lg:flex h-28 w-28 rounded-3xl bg-white/15 backdrop-blur-lg items-center justify-center">

              <Languages
                size={50}
                className="text-white"
              />

            </div>

          </div>

        </div>

        {/* MAIN GRID */}

        <div className="grid lg:grid-cols-2 gap-8">          {/* LEFT PANEL */}

          <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-lg">

            <div className="flex items-center justify-between mb-8">

              <div>

                <h2 className="text-2xl font-bold text-slate-800">
                  Doctor's Instructions
                </h2>

                <p className="text-slate-500 mt-2 text-sm">
                  Enter the medical instructions and choose the patient's language.
                </p>

              </div>

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-teal-100">

                <Languages
                  size={28}
                  className="text-teal-700"
                />

              </div>

            </div>

            {/* Language Selection */}

            <div className="grid grid-cols-[1fr_auto_1fr] gap-4 items-end">

              <div>

                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  From
                </label>

                <select
                  disabled
                  className="w-full rounded-2xl border border-slate-300 bg-slate-100 px-4 py-3 text-slate-600 outline-none"
                >
                  <option>English</option>
                </select>

              </div>

              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-teal-50">

                <ArrowRightLeft
                  size={20}
                  className="text-teal-700"
                />

              </div>

              <div>

                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  To
                </label>

                <select
                  value={language}
                  onChange={(e) =>
                    setLanguage(e.target.value)
                  }
                  className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-teal-600 focus:ring-4 focus:ring-teal-100"
                >
                  {languages.map((lang) => (
                    <option
                      key={lang}
                      value={lang}
                    >
                      {lang}
                    </option>
                  ))}
                </select>

              </div>

            </div>

            {/* Text Area */}

            <div className="mt-8">

              <div className="mb-3 flex items-center justify-between">

                <label className="font-semibold text-slate-700">
                  Medical Instructions
                </label>

                <span className="text-xs text-slate-400">
                  {inputText.length} characters
                </span>

              </div>

              <textarea
                rows={11}
                value={inputText}
                onChange={(e) =>
                  setInputText(e.target.value)
                }
                placeholder="Example:

Take one tablet twice daily after meals for five days. Drink plenty of water and return to the hospital if symptoms persist."
                className="w-full resize-none rounded-3xl border border-slate-300 bg-slate-50 p-5 leading-8 outline-none transition duration-300 focus:border-teal-600 focus:bg-white focus:ring-4 focus:ring-teal-100"
              />

            </div>

            {/* Translate Button */}

            <button
              onClick={handleTranslate}
              disabled={loading}
              className="mt-8 flex w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-teal-700 to-emerald-500 py-4 text-lg font-semibold text-white shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60"
            >

              {loading ? (
                <>

                  <Loader2
                    size={24}
                    className="animate-spin"
                  />

                  Translating...

                </>
              ) : (
                <>

                  <Languages size={24} />

                  Translate Instructions

                </>
              )}

            </button>

            {/* Tips */}

            <div className="mt-8 rounded-3xl border border-teal-100 bg-teal-50 p-6">

              <h3 className="mb-3 font-semibold text-teal-800">
                Translation Tips
              </h3>

              <ul className="space-y-2 text-sm leading-7 text-slate-600">

                <li>
                  • Use complete doctor's instructions for more accurate translations.
                </li>

                <li>
                  • Avoid abbreviations where possible.
                </li>

                <li>
                  • Always confirm important medical advice with a healthcare professional.
                </li>

              </ul>

            </div>

          </div>          {/* RIGHT PANEL */}

          <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-lg">

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-8">

              <div>

                <h2 className="text-2xl font-bold text-slate-800">
                  AI Translation
                </h2>

                <p className="mt-2 text-sm text-slate-500">
                  Translated into <span className="font-semibold text-teal-700">{language}</span>
                </p>

              </div>

              <div className="flex flex-wrap gap-3">

                <button
                  onClick={handleCopy}
                  disabled={!translatedText}
                  className="flex items-center gap-2 rounded-2xl border border-slate-200 px-4 py-3 font-medium transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {copied ? (
                    <CheckCircle2
                      size={18}
                      className="text-green-600"
                    />
                  ) : (
                    <Copy size={18} />
                  )}

                  {copied ? "Copied" : "Copy"}
                </button>

                <button
                  onClick={handleSpeak}
                  disabled={!translatedText}
                  className="flex items-center gap-2 rounded-2xl border border-slate-200 px-4 py-3 font-medium transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <Volume2 size={18} />
                  Listen
                </button>

                <button
                  onClick={handleClear}
                  className="flex items-center gap-2 rounded-2xl bg-red-50 px-4 py-3 font-medium text-red-600 transition hover:bg-red-100"
                >
                  <Trash2 size={18} />
                  Clear
                </button>

              </div>

            </div>

            <div className="flex min-h-[430px] flex-col rounded-3xl border border-slate-200 bg-slate-50 p-6">

              {translatedText ? (

                <div className="whitespace-pre-wrap text-lg leading-9 text-slate-700">
                  {translatedText}
                </div>

              ) : (

                <div className="flex flex-1 flex-col items-center justify-center text-center">

                  <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-teal-100">

                    <Languages
                      size={48}
                      className="text-teal-700"
                    />

                  </div>

                  <h3 className="text-xl font-semibold text-slate-700">
                    Waiting for Translation
                  </h3>

                  <p className="mt-3 max-w-sm leading-7 text-slate-500">
                    Paste the doctor's instructions, choose a language,
                    and click <span className="font-semibold">Translate Instructions</span>.
                    Your translated medical instructions will appear here.
                  </p>

                </div>

              )}

            </div>

            <div className="mt-8 rounded-3xl border border-emerald-200 bg-emerald-50 p-6">

              <div className="flex items-start gap-4">

                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100">

                  <ShieldCheck
                    size={24}
                    className="text-emerald-700"
                  />

                </div>

                <div>

                  <h3 className="font-semibold text-emerald-800">
                    MediNexa AI Medical Notice
                  </h3>

                  <p className="mt-2 text-sm leading-7 text-slate-600">
                    This translation is generated to help patients better
                    understand medical instructions. It should not replace
                    professional medical advice, diagnosis, or treatment.
                    Patients should always consult a qualified healthcare
                    provider whenever clarification is needed.
                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </DashboardLayout>

  );

}