import { useEffect,useState } from "react"

export default function Status(){
    const[countAssignment, setCountAssignment] = useState(0);   
    const[activeNotes,setActiveNotes]  = useState(0);
    const[totalDoubts, setTotalDoubts] = useState(0);

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
                    setActiveNotes(data[0].total)
                    
                } catch (err) {
                    console.error("Error fetching doubt types:", err);
                }
            })();


            (async () => {
                try {
                    const response = await fetch("http://localhost:5000/countDoubts", {
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
                    setTotalDoubts(data[0].total);
                    
                } catch (err) {
                    console.error("Error fetching doubt types:", err);
                }
            })();

        }, []);



    return(
        <div className="stats-grid">
                <div className="stat-card">
                    <div className="stat-header">
                        <div className="stat-icon students"></div>
                        <div className="stat-change">+{countAssignment} this week</div>
                    </div>
                    <div className="stat-value">{countAssignment}</div>
                    <div className="stat-label">Total Assignments</div>
                </div>
                <div className="stat-card">
                    <div className="stat-header">
                        <div className="stat-icon classes"></div>
                        <div className="stat-change">{activeNotes}</div>
                    </div>
                    <div className="stat-value">{activeNotes}</div>
                    <div className="stat-label">Active Notes</div>
                </div>
                <div className="stat-card">
                    <div className="stat-header">
                        <div className="stat-icon assignments"></div>
                        <div className="stat-change">12 pending</div>
                    </div>
                    <div className="stat-value">{totalDoubts}</div>
                    <div className="stat-label">Total Doubts</div>
                </div>
                {/* <div className="stat-card">
                    <div className="stat-header">
                        <div className="stat-icon messages"></div>
                        <div className="stat-change">5 unread</div>
                    </div>
                    <div className="stat-value">28</div>
                    <div className="stat-label">Messages</div>
                </div> */}
            </div>
    )
}