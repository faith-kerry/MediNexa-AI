"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
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
}: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside
      className={`flex h-screen flex-col border-r border-slate-200 bg-white shadow-sm transition-all duration-300 ${
        open ? "w-72" : "w-24"
      }`}
    >
      {/* Logo */}
      <div className="border-b border-slate-200 p-6">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500 text-xl font-bold text-white shadow-lg">
            M
          </div>

          {open && (
            <div>
              <h1 className="text-lg font-bold text-slate-900">
                MediNexa AI
              </h1>

              <p className="text-xs text-slate-500">
                Smart Healthcare
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-2 p-4">
        {menu.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href;

          return (
            <Link
              key={item.title}
              href={item.href}
              className={`flex items-center gap-4 rounded-2xl px-4 py-3 transition-all duration-200 ${
                active
                  ? "bg-blue-600 text-white shadow-md"
                  : "text-slate-600 hover:bg-blue-50 hover:text-blue-600"
              }`}
            >
              <Icon size={22} />

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
      <div className="border-t border-slate-200 p-4">

        <Link
          href="/pages/settings"
          className="mb-2 flex items-center gap-4 rounded-2xl px-4 py-3 text-slate-600 transition hover:bg-slate-100"
        >
          <Settings size={22} />

          {open && <span>Settings</span>}
        </Link>

        <button className="flex w-full items-center gap-4 rounded-2xl px-4 py-3 text-red-500 transition hover:bg-red-50">
          <LogOut size={22} />

          {open && <span>Logout</span>}
        </button>

      </div>
    </aside>
  );
}