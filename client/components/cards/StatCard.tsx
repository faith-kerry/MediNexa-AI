import { ReactNode } from "react";

interface StatCardProps {
  title: string;
  value: string;
  icon: ReactNode;
  color?: string;
}

export default function StatCard({
  title,
  value,
  icon,
  color = "bg-blue-600",
}: StatCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-100 hover:shadow-xl">

      {/* Top Accent */}
      <div className="absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-600" />

      <div className="flex items-center justify-between">

        <div>

          <p className="text-sm font-medium tracking-wide text-slate-500">
            {title}
          </p>

          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900">
            {value}
          </h2>

        </div>

        <div
          className={`flex h-14 w-14 items-center justify-center rounded-2xl text-white shadow-md transition-transform duration-300 group-hover:scale-110 ${color}`}
        >
          {icon}
        </div>

      </div>

    </div>
  );
}