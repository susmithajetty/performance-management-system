import {
  LayoutDashboard,
  User,
  Briefcase,
  LogOut,
} from "lucide-react";

export default function Sidebar({
  role,
}) {
  return (
    <div className="w-64 min-h-screen bg-black text-white p-6">
      <h1 className="text-3xl font-bold mb-10">
        PMS Portal
      </h1>

      <div className="space-y-6">
        <div className="flex items-center gap-3 text-lg">
          <LayoutDashboard size={22} />
          <span>Dashboard</span>
        </div>

        <div className="flex items-center gap-3 text-lg">
          <User size={22} />
          <span>{role}</span>
        </div>

        <div className="flex items-center gap-3 text-lg">
          <Briefcase size={22} />
          <span>Performance</span>
        </div>
      </div>

      <button
        onClick={() => (window.location.href = "/")}
        className="mt-16 flex items-center gap-3 bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600 transition"
      >
        <LogOut size={20} />
        Logout
      </button>
    </div>
  );
}