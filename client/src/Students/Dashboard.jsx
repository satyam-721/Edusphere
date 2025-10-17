import React from "react";

export default function Dashboard() {
    return (
        <div style={{
            maxWidth: "600px",
            margin: "40px auto",
            padding: "32px",
            background: "#f9f9fb",
            borderRadius: "16px",
            boxShadow: "0 4px 16px rgba(0,0,0,0.08)"
        }}>
            <h2 style={{ color: "#2d3a4b", marginBottom: "16px" }}>Student Dashboard</h2>
            <p style={{ color: "#4b5563", marginBottom: "24px" }}>
                Welcome back! Here you can view your courses, assignments, and progress.
            </p>
            <div style={{
                display: "flex",
                gap: "24px",
                justifyContent: "space-between"
            }}>
                <div style={{
                    flex: 1,
                    background: "#fff",
                    borderRadius: "8px",
                    padding: "16px",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.05)"
                }}>
                    <h4 style={{ margin: "0 0 8px 0", color: "#2563eb" }}>Courses</h4>
                    <p style={{ margin: 0 }}>You are enrolled in <b>3</b> courses.</p>
                </div>
                <div style={{
                    flex: 1,
                    background: "#fff",
                    borderRadius: "8px",
                    padding: "16px",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.05)"
                }}>
                    <h4 style={{ margin: "0 0 8px 0", color: "#16a34a" }}>Assignments</h4>
                    <p style={{ margin: 0 }}>You have <b>2</b> pending assignments.</p>
                </div>
                <div style={{
                    flex: 1,
                    background: "#fff",
                    borderRadius: "8px",
                    padding: "16px",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.05)"
                }}>
                    <h4 style={{ margin: "0 0 8px 0", color: "#f59e42" }}>Progress</h4>
                    <p style={{ margin: 0 }}>Your overall progress is <b>75%</b>.</p>
                </div>
            </div>
        </div>
    );
}