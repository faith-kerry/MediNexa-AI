"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Bot,
  CalendarDays,
  Pill,
  FlaskConical,
  Settings,
  Hospital,
  Languages,
  Siren,
  LogOut,
  ChevronLeft,
  ChevronRight,
  HeartPulse,
} from "lucide-react";

interface SidebarProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const menu = [
  {
    title: "Dashboard",
    href: "/pages/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "AI Assistant",
    href: "/pages/ai-chat",
    icon: Bot,
  },
  {
    title: "Appointments",
    href: "/pages/appointments",
    icon: CalendarDays,
  },
  {
    title: "Prescriptions",
    href: "/pages/prescriptions",
    icon: Pill,
  },
  {
    title: "Lab Results",
    href: "/pages/lab-results",
    icon: FlaskConical,
  },
  {
    title: "Hospitals",
    href: "/pages/hospitals",
    icon: Hospital,
  },
  {
    title: "Translator",
    href: "/pages/translator",
    icon: Languages,
  },
  {
    title: "Emergency",
    href: "/pages/emergency",
    icon: Siren,
  },
];

export default function Sidebar({
  open,
  setOpen,
}: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    const confirmLogout = window.confirm(
      "Are you sure you want to log out?"
    );

    if (!confirmLogout) return;

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    router.push("/pages/login");
  };
  return (
  <aside
    className={`relative flex h-screen flex-col border-r border-emerald-100 bg-white shadow-lg transition-all duration-300 ${
      open ? "w-72" : "w-24"
    }`}
  >
    {/* Collapse Button */}

    <button
      onClick={() => setOpen(!open)}
      className="absolute -right-4 top-8 z-20 flex h-8 w-8 items-center justify-center rounded-full border border-emerald-200 bg-white shadow-md transition hover:bg-emerald-50"
    >
      {open ? (
        <ChevronLeft size={18} className="text-emerald-600" />
      ) : (
        <ChevronRight size={18} className="text-emerald-600" />
      )}
    </button>

    {/* Logo */}

    <div className="border-b border-emerald-100 bg-gradient-to-br from-emerald-600 to-green-500 p-6 text-white">

      <div className="flex items-center gap-4">

        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20 backdrop-blur">

          <HeartPulse size={30} />

        </div>

        {open && (

          <div>

            <h1 className="text-xl font-bold">
              MediNexa AI
            </h1>

            <p className="text-sm text-emerald-100">
              Smart Healthcare
            </p>

          </div>

        )}

      </div>

    </div>

    {/* Navigation */}

    <nav className="flex-1 space-y-2 overflow-y-auto p-4">

      {menu.map((item) => {

        const Icon = item.icon;

        const active = pathname === item.href;

        return (

          <Link
            key={item.title}
            href={item.href}
            className={`group flex items-center gap-4 rounded-2xl px-4 py-3 transition-all duration-300 ${
              active
                ? "bg-gradient-to-r from-emerald-600 to-green-500 text-white shadow-lg"
                : "text-slate-600 hover:bg-emerald-50 hover:text-emerald-700"
            }`}
          >

            <Icon
              size={22}
              className={`transition-transform duration-300 ${
                active
                  ? ""
                  : "group-hover:scale-110"
              }`}
            />

            {open && (
              <span className="font-medium">
                {item.title}
              </span>
            )}

          </Link>

        );

      })}

    </nav>
          {/* Bottom */}

      <div className="border-t border-emerald-100 bg-emerald-50/40 p-4">

        <Link
          href="/pages/settings"
          className={`mb-2 flex items-center gap-4 rounded-2xl px-4 py-3 transition-all duration-300 ${
            pathname === "/pages/settings"
              ? "bg-gradient-to-r from-emerald-600 to-green-500 text-white shadow-lg"
              : "text-slate-600 hover:bg-white hover:text-emerald-700"
          }`}
        >
          <Settings size={22} />

          {open && (
            <span className="font-medium">
              Settings
            </span>
          )}
        </Link>

        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-4 rounded-2xl px-4 py-3 text-red-600 transition-all duration-300 hover:bg-red-50"
        >
          <LogOut size={22} />

          {open && (
            <span className="font-medium">
              Logout
            </span>
          )}
        </button>

        {open && (
          <div className="mt-6 rounded-2xl border border-emerald-100 bg-white p-4 text-center shadow-sm">

            <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100">

              <HeartPulse
                size={20}
                className="text-emerald-600"
              />

            </div>

            <p className="text-sm font-semibold text-slate-800">
              MediNexa AI
            </p>

            <p className="mt-1 text-xs text-slate-500">
              Intelligent Healthcare Assistant
            </p>

          </div>
        )}

      </div>

    </aside>
  );
}