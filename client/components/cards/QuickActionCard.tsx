import Link from "next/link";
import { ReactNode } from "react";
import { ArrowRight } from "lucide-react";

interface QuickActionCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  href: string;
  color?: string;
}

export default function QuickActionCard({
  title,
  description,
  icon,
  href,
  color = "bg-blue-600",
}: QuickActionCardProps) {
  return (
    <Link
      href={href}
      className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-100 hover:shadow-xl"
    >
      {/* Top Accent */}
      <div className="absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-600" />

      <div className="flex items-start justify-between">

        <div className="flex gap-4">

          <div
            className={`flex h-14 w-14 items-center justify-center rounded-2xl text-white shadow-md transition-transform duration-300 group-hover:scale-110 ${color}`}
          >
            {icon}
          </div>

          <div>

            <h3 className="text-lg font-semibold text-slate-900">
              {title}
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              {description}
            </p>

          </div>

        </div>

        <ArrowRight
          size={20}
          className="text-slate-300 transition-all duration-300 group-hover:translate-x-1 group-hover:text-blue-600"
        />

      </div>

    </Link>
  );
}