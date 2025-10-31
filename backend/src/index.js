import express from "express";
import cors from "cors";
import sqlite3 from "sqlite3";
import { open } from "sqlite";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());

// Database setup
const dbPromise = open({
  filename: path.join(__dirname, "../db/task_tracker.db"),
  driver: sqlite3.Database,
});

// ✅ Get all tasks
app.get("/api/tasks", async (req, res) => {
  try {
    const db = await dbPromise;
    const tasks = await db.all("SELECT * FROM tasks");
    res.json(tasks);
  } catch (err) {
    console.error("Error fetching tasks:", err);
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
});

// ✅ Add new task
app.post("/api/tasks", async (req, res) => {
  try {
    const { title, description, status } = req.body;
    const db = await dbPromise;
    await db.run(
      "INSERT INTO tasks (title, description, status) VALUES (?, ?, ?)",
      [title, description, status]
    );
    res.json({ message: "Task added successfully" });
  } catch (err) {
    console.error("Error adding task:", err);
    res.status(500).json({ error: "Failed to add task" });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
