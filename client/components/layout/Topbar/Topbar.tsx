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
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
      setDarkMode(true);
    }

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
    if (darkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }

    setDarkMode(!darkMode);
  };

  return (
    <header className="sticky top-0 z-40 flex h-20 items-center justify-between border-b border-emerald-100 bg-white/95 px-8 backdrop-blur-lg shadow-sm">

      {/* LEFT */}

      <div className="flex items-center gap-5">

        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="rounded-xl p-2 hover:bg-emerald-50 transition"
        >
          <Menu
            size={24}
            className="text-emerald-700"
          />
        </button>

        <div>

          <h1 className="text-2xl font-bold text-slate-800">
            Good Morning, Faith 👋
          </h1>

          <p className="mt-1 flex items-center gap-2 text-sm text-slate-500">

            <CalendarDays
              size={16}
              className="text-emerald-600"
            />

            {currentDate}

          </p>

        </div>

      </div>

      {/* SEARCH */}

      <div className="relative hidden w-[430px] lg:block">

        <Search
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
        />

        <input
          type="text"
          placeholder="Search appointments, doctors, prescriptions..."
          className="w-full rounded-2xl border border-emerald-100 bg-emerald-50 py-3 pl-11 pr-4 text-slate-700 outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-100"
        />

      </div>

      {/* RIGHT */}

      <div className="flex items-center gap-3">

        <button className="relative rounded-xl p-2 hover:bg-emerald-50 transition">

          <Bell
            size={22}
            className="text-slate-700"
          />

          <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-emerald-600 text-xs text-white">
            3
          </span>

        </button>

        <button className="rounded-xl p-2 hover:bg-emerald-50 transition">

          <MessageCircle
            size={22}
            className="text-slate-700"
          />

        </button>

        <button
          onClick={toggleTheme}
          className="rounded-xl bg-emerald-50 p-2 hover:bg-emerald-100 transition"
        >

          {darkMode ? (
            <Sun
              size={20}
              className="text-yellow-500"
            />
          ) : (
            <Moon
              size={20}
              className="text-emerald-700"
            />
          )}

        </button>

        <div className="ml-2 flex items-center gap-3 rounded-2xl border border-emerald-100 bg-white px-4 py-2 shadow-sm">

          <UserCircle
            size={42}
            className="text-emerald-600"
          />

          <div className="hidden md:block">

            <h2 className="font-semibold text-slate-800">
              Faith Kerubo
            </h2>

            <p className="text-sm text-emerald-600">
              Patient
            </p>

          </div>

        </div>

      </div>

    </header>
  );
}