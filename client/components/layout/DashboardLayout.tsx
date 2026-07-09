"use client";

import { ReactNode, useState } from "react";
import Sidebar from "./Sidebar/Sidebar";
import Topbar from "./Topbar/Topbar";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex min-h-screen bg-emerald-50">

      {/* Sidebar */}
      <Sidebar
        open={sidebarOpen}
        setOpen={setSidebarOpen}
      />

      {/* Right Content */}
      <div className="flex flex-1 flex-col overflow-hidden">

        {/* Top Navigation */}
        <Topbar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto bg-emerald-50 p-6">

          <div className="mx-auto max-w-7xl">

            <div className="min-h-full rounded-3xl border border-emerald-100 bg-white p-8 shadow-sm">

              {children}

            </div>

          </div>

        </main>

      </div>

    </div>
  );
}