export default function Status(){
    return(
        <div className="stats-grid">
                <div className="stat-card">
                    <div className="stat-header">
                        <div className="stat-icon pending">⏳</div>
                        <div className="stat-trend">+3 today</div>
                    </div>
                    <div className="stat-value">18</div>
                    <div className="stat-label">Pending Doubts</div>
                </div>
                <div className="stat-card">
                    <div className="stat-header">
                        <div className="stat-icon resolved">✅</div>
                        <div className="stat-trend">+12 today</div>
                    </div>
                    <div className="stat-value">84</div>
                    <div className="stat-label">Resolved This Week</div>
                </div>
                <div className="stat-card">
                    <div className="stat-header">
                        <div className="stat-icon topics">📚</div>
                        <div className="stat-trend down">-2 from last week</div>
                    </div>
                    <div className="stat-value">7</div>
                    <div className="stat-label">Active Topic Clusters</div>
                </div>
                <div className="stat-card">
                    <div className="stat-header">
                        <div className="stat-icon urgent">🔥</div>
                        <div className="stat-trend">2 urgent</div>
                    </div>
                    <div className="stat-value">4.2</div>
                    <div className="stat-label">Avg Response Time (hrs)</div>
                </div>
            </div>
    )
}