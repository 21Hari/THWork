import path from "path";
import sqlite3 from "sqlite3";
import { open } from "sqlite";

const dbPath = path.join(__dirname, "task_tracker.db"); // ✅ correct path
console.log("🔍 Using DB file:", dbPath);

export const getDBConnection = async () => {
  const db = await open({
    filename: dbPath,
    driver: sqlite3.Database,
  });
  return db;
};
