export default function Welcome(){
    return(
        <div className="dashboard-header">
                <div className="header-content">
                    <h1 className="header-title">Student Doubts Dashboard</h1>
                    <p className="header-subtitle">AI-powered clustering helps you address multiple student queries efficiently</p>
                    <div className="header-actions">
                        <button className="header-btn">
                            <div className="header-btn-icon">🤖</div>
                            Auto-Cluster New Doubts
                        </button>
                        <button className="header-btn">
                            <div className="header-btn-icon">📊</div>
                            Generate Report
                        </button>
                        <button className="header-btn">
                            <div className="header-btn-icon">⚙️</div>
                            AI Settings
                        </button>
                    </div>
                </div>
            </div>
    )
}