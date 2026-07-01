"use client";

export default function Sidebar() {
  return (
    <div className="w-72 h-screen bg-blue-700 text-white p-6">
      <h1 className="text-3xl font-bold">MediNexa AI</h1>

      <div className="mt-8 space-y-4">
        <p>🏠 Dashboard</p>
        <p>🤖 AI Assistant</p>
        <p>📅 Appointments</p>
        <p>💊 Prescriptions</p>
        <p>🧪 Lab Results</p>
        <p>⚙️ Settings</p>
      </div>
    </div>
  );
}