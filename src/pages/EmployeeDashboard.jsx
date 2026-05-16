import { useState } from "react";
import Sidebar from "../components/Sidebar";

export default function EmployeeDashboard() {
  const [submitted, setSubmitted] = useState(
    localStorage.getItem("isSubmitted") === "true"
  );

  const [goals, setGoals] = useState(
    JSON.parse(localStorage.getItem("submittedGoals")) || []
  );

  const [title, setTitle] = useState("");
  const [target, setTarget] = useState("");
  const [weightage, setWeightage] = useState("");

  const addGoal = () => {
    if (submitted) {
      alert("Goals already submitted and locked");
      return;
    }

    const totalWeightage =
      goals.reduce((sum, goal) => sum + Number(goal.weightage), 0) +
      Number(weightage);

    if (!title || !target || !weightage) {
      alert("Please fill all fields");
      return;
    }

    if (goals.length >= 8) {
      alert("Maximum 8 goals allowed");
      return;
    }

    if (Number(weightage) < 10) {
      alert("Minimum weightage is 10%");
      return;
    }

    if (totalWeightage > 100) {
      alert("Total weightage cannot exceed 100%");
      return;
    }

    const newGoal = {
      title,
      target,
      weightage,
      status: "Not Started",
      achievement: "",
      createdAt: new Date().toLocaleString(),
    };

    const updatedGoals = [...goals, newGoal];

    setGoals(updatedGoals);

    localStorage.setItem(
      "submittedGoals",
      JSON.stringify(updatedGoals)
    );

    setTitle("");
    setTarget("");
    setWeightage("");
  };

  const deleteGoal = (index) => {
    if (submitted) return;

    const updatedGoals = goals.filter((_, i) => i !== index);

    setGoals(updatedGoals);

    localStorage.setItem(
      "submittedGoals",
      JSON.stringify(updatedGoals)
    );
  };

  const updateGoal = (index, field, value) => {
    const updatedGoals = [...goals];

    updatedGoals[index][field] = value;

    setGoals(updatedGoals);

    localStorage.setItem(
      "submittedGoals",
      JSON.stringify(updatedGoals)
    );
  };

  const total = goals.reduce(
    (sum, goal) => sum + Number(goal.weightage),
    0
  );

  return (
    <div className="flex bg-gray-100">
      <Sidebar role="Employee" />

      <div className="flex-1 p-10">
        <h1 className="text-4xl font-bold mb-6">
          Employee Dashboard
        </h1>

        {submitted && (
          <p className="text-red-500 font-semibold mb-4">
            Goals are locked after submission
          </p>
        )}

        <div className="bg-white p-6 rounded-2xl shadow-lg mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            Create Goal
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              disabled={submitted}
              type="text"
              placeholder="Goal Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border p-3 rounded-lg"
            />

            <input
              disabled={submitted}
              type="text"
              placeholder="Target"
              value={target}
              onChange={(e) => setTarget(e.target.value)}
              className="border p-3 rounded-lg"
            />

            <input
              disabled={submitted}
              type="number"
              placeholder="Weightage %"
              value={weightage}
              onChange={(e) => setWeightage(e.target.value)}
              className="border p-3 rounded-lg"
            />
          </div>

          <button
            disabled={submitted}
            onClick={addGoal}
            className="mt-4 bg-blue-500 text-white px-6 py-2 rounded-lg"
          >
            Add Goal
          </button>

          <p className="mt-4 font-semibold">
            Total Weightage: {total}%
          </p>

          <button
            onClick={() => {
              if (total !== 100) {
                alert("Total weightage must equal 100%");
                return;
              }

              setSubmitted(true);

              localStorage.setItem("isSubmitted", "true");

              alert("Goals submitted successfully");
            }}
            className="mt-4 ml-4 bg-green-500 text-white px-6 py-2 rounded-lg"
          >
            Submit Goals
          </button>
        </div>

        <div className="grid gap-6">
          {goals.map((goal, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-2xl shadow-lg"
            >
              <div className="flex justify-between items-center">
                <h3 className="text-2xl font-bold">
                  {goal.title}
                </h3>

                {!submitted && (
                  <button
                    onClick={() => deleteGoal(index)}
                    className="bg-red-500 text-white px-3 py-1 rounded-lg"
                  >
                    Delete
                  </button>
                )}
              </div>

              <p className="mt-2">
                Target: {goal.target}
              </p>

              <p>
                Weightage: {goal.weightage}%
              </p>

              <p className="text-sm text-gray-500 mt-2">
                Created: {goal.createdAt}
              </p>

              <div className="mt-4">
                <div className="w-full bg-gray-300 rounded-full h-4">
                  <div
                    className={`h-4 rounded-full ${
                      goal.status === "Completed"
                        ? "bg-green-500"
                        : goal.status === "On Track"
                        ? "bg-yellow-500"
                        : "bg-red-500"
                    }`}
                    style={{
                      width:
                        goal.status === "Completed"
                          ? "100%"
                          : goal.status === "On Track"
                          ? "60%"
                          : "20%",
                    }}
                  ></div>
                </div>
              </div>

              <input
                type="text"
                value={goal.achievement}
                disabled={
                  goal.managerStatus === "Approved"
                }
                onChange={(e) =>
                  updateGoal(
                    index,
                    "achievement",
                    e.target.value
                  )
                }
                className="border p-2 rounded-lg w-full mt-4"
                placeholder="Enter Achievement"
              />

              {goal.comment && (
                <div className="mt-4 bg-blue-100 p-3 rounded-lg">
                  <p className="font-semibold">
                    Manager Comment
                  </p>

                  <p>{goal.comment}</p>
                </div>
              )}

              {goal.managerStatus && (
                <div
                  className={`mt-4 p-3 rounded-lg text-white font-semibold ${
                    goal.managerStatus === "Approved"
                      ? "bg-green-500"
                      : "bg-red-500"
                  }`}
                >
                  Manager {goal.managerStatus}
                </div>
              )}

              <select
                disabled={
                  goal.managerStatus === "Approved"
                }
                value={goal.status}
                onChange={(e) =>
                  updateGoal(
                    index,
                    "status",
                    e.target.value
                  )
                }
                className="border p-2 rounded-lg w-full mt-4"
              >
                <option>Not Started</option>
                <option>On Track</option>
                <option>Completed</option>
              </select>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}