"use client";

import { ReactNode } from "react";
import Sidebar from "./Sidebar/Sidebar";
import Topbar from "./Topbar/Topbar";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  return (
    <div className="flex h-screen bg-slate-100 dark:bg-slate-950">

      {/* Sidebar */}
      <Sidebar />

      {/* Right Side */}
      <div className="flex flex-col flex-1 overflow-hidden">

        {/* Top Navigation */}
        <Topbar />

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-8">
          {children}
        </main>

      </div>

    </div>
  );
}