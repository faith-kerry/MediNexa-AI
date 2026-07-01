import Link from "next/link";
import { ReactNode } from "react";

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
  color = "bg-sky-600",
}: QuickActionCardProps) {
  return (
    <Link
      href={href}
      className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg transition-all duration-300 p-6 flex items-start gap-4"
    >
      <div
        className={`w-14 h-14 rounded-xl ${color} flex items-center justify-center text-white`}
      >
        {icon}
      </div>

      <div>
        <h3 className="font-bold text-lg text-slate-800">
          {title}
        </h3>

        <p className="text-slate-500 text-sm mt-1">
          {description}
        </p>
      </div>
    </Link>
  );
}