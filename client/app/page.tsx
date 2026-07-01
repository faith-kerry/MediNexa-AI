import DashboardLayout from "@/components/layout/DashboardLayout";

export default function DashboardPage() {
  return (
    <DashboardLayout>

      <h1 className="text-4xl font-bold">
        Dashboard
      </h1>

      <p className="text-gray-500 mt-2">
        Welcome to MediNexa AI.
      </p>

    </DashboardLayout>
  );
}