import db from "../db/db.js";

export function getInsights() {
  const totalOpen = db.prepare("SELECT COUNT(*) AS count FROM tasks WHERE status = 'Open'").get().count;
  const highPriority = db.prepare("SELECT COUNT(*) AS count FROM tasks WHERE priority = 'High'").get().count;
  const dueSoon = db.prepare(`
    SELECT COUNT(*) AS count FROM tasks
    WHERE julianday(due_date) - julianday('now') <= 3
    AND status = 'Open'
  `).get().count;

  // AI-like rule-based summary
  let summary = `You have ${totalOpen} open tasks.`;

  if (dueSoon > 0) {
    summary += ` ${dueSoon} task(s) are due soon!`;
  }

  if (highPriority > 0) {
    summary += ` ${highPriority} are marked as High priority.`;
  }

  if (totalOpen === 0) {
    summary = "🎉 All tasks are completed! Great job!";
  }

  return { totalOpen, highPriority, dueSoon, summary };
}
