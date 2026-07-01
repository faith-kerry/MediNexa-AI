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
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 hover:shadow-lg transition-all duration-300">

      <div className="flex items-center justify-between">

        <div>

          <p className="text-sm text-slate-500">
            {title}
          </p>

          <h2 className="text-3xl font-bold mt-2 text-slate-800">
            {value}
          </h2>

        </div>

        <div
          className={`w-14 h-14 rounded-xl flex items-center justify-center text-white ${color}`}
        >
          {icon}
        </div>

      </div>

    </div>
  );
}