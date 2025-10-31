import express from "express";
import sqlite3 from "sqlite3";
import { open } from "sqlite";
import path from "path";
import { fileURLToPath } from "url";

const router = express.Router();

// SQLite setup
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbPromise = open({
  filename: path.join(__dirname, "../db/task_tracker.db"),
  driver: sqlite3.Database,
});

// GET all tasks
router.get("/", async (req, res) => {
  const db = await dbPromise;
  const tasks = await db.all("SELECT * FROM tasks");
  res.json(tasks);
});

// POST new task
router.post("/", async (req, res) => {
  try {
    const { title, status } = req.body;
    const db = await dbPromise;
    await db.run("INSERT INTO tasks (title, status) VALUES (?, ?)", [title, status]);
    res.json({ message: "Task added successfully" });
  } catch (err) {
    console.error("Error adding task:", err);
    res.status(500).json({ error: "Failed to add task" });
  }
});

export default router;
