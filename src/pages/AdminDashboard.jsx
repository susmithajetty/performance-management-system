import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";

export default function AdminDashboard() {
  const [goals, setGoals] = useState([]);

  useEffect(() => {
    const storedGoals =
      JSON.parse(localStorage.getItem("submittedGoals")) || [];

    setGoals(storedGoals);
  }, []);

  const approved = goals.filter(
    (goal) => goal.managerStatus === "Approved"
  ).length;

  const rejected = goals.filter(
    (goal) => goal.managerStatus === "Rejected"
  ).length;

  const pending = goals.filter(
    (goal) => !goal.managerStatus
  ).length;

  const completionRate =
    goals.length > 0
      ? Math.round(
          ((approved + rejected) / goals.length) * 100
        )
      : 0;

  const employeeCount = [...new Set(
    goals.map((goal) => "Susmitha")
  )].length;

  const data = [
    { name: "Approved", value: approved },
    { name: "Rejected", value: rejected },
    { name: "Pending", value: pending },
  ];

  const COLORS = ["#22c55e", "#ef4444", "#facc15"];

  const exportReport = () => {
    const rows = [
      [
        "Title",
        "Target",
        "Weightage",
        "Status",
        "Manager Status",
      ],
    ];

    goals.forEach((goal) => {
      rows.push([
        goal.title,
        goal.target,
        goal.weightage,
        goal.status,
        goal.managerStatus || "Pending",
      ]);
    });

    const csvContent =
      "data:text/csv;charset=utf-8," +
      rows.map((e) => e.join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);

    const link = document.createElement("a");

    link.setAttribute("href", encodedUri);

    link.setAttribute("download", "goal_report.csv");

    document.body.appendChild(link);

    link.click();
  };

  return (
    <div className="flex bg-gray-100">
      <Sidebar role="Admin" />

      <div className="flex-1 p-10">
        <h1 className="text-4xl font-bold mb-6">
          Admin Dashboard
        </h1>

        <div className="flex gap-4 mb-6">
          <button
            onClick={() => {
              if (
                confirm(
                  "Are you sure you want to reset?"
                )
              ) {
                localStorage.clear();
                window.location.reload();
              }
            }}
            className="bg-red-500 text-white px-5 py-2 rounded-lg"
          >
            Reset Demo
          </button>

          <button
            onClick={exportReport}
            className="bg-blue-500 text-white px-5 py-2 rounded-lg"
          >
            Export Report
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-10">
          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <h2 className="text-xl font-semibold">
              Total Goals
            </h2>

            <p className="text-4xl font-bold mt-4">
              {goals.length}
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <h2 className="text-xl font-semibold">
              Approved Goals
            </h2>

            <p className="text-4xl font-bold mt-4 text-green-500">
              {approved}
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <h2 className="text-xl font-semibold">
              Rejected Goals
            </h2>

            <p className="text-4xl font-bold mt-4 text-red-500">
              {rejected}
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <h2 className="text-xl font-semibold">
              Completion Rate
            </h2>

            <p className="text-4xl font-bold mt-4 text-blue-500">
              {completionRate}%
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <h2 className="text-xl font-semibold">
              Employees
            </h2>

            <p className="text-4xl font-bold mt-4 text-purple-500">
              {employeeCount}
            </p>
          </div>
        </div>

        <div className="bg-white p-10 rounded-2xl shadow-lg flex justify-center">
          <PieChart width={400} height={400}>
            <Pie
              data={data}
              dataKey="value"
              outerRadius={140}
              label
            >
              {data.map((entry, index) => (
                <Cell
                  key={index}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>

            <Tooltip />

            <Legend />
          </PieChart>
        </div>
      </div>
    </div>
  );
}