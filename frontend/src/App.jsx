import React, { useState, useEffect } from "react";
import "./app.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    priority: "",
    due_date: "",
  });

  const fetchTasks = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/tasks");
      const data = await res.json();
      setTasks(data || []);
    } catch (err) {
      console.error("Error fetching tasks:", err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleAddTask = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...newTask,
        due_date: newTask.due_date
          ? new Date(newTask.due_date).toISOString()
          : null,
      };

      await fetch("http://localhost:5000/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      setNewTask({ title: "", description: "", priority: "", due_date: "" });
      fetchTasks();
    } catch (err) {
      console.error("Error adding task:", err);
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      await fetch(`http://localhost:5000/api/tasks/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      fetchTasks();
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/tasks/${id}`, { method: "DELETE" });
      fetchTasks();
    } catch (err) {
      console.error("Error deleting:", err);
    }
  };

  const getStatusClass = (status) => {
    if (!status) return "";
    if (status.toLowerCase().includes("pending")) return "pending";
    if (status.toLowerCase().includes("progress")) return "in-progress";
    if (status.toLowerCase().includes("completed")) return "completed";
    return "";
  };

  const formatDate = (value) => {
    if (!value) return "Not set";
    const date = new Date(value);
    if (isNaN(date.getTime())) return "Invalid date";
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="root">
      <div className="container">
        <div className="panel form-panel" aria-labelledby="form-title">
          <h2 id="form-title" className="panel-title">
            Task Tracker
          </h2>

          <form className="task-form" onSubmit={handleAddTask}>
            <input
              type="text"
              placeholder="Task Title"
              value={newTask.title}
              onChange={(e) =>
                setNewTask({ ...newTask, title: e.target.value })
              }
              required
            />

            <textarea
              placeholder="Description"
              value={newTask.description}
              onChange={(e) =>
                setNewTask({ ...newTask, description: e.target.value })
              }
            />

            <div className="inline-row">
              <select
                value={newTask.priority}
                onChange={(e) =>
                  setNewTask({ ...newTask, priority: e.target.value })
                }
                aria-label="Priority"
              >
                <option value="">Priority</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>

              <input
                type="date"
                className="date-input"
                value={newTask.due_date || ""}
                onChange={(e) =>
                  setNewTask({ ...newTask, due_date: e.target.value })
                }
                aria-label="Due date"
                required
              />
            </div>

            <button className="primary-btn" type="submit">
              Add Task
            </button>
          </form>
        </div>

        <div className="panel list-panel" aria-labelledby="tasks-title">
          <h3 id="tasks-title" className="list-title">
            Tasks
          </h3>

          <div className="tasks-container" role="list">
            {tasks.length === 0 ? (
              <div className="empty">No tasks yet — add one on the left.</div>
            ) : (
              tasks.map((t) => (
                <article
                  key={t.id}
                  className={`task-card ${getStatusClass(t.status)}`}
                  role="listitem"
                >
                  <div className="task-left">
                    <h4 className="task-title">{t.title}</h4>
                    <p className="task-desc">
                      {t.description || "No description."}
                    </p>

                    <div className="task-meta">
                      <div>
                        <strong>Priority:</strong> {t.priority || "Not set"}
                      </div>
                      <div>
                        <strong>Due:</strong> {formatDate(t.due_date)}
                      </div>
                      <div>
                        <strong>Created:</strong> {formatDate(t.created_at)}
                      </div>
                    </div>
                  </div>

                  <div className="task-right">
                    <select
                      value={t.status || "Pending"}
                      onChange={(e) =>
                        handleStatusChange(t.id, e.target.value)
                      }
                      aria-label={`Change status for ${t.title}`}
                    >
                      <option value="Pending">Pending</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Completed">Completed</option>
                    </select>

                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(t.id)}
                      aria-label={`Delete ${t.title}`}
                    >
                      🗑
                    </button>
                  </div>
                </article>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
