export default function Status(){
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
                        <div className="stat-change">3 today</div>
                    </div>
                    <div className="stat-value">8</div>
                    <div className="stat-label">Active Classes</div>
                </div>
                <div className="stat-card">
                    <div className="stat-header">
                        <div className="stat-icon assignments"></div>
                        <div className="stat-change">12 pending</div>
                    </div>
                    <div className="stat-value">45</div>
                    <div className="stat-label">Assignments</div>
                </div>
                <div className="stat-card">
                    <div className="stat-header">
                        <div className="stat-icon messages"></div>
                        <div className="stat-change">5 unread</div>
                    </div>
                    <div className="stat-value">28</div>
                    <div className="stat-label">Messages</div>
                </div>
            </div>
    )
}