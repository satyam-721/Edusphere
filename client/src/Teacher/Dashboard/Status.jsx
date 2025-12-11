import { useState, useEffect } from "react";
export default function Status(){
    const[countAssignment, setCountAssignment] = useState(0);   
    const[doubtsolved, setdoubtsolved] = useState(0);
    

    useEffect(() => {
        (async () => {
            try {
                const response = await fetch("http://localhost:5000/countAssignments", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
                if (!response.ok) {
                    throw new Error(`Fetch failed: ${response.status}`);
                }
                const data = await response.json();
                console.log("Fetched data: Dashboard", data);
                setCountAssignment(data[0].total+data[1].total);
                
            } catch (err) {
                console.error("Error fetching doubt types:", err);
            }
        })();

        (async () => {
            try {
                const response = await fetch("http://localhost:5000/doubtSolved", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
                if (!response.ok) {
                    throw new Error(`Fetch failed: ${response.status}`);
                }
                const data = await response.json();
                console.log("Fetched data: Dashboard", data);
                setdoubtsolved(data[0].total);
                
                
            } catch (err) {
                console.error("Error fetching doubt types:", err);
            }
        })();
    });

    return(
        <div className="stats-grid">
                <div className="stat-card">
                    <div className="stat-header">
                        <div className="stat-icon students"></div>
                        <div className="stat-change">+12 this week</div>
                    </div>
                    <div className="stat-value">156</div>
                    <div className="stat-label">Total Students</div>
                </div>
                <div className="stat-card">
                    <div className="stat-header">
                        <div className="stat-icon classes"></div>
                        <div className="stat-change">{doubtsolved} today</div>
                    </div>
                    <div className="stat-value">{doubtsolved}</div>
                    <div className="stat-label">Doubt Solved</div>
                </div>
                <div className="stat-card">
                    <div className="stat-header">
                        <div className="stat-icon assignments"></div>
                        <div className="stat-change">12 pending</div>
                    </div>
                    <div className="stat-value">{countAssignment}</div>
                    <div className="stat-label">Assignments</div>
                </div>
                
            </div>
    )
}