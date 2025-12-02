import React, { useState, useMemo } from "react";

const SAMPLE_ASSIGNMENTS = [
  { id: "a1", title: "Linear Equations Worksheet", due: "2025-12-10", completed: false },
  { id: "a2", title: "Newton's Laws Short Answers", due: "2025-12-05", completed: true },
  { id: "a3", title: "Plant Cells Diagram", due: "2025-12-15", completed: false },
  { id: "a4", title: "Heat & Thermodynamics MCQs", due: "2025-12-08", completed: true }
];

export default function Choice() {
  const [assignments, setAssignments] = useState(SAMPLE_ASSIGNMENTS);
  const [filter, setFilter] = useState("all");
  const [selected, setSelected] = useState(null);

  const filtered = useMemo(() => {
    if (filter === "pending") return assignments.filter(a => !a.completed);
    if (filter === "completed") return assignments.filter(a => a.completed);
    return assignments;
  }, [assignments, filter]);

  const stats = {
    total: assignments.length,
    completed: assignments.filter(a => a.completed).length,
    pending: assignments.filter(a => !a.completed).length
  };

  const toggleCompletion = (id) => {
    setAssignments(prev =>
      prev.map(a => a.id === id ? { ...a, completed: !a.completed } : a)
    );
  };

  return (
    <div style={styles.page}>
      
      {/* Blue Header */}
      <div style={styles.header}>
        <h1 style={styles.headerTitle}>📘 Assignments</h1>
        <p style={styles.headerSubtitle}>Choose from your available assignments.</p>
      </div>

      {/* Stats Row */}
      <div style={styles.statsRow}>
        <StatCard label="Total" value={stats.total} color="#4285F4" />
        <StatCard label="Pending" value={stats.pending} color="#F9AB00" />
        <StatCard label="Completed" value={stats.completed} color="#34A853" />
      </div>

      {/* Filters */}
      <div style={styles.filterRow}>
        <button 
          onClick={() => setFilter("all")} 
          style={filterBtn(filter === "all")}
        >All</button>

        <button 
          onClick={() => setFilter("pending")} 
          style={filterBtn(filter === "pending")}
        >Pending</button>

        <button 
          onClick={() => setFilter("completed")} 
          style={filterBtn(filter === "completed")}
        >Completed</button>
      </div>

      {/* Assignment Cards */}
      <div style={styles.cardGrid}>
        {filtered.map(a => (
          <div 
            key={a.id} 
            style={styles.card}
            onClick={() => setSelected(a.id)}
          >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h3 style={styles.cardTitle}>{a.title}</h3>
              <span style={{
                ...styles.statusPill,
                background: a.completed ? "#E6F4EA" : "#FCE8E6",
                color: a.completed ? "#188038" : "#C5221F"
              }}>
                {a.completed ? "Completed" : "Pending"}
              </span>
            </div>

            <p style={styles.dueText}>
              Due: {new Date(a.due).toLocaleDateString()}
            </p>

            {/* Mark done / undo button */}
            <button 
              onClick={(e) => { 
                e.stopPropagation(); 
                toggleCompletion(a.id); 
              }} 
              style={styles.doneBtn}
            >
              {a.completed ? "Mark as Pending" : "Mark as Completed"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ----- Subcomponent: Stat Card ----- */
function StatCard({ label, value, color }) {
  return (
    <div style={styles.statCard}>
      <div style={{ fontSize: 30, fontWeight: 600, color }}>{value}</div>
      <div style={{ color: "#555", marginTop: 4 }}>{label}</div>
    </div>
  );
}

/* ----- Inline Styles (Design matches your screenshot) ----- */

const styles = {
  page: {
    background: "#F8FBFF",
    minHeight: "100vh",
    padding: "2rem"
  },
  header: {
    background: "linear-gradient(90deg, #1A73E8, #4E8EF7)",
    color: "white",
    padding: "2rem",
    borderRadius: 16,
    marginBottom: "2rem"
  },
  headerTitle: {
    margin: 0,
    fontSize: "2rem",
    fontWeight: 700
  },
  headerSubtitle: {
    margin: "0.5rem 0 0 0",
    opacity: 0.9
  },
  statsRow: {
    display: "flex",
    gap: "1rem",
    marginBottom: "2rem"
  },
  statCard: {
    background: "white",
    padding: "1rem 1.5rem",
    borderRadius: 12,
    border: "1px solid #E5EAF0",
    flex: 1
  },
  filterRow: {
    display: "flex",
    gap: "0.75rem",
    marginBottom: "1.5rem"
  },
  cardGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
    gap: "1.25rem"
  },
  card: {
    background: "white",
    padding: "1.25rem",
    borderRadius: 12,
    border: "1px solid #E3E8EE",
    cursor: "pointer",
    transition: "all 0.2s",
    boxShadow: "0 1px 2px rgba(0,0,0,0.05)"
  },
  cardTitle: {
    margin: 0,
    fontSize: "1.1rem"
  },
  dueText: {
    marginTop: 8,
    color: "#666"
  },
  statusPill: {
    padding: "4px 10px",
    borderRadius: 999,
    fontSize: 12,
    fontWeight: 600
  },
  doneBtn: {
    marginTop: 12,
    padding: "8px 12px",
    background: "#1A73E8",
    color: "white",
    border: "none",
    borderRadius: 8,
    cursor: "pointer"
  }
};

/* ----- Button styles ----- */
const filterBtn = (active) => ({
  padding: "6px 12px",
  borderRadius: 999,
  border: active ? "1px solid #1A73E8" : "1px solid #D0D7E2",
  background: active ? "#E8F0FE" : "white",
  cursor: "pointer"
});
