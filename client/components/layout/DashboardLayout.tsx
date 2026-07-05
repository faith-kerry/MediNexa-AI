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
    <div className="flex h-screen bg-slate-50">

      <Sidebar
        open={sidebarOpen}
        setOpen={setSidebarOpen}
      />

      <div className="flex flex-1 flex-col overflow-hidden">

        <Topbar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />

        <main className="flex-1 overflow-y-auto bg-slate-50 px-8 py-8">
          <div className="mx-auto max-w-7xl">
            {children}
          </div>
        </main>

      </div>

    </div>
  );
}