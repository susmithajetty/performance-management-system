import { useState } from "react";

export default function LoginPage() {
  const [role, setRole] = useState("Employee");

  const handleLogin = () => {
    localStorage.setItem("role", role);

    if (role === "Employee") {
      window.location.href = "/employee";
    }

    if (role === "Manager") {
      window.location.href = "/manager";
    }

    if (role === "Admin") {
      window.location.href = "/admin";
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-gray-200">
      <div className="bg-white p-10 rounded-3xl shadow-2xl w-[400px]">
        <h1 className="text-4xl font-bold text-center mb-3">
          PMS Portal
        </h1>

        <p className="text-center text-gray-500 mb-8">
          Performance Management System
        </p>

        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full border p-3 rounded-xl mb-6"
        >
          <option>Employee</option>
          <option>Manager</option>
          <option>Admin</option>
        </select>

        <button
          onClick={handleLogin}
          className="w-full bg-black text-white py-3 rounded-xl text-lg hover:bg-gray-800 transition"
        >
          Login
        </button>
      </div>
    </div>
  );
}