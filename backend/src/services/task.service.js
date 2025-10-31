import db from "../db/db.js";

// ✅ Create a new task
export function createTask(task) {
  const stmt = db.prepare(`
    INSERT INTO tasks (title, description, priority, due_date, status)
    VALUES (?, ?, ?, ?, ?)
  `);
  const result = stmt.run(
    task.title,
    task.description,
    task.priority,
    task.due_date,
    task.status || "Open"
  );
  return { id: result.lastInsertRowid, ...task };
}

// ✅ Get all tasks (with optional filters)
export function getTasks(filters = {}) {
  let query = "SELECT * FROM tasks WHERE 1=1";
  const params = [];

  if (filters.status) {
    query += " AND status = ?";
    params.push(filters.status);
  }

  if (filters.priority) {
    query += " AND priority = ?";
    params.push(filters.priority);
  }

  query += " ORDER BY due_date ASC";

  return db.prepare(query).all(...params);
}

// ✅ Update task status or priority
export function updateTask(id, updates) {
  const fields = [];
  const values = [];

  if (updates.status) {
    fields.push("status = ?");
    values.push(updates.status);
  }

  if (updates.priority) {
    fields.push("priority = ?");
    values.push(updates.priority);
  }

  if (fields.length === 0) {
    throw new Error("No valid fields to update");
  }

  const sql = `UPDATE tasks SET ${fields.join(", ")} WHERE id = ?`;
  values.push(id);

  const stmt = db.prepare(sql);
  const info = stmt.run(...values);

  return info.changes > 0;
}
