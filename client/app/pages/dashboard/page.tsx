import DashboardLayout from "@/components/layout/DashboardLayout";
import StatCard from "@/components/cards/StatCard";
import QuickActionCard from "@/components/cards/QuickActionCard";

import {
  HeartPulse,
  CalendarDays,
  Pill,
  FlaskConical,
  Bot,
  CalendarPlus,
  Languages,
  Siren,
  Upload,
  Hospital,
} from "lucide-react";

export default function Dashboard() {
  return (
    <DashboardLayout>
      <div className="space-y-10">
        {/* Welcome Section */}

        <div>
          <h1 className="text-4xl font-bold text-slate-800">
            Welcome to MediNexa AI
          </h1>

          <p className="text-slate-500 mt-2">
            Your AI-powered healthcare companion.
          </p>
        </div>

        {/* Statistics */}

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          <StatCard
            title="Health Score"
            value="92%"
            icon={<HeartPulse size={28} />}
            color="bg-red-500"
          />

          <StatCard
            title="Next Appointment"
            value="Tomorrow"
            icon={<CalendarDays size={28} />}
            color="bg-blue-600"
          />

          <StatCard
            title="Medication"
            value="8:00 PM"
            icon={<Pill size={28} />}
            color="bg-emerald-600"
          />

          <StatCard
            title="Lab Results"
            value="Available"
            icon={<FlaskConical size={28} />}
            color="bg-violet-600"
          />
        </div>

        {/* Quick Actions */}

        <div>
          <h2 className="text-2xl font-bold text-slate-800 mb-5">
            Quick Actions
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            <QuickActionCard
              title="AI Assistant"
              description="Describe symptoms and receive guidance."
              href="/pages/ai-chat"
              icon={<Bot size={28} />}
              color="bg-violet-600"
            />

            <QuickActionCard
              title="Book Appointment"
              description="Schedule your next consultation."
              href="/pages/appointments"
              icon={<CalendarPlus size={28} />}
              color="bg-blue-600"
            />

            <QuickActionCard
              title="Translate Instructions"
              description="Convert medical instructions into local languages."
              href="/pages/translator"
              icon={<Languages size={28} />}
              color="bg-green-600"
            />

            <QuickActionCard
              title="Emergency SOS"
              description="Request emergency assistance."
              href="/pages/emergency"
              icon={<Siren size={28} />}
              color="bg-red-600"
            />

            <QuickActionCard
              title="Upload Lab Results"
              description="Upload reports for AI explanation."
              href="/pages/lab-results"
              icon={<Upload size={28} />}
              color="bg-orange-500"
            />

            <QuickActionCard
              title="Nearby Hospitals"
              description="Find healthcare facilities near you."
              href="/pages/hospitals"
              icon={<Hospital size={28} />}
              color="bg-cyan-600"
            />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}