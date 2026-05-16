import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";

export default function ManagerDashboard() {
  const [goals, setGoals] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const storedGoals =
      JSON.parse(localStorage.getItem("submittedGoals")) || [];

    setGoals(storedGoals);
  }, []);

  const updateStatus = (index, status) => {
    const updatedGoals = [...goals];

    updatedGoals[index].managerStatus = status;

    setGoals(updatedGoals);

    localStorage.setItem(
      "submittedGoals",
      JSON.stringify(updatedGoals)
    );
  };

  const updateComment = (index, comment) => {
    const updatedGoals = [...goals];

    updatedGoals[index].comment = comment;

    setGoals(updatedGoals);

    localStorage.setItem(
      "submittedGoals",
      JSON.stringify(updatedGoals)
    );
  };

  const filteredGoals = goals.filter((goal) =>
    goal.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex bg-gray-100">
      <Sidebar role="Manager" />

      <div className="flex-1 p-10">
        <h1 className="text-4xl font-bold mb-6">
          Manager Dashboard
        </h1>

        <input
          type="text"
          placeholder="Search Goals..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border p-3 rounded-lg mb-6"
        />

        {filteredGoals.length === 0 ? (
          <div className="bg-white p-10 rounded-2xl shadow-lg text-center">
            <p className="text-xl text-gray-500">
              No submitted goals found
            </p>
          </div>
        ) : (
          <div className="grid gap-6">
            {filteredGoals.map((goal, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-2xl shadow-lg"
              >
                <h2 className="text-2xl font-bold mb-2">
                  {goal.title}
                </h2>

                <p>Target: {goal.target}</p>

                <p>
                  Weightage: {goal.weightage}%
                </p>

                <p>
                  Achievement:{" "}
                  {goal.achievement || "Not Updated"}
                </p>

                <p>
                  Employee Status: {goal.status}
                </p>

                <p className="mt-2">
                  Manager Status:{" "}
                  {goal.managerStatus || "Pending"}
                </p>

                <textarea
                  placeholder="Add Check-in Comment"
                  className="w-full border p-3 rounded-lg mt-4"
                  value={goal.comment || ""}
                  onChange={(e) =>
                    updateComment(index, e.target.value)
                  }
                ></textarea>

                <div className="flex gap-4 mt-4">
                  <button
                    onClick={() =>
                      updateStatus(index, "Approved")
                    }
                    className="bg-green-500 text-white px-5 py-2 rounded-lg"
                  >
                    Approve
                  </button>

                  <button
                    onClick={() =>
                      updateStatus(index, "Rejected")
                    }
                    className="bg-red-500 text-white px-5 py-2 rounded-lg"
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}