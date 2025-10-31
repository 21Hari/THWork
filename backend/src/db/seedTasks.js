import sqlite3 from "sqlite3";
import { open } from "sqlite";
import path from "path";
import { fileURLToPath } from "url";

// ✅ Recreate __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ Use the same path as initDB.js
const dbPath = path.join(__dirname, "task_tracker.db");

const seedTasks = async () => {
  try {
    const db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });

    const sampleTasks = [
      {
        title: "Prepare project report",
        description: "Summarize weekly progress and prepare status report.",
        status: "in-progress",
        priority: "high",
        due_date: "2025-11-05",
      },
      {
        title: "Client feedback meeting",
        description: "Review client feedback and finalize UI design updates.",
        status: "pending",
        priority: "medium",
        due_date: "2025-11-02",
      },
      {
        title: "Team standup preparation",
        description: "List yesterday’s blockers and today’s priorities.",
        status: "completed",
        priority: "low",
        due_date: "2025-10-30",
      },
    ];

    for (const task of sampleTasks) {
      await db.run(
        `INSERT INTO tasks (title, description, status, priority, due_date)
         VALUES (?, ?, ?, ?, ?)`,
        [task.title, task.description, task.status, task.priority, task.due_date]
      );
    }

    console.log("✅ Sample tasks seeded successfully!");
    await db.close();
  } catch (err) {
    console.error("❌ Error seeding tasks:", err);
  }
};

seedTasks();
