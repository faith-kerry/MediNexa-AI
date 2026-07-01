"use client";

import { useState, useEffect } from "react";
import {
  Search,
  Bell,
  Sun,
  Moon,
  UserCircle,
  CalendarDays,
  MessageCircle,
} from "lucide-react";

export default function Topbar() {
  const [darkMode, setDarkMode] = useState(false);
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    const today = new Date();

    setCurrentDate(
      today.toLocaleDateString("en-US", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    );
  }, []);

  const toggleTheme = () => {
    document.documentElement.classList.toggle("dark");
    setDarkMode(!darkMode);
  };

  return (
    <header className="h-20 bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-700 flex items-center justify-between px-8">

      {/* Left */}

      <div>

        <h1 className="text-2xl font-bold text-slate-800 dark:text-white">
          Good Morning, Faith 👋
        </h1>

        <p className="text-gray-500 dark:text-gray-300 flex items-center gap-2 mt-1">
          <CalendarDays size={16} />
          {currentDate}
        </p>

      </div>

      {/* Center */}

      <div className="relative w-[400px]">

        <Search
          className="absolute left-4 top-3.5 text-gray-400"
          size={20}
        />

        <input
          placeholder="Search doctors, hospitals, prescriptions..."
          className="w-full rounded-xl border border-gray-300 dark:border-slate-600 bg-gray-50 dark:bg-slate-800 py-3 pl-12 pr-4 outline-none focus:ring-2 focus:ring-sky-500"
        />

      </div>

      {/* Right */}

      <div className="flex items-center gap-6">

        <button className="relative">

          <Bell size={24} />

          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            3
          </span>

        </button>

        <button>

          <MessageCircle size={24} />

        </button>

        <button
          onClick={toggleTheme}
          className="bg-slate-100 dark:bg-slate-700 rounded-full p-2 transition"
        >
          {darkMode ? <Sun size={22} /> : <Moon size={22} />}
        </button>

        <div className="flex items-center gap-3">

          <UserCircle size={42} />

          <div>

            <h2 className="font-semibold text-slate-800 dark:text-white">
              Faith Kerubo
            </h2>

            <p className="text-sm text-gray-500">
              Patient
            </p>

          </div>

        </div>

      </div>

    </header>
  );
}