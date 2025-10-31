import { join } from "path";
import express from "express";
import cors from "cors";
import sqlite3 from "sqlite3";
import { open } from "sqlite";
import path from "path";
import { fileURLToPath } from "url";

// Fix for __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());

// Database setup
const dbPath = path.join(__dirname, "src", "db", "task_tracker.db");

let db;
(async () => {
  db = await open({
    filename: dbPath,
    driver: sqlite3.Database,
  });

  // ✅ Create table with all necessary fields
  await db.run(`
    CREATE TABLE IF NOT EXISTS tasks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT,
      status TEXT DEFAULT 'Pending',
      priority TEXT DEFAULT 'medium',
      due_date TEXT,
      created_at TEXT DEFAULT (datetime('now', 'localtime'))
    )
  `);

  console.log("✅ Connected to SQLite database");
})();

// Routes
app.get("/", (req, res) => {
  res.send("Task Tracker API is running 🚀");
});

// ✅ GET all tasks
app.get("/api/tasks", async (req, res) => {
  try {
    const tasks = await db.all("SELECT * FROM tasks ORDER BY id DESC");
    res.json(tasks);
  } catch (err) {
    console.error("Error fetching tasks:", err);
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
});

// ✅ POST a new task
app.post("/api/tasks", async (req, res) => {
  try {
    const { title, description, status, priority, due_date } = req.body;

    if (!title) {
      return res.status(400).json({ error: "Title is required" });
    }

    const result = await db.run(
      `INSERT INTO tasks (title, description, status, priority, due_date, created_at)
       VALUES (?, ?, ?, ?, ?, datetime('now', 'localtime'))`,
      [title, description || "", status || "Pending", priority || "medium", due_date || null]
    );

    const newTask = await db.get("SELECT * FROM tasks WHERE id = ?", result.lastID);
    res.json(newTask);
  } catch (err) {
    console.error("Error adding task:", err);
    res.status(500).json({ error: "Failed to add task" });
  }
});

// ✅ PATCH update task status
app.patch("/api/tasks/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    await db.run("UPDATE tasks SET status = ? WHERE id = ?", [status, id]);
    res.json({ message: "Task updated successfully" });
  } catch (err) {
    console.error("Error updating task:", err);
    res.status(500).json({ error: "Failed to update task" });
  }
});

// ✅ DELETE task
app.delete("/api/tasks/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await db.run("DELETE FROM tasks WHERE id = ?", id);

    if (result.changes === 0) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.json({ message: "Task deleted successfully" });
  } catch (err) {
    console.error("Error deleting task:", err);
    res.status(500).json({ error: "Failed to delete task" });
  }
});

const frontendPath = path.join(__dirname, "../frontend/dist");
app.use(express.static(frontendPath));

app.use((req, res) => {
  res.sendFile(join(frontendPath, "index.html"));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
