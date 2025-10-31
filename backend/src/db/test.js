import { connectDB } from "./db.js";

(async () => {
  try {
    const db = await connectDB();
    console.log("✅ Database connected successfully!");

    await db.exec(`
      CREATE TABLE IF NOT EXISTS tasks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        description TEXT,
        status TEXT DEFAULT 'pending',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    console.log("✅ Tasks table ready!");
    await db.close();
  } catch (error) {
    console.error("❌ Database connection failed:", error);
  }
})();
