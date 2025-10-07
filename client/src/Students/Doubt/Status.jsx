export default function Status(){
    return(
        <div className="stats-grid">
                <div className="stat-card">
                    <div className="stat-header">
                        <div className="stat-icon total">📊</div>
                    </div>
                    <div className="stat-value">12</div>
                    <div className="stat-label">Total Doubts</div>
                </div>
                <div className="stat-card">
                    <div className="stat-header">
                        <div className="stat-icon pending">⏳</div>
                    </div>
                    <div className="stat-value">3</div>
                    <div className="stat-label">Pending</div>
                </div>
                <div className="stat-card">
                    <div className="stat-header">
                        <div className="stat-icon answered">✅</div>
                    </div>
                    <div className="stat-value">7</div>
                    <div className="stat-label">Answered</div>
                </div>
                <div className="stat-card">
                    <div className="stat-header">
                        <div className="stat-icon resolved">✓</div>
                    </div>
                    <div className="stat-value">2</div>
                    <div className="stat-label">Resolved</div>
                </div>
            </div>
    )
}