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
  Menu,
} from "lucide-react";

interface TopbarProps {
  sidebarOpen: boolean;
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Topbar({
  sidebarOpen,
  setSidebarOpen,
}: TopbarProps) {
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
    <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-slate-200 bg-white/95 px-8 backdrop-blur-md">

      {/* Left */}
      <div className="flex items-center gap-5">

        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="rounded-xl p-2 transition hover:bg-slate-100"
        >
          <Menu size={24} className="text-slate-700" />
        </button>

        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Good Morning, Faith 👋
          </h1>

          <p className="mt-1 flex items-center gap-2 text-sm text-slate-500">
            <CalendarDays size={16} />
            {currentDate}
          </p>
        </div>

      </div>

      {/* Search */}
      <div className="relative hidden w-[420px] lg:block">

        <Search
          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          size={18}
        />

        <input
          placeholder="Search doctors, hospitals, prescriptions..."
          className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-slate-700 outline-none transition-all duration-200 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
        />

      </div>

      {/* Right */}
      <div className="flex items-center gap-3">

        <button className="relative rounded-xl p-2 transition hover:bg-slate-100">

          <Bell size={22} className="text-slate-700" />

          <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
            3
          </span>

        </button>

        <button className="rounded-xl p-2 transition hover:bg-slate-100">
          <MessageCircle size={22} className="text-slate-700" />
        </button>

        <button
          onClick={toggleTheme}
          className="rounded-xl bg-slate-100 p-2 transition hover:bg-slate-200"
        >
          {darkMode ? (
            <Sun size={20} className="text-yellow-500" />
          ) : (
            <Moon size={20} className="text-slate-700" />
          )}
        </button>

        <div className="ml-2 flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-3 py-2 shadow-sm">

          <UserCircle
            size={40}
            className="text-blue-600"
          />

          <div className="hidden md:block">

            <h2 className="font-semibold text-slate-900">
              Faith Kerubo
            </h2>

            <p className="text-sm text-slate-500">
              Patient
            </p>

          </div>

        </div>

      </div>

    </header>
  );
}